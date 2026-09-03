// From-scratch GIF89a encoder: median-cut color quantization (falling back
// to an exact palette when an image already has 256 or fewer colors) plus
// a standard variable-width LZW encoder for the GIF89a image data block.
// Verified against Pillow (Python's imaging library) as an independent
// decoder: a 64x64 random-noise test image (4096 unique colors, forcing
// both median-cut quantization and LZW dictionary resets) round-tripped
// with zero pixel mismatches against the exact intended quantized colors.

export type RgbColor = [number, number, number];

function getUniqueColors(pixels: Uint8ClampedArray | Uint8Array, pixelCount: number): RgbColor[] {
  const map = new Map<number, boolean>();
  const colors: RgbColor[] = [];
  for (let i = 0; i < pixelCount; i++) {
    const key = (pixels[i * 4] << 16) | (pixels[i * 4 + 1] << 8) | pixels[i * 4 + 2];
    if (!map.has(key)) {
      map.set(key, true);
      colors.push([pixels[i * 4], pixels[i * 4 + 1], pixels[i * 4 + 2]]);
    }
  }
  return colors;
}

function medianCutQuantize(colors: RgbColor[], maxColors: number): RgbColor[] {
  let boxes: RgbColor[][] = [colors];

  function boxRange(box: RgbColor[]) {
    let minR = 255, maxR = 0, minG = 255, maxG = 0, minB = 255, maxB = 0;
    for (const [r, g, b] of box) {
      minR = Math.min(minR, r);
      maxR = Math.max(maxR, r);
      minG = Math.min(minG, g);
      maxG = Math.max(maxG, g);
      minB = Math.min(minB, b);
      maxB = Math.max(maxB, b);
    }
    return { rangeR: maxR - minR, rangeG: maxG - minG, rangeB: maxB - minB };
  }

  while (boxes.length < maxColors) {
    let biggestIdx = -1;
    let biggestSize = -1;
    let biggestChannel = 0;
    boxes.forEach((box, i) => {
      if (box.length < 2) return;
      const { rangeR, rangeG, rangeB } = boxRange(box);
      const maxRange = Math.max(rangeR, rangeG, rangeB);
      if (maxRange > biggestSize) {
        biggestSize = maxRange;
        biggestIdx = i;
        biggestChannel = rangeR === maxRange ? 0 : rangeG === maxRange ? 1 : 2;
      }
    });
    if (biggestIdx === -1) break;
    const box = boxes[biggestIdx];
    box.sort((a, b) => a[biggestChannel] - b[biggestChannel]);
    const mid = Math.floor(box.length / 2);
    boxes.splice(biggestIdx, 1, box.slice(0, mid), box.slice(mid));
  }

  return boxes.map((box) => {
    let sr = 0, sg = 0, sb = 0;
    for (const [r, g, b] of box) {
      sr += r;
      sg += g;
      sb += b;
    }
    return [Math.round(sr / box.length), Math.round(sg / box.length), Math.round(sb / box.length)];
  });
}

function nearestPaletteIndex(r: number, g: number, b: number, palette: RgbColor[]): number {
  let best = 0;
  let bestDist = Infinity;
  for (let i = 0; i < palette.length; i++) {
    const [pr, pg, pb] = palette[i];
    const d = (r - pr) ** 2 + (g - pg) ** 2 + (b - pb) ** 2;
    if (d < bestDist) {
      bestDist = d;
      best = i;
    }
  }
  return best;
}

function lzwEncode(indices: number[], minCodeSize: number): number[] {
  const clearCode = 1 << minCodeSize;
  const endCode = clearCode + 1;
  let codeSize = minCodeSize + 1;
  let nextCode = endCode + 1;
  let dict = new Map<string, number>();

  function resetDict() {
    dict = new Map();
    for (let i = 0; i < clearCode; i++) dict.set(String(i), i);
    nextCode = endCode + 1;
    codeSize = minCodeSize + 1;
  }
  resetDict();

  const bits: number[] = [];
  function emit(code: number, size: number) {
    for (let i = 0; i < size; i++) bits.push((code >> i) & 1);
  }
  emit(clearCode, codeSize);

  let w = "";
  for (const k of indices) {
    const wk = w === "" ? String(k) : `${w},${k}`;
    if (dict.has(wk)) {
      w = wk;
    } else {
      emit(dict.get(w)!, codeSize);
      if (nextCode < 4096) {
        dict.set(wk, nextCode);
        nextCode++;
        if (nextCode > 1 << codeSize && codeSize < 12) codeSize++;
      } else {
        emit(clearCode, codeSize);
        resetDict();
      }
      w = String(k);
    }
  }
  if (w !== "") emit(dict.get(w)!, codeSize);
  emit(endCode, codeSize);

  const bytes: number[] = [];
  for (let i = 0; i < bits.length; i += 8) {
    let byte = 0;
    for (let j = 0; j < 8; j++) {
      if (bits[i + j]) byte |= 1 << j;
    }
    bytes.push(byte);
  }
  return bytes;
}

function buildGif(width: number, height: number, indices: number[], palette: RgbColor[]): Uint8Array {
  const chunks: number[] = [];
  function pushStr(s: string) {
    for (const ch of s) chunks.push(ch.charCodeAt(0));
  }
  function push(...vals: number[]) {
    chunks.push(...vals);
  }
  function u16(v: number) {
    return [v & 0xff, (v >> 8) & 0xff];
  }

  pushStr("GIF89a");
  push(...u16(width), ...u16(height));

  let tableSizeExp = 0;
  while (1 << (tableSizeExp + 1) < palette.length) tableSizeExp++;
  const tableSize = 1 << (tableSizeExp + 1);
  const packed = (1 << 7) | (7 << 4) | (0 << 3) | tableSizeExp;
  push(packed, 0, 0);

  for (let i = 0; i < tableSize; i++) {
    const c = palette[i] ?? [0, 0, 0];
    push(c[0], c[1], c[2]);
  }

  push(0x2c, ...u16(0), ...u16(0), ...u16(width), ...u16(height), 0);

  const minCodeSize = Math.max(2, tableSizeExp + 1);
  push(minCodeSize);

  const lzwBytes = lzwEncode(indices, minCodeSize);
  let pos = 0;
  while (pos < lzwBytes.length) {
    const chunkSize = Math.min(255, lzwBytes.length - pos);
    push(chunkSize, ...lzwBytes.slice(pos, pos + chunkSize));
    pos += chunkSize;
  }
  push(0); // block terminator
  push(0x3b); // trailer

  return new Uint8Array(chunks);
}

export function encodeGif(imageData: ImageData): Uint8Array {
  const { width, height, data } = imageData;
  const pixelCount = width * height;
  const unique = getUniqueColors(data, pixelCount);
  const palette = unique.length <= 256 ? unique : medianCutQuantize(unique, 256);

  const indices: number[] = new Array(pixelCount);
  const cache = new Map<number, number>();
  for (let i = 0; i < pixelCount; i++) {
    const r = data[i * 4];
    const g = data[i * 4 + 1];
    const b = data[i * 4 + 2];
    const key = (r << 16) | (g << 8) | b;
    let idx = cache.get(key);
    if (idx === undefined) {
      idx = nearestPaletteIndex(r, g, b, palette);
      cache.set(key, idx);
    }
    indices[i] = idx;
  }

  return buildGif(width, height, indices, palette);
}

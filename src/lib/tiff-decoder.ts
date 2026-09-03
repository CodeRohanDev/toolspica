// Minimal TIFF decoder supporting uncompressed and PackBits-compressed
// baseline RGB/RGBA/grayscale strips — the common cases produced by most
// scanners and image editors. LZW and other TIFF compression schemes
// aren't supported and are reported clearly rather than silently misread.
// Verified against real TIFF files written by Pillow (Python's imaging
// library) in both uncompressed and PackBits form, with decoded pixels
// matching Pillow's own reader exactly at multiple sample points.

function packBitsDecode(data: Uint8Array): Uint8Array {
  const out: number[] = [];
  let i = 0;
  while (i < data.length) {
    let n = data[i++];
    if (n > 127) n -= 256;
    if (n >= 0) {
      for (let k = 0; k <= n; k++) out.push(data[i++]);
    } else if (n !== -128) {
      const val = data[i++];
      for (let k = 0; k < 1 - n; k++) out.push(val);
    }
  }
  return Uint8Array.from(out);
}

export interface DecodedTiff {
  width: number;
  height: number;
  pixels: Uint8ClampedArray; // RGBA
}

const TYPE_SIZES: Record<number, number> = { 1: 1, 2: 1, 3: 2, 4: 4, 5: 8 };

export function decodeTiff(buffer: ArrayBuffer): DecodedTiff {
  const bytes = new Uint8Array(buffer);
  const view = new DataView(buffer);
  const byteOrderMark = String.fromCharCode(bytes[0], bytes[1]);
  const little = byteOrderMark === "II";
  const u16 = (off: number) => view.getUint16(off, little);
  const u32 = (off: number) => view.getUint32(off, little);

  if (u16(2) !== 42) throw new Error("Not a valid TIFF file.");

  const ifdOffset = u32(4);
  const entryCount = u16(ifdOffset);
  const tags: Record<number, number[]> = {};
  let pos = ifdOffset + 2;
  for (let i = 0; i < entryCount; i++) {
    const tag = u16(pos);
    const type = u16(pos + 2);
    const numValues = u32(pos + 4);
    const typeSize = TYPE_SIZES[type] ?? 1;
    const totalSize = typeSize * numValues;
    let valueOffset = pos + 8;
    if (totalSize > 4) valueOffset = u32(pos + 8);

    const values: number[] = [];
    for (let v = 0; v < numValues; v++) {
      if (type === 3) values.push(view.getUint16(valueOffset + v * 2, little));
      else if (type === 4) values.push(view.getUint32(valueOffset + v * 4, little));
      else values.push(bytes[valueOffset + v]);
    }
    tags[tag] = values;
    pos += 12;
  }

  const width = tags[256]?.[0];
  const height = tags[257]?.[0];
  if (!width || !height) throw new Error("Missing image dimensions in TIFF tags.");

  const compression = tags[259]?.[0] ?? 1;
  const samplesPerPixel = tags[277]?.[0] ?? 1;
  const rowsPerStrip = tags[278]?.[0] ?? height;
  const stripOffsets = tags[273];
  const stripByteCounts = tags[279];
  if (!stripOffsets || !stripByteCounts) throw new Error("Missing strip data in TIFF tags.");

  if (compression !== 1 && compression !== 32773) {
    throw new Error(
      `This TIFF uses compression type ${compression}, which isn't supported — only uncompressed and PackBits-compressed TIFF files can be read.`
    );
  }

  const pixels = new Uint8ClampedArray(width * height * 4);
  let rowCursor = 0;
  for (let s = 0; s < stripOffsets.length; s++) {
    const offset = stripOffsets[s];
    const byteCount = stripByteCounts[s];
    let stripData: Uint8Array = bytes.slice(offset, offset + byteCount);
    if (compression === 32773) stripData = packBitsDecode(stripData);

    const rowsInStrip = Math.min(rowsPerStrip, height - rowCursor);
    for (let r = 0; r < rowsInStrip; r++) {
      const y = rowCursor + r;
      for (let x = 0; x < width; x++) {
        const srcIdx = (r * width + x) * samplesPerPixel;
        const dstIdx = (y * width + x) * 4;
        if (samplesPerPixel >= 3) {
          pixels[dstIdx] = stripData[srcIdx];
          pixels[dstIdx + 1] = stripData[srcIdx + 1];
          pixels[dstIdx + 2] = stripData[srcIdx + 2];
          pixels[dstIdx + 3] = samplesPerPixel === 4 ? stripData[srcIdx + 3] : 255;
        } else {
          pixels[dstIdx] = pixels[dstIdx + 1] = pixels[dstIdx + 2] = stripData[srcIdx];
          pixels[dstIdx + 3] = 255;
        }
      }
    }
    rowCursor += rowsInStrip;
  }

  return { width, height, pixels };
}

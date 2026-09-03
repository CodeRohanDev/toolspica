// Sets the DPI (print resolution) metadata on a JPEG or PNG file without
// re-encoding the pixel data: patches the existing JFIF APP0 density fields
// for JPEG, or inserts a pHYs chunk right after IHDR for PNG. Verified by
// patching real Pillow-generated files and confirming Pillow reads back the
// exact DPI value afterward.

const CRC_TABLE = (() => {
  const table = new Uint32Array(256);
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    table[n] = c >>> 0;
  }
  return table;
})();

function crc32(data: Uint8Array): number {
  let crc = 0xffffffff;
  for (let i = 0; i < data.length; i++) crc = CRC_TABLE[(crc ^ data[i]) & 0xff] ^ (crc >>> 8);
  return (crc ^ 0xffffffff) >>> 0;
}

function setJpegDpi(bytes: Uint8Array, dpi: number): Uint8Array {
  const view = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);
  const out = new Uint8Array(bytes); // copy
  const outView = new DataView(out.buffer);
  let offset = 2;
  while (offset < bytes.length - 1) {
    if (bytes[offset] !== 0xff) break;
    const marker = bytes[offset + 1];
    if (marker === 0xd8) {
      offset += 2;
      continue;
    }
    const segLength = view.getUint16(offset + 2);
    if (marker === 0xe0) {
      const id = new TextDecoder("ascii").decode(bytes.slice(offset + 4, offset + 9));
      if (id === "JFIF\0") {
        const segStart = offset + 4 + 5;
        out[segStart + 2] = 1; // density unit: 1 = dots per inch
        outView.setUint16(segStart + 3, dpi);
        outView.setUint16(segStart + 5, dpi);
        return out;
      }
    }
    if (marker === 0xda) break;
    offset += 2 + segLength;
  }
  throw new Error("No JFIF header found — this JPEG can't have its DPI patched this way.");
}

function setPngDpi(bytes: Uint8Array, dpi: number): Uint8Array {
  const view = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);
  const ihdrLength = view.getUint32(8);
  const ihdrEnd = 8 + 4 + 4 + ihdrLength + 4;

  const ppm = Math.round(dpi / 0.0254);
  const typeAndData = new Uint8Array(4 + 9);
  typeAndData.set(new TextEncoder().encode("pHYs"), 0);
  const tdView = new DataView(typeAndData.buffer);
  tdView.setUint32(4, ppm);
  tdView.setUint32(8, ppm);
  typeAndData[12] = 1; // unit: meter

  const chunk = new Uint8Array(4 + 4 + 9 + 4);
  const chunkView = new DataView(chunk.buffer);
  chunkView.setUint32(0, 9);
  chunk.set(typeAndData, 4);
  chunkView.setUint32(4 + 4 + 9, crc32(typeAndData));

  const result = new Uint8Array(bytes.length + chunk.length);
  result.set(bytes.slice(0, ihdrEnd), 0);
  result.set(chunk, ihdrEnd);
  result.set(bytes.slice(ihdrEnd), ihdrEnd + chunk.length);
  return result;
}

export async function setImageDpi(file: File, dpi: number): Promise<Uint8Array> {
  const bytes = new Uint8Array(await file.arrayBuffer());
  if (bytes[0] === 0xff && bytes[1] === 0xd8) return setJpegDpi(bytes, dpi);
  if (bytes[0] === 0x89 && bytes[1] === 0x50 && bytes[2] === 0x4e && bytes[3] === 0x47) {
    return setPngDpi(bytes, dpi);
  }
  throw new Error("Only JPEG and PNG files are supported.");
}

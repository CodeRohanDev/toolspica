// Minimal ICO file writer using the modern PNG-embedded entry format
// (supported since Windows Vista) — each size is stored as a plain PNG
// blob (produced by the browser's own canvas encoder) rather than a
// legacy BMP-based entry. Verified against Pillow (Python's imaging
// library) as an independent reader: multi-size output correctly reported
// available sizes and decoded exact pixel colors at each size.

export interface IcoImageEntry {
  size: number;
  pngData: Uint8Array;
}

export function buildIco(images: IcoImageEntry[]): Uint8Array {
  const headerSize = 6;
  const entrySize = 16;
  const header = new Uint8Array(headerSize);
  const headerView = new DataView(header.buffer);
  headerView.setUint16(0, 0, true);
  headerView.setUint16(2, 1, true);
  headerView.setUint16(4, images.length, true);

  let offset = headerSize + entrySize * images.length;
  const entries: Uint8Array[] = [];

  for (const img of images) {
    const entry = new Uint8Array(entrySize);
    const view = new DataView(entry.buffer);
    entry[0] = img.size >= 256 ? 0 : img.size;
    entry[1] = img.size >= 256 ? 0 : img.size;
    entry[2] = 0;
    entry[3] = 0;
    view.setUint16(4, 1, true);
    view.setUint16(6, 32, true);
    view.setUint32(8, img.pngData.length, true);
    view.setUint32(12, offset, true);
    entries.push(entry);
    offset += img.pngData.length;
  }

  const total = headerSize + entrySize * images.length + images.reduce((s, i) => s + i.pngData.length, 0);
  const result = new Uint8Array(total);
  let pos = 0;
  result.set(header, pos);
  pos += header.length;
  for (const entry of entries) {
    result.set(entry, pos);
    pos += entry.length;
  }
  for (const img of images) {
    result.set(img.pngData, pos);
    pos += img.pngData.length;
  }
  return result;
}

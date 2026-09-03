// Minimal ZIP file writer (stored/uncompressed entries only — no DEFLATE
// needed for the "download several images as one file" use case this backs).
// Verified against the real `unzip`/`zipinfo` tools: output lists and
// extracts correctly, with central-directory offsets matching exactly.

const CRC_TABLE = (() => {
  const table = new Uint32Array(256);
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) {
      c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    }
    table[n] = c >>> 0;
  }
  return table;
})();

function crc32(data: Uint8Array): number {
  let crc = 0xffffffff;
  for (let i = 0; i < data.length; i++) {
    crc = CRC_TABLE[(crc ^ data[i]) & 0xff] ^ (crc >>> 8);
  }
  return (crc ^ 0xffffffff) >>> 0;
}

function dosDateTime(date: Date): { time: number; dosDate: number } {
  const time =
    ((date.getHours() & 0x1f) << 11) | ((date.getMinutes() & 0x3f) << 5) | ((Math.floor(date.getSeconds() / 2)) & 0x1f);
  const dosDate =
    (((date.getFullYear() - 1980) & 0x7f) << 9) | (((date.getMonth() + 1) & 0xf) << 5) | (date.getDate() & 0x1f);
  return { time, dosDate };
}

function u32(view: DataView, offset: number, val: number) {
  view.setUint32(offset, val, true);
}
function u16(view: DataView, offset: number, val: number) {
  view.setUint16(offset, val, true);
}

export interface ZipEntry {
  name: string;
  data: Uint8Array;
}

export function createZip(files: ZipEntry[]): Uint8Array {
  const encoder = new TextEncoder();
  const localChunks: Uint8Array[] = [];
  const centralChunks: Uint8Array[] = [];
  let offset = 0;
  const { time, dosDate } = dosDateTime(new Date());

  for (const file of files) {
    const nameBytes = encoder.encode(file.name);
    const crc = crc32(file.data);
    const size = file.data.length;

    const localHeader = new Uint8Array(30);
    const lv = new DataView(localHeader.buffer);
    u32(lv, 0, 0x04034b50);
    u16(lv, 4, 20);
    u16(lv, 6, 0);
    u16(lv, 8, 0);
    u16(lv, 10, time);
    u16(lv, 12, dosDate);
    u32(lv, 14, crc);
    u32(lv, 18, size);
    u32(lv, 22, size);
    u16(lv, 26, nameBytes.length);
    u16(lv, 28, 0);

    localChunks.push(localHeader, nameBytes, file.data);

    const centralHeader = new Uint8Array(46);
    const cv = new DataView(centralHeader.buffer);
    u32(cv, 0, 0x02014b50);
    u16(cv, 4, 20);
    u16(cv, 6, 20);
    u16(cv, 8, 0);
    u16(cv, 10, 0);
    u16(cv, 12, time);
    u16(cv, 14, dosDate);
    u32(cv, 16, crc);
    u32(cv, 20, size);
    u32(cv, 24, size);
    u16(cv, 28, nameBytes.length);
    u16(cv, 30, 0);
    u16(cv, 32, 0);
    u16(cv, 34, 0);
    u16(cv, 36, 0);
    u32(cv, 38, 0);
    u32(cv, 42, offset);

    centralChunks.push(centralHeader, nameBytes);

    offset += localHeader.length + nameBytes.length + size;
  }

  const centralStart = offset;
  const centralSize = centralChunks.reduce((sum, c) => sum + c.length, 0);

  const eocd = new Uint8Array(22);
  const ev = new DataView(eocd.buffer);
  u32(ev, 0, 0x06054b50);
  u16(ev, 4, 0);
  u16(ev, 6, 0);
  u16(ev, 8, files.length);
  u16(ev, 10, files.length);
  u32(ev, 12, centralSize);
  u32(ev, 16, centralStart);
  u16(ev, 20, 0);

  const allChunks = [...localChunks, ...centralChunks, eocd];
  const totalSize = allChunks.reduce((sum, c) => sum + c.length, 0);
  const result = new Uint8Array(totalSize);
  let pos = 0;
  for (const chunk of allChunks) {
    result.set(chunk, pos);
    pos += chunk.length;
  }
  return result;
}

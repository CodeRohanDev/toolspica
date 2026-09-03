// Minimal JPEG EXIF/TIFF metadata parser. Reads the APP1 "Exif" segment and
// walks its TIFF-format IFD0 entries. Verified against a real JPEG written
// by Pillow (Python's imaging library) with known tag values, confirming
// every extracted value matched exactly what was embedded.

const TAG_NAMES: Record<number, string> = {
  0x010f: "Make",
  0x0110: "Model",
  0x0112: "Orientation",
  0x011a: "XResolution",
  0x011b: "YResolution",
  0x0128: "ResolutionUnit",
  0x0131: "Software",
  0x0132: "DateTime",
  0x829a: "ExposureTime",
  0x829d: "FNumber",
  0x8827: "ISOSpeedRatings",
  0x8825: "GPSInfoIFDPointer",
  0x920a: "FocalLength",
  0xa002: "PixelXDimension",
  0xa003: "PixelYDimension",
};

const TYPE_SIZES: Record<number, number> = { 1: 1, 2: 1, 3: 2, 4: 4, 5: 8, 6: 1, 7: 1, 8: 2, 9: 4, 10: 8, 11: 4, 12: 8 };

export type ExifValue = string | number | null;

function readTiffIfd(view: DataView, tiffStart: number): Record<string, ExifValue> {
  const byteOrderMark = String.fromCharCode(view.getUint8(tiffStart), view.getUint8(tiffStart + 1));
  const little = byteOrderMark === "II";
  const u16 = (off: number) => view.getUint16(off, little);
  const u32 = (off: number) => view.getUint32(off, little);

  const ifdOffset = u32(tiffStart + 4);
  const result: Record<string, ExifValue> = {};

  const entryCount = u16(tiffStart + ifdOffset);
  let pos = tiffStart + ifdOffset + 2;
  for (let i = 0; i < entryCount; i++) {
    const tag = u16(pos);
    const type = u16(pos + 2);
    const numValues = u32(pos + 4);
    const valueSize = (TYPE_SIZES[type] ?? 1) * numValues;
    let valueOffset = pos + 8;
    if (valueSize > 4) valueOffset = tiffStart + u32(pos + 8);

    let value: ExifValue = null;
    if (type === 2) {
      const bytes = new Uint8Array(view.buffer, valueOffset, Math.max(0, numValues - 1));
      value = new TextDecoder("ascii").decode(bytes);
    } else if (type === 3) {
      value = view.getUint16(valueOffset, little);
    } else if (type === 4) {
      value = view.getUint32(valueOffset, little);
    } else if (type === 5) {
      const num = view.getUint32(valueOffset, little);
      const den = view.getUint32(valueOffset + 4, little);
      value = den !== 0 ? num / den : 0;
    }

    const name = TAG_NAMES[tag] ?? `0x${tag.toString(16)}`;
    result[name] = value;
    pos += 12;
  }
  return result;
}

export interface ImageMetadata {
  fileType: string;
  fileSize: number;
  width: number | null;
  height: number | null;
  exif: Record<string, ExifValue> | null;
}

export async function readImageMetadata(file: File): Promise<ImageMetadata> {
  const buffer = await file.arrayBuffer();
  const view = new DataView(buffer);
  const bytes = new Uint8Array(buffer);

  let width: number | null = null;
  let height: number | null = null;
  let exif: Record<string, ExifValue> | null = null;

  if (bytes[0] === 0xff && bytes[1] === 0xd8) {
    // JPEG
    let offset = 2;
    while (offset < bytes.length - 1) {
      if (bytes[offset] !== 0xff) break;
      const marker = bytes[offset + 1];
      if (marker === 0xd8 || marker === 0xd9) {
        offset += 2;
        continue;
      }
      const segLength = view.getUint16(offset + 2);
      // SOF0/1/2 markers carry width/height
      if ((marker >= 0xc0 && marker <= 0xcf && marker !== 0xc4 && marker !== 0xc8 && marker !== 0xcc)) {
        height = view.getUint16(offset + 5);
        width = view.getUint16(offset + 7);
      }
      if (marker === 0xe1) {
        const app1Start = offset + 4;
        const id = new TextDecoder("ascii").decode(bytes.slice(app1Start, app1Start + 6));
        if (id === "Exif\0\0") {
          try {
            exif = readTiffIfd(view, app1Start + 6);
          } catch {
            exif = null;
          }
        }
      }
      if (marker === 0xda) break;
      offset += 2 + segLength;
    }
    return { fileType: "JPEG", fileSize: file.size, width, height, exif };
  }

  if (bytes[0] === 0x89 && bytes[1] === 0x50 && bytes[2] === 0x4e && bytes[3] === 0x47) {
    // PNG: IHDR chunk starts at byte 16 (8-byte signature + 4-byte length + 4-byte "IHDR")
    width = view.getUint32(16);
    height = view.getUint32(20);
    return { fileType: "PNG", fileSize: file.size, width, height, exif: null };
  }

  return { fileType: file.type || "Unknown", fileSize: file.size, width: null, height: null, exif: null };
}

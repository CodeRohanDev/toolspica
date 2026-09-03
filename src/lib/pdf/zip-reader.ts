// Minimal ZIP reader for parsing uploaded .docx/.xlsx/.pptx (which are all
// just ZIP containers of XML). Reads the central directory for entry names
// and offsets, then extracts each entry via its local header — supporting
// both STORED (method 0) and DEFLATE (method 8, decompressed with the
// browser's native DecompressionStream, so no hand-written inflate needed).

export interface ZipReadEntry {
  name: string;
  getData: () => Promise<Uint8Array>;
}

function u32(view: DataView, offset: number): number {
  return view.getUint32(offset, true);
}
function u16(view: DataView, offset: number): number {
  return view.getUint16(offset, true);
}

export async function readZip(bytes: Uint8Array): Promise<ZipReadEntry[]> {
  const view = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);

  let eocdOffset = -1;
  for (let i = bytes.length - 22; i >= 0 && i >= bytes.length - 22 - 65536; i--) {
    if (u32(view, i) === 0x06054b50) {
      eocdOffset = i;
      break;
    }
  }
  if (eocdOffset === -1) throw new Error("Not a valid ZIP-based file (no end-of-central-directory record found).");

  const entryCount = u16(view, eocdOffset + 10);
  const centralDirOffset = u32(view, eocdOffset + 16);

  const decoder = new TextDecoder();
  const entries: ZipReadEntry[] = [];
  let pos = centralDirOffset;

  for (let i = 0; i < entryCount; i++) {
    if (u32(view, pos) !== 0x02014b50) throw new Error("Corrupt ZIP central directory.");
    const compressionMethod = u16(view, pos + 10);
    const compressedSize = u32(view, pos + 20);
    const nameLength = u16(view, pos + 28);
    const extraLength = u16(view, pos + 30);
    const commentLength = u16(view, pos + 32);
    const localHeaderOffset = u32(view, pos + 42);
    const nameBytes = bytes.subarray(pos + 46, pos + 46 + nameLength);
    const name = decoder.decode(nameBytes);

    entries.push({
      name,
      getData: async () => {
        const lv = new DataView(bytes.buffer, bytes.byteOffset + localHeaderOffset, 30);
        const localNameLength = u16(lv, 26);
        const localExtraLength = u16(lv, 28);
        const dataStart = localHeaderOffset + 30 + localNameLength + localExtraLength;
        const compressed = bytes.subarray(dataStart, dataStart + compressedSize);

        if (compressionMethod === 0) return new Uint8Array(compressed);
        if (compressionMethod === 8) {
          const stream = new Blob([compressed as BlobPart])
            .stream()
            .pipeThrough(new DecompressionStream("deflate-raw"));
          const buffer = await new Response(stream).arrayBuffer();
          return new Uint8Array(buffer);
        }
        throw new Error(`Unsupported ZIP compression method: ${compressionMethod}`);
      },
    });

    pos += 46 + nameLength + extraLength + commentLength;
  }

  return entries;
}

export async function readZipEntryText(entries: ZipReadEntry[], name: string): Promise<string | null> {
  const entry = entries.find((e) => e.name === name);
  if (!entry) return null;
  const data = await entry.getData();
  return new TextDecoder().decode(data);
}

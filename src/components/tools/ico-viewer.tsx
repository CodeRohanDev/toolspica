"use client";

import * as React from "react";
import { Upload } from "lucide-react";

interface IcoEntry {
  width: number;
  height: number;
  bitCount: number;
  size: number;
  previewUrl: string | null;
}

function parseIco(buffer: ArrayBuffer): IcoEntry[] {
  const view = new DataView(buffer);
  const bytes = new Uint8Array(buffer);
  const type = view.getUint16(2, true);
  if (type !== 1) throw new Error("Not a valid .ico file");

  const count = view.getUint16(4, true);
  const entries: IcoEntry[] = [];

  for (let i = 0; i < count; i++) {
    const base = 6 + i * 16;
    const width = bytes[base] || 256;
    const height = bytes[base + 1] || 256;
    const bitCount = view.getUint16(base + 6, true);
    const size = view.getUint32(base + 8, true);
    const offset = view.getUint32(base + 12, true);

    const imageBytes = bytes.slice(offset, offset + size);
    const isPng = imageBytes[0] === 0x89 && imageBytes[1] === 0x50 && imageBytes[2] === 0x4e && imageBytes[3] === 0x47;

    let previewUrl: string | null = null;
    if (isPng) {
      const blob = new Blob([imageBytes as BlobPart], { type: "image/png" });
      previewUrl = URL.createObjectURL(blob);
    }

    entries.push({ width, height, bitCount, size, previewUrl });
  }

  return entries;
}

export function IcoViewer() {
  const [entries, setEntries] = React.useState<IcoEntry[]>([]);
  const [error, setError] = React.useState("");
  const [fileName, setFileName] = React.useState("");

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setFileName(file.name);
    setError("");
    try {
      const buffer = await file.arrayBuffer();
      setEntries(parseIco(buffer));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Couldn't read that file.");
      setEntries([]);
    }
  }

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <label className="flex w-fit cursor-pointer items-center gap-2 rounded-md border px-3 py-2 text-sm hover:bg-accent">
        <Upload className="size-4" />
        {fileName || "Upload an .ico file"}
        <input type="file" accept=".ico" onChange={handleUpload} className="hidden" />
      </label>

      {error && <p className="mt-3 text-sm text-destructive">{error}</p>}

      {entries.length > 0 && (
        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          {entries.map((entry, i) => (
            <div key={i} className="flex flex-col items-center gap-2 rounded-lg border p-3">
              <div className="flex size-16 items-center justify-center rounded bg-[repeating-conic-gradient(#e5e7eb_0%_25%,transparent_0%_50%)] bg-[length:12px_12px]">
                {entry.previewUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={entry.previewUrl} alt={`${entry.width}x${entry.height} icon`} className="max-h-full max-w-full" />
                ) : (
                  <span className="text-xs text-muted-foreground">no preview</span>
                )}
              </div>
              <p className="text-xs font-medium">{entry.width}×{entry.height}</p>
              <p className="text-xs text-muted-foreground">{entry.bitCount}-bit · {(entry.size / 1024).toFixed(1)} KB</p>
            </div>
          ))}
        </div>
      )}
      <p className="mt-3 text-xs text-muted-foreground">
        A single .ico file often bundles multiple resolutions. PNG-encoded entries (common in
        larger sizes) render a preview; legacy BMP-encoded entries show size info only.
      </p>
    </div>
  );
}

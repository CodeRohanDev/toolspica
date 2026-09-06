"use client";

import * as React from "react";
import { Upload, FileIcon } from "lucide-react";
import { extractArchive } from "@/lib/sevenzip-setup";
import { formatMediaBytes } from "@/lib/media-helpers";

interface Entry {
  name: string;
  size: number;
}

export function ArchiveContentViewer() {
  const [entries, setEntries] = React.useState<Entry[]>([]);
  const [fileName, setFileName] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState("");

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setFileName(file.name);
    setError("");
    setLoading(true);
    setEntries([]);
    try {
      const buffer = new Uint8Array(await file.arrayBuffer());
      const extracted = await extractArchive(buffer, file.name);
      setEntries(extracted.map((f) => ({ name: f.name, size: f.data.length })).sort((a, b) => a.name.localeCompare(b.name)));
    } catch {
      setError("Couldn't read this archive — it may be an unsupported or password-protected format.");
    } finally {
      setLoading(false);
    }
  }

  const totalSize = entries.reduce((sum, e) => sum + e.size, 0);

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <label className="flex w-fit cursor-pointer items-center gap-2 rounded-md border px-3 py-2 text-sm hover:bg-accent">
        <Upload className="size-4" />
        {fileName || "Upload an archive (.zip, .tar, .7z, .rar, .gz)"}
        <input type="file" accept=".zip,.tar,.7z,.rar,.gz,.tar.gz" onChange={handleUpload} className="hidden" />
      </label>

      {loading && <p className="mt-3 text-sm text-muted-foreground">Reading archive...</p>}
      {error && <p className="mt-3 text-sm text-destructive">{error}</p>}

      {entries.length > 0 && (
        <div className="mt-4 border-t pt-4">
          <p className="mb-2 text-sm text-muted-foreground">
            {entries.length} file{entries.length === 1 ? "" : "s"} · {formatMediaBytes(totalSize)} total
          </p>
          <div className="max-h-[750px] overflow-auto rounded-lg border">
            <table className="w-full text-sm">
              <tbody>
                {entries.map((entry, i) => (
                  <tr key={i} className="border-b last:border-b-0">
                    <td className="flex items-center gap-2 p-2 font-mono text-xs">
                      <FileIcon className="size-3.5 shrink-0 text-muted-foreground" />
                      <span className="truncate">{entry.name}</span>
                    </td>
                    <td className="whitespace-nowrap p-2 text-right text-xs text-muted-foreground">{formatMediaBytes(entry.size)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
      <p className="mt-3 text-xs text-muted-foreground">
        Lists every file inside the archive without needing to extract it to disk — supports ZIP,
        TAR, 7Z, RAR, and GZIP.
      </p>
    </div>
  );
}

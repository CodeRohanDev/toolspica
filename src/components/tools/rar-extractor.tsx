"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { MediaUploadZone, formatBytes } from "@/components/tools/media-upload-zone";
import { extractArchive, type ExtractedEntry } from "@/lib/sevenzip-setup";
import { downloadMediaBytes, stripMediaExtension } from "@/lib/media-helpers";
import { createZip } from "@/lib/zip-writer";

export function RarExtractor() {
  const [file, setFile] = React.useState<File | null>(null);
  const [entries, setEntries] = React.useState<ExtractedEntry[]>([]);
  const [error, setError] = React.useState<string | null>(null);
  const [busy, setBusy] = React.useState(false);

  async function handleFile(picked: File) {
    setFile(picked);
    setError(null);
    setEntries([]);
    setBusy(true);
    try {
      const buffer = new Uint8Array(await picked.arrayBuffer());
      const result = await extractArchive(buffer, "in.rar");
      if (result.length === 0) throw new Error("No files found — this may not be a valid RAR archive.");
      setEntries(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Couldn't extract this RAR file — it may be password-protected or a multi-volume set.");
    } finally {
      setBusy(false);
    }
  }

  function downloadAll() {
    if (!file) return;
    const zip = createZip(entries);
    downloadMediaBytes(zip, `${stripMediaExtension(file.name)}-extracted.zip`, "application/zip");
  }

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <MediaUploadZone file={file} onFileSelect={handleFile} onClear={() => setFile(null)} accept=".rar" kind="archive" />

      {busy && <p className="mt-3 text-sm text-muted-foreground">Reading archive...</p>}
      {error && <p className="mt-3 text-sm text-destructive">{error}</p>}

      {entries.length > 0 && (
        <>
          <div className="mt-4 space-y-1.5">
            {entries.map((e, i) => (
              <div key={i} className="flex items-center justify-between rounded-lg border px-3 py-2">
                <p className="truncate text-sm">{e.name}</p>
                <p className="text-xs text-muted-foreground">{formatBytes(e.data.length)}</p>
              </div>
            ))}
          </div>
          <Button type="button" className="mt-4" onClick={downloadAll}>
            <Download className="size-4" /> Download all as ZIP
          </Button>
        </>
      )}

      <p className="mt-3 text-xs text-muted-foreground">
        Supports both RAR4 and RAR5 formats via a real 7-Zip build compiled to WebAssembly. Multi-volume RAR sets (spanning multiple .rNN files) and password-protected archives aren't supported here.
      </p>
    </div>
  );
}

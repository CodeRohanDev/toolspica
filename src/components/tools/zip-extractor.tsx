"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { MediaUploadZone, formatBytes } from "@/components/tools/media-upload-zone";
import { readZip, type ZipReadEntry } from "@/lib/pdf/zip-reader";
import { downloadMediaBytes } from "@/lib/media-helpers";

interface Extracted {
  name: string;
  size: number;
  getData: ZipReadEntry["getData"];
}

export function ZipExtractor() {
  const [file, setFile] = React.useState<File | null>(null);
  const [entries, setEntries] = React.useState<Extracted[]>([]);
  const [error, setError] = React.useState<string | null>(null);
  const [busy, setBusy] = React.useState(false);

  async function handleFile(picked: File) {
    setFile(picked);
    setError(null);
    setEntries([]);
    setBusy(true);
    try {
      const bytes = new Uint8Array(await picked.arrayBuffer());
      const zipEntries = await readZip(bytes);
      const withSizes = await Promise.all(
        zipEntries
          .filter((e) => !e.name.endsWith("/"))
          .map(async (e) => ({ name: e.name, size: (await e.getData()).length, getData: e.getData }))
      );
      setEntries(withSizes);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Couldn't read this ZIP file.");
    } finally {
      setBusy(false);
    }
  }

  async function downloadOne(entry: Extracted) {
    const data = await entry.getData();
    const name = entry.name.split("/").pop() || entry.name;
    downloadMediaBytes(data, name, "application/octet-stream");
  }

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <MediaUploadZone file={file} onFileSelect={handleFile} onClear={() => setFile(null)} accept=".zip,application/zip" kind="archive" />

      {busy && <p className="mt-3 text-sm text-muted-foreground">Reading archive...</p>}
      {error && <p className="mt-3 text-sm text-destructive">{error}</p>}

      {entries.length > 0 && (
        <div className="mt-4 space-y-1.5">
          {entries.map((e, i) => (
            <div key={i} className="flex items-center justify-between rounded-lg border px-3 py-2">
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm">{e.name}</p>
                <p className="text-xs text-muted-foreground">{formatBytes(e.size)}</p>
              </div>
              <Button type="button" size="sm" variant="outline" onClick={() => downloadOne(e)}>
                <Download className="size-3.5" /> Download
              </Button>
            </div>
          ))}
        </div>
      )}

      <p className="mt-3 text-xs text-muted-foreground">
        Reads the ZIP's contents directly in your browser (supports both stored and DEFLATE-compressed entries) — click any file to download it individually, nothing is uploaded.
      </p>
    </div>
  );
}

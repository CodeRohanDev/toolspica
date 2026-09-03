"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Download, X } from "lucide-react";
import { MediaUploadZone, formatBytes } from "@/components/tools/media-upload-zone";
import { createZip } from "@/lib/zip-writer";
import { downloadMediaBytes } from "@/lib/media-helpers";

export function ZipCreator() {
  const [files, setFiles] = React.useState<File[]>([]);

  function addFiles(picked: File[]) {
    setFiles((prev) => [...prev, ...picked]);
  }
  function removeFile(i: number) {
    setFiles((prev) => prev.filter((_, idx) => idx !== i));
  }

  async function create() {
    const entries = await Promise.all(
      files.map(async (f) => ({ name: f.name, data: new Uint8Array(await f.arrayBuffer()) }))
    );
    const zip = createZip(entries);
    downloadMediaBytes(zip, "archive.zip", "application/zip");
  }

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <MediaUploadZone file={null} onFileSelect={() => {}} onClear={() => {}} kind="archive" multiple onFilesSelect={addFiles} label="Add files to zip together" />

      {files.length > 0 && (
        <div className="mt-4 space-y-2">
          {files.map((f, i) => (
            <div key={i} className="flex items-center gap-3 rounded-lg border p-2">
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm">{f.name}</p>
                <p className="text-xs text-muted-foreground">{formatBytes(f.size)}</p>
              </div>
              <Button type="button" variant="ghost" size="icon-sm" onClick={() => removeFile(i)} aria-label="Remove"><X className="size-4" /></Button>
            </div>
          ))}
        </div>
      )}

      <Button type="button" className="mt-4" onClick={create} disabled={files.length === 0}>
        <Download className="size-4" />
        Create ZIP ({files.length} file{files.length === 1 ? "" : "s"})
      </Button>
      <p className="mt-2 text-xs text-muted-foreground">
        Builds a real, standard ZIP file (stored, uncompressed entries) entirely in your browser — no upload.
      </p>
    </div>
  );
}

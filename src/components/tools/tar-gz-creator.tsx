"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Download, X } from "lucide-react";
import { MediaUploadZone, formatBytes } from "@/components/tools/media-upload-zone";
import { createSevenZip } from "@/lib/sevenzip-setup";
import { downloadMediaBytes } from "@/lib/media-helpers";

export function TarGzCreator() {
  const [files, setFiles] = React.useState<File[]>([]);
  const [busy, setBusy] = React.useState(false);

  function addFiles(picked: File[]) {
    setFiles((prev) => [...prev, ...picked]);
  }
  function removeFile(i: number) {
    setFiles((prev) => prev.filter((_, idx) => idx !== i));
  }

  async function create() {
    if (files.length === 0) return;
    setBusy(true);
    try {
      const sevenZip = await createSevenZip();
      for (const f of files) sevenZip.FS.writeFile(f.name, new Uint8Array(await f.arrayBuffer()));
      sevenZip.callMain(["a", "-ttar", "out.tar", ...files.map((f) => f.name)]);
      sevenZip.callMain(["a", "-tgzip", "out.tar.gz", "out.tar"]);
      const data = sevenZip.FS.readFile("out.tar.gz") as Uint8Array;
      downloadMediaBytes(data, "archive.tar.gz", "application/gzip");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <MediaUploadZone file={null} onFileSelect={() => {}} onClear={() => {}} kind="archive" multiple onFilesSelect={addFiles} label="Add files to bundle" />

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

      <Button type="button" className="mt-4" onClick={create} disabled={files.length === 0 || busy}>
        <Download className="size-4" />
        {busy ? "Creating..." : `Create .tar.gz (${files.length} file${files.length === 1 ? "" : "s"})`}
      </Button>
      <p className="mt-2 text-xs text-muted-foreground">
        Bundles files into a TAR archive, then compresses it with GZIP — the standard combination used across Linux and macOS for distributing file bundles.
      </p>
    </div>
  );
}

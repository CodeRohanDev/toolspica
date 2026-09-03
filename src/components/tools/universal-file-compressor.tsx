"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { MediaUploadZone, formatBytes } from "@/components/tools/media-upload-zone";
import { downloadMediaBytes } from "@/lib/media-helpers";

export function UniversalFileCompressor() {
  const [file, setFile] = React.useState<File | null>(null);
  const [resultSize, setResultSize] = React.useState<number | null>(null);
  const [busy, setBusy] = React.useState(false);

  async function compress() {
    if (!file) return;
    setBusy(true);
    setResultSize(null);
    try {
      const stream = file.stream().pipeThrough(new CompressionStream("gzip"));
      const buffer = await new Response(stream).arrayBuffer();
      setResultSize(buffer.byteLength);
      downloadMediaBytes(new Uint8Array(buffer), `${file.name}.gz`, "application/gzip");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <MediaUploadZone file={file} onFileSelect={setFile} onClear={() => setFile(null)} kind="archive" label="Drop any file to compress" />

      <Button type="button" className="mt-4" onClick={compress} disabled={!file || busy}>
        <Download className="size-4" />
        {busy ? "Compressing..." : "Compress with GZIP"}
      </Button>
      {file && resultSize !== null && (
        <p className="mt-2 text-xs text-muted-foreground">{formatBytes(file.size)} → {formatBytes(resultSize)}</p>
      )}
      <p className="mt-2 text-xs text-muted-foreground">
        Works on any file type using your browser's native GZIP compression — no library, no upload. How much it shrinks depends entirely on the file's content (already-compressed files like JPGs or MP4s won't shrink much further).
      </p>
    </div>
  );
}

"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { MediaUploadZone } from "@/components/tools/media-upload-zone";
import { downloadMediaBytes, stripMediaExtension } from "@/lib/media-helpers";

export function GzipExtractor() {
  const [file, setFile] = React.useState<File | null>(null);
  const [error, setError] = React.useState<string | null>(null);
  const [busy, setBusy] = React.useState(false);

  async function extract() {
    if (!file) return;
    setError(null);
    setBusy(true);
    try {
      const stream = file.stream().pipeThrough(new DecompressionStream("gzip"));
      const buffer = await new Response(stream).arrayBuffer();
      downloadMediaBytes(new Uint8Array(buffer), stripMediaExtension(file.name), "application/octet-stream");
    } catch {
      setError("Couldn't decompress this file — it may not be a valid GZIP file.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <MediaUploadZone file={file} onFileSelect={setFile} onClear={() => setFile(null)} accept=".gz,application/gzip" kind="archive" />

      {error && <p className="mt-3 text-sm text-destructive">{error}</p>}

      <Button type="button" className="mt-4" onClick={extract} disabled={!file || busy}>
        <Download className="size-4" />
        {busy ? "Extracting..." : "Extract"}
      </Button>
      <p className="mt-2 text-xs text-muted-foreground">
        Uses your browser's native decompression API — no library needed, no upload. GZIP compresses a single file, so extraction produces one file back.
      </p>
    </div>
  );
}

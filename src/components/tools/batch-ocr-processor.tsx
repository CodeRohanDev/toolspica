"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Download, X } from "lucide-react";
import { MediaUploadZone, formatBytes } from "@/components/tools/media-upload-zone";
import { downloadMediaBytes } from "@/lib/media-helpers";
import { createZip } from "@/lib/zip-writer";

export function BatchOcrProcessor() {
  const [files, setFiles] = React.useState<File[]>([]);
  const [busy, setBusy] = React.useState(false);
  const [progress, setProgress] = React.useState("");
  const [error, setError] = React.useState<string | null>(null);

  function addFiles(picked: File[]) {
    setFiles((prev) => [...prev, ...picked]);
  }
  function removeFile(i: number) {
    setFiles((prev) => prev.filter((_, idx) => idx !== i));
  }

  async function run() {
    if (files.length === 0) return;
    setBusy(true);
    setError(null);
    try {
      const { createWorker } = await import("tesseract.js");
      const worker = await createWorker("eng", 1, { corePath: "/tesseract-core", workerPath: "/tesseract-worker.min.js" });
      const entries: { name: string; data: Uint8Array }[] = [];
      for (let i = 0; i < files.length; i++) {
        setProgress(`Processing ${i + 1} of ${files.length}: ${files[i].name}`);
        const { data } = await worker.recognize(files[i]);
        entries.push({ name: `${files[i].name.replace(/\.[^.]+$/, "")}.txt`, data: new TextEncoder().encode(data.text) });
      }
      await worker.terminate();
      const zip = createZip(entries);
      downloadMediaBytes(zip, "ocr-results.zip", "application/zip");
    } catch {
      setError("Couldn't process one or more images.");
    } finally {
      setBusy(false);
      setProgress("");
    }
  }

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <MediaUploadZone file={null} onFileSelect={() => {}} onClear={() => {}} kind="archive" multiple onFilesSelect={addFiles} label="Add multiple images to OCR" />

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

      {busy && progress && <p className="mt-3 text-sm text-muted-foreground">{progress}</p>}
      {error && <p className="mt-3 text-sm text-destructive">{error}</p>}

      <Button type="button" className="mt-4" onClick={run} disabled={files.length === 0 || busy}>
        <Download className="size-4" />
        {busy ? "Processing..." : `Run OCR on ${files.length} image${files.length === 1 ? "" : "s"}`}
      </Button>
      <p className="mt-2 text-xs text-muted-foreground">
        Runs OCR on every image one at a time and bundles each result as a matching .txt file inside one ZIP — useful for digitizing a whole folder of scanned pages or photos at once.
      </p>
    </div>
  );
}

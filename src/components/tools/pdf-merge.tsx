"use client";

import * as React from "react";
import { PDFDocument } from "pdf-lib";
import { Button } from "@/components/ui/button";
import { FileText, X, Download } from "lucide-react";
import { PdfUploadZone } from "@/components/tools/pdf-upload-zone";
import { downloadPdfBytes, formatBytes } from "@/lib/pdf/pdf-helpers";

export function PdfMerge() {
  const [files, setFiles] = React.useState<File[]>([]);
  const [processing, setProcessing] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  function addFiles(newFiles: File[]) {
    setFiles((prev) => [...prev, ...newFiles]);
    setError(null);
  }
  function removeFile(i: number) {
    setFiles((prev) => prev.filter((_, idx) => idx !== i));
  }
  function move(i: number, dir: -1 | 1) {
    setFiles((prev) => {
      const next = [...prev];
      const target = i + dir;
      if (target < 0 || target >= next.length) return prev;
      [next[i], next[target]] = [next[target], next[i]];
      return next;
    });
  }

  async function merge() {
    if (files.length < 2) return;
    setProcessing(true);
    setError(null);
    try {
      const merged = await PDFDocument.create();
      for (const file of files) {
        const bytes = await file.arrayBuffer();
        const src = await PDFDocument.load(bytes);
        const pages = await merged.copyPages(src, src.getPageIndices());
        pages.forEach((p) => merged.addPage(p));
      }
      const bytes = await merged.save();
      downloadPdfBytes(bytes, "merged.pdf");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Couldn't merge these PDFs — one may be corrupted or password-protected.");
    } finally {
      setProcessing(false);
    }
  }

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <PdfUploadZone
        file={null}
        onFileSelect={() => {}}
        onClear={() => {}}
        multiple
        onFilesSelect={addFiles}
        label="Drop PDFs to merge, or click to browse (select multiple)"
      />

      {files.length > 0 && (
        <div className="mt-4 space-y-2">
          {files.map((f, i) => (
            <div key={i} className="flex items-center gap-3 rounded-lg border p-2">
              <span className="w-6 text-center text-xs text-muted-foreground">{i + 1}</span>
              <FileText className="size-5 shrink-0 text-muted-foreground" />
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm">{f.name}</p>
                <p className="text-xs text-muted-foreground">{formatBytes(f.size)}</p>
              </div>
              <Button type="button" variant="ghost" size="icon-sm" onClick={() => move(i, -1)} disabled={i === 0}>
                ↑
              </Button>
              <Button type="button" variant="ghost" size="icon-sm" onClick={() => move(i, 1)} disabled={i === files.length - 1}>
                ↓
              </Button>
              <Button type="button" variant="ghost" size="icon-sm" onClick={() => removeFile(i)} aria-label="Remove">
                <X className="size-4" />
              </Button>
            </div>
          ))}
        </div>
      )}

      {error && <p className="mt-3 text-sm text-destructive">{error}</p>}

      <Button type="button" className="mt-4" onClick={merge} disabled={files.length < 2 || processing}>
        <Download className="size-4" />
        {processing ? "Merging..." : `Merge ${files.length} PDFs`}
      </Button>
      {files.length === 1 && (
        <p className="mt-2 text-sm text-muted-foreground">Add at least one more PDF to merge.</p>
      )}
    </div>
  );
}

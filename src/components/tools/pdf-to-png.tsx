"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { PdfUploadZone } from "@/components/tools/pdf-upload-zone";
import { loadPdfDocument } from "@/lib/pdf/pdfjs-setup";
import { downloadBytesFile, stripPdfExtension } from "@/lib/pdf/pdf-helpers";
import { createZip } from "@/lib/zip-writer";

export function PdfToPng() {
  const [file, setFile] = React.useState<File | null>(null);
  const [pageCount, setPageCount] = React.useState(0);
  const [processing, setProcessing] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  async function handleFile(picked: File) {
    setFile(picked);
    setError(null);
    try {
      const buffer = await picked.arrayBuffer();
      const doc = await loadPdfDocument(new Uint8Array(buffer));
      setPageCount(doc.numPages);
    } catch {
      setError("Couldn't read this PDF — it may be corrupted or password-protected.");
    }
  }

  async function convert() {
    if (!file) return;
    setProcessing(true);
    setError(null);
    try {
      const buffer = await file.arrayBuffer();
      const doc = await loadPdfDocument(new Uint8Array(buffer));
      const entries: { name: string; data: Uint8Array }[] = [];

      for (let i = 1; i <= doc.numPages; i++) {
        const page = await doc.getPage(i);
        const viewport = page.getViewport({ scale: 2 });
        const canvas = document.createElement("canvas");
        canvas.width = viewport.width;
        canvas.height = viewport.height;
        const ctx = canvas.getContext("2d")!;
        await page.render({ canvasContext: ctx, viewport, canvas }).promise;
        const blob: Blob = await new Promise((resolve, reject) =>
          canvas.toBlob((b) => (b ? resolve(b) : reject(new Error("export failed"))), "image/png")
        );
        entries.push({ name: `page-${i}.png`, data: new Uint8Array(await blob.arrayBuffer()) });
      }

      if (entries.length === 1) {
        downloadBytesFile(entries[0].data, `${stripPdfExtension(file.name)}.png`, "image/png");
      } else {
        const zip = createZip(entries);
        downloadBytesFile(zip, `${stripPdfExtension(file.name)}-pages.zip`, "application/zip");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Couldn't convert this PDF to images.");
    } finally {
      setProcessing(false);
    }
  }

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <PdfUploadZone file={file} onFileSelect={handleFile} onClear={() => setFile(null)} />

      {file && pageCount > 0 && <p className="mt-3 text-sm text-muted-foreground">{pageCount} pages found.</p>}
      {error && <p className="mt-3 text-sm text-destructive">{error}</p>}

      <Button type="button" className="mt-4" onClick={convert} disabled={!file || processing}>
        <Download className="size-4" />
        {processing ? "Converting..." : pageCount > 1 ? `Convert ${pageCount} pages to PNG (ZIP)` : "Convert to PNG"}
      </Button>
    </div>
  );
}

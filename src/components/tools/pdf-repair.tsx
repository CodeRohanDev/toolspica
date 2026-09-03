"use client";

import * as React from "react";
import { PDFDocument } from "pdf-lib";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { PdfUploadZone } from "@/components/tools/pdf-upload-zone";
import { loadPdfDocument } from "@/lib/pdf/pdfjs-setup";
import { downloadPdfBytes, stripPdfExtension } from "@/lib/pdf/pdf-helpers";

export function PdfRepair() {
  const [file, setFile] = React.useState<File | null>(null);
  const [processing, setProcessing] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [progress, setProgress] = React.useState("");
  const [done, setDone] = React.useState(false);

  async function repair() {
    if (!file) return;
    setProcessing(true);
    setDone(false);
    setError(null);
    try {
      const buffer = await file.arrayBuffer();
      // pdfjs's parser is deliberately lenient (built to keep rendering
      // real-world damaged PDFs) — re-rendering every page through it and
      // rebuilding a fresh PDF recovers whatever it could still parse,
      // discarding whatever broken structure was causing the original
      // file to fail elsewhere.
      const srcDoc = await loadPdfDocument(new Uint8Array(buffer));
      const outDoc = await PDFDocument.create();

      for (let i = 1; i <= srcDoc.numPages; i++) {
        setProgress(`Rebuilding page ${i} of ${srcDoc.numPages}...`);
        const page = await srcDoc.getPage(i);
        const viewport = page.getViewport({ scale: 2 });
        const canvas = document.createElement("canvas");
        canvas.width = viewport.width;
        canvas.height = viewport.height;
        const ctx = canvas.getContext("2d")!;
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        await page.render({ canvasContext: ctx, viewport, canvas }).promise;

        const blob: Blob = await new Promise((resolve, reject) =>
          canvas.toBlob((b) => (b ? resolve(b) : reject(new Error("export failed"))), "image/png")
        );
        const pngBytes = new Uint8Array(await blob.arrayBuffer());
        const embedded = await outDoc.embedPng(pngBytes);
        const outPage = outDoc.addPage([viewport.width, viewport.height]);
        outPage.drawImage(embedded, { x: 0, y: 0, width: viewport.width, height: viewport.height });
      }

      const outBytes = await outDoc.save();
      downloadPdfBytes(outBytes, `${stripPdfExtension(file.name)}-repaired.pdf`);
      setDone(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "This PDF is too damaged to recover — even the lenient parser couldn't read it.");
    } finally {
      setProcessing(false);
      setProgress("");
    }
  }

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <PdfUploadZone file={file} onFileSelect={setFile} onClear={() => setFile(null)} />

      {error && <p className="mt-3 text-sm text-destructive">{error}</p>}
      {processing && progress && <p className="mt-3 text-sm text-muted-foreground">{progress}</p>}
      {done && !error && <p className="mt-3 text-sm text-green-600 dark:text-green-500">Repaired file downloaded.</p>}

      <Button type="button" className="mt-4" onClick={repair} disabled={!file || processing}>
        <Download className="size-4" />
        {processing ? "Repairing..." : "Attempt repair and download"}
      </Button>
      <p className="mt-2 text-xs text-muted-foreground">
        Works by re-rendering every page that can still be parsed and rebuilding a fresh PDF from
        those renders — this recovers a viewable document from many corrupted files, but the
        rebuilt pages become images (text is no longer selectable), and files with no salvageable
        structure at all can&apos;t be recovered by any tool.
      </p>
    </div>
  );
}

"use client";

import * as React from "react";
import { PDFDocument, StandardFonts } from "pdf-lib";
import { Button } from "@/components/ui/button";
import { ImageUploadCard } from "@/components/tools/image-upload-card";
import { useTesseractOcr } from "@/lib/use-tesseract-ocr";
import { flattenWords } from "@/lib/ocr-table";
import { downloadPdfBytes, stripPdfExtension } from "@/lib/pdf/pdf-helpers";
import { loadImageFromFile } from "@/lib/image-processing";

export function OcrToPdf() {
  const [file, setFile] = React.useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = React.useState<string | null>(null);
  const [done, setDone] = React.useState(false);
  const { status, busy, error, setError } = useTesseractOcr();
  const [localBusy, setLocalBusy] = React.useState(false);

  function handleFile(picked: File) {
    setFile(picked);
    setPreviewUrl(URL.createObjectURL(picked));
    setDone(false);
    setError(null);
  }
  function clear() {
    setFile(null);
    setPreviewUrl(null);
    setDone(false);
    setError(null);
  }

  async function run() {
    if (!file) return;
    setLocalBusy(true);
    setError(null);
    try {
      const img = await loadImageFromFile(file);
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d")!;
      ctx.drawImage(img, 0, 0);
      const pngBlob: Blob = await new Promise((resolve, reject) =>
        canvas.toBlob((b) => (b ? resolve(b) : reject(new Error("export failed"))), "image/png")
      );
      const pngBytes = new Uint8Array(await pngBlob.arrayBuffer());

      const { createWorker } = await import("tesseract.js");
      const worker = await createWorker("eng", 1, { corePath: "/tesseract-core", workerPath: "/tesseract-worker.min.js" });
      const { data } = await worker.recognize(pngBlob, {}, { blocks: true });
      await worker.terminate();
      const words = flattenWords(data);

      const pdfDoc = await PDFDocument.create();
      const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
      const image = await pdfDoc.embedPng(pngBytes);
      const page = pdfDoc.addPage([img.width, img.height]);
      page.drawImage(image, { x: 0, y: 0, width: img.width, height: img.height });

      for (const w of words) {
        if (!w.text.trim()) continue;
        const size = Math.max(4, w.width / Math.max(1, w.text.length) * 1.5);
        page.drawText(w.text, {
          x: w.x,
          y: img.height - w.y - size,
          size,
          font,
          opacity: 0,
        });
      }

      const outBytes = await pdfDoc.save();
      downloadPdfBytes(outBytes, `${stripPdfExtension(file.name)}-searchable.pdf`);
      setDone(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Couldn't create a searchable PDF from this image.");
    } finally {
      setLocalBusy(false);
    }
  }

  const busyNow = busy || localBusy;

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <ImageUploadCard file={file} previewUrl={previewUrl} onFileSelect={handleFile} onClear={clear} />

      {file && (
        <Button type="button" className="mt-4" onClick={run} disabled={busyNow}>
          {busyNow ? status || "Processing..." : "Create searchable PDF"}
        </Button>
      )}

      {error && <p className="mt-3 text-sm text-destructive">{error}</p>}
      {done && <p className="mt-3 text-sm text-emerald-600 dark:text-emerald-400">Searchable PDF downloaded.</p>}

      <p className="mt-3 text-xs text-muted-foreground">
        Keeps the original image visible exactly as-is, and adds an invisible text layer positioned over each recognized word — the PDF looks unchanged but its text becomes selectable and searchable. Word positions are approximate, so selection may not align pixel-perfectly with the visible text.
      </p>
    </div>
  );
}

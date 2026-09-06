"use client";

import * as React from "react";
import { PDFDocument, StandardFonts } from "pdf-lib";
import { BatchUploadZone } from "@/components/tools/batch-upload-zone";
import { BatchFileList } from "@/components/tools/batch-file-list";
import { useBatchFiles } from "@/lib/use-batch-files";
import { flattenWords } from "@/lib/ocr-table";
import { stripPdfExtension } from "@/lib/pdf/pdf-helpers";
import { loadImageFromFile } from "@/lib/image-processing";

export function OcrToPdf() {
  const convert = React.useCallback(async (file: File) => {
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
      const size = Math.max(4, (w.width / Math.max(1, w.text.length)) * 1.5);
      page.drawText(w.text, {
        x: w.x,
        y: img.height - w.y - size,
        size,
        font,
        opacity: 0,
      });
    }

    const outBytes = await pdfDoc.save();
    const blob = new Blob([outBytes as BlobPart], { type: "application/pdf" });
    return { blob, name: `${stripPdfExtension(file.name)}-searchable.pdf` };
  }, []);

  const { items, addFiles, removeItem } = useBatchFiles(convert);

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <BatchUploadZone accept="image/*" onFilesSelect={addFiles} label="Drop images to make into searchable PDFs" />

      <BatchFileList items={items} onRemove={removeItem} zipName="searchable-pdfs.zip" />

      <p className="mt-3 text-xs text-muted-foreground">
        Keeps each original image visible exactly as-is, and adds an invisible text layer
        positioned over each recognized word — the PDF looks unchanged but its text becomes
        selectable and searchable. Word positions are approximate, so selection may not align
        pixel-perfectly with the visible text.
      </p>
    </div>
  );
}

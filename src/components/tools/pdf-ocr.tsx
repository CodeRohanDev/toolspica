"use client";

import * as React from "react";
import { BatchUploadZone } from "@/components/tools/batch-upload-zone";
import { BatchFileList } from "@/components/tools/batch-file-list";
import { useBatchFiles } from "@/lib/use-batch-files";
import { loadPdfDocument } from "@/lib/pdf/pdfjs-setup";
import { stripPdfExtension } from "@/lib/pdf/pdf-helpers";

export function PdfOcr() {
  const convert = React.useCallback(async (file: File) => {
    const { createWorker } = await import("tesseract.js");
    const buffer = await file.arrayBuffer();
    const doc = await loadPdfDocument(new Uint8Array(buffer));

    const worker = await createWorker("eng", 1, { corePath: "/tesseract-core", workerPath: "/tesseract-worker.min.js" });

    const pages: string[] = [];
    for (let i = 1; i <= doc.numPages; i++) {
      const page = await doc.getPage(i);
      const viewport = page.getViewport({ scale: 2.5 });
      const canvas = document.createElement("canvas");
      canvas.width = viewport.width;
      canvas.height = viewport.height;
      const ctx = canvas.getContext("2d")!;
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      await page.render({ canvasContext: ctx, viewport, canvas }).promise;

      const { data } = await worker.recognize(canvas);
      pages.push(data.text.trim());
    }

    await worker.terminate();
    const blob = new Blob([pages.join("\n\n---\n\n")], { type: "text/plain" });
    return { blob, name: `${stripPdfExtension(file.name)}-ocr.txt` };
  }, []);

  const { items, addFiles, removeItem } = useBatchFiles(convert);

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <BatchUploadZone accept="application/pdf,.pdf" onFilesSelect={addFiles} label="Drop scanned PDFs to run OCR on" />

      <BatchFileList items={items} onRemove={removeItem} zipName="ocr-text.zip" />

      <p className="mt-3 text-xs text-muted-foreground">
        Renders each page to an image and recognizes text with an in-browser OCR engine (English) —
        built for scanned pages and image-only PDFs that have no embedded text layer. The first run
        downloads a small language model; recognition itself happens entirely on your device.
      </p>
    </div>
  );
}

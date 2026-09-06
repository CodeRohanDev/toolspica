"use client";

import * as React from "react";
import { PDFDocument } from "pdf-lib";
import { BatchUploadZone } from "@/components/tools/batch-upload-zone";
import { BatchFileList } from "@/components/tools/batch-file-list";
import { useBatchFiles } from "@/lib/use-batch-files";
import { loadPdfDocument } from "@/lib/pdf/pdfjs-setup";
import { stripPdfExtension } from "@/lib/pdf/pdf-helpers";

export function PdfGrayscaleConverter() {
  const convert = React.useCallback(async (file: File) => {
    const buffer = await file.arrayBuffer();
    const srcDoc = await loadPdfDocument(new Uint8Array(buffer));
    const outDoc = await PDFDocument.create();

    for (let i = 1; i <= srcDoc.numPages; i++) {
      const page = await srcDoc.getPage(i);
      const viewport = page.getViewport({ scale: 2 });
      const canvas = document.createElement("canvas");
      canvas.width = viewport.width;
      canvas.height = viewport.height;
      const ctx = canvas.getContext("2d")!;
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      await page.render({ canvasContext: ctx, viewport, canvas }).promise;

      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const d = imageData.data;
      for (let p = 0; p < d.length; p += 4) {
        const gray = 0.299 * d[p] + 0.587 * d[p + 1] + 0.114 * d[p + 2];
        d[p] = d[p + 1] = d[p + 2] = gray;
      }
      ctx.putImageData(imageData, 0, 0);

      const blob: Blob = await new Promise((resolve, reject) =>
        canvas.toBlob((b) => (b ? resolve(b) : reject(new Error("export failed"))), "image/jpeg", 0.85)
      );
      const jpegBytes = new Uint8Array(await blob.arrayBuffer());
      const embedded = await outDoc.embedJpg(jpegBytes);
      const outPage = outDoc.addPage([viewport.width, viewport.height]);
      outPage.drawImage(embedded, { x: 0, y: 0, width: viewport.width, height: viewport.height });
    }

    const outBytes = await outDoc.save();
    const blob = new Blob([outBytes as BlobPart], { type: "application/pdf" });
    return { blob, name: `${stripPdfExtension(file.name)}-grayscale.pdf` };
  }, []);

  const { items, addFiles, removeItem } = useBatchFiles(convert);

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <BatchUploadZone accept="application/pdf,.pdf" onFilesSelect={addFiles} label="Drop PDFs to convert to grayscale" />

      <BatchFileList items={items} onRemove={removeItem} zipName="grayscale-pdfs.zip" />

      <p className="mt-3 text-xs text-muted-foreground">
        Renders each page to a bitmap and desaturates it using the standard luminance formula
        (0.299R + 0.587G + 0.114B), which converts text to image pixels — output text becomes
        non-selectable, a real trade-off of the pixel-based approach.
      </p>
    </div>
  );
}

"use client";

import * as React from "react";
import { BatchUploadZone } from "@/components/tools/batch-upload-zone";
import { BatchFileList } from "@/components/tools/batch-file-list";
import { useBatchFiles } from "@/lib/use-batch-files";
import { loadPdfDocument } from "@/lib/pdf/pdfjs-setup";
import { buildPptx, type PptxSlideImage } from "@/lib/pdf/pptx-writer";
import { stripPdfExtension } from "@/lib/pdf/pdf-helpers";

export function PdfToPowerpoint() {
  const convert = React.useCallback(async (file: File) => {
    const buffer = await file.arrayBuffer();
    const doc = await loadPdfDocument(new Uint8Array(buffer));

    const slides: PptxSlideImage[] = [];
    for (let i = 1; i <= doc.numPages; i++) {
      const page = await doc.getPage(i);
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
      const png = new Uint8Array(await blob.arrayBuffer());
      slides.push({ png, width: viewport.width, height: viewport.height });
    }

    const pptxBytes = buildPptx(slides);
    const blob = new Blob([pptxBytes as BlobPart], { type: "application/vnd.openxmlformats-officedocument.presentationml.presentation" });
    return { blob, name: `${stripPdfExtension(file.name)}.pptx` };
  }, []);

  const { items, addFiles, removeItem } = useBatchFiles(convert);

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <BatchUploadZone accept="application/pdf,.pdf" onFilesSelect={addFiles} label="Drop PDFs to convert to PowerPoint" />

      <BatchFileList items={items} onRemove={removeItem} zipName="converted-powerpoints.zip" />

      <p className="mt-3 text-xs text-muted-foreground">
        Each PDF page becomes a full-slide image — layout is preserved exactly, but slide content
        isn&apos;t individually editable the way a native PowerPoint slide would be.
      </p>
    </div>
  );
}

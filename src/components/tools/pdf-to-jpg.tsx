"use client";

import * as React from "react";
import { BatchUploadZone } from "@/components/tools/batch-upload-zone";
import { BatchFileList } from "@/components/tools/batch-file-list";
import { useBatchFiles } from "@/lib/use-batch-files";
import { loadPdfDocument } from "@/lib/pdf/pdfjs-setup";
import { stripPdfExtension } from "@/lib/pdf/pdf-helpers";
import { createZip } from "@/lib/zip-writer";

export function PdfToJpg() {
  const convert = React.useCallback(async (file: File) => {
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
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      await page.render({ canvasContext: ctx, viewport, canvas }).promise;
      const blob: Blob = await new Promise((resolve, reject) =>
        canvas.toBlob((b) => (b ? resolve(b) : reject(new Error("export failed"))), "image/jpeg", 0.92)
      );
      entries.push({ name: `page-${i}.jpg`, data: new Uint8Array(await blob.arrayBuffer()) });
    }

    if (entries.length === 1) {
      const blob = new Blob([entries[0].data as BlobPart], { type: "image/jpeg" });
      return { blob, name: `${stripPdfExtension(file.name)}.jpg` };
    }
    const zip = createZip(entries);
    const blob = new Blob([zip as BlobPart], { type: "application/zip" });
    return { blob, name: `${stripPdfExtension(file.name)}-pages.zip` };
  }, []);

  const { items, addFiles, removeItem } = useBatchFiles(convert);

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <BatchUploadZone accept="application/pdf,.pdf" onFilesSelect={addFiles} label="Drop PDFs to convert to JPG" />

      <BatchFileList items={items} onRemove={removeItem} zipName="converted-jpgs.zip" />

      <p className="mt-3 text-xs text-muted-foreground">
        Renders every page as a JPG — a single-page PDF downloads as one JPG, multi-page PDFs
        download as a ZIP of one JPG per page.
      </p>
    </div>
  );
}

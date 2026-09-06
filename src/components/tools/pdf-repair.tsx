"use client";

import * as React from "react";
import { PDFDocument } from "pdf-lib";
import { BatchUploadZone } from "@/components/tools/batch-upload-zone";
import { BatchFileList } from "@/components/tools/batch-file-list";
import { useBatchFiles } from "@/lib/use-batch-files";
import { loadPdfDocument } from "@/lib/pdf/pdfjs-setup";
import { stripPdfExtension } from "@/lib/pdf/pdf-helpers";

export function PdfRepair() {
  const convert = React.useCallback(async (file: File) => {
    // pdfjs's parser is deliberately lenient (built to keep rendering
    // real-world damaged PDFs) — re-rendering every page through it and
    // rebuilding a fresh PDF recovers whatever it could still parse,
    // discarding whatever broken structure was causing the original
    // file to fail elsewhere.
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

      const blob: Blob = await new Promise((resolve, reject) =>
        canvas.toBlob((b) => (b ? resolve(b) : reject(new Error("export failed"))), "image/png")
      );
      const pngBytes = new Uint8Array(await blob.arrayBuffer());
      const embedded = await outDoc.embedPng(pngBytes);
      const outPage = outDoc.addPage([viewport.width, viewport.height]);
      outPage.drawImage(embedded, { x: 0, y: 0, width: viewport.width, height: viewport.height });
    }

    const outBytes = await outDoc.save();
    const blob = new Blob([outBytes as BlobPart], { type: "application/pdf" });
    return { blob, name: `${stripPdfExtension(file.name)}-repaired.pdf` };
  }, []);

  const { items, addFiles, removeItem } = useBatchFiles(convert);

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <BatchUploadZone accept="application/pdf,.pdf" onFilesSelect={addFiles} label="Drop damaged PDFs to attempt repair on" />

      <BatchFileList items={items} onRemove={removeItem} zipName="repaired-pdfs.zip" />

      <p className="mt-3 text-xs text-muted-foreground">
        Works by re-rendering every page that can still be parsed and rebuilding a fresh PDF from
        those renders — this recovers a viewable document from many corrupted files, but the
        rebuilt pages become images (text is no longer selectable), and files with no salvageable
        structure at all can&apos;t be recovered by any tool.
      </p>
    </div>
  );
}

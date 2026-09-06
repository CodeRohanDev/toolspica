"use client";

import * as React from "react";
import { PDFDocument } from "pdf-lib";
import { Label } from "@/components/ui/label";
import { BatchUploadZone } from "@/components/tools/batch-upload-zone";
import { BatchFileList } from "@/components/tools/batch-file-list";
import { useBatchFiles } from "@/lib/use-batch-files";
import { loadPdfDocument } from "@/lib/pdf/pdfjs-setup";
import { stripPdfExtension } from "@/lib/pdf/pdf-helpers";

export function PdfCompress() {
  const [quality, setQuality] = React.useState(0.6);
  const [scale, setScale] = React.useState(1.5);

  const convert = React.useCallback(
    async (file: File) => {
      const buffer = await file.arrayBuffer();
      const srcDoc = await loadPdfDocument(new Uint8Array(buffer));
      const outDoc = await PDFDocument.create();

      for (let i = 1; i <= srcDoc.numPages; i++) {
        const page = await srcDoc.getPage(i);
        const viewport = page.getViewport({ scale });
        const canvas = document.createElement("canvas");
        canvas.width = viewport.width;
        canvas.height = viewport.height;
        const ctx = canvas.getContext("2d")!;
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        await page.render({ canvasContext: ctx, viewport, canvas }).promise;

        const blob: Blob = await new Promise((resolve, reject) =>
          canvas.toBlob((b) => (b ? resolve(b) : reject(new Error("export failed"))), "image/jpeg", quality)
        );
        const jpegBytes = new Uint8Array(await blob.arrayBuffer());
        const embedded = await outDoc.embedJpg(jpegBytes);
        const outPage = outDoc.addPage([viewport.width, viewport.height]);
        outPage.drawImage(embedded, { x: 0, y: 0, width: viewport.width, height: viewport.height });
      }

      const outBytes = await outDoc.save();
      const blob = new Blob([outBytes as BlobPart], { type: "application/pdf" });
      return { blob, name: `${stripPdfExtension(file.name)}-compressed.pdf` };
    },
    [quality, scale]
  );

  const { items, addFiles, removeItem } = useBatchFiles(convert);

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <BatchUploadZone accept="application/pdf,.pdf" onFilesSelect={addFiles} label="Drop PDFs to compress" />

      <div className="mt-4 flex flex-wrap gap-6">
        <div className="flex items-center gap-3">
          <Label htmlFor="compress-quality" className="shrink-0 text-sm text-muted-foreground">
            Image quality
          </Label>
          <input id="compress-quality" type="range" min={0.2} max={0.95} step={0.05} value={quality} onChange={(e) => setQuality(Number(e.target.value))} />
          <span className="w-10 text-sm tabular-nums">{Math.round(quality * 100)}%</span>
        </div>
        <div className="flex items-center gap-3">
          <Label htmlFor="compress-scale" className="shrink-0 text-sm text-muted-foreground">
            Resolution
          </Label>
          <input id="compress-scale" type="range" min={0.75} max={2.5} step={0.25} value={scale} onChange={(e) => setScale(Number(e.target.value))} />
          <span className="w-10 text-sm tabular-nums">{scale}x</span>
        </div>
      </div>
      <p className="mt-2 text-xs text-muted-foreground">
        Works by re-rendering each page as a compressed image, which is most effective on
        image-heavy or scanned PDFs. This converts text to image pixels, so text becomes
        non-selectable and non-searchable in the output — a real trade-off, not a bug.
      </p>

      <BatchFileList items={items} onRemove={removeItem} zipName="compressed-pdfs.zip" />
    </div>
  );
}

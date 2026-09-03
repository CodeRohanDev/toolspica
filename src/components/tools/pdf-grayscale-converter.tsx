"use client";

import * as React from "react";
import { PDFDocument } from "pdf-lib";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { PdfUploadZone } from "@/components/tools/pdf-upload-zone";
import { loadPdfDocument } from "@/lib/pdf/pdfjs-setup";
import { downloadPdfBytes, stripPdfExtension } from "@/lib/pdf/pdf-helpers";

export function PdfGrayscaleConverter() {
  const [file, setFile] = React.useState<File | null>(null);
  const [processing, setProcessing] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  async function convert() {
    if (!file) return;
    setProcessing(true);
    setError(null);
    try {
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
      downloadPdfBytes(outBytes, `${stripPdfExtension(file.name)}-grayscale.pdf`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Couldn't convert this PDF — it may be corrupted or password-protected.");
    } finally {
      setProcessing(false);
    }
  }

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <PdfUploadZone file={file} onFileSelect={setFile} onClear={() => setFile(null)} />

      {error && <p className="mt-3 text-sm text-destructive">{error}</p>}

      <Button type="button" className="mt-4" onClick={convert} disabled={!file || processing}>
        <Download className="size-4" />
        {processing ? "Converting..." : "Convert to grayscale and download"}
      </Button>
      <p className="mt-2 text-xs text-muted-foreground">
        Renders each page to a bitmap and desaturates it using the standard luminance formula
        (0.299R + 0.587G + 0.114B), which converts text to image pixels — output text becomes
        non-selectable, a real trade-off of the pixel-based approach.
      </p>
    </div>
  );
}

"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { PdfUploadZone } from "@/components/tools/pdf-upload-zone";
import { loadPdfDocument } from "@/lib/pdf/pdfjs-setup";
import { buildPptx, type PptxSlideImage } from "@/lib/pdf/pptx-writer";
import { downloadBytesFile, stripPdfExtension } from "@/lib/pdf/pdf-helpers";

export function PdfToPowerpoint() {
  const [file, setFile] = React.useState<File | null>(null);
  const [loading, setLoading] = React.useState(false);
  const [progress, setProgress] = React.useState({ done: 0, total: 0 });
  const [doneFlag, setDoneFlag] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  async function handleFile(picked: File) {
    setFile(picked);
    setDoneFlag(false);
    setError(null);
    setLoading(true);
    try {
      const buffer = await picked.arrayBuffer();
      const doc = await loadPdfDocument(new Uint8Array(buffer));
      setProgress({ done: 0, total: doc.numPages });

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
        setProgress({ done: i, total: doc.numPages });
      }

      const pptxBytes = buildPptx(slides);
      downloadBytesFile(pptxBytes, `${stripPdfExtension(picked.name)}.pptx`, "application/vnd.openxmlformats-officedocument.presentationml.presentation");
      setDoneFlag(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Couldn't convert this PDF — it may be corrupted or password-protected.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      {!file && <PdfUploadZone file={file} onFileSelect={handleFile} onClear={() => setFile(null)} />}

      {file && (
        <>
          <div className="flex items-center justify-between">
            <p className="text-sm">{file.name}</p>
            <Button type="button" variant="outline" size="sm" onClick={() => setFile(null)}>
              Choose a different file
            </Button>
          </div>

          {loading && (
            <p className="mt-3 text-sm text-muted-foreground">
              Rendering slide {progress.done} of {progress.total}...
            </p>
          )}
          {error && <p className="mt-3 text-sm text-destructive">{error}</p>}
          {doneFlag && (
            <div className="mt-3 flex items-center gap-2 text-sm text-emerald-600 dark:text-emerald-400">
              <Download className="size-4" /> PowerPoint file downloaded.
            </div>
          )}
        </>
      )}

      <p className="mt-3 text-xs text-muted-foreground">
        Each PDF page becomes a full-slide image — layout is preserved exactly, but slide content
        isn&apos;t individually editable the way a native PowerPoint slide would be.
      </p>
    </div>
  );
}

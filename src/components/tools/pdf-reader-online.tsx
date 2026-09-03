"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, ZoomIn, ZoomOut } from "lucide-react";
import { PdfUploadZone } from "@/components/tools/pdf-upload-zone";
import { loadPdfDocument } from "@/lib/pdf/pdfjs-setup";
import type { PDFDocumentProxy } from "pdfjs-dist";

export function PdfReaderOnline() {
  const [file, setFile] = React.useState<File | null>(null);
  const [doc, setDoc] = React.useState<PDFDocumentProxy | null>(null);
  const [pageNum, setPageNum] = React.useState(1);
  const [scale, setScale] = React.useState(1.2);
  const [error, setError] = React.useState<string | null>(null);
  const canvasRef = React.useRef<HTMLCanvasElement>(null);

  async function handleFile(picked: File) {
    setFile(picked);
    setError(null);
    setPageNum(1);
    try {
      const buffer = await picked.arrayBuffer();
      const loaded = await loadPdfDocument(new Uint8Array(buffer));
      setDoc(loaded);
    } catch {
      setError("Couldn't open this PDF — it may be corrupted or password-protected.");
    }
  }

  React.useEffect(() => {
    if (!doc || !canvasRef.current) return;
    let cancelled = false;
    (async () => {
      const page = await doc.getPage(pageNum);
      if (cancelled) return;
      const viewport = page.getViewport({ scale });
      const canvas = canvasRef.current!;
      canvas.width = viewport.width;
      canvas.height = viewport.height;
      const ctx = canvas.getContext("2d")!;
      await page.render({ canvasContext: ctx, viewport, canvas }).promise;
    })();
    return () => {
      cancelled = true;
    };
  }, [doc, pageNum, scale]);

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      {!file && <PdfUploadZone file={file} onFileSelect={handleFile} onClear={() => setFile(null)} />}

      {error && <p className="text-sm text-destructive">{error}</p>}

      {doc && (
        <>
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <Button type="button" variant="outline" size="icon-sm" onClick={() => setPageNum((p) => Math.max(1, p - 1))} disabled={pageNum <= 1}>
                <ChevronLeft className="size-4" />
              </Button>
              <span className="text-sm tabular-nums">
                Page {pageNum} of {doc.numPages}
              </span>
              <Button
                type="button"
                variant="outline"
                size="icon-sm"
                onClick={() => setPageNum((p) => Math.min(doc.numPages, p + 1))}
                disabled={pageNum >= doc.numPages}
              >
                <ChevronRight className="size-4" />
              </Button>
            </div>
            <div className="flex items-center gap-2">
              <Button type="button" variant="outline" size="icon-sm" onClick={() => setScale((s) => Math.max(0.5, s - 0.2))}>
                <ZoomOut className="size-4" />
              </Button>
              <span className="w-12 text-center text-sm tabular-nums">{Math.round(scale * 100)}%</span>
              <Button type="button" variant="outline" size="icon-sm" onClick={() => setScale((s) => Math.min(3, s + 0.2))}>
                <ZoomIn className="size-4" />
              </Button>
            </div>
            <Button type="button" variant="outline" size="sm" onClick={() => { setFile(null); setDoc(null); }}>
              Open a different file
            </Button>
          </div>

          <div className="mt-4 flex justify-center overflow-auto rounded-lg border bg-muted/20 p-4">
            <canvas ref={canvasRef} className="shadow-sm" />
          </div>
        </>
      )}
    </div>
  );
}

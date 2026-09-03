"use client";

import * as React from "react";
import { PDFDocument } from "pdf-lib";
import { Button } from "@/components/ui/button";
import { Download, X } from "lucide-react";
import { PdfUploadZone } from "@/components/tools/pdf-upload-zone";
import { usePdfThumbnails } from "@/lib/pdf/use-pdf-thumbnails";
import { loadPdfDocument } from "@/lib/pdf/pdfjs-setup";
import { downloadPdfBytes, stripPdfExtension } from "@/lib/pdf/pdf-helpers";

interface Rect {
  x: number;
  y: number;
  w: number;
  h: number;
}

export function PdfRedact() {
  const [file, setFile] = React.useState<File | null>(null);
  const { thumbnails, pageCount } = usePdfThumbnails(file);
  const [currentPage, setCurrentPage] = React.useState(0);
  const [rectsByPage, setRectsByPage] = React.useState<Record<number, Rect[]>>({});
  const [dragRect, setDragRect] = React.useState<Rect | null>(null);
  const dragOrigin = React.useRef<{ x: number; y: number } | null>(null);
  const [processing, setProcessing] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  function handlePointerDown(e: React.PointerEvent<HTMLDivElement>) {
    const bounds = e.currentTarget.getBoundingClientRect();
    dragOrigin.current = { x: e.clientX - bounds.left, y: e.clientY - bounds.top };
    setDragRect({ x: dragOrigin.current.x, y: dragOrigin.current.y, w: 0, h: 0 });
  }
  function handlePointerMove(e: React.PointerEvent<HTMLDivElement>) {
    if (!dragOrigin.current) return;
    const bounds = e.currentTarget.getBoundingClientRect();
    const x = Math.max(0, Math.min(bounds.width, e.clientX - bounds.left));
    const y = Math.max(0, Math.min(bounds.height, e.clientY - bounds.top));
    const { x: ox, y: oy } = dragOrigin.current;
    setDragRect({
      x: Math.min(ox, x) / bounds.width,
      y: Math.min(oy, y) / bounds.height,
      w: Math.abs(x - ox) / bounds.width,
      h: Math.abs(y - oy) / bounds.height,
    });
  }
  function handlePointerUp() {
    if (dragRect && dragRect.w > 0.01 && dragRect.h > 0.01) {
      setRectsByPage((prev) => ({
        ...prev,
        [currentPage]: [...(prev[currentPage] ?? []), dragRect],
      }));
    }
    dragOrigin.current = null;
    setDragRect(null);
  }
  function removeRect(page: number, i: number) {
    setRectsByPage((prev) => ({ ...prev, [page]: prev[page].filter((_, idx) => idx !== i) }));
  }

  const totalRects = Object.values(rectsByPage).reduce((sum, r) => sum + r.length, 0);

  async function apply() {
    if (!file || totalRects === 0) return;
    setProcessing(true);
    setError(null);
    try {
      const buffer = await file.arrayBuffer();
      const pdfjsDoc = await loadPdfDocument(new Uint8Array(buffer));
      const srcDoc = await PDFDocument.load(buffer);
      const outDoc = await PDFDocument.create();

      for (let i = 0; i < srcDoc.getPageCount(); i++) {
        const rects = rectsByPage[i];
        if (!rects || rects.length === 0) {
          const [copied] = await outDoc.copyPages(srcDoc, [i]);
          outDoc.addPage(copied);
          continue;
        }

        // Redacted page: rasterize and bake black boxes into the pixels
        // directly, so no underlying text/vector data survives to be
        // recovered — a black box merely drawn on top would NOT be true
        // redaction, since the covered text remains extractable underneath.
        const page = await pdfjsDoc.getPage(i + 1);
        const viewport = page.getViewport({ scale: 2 });
        const canvas = document.createElement("canvas");
        canvas.width = viewport.width;
        canvas.height = viewport.height;
        const ctx = canvas.getContext("2d")!;
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        await page.render({ canvasContext: ctx, viewport, canvas }).promise;

        ctx.fillStyle = "#000000";
        for (const r of rects) {
          ctx.fillRect(r.x * canvas.width, r.y * canvas.height, r.w * canvas.width, r.h * canvas.height);
        }

        const blob: Blob = await new Promise((resolve, reject) =>
          canvas.toBlob((b) => (b ? resolve(b) : reject(new Error("export failed"))), "image/png")
        );
        const pngBytes = new Uint8Array(await blob.arrayBuffer());
        const embedded = await outDoc.embedPng(pngBytes);
        const outPage = outDoc.addPage([viewport.width, viewport.height]);
        outPage.drawImage(embedded, { x: 0, y: 0, width: viewport.width, height: viewport.height });
      }

      const outBytes = await outDoc.save();
      downloadPdfBytes(outBytes, `${stripPdfExtension(file.name)}-redacted.pdf`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Couldn't redact this PDF — it may be corrupted or password-protected.");
    } finally {
      setProcessing(false);
    }
  }

  const currentRects = rectsByPage[currentPage] ?? [];

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      {!file && <PdfUploadZone file={file} onFileSelect={setFile} onClear={() => setFile(null)} />}

      {file && thumbnails.length > 0 && (
        <>
          <div className="flex flex-wrap items-center justify-between gap-2">
            <select
              value={currentPage}
              onChange={(e) => setCurrentPage(Number(e.target.value))}
              className="h-8 rounded-lg border px-2 text-sm"
            >
              {thumbnails.map((t) => (
                <option key={t.index} value={t.index}>
                  Page {t.index + 1} {rectsByPage[t.index]?.length ? `(${rectsByPage[t.index].length} marked)` : ""}
                </option>
              ))}
            </select>
            <Button type="button" variant="outline" size="sm" onClick={() => setFile(null)}>
              Choose a different file
            </Button>
          </div>

          <p className="mt-3 text-xs font-medium uppercase tracking-wide text-muted-foreground">
            Drag to mark areas to redact on this page
          </p>
          <div
            className="relative mt-2 max-w-full touch-none select-none overflow-hidden rounded-xl border"
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={thumbnails[currentPage]?.url}
              alt={`Page ${currentPage + 1}`}
              className="block max-h-[480px] w-full object-contain"
              draggable={false}
            />
            {currentRects.map((r, i) => (
              <div
                key={i}
                className="group absolute border-2 border-destructive bg-black"
                style={{ left: `${r.x * 100}%`, top: `${r.y * 100}%`, width: `${r.w * 100}%`, height: `${r.h * 100}%` }}
              >
                <button
                  type="button"
                  onClick={() => removeRect(currentPage, i)}
                  className="absolute -right-2 -top-2 flex size-5 items-center justify-center rounded-full bg-background shadow-sm"
                >
                  <X className="size-3" />
                </button>
              </div>
            ))}
            {dragRect && (
              <div
                className="absolute border-2 border-destructive bg-black/70"
                style={{ left: `${dragRect.x * 100}%`, top: `${dragRect.y * 100}%`, width: `${dragRect.w * 100}%`, height: `${dragRect.h * 100}%` }}
              />
            )}
          </div>

          {error && <p className="mt-3 text-sm text-destructive">{error}</p>}

          <Button type="button" variant="destructive" className="mt-4" onClick={apply} disabled={processing || totalRects === 0}>
            <Download className="size-4" />
            {processing ? "Redacting..." : `Redact ${totalRects} area${totalRects === 1 ? "" : "s"} and download`}
          </Button>
          <p className="mt-2 text-xs text-muted-foreground">
            Pages you mark are rasterized with the black boxes baked permanently into the pixels —
            true removal, not just a box drawn on top, since a mere overlay would leave the
            underlying text still copyable. Pages with no marks stay as the original, unmodified
            content. Marked pages lose text-selectability, since they become images.
          </p>
        </>
      )}
      {file && pageCount === 0 && <p className="mt-3 text-sm text-muted-foreground">Loading page previews...</p>}
    </div>
  );
}

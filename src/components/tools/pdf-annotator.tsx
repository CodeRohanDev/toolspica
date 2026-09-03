"use client";

import * as React from "react";
import { PDFDocument } from "pdf-lib";
import { Button } from "@/components/ui/button";
import { Download, Highlighter, Pen, Eraser } from "lucide-react";
import { PdfUploadZone } from "@/components/tools/pdf-upload-zone";
import { usePdfThumbnails } from "@/lib/pdf/use-pdf-thumbnails";
import { loadPdfDocument } from "@/lib/pdf/pdfjs-setup";
import { downloadPdfBytes, stripPdfExtension } from "@/lib/pdf/pdf-helpers";

type Stroke = { tool: "pen" | "highlight"; points: { x: number; y: number }[] };

export function PdfAnnotator() {
  const [file, setFile] = React.useState<File | null>(null);
  const { thumbnails } = usePdfThumbnails(file);
  const [currentPage, setCurrentPage] = React.useState(0);
  const [strokesByPage, setStrokesByPage] = React.useState<Record<number, Stroke[]>>({});
  const [tool, setTool] = React.useState<"pen" | "highlight">("highlight");
  const drawing = React.useRef(false);
  const currentStroke = React.useRef<Stroke | null>(null);
  const [, forceRender] = React.useState(0);
  const [processing, setProcessing] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  function handlePointerDown(e: React.PointerEvent<HTMLDivElement>) {
    const bounds = e.currentTarget.getBoundingClientRect();
    drawing.current = true;
    currentStroke.current = {
      tool,
      points: [{ x: (e.clientX - bounds.left) / bounds.width, y: (e.clientY - bounds.top) / bounds.height }],
    };
  }
  function handlePointerMove(e: React.PointerEvent<HTMLDivElement>) {
    if (!drawing.current || !currentStroke.current) return;
    const bounds = e.currentTarget.getBoundingClientRect();
    currentStroke.current.points.push({
      x: (e.clientX - bounds.left) / bounds.width,
      y: (e.clientY - bounds.top) / bounds.height,
    });
    forceRender((n) => n + 1);
  }
  function handlePointerUp() {
    if (currentStroke.current && currentStroke.current.points.length > 1) {
      setStrokesByPage((prev) => ({
        ...prev,
        [currentPage]: [...(prev[currentPage] ?? []), currentStroke.current!],
      }));
    }
    drawing.current = false;
    currentStroke.current = null;
  }
  function clearPage() {
    setStrokesByPage((prev) => ({ ...prev, [currentPage]: [] }));
  }

  const totalStrokes = Object.values(strokesByPage).reduce((sum, s) => sum + s.length, 0);

  async function apply() {
    if (!file || totalStrokes === 0) return;
    setProcessing(true);
    setError(null);
    try {
      const buffer = await file.arrayBuffer();
      const pdfjsDoc = await loadPdfDocument(new Uint8Array(buffer));
      const srcDoc = await PDFDocument.load(buffer);
      const outDoc = await PDFDocument.create();

      for (let i = 0; i < srcDoc.getPageCount(); i++) {
        const strokes = strokesByPage[i];
        if (!strokes || strokes.length === 0) {
          const [copied] = await outDoc.copyPages(srcDoc, [i]);
          outDoc.addPage(copied);
          continue;
        }

        const page = await pdfjsDoc.getPage(i + 1);
        const viewport = page.getViewport({ scale: 2 });
        const canvas = document.createElement("canvas");
        canvas.width = viewport.width;
        canvas.height = viewport.height;
        const ctx = canvas.getContext("2d")!;
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        await page.render({ canvasContext: ctx, viewport, canvas }).promise;

        for (const stroke of strokes) {
          ctx.beginPath();
          ctx.lineCap = "round";
          ctx.lineJoin = "round";
          if (stroke.tool === "highlight") {
            ctx.strokeStyle = "rgba(255, 235, 59, 0.5)";
            ctx.lineWidth = canvas.width * 0.025;
          } else {
            ctx.strokeStyle = "rgba(220, 38, 38, 0.9)";
            ctx.lineWidth = canvas.width * 0.004;
          }
          stroke.points.forEach((p, idx) => {
            const x = p.x * canvas.width;
            const y = p.y * canvas.height;
            if (idx === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
          });
          ctx.stroke();
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
      downloadPdfBytes(outBytes, `${stripPdfExtension(file.name)}-annotated.pdf`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Couldn't annotate this PDF — it may be corrupted or password-protected.");
    } finally {
      setProcessing(false);
    }
  }

  const currentStrokes = strokesByPage[currentPage] ?? [];

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
                  Page {t.index + 1} {strokesByPage[t.index]?.length ? `(${strokesByPage[t.index].length} marks)` : ""}
                </option>
              ))}
            </select>
            <div className="flex gap-2">
              <Button type="button" variant={tool === "highlight" ? "default" : "outline"} size="sm" onClick={() => setTool("highlight")}>
                <Highlighter className="size-3.5" /> Highlight
              </Button>
              <Button type="button" variant={tool === "pen" ? "default" : "outline"} size="sm" onClick={() => setTool("pen")}>
                <Pen className="size-3.5" /> Pen
              </Button>
              <Button type="button" variant="outline" size="sm" onClick={clearPage}>
                <Eraser className="size-3.5" /> Clear page
              </Button>
            </div>
          </div>

          <div
            className="relative mt-3 max-w-full touch-none select-none overflow-hidden rounded-xl border"
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
            <svg className="pointer-events-none absolute inset-0 size-full">
              {[...currentStrokes, ...(currentStroke.current ? [currentStroke.current] : [])].map((s, i) => (
                <polyline
                  key={i}
                  points={s.points.map((p) => `${p.x * 100}%,${p.y * 100}%`).join(" ")}
                  fill="none"
                  stroke={s.tool === "highlight" ? "rgba(255,235,59,0.6)" : "rgba(220,38,38,0.9)"}
                  strokeWidth={s.tool === "highlight" ? 16 : 3}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  vectorEffect="non-scaling-stroke"
                />
              ))}
            </svg>
          </div>

          {error && <p className="mt-3 text-sm text-destructive">{error}</p>}

          <Button type="button" className="mt-4" onClick={apply} disabled={processing || totalStrokes === 0}>
            <Download className="size-4" />
            {processing ? "Saving..." : "Save annotations and download"}
          </Button>
          <p className="mt-2 text-xs text-muted-foreground">
            Annotated pages are flattened into the page image on save — marks can&apos;t be
            toggled off later the way real PDF annotation objects can, but this guarantees they
            display identically everywhere.
          </p>
        </>
      )}
    </div>
  );
}

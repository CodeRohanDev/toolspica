"use client";

import * as React from "react";
import { PDFDocument } from "pdf-lib";
import { Button } from "@/components/ui/button";
import { Download, Eraser } from "lucide-react";
import { PdfUploadZone } from "@/components/tools/pdf-upload-zone";
import { usePdfThumbnails } from "@/lib/pdf/use-pdf-thumbnails";
import { downloadPdfBytes, stripPdfExtension } from "@/lib/pdf/pdf-helpers";

export function PdfSigner() {
  const [file, setFile] = React.useState<File | null>(null);
  const { thumbnails, pageCount } = usePdfThumbnails(file);
  const [targetPage, setTargetPage] = React.useState(0);
  const [position, setPosition] = React.useState<{ x: number; y: number } | null>(null);
  const [processing, setProcessing] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const sigCanvasRef = React.useRef<HTMLCanvasElement>(null);
  const drawing = React.useRef(false);
  const [hasSignature, setHasSignature] = React.useState(false);

  function startDraw(e: React.PointerEvent<HTMLCanvasElement>) {
    drawing.current = true;
    const canvas = sigCanvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    const rect = canvas.getBoundingClientRect();
    ctx.beginPath();
    ctx.moveTo(e.clientX - rect.left, e.clientY - rect.top);
  }
  function draw(e: React.PointerEvent<HTMLCanvasElement>) {
    if (!drawing.current) return;
    const canvas = sigCanvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    const rect = canvas.getBoundingClientRect();
    ctx.lineTo(e.clientX - rect.left, e.clientY - rect.top);
    ctx.strokeStyle = "#1a1a2e";
    ctx.lineWidth = 2.5;
    ctx.lineCap = "round";
    ctx.stroke();
    setHasSignature(true);
  }
  function endDraw() {
    drawing.current = false;
  }
  function clearSignature() {
    const canvas = sigCanvasRef.current;
    if (!canvas) return;
    canvas.getContext("2d")!.clearRect(0, 0, canvas.width, canvas.height);
    setHasSignature(false);
  }

  function pickPosition(e: React.MouseEvent<HTMLImageElement>) {
    const bounds = e.currentTarget.getBoundingClientRect();
    setPosition({
      x: (e.clientX - bounds.left) / bounds.width,
      y: (e.clientY - bounds.top) / bounds.height,
    });
  }

  async function apply() {
    if (!file || !hasSignature || !position) return;
    setProcessing(true);
    setError(null);
    try {
      const sigCanvas = sigCanvasRef.current!;
      const sigDataUrl = sigCanvas.toDataURL("image/png");
      const sigBytes = await (await fetch(sigDataUrl)).arrayBuffer();

      const bytes = await file.arrayBuffer();
      const doc = await PDFDocument.load(bytes);
      const sigImage = await doc.embedPng(sigBytes);
      const page = doc.getPages()[targetPage];
      const { width, height } = page.getSize();

      const sigWidth = width * 0.25;
      const sigHeight = (sigCanvas.height / sigCanvas.width) * sigWidth;
      page.drawImage(sigImage, {
        x: position.x * width - sigWidth / 2,
        y: height - position.y * height - sigHeight / 2,
        width: sigWidth,
        height: sigHeight,
      });

      const outBytes = await doc.save();
      downloadPdfBytes(outBytes, `${stripPdfExtension(file.name)}-signed.pdf`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Couldn't sign this PDF — it may be corrupted or password-protected.");
    } finally {
      setProcessing(false);
    }
  }

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      {!file && <PdfUploadZone file={file} onFileSelect={setFile} onClear={() => setFile(null)} />}

      {file && (
        <>
          <div className="flex items-center justify-between">
            <p className="text-sm">
              {file.name} — {pageCount || "..."} pages
            </p>
            <Button type="button" variant="outline" size="sm" onClick={() => setFile(null)}>
              Choose a different file
            </Button>
          </div>

          <div className="mt-4">
            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              1. Draw your signature
            </p>
            <div className="mt-1.5 flex items-start gap-2">
              <canvas
                ref={sigCanvasRef}
                width={300}
                height={100}
                className="touch-none rounded border bg-white"
                onPointerDown={startDraw}
                onPointerMove={draw}
                onPointerUp={endDraw}
                onPointerLeave={endDraw}
              />
              <Button type="button" variant="outline" size="icon" onClick={clearSignature} aria-label="Clear">
                <Eraser className="size-4" />
              </Button>
            </div>
          </div>

          {thumbnails.length > 0 && (
            <div className="mt-4">
              <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                2. Click the page where your signature should go
              </p>
              <div className="mt-1.5 flex flex-wrap items-start gap-3">
                <select
                  value={targetPage}
                  onChange={(e) => {
                    setTargetPage(Number(e.target.value));
                    setPosition(null);
                  }}
                  className="h-8 rounded-lg border px-2 text-sm"
                >
                  {thumbnails.map((t) => (
                    <option key={t.index} value={t.index}>
                      Page {t.index + 1}
                    </option>
                  ))}
                </select>
              </div>
              <div className="relative mt-2 inline-block max-w-full">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={thumbnails[targetPage]?.url}
                  alt={`Page ${targetPage + 1}`}
                  className="max-h-96 cursor-crosshair rounded border"
                  onClick={pickPosition}
                />
                {position && (
                  <div
                    className="pointer-events-none absolute size-3 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-brand bg-brand/30"
                    style={{ left: `${position.x * 100}%`, top: `${position.y * 100}%` }}
                  />
                )}
              </div>
            </div>
          )}

          {error && <p className="mt-3 text-sm text-destructive">{error}</p>}

          <Button type="button" className="mt-4" onClick={apply} disabled={!hasSignature || !position || processing}>
            <Download className="size-4" />
            {processing ? "Signing..." : "Place signature and download"}
          </Button>
          <p className="mt-2 text-xs text-muted-foreground">
            This places a visual signature image onto the page — it&apos;s not a cryptographic,
            certificate-based digital signature.
          </p>
        </>
      )}
    </div>
  );
}

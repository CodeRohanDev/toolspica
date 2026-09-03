"use client";

import * as React from "react";
import { PDFDocument, StandardFonts, rgb } from "pdf-lib";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Download } from "lucide-react";
import { PdfUploadZone } from "@/components/tools/pdf-upload-zone";
import { loadPdfDocument } from "@/lib/pdf/pdfjs-setup";
import { downloadPdfBytes, stripPdfExtension } from "@/lib/pdf/pdf-helpers";

interface Annotation {
  page: number;
  xPct: number;
  yPct: number;
  text: string;
}

export function PdfEditor() {
  const [file, setFile] = React.useState<File | null>(null);
  const [numPages, setNumPages] = React.useState(0);
  const [pageIndex, setPageIndex] = React.useState(0);
  const [previewUrl, setPreviewUrl] = React.useState<string | null>(null);
  const [annotations, setAnnotations] = React.useState<Annotation[]>([]);
  const [draft, setDraft] = React.useState("");
  const [fontSize, setFontSize] = React.useState(16);
  const [pendingPos, setPendingPos] = React.useState<{ x: number; y: number } | null>(null);
  const [processing, setProcessing] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const imgRef = React.useRef<HTMLImageElement>(null);

  React.useEffect(() => {
    if (!file) return;
    (async () => {
      const buffer = await file.arrayBuffer();
      const doc = await loadPdfDocument(new Uint8Array(buffer));
      setNumPages(doc.numPages);
      await renderPage(doc, pageIndex + 1);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [file]);

  React.useEffect(() => {
    if (!file) return;
    (async () => {
      const buffer = await file.arrayBuffer();
      const doc = await loadPdfDocument(new Uint8Array(buffer));
      await renderPage(doc, pageIndex + 1);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageIndex]);

  async function renderPage(doc: Awaited<ReturnType<typeof loadPdfDocument>>, num: number) {
    const page = await doc.getPage(num);
    const viewport = page.getViewport({ scale: 1.4 });
    const canvas = document.createElement("canvas");
    canvas.width = viewport.width;
    canvas.height = viewport.height;
    const ctx = canvas.getContext("2d")!;
    await page.render({ canvasContext: ctx, viewport, canvas }).promise;
    setPreviewUrl(canvas.toDataURL());
  }

  function handleClick(e: React.MouseEvent<HTMLImageElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    const xPct = (e.clientX - rect.left) / rect.width;
    const yPct = (e.clientY - rect.top) / rect.height;
    setPendingPos({ x: xPct, y: yPct });
  }

  function addAnnotation() {
    if (!pendingPos || !draft.trim()) return;
    setAnnotations((a) => [...a, { page: pageIndex, xPct: pendingPos.x, yPct: pendingPos.y, text: draft }]);
    setDraft("");
    setPendingPos(null);
  }

  async function exportPdf() {
    if (!file) return;
    setProcessing(true);
    setError(null);
    try {
      const bytes = await file.arrayBuffer();
      const doc = await PDFDocument.load(bytes);
      const font = await doc.embedFont(StandardFonts.Helvetica);
      const pages = doc.getPages();
      for (const ann of annotations) {
        const page = pages[ann.page];
        if (!page) continue;
        const { width, height } = page.getSize();
        page.drawText(ann.text, {
          x: ann.xPct * width,
          y: height - ann.yPct * height,
          size: fontSize,
          font,
          color: rgb(0, 0, 0),
        });
      }
      const outBytes = await doc.save();
      downloadPdfBytes(outBytes, `${stripPdfExtension(file.name)}-edited.pdf`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Couldn't save the edited PDF.");
    } finally {
      setProcessing(false);
    }
  }

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <PdfUploadZone file={file} onFileSelect={setFile} onClear={() => { setFile(null); setAnnotations([]); setPreviewUrl(null); }} />

      {previewUrl && (
        <>
          <div className="mt-4 flex items-center gap-3">
            <Button type="button" variant="outline" size="sm" disabled={pageIndex === 0} onClick={() => setPageIndex((p) => p - 1)}>Prev</Button>
            <span className="text-sm text-muted-foreground">Page {pageIndex + 1} of {numPages}</span>
            <Button type="button" variant="outline" size="sm" disabled={pageIndex >= numPages - 1} onClick={() => setPageIndex((p) => p + 1)}>Next</Button>
          </div>
          <p className="mt-2 text-xs text-muted-foreground">Click anywhere on the page to place a text box, type your text, then click &quot;Place text&quot;.</p>
          <div className="relative mt-2 inline-block">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img ref={imgRef} src={previewUrl} alt="PDF page preview" onClick={handleClick} className="max-w-full cursor-crosshair rounded-md border" />
            {annotations.filter((a) => a.page === pageIndex).map((a, i) => (
              <span key={i} className="absolute -translate-y-full text-black" style={{ left: `${a.xPct * 100}%`, top: `${a.yPct * 100}%`, fontSize: fontSize * 0.9 }}>
                {a.text}
              </span>
            ))}
            {pendingPos && (
              <span className="absolute h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary" style={{ left: `${pendingPos.x * 100}%`, top: `${pendingPos.y * 100}%` }} />
            )}
          </div>
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <Input value={draft} onChange={(e) => setDraft(e.target.value)} placeholder="Text to add at the clicked position" className="max-w-xs" />
            <Input type="number" value={fontSize} onChange={(e) => setFontSize(Number(e.target.value) || 16)} className="w-20" title="Font size" />
            <Button type="button" size="sm" onClick={addAnnotation} disabled={!pendingPos || !draft.trim()}>Place text</Button>
            {annotations.length > 0 && (
              <Button type="button" size="sm" variant="ghost" onClick={() => setAnnotations([])}>Clear all ({annotations.length})</Button>
            )}
          </div>
        </>
      )}

      {error && <p className="mt-3 text-sm text-destructive">{error}</p>}

      <Button type="button" className="mt-4" onClick={exportPdf} disabled={!file || processing || annotations.length === 0}>
        <Download className="size-4" />
        {processing ? "Saving..." : "Download edited PDF"}
      </Button>
    </div>
  );
}

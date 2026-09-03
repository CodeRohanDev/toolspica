"use client";

import * as React from "react";
import { PDFDocument, degrees } from "pdf-lib";
import { Button } from "@/components/ui/button";
import { Download, RotateCw } from "lucide-react";
import { PdfUploadZone } from "@/components/tools/pdf-upload-zone";
import { usePdfThumbnails } from "@/lib/pdf/use-pdf-thumbnails";
import { downloadPdfBytes, stripPdfExtension } from "@/lib/pdf/pdf-helpers";

export function PdfRotate() {
  const [file, setFile] = React.useState<File | null>(null);
  const { thumbnails, pageCount, loading } = usePdfThumbnails(file);
  const [rotations, setRotations] = React.useState<Record<number, number>>({});
  const [processing, setProcessing] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  function rotatePage(index: number) {
    setRotations((prev) => ({ ...prev, [index]: ((prev[index] ?? 0) + 90) % 360 }));
  }
  function rotateAll() {
    setRotations((prev) => {
      const next: Record<number, number> = {};
      for (let i = 0; i < pageCount; i++) next[i] = ((prev[i] ?? 0) + 90) % 360;
      return next;
    });
  }

  async function apply() {
    if (!file) return;
    setProcessing(true);
    setError(null);
    try {
      const bytes = await file.arrayBuffer();
      const doc = await PDFDocument.load(bytes);
      doc.getPages().forEach((page, i) => {
        const extra = rotations[i] ?? 0;
        if (extra) page.setRotation(degrees(page.getRotation().angle + extra));
      });
      const outBytes = await doc.save();
      downloadPdfBytes(outBytes, `${stripPdfExtension(file.name)}-rotated.pdf`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Couldn't rotate this PDF — it may be corrupted or password-protected.");
    } finally {
      setProcessing(false);
    }
  }

  const anyRotated = Object.values(rotations).some((r) => r !== 0);

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      {!file && <PdfUploadZone file={file} onFileSelect={setFile} onClear={() => setFile(null)} />}

      {file && (
        <>
          <div className="flex flex-wrap items-center justify-between gap-2">
            <p className="text-sm">
              {file.name} — {pageCount || "..."} pages
            </p>
            <div className="flex gap-2">
              <Button type="button" variant="outline" size="sm" onClick={rotateAll} disabled={loading}>
                <RotateCw className="size-3.5" /> Rotate all 90°
              </Button>
              <Button type="button" variant="outline" size="sm" onClick={() => setFile(null)}>
                Choose a different file
              </Button>
            </div>
          </div>

          {loading && <p className="mt-3 text-sm text-muted-foreground">Rendering page previews...</p>}

          {thumbnails.length > 0 && (
            <div className="mt-4 grid grid-cols-3 gap-3 sm:grid-cols-5">
              {thumbnails.map((t) => (
                <button
                  key={t.index}
                  type="button"
                  onClick={() => rotatePage(t.index)}
                  className="group relative overflow-hidden rounded border hover:border-brand"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={t.url}
                    alt={`Page ${t.index + 1}`}
                    className="w-full transition-transform"
                    style={{ transform: `rotate(${rotations[t.index] ?? 0}deg)` }}
                  />
                  <p className="bg-muted/40 py-0.5 text-center text-xs">
                    Page {t.index + 1} {rotations[t.index] ? `(${rotations[t.index]}°)` : ""}
                  </p>
                  <span className="absolute right-1 top-1 rounded-full bg-background/90 p-1 opacity-0 shadow-sm group-hover:opacity-100">
                    <RotateCw className="size-3" />
                  </span>
                </button>
              ))}
            </div>
          )}

          {error && <p className="mt-3 text-sm text-destructive">{error}</p>}

          <Button type="button" className="mt-4" onClick={apply} disabled={processing || !anyRotated}>
            <Download className="size-4" />
            {processing ? "Applying..." : "Download rotated PDF"}
          </Button>
          <p className="mt-2 text-xs text-muted-foreground">Click a page to rotate it 90° clockwise.</p>
        </>
      )}
    </div>
  );
}

"use client";

import * as React from "react";
import { PDFDocument } from "pdf-lib";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { PdfUploadZone } from "@/components/tools/pdf-upload-zone";
import { usePdfThumbnails, type PdfPageThumb } from "@/lib/pdf/use-pdf-thumbnails";
import { downloadPdfBytes, stripPdfExtension } from "@/lib/pdf/pdf-helpers";

export function PdfReorderPages() {
  const [file, setFile] = React.useState<File | null>(null);
  const { thumbnails, pageCount, loading } = usePdfThumbnails(file);
  const [order, setOrder] = React.useState<PdfPageThumb[]>([]);
  const [processing, setProcessing] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    setOrder(thumbnails);
  }, [thumbnails]);

  function move(pos: number, dir: -1 | 1) {
    setOrder((prev) => {
      const next = [...prev];
      const target = pos + dir;
      if (target < 0 || target >= next.length) return prev;
      [next[pos], next[target]] = [next[target], next[pos]];
      return next;
    });
  }

  async function apply() {
    if (!file || order.length === 0) return;
    setProcessing(true);
    setError(null);
    try {
      const bytes = await file.arrayBuffer();
      const src = await PDFDocument.load(bytes);
      const out = await PDFDocument.create();
      const newIndices = order.map((t) => t.index);
      const pages = await out.copyPages(src, newIndices);
      pages.forEach((p) => out.addPage(p));
      const outBytes = await out.save();
      downloadPdfBytes(outBytes, `${stripPdfExtension(file.name)}-reordered.pdf`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Couldn't reorder pages — the PDF may be corrupted or password-protected.");
    } finally {
      setProcessing(false);
    }
  }

  const changed = order.some((t, i) => t.index !== i);

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      {!file && <PdfUploadZone file={file} onFileSelect={setFile} onClear={() => setFile(null)} />}

      {file && (
        <>
          <div className="flex flex-wrap items-center justify-between gap-2">
            <p className="text-sm">
              {file.name} — {pageCount || "..."} pages
            </p>
            <Button type="button" variant="outline" size="sm" onClick={() => setFile(null)}>
              Choose a different file
            </Button>
          </div>

          {loading && <p className="mt-3 text-sm text-muted-foreground">Rendering page previews...</p>}

          {order.length > 0 && (
            <div className="mt-4 grid grid-cols-3 gap-3 sm:grid-cols-5">
              {order.map((t, pos) => (
                <div key={t.index} className="overflow-hidden rounded border">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={t.url} alt={`Original page ${t.index + 1}`} className="w-full" />
                  <div className="flex items-center justify-between bg-muted/40 px-1 py-0.5">
                    <button
                      type="button"
                      onClick={() => move(pos, -1)}
                      disabled={pos === 0}
                      className="px-1 text-xs disabled:opacity-30"
                    >
                      ↑
                    </button>
                    <span className="text-xs">
                      {pos + 1} (was {t.index + 1})
                    </span>
                    <button
                      type="button"
                      onClick={() => move(pos, 1)}
                      disabled={pos === order.length - 1}
                      className="px-1 text-xs disabled:opacity-30"
                    >
                      ↓
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {error && <p className="mt-3 text-sm text-destructive">{error}</p>}

          <Button type="button" className="mt-4" onClick={apply} disabled={processing || !changed}>
            <Download className="size-4" />
            {processing ? "Saving..." : "Download reordered PDF"}
          </Button>
        </>
      )}
    </div>
  );
}

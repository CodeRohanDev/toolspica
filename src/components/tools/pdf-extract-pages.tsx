"use client";

import * as React from "react";
import { PDFDocument } from "pdf-lib";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Download } from "lucide-react";
import { PdfUploadZone } from "@/components/tools/pdf-upload-zone";
import { usePdfThumbnails } from "@/lib/pdf/use-pdf-thumbnails";
import { downloadPdfBytes, parsePageRanges, stripPdfExtension } from "@/lib/pdf/pdf-helpers";

export function PdfExtractPages() {
  const [file, setFile] = React.useState<File | null>(null);
  const { thumbnails, pageCount, loading } = usePdfThumbnails(file);
  const [selected, setSelected] = React.useState<Set<number>>(new Set());
  const [rangeInput, setRangeInput] = React.useState("");
  const [processing, setProcessing] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  function toggle(index: number) {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(index)) next.delete(index);
      else next.add(index);
      return next;
    });
  }
  function applyRange() {
    setSelected(new Set(parsePageRanges(rangeInput, pageCount)));
  }

  async function extract() {
    if (!file || selected.size === 0) return;
    setProcessing(true);
    setError(null);
    try {
      const bytes = await file.arrayBuffer();
      const src = await PDFDocument.load(bytes);
      const out = await PDFDocument.create();
      const indices = [...selected].sort((a, b) => a - b);
      const pages = await out.copyPages(src, indices);
      pages.forEach((p) => out.addPage(p));
      const outBytes = await out.save();
      downloadPdfBytes(outBytes, `${stripPdfExtension(file.name)}-extracted.pdf`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Couldn't extract pages — the PDF may be corrupted or password-protected.");
    } finally {
      setProcessing(false);
    }
  }

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

          <div className="mt-3 flex items-end gap-2">
            <div className="flex-1">
              <Label htmlFor="extract-range" className="text-sm text-muted-foreground">
                Or type a page range (e.g. 1-3,5,8-10)
              </Label>
              <Input
                id="extract-range"
                value={rangeInput}
                onChange={(e) => setRangeInput(e.target.value)}
                className="mt-1.5 font-mono"
                placeholder="1-3,5,8-10"
              />
            </div>
            <Button type="button" variant="outline" onClick={applyRange}>
              Apply
            </Button>
          </div>

          {loading && <p className="mt-3 text-sm text-muted-foreground">Rendering page previews...</p>}

          {thumbnails.length > 0 && (
            <div className="mt-4 grid grid-cols-3 gap-3 sm:grid-cols-5">
              {thumbnails.map((t) => (
                <button
                  key={t.index}
                  type="button"
                  onClick={() => toggle(t.index)}
                  className={`overflow-hidden rounded border-2 ${
                    selected.has(t.index) ? "border-brand" : "border-transparent hover:border-muted-foreground/30"
                  }`}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={t.url} alt={`Page ${t.index + 1}`} className="w-full" />
                  <p
                    className={`py-0.5 text-center text-xs ${selected.has(t.index) ? "bg-brand-soft font-medium" : "bg-muted/40"}`}
                  >
                    {t.index + 1}
                  </p>
                </button>
              ))}
            </div>
          )}

          {error && <p className="mt-3 text-sm text-destructive">{error}</p>}

          <Button type="button" className="mt-4" onClick={extract} disabled={processing || selected.size === 0}>
            <Download className="size-4" />
            {processing ? "Extracting..." : `Extract ${selected.size} page${selected.size === 1 ? "" : "s"}`}
          </Button>
        </>
      )}
    </div>
  );
}

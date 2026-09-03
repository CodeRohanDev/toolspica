"use client";

import * as React from "react";
import { PDFDocument } from "pdf-lib";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { PdfUploadZone } from "@/components/tools/pdf-upload-zone";
import { usePdfThumbnails } from "@/lib/pdf/use-pdf-thumbnails";
import { downloadBytesFile, stripPdfExtension } from "@/lib/pdf/pdf-helpers";
import { createZip } from "@/lib/zip-writer";

export function PdfSplit() {
  const [file, setFile] = React.useState<File | null>(null);
  const { thumbnails, pageCount, loading, error: thumbError } = usePdfThumbnails(file);
  const [processing, setProcessing] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  async function splitAll() {
    if (!file) return;
    setProcessing(true);
    setError(null);
    try {
      const bytes = await file.arrayBuffer();
      const src = await PDFDocument.load(bytes);
      const entries = [];
      for (let i = 0; i < src.getPageCount(); i++) {
        const out = await PDFDocument.create();
        const [page] = await out.copyPages(src, [i]);
        out.addPage(page);
        const outBytes = await out.save();
        entries.push({ name: `page-${i + 1}.pdf`, data: outBytes });
      }
      const zip = createZip(entries);
      downloadBytesFile(zip, `${stripPdfExtension(file.name)}-split.zip`, "application/zip");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Couldn't split this PDF — it may be corrupted or password-protected.");
    } finally {
      setProcessing(false);
    }
  }

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      {!file && (
        <PdfUploadZone file={file} onFileSelect={setFile} onClear={() => setFile(null)} />
      )}

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

          {loading && <p className="mt-3 text-sm text-muted-foreground">Rendering page previews...</p>}
          {thumbError && <p className="mt-3 text-sm text-destructive">{thumbError}</p>}

          {thumbnails.length > 0 && (
            <div className="mt-4 grid grid-cols-4 gap-2 sm:grid-cols-6">
              {thumbnails.map((t) => (
                <div key={t.index} className="overflow-hidden rounded border">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={t.url} alt={`Page ${t.index + 1}`} className="w-full" />
                  <p className="bg-muted/40 py-0.5 text-center text-xs">{t.index + 1}</p>
                </div>
              ))}
            </div>
          )}

          {error && <p className="mt-3 text-sm text-destructive">{error}</p>}

          <Button type="button" className="mt-4" onClick={splitAll} disabled={processing || pageCount < 2}>
            <Download className="size-4" />
            {processing ? "Splitting..." : `Split into ${pageCount} PDFs (ZIP)`}
          </Button>
          {pageCount === 1 && (
            <p className="mt-2 text-sm text-muted-foreground">This PDF only has one page.</p>
          )}
        </>
      )}
    </div>
  );
}

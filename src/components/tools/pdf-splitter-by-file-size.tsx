"use client";

import * as React from "react";
import { PDFDocument } from "pdf-lib";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Download } from "lucide-react";
import { PdfUploadZone } from "@/components/tools/pdf-upload-zone";
import { downloadBytesFile, stripPdfExtension } from "@/lib/pdf/pdf-helpers";
import { createZip } from "@/lib/zip-writer";

export function PdfSplitterByFileSize() {
  const [file, setFile] = React.useState<File | null>(null);
  const [maxSizeMb, setMaxSizeMb] = React.useState("5");
  const [processing, setProcessing] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [progress, setProgress] = React.useState("");

  async function split() {
    if (!file) return;
    const maxBytes = (parseFloat(maxSizeMb) || 5) * 1024 * 1024;
    setProcessing(true);
    setError(null);
    try {
      const bytes = await file.arrayBuffer();
      const src = await PDFDocument.load(bytes);
      const totalPages = src.getPageCount();
      const outputs: Uint8Array[] = [];
      let current = await PDFDocument.create();
      let pagesInCurrent = 0;

      for (let i = 0; i < totalPages; i++) {
        setProgress(`Processing page ${i + 1} of ${totalPages}...`);
        const [page] = await current.copyPages(src, [i]);
        current.addPage(page);
        pagesInCurrent++;
        const testBytes = await current.save();

        if (testBytes.length > maxBytes && pagesInCurrent > 1) {
          // This page pushed us over — save without it, start a new doc with just this page.
          const withoutLast = await PDFDocument.create();
          const pages = await withoutLast.copyPages(src, [...Array(pagesInCurrent - 1).keys()].map((k) => i - pagesInCurrent + 1 + k));
          pages.forEach((p) => withoutLast.addPage(p));
          outputs.push(await withoutLast.save());

          current = await PDFDocument.create();
          const [retryPage] = await current.copyPages(src, [i]);
          current.addPage(retryPage);
          pagesInCurrent = 1;
        }
      }
      if (pagesInCurrent > 0) outputs.push(await current.save());

      if (outputs.length === 1) {
        downloadBytesFile(outputs[0], `${stripPdfExtension(file.name)}-part-1.pdf`, "application/pdf");
      } else {
        const entries = outputs.map((data, i) => ({ name: `${stripPdfExtension(file.name)}-part-${i + 1}.pdf`, data }));
        const zip = createZip(entries);
        downloadBytesFile(zip, `${stripPdfExtension(file.name)}-split-by-size.zip`, "application/zip");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Couldn't split this PDF — it may be corrupted or password-protected.");
    } finally {
      setProcessing(false);
      setProgress("");
    }
  }

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <PdfUploadZone file={file} onFileSelect={setFile} onClear={() => setFile(null)} />

      <div className="mt-4">
        <Label htmlFor="max-size" className="text-sm text-muted-foreground">
          Maximum size per file (MB)
        </Label>
        <Input id="max-size" value={maxSizeMb} onChange={(e) => setMaxSizeMb(e.target.value)} className="mt-1.5 w-24 font-mono" />
      </div>

      {error && <p className="mt-3 text-sm text-destructive">{error}</p>}
      {processing && progress && <p className="mt-3 text-sm text-muted-foreground">{progress}</p>}

      <Button type="button" className="mt-4" onClick={split} disabled={!file || processing}>
        <Download className="size-4" />
        {processing ? "Splitting..." : "Split by file size"}
      </Button>
      <p className="mt-2 text-xs text-muted-foreground">
        Each single page must individually be under your size limit — a page containing a very
        large embedded image can&apos;t be split smaller than itself.
      </p>
    </div>
  );
}

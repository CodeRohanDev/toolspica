"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { PdfUploadZone } from "@/components/tools/pdf-upload-zone";
import { loadPdfDocument } from "@/lib/pdf/pdfjs-setup";
import { extractLines, linesToHtml } from "@/lib/pdf/pdf-text-lines";
import { buildEpub } from "@/lib/pdf/epub-writer";
import { downloadBytesFile, stripPdfExtension } from "@/lib/pdf/pdf-helpers";

interface TextItemLike {
  str: string;
  transform: number[];
}

export function PdfToEpub() {
  const [file, setFile] = React.useState<File | null>(null);
  const [loading, setLoading] = React.useState(false);
  const [done, setDone] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  async function handleFile(picked: File) {
    setFile(picked);
    setDone(false);
    setError(null);
    setLoading(true);
    try {
      const buffer = await picked.arrayBuffer();
      const doc = await loadPdfDocument(new Uint8Array(buffer));
      const title = stripPdfExtension(picked.name);
      const chapters = [];
      for (let i = 1; i <= doc.numPages; i++) {
        const page = await doc.getPage(i);
        const content = await page.getTextContent();
        const items = (content.items as TextItemLike[]).map((it) => ({
          str: it.str,
          x: it.transform[4],
          y: it.transform[5],
          fontSize: it.transform[0],
        }));
        const html = linesToHtml(extractLines(items));
        if (html.trim()) chapters.push({ title: `Page ${i}`, html });
      }
      if (chapters.length === 0) throw new Error("No extractable text found in this PDF.");

      const epubBytes = buildEpub(title, "Toolspica", chapters);
      downloadBytesFile(epubBytes, `${title}.epub`, "application/epub+zip");
      setDone(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Couldn't convert this PDF — it may be corrupted, password-protected, or scanned images without embedded text.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      {!file && <PdfUploadZone file={file} onFileSelect={handleFile} onClear={() => setFile(null)} />}

      {file && (
        <>
          <div className="flex items-center justify-between">
            <p className="text-sm">{file.name}</p>
            <Button type="button" variant="outline" size="sm" onClick={() => setFile(null)}>
              Choose a different file
            </Button>
          </div>

          {loading && <p className="mt-3 text-sm text-muted-foreground">Converting to EPUB...</p>}
          {error && <p className="mt-3 text-sm text-destructive">{error}</p>}
          {done && (
            <div className="mt-3 flex items-center gap-2 text-sm text-emerald-600 dark:text-emerald-400">
              <Download className="size-4" /> EPUB downloaded — one chapter per page.
            </div>
          )}
        </>
      )}

      <p className="mt-3 text-xs text-muted-foreground">
        Builds a valid EPUB 3 file with one chapter per PDF page and heading levels inferred from
        font size — a plain-text reflow, not a layout-preserving conversion, so images and complex
        formatting aren&apos;t carried over.
      </p>
    </div>
  );
}

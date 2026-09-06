"use client";

import * as React from "react";
import { BatchUploadZone } from "@/components/tools/batch-upload-zone";
import { BatchFileList } from "@/components/tools/batch-file-list";
import { useBatchFiles } from "@/lib/use-batch-files";
import { loadPdfDocument } from "@/lib/pdf/pdfjs-setup";
import { extractLines, linesToHtml } from "@/lib/pdf/pdf-text-lines";
import { buildEpub } from "@/lib/pdf/epub-writer";
import { stripPdfExtension } from "@/lib/pdf/pdf-helpers";

interface TextItemLike {
  str: string;
  transform: number[];
}

export function PdfToEpub() {
  const convert = React.useCallback(async (file: File) => {
    const buffer = await file.arrayBuffer();
    const doc = await loadPdfDocument(new Uint8Array(buffer));
    const title = stripPdfExtension(file.name);
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
    const blob = new Blob([epubBytes as BlobPart], { type: "application/epub+zip" });
    return { blob, name: `${title}.epub` };
  }, []);

  const { items, addFiles, removeItem } = useBatchFiles(convert);

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <BatchUploadZone accept="application/pdf,.pdf" onFilesSelect={addFiles} label="Drop PDFs to convert to EPUB" />

      <BatchFileList items={items} onRemove={removeItem} zipName="converted-epubs.zip" />

      <p className="mt-3 text-xs text-muted-foreground">
        Builds a valid EPUB 3 file with one chapter per PDF page and heading levels inferred from
        font size — a plain-text reflow, not a layout-preserving conversion, so images and complex
        formatting aren&apos;t carried over.
      </p>
    </div>
  );
}

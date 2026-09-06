"use client";

import * as React from "react";
import { BatchUploadZone } from "@/components/tools/batch-upload-zone";
import { BatchFileList } from "@/components/tools/batch-file-list";
import { useBatchFiles } from "@/lib/use-batch-files";
import { loadPdfDocument } from "@/lib/pdf/pdfjs-setup";
import { extractLines } from "@/lib/pdf/pdf-text-lines";
import { buildDocx, type DocxParagraph } from "@/lib/pdf/docx-writer";
import { stripPdfExtension } from "@/lib/pdf/pdf-helpers";

interface TextItemLike {
  str: string;
  transform: number[];
}

export function PdfToWord() {
  const convert = React.useCallback(async (file: File) => {
    const buffer = await file.arrayBuffer();
    const doc = await loadPdfDocument(new Uint8Array(buffer));
    const paragraphs: DocxParagraph[] = [];
    for (let i = 1; i <= doc.numPages; i++) {
      const page = await doc.getPage(i);
      const content = await page.getTextContent();
      const items = (content.items as TextItemLike[]).map((it) => ({
        str: it.str,
        x: it.transform[4],
        y: it.transform[5],
        fontSize: it.transform[0],
      }));
      const lines = extractLines(items);
      if (lines.length === 0) continue;
      const sizes = lines.map((l) => l.fontSize);
      const median = [...sizes].sort((a, b) => a - b)[Math.floor(sizes.length / 2)];
      for (const line of lines) {
        if (!line.text) continue;
        paragraphs.push({ text: line.text, heading: line.fontSize > median * 1.4 });
      }
    }
    if (paragraphs.length === 0) throw new Error("No extractable text found in this PDF.");

    const docxBytes = buildDocx(paragraphs);
    const blob = new Blob([docxBytes as BlobPart], { type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document" });
    return { blob, name: `${stripPdfExtension(file.name)}.docx` };
  }, []);

  const { items, addFiles, removeItem } = useBatchFiles(convert);

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <BatchUploadZone accept="application/pdf,.pdf" onFilesSelect={addFiles} label="Drop PDFs to convert to Word" />

      <BatchFileList items={items} onRemove={removeItem} zipName="converted-word-docs.zip" />

      <p className="mt-3 text-xs text-muted-foreground">
        Extracts text as editable paragraphs with basic heading detection — a plain-text
        conversion, not a layout-preserving one, so columns, images, and tables aren&apos;t carried
        over.
      </p>
    </div>
  );
}

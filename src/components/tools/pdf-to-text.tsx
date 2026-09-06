"use client";

import * as React from "react";
import { BatchUploadZone } from "@/components/tools/batch-upload-zone";
import { BatchFileList } from "@/components/tools/batch-file-list";
import { useBatchFiles } from "@/lib/use-batch-files";
import { loadPdfDocument } from "@/lib/pdf/pdfjs-setup";
import { stripPdfExtension } from "@/lib/pdf/pdf-helpers";

export function PdfToText() {
  const convert = React.useCallback(async (file: File) => {
    const buffer = await file.arrayBuffer();
    const doc = await loadPdfDocument(new Uint8Array(buffer));
    const pageTexts: string[] = [];
    for (let i = 1; i <= doc.numPages; i++) {
      const page = await doc.getPage(i);
      const content = await page.getTextContent();
      const pageText = content.items.map((item) => ("str" in item ? item.str : "")).join(" ");
      pageTexts.push(pageText);
    }
    const blob = new Blob([pageTexts.join("\n\n")], { type: "text/plain" });
    return { blob, name: `${stripPdfExtension(file.name)}.txt` };
  }, []);

  const { items, addFiles, removeItem } = useBatchFiles(convert);

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <BatchUploadZone accept="application/pdf,.pdf" onFilesSelect={addFiles} label="Drop PDFs to extract text from" />

      <BatchFileList items={items} onRemove={removeItem} zipName="extracted-text.zip" />

      <p className="mt-3 text-xs text-muted-foreground">
        Pulls each PDF&apos;s embedded text layer directly — this won&apos;t work on scanned
        image-only PDFs with no text layer (use PDF OCR for those instead).
      </p>
    </div>
  );
}

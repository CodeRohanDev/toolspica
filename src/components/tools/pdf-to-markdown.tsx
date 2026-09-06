"use client";

import * as React from "react";
import { BatchUploadZone } from "@/components/tools/batch-upload-zone";
import { BatchFileList } from "@/components/tools/batch-file-list";
import { useBatchFiles } from "@/lib/use-batch-files";
import { loadPdfDocument } from "@/lib/pdf/pdfjs-setup";
import { extractLines, linesToMarkdown } from "@/lib/pdf/pdf-text-lines";
import { stripPdfExtension } from "@/lib/pdf/pdf-helpers";

interface TextItemLike {
  str: string;
  transform: number[];
}

export function PdfToMarkdown() {
  const convert = React.useCallback(async (file: File) => {
    const buffer = await file.arrayBuffer();
    const doc = await loadPdfDocument(new Uint8Array(buffer));
    const sections: string[] = [];
    for (let i = 1; i <= doc.numPages; i++) {
      const page = await doc.getPage(i);
      const content = await page.getTextContent();
      const items = (content.items as TextItemLike[]).map((it) => ({
        str: it.str,
        x: it.transform[4],
        y: it.transform[5],
        fontSize: it.transform[0],
      }));
      sections.push(linesToMarkdown(extractLines(items)));
    }
    const blob = new Blob([sections.join("\n\n---\n\n")], { type: "text/markdown" });
    return { blob, name: `${stripPdfExtension(file.name)}.md` };
  }, []);

  const { items, addFiles, removeItem } = useBatchFiles(convert);

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <BatchUploadZone accept="application/pdf,.pdf" onFilesSelect={addFiles} label="Drop PDFs to convert to Markdown" />

      <BatchFileList items={items} onRemove={removeItem} zipName="converted-markdown.zip" />

      <p className="mt-3 text-xs text-muted-foreground">
        Headings are inferred from relative font size, since PDF has no built-in semantic
        structure — works well for typically-formatted documents, approximate for unusual layouts.
      </p>
    </div>
  );
}

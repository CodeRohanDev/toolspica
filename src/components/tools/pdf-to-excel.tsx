"use client";

import * as React from "react";
import { BatchUploadZone } from "@/components/tools/batch-upload-zone";
import { BatchFileList } from "@/components/tools/batch-file-list";
import { useBatchFiles } from "@/lib/use-batch-files";
import { loadPdfDocument } from "@/lib/pdf/pdfjs-setup";
import { extractRows } from "@/lib/pdf/pdf-table-extract";
import { buildXlsx } from "@/lib/pdf/xlsx-writer";
import { stripPdfExtension } from "@/lib/pdf/pdf-helpers";

interface TextItemLike {
  str: string;
  transform: number[];
  width: number;
}

export function PdfToExcel() {
  const convert = React.useCallback(async (file: File) => {
    const buffer = await file.arrayBuffer();
    const doc = await loadPdfDocument(new Uint8Array(buffer));
    const allRows: string[][] = [];
    for (let i = 1; i <= doc.numPages; i++) {
      const page = await doc.getPage(i);
      const content = await page.getTextContent();
      const items = (content.items as TextItemLike[]).map((it) => ({
        str: it.str,
        x: it.transform[4],
        y: it.transform[5],
        width: it.width,
      }));
      allRows.push(...extractRows(items));
    }
    if (allRows.length === 0) throw new Error("No extractable table data found in this PDF.");

    const xlsxBytes = buildXlsx(allRows);
    const blob = new Blob([xlsxBytes as BlobPart], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
    return { blob, name: `${stripPdfExtension(file.name)}.xlsx` };
  }, []);

  const { items, addFiles, removeItem } = useBatchFiles(convert);

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <BatchUploadZone accept="application/pdf,.pdf" onFilesSelect={addFiles} label="Drop PDFs to convert to Excel" />

      <BatchFileList items={items} onRemove={removeItem} zipName="converted-excel-files.zip" />

      <p className="mt-3 text-xs text-muted-foreground">
        Reconstructs rows and columns from text position on the page — a heuristic that works well
        for clean, evenly-spaced tables but is approximate for complex or irregular layouts.
      </p>
    </div>
  );
}

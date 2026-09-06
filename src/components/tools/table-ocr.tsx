"use client";

import * as React from "react";
import { BatchUploadZone } from "@/components/tools/batch-upload-zone";
import { BatchFileList } from "@/components/tools/batch-file-list";
import { useBatchFiles } from "@/lib/use-batch-files";
import { flattenWords, wordsToRows } from "@/lib/ocr-table";
import { buildXlsx } from "@/lib/pdf/xlsx-writer";
import { stripPdfExtension } from "@/lib/pdf/pdf-helpers";

export function TableOcr() {
  const convert = React.useCallback(async (file: File) => {
    const { createWorker } = await import("tesseract.js");
    const worker = await createWorker("eng", 1, { corePath: "/tesseract-core", workerPath: "/tesseract-worker.min.js" });
    const { data } = await worker.recognize(file, {}, { blocks: true });
    await worker.terminate();
    const rows = wordsToRows(flattenWords(data));
    if (rows.length === 0) throw new Error("Couldn't extract a table from this image.");
    const xlsx = buildXlsx(rows);
    const blob = new Blob([xlsx as BlobPart], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
    return { blob, name: `${stripPdfExtension(file.name)}.xlsx` };
  }, []);

  const { items, addFiles, removeItem } = useBatchFiles(convert);

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <BatchUploadZone accept="image/*" onFilesSelect={addFiles} label="Drop table photos to extract" />

      <BatchFileList items={items} onRemove={removeItem} zipName="extracted-tables.zip" />

      <p className="mt-3 text-xs text-muted-foreground">
        Recognizes text and reconstructs rows/columns from word position, the same heuristic used
        by our PDF table tools. Works best on tables with clear, evenly-spaced columns;
        tightly-packed or skewed photos may merge adjacent columns.
      </p>
    </div>
  );
}

"use client";

import * as React from "react";
import { BatchUploadZone } from "@/components/tools/batch-upload-zone";
import { BatchFileList } from "@/components/tools/batch-file-list";
import { useBatchFiles } from "@/lib/use-batch-files";
import { stripExtension } from "@/lib/image-processing";

export function ReceiptOcr() {
  const convert = React.useCallback(async (file: File) => {
    const { createWorker } = await import("tesseract.js");
    const worker = await createWorker("eng", 1, { corePath: "/tesseract-core", workerPath: "/tesseract-worker.min.js" });
    const { data } = await worker.recognize(file);
    await worker.terminate();
    const blob = new Blob([data.text.trim()], { type: "text/plain" });
    return { blob, name: `${stripExtension(file.name)}.txt` };
  }, []);

  const { items, addFiles, removeItem } = useBatchFiles(convert);

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <BatchUploadZone accept="image/*" onFilesSelect={addFiles} label="Drop receipt photos to extract text from" />

      <BatchFileList items={items} onRemove={removeItem} zipName="receipt-text.zip" />

      <p className="mt-3 text-xs text-muted-foreground">
        Extracts all text from each receipt photo — this is basic text extraction, not full
        structured receipt parsing (line items, tax breakdown, totals, etc.). Runs entirely in
        your browser, no upload.
      </p>
    </div>
  );
}

"use client";

import * as React from "react";
import { BatchUploadZone } from "@/components/tools/batch-upload-zone";
import { BatchFileList } from "@/components/tools/batch-file-list";
import { useBatchFiles } from "@/lib/use-batch-files";
import { buildDocx } from "@/lib/pdf/docx-writer";
import { stripPdfExtension } from "@/lib/pdf/pdf-helpers";

export function OcrToWord() {
  const convert = React.useCallback(async (file: File) => {
    const { createWorker } = await import("tesseract.js");
    const worker = await createWorker("eng", 1, { corePath: "/tesseract-core", workerPath: "/tesseract-worker.min.js" });
    const { data } = await worker.recognize(file);
    await worker.terminate();
    const paragraphs = data.text.split("\n").map((line) => line.trim()).filter(Boolean).map((text) => ({ text }));
    if (paragraphs.length === 0) throw new Error("No text recognized in this image.");
    const docx = buildDocx(paragraphs);
    const blob = new Blob([docx as BlobPart], { type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document" });
    return { blob, name: `${stripPdfExtension(file.name)}.docx` };
  }, []);

  const { items, addFiles, removeItem } = useBatchFiles(convert);

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <BatchUploadZone accept="image/*" onFilesSelect={addFiles} label="Drop images to recognize and save as Word" />

      <BatchFileList items={items} onRemove={removeItem} zipName="ocr-word-docs.zip" />

      <p className="mt-3 text-xs text-muted-foreground">
        Recognizes text from each image and saves it directly as an editable .docx Word document —
        each recognized line becomes its own paragraph. Runs entirely in your browser, no upload.
      </p>
    </div>
  );
}

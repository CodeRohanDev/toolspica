"use client";

import * as React from "react";
import { BatchUploadZone } from "@/components/tools/batch-upload-zone";
import { BatchFileList } from "@/components/tools/batch-file-list";
import { useBatchFiles } from "@/lib/use-batch-files";
import { stripExtension } from "@/lib/image-processing";

function cleanPlate(text: string): string {
  return text.toUpperCase().replace(/[^A-Z0-9]/g, "");
}

export function LicensePlateOcr() {
  const convert = React.useCallback(async (file: File) => {
    const { createWorker } = await import("tesseract.js");
    const worker = await createWorker("eng", 1, { corePath: "/tesseract-core", workerPath: "/tesseract-worker.min.js" });
    const { data } = await worker.recognize(file);
    await worker.terminate();
    const plate = cleanPlate(data.text);
    const blob = new Blob([plate], { type: "text/plain" });
    return { blob, name: `${stripExtension(file.name)}-plate.txt` };
  }, []);

  const { items, addFiles, removeItem } = useBatchFiles(convert);

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <BatchUploadZone accept="image/*" onFilesSelect={addFiles} label="Drop license plate photos" />

      <BatchFileList items={items} onRemove={removeItem} zipName="license-plates.zip" />

      <p className="mt-3 text-xs text-muted-foreground">
        Recognizes text and strips it down to letters and numbers only, matching a plate&apos;s
        typical format. Works best on a cropped, well-lit, front-on photo of just the plate —
        accuracy drops on angled shots or a photo with lots of surrounding vehicle visible.
      </p>
    </div>
  );
}

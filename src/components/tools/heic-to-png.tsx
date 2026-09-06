"use client";

import * as React from "react";
import { ImageBatchWorkspace } from "@/components/tools/image-batch-workspace";
import { useBatchFiles } from "@/lib/use-batch-files";
import { canvasToBlob, stripExtension } from "@/lib/image-processing";
import { decodeHeicToCanvas } from "@/lib/heic-decoder";

export function HeicToPng() {
  const convert = React.useCallback(async (file: File) => {
    const canvas = await decodeHeicToCanvas(file);
    const blob = await canvasToBlob(canvas, "image/png");
    return { blob, name: `${stripExtension(file.name)}.png` };
  }, []);

  const { items, addFiles, removeItem } = useBatchFiles(convert, { live: true });

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <ImageBatchWorkspace
        items={items}
        onFilesSelect={addFiles}
        onRemove={removeItem}
        accept=".heic,.heif,image/heic,image/heif"
        uploadLabel="Drop HEIC/HEIF files to convert to PNG"
        zipName="converted-pngs.zip"
      />

      <p className="mt-3 text-xs text-muted-foreground">
        HEIC (used by default on iPhone) decodes entirely in your browser via WebAssembly — nothing
        is uploaded. PNG gives a lossless result, at a larger file size than the equivalent JPG.
      </p>
    </div>
  );
}

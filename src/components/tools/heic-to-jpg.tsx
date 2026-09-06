"use client";

import * as React from "react";
import { ImageBatchWorkspace } from "@/components/tools/image-batch-workspace";
import { useBatchFiles } from "@/lib/use-batch-files";
import { canvasToBlob, stripExtension } from "@/lib/image-processing";
import { decodeHeicToCanvas } from "@/lib/heic-decoder";

export function HeicToJpg() {
  const convert = React.useCallback(async (file: File) => {
    const canvas = await decodeHeicToCanvas(file);
    const blob = await canvasToBlob(canvas, "image/jpeg", 0.92);
    return { blob, name: `${stripExtension(file.name)}.jpg` };
  }, []);

  const { items, addFiles, removeItem } = useBatchFiles(convert, { live: true });

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <ImageBatchWorkspace
        items={items}
        onFilesSelect={addFiles}
        onRemove={removeItem}
        accept=".heic,.heif,image/heic,image/heif"
        uploadLabel="Drop HEIC/HEIF files to convert to JPG"
        zipName="converted-jpgs.zip"
      />

      <p className="mt-3 text-xs text-muted-foreground">
        HEIC (used by default on iPhone) decodes entirely in your browser via WebAssembly — nothing
        is uploaded. Most cameras save two images (a full photo and a thumbnail) inside one HEIC
        file; this converts the primary, full-resolution image.
      </p>
    </div>
  );
}

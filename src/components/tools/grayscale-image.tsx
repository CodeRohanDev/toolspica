"use client";

import * as React from "react";
import { ImageBatchWorkspace } from "@/components/tools/image-batch-workspace";
import { useBatchFiles } from "@/lib/use-batch-files";
import { loadImageFromFile, canvasToBlob, stripExtension } from "@/lib/image-processing";

export function GrayscaleImage() {
  const convert = React.useCallback(async (file: File) => {
    const img = await loadImageFromFile(file);
    const canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;
    const ctx = canvas.getContext("2d")!;
    ctx.filter = "grayscale(100%)";
    ctx.drawImage(img, 0, 0);
    const blob = await canvasToBlob(canvas, "image/png");
    return { blob, name: `${stripExtension(file.name)}-grayscale.png` };
  }, []);

  const { items, addFiles, removeItem } = useBatchFiles(convert, { live: true });

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <ImageBatchWorkspace
        items={items}
        onFilesSelect={addFiles}
        onRemove={removeItem}
        uploadLabel="Drop images to convert to grayscale"
        zipName="grayscale-images.zip"
      />
    </div>
  );
}

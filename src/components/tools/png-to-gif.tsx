"use client";

import * as React from "react";
import { ImageBatchWorkspace } from "@/components/tools/image-batch-workspace";
import { useBatchFiles } from "@/lib/use-batch-files";
import { loadImageFromFile, stripExtension } from "@/lib/image-processing";
import { encodeGif } from "@/lib/gif-encoder";

export function PngToGif() {
  const convert = React.useCallback(async (file: File) => {
    const img = await loadImageFromFile(file);
    const canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;
    const ctx = canvas.getContext("2d")!;
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 0, 0);
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const gifBytes = encodeGif(imageData);
    const blob = new Blob([gifBytes as BlobPart], { type: "image/gif" });
    return { blob, name: `${stripExtension(file.name)}.gif` };
  }, []);

  const { items, addFiles, removeItem } = useBatchFiles(convert, { live: true });

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <ImageBatchWorkspace
        items={items}
        onFilesSelect={addFiles}
        onRemove={removeItem}
        accept="image/png"
        uploadLabel="Drop PNG files to convert to GIF"
        zipName="converted-gifs.zip"
      />

      <p className="mt-3 text-xs text-muted-foreground">
        Uses a from-scratch GIF encoder with median-cut color quantization (reducing to up to 256
        colors, the GIF format&apos;s limit) — transparent PNG areas are filled white.
      </p>
    </div>
  );
}

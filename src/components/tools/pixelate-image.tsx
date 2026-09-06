"use client";

import * as React from "react";
import { Label } from "@/components/ui/label";
import { ImageBatchWorkspace } from "@/components/tools/image-batch-workspace";
import { useBatchFiles } from "@/lib/use-batch-files";
import { loadImageFromFile, canvasToBlob, stripExtension } from "@/lib/image-processing";

export function PixelateImage() {
  const [pixelSize, setPixelSize] = React.useState(12);

  const convert = React.useCallback(
    async (file: File) => {
      const img = await loadImageFromFile(file);
      const scale = 1 / pixelSize;
      const small = document.createElement("canvas");
      small.width = Math.max(1, Math.round(img.width * scale));
      small.height = Math.max(1, Math.round(img.height * scale));
      const smallCtx = small.getContext("2d")!;
      smallCtx.drawImage(img, 0, 0, small.width, small.height);

      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d")!;
      ctx.imageSmoothingEnabled = false;
      ctx.drawImage(small, 0, 0, canvas.width, canvas.height);

      const blob = await canvasToBlob(canvas, "image/png");
      return { blob, name: `${stripExtension(file.name)}-pixelated.png` };
    },
    [pixelSize]
  );

  const { items, addFiles, removeItem } = useBatchFiles(convert, { live: true });

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <ImageBatchWorkspace
        items={items}
        onFilesSelect={addFiles}
        onRemove={removeItem}
        uploadLabel="Drop images to pixelate"
        zipName="pixelated-images.zip"
      />

      <div className="mt-4 flex items-center gap-3">
        <Label htmlFor="pixel-size" className="shrink-0 text-sm text-muted-foreground">
          Pixel size
        </Label>
        <input
          id="pixel-size"
          type="range"
          min={2}
          max={40}
          value={pixelSize}
          onChange={(e) => setPixelSize(Number(e.target.value))}
          className="flex-1"
        />
        <span className="w-10 shrink-0 text-sm tabular-nums">{pixelSize}</span>
      </div>
    </div>
  );
}

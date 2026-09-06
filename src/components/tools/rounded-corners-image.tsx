"use client";

import * as React from "react";
import { Label } from "@/components/ui/label";
import { ImageBatchWorkspace } from "@/components/tools/image-batch-workspace";
import { useBatchFiles } from "@/lib/use-batch-files";
import { loadImageFromFile, canvasToBlob, stripExtension } from "@/lib/image-processing";

export function RoundedCornersImage() {
  const [radius, setRadius] = React.useState(24);

  const convert = React.useCallback(
    async (file: File) => {
      const img = await loadImageFromFile(file);
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d")!;
      const clampedRadius = Math.min(radius, img.width / 2, img.height / 2);
      ctx.beginPath();
      ctx.moveTo(clampedRadius, 0);
      ctx.arcTo(canvas.width, 0, canvas.width, canvas.height, clampedRadius);
      ctx.arcTo(canvas.width, canvas.height, 0, canvas.height, clampedRadius);
      ctx.arcTo(0, canvas.height, 0, 0, clampedRadius);
      ctx.arcTo(0, 0, canvas.width, 0, clampedRadius);
      ctx.closePath();
      ctx.clip();
      ctx.drawImage(img, 0, 0);
      const blob = await canvasToBlob(canvas, "image/png");
      return { blob, name: `${stripExtension(file.name)}-rounded.png` };
    },
    [radius]
  );

  const { items, addFiles, removeItem } = useBatchFiles(convert, { live: true });

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <ImageBatchWorkspace
        items={items}
        onFilesSelect={addFiles}
        onRemove={removeItem}
        uploadLabel="Drop images to round the corners of"
        zipName="rounded-images.zip"
      />

      <div className="mt-4 flex items-center gap-3">
        <Label htmlFor="radius" className="shrink-0 text-sm text-muted-foreground">
          Corner radius
        </Label>
        <input
          id="radius"
          type="range"
          min={0}
          max={200}
          value={radius}
          onChange={(e) => setRadius(Number(e.target.value))}
          className="flex-1"
        />
        <span className="w-14 shrink-0 text-sm tabular-nums">{radius}px</span>
      </div>
    </div>
  );
}

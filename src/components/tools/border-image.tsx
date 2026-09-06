"use client";

import * as React from "react";
import { Label } from "@/components/ui/label";
import { ImageBatchWorkspace } from "@/components/tools/image-batch-workspace";
import { useBatchFiles } from "@/lib/use-batch-files";
import { loadImageFromFile, canvasToBlob, stripExtension } from "@/lib/image-processing";

export function BorderImage() {
  const [width, setWidth] = React.useState(20);
  const [color, setColor] = React.useState("#ffffff");

  const convert = React.useCallback(
    async (file: File) => {
      const img = await loadImageFromFile(file);
      const canvas = document.createElement("canvas");
      canvas.width = img.width + width * 2;
      canvas.height = img.height + width * 2;
      const ctx = canvas.getContext("2d")!;
      ctx.fillStyle = color;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, width, width);
      const blob = await canvasToBlob(canvas, "image/png");
      return { blob, name: `${stripExtension(file.name)}-bordered.png` };
    },
    [width, color]
  );

  const { items, addFiles, removeItem } = useBatchFiles(convert, { live: true });

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <ImageBatchWorkspace
        items={items}
        onFilesSelect={addFiles}
        onRemove={removeItem}
        uploadLabel="Drop images to add a border to"
        zipName="bordered-images.zip"
      />

      <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-3">
        <div className="flex flex-1 items-center gap-3">
          <Label htmlFor="border-width" className="shrink-0 text-sm text-muted-foreground">
            Border width
          </Label>
          <input
            id="border-width"
            type="range"
            min={2}
            max={100}
            value={width}
            onChange={(e) => setWidth(Number(e.target.value))}
            className="flex-1"
          />
          <span className="w-12 shrink-0 text-sm tabular-nums">{width}px</span>
        </div>
        <div className="flex items-center gap-2">
          <Label htmlFor="border-color" className="text-sm text-muted-foreground">
            Color
          </Label>
          <input
            id="border-color"
            type="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            className="size-8 cursor-pointer rounded border"
          />
        </div>
      </div>
    </div>
  );
}

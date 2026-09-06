"use client";

import * as React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { ImageBatchWorkspace } from "@/components/tools/image-batch-workspace";
import { useBatchFiles } from "@/lib/use-batch-files";
import { loadImageFromFile, canvasToBlob, stripExtension } from "@/lib/image-processing";

export function ImageResizer() {
  const [width, setWidth] = React.useState("800");
  const [height, setHeight] = React.useState("600");
  const [lockAspect, setLockAspect] = React.useState(true);

  const widthNum = parseInt(width, 10);
  const heightNum = parseInt(height, 10);
  const validWidth = Number.isFinite(widthNum) && widthNum > 0;
  const validHeight = Number.isFinite(heightNum) && heightNum > 0;

  const convert = React.useCallback(
    async (file: File) => {
      const img = await loadImageFromFile(file);
      const targetW = validWidth ? widthNum : img.width;
      const targetH = lockAspect
        ? Math.round((targetW / img.width) * img.height)
        : validHeight
          ? heightNum
          : img.height;
      const canvas = document.createElement("canvas");
      canvas.width = targetW;
      canvas.height = targetH;
      const ctx = canvas.getContext("2d")!;
      ctx.imageSmoothingQuality = "high";
      ctx.drawImage(img, 0, 0, targetW, targetH);
      const blob = await canvasToBlob(canvas, "image/png");
      return { blob, name: `${stripExtension(file.name)}-resized.png` };
    },
    [widthNum, heightNum, lockAspect, validWidth, validHeight]
  );

  const { items, addFiles, removeItem } = useBatchFiles(convert, { live: true });

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <ImageBatchWorkspace
        items={items}
        onFilesSelect={addFiles}
        onRemove={removeItem}
        uploadLabel="Drop images to resize"
        zipName="resized-images.zip"
      />

      <div className="mt-4 flex flex-wrap items-end gap-4">
        <div>
          <Label htmlFor="resize-w" className="text-sm text-muted-foreground">
            Width (px)
          </Label>
          <Input id="resize-w" value={width} onChange={(e) => setWidth(e.target.value)} className="mt-1.5 w-28 font-mono" />
        </div>
        <div>
          <Label htmlFor="resize-h" className="text-sm text-muted-foreground">
            Height (px)
          </Label>
          <Input
            id="resize-h"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            className="mt-1.5 w-28 font-mono"
            disabled={lockAspect}
          />
        </div>
        <div className="flex items-center gap-2">
          <Switch id="lock-aspect" checked={lockAspect} onCheckedChange={setLockAspect} />
          <Label htmlFor="lock-aspect" className="text-sm">
            Lock aspect ratio (per image)
          </Label>
        </div>
      </div>
      <p className="mt-2 text-xs text-muted-foreground">
        {lockAspect
          ? "Every image is resized to this width, with height scaled to match its own original aspect ratio."
          : "Every image is stretched to this exact width × height."}
      </p>
    </div>
  );
}

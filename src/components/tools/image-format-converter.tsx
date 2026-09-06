"use client";

import * as React from "react";
import { Label } from "@/components/ui/label";
import { ImageBatchWorkspace } from "@/components/tools/image-batch-workspace";
import { useBatchFiles } from "@/lib/use-batch-files";
import { loadImageFromFile, canvasToBlob, stripExtension } from "@/lib/image-processing";

interface ImageFormatConverterProps {
  accept: string;
  targetMime: string;
  targetExt: string;
  needsBackgroundFill?: boolean;
  showQuality?: boolean;
}

export function ImageFormatConverter({
  accept,
  targetMime,
  targetExt,
  needsBackgroundFill,
  showQuality,
}: ImageFormatConverterProps) {
  const [quality, setQuality] = React.useState(0.92);
  const [bgColor, setBgColor] = React.useState("#ffffff");

  const convert = React.useCallback(
    async (file: File) => {
      const img = await loadImageFromFile(file);
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d")!;
      if (needsBackgroundFill) {
        ctx.fillStyle = bgColor;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }
      ctx.drawImage(img, 0, 0);
      const blob = await canvasToBlob(canvas, targetMime, showQuality ? quality : undefined);
      return { blob, name: `${stripExtension(file.name)}.${targetExt}` };
    },
    [needsBackgroundFill, bgColor, targetMime, targetExt, showQuality, quality]
  );

  const { items, addFiles, removeItem } = useBatchFiles(convert, { live: true });

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <ImageBatchWorkspace
        items={items}
        onFilesSelect={addFiles}
        onRemove={removeItem}
        accept={accept}
        uploadLabel={`Drop image files to convert to ${targetExt.toUpperCase()}`}
        zipName={`converted-to-${targetExt}.zip`}
      />

      <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-3">
        {needsBackgroundFill && (
          <div className="flex items-center gap-2">
            <Label htmlFor="bg-color" className="text-sm text-muted-foreground">
              Background (for transparent areas)
            </Label>
            <input
              id="bg-color"
              type="color"
              value={bgColor}
              onChange={(e) => setBgColor(e.target.value)}
              className="size-8 cursor-pointer rounded border"
            />
          </div>
        )}
        {showQuality && (
          <div className="flex flex-1 items-center gap-3">
            <Label htmlFor="quality" className="shrink-0 text-sm text-muted-foreground">
              Quality
            </Label>
            <input
              id="quality"
              type="range"
              min={0.4}
              max={1}
              step={0.01}
              value={quality}
              onChange={(e) => setQuality(Number(e.target.value))}
              className="flex-1"
            />
            <span className="w-10 shrink-0 text-sm tabular-nums">{Math.round(quality * 100)}%</span>
          </div>
        )}
      </div>
    </div>
  );
}

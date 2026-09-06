"use client";

import * as React from "react";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ImageBatchWorkspace } from "@/components/tools/image-batch-workspace";
import { useBatchFiles } from "@/lib/use-batch-files";
import { loadImageFromFile, canvasToBlob, stripExtension } from "@/lib/image-processing";

export function ImageCompressor() {
  const [format, setFormat] = React.useState<"image/jpeg" | "image/webp">("image/jpeg");
  const [quality, setQuality] = React.useState(0.7);

  const convert = React.useCallback(
    async (file: File) => {
      const img = await loadImageFromFile(file);
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d")!;
      if (format === "image/jpeg") {
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }
      ctx.drawImage(img, 0, 0);
      const blob = await canvasToBlob(canvas, format, quality);
      const ext = format === "image/jpeg" ? "jpg" : "webp";
      return { blob, name: `${stripExtension(file.name)}-compressed.${ext}` };
    },
    [format, quality]
  );

  const { items, addFiles, removeItem } = useBatchFiles(convert, { live: true });

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <ImageBatchWorkspace
        items={items}
        onFilesSelect={addFiles}
        onRemove={removeItem}
        uploadLabel="Drop images to compress"
        zipName="compressed-images.zip"
      />

      <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-3">
        <div className="flex items-center gap-2">
          <Label className="text-sm text-muted-foreground">Output format</Label>
          <Select value={format} onValueChange={(v) => v && setFormat(v as "image/jpeg" | "image/webp")}>
            <SelectTrigger className="w-28">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="image/jpeg">JPEG</SelectItem>
              <SelectItem value="image/webp">WebP</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex flex-1 items-center gap-3">
          <Label htmlFor="compress-quality" className="shrink-0 text-sm text-muted-foreground">
            Quality
          </Label>
          <input
            id="compress-quality"
            type="range"
            min={0.1}
            max={1}
            step={0.01}
            value={quality}
            onChange={(e) => setQuality(Number(e.target.value))}
            className="flex-1"
          />
          <span className="w-10 shrink-0 text-sm tabular-nums">{Math.round(quality * 100)}%</span>
        </div>
      </div>
    </div>
  );
}

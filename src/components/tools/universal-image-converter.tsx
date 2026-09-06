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

const FORMATS = [
  { value: "image/png", label: "PNG", ext: "png" },
  { value: "image/jpeg", label: "JPEG", ext: "jpg" },
  { value: "image/webp", label: "WebP", ext: "webp" },
];

export function UniversalImageConverter() {
  const [format, setFormat] = React.useState("image/jpeg");
  const [quality, setQuality] = React.useState(0.92);
  const [bgColor, setBgColor] = React.useState("#ffffff");

  const targetExt = FORMATS.find((f) => f.value === format)?.ext ?? "png";

  const convert = React.useCallback(
    async (file: File) => {
      const img = await loadImageFromFile(file);
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d")!;
      if (format === "image/jpeg") {
        ctx.fillStyle = bgColor;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }
      ctx.drawImage(img, 0, 0);
      const blob = await canvasToBlob(canvas, format, format === "image/png" ? undefined : quality);
      return { blob, name: `${stripExtension(file.name)}.${targetExt}` };
    },
    [format, quality, bgColor, targetExt]
  );

  const { items, addFiles, removeItem } = useBatchFiles(convert, { live: true });

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <ImageBatchWorkspace
        items={items}
        onFilesSelect={addFiles}
        onRemove={removeItem}
        uploadLabel="Drop any images to convert"
        zipName="converted-images.zip"
      />

      <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-3">
        <div className="flex items-center gap-2">
          <Label className="text-sm text-muted-foreground">Convert to</Label>
          <Select value={format} onValueChange={(v) => v && setFormat(v)}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {FORMATS.map((f) => (
                <SelectItem key={f.value} value={f.value}>
                  {f.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        {format === "image/jpeg" && (
          <div className="flex items-center gap-2">
            <Label htmlFor="ic-bg" className="text-sm text-muted-foreground">
              Background
            </Label>
            <input
              id="ic-bg"
              type="color"
              value={bgColor}
              onChange={(e) => setBgColor(e.target.value)}
              className="size-8 cursor-pointer rounded border"
            />
          </div>
        )}
        {format !== "image/png" && (
          <div className="flex flex-1 items-center gap-3">
            <Label htmlFor="ic-quality" className="shrink-0 text-sm text-muted-foreground">
              Quality
            </Label>
            <input
              id="ic-quality"
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

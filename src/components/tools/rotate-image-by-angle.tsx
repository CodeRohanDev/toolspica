"use client";

import * as React from "react";
import { Label } from "@/components/ui/label";
import { ImageBatchWorkspace } from "@/components/tools/image-batch-workspace";
import { useBatchFiles } from "@/lib/use-batch-files";
import { loadImageFromFile, canvasToBlob, stripExtension } from "@/lib/image-processing";

export function RotateImageByAngle() {
  const [angle, setAngle] = React.useState(0);

  const convert = React.useCallback(
    async (file: File) => {
      const img = await loadImageFromFile(file);
      const radians = (angle * Math.PI) / 180;
      const sin = Math.abs(Math.sin(radians));
      const cos = Math.abs(Math.cos(radians));
      const canvas = document.createElement("canvas");
      canvas.width = Math.ceil(img.width * cos + img.height * sin);
      canvas.height = Math.ceil(img.width * sin + img.height * cos);
      const ctx = canvas.getContext("2d")!;
      ctx.translate(canvas.width / 2, canvas.height / 2);
      ctx.rotate(radians);
      ctx.drawImage(img, -img.width / 2, -img.height / 2);
      const blob = await canvasToBlob(canvas, "image/png");
      return { blob, name: `${stripExtension(file.name)}-rotated.png` };
    },
    [angle]
  );

  const { items, addFiles, removeItem } = useBatchFiles(convert, { live: true });

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <ImageBatchWorkspace
        items={items}
        onFilesSelect={addFiles}
        onRemove={removeItem}
        uploadLabel="Drop images to rotate"
        zipName="rotated-images.zip"
      />

      <div className="mt-4 flex items-center gap-3">
        <Label htmlFor="angle" className="shrink-0 text-sm text-muted-foreground">
          Angle
        </Label>
        <input
          id="angle"
          type="range"
          min={-180}
          max={180}
          value={angle}
          onChange={(e) => setAngle(Number(e.target.value))}
          className="flex-1"
        />
        <span className="w-14 shrink-0 text-sm tabular-nums">{angle}°</span>
      </div>
    </div>
  );
}

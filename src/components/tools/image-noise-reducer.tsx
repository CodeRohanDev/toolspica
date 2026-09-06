"use client";

import * as React from "react";
import { Label } from "@/components/ui/label";
import { ImageBatchWorkspace } from "@/components/tools/image-batch-workspace";
import { useBatchFiles } from "@/lib/use-batch-files";
import { loadImageFromFile, canvasToBlob, stripExtension } from "@/lib/image-processing";

// Median filter: replaces each pixel with the median of its neighborhood.
// Unlike a blur, this removes salt-and-pepper style noise spikes while
// preserving edges far better than an averaging filter would.
function medianFilter(imageData: ImageData, radius: number): ImageData {
  const { width, height, data } = imageData;
  const output = new Uint8ClampedArray(data.length);
  const windowSize = (radius * 2 + 1) ** 2;
  const mid = Math.floor(windowSize / 2);

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const idx = (y * width + x) * 4;
      for (let c = 0; c < 3; c++) {
        const vals: number[] = [];
        for (let ky = -radius; ky <= radius; ky++) {
          for (let kx = -radius; kx <= radius; kx++) {
            const sx = Math.min(width - 1, Math.max(0, x + kx));
            const sy = Math.min(height - 1, Math.max(0, y + ky));
            vals.push(data[(sy * width + sx) * 4 + c]);
          }
        }
        vals.sort((a, b) => a - b);
        output[idx + c] = vals[mid];
      }
      output[idx + 3] = data[idx + 3];
    }
  }
  return new ImageData(output, width, height);
}

export function ImageNoiseReducer() {
  const [radius, setRadius] = React.useState(1);

  const convert = React.useCallback(
    async (file: File) => {
      const img = await loadImageFromFile(file);
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d")!;
      ctx.drawImage(img, 0, 0);
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const filtered = medianFilter(imageData, radius);
      ctx.putImageData(filtered, 0, 0);
      const blob = await canvasToBlob(canvas, "image/png");
      return { blob, name: `${stripExtension(file.name)}-denoised.png` };
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
        uploadLabel="Drop images to reduce noise in"
        zipName="denoised-images.zip"
      />

      <div className="mt-4 flex items-center gap-3">
        <Label htmlFor="noise-radius" className="shrink-0 text-sm text-muted-foreground">
          Filter strength
        </Label>
        <input
          id="noise-radius"
          type="range"
          min={1}
          max={3}
          step={1}
          value={radius}
          onChange={(e) => setRadius(Number(e.target.value))}
          className="flex-1"
        />
        <span className="w-24 shrink-0 text-sm tabular-nums">{radius * 2 + 1}×{radius * 2 + 1}</span>
      </div>
      <p className="mt-2 text-xs text-muted-foreground">
        Uses a median filter, which removes speckle noise while preserving edges better than a
        simple blur — not an AI-based denoiser.
      </p>
    </div>
  );
}

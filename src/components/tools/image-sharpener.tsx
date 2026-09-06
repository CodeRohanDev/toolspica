"use client";

import * as React from "react";
import { Label } from "@/components/ui/label";
import { ImageBatchWorkspace } from "@/components/tools/image-batch-workspace";
import { useBatchFiles } from "@/lib/use-batch-files";
import { loadImageFromFile, canvasToBlob, stripExtension } from "@/lib/image-processing";

// Standard 3x3 sharpen (unsharp-style) kernel; sums to 1 so flat regions are
// unaffected. Strength blends between the original and fully sharpened pixel.
function applySharpen(imageData: ImageData, strength: number): ImageData {
  const { width, height, data } = imageData;
  const kernel = [0, -1, 0, -1, 5, -1, 0, -1, 0];
  const output = new Uint8ClampedArray(data.length);

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const idx = (y * width + x) * 4;
      for (let c = 0; c < 3; c++) {
        let sum = 0;
        let k = 0;
        for (let ky = -1; ky <= 1; ky++) {
          for (let kx = -1; kx <= 1; kx++) {
            const sx = Math.min(width - 1, Math.max(0, x + kx));
            const sy = Math.min(height - 1, Math.max(0, y + ky));
            sum += data[(sy * width + sx) * 4 + c] * kernel[k++];
          }
        }
        const original = data[idx + c];
        output[idx + c] = original + (sum - original) * strength;
      }
      output[idx + 3] = data[idx + 3];
    }
  }
  return new ImageData(output, width, height);
}

export function ImageSharpener() {
  const [strength, setStrength] = React.useState(0.5);

  const convert = React.useCallback(
    async (file: File) => {
      const img = await loadImageFromFile(file);
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d")!;
      ctx.drawImage(img, 0, 0);
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const sharpened = applySharpen(imageData, strength);
      ctx.putImageData(sharpened, 0, 0);
      const blob = await canvasToBlob(canvas, "image/png");
      return { blob, name: `${stripExtension(file.name)}-sharpened.png` };
    },
    [strength]
  );

  const { items, addFiles, removeItem } = useBatchFiles(convert, { live: true });

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <ImageBatchWorkspace
        items={items}
        onFilesSelect={addFiles}
        onRemove={removeItem}
        uploadLabel="Drop images to sharpen"
        zipName="sharpened-images.zip"
      />

      <div className="mt-4 flex items-center gap-3">
        <Label htmlFor="sharpen-strength" className="shrink-0 text-sm text-muted-foreground">
          Sharpen strength
        </Label>
        <input
          id="sharpen-strength"
          type="range"
          min={0}
          max={2}
          step={0.05}
          value={strength}
          onChange={(e) => setStrength(Number(e.target.value))}
          className="flex-1"
        />
        <span className="w-12 shrink-0 text-sm tabular-nums">{strength.toFixed(2)}x</span>
      </div>
    </div>
  );
}

"use client";

import * as React from "react";
import { Label } from "@/components/ui/label";
import { ImageBatchWorkspace } from "@/components/tools/image-batch-workspace";
import { useBatchFiles } from "@/lib/use-batch-files";
import { loadImageFromFile, stripExtension } from "@/lib/image-processing";

interface ImageTracerApi {
  imagedataToSVG(
    imageData: { width: number; height: number; data: Uint8ClampedArray },
    options: Record<string, unknown>
  ): string;
}

export function PngToSvg() {
  const [colors, setColors] = React.useState(16);

  const convert = React.useCallback(
    async (file: File) => {
      const img = await loadImageFromFile(file);
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d")!;
      ctx.drawImage(img, 0, 0);
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

      const mod = await import("imagetracerjs");
      const ImageTracer = (mod as unknown as { default: ImageTracerApi }).default;
      const svgString = ImageTracer.imagedataToSVG(
        { width: imageData.width, height: imageData.height, data: imageData.data },
        { numberofcolors: colors }
      );
      const blob = new Blob([svgString], { type: "image/svg+xml" });
      return { blob, name: `${stripExtension(file.name)}.svg` };
    },
    [colors]
  );

  const { items, addFiles, removeItem } = useBatchFiles(convert, { live: true });

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <ImageBatchWorkspace
        items={items}
        onFilesSelect={addFiles}
        onRemove={removeItem}
        accept="image/png,image/jpeg"
        uploadLabel="Drop images to trace into SVG"
        zipName="traced-svgs.zip"
      />

      <div className="mt-4 flex items-center gap-3">
        <Label htmlFor="svg-colors" className="shrink-0 text-sm text-muted-foreground">
          Colors ({colors})
        </Label>
        <input
          id="svg-colors"
          type="range"
          min={2}
          max={64}
          value={colors}
          onChange={(e) => setColors(Number(e.target.value))}
          className="flex-1"
        />
      </div>

      <p className="mt-3 text-xs text-muted-foreground">
        Traces raster images into vector paths using color-region detection — this works well for
        logos, icons, and simple flat-color graphics, but photos and gradients produce large,
        complex SVGs since they aren&apos;t truly vector content to begin with. Fewer colors give a
        simpler, smaller SVG; more colors capture finer detail at the cost of file size.
      </p>
    </div>
  );
}

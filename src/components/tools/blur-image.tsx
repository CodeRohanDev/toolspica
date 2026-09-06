"use client";

import * as React from "react";
import { Label } from "@/components/ui/label";
import { ImageBatchWorkspace } from "@/components/tools/image-batch-workspace";
import { useBatchFiles } from "@/lib/use-batch-files";
import { loadImageFromFile, canvasToBlob, stripExtension } from "@/lib/image-processing";

export function BlurImage() {
  const [amount, setAmount] = React.useState(8);

  const convert = React.useCallback(
    async (file: File) => {
      const img = await loadImageFromFile(file);
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d")!;
      ctx.filter = `blur(${amount}px)`;
      ctx.drawImage(img, 0, 0);
      const blob = await canvasToBlob(canvas, "image/png");
      return { blob, name: `${stripExtension(file.name)}-blurred.png` };
    },
    [amount]
  );

  const { items, addFiles, removeItem } = useBatchFiles(convert, { live: true });

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <ImageBatchWorkspace
        items={items}
        onFilesSelect={addFiles}
        onRemove={removeItem}
        uploadLabel="Drop images to blur"
        zipName="blurred-images.zip"
      />

      <div className="mt-4 flex items-center gap-3">
        <Label htmlFor="blur-amount" className="shrink-0 text-sm text-muted-foreground">
          Blur strength
        </Label>
        <input
          id="blur-amount"
          type="range"
          min={0}
          max={30}
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
          className="flex-1"
        />
        <span className="w-12 shrink-0 text-sm tabular-nums">{amount}px</span>
      </div>
    </div>
  );
}

"use client";

import * as React from "react";
import { RotateCcw, RotateCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ImageBatchWorkspace } from "@/components/tools/image-batch-workspace";
import { useBatchFiles } from "@/lib/use-batch-files";
import { loadImageFromFile, canvasToBlob, stripExtension } from "@/lib/image-processing";

export function RotateImage() {
  const [rotation, setRotation] = React.useState(0);

  const convert = React.useCallback(
    async (file: File) => {
      const img = await loadImageFromFile(file);
      const swap = rotation % 180 !== 0;
      const canvas = document.createElement("canvas");
      canvas.width = swap ? img.height : img.width;
      canvas.height = swap ? img.width : img.height;
      const ctx = canvas.getContext("2d")!;
      ctx.translate(canvas.width / 2, canvas.height / 2);
      ctx.rotate((rotation * Math.PI) / 180);
      ctx.drawImage(img, -img.width / 2, -img.height / 2);
      const blob = await canvasToBlob(canvas, file.type || "image/png", 0.92);
      return { blob, name: `${stripExtension(file.name)}-rotated.png` };
    },
    [rotation]
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

      <div className="mt-4 flex justify-center gap-2">
        <Button type="button" variant="outline" size="sm" onClick={() => setRotation((r) => (r - 90 + 360) % 360)}>
          <RotateCcw className="size-4" /> Rotate left 90°
        </Button>
        <Button type="button" variant="outline" size="sm" onClick={() => setRotation((r) => (r + 90) % 360)}>
          <RotateCw className="size-4" /> Rotate right 90°
        </Button>
        <Button type="button" variant="outline" size="sm" onClick={() => setRotation((r) => (r + 180) % 360)}>
          Rotate 180°
        </Button>
      </div>
      <p className="mt-2 text-center text-xs text-muted-foreground">Current rotation: {rotation}° — applies to every file you add</p>
    </div>
  );
}

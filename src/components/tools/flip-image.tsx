"use client";

import * as React from "react";
import { FlipHorizontal, FlipVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ImageBatchWorkspace } from "@/components/tools/image-batch-workspace";
import { useBatchFiles } from "@/lib/use-batch-files";
import { loadImageFromFile, canvasToBlob, stripExtension } from "@/lib/image-processing";

export function FlipImage() {
  const [flipH, setFlipH] = React.useState(false);
  const [flipV, setFlipV] = React.useState(false);

  const convert = React.useCallback(
    async (file: File) => {
      const img = await loadImageFromFile(file);
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d")!;
      ctx.translate(flipH ? canvas.width : 0, flipV ? canvas.height : 0);
      ctx.scale(flipH ? -1 : 1, flipV ? -1 : 1);
      ctx.drawImage(img, 0, 0);
      const blob = await canvasToBlob(canvas, file.type || "image/png", 0.92);
      return { blob, name: `${stripExtension(file.name)}-flipped.png` };
    },
    [flipH, flipV]
  );

  const { items, addFiles, removeItem } = useBatchFiles(convert, { live: true });

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <ImageBatchWorkspace
        items={items}
        onFilesSelect={addFiles}
        onRemove={removeItem}
        uploadLabel="Drop images to flip"
        zipName="flipped-images.zip"
      />

      <div className="mt-4 flex justify-center gap-2">
        <Button type="button" variant={flipH ? "default" : "outline"} size="sm" onClick={() => setFlipH((v) => !v)}>
          <FlipHorizontal className="size-4" /> Flip horizontal
        </Button>
        <Button type="button" variant={flipV ? "default" : "outline"} size="sm" onClick={() => setFlipV((v) => !v)}>
          <FlipVertical className="size-4" /> Flip vertical
        </Button>
      </div>
    </div>
  );
}

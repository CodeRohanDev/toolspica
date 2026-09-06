"use client";

import * as React from "react";
import { ImageBatchWorkspace } from "@/components/tools/image-batch-workspace";
import { useBatchFiles } from "@/lib/use-batch-files";
import { canvasToBlob, stripExtension } from "@/lib/image-processing";
import { decodeTiff } from "@/lib/tiff-decoder";

export function TiffToJpg() {
  const convert = React.useCallback(async (file: File) => {
    const buffer = await file.arrayBuffer();
    const { width, height, pixels } = decodeTiff(buffer);
    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext("2d")!;
    ctx.putImageData(new ImageData(new Uint8ClampedArray(pixels), width, height), 0, 0);
    const blob = await canvasToBlob(canvas, "image/jpeg", 0.95);
    return { blob, name: `${stripExtension(file.name)}.jpg` };
  }, []);

  const { items, addFiles, removeItem } = useBatchFiles(convert, { live: true });

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <ImageBatchWorkspace
        items={items}
        onFilesSelect={addFiles}
        onRemove={removeItem}
        accept=".tif,.tiff,image/tiff"
        uploadLabel="Drop TIFF files to convert to JPG"
        zipName="converted-jpgs.zip"
      />

      <p className="mt-3 text-xs text-muted-foreground">
        Supports uncompressed and PackBits-compressed TIFF files — the common cases from most
        scanners and image editors. LZW-compressed TIFFs aren&apos;t currently supported and will
        show a clear error rather than a broken image.
      </p>
    </div>
  );
}

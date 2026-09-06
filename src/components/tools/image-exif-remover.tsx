"use client";

import * as React from "react";
import { ShieldCheck } from "lucide-react";
import { ImageBatchWorkspace } from "@/components/tools/image-batch-workspace";
import { useBatchFiles } from "@/lib/use-batch-files";
import { loadImageFromFile, canvasToBlob, stripExtension } from "@/lib/image-processing";

export function ImageExifRemover() {
  const convert = React.useCallback(async (file: File) => {
    const img = await loadImageFromFile(file);
    const canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;
    const ctx = canvas.getContext("2d")!;
    ctx.drawImage(img, 0, 0);
    const isJpeg = /jpe?g/i.test(file.type);
    const blob = await canvasToBlob(canvas, isJpeg ? "image/jpeg" : "image/png", isJpeg ? 0.95 : undefined);
    const ext = isJpeg ? "jpg" : "png";
    return { blob, name: `${stripExtension(file.name)}-no-exif.${ext}` };
  }, []);

  const { items, addFiles, removeItem } = useBatchFiles(convert, { live: true });

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <ImageBatchWorkspace
        items={items}
        onFilesSelect={addFiles}
        onRemove={removeItem}
        uploadLabel="Drop images to strip EXIF metadata from"
        zipName="no-exif-images.zip"
      />

      {items.some((i) => i.status === "done") && (
        <div className="mt-4 flex items-center gap-2 rounded-lg bg-brand-soft p-3 text-sm">
          <ShieldCheck className="size-4 shrink-0" />
          <span>All EXIF metadata (camera model, GPS location, timestamp, and more) has been stripped.</span>
        </div>
      )}

      <p className="mt-3 text-xs text-muted-foreground">
        Re-rendering the image through a canvas — the technique used here — inherently discards
        all embedded metadata, since canvas only ever stores raw pixel data.
      </p>
    </div>
  );
}

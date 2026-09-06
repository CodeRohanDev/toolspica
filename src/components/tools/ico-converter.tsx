"use client";

import * as React from "react";
import { ImageBatchWorkspace } from "@/components/tools/image-batch-workspace";
import { useBatchFiles } from "@/lib/use-batch-files";
import { loadImageFromFile, canvasToBlob, stripExtension } from "@/lib/image-processing";
import { buildIco } from "@/lib/ico-writer";

const SIZES = [16, 32, 48, 64, 128, 256];

export function IcoConverter() {
  const convert = React.useCallback(async (file: File) => {
    const img = await loadImageFromFile(file);
    const entries = await Promise.all(
      SIZES.map(async (size) => {
        const canvas = document.createElement("canvas");
        canvas.width = size;
        canvas.height = size;
        const ctx = canvas.getContext("2d")!;
        ctx.drawImage(img, 0, 0, size, size);
        const blob = await canvasToBlob(canvas, "image/png");
        return { size, pngData: new Uint8Array(await blob.arrayBuffer()) };
      })
    );
    const icoBytes = buildIco(entries);
    const blob = new Blob([icoBytes as BlobPart], { type: "image/x-icon" });
    return { blob, name: `${stripExtension(file.name)}.ico` };
  }, []);

  const { items, addFiles, removeItem } = useBatchFiles(convert, { live: true });

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <ImageBatchWorkspace
        items={items}
        onFilesSelect={addFiles}
        onRemove={removeItem}
        uploadLabel="Drop images to convert to .ico"
        zipName="converted-icos.zip"
      />

      <p className="mt-3 text-xs text-muted-foreground">
        Bundles {SIZES.join(", ")}px versions into a single multi-size .ico file — the standard
        format for website favicons and Windows application icons.
      </p>
    </div>
  );
}

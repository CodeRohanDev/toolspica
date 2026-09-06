"use client";

import * as React from "react";
import { ImageBatchWorkspace } from "@/components/tools/image-batch-workspace";
import { useBatchFiles } from "@/lib/use-batch-files";
import { stripExtension } from "@/lib/image-processing";

export function RemoveBackground() {
  const convert = React.useCallback(async (file: File) => {
    const { removeBackground } = await import("@imgly/background-removal");
    const blob = await removeBackground(file, {
      publicPath: new URL("/bg-removal-data/", window.location.origin).toString(),
      model: "isnet_quint8",
      output: { format: "image/png" },
    });
    return { blob, name: `${stripExtension(file.name)}-no-bg.png` };
  }, []);

  const { items, addFiles, removeItem } = useBatchFiles(convert, { live: true });

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <ImageBatchWorkspace
        items={items}
        onFilesSelect={addFiles}
        onRemove={removeItem}
        uploadLabel="Drop images to remove the background from"
        zipName="no-background-images.zip"
      />

      <p className="mt-3 text-xs text-muted-foreground">
        Uses an in-browser AI segmentation model (no upload, runs locally via WebAssembly) to detect
        the main subject in any photo — people, animals, products, vehicles, and everyday objects —
        and cuts it out with a transparent background. Works best with a clearly separated subject
        against a simpler background; fine detail like loose hair strands may not be perfectly
        captured. The first file downloads the model (roughly 45MB, cached afterward), so it takes
        longer than every file after it.
      </p>
    </div>
  );
}

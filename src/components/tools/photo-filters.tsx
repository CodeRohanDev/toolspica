"use client";

import * as React from "react";
import { ImageBatchWorkspace } from "@/components/tools/image-batch-workspace";
import { useBatchFiles } from "@/lib/use-batch-files";
import { loadImageFromFile, canvasToBlob, stripExtension } from "@/lib/image-processing";

const FILTERS = [
  { id: "none", label: "Original", css: "none" },
  { id: "sepia", label: "Sepia", css: "sepia(0.8)" },
  { id: "vintage", label: "Vintage", css: "sepia(0.4) contrast(1.1) brightness(1.05) saturate(0.85)" },
  { id: "cool", label: "Cool", css: "hue-rotate(20deg) saturate(1.2) brightness(1.02)" },
  { id: "warm", label: "Warm", css: "hue-rotate(-15deg) saturate(1.15) brightness(1.05)" },
  { id: "vivid", label: "Vivid", css: "saturate(1.6) contrast(1.15)" },
  { id: "fade", label: "Fade", css: "contrast(0.85) brightness(1.1) saturate(0.7)" },
  { id: "noir", label: "Noir", css: "grayscale(1) contrast(1.3) brightness(0.95)" },
  { id: "invert", label: "Invert", css: "invert(1)" },
];

export function PhotoFilters() {
  const [activeFilter, setActiveFilter] = React.useState("sepia");

  const convert = React.useCallback(
    async (file: File) => {
      const img = await loadImageFromFile(file);
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d")!;
      ctx.filter = FILTERS.find((f) => f.id === activeFilter)?.css ?? "none";
      ctx.drawImage(img, 0, 0);
      const blob = await canvasToBlob(canvas, "image/png");
      return { blob, name: `${stripExtension(file.name)}-${activeFilter}.png` };
    },
    [activeFilter]
  );

  const { items, addFiles, removeItem } = useBatchFiles(convert, { live: true });

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <ImageBatchWorkspace
        items={items}
        onFilesSelect={addFiles}
        onRemove={removeItem}
        uploadLabel="Drop images to apply a filter to"
        zipName="filtered-images.zip"
      />

      <div className="mt-4 flex flex-wrap gap-2">
        {FILTERS.map((f) => (
          <button
            key={f.id}
            type="button"
            onClick={() => setActiveFilter(f.id)}
            className={`rounded-lg border px-3 py-1.5 text-sm transition-colors ${
              activeFilter === f.id ? "border-brand bg-brand-soft font-medium" : "hover:border-brand/50"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>
    </div>
  );
}

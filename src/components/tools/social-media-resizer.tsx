"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { ImageBatchWorkspace } from "@/components/tools/image-batch-workspace";
import { useBatchFiles } from "@/lib/use-batch-files";
import { loadImageFromFile, canvasToBlob, stripExtension } from "@/lib/image-processing";

const PRESETS = [
  { label: "Instagram Post", width: 1080, height: 1080 },
  { label: "Instagram Story", width: 1080, height: 1920 },
  { label: "Facebook Post", width: 1200, height: 630 },
  { label: "X (Twitter) Post", width: 1600, height: 900 },
  { label: "LinkedIn Post", width: 1200, height: 627 },
  { label: "YouTube Thumbnail", width: 1280, height: 720 },
];

export function SocialMediaResizer() {
  const [preset, setPreset] = React.useState(PRESETS[0]);

  const convert = React.useCallback(
    async (file: File) => {
      const img = await loadImageFromFile(file);
      const canvas = document.createElement("canvas");
      canvas.width = preset.width;
      canvas.height = preset.height;
      const ctx = canvas.getContext("2d")!;

      const scale = Math.max(preset.width / img.width, preset.height / img.height);
      const drawWidth = img.width * scale;
      const drawHeight = img.height * scale;
      const offsetX = (preset.width - drawWidth) / 2;
      const offsetY = (preset.height - drawHeight) / 2;
      ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);

      const blob = await canvasToBlob(canvas, "image/jpeg", 0.92);
      return { blob, name: `${stripExtension(file.name)}-${preset.width}x${preset.height}.jpg` };
    },
    [preset]
  );

  const { items, addFiles, removeItem } = useBatchFiles(convert, { live: true });

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <div className="flex flex-wrap gap-2">
        {PRESETS.map((p) => (
          <Button
            key={p.label}
            type="button"
            size="sm"
            variant={preset.label === p.label ? "default" : "outline"}
            onClick={() => setPreset(p)}
          >
            {p.label}
            <span className="ml-1 text-xs opacity-70">
              {p.width}×{p.height}
            </span>
          </Button>
        ))}
      </div>

      <div className="mt-4">
        <ImageBatchWorkspace
          items={items}
          onFilesSelect={addFiles}
          onRemove={removeItem}
          uploadLabel="Drop images to resize"
          zipName="resized-images.zip"
        />
      </div>
    </div>
  );
}

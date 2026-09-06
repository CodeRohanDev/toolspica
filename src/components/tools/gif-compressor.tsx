"use client";

import * as React from "react";
import { Label } from "@/components/ui/label";
import { ImageBatchWorkspace } from "@/components/tools/image-batch-workspace";
import { useBatchFiles } from "@/lib/use-batch-files";
import { useFfmpegJob } from "@/lib/use-ffmpeg-job";
import { pickUniqueName } from "@/lib/ffmpeg-setup";
import { stripMediaExtension } from "@/lib/media-helpers";

export function GifCompressor() {
  const [scale, setScale] = React.useState(75);
  const [fps, setFps] = React.useState(12);
  const { run } = useFfmpegJob();

  const convert = React.useCallback(
    async (file: File) => {
      const inputName = pickUniqueName("gif");
      const outputName = pickUniqueName("gif");
      const buffer = new Uint8Array(await file.arrayBuffer());
      const data = await run(
        [{ name: inputName, data: buffer }],
        [
          "-i", inputName,
          "-vf", `fps=${fps},scale=iw*${scale / 100}:-1:flags=lanczos,split[s0][s1];[s0]palettegen=max_colors=128[p];[s1][p]paletteuse`,
          "-loop", "0",
          outputName,
        ],
        outputName
      );
      const blob = new Blob([data as BlobPart], { type: "image/gif" });
      return { blob, name: `${stripMediaExtension(file.name)}-compressed.gif` };
    },
    [scale, fps, run]
  );

  const { items, addFiles, removeItem } = useBatchFiles(convert, { live: true });

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <ImageBatchWorkspace
        items={items}
        onFilesSelect={addFiles}
        onRemove={removeItem}
        accept="image/gif"
        uploadLabel="Drop GIFs to compress"
        zipName="compressed-gifs.zip"
      />

      <div className="mt-4 flex items-center gap-3">
        <Label className="w-32 shrink-0 text-sm text-muted-foreground">Scale: {scale}%</Label>
        <input type="range" min={25} max={100} value={scale} onChange={(e) => setScale(Number(e.target.value))} className="flex-1" />
      </div>
      <div className="mt-3 flex items-center gap-3">
        <Label className="w-32 shrink-0 text-sm text-muted-foreground">Frame rate: {fps} fps</Label>
        <input type="range" min={5} max={30} value={fps} onChange={(e) => setFps(Number(e.target.value))} className="flex-1" />
      </div>
      <p className="mt-2 text-xs text-muted-foreground">
        Lowering scale and frame rate has the biggest impact on file size — a reduced color
        palette also helps. Files process one at a time, in order.
      </p>
    </div>
  );
}

"use client";

import * as React from "react";
import { Label } from "@/components/ui/label";
import { BatchUploadZone } from "@/components/tools/batch-upload-zone";
import { BatchFileList } from "@/components/tools/batch-file-list";
import { useBatchFiles } from "@/lib/use-batch-files";
import { useFfmpegJob } from "@/lib/use-ffmpeg-job";
import { pickUniqueName } from "@/lib/ffmpeg-setup";
import { stripMediaExtension } from "@/lib/media-helpers";

export function VideoToGif() {
  const [fps, setFps] = React.useState(10);
  const [width, setWidth] = React.useState(400);
  const { run } = useFfmpegJob();

  const convert = React.useCallback(
    async (file: File) => {
      const inputName = pickUniqueName("mp4");
      const outputName = pickUniqueName("gif");
      const buffer = new Uint8Array(await file.arrayBuffer());
      const data = await run([{ name: inputName, data: buffer }], ["-i", inputName, "-vf", `fps=${fps},scale=${width}:-1:flags=lanczos`, outputName], outputName);
      const blob = new Blob([data as BlobPart], { type: "image/gif" });
      return { blob, name: `${stripMediaExtension(file.name)}.gif` };
    },
    [fps, width, run]
  );

  const { items, addFiles, removeItem } = useBatchFiles(convert);

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <BatchUploadZone accept="video/*" onFilesSelect={addFiles} label="Drop videos to convert to GIF" />

      <div className="mt-4 flex flex-wrap gap-6">
        <div className="flex items-center gap-3">
          <Label htmlFor="gif-fps" className="shrink-0 text-sm text-muted-foreground">FPS ({fps})</Label>
          <input id="gif-fps" type="range" min={2} max={20} value={fps} onChange={(e) => setFps(Number(e.target.value))} />
        </div>
        <div className="flex items-center gap-3">
          <Label htmlFor="gif-width" className="shrink-0 text-sm text-muted-foreground">Width ({width}px)</Label>
          <input id="gif-width" type="range" min={120} max={800} step={20} value={width} onChange={(e) => setWidth(Number(e.target.value))} />
        </div>
      </div>
      <p className="mt-2 text-xs text-muted-foreground">
        Lower FPS and smaller width keep the GIF file size manageable — GIFs are inherently large
        for anything beyond a few seconds, since every frame is a full image.
      </p>

      <BatchFileList items={items} onRemove={removeItem} zipName="converted-gifs.zip" />
    </div>
  );
}

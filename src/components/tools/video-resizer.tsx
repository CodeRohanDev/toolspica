"use client";

import * as React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { BatchUploadZone } from "@/components/tools/batch-upload-zone";
import { BatchFileList } from "@/components/tools/batch-file-list";
import { useBatchFiles } from "@/lib/use-batch-files";
import { useFfmpegJob } from "@/lib/use-ffmpeg-job";
import { pickUniqueName } from "@/lib/ffmpeg-setup";
import { stripMediaExtension } from "@/lib/media-helpers";

export function VideoResizer() {
  const [width, setWidth] = React.useState("1280");
  const { run } = useFfmpegJob();

  const convert = React.useCallback(
    async (file: File) => {
      const w = Math.max(2, Math.round(Number(width) / 2) * 2);
      const inputName = pickUniqueName("mp4");
      const outputName = pickUniqueName("mp4");
      const buffer = new Uint8Array(await file.arrayBuffer());
      const data = await run([{ name: inputName, data: buffer }], ["-i", inputName, "-vf", `scale=${w}:-2`, "-c:v", "libx264", "-pix_fmt", "yuv420p", "-c:a", "copy", outputName], outputName);
      const blob = new Blob([data as BlobPart], { type: "video/mp4" });
      return { blob, name: `${stripMediaExtension(file.name)}-resized.mp4` };
    },
    [width, run]
  );

  const { items, addFiles, removeItem } = useBatchFiles(convert);

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <BatchUploadZone accept="video/*" onFilesSelect={addFiles} label="Drop videos to resize" />

      <div className="mt-4 flex items-center gap-3">
        <Label htmlFor="resize-width" className="shrink-0 text-sm text-muted-foreground">Target width (px)</Label>
        <Input id="resize-width" value={width} onChange={(e) => setWidth(e.target.value.replace(/\D/g, ""))} className="w-28 font-mono" />
      </div>
      <p className="mt-2 text-xs text-muted-foreground">
        Height scales automatically to preserve each video&apos;s original aspect ratio — no
        stretching or distortion.
      </p>

      <BatchFileList items={items} onRemove={removeItem} zipName="resized-videos.zip" />
    </div>
  );
}

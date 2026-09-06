"use client";

import * as React from "react";
import { BatchUploadZone } from "@/components/tools/batch-upload-zone";
import { BatchFileList } from "@/components/tools/batch-file-list";
import { useBatchFiles } from "@/lib/use-batch-files";
import { useFfmpegJob } from "@/lib/use-ffmpeg-job";
import { pickUniqueName } from "@/lib/ffmpeg-setup";
import { stripMediaExtension } from "@/lib/media-helpers";

export function ReverseVideo() {
  const { run } = useFfmpegJob();

  const convert = React.useCallback(
    async (file: File) => {
      const inputName = pickUniqueName("mp4");
      const outputName = pickUniqueName("mp4");
      const buffer = new Uint8Array(await file.arrayBuffer());
      const data = await run([{ name: inputName, data: buffer }], ["-i", inputName, "-vf", "reverse", "-af", "areverse", "-c:v", "libx264", "-pix_fmt", "yuv420p", "-c:a", "aac", outputName], outputName);
      const blob = new Blob([data as BlobPart], { type: "video/mp4" });
      return { blob, name: `${stripMediaExtension(file.name)}-reversed.mp4` };
    },
    [run]
  );

  const { items, addFiles, removeItem } = useBatchFiles(convert);

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <BatchUploadZone accept="video/*" onFilesSelect={addFiles} label="Drop videos to reverse" />

      <BatchFileList items={items} onRemove={removeItem} zipName="reversed-videos.zip" />

      <p className="mt-3 text-xs text-muted-foreground">
        Plays each video and its audio backward. Reversing has to hold every frame in memory at
        once, so it works best on shorter clips — very long or high-resolution videos may run
        slowly or use significant browser memory.
      </p>
    </div>
  );
}

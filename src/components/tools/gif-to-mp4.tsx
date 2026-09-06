"use client";

import * as React from "react";
import { BatchUploadZone } from "@/components/tools/batch-upload-zone";
import { BatchFileList } from "@/components/tools/batch-file-list";
import { useBatchFiles } from "@/lib/use-batch-files";
import { useFfmpegJob } from "@/lib/use-ffmpeg-job";
import { pickUniqueName } from "@/lib/ffmpeg-setup";
import { stripMediaExtension } from "@/lib/media-helpers";

export function GifToMp4() {
  const { run } = useFfmpegJob();

  const convert = React.useCallback(
    async (file: File) => {
      const inputName = pickUniqueName("gif");
      const outputName = pickUniqueName("mp4");
      const buffer = new Uint8Array(await file.arrayBuffer());
      const data = await run([{ name: inputName, data: buffer }], ["-i", inputName, "-movflags", "+faststart", "-vf", "scale=trunc(iw/2)*2:trunc(ih/2)*2", "-pix_fmt", "yuv420p", outputName], outputName);
      const blob = new Blob([data as BlobPart], { type: "video/mp4" });
      return { blob, name: `${stripMediaExtension(file.name)}.mp4` };
    },
    [run]
  );

  const { items, addFiles, removeItem } = useBatchFiles(convert);

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <BatchUploadZone accept="image/gif" onFilesSelect={addFiles} label="Drop GIFs to convert to MP4" />

      <BatchFileList items={items} onRemove={removeItem} zipName="converted-mp4s.zip" />

      <p className="mt-3 text-xs text-muted-foreground">
        Converting a GIF to MP4 usually shrinks file size dramatically — video compression is far
        more efficient than GIF&apos;s per-frame image approach, especially for longer animations.
      </p>
    </div>
  );
}

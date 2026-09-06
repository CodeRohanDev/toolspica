"use client";

import * as React from "react";
import { BatchUploadZone } from "@/components/tools/batch-upload-zone";
import { BatchFileList } from "@/components/tools/batch-file-list";
import { useBatchFiles } from "@/lib/use-batch-files";
import { useFfmpegJob } from "@/lib/use-ffmpeg-job";
import { pickUniqueName } from "@/lib/ffmpeg-setup";
import { stripMediaExtension } from "@/lib/media-helpers";

export function MkvToMp4() {
  const { run } = useFfmpegJob();

  const convert = React.useCallback(
    async (file: File) => {
      const inputName = pickUniqueName("mkv");
      const outputName = pickUniqueName("mp4");
      const buffer = new Uint8Array(await file.arrayBuffer());
      const data = await run([{ name: inputName, data: buffer }], ["-i", inputName, "-c:v", "libx264", "-pix_fmt", "yuv420p", "-c:a", "aac", outputName], outputName);
      const blob = new Blob([data as BlobPart], { type: "video/mp4" });
      return { blob, name: `${stripMediaExtension(file.name)}.mp4` };
    },
    [run]
  );

  const { items, addFiles, removeItem } = useBatchFiles(convert);

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <BatchUploadZone accept="video/x-matroska,.mkv" onFilesSelect={addFiles} label="Drop MKV files to convert to MP4" />

      <BatchFileList items={items} onRemove={removeItem} zipName="converted-mp4s.zip" />

      <p className="mt-3 text-xs text-muted-foreground">
        MKV supports far more codecs than most devices actually play — this re-encodes to standard
        H.264/AAC MP4 for universal compatibility, entirely in your browser. Files process one at a
        time, in order.
      </p>
    </div>
  );
}

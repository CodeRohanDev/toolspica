"use client";

import * as React from "react";
import { BatchUploadZone } from "@/components/tools/batch-upload-zone";
import { BatchFileList } from "@/components/tools/batch-file-list";
import { useBatchFiles } from "@/lib/use-batch-files";
import { useFfmpegJob } from "@/lib/use-ffmpeg-job";
import { pickUniqueName } from "@/lib/ffmpeg-setup";
import { stripMediaExtension } from "@/lib/media-helpers";

export function Mp4ToWebm() {
  const { run } = useFfmpegJob();

  const convert = React.useCallback(
    async (file: File) => {
      const inputName = pickUniqueName("mp4");
      const outputName = pickUniqueName("webm");
      const buffer = new Uint8Array(await file.arrayBuffer());
      const data = await run([{ name: inputName, data: buffer }], ["-i", inputName, "-c:v", "libvpx", "-b:v", "1M", "-c:a", "libvorbis", outputName], outputName);
      const blob = new Blob([data as BlobPart], { type: "video/webm" });
      return { blob, name: `${stripMediaExtension(file.name)}.webm` };
    },
    [run]
  );

  const { items, addFiles, removeItem } = useBatchFiles(convert);

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <BatchUploadZone accept="video/mp4" onFilesSelect={addFiles} label="Drop MP4 files to convert to WebM" />

      <BatchFileList items={items} onRemove={removeItem} zipName="converted-webms.zip" />

      <p className="mt-3 text-xs text-muted-foreground">
        Runs a real FFmpeg build compiled to WebAssembly, entirely in your browser — no upload. Uses
        the VP8 video codec and Vorbis audio codec, WebM&apos;s standard combination. Files process
        one at a time, in order.
      </p>
    </div>
  );
}

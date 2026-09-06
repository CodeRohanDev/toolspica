"use client";

import * as React from "react";
import { BatchUploadZone } from "@/components/tools/batch-upload-zone";
import { BatchFileList } from "@/components/tools/batch-file-list";
import { useBatchFiles } from "@/lib/use-batch-files";
import { useFfmpegJob } from "@/lib/use-ffmpeg-job";
import { pickUniqueName } from "@/lib/ffmpeg-setup";
import { stripMediaExtension } from "@/lib/media-helpers";

export function ExtractAudioFromVideo() {
  const { run } = useFfmpegJob();

  const convert = React.useCallback(
    async (file: File) => {
      const inputName = pickUniqueName("mp4");
      const outputName = pickUniqueName("mp3");
      const buffer = new Uint8Array(await file.arrayBuffer());
      const data = await run([{ name: inputName, data: buffer }], ["-i", inputName, "-vn", "-c:a", "libmp3lame", "-q:a", "2", outputName], outputName);
      const blob = new Blob([data as BlobPart], { type: "audio/mpeg" });
      return { blob, name: `${stripMediaExtension(file.name)}.mp3` };
    },
    [run]
  );

  const { items, addFiles, removeItem } = useBatchFiles(convert);

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <BatchUploadZone accept="video/*" onFilesSelect={addFiles} label="Drop video files to extract audio from" />

      <BatchFileList items={items} onRemove={removeItem} zipName="extracted-audio.zip" />

      <p className="mt-3 text-xs text-muted-foreground">
        Pulls just the audio track out of each video file and encodes it as MP3, discarding the
        video entirely — useful for podcasts, lectures, or music recorded on video.
      </p>
    </div>
  );
}

"use client";

import * as React from "react";
import { BatchUploadZone } from "@/components/tools/batch-upload-zone";
import { BatchFileList } from "@/components/tools/batch-file-list";
import { useBatchFiles } from "@/lib/use-batch-files";
import { useFfmpegJob } from "@/lib/use-ffmpeg-job";
import { pickUniqueName, pickInputName } from "@/lib/ffmpeg-setup";
import { stripMediaExtension } from "@/lib/media-helpers";

export function AudioNormalizer() {
  const { run } = useFfmpegJob();

  const convert = React.useCallback(
    async (file: File) => {
      const inputName = pickInputName(file);
      const outputName = pickUniqueName("mp3");
      const buffer = new Uint8Array(await file.arrayBuffer());
      const data = await run(
        [{ name: inputName, data: buffer }],
        ["-i", inputName, "-filter:a", "loudnorm=I=-16:LRA=11:TP=-1.5", "-c:a", "libmp3lame", "-q:a", "2", outputName],
        outputName
      );
      const blob = new Blob([data as BlobPart], { type: "audio/mpeg" });
      return { blob, name: `${stripMediaExtension(file.name)}-normalized.mp3` };
    },
    [run]
  );

  const { items, addFiles, removeItem } = useBatchFiles(convert);

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <BatchUploadZone accept="audio/*" onFilesSelect={addFiles} label="Drop audio files to normalize" />

      <BatchFileList items={items} onRemove={removeItem} zipName="normalized-audio.zip" />

      <p className="mt-3 text-xs text-muted-foreground">
        Uses the EBU R128 loudness standard (-16 LUFS, the common target for podcasts and streaming)
        to even out volume automatically — smarter than a flat gain boost since it accounts for
        perceived loudness across the whole track.
      </p>
    </div>
  );
}

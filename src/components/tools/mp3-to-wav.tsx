"use client";

import * as React from "react";
import { BatchUploadZone } from "@/components/tools/batch-upload-zone";
import { BatchFileList } from "@/components/tools/batch-file-list";
import { useBatchFiles } from "@/lib/use-batch-files";
import { useFfmpegJob } from "@/lib/use-ffmpeg-job";
import { pickUniqueName } from "@/lib/ffmpeg-setup";
import { stripMediaExtension } from "@/lib/media-helpers";

export function Mp3ToWav() {
  const { run } = useFfmpegJob();

  const convert = React.useCallback(
    async (file: File) => {
      const inputName = pickUniqueName("mp3");
      const outputName = pickUniqueName("wav");
      const buffer = new Uint8Array(await file.arrayBuffer());
      const data = await run([{ name: inputName, data: buffer }], ["-i", inputName, "-c:a", "pcm_s16le", outputName], outputName);
      const blob = new Blob([data as BlobPart], { type: "audio/wav" });
      return { blob, name: `${stripMediaExtension(file.name)}.wav` };
    },
    [run]
  );

  const { items, addFiles, removeItem } = useBatchFiles(convert);

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <BatchUploadZone accept="audio/mpeg,.mp3" onFilesSelect={addFiles} label="Drop MP3 files to convert to WAV" />

      <BatchFileList items={items} onRemove={removeItem} zipName="converted-wavs.zip" />

      <p className="mt-3 text-xs text-muted-foreground">
        Decodes MP3 to uncompressed 16-bit PCM WAV — useful for editing software that expects
        lossless input, at the cost of a much larger file. Files process one at a time, in order.
      </p>
    </div>
  );
}

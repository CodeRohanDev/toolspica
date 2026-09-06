"use client";

import * as React from "react";
import { BatchUploadZone } from "@/components/tools/batch-upload-zone";
import { BatchFileList } from "@/components/tools/batch-file-list";
import { useBatchFiles } from "@/lib/use-batch-files";
import { useFfmpegJob } from "@/lib/use-ffmpeg-job";
import { pickUniqueName, pickInputName } from "@/lib/ffmpeg-setup";
import { stripMediaExtension } from "@/lib/media-helpers";

export function WavConverter() {
  const { run } = useFfmpegJob();

  const convert = React.useCallback(
    async (file: File) => {
      const inputName = pickInputName(file);
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
      <BatchUploadZone accept="audio/*" onFilesSelect={addFiles} label="Drop audio files to convert to WAV" />

      <BatchFileList items={items} onRemove={removeItem} zipName="converted-wavs.zip" />

      <p className="mt-3 text-xs text-muted-foreground">
        Decodes to uncompressed 16-bit PCM WAV — lossless, but noticeably larger than the source
        format since nothing is compressed. Files process one at a time, in order.
      </p>
    </div>
  );
}

"use client";

import * as React from "react";
import { BatchUploadZone } from "@/components/tools/batch-upload-zone";
import { BatchFileList } from "@/components/tools/batch-file-list";
import { useBatchFiles } from "@/lib/use-batch-files";
import { useFfmpegJob } from "@/lib/use-ffmpeg-job";
import { pickUniqueName } from "@/lib/ffmpeg-setup";
import { stripMediaExtension } from "@/lib/media-helpers";

export function WavToMp3() {
  const { run } = useFfmpegJob();

  const convert = React.useCallback(
    async (file: File) => {
      const inputName = pickUniqueName("wav");
      const outputName = pickUniqueName("mp3");
      const buffer = new Uint8Array(await file.arrayBuffer());
      const data = await run([{ name: inputName, data: buffer }], ["-i", inputName, "-c:a", "libmp3lame", "-q:a", "2", outputName], outputName);
      const blob = new Blob([data as BlobPart], { type: "audio/mpeg" });
      return { blob, name: `${stripMediaExtension(file.name)}.mp3` };
    },
    [run]
  );

  const { items, addFiles, removeItem } = useBatchFiles(convert);

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <BatchUploadZone accept="audio/wav,.wav" onFilesSelect={addFiles} label="Drop WAV files to convert to MP3" />

      <BatchFileList items={items} onRemove={removeItem} zipName="converted-mp3s.zip" />

      <p className="mt-3 text-xs text-muted-foreground">
        Compresses uncompressed WAV files down to MP3, shrinking file size dramatically for
        sharing or storage. Files process one at a time, in order.
      </p>
    </div>
  );
}

"use client";

import * as React from "react";
import { BatchUploadZone } from "@/components/tools/batch-upload-zone";
import { BatchFileList } from "@/components/tools/batch-file-list";
import { useBatchFiles } from "@/lib/use-batch-files";
import { useFfmpegJob } from "@/lib/use-ffmpeg-job";
import { pickUniqueName, pickInputName } from "@/lib/ffmpeg-setup";
import { stripMediaExtension } from "@/lib/media-helpers";

export function AacConverter() {
  const { run } = useFfmpegJob();

  const convert = React.useCallback(
    async (file: File) => {
      const inputName = pickInputName(file);
      const outputName = pickUniqueName("m4a");
      const buffer = new Uint8Array(await file.arrayBuffer());
      const data = await run([{ name: inputName, data: buffer }], ["-i", inputName, "-c:a", "aac", "-b:a", "192k", outputName], outputName);
      const blob = new Blob([data as BlobPart], { type: "audio/mp4" });
      return { blob, name: `${stripMediaExtension(file.name)}.m4a` };
    },
    [run]
  );

  const { items, addFiles, removeItem } = useBatchFiles(convert);

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <BatchUploadZone accept="audio/*" onFilesSelect={addFiles} label="Drop audio files to convert to AAC (.m4a)" />

      <BatchFileList items={items} onRemove={removeItem} zipName="converted-aacs.zip" />

      <p className="mt-3 text-xs text-muted-foreground">
        Encodes to AAC in an .m4a container — the format Apple devices and iTunes/Music use by
        default, generally more efficient than MP3 at the same bitrate. Files process one at a
        time, in order.
      </p>
    </div>
  );
}

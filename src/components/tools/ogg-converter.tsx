"use client";

import * as React from "react";
import { BatchUploadZone } from "@/components/tools/batch-upload-zone";
import { BatchFileList } from "@/components/tools/batch-file-list";
import { useBatchFiles } from "@/lib/use-batch-files";
import { useFfmpegJob } from "@/lib/use-ffmpeg-job";
import { pickUniqueName, pickInputName } from "@/lib/ffmpeg-setup";
import { stripMediaExtension } from "@/lib/media-helpers";

export function OggConverter() {
  const { run } = useFfmpegJob();

  const convert = React.useCallback(
    async (file: File) => {
      const inputName = pickInputName(file);
      const outputName = pickUniqueName("ogg");
      const buffer = new Uint8Array(await file.arrayBuffer());
      const data = await run([{ name: inputName, data: buffer }], ["-i", inputName, "-c:a", "libvorbis", "-q:a", "5", outputName], outputName);
      const blob = new Blob([data as BlobPart], { type: "audio/ogg" });
      return { blob, name: `${stripMediaExtension(file.name)}.ogg` };
    },
    [run]
  );

  const { items, addFiles, removeItem } = useBatchFiles(convert);

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <BatchUploadZone accept="audio/*" onFilesSelect={addFiles} label="Drop audio files to convert to OGG" />

      <BatchFileList items={items} onRemove={removeItem} zipName="converted-oggs.zip" />

      <p className="mt-3 text-xs text-muted-foreground">
        Encodes with the open, patent-free Vorbis codec — a strong quality-per-size alternative to
        MP3, widely supported outside a few Apple/Microsoft-centric apps. Files process one at a
        time, in order.
      </p>
    </div>
  );
}

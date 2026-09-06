"use client";

import * as React from "react";
import { BatchUploadZone } from "@/components/tools/batch-upload-zone";
import { BatchFileList } from "@/components/tools/batch-file-list";
import { useBatchFiles } from "@/lib/use-batch-files";
import { useFfmpegJob } from "@/lib/use-ffmpeg-job";
import { pickUniqueName } from "@/lib/ffmpeg-setup";
import { stripMediaExtension } from "@/lib/media-helpers";

export function ReverseGifMaker() {
  const { run } = useFfmpegJob();

  const convert = React.useCallback(
    async (file: File) => {
      const inputName = pickUniqueName("gif");
      const outputName = pickUniqueName("gif");
      const buffer = new Uint8Array(await file.arrayBuffer());
      const data = await run(
        [{ name: inputName, data: buffer }],
        ["-i", inputName, "-vf", "reverse,split[s0][s1];[s0]palettegen[p];[s1][p]paletteuse", "-loop", "0", outputName],
        outputName
      );
      const blob = new Blob([data as BlobPart], { type: "image/gif" });
      return { blob, name: `${stripMediaExtension(file.name)}-reversed.gif` };
    },
    [run]
  );

  const { items, addFiles, removeItem } = useBatchFiles(convert);

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <BatchUploadZone accept="image/gif" onFilesSelect={addFiles} label="Drop GIFs to reverse" />

      <BatchFileList items={items} onRemove={removeItem} zipName="reversed-gifs.zip" />

      <p className="mt-3 text-xs text-muted-foreground">
        Plays every frame of each animation in reverse order, looping continuously.
      </p>
    </div>
  );
}

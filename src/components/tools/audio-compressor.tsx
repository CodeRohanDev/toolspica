"use client";

import * as React from "react";
import { Label } from "@/components/ui/label";
import { BatchUploadZone } from "@/components/tools/batch-upload-zone";
import { BatchFileList } from "@/components/tools/batch-file-list";
import { useBatchFiles } from "@/lib/use-batch-files";
import { useFfmpegJob } from "@/lib/use-ffmpeg-job";
import { pickUniqueName, pickInputName } from "@/lib/ffmpeg-setup";
import { stripMediaExtension } from "@/lib/media-helpers";

export function AudioCompressor() {
  const [bitrate, setBitrate] = React.useState(96);
  const { run } = useFfmpegJob();

  const convert = React.useCallback(
    async (file: File) => {
      const inputName = pickInputName(file);
      const outputName = pickUniqueName("mp3");
      const buffer = new Uint8Array(await file.arrayBuffer());
      const data = await run([{ name: inputName, data: buffer }], ["-i", inputName, "-c:a", "libmp3lame", "-b:a", `${bitrate}k`, outputName], outputName);
      const blob = new Blob([data as BlobPart], { type: "audio/mpeg" });
      return { blob, name: `${stripMediaExtension(file.name)}-compressed.mp3` };
    },
    [bitrate, run]
  );

  const { items, addFiles, removeItem } = useBatchFiles(convert);

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <BatchUploadZone accept="audio/*" onFilesSelect={addFiles} label="Drop audio files to compress" />

      <div className="mt-4 flex items-center gap-3">
        <Label htmlFor="bitrate" className="shrink-0 text-sm text-muted-foreground">Bitrate ({bitrate} kbps)</Label>
        <input id="bitrate" type="range" min={32} max={256} step={16} value={bitrate} onChange={(e) => setBitrate(Number(e.target.value))} className="flex-1" />
      </div>
      <p className="mt-2 text-xs text-muted-foreground">
        Lower bitrates shrink the file more but reduce audio fidelity — 128kbps is a common
        good-enough balance for spoken word, 192-256kbps for music.
      </p>

      <BatchFileList items={items} onRemove={removeItem} zipName="compressed-audio.zip" />
    </div>
  );
}

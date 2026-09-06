"use client";

import * as React from "react";
import { Label } from "@/components/ui/label";
import { BatchUploadZone } from "@/components/tools/batch-upload-zone";
import { BatchFileList } from "@/components/tools/batch-file-list";
import { useBatchFiles } from "@/lib/use-batch-files";
import { useFfmpegJob } from "@/lib/use-ffmpeg-job";
import { pickUniqueName, pickInputName } from "@/lib/ffmpeg-setup";
import { stripMediaExtension } from "@/lib/media-helpers";

export function AudioVolumeBooster() {
  const [gainDb, setGainDb] = React.useState(6);
  const { run } = useFfmpegJob();

  const convert = React.useCallback(
    async (file: File) => {
      const inputName = pickInputName(file);
      const outputName = pickUniqueName("mp3");
      const buffer = new Uint8Array(await file.arrayBuffer());
      const data = await run(
        [{ name: inputName, data: buffer }],
        ["-i", inputName, "-filter:a", `volume=${gainDb}dB`, "-c:a", "libmp3lame", "-q:a", "2", outputName],
        outputName
      );
      const blob = new Blob([data as BlobPart], { type: "audio/mpeg" });
      return { blob, name: `${stripMediaExtension(file.name)}-boosted.mp3` };
    },
    [gainDb, run]
  );

  const { items, addFiles, removeItem } = useBatchFiles(convert);

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <BatchUploadZone accept="audio/*" onFilesSelect={addFiles} label="Drop audio files to boost the volume of" />

      <div className="mt-4 flex items-center gap-3">
        <Label htmlFor="gain" className="shrink-0 text-sm text-muted-foreground">Gain ({gainDb > 0 ? "+" : ""}{gainDb} dB)</Label>
        <input id="gain" type="range" min={-20} max={20} value={gainDb} onChange={(e) => setGainDb(Number(e.target.value))} className="flex-1" />
      </div>
      <p className="mt-2 text-xs text-muted-foreground">
        Boosting too far can cause audible clipping/distortion if the source is already close to
        peak volume — if that happens, try a smaller gain or use the Audio Normalizer instead.
      </p>

      <BatchFileList items={items} onRemove={removeItem} zipName="boosted-audio.zip" />
    </div>
  );
}

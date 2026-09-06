"use client";

import * as React from "react";
import { Label } from "@/components/ui/label";
import { BatchUploadZone } from "@/components/tools/batch-upload-zone";
import { BatchFileList } from "@/components/tools/batch-file-list";
import { useBatchFiles } from "@/lib/use-batch-files";
import { useFfmpegJob } from "@/lib/use-ffmpeg-job";
import { pickUniqueName, pickInputName } from "@/lib/ffmpeg-setup";
import { stripMediaExtension } from "@/lib/media-helpers";

function buildAtempoChain(factor: number): string {
  const parts: string[] = [];
  let remaining = factor;
  while (remaining > 2) {
    parts.push("atempo=2.0");
    remaining /= 2;
  }
  while (remaining < 0.5) {
    parts.push("atempo=0.5");
    remaining /= 0.5;
  }
  parts.push(`atempo=${remaining.toFixed(4)}`);
  return parts.join(",");
}

export function AudioPitchChanger() {
  const [semitones, setSemitones] = React.useState(0);
  const { run } = useFfmpegJob();

  const convert = React.useCallback(
    async (file: File) => {
      const pitchFactor = 2 ** (semitones / 12);
      const tempoCorrection = 1 / pitchFactor;
      const inputName = pickInputName(file);
      const outputName = pickUniqueName("mp3");
      const buffer = new Uint8Array(await file.arrayBuffer());
      const filter = `asetrate=44100*${pitchFactor.toFixed(5)},aresample=44100,${buildAtempoChain(tempoCorrection)}`;
      const data = await run([{ name: inputName, data: buffer }], ["-i", inputName, "-filter:a", filter, "-c:a", "libmp3lame", "-q:a", "2", outputName], outputName);
      const blob = new Blob([data as BlobPart], { type: "audio/mpeg" });
      return { blob, name: `${stripMediaExtension(file.name)}-pitch.mp3` };
    },
    [semitones, run]
  );

  const { items, addFiles, removeItem } = useBatchFiles(convert);

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <BatchUploadZone accept="audio/*" onFilesSelect={addFiles} label="Drop audio files to shift the pitch of" />

      <div className="mt-4 flex items-center gap-3">
        <Label htmlFor="semitones" className="shrink-0 text-sm text-muted-foreground">
          Pitch ({semitones > 0 ? "+" : ""}{semitones} semitones)
        </Label>
        <input id="semitones" type="range" min={-12} max={12} value={semitones} onChange={(e) => setSemitones(Number(e.target.value))} className="flex-1" />
      </div>
      <p className="mt-2 text-xs text-muted-foreground">
        Shifts pitch up or down in semitones (12 = one octave) while keeping the original playback
        speed — the classic resample-then-correct-tempo technique, not a simple speed change.
      </p>

      <BatchFileList items={items} onRemove={removeItem} zipName="pitch-shifted-audio.zip" />
    </div>
  );
}

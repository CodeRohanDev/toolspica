"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Download } from "lucide-react";
import { MediaUploadZone } from "@/components/tools/media-upload-zone";
import { MediaProgressBar } from "@/components/tools/media-progress-bar";
import { useFfmpegJob } from "@/lib/use-ffmpeg-job";
import { pickUniqueName, pickInputName } from "@/lib/ffmpeg-setup";
import { downloadMediaBytes, stripMediaExtension } from "@/lib/media-helpers";

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
  const [file, setFile] = React.useState<File | null>(null);
  const [semitones, setSemitones] = React.useState(0);
  const { run, progress, processing, error, setError } = useFfmpegJob();

  async function apply() {
    if (!file) return;
    setError(null);
    try {
      // Resample to shift pitch (asetrate), then correct tempo back to original (atempo)
      // so the clip's speed stays the same while only pitch changes.
      const pitchFactor = 2 ** (semitones / 12);
      const tempoCorrection = 1 / pitchFactor;
      const inputName = pickInputName(file);
      const outputName = pickUniqueName("mp3");
      const buffer = new Uint8Array(await file.arrayBuffer());
      const filter = `asetrate=44100*${pitchFactor.toFixed(5)},aresample=44100,${buildAtempoChain(tempoCorrection)}`;
      const data = await run(
        [{ name: inputName, data: buffer }],
        ["-i", inputName, "-filter:a", filter, "-c:a", "libmp3lame", "-q:a", "2", outputName],
        outputName
      );
      downloadMediaBytes(data, `${stripMediaExtension(file.name)}-pitch.mp3`, "audio/mpeg");
    } catch {
      // error state already set by the hook
    }
  }

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <MediaUploadZone file={file} onFileSelect={setFile} onClear={() => setFile(null)} accept="audio/*" kind="audio" />

      <div className="mt-4 flex items-center gap-3">
        <Label htmlFor="semitones" className="shrink-0 text-sm text-muted-foreground">
          Pitch ({semitones > 0 ? "+" : ""}{semitones} semitones)
        </Label>
        <input id="semitones" type="range" min={-12} max={12} value={semitones} onChange={(e) => setSemitones(Number(e.target.value))} className="flex-1" />
      </div>

      {processing && <MediaProgressBar progress={progress} />}
      {error && <p className="mt-3 text-sm text-destructive">{error}</p>}

      <Button type="button" className="mt-4" onClick={apply} disabled={!file || processing || semitones === 0}>
        <Download className="size-4" />
        {processing ? "Processing..." : "Apply pitch shift and download"}
      </Button>
      <p className="mt-2 text-xs text-muted-foreground">
        Shifts pitch up or down in semitones (12 = one octave) while keeping the original playback
        speed — the classic resample-then-correct-tempo technique, not a simple speed change.
      </p>
    </div>
  );
}

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

export function ChangeAudioSpeed() {
  const [file, setFile] = React.useState<File | null>(null);
  const [speed, setSpeed] = React.useState(1);
  const { run, progress, processing, error, setError } = useFfmpegJob();

  async function apply() {
    if (!file) return;
    setError(null);
    try {
      const inputName = pickInputName(file);
      const outputName = pickUniqueName("mp3");
      const buffer = new Uint8Array(await file.arrayBuffer());
      const data = await run(
        [{ name: inputName, data: buffer }],
        ["-i", inputName, "-filter:a", buildAtempoChain(speed), "-c:a", "libmp3lame", "-q:a", "2", outputName],
        outputName
      );
      downloadMediaBytes(data, `${stripMediaExtension(file.name)}-${speed}x.mp3`, "audio/mpeg");
    } catch {
      // error state already set by the hook
    }
  }

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <MediaUploadZone file={file} onFileSelect={setFile} onClear={() => setFile(null)} accept="audio/*" kind="audio" />

      <div className="mt-4 flex items-center gap-3">
        <Label htmlFor="audio-speed" className="shrink-0 text-sm text-muted-foreground">Speed ({speed}x)</Label>
        <input id="audio-speed" type="range" min={0.25} max={4} step={0.25} value={speed} onChange={(e) => setSpeed(Number(e.target.value))} className="flex-1" />
      </div>

      {processing && <MediaProgressBar progress={progress} />}
      {error && <p className="mt-3 text-sm text-destructive">{error}</p>}

      <Button type="button" className="mt-4" onClick={apply} disabled={!file || processing || speed === 1}>
        <Download className="size-4" />
        {processing ? "Processing..." : `Apply ${speed}x speed and download`}
      </Button>
      <p className="mt-2 text-xs text-muted-foreground">
        Changes playback speed while keeping pitch natural — useful for speeding through a lecture
        or slowing down music to learn a part, without the chipmunk or slow-motion pitch shift.
      </p>
    </div>
  );
}

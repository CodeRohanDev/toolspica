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

export function SilenceRemover() {
  const [file, setFile] = React.useState<File | null>(null);
  const [threshold, setThreshold] = React.useState(-35);
  const { run, progress, processing, error, setError } = useFfmpegJob();

  async function apply() {
    if (!file) return;
    setError(null);
    try {
      const inputName = pickInputName(file);
      const outputName = pickUniqueName("mp3");
      const buffer = new Uint8Array(await file.arrayBuffer());
      const filter = `silenceremove=start_periods=1:start_duration=0.3:start_threshold=${threshold}dB:detection=peak,silenceremove=stop_periods=-1:stop_duration=0.3:stop_threshold=${threshold}dB:detection=peak`;
      const data = await run(
        [{ name: inputName, data: buffer }],
        ["-i", inputName, "-filter:a", filter, "-c:a", "libmp3lame", "-q:a", "2", outputName],
        outputName
      );
      downloadMediaBytes(data, `${stripMediaExtension(file.name)}-no-silence.mp3`, "audio/mpeg");
    } catch {
      // error state already set by the hook
    }
  }

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <MediaUploadZone file={file} onFileSelect={setFile} onClear={() => setFile(null)} accept="audio/*" kind="audio" />

      <div className="mt-4 flex items-center gap-3">
        <Label htmlFor="silence-threshold" className="shrink-0 text-sm text-muted-foreground">
          Silence threshold ({threshold} dB)
        </Label>
        <input id="silence-threshold" type="range" min={-60} max={-15} value={threshold} onChange={(e) => setThreshold(Number(e.target.value))} className="flex-1" />
      </div>

      {processing && <MediaProgressBar progress={progress} />}
      {error && <p className="mt-3 text-sm text-destructive">{error}</p>}

      <Button type="button" className="mt-4" onClick={apply} disabled={!file || processing}>
        <Download className="size-4" />
        {processing ? "Removing silence..." : "Remove silence and download"}
      </Button>
      <p className="mt-2 text-xs text-muted-foreground">
        Cuts out stretches of near-silence throughout the whole track (not just the start/end) —
        raise the threshold (closer to 0) to catch quieter pauses, lower it to only remove true
        silence.
      </p>
    </div>
  );
}

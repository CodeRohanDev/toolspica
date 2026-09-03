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

export function AudioVolumeBooster() {
  const [file, setFile] = React.useState<File | null>(null);
  const [gainDb, setGainDb] = React.useState(6);
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
        ["-i", inputName, "-filter:a", `volume=${gainDb}dB`, "-c:a", "libmp3lame", "-q:a", "2", outputName],
        outputName
      );
      downloadMediaBytes(data, `${stripMediaExtension(file.name)}-boosted.mp3`, "audio/mpeg");
    } catch {
      // error state already set by the hook
    }
  }

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <MediaUploadZone file={file} onFileSelect={setFile} onClear={() => setFile(null)} accept="audio/*" kind="audio" />

      <div className="mt-4 flex items-center gap-3">
        <Label htmlFor="gain" className="shrink-0 text-sm text-muted-foreground">Gain ({gainDb > 0 ? "+" : ""}{gainDb} dB)</Label>
        <input id="gain" type="range" min={-20} max={20} value={gainDb} onChange={(e) => setGainDb(Number(e.target.value))} className="flex-1" />
      </div>

      {processing && <MediaProgressBar progress={progress} />}
      {error && <p className="mt-3 text-sm text-destructive">{error}</p>}

      <Button type="button" className="mt-4" onClick={apply} disabled={!file || processing || gainDb === 0}>
        <Download className="size-4" />
        {processing ? "Processing..." : "Apply and download"}
      </Button>
      <p className="mt-2 text-xs text-muted-foreground">
        Boosting too far can cause audible clipping/distortion if the source is already close to
        peak volume — if that happens, try a smaller gain or use the Audio Normalizer instead.
      </p>
    </div>
  );
}

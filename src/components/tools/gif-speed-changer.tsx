"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Download } from "lucide-react";
import { MediaUploadZone } from "@/components/tools/media-upload-zone";
import { MediaProgressBar } from "@/components/tools/media-progress-bar";
import { useFfmpegJob } from "@/lib/use-ffmpeg-job";
import { pickUniqueName } from "@/lib/ffmpeg-setup";
import { downloadMediaBytes, stripMediaExtension } from "@/lib/media-helpers";

export function GifSpeedChanger() {
  const [file, setFile] = React.useState<File | null>(null);
  const [speed, setSpeed] = React.useState(1);
  const { run, progress, processing, error, setError } = useFfmpegJob();

  async function changeSpeed() {
    if (!file) return;
    setError(null);
    try {
      const inputName = pickUniqueName("gif");
      const outputName = pickUniqueName("gif");
      const buffer = new Uint8Array(await file.arrayBuffer());
      const pts = 1 / speed;
      const data = await run(
        [{ name: inputName, data: buffer }],
        [
          "-i", inputName,
          "-vf", `setpts=${pts}*PTS,split[s0][s1];[s0]palettegen[p];[s1][p]paletteuse`,
          "-loop", "0",
          outputName,
        ],
        outputName
      );
      downloadMediaBytes(data, `${stripMediaExtension(file.name)}-${speed}x.gif`, "image/gif");
    } catch {
      // error state already set by the hook
    }
  }

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <MediaUploadZone file={file} onFileSelect={setFile} onClear={() => setFile(null)} accept="image/gif" kind="video" label="Drop a GIF, or click to browse" />

      <div className="mt-4 flex items-center gap-3">
        <Label className="shrink-0 text-sm text-muted-foreground">Speed: {speed.toFixed(1)}x</Label>
        <input type="range" min={0.25} max={4} step={0.25} value={speed} onChange={(e) => setSpeed(Number(e.target.value))} className="flex-1" />
      </div>

      {processing && <MediaProgressBar progress={progress} />}
      {error && <p className="mt-3 text-sm text-destructive">{error}</p>}

      <Button type="button" className="mt-4" onClick={changeSpeed} disabled={!file || processing}>
        <Download className="size-4" />
        {processing ? "Processing..." : "Change speed and download"}
      </Button>
      <p className="mt-2 text-xs text-muted-foreground">
        Values above 1x speed the animation up; values below 1x slow it down.
      </p>
    </div>
  );
}

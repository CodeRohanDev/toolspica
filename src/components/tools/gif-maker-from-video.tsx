"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Download } from "lucide-react";
import { MediaUploadZone } from "@/components/tools/media-upload-zone";
import { MediaProgressBar } from "@/components/tools/media-progress-bar";
import { useFfmpegJob } from "@/lib/use-ffmpeg-job";
import { pickInputName, pickUniqueName } from "@/lib/ffmpeg-setup";
import { downloadMediaBytes, stripMediaExtension } from "@/lib/media-helpers";

export function GifMakerFromVideo() {
  const [file, setFile] = React.useState<File | null>(null);
  const [start, setStart] = React.useState(0);
  const [duration, setDuration] = React.useState(3);
  const [fps, setFps] = React.useState(10);
  const [width, setWidth] = React.useState(480);
  const { run, progress, processing, error, setError } = useFfmpegJob();

  async function makeGif() {
    if (!file) return;
    setError(null);
    try {
      const inputName = pickInputName(file);
      const outputName = pickUniqueName("gif");
      const buffer = new Uint8Array(await file.arrayBuffer());
      const data = await run(
        [{ name: inputName, data: buffer }],
        [
          "-ss", String(start),
          "-t", String(duration),
          "-i", inputName,
          "-vf", `fps=${fps},scale=${width}:-1:flags=lanczos,split[s0][s1];[s0]palettegen[p];[s1][p]paletteuse`,
          "-loop", "0",
          outputName,
        ],
        outputName
      );
      downloadMediaBytes(data, `${stripMediaExtension(file.name)}.gif`, "image/gif");
    } catch {
      // error state already set by the hook
    }
  }

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <MediaUploadZone file={file} onFileSelect={setFile} onClear={() => setFile(null)} accept="video/*" kind="video" />

      <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <div>
          <Label className="text-xs text-muted-foreground">Start (sec)</Label>
          <Input type="number" min={0} value={start} onChange={(e) => setStart(Number(e.target.value))} className="mt-1" />
        </div>
        <div>
          <Label className="text-xs text-muted-foreground">Duration (sec)</Label>
          <Input type="number" min={1} max={15} value={duration} onChange={(e) => setDuration(Number(e.target.value))} className="mt-1" />
        </div>
        <div>
          <Label className="text-xs text-muted-foreground">FPS</Label>
          <Input type="number" min={2} max={30} value={fps} onChange={(e) => setFps(Number(e.target.value))} className="mt-1" />
        </div>
        <div>
          <Label className="text-xs text-muted-foreground">Width (px)</Label>
          <Input type="number" min={64} max={1280} value={width} onChange={(e) => setWidth(Number(e.target.value))} className="mt-1" />
        </div>
      </div>

      {processing && <MediaProgressBar progress={progress} />}
      {error && <p className="mt-3 text-sm text-destructive">{error}</p>}

      <Button type="button" className="mt-4" onClick={makeGif} disabled={!file || processing}>
        <Download className="size-4" />
        {processing ? "Creating GIF..." : "Create and download GIF"}
      </Button>
      <p className="mt-2 text-xs text-muted-foreground">
        Keep the duration short — a 3-5 second clip already produces a reasonably sized GIF; much
        longer clips get large fast.
      </p>
    </div>
  );
}

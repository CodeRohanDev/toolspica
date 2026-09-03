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

export function VideoToGif() {
  const [file, setFile] = React.useState<File | null>(null);
  const [fps, setFps] = React.useState(10);
  const [width, setWidth] = React.useState(400);
  const { run, progress, processing, error, setError } = useFfmpegJob();

  async function convert() {
    if (!file) return;
    setError(null);
    try {
      const inputName = pickUniqueName("mp4");
      const outputName = pickUniqueName("gif");
      const buffer = new Uint8Array(await file.arrayBuffer());
      const data = await run(
        [{ name: inputName, data: buffer }],
        ["-i", inputName, "-vf", `fps=${fps},scale=${width}:-1:flags=lanczos`, outputName],
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

      <div className="mt-4 flex flex-wrap gap-6">
        <div className="flex items-center gap-3">
          <Label htmlFor="gif-fps" className="shrink-0 text-sm text-muted-foreground">FPS ({fps})</Label>
          <input id="gif-fps" type="range" min={2} max={20} value={fps} onChange={(e) => setFps(Number(e.target.value))} />
        </div>
        <div className="flex items-center gap-3">
          <Label htmlFor="gif-width" className="shrink-0 text-sm text-muted-foreground">Width ({width}px)</Label>
          <input id="gif-width" type="range" min={120} max={800} step={20} value={width} onChange={(e) => setWidth(Number(e.target.value))} />
        </div>
      </div>

      {processing && <MediaProgressBar progress={progress} />}
      {error && <p className="mt-3 text-sm text-destructive">{error}</p>}

      <Button type="button" className="mt-4" onClick={convert} disabled={!file || processing}>
        <Download className="size-4" />
        {processing ? "Converting..." : "Convert to GIF"}
      </Button>
      <p className="mt-2 text-xs text-muted-foreground">
        Lower FPS and smaller width keep the GIF file size manageable — GIFs are inherently large
        for anything beyond a few seconds, since every frame is a full image.
      </p>
    </div>
  );
}

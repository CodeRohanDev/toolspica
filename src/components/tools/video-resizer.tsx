"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Download } from "lucide-react";
import { MediaUploadZone } from "@/components/tools/media-upload-zone";
import { MediaProgressBar } from "@/components/tools/media-progress-bar";
import { useFfmpegJob } from "@/lib/use-ffmpeg-job";
import { pickUniqueName } from "@/lib/ffmpeg-setup";
import { downloadMediaBytes, stripMediaExtension } from "@/lib/media-helpers";

export function VideoResizer() {
  const [file, setFile] = React.useState<File | null>(null);
  const [width, setWidth] = React.useState("1280");
  const { run, progress, processing, error, setError } = useFfmpegJob();

  async function resize() {
    if (!file) return;
    setError(null);
    try {
      const w = Math.max(2, Math.round(Number(width) / 2) * 2);
      const inputName = pickUniqueName("mp4");
      const outputName = pickUniqueName("mp4");
      const buffer = new Uint8Array(await file.arrayBuffer());
      const data = await run(
        [{ name: inputName, data: buffer }],
        ["-i", inputName, "-vf", `scale=${w}:-2`, "-c:v", "libx264", "-pix_fmt", "yuv420p", "-c:a", "copy", outputName],
        outputName
      );
      downloadMediaBytes(data, `${stripMediaExtension(file.name)}-resized.mp4`, "video/mp4");
    } catch {
      // error state already set by the hook
    }
  }

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <MediaUploadZone file={file} onFileSelect={setFile} onClear={() => setFile(null)} accept="video/*" kind="video" />

      <div className="mt-4 flex items-center gap-3">
        <Label htmlFor="resize-width" className="shrink-0 text-sm text-muted-foreground">Target width (px)</Label>
        <Input id="resize-width" value={width} onChange={(e) => setWidth(e.target.value.replace(/\D/g, ""))} className="w-28 font-mono" />
      </div>

      {processing && <MediaProgressBar progress={progress} />}
      {error && <p className="mt-3 text-sm text-destructive">{error}</p>}

      <Button type="button" className="mt-4" onClick={resize} disabled={!file || processing || !width}>
        <Download className="size-4" />
        {processing ? "Resizing..." : "Resize and download"}
      </Button>
      <p className="mt-2 text-xs text-muted-foreground">
        Height scales automatically to preserve the original aspect ratio — no stretching or
        distortion.
      </p>
    </div>
  );
}

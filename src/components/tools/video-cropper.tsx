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

export function VideoCropper() {
  const [file, setFile] = React.useState<File | null>(null);
  const [margin, setMargin] = React.useState(10);
  const { run, progress, processing, error, setError } = useFfmpegJob();

  async function crop() {
    if (!file) return;
    setError(null);
    try {
      const inputName = pickUniqueName("mp4");
      const outputName = pickUniqueName("mp4");
      const buffer = new Uint8Array(await file.arrayBuffer());
      const keep = (100 - margin * 2) / 100;
      const cropExpr = `crop=iw*${keep.toFixed(3)}:ih*${keep.toFixed(3)}:iw*${(margin / 100).toFixed(3)}:ih*${(margin / 100).toFixed(3)}`;
      const data = await run(
        [{ name: inputName, data: buffer }],
        ["-i", inputName, "-vf", cropExpr, "-c:v", "libx264", "-pix_fmt", "yuv420p", "-c:a", "copy", outputName],
        outputName
      );
      downloadMediaBytes(data, `${stripMediaExtension(file.name)}-cropped.mp4`, "video/mp4");
    } catch {
      // error state already set by the hook
    }
  }

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <MediaUploadZone file={file} onFileSelect={setFile} onClear={() => setFile(null)} accept="video/*" kind="video" />

      <div className="mt-4 flex items-center gap-3">
        <Label htmlFor="crop-margin" className="shrink-0 text-sm text-muted-foreground">
          Crop margin ({margin}% per side)
        </Label>
        <input id="crop-margin" type="range" min={0} max={40} value={margin} onChange={(e) => setMargin(Number(e.target.value))} className="flex-1" />
      </div>

      {processing && <MediaProgressBar progress={progress} />}
      {error && <p className="mt-3 text-sm text-destructive">{error}</p>}

      <Button type="button" className="mt-4" onClick={crop} disabled={!file || processing || margin === 0}>
        <Download className="size-4" />
        {processing ? "Cropping..." : "Crop and download"}
      </Button>
      <p className="mt-2 text-xs text-muted-foreground">
        Trims an equal percentage off all four sides, centered on the frame — useful for removing
        unwanted borders or black bars.
      </p>
    </div>
  );
}

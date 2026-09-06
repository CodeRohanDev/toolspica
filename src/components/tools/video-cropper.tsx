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
  const [margins, setMargins] = React.useState({ top: 10, bottom: 10, left: 10, right: 10 });
  const { run, progress, processing, error, setError } = useFfmpegJob();

  const anyMargin = margins.top > 0 || margins.bottom > 0 || margins.left > 0 || margins.right > 0;

  async function crop() {
    if (!file) return;
    setError(null);
    try {
      const inputName = pickUniqueName("mp4");
      const outputName = pickUniqueName("mp4");
      const buffer = new Uint8Array(await file.arrayBuffer());
      const keepW = (100 - margins.left - margins.right) / 100;
      const keepH = (100 - margins.top - margins.bottom) / 100;
      const cropExpr = `crop=iw*${keepW.toFixed(3)}:ih*${keepH.toFixed(3)}:iw*${(margins.left / 100).toFixed(3)}:ih*${(margins.top / 100).toFixed(3)}`;
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

      <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-4">
        {(["top", "bottom", "left", "right"] as const).map((side) => (
          <div key={side}>
            <Label htmlFor={`crop-${side}`} className="text-sm capitalize text-muted-foreground">
              {side} margin ({margins[side]}%)
            </Label>
            <input
              id={`crop-${side}`}
              type="range"
              min={0}
              max={40}
              value={margins[side]}
              onChange={(e) => setMargins((m) => ({ ...m, [side]: Number(e.target.value) }))}
              className="mt-1.5 w-full"
            />
          </div>
        ))}
      </div>

      {processing && <MediaProgressBar progress={progress} />}
      {error && <p className="mt-3 text-sm text-destructive">{error}</p>}

      <Button type="button" className="mt-4" onClick={crop} disabled={!file || processing || !anyMargin}>
        <Download className="size-4" />
        {processing ? "Cropping..." : "Crop and download"}
      </Button>
      <p className="mt-2 text-xs text-muted-foreground">
        Adjust each side independently — useful for removing unwanted borders, black bars, or an
        off-center subject.
      </p>
    </div>
  );
}

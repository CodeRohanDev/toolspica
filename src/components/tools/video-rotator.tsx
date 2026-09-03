"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Download, RotateCw } from "lucide-react";
import { MediaUploadZone } from "@/components/tools/media-upload-zone";
import { MediaProgressBar } from "@/components/tools/media-progress-bar";
import { useFfmpegJob } from "@/lib/use-ffmpeg-job";
import { pickUniqueName } from "@/lib/ffmpeg-setup";
import { downloadMediaBytes, stripMediaExtension } from "@/lib/media-helpers";

const ROTATIONS: Record<number, string> = {
  90: "transpose=1",
  180: "transpose=1,transpose=1",
  270: "transpose=2",
};

export function VideoRotator() {
  const [file, setFile] = React.useState<File | null>(null);
  const [angle, setAngle] = React.useState(90);
  const { run, progress, processing, error, setError } = useFfmpegJob();

  async function rotate() {
    if (!file) return;
    setError(null);
    try {
      const inputName = pickUniqueName("mp4");
      const outputName = pickUniqueName("mp4");
      const buffer = new Uint8Array(await file.arrayBuffer());
      const data = await run(
        [{ name: inputName, data: buffer }],
        ["-i", inputName, "-vf", ROTATIONS[angle], "-c:v", "libx264", "-pix_fmt", "yuv420p", "-c:a", "copy", outputName],
        outputName
      );
      downloadMediaBytes(data, `${stripMediaExtension(file.name)}-rotated.mp4`, "video/mp4");
    } catch {
      // error state already set by the hook
    }
  }

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <MediaUploadZone file={file} onFileSelect={setFile} onClear={() => setFile(null)} accept="video/*" kind="video" />

      <div className="mt-4 flex gap-2">
        {[90, 180, 270].map((deg) => (
          <Button key={deg} type="button" variant={angle === deg ? "default" : "outline"} size="sm" onClick={() => setAngle(deg)}>
            <RotateCw className="size-3.5" /> {deg}°
          </Button>
        ))}
      </div>

      {processing && <MediaProgressBar progress={progress} />}
      {error && <p className="mt-3 text-sm text-destructive">{error}</p>}

      <Button type="button" className="mt-4" onClick={rotate} disabled={!file || processing}>
        <Download className="size-4" />
        {processing ? "Rotating..." : `Rotate ${angle}° and download`}
      </Button>
      <p className="mt-2 text-xs text-muted-foreground">
        Fixes a sideways video from a phone recorded in the wrong orientation — width and height
        swap for 90°/270° rotations.
      </p>
    </div>
  );
}

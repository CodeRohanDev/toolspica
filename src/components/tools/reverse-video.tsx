"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { MediaUploadZone } from "@/components/tools/media-upload-zone";
import { MediaProgressBar } from "@/components/tools/media-progress-bar";
import { useFfmpegJob } from "@/lib/use-ffmpeg-job";
import { pickUniqueName } from "@/lib/ffmpeg-setup";
import { downloadMediaBytes, stripMediaExtension } from "@/lib/media-helpers";

export function ReverseVideo() {
  const [file, setFile] = React.useState<File | null>(null);
  const { run, progress, processing, error, setError } = useFfmpegJob();

  async function reverse() {
    if (!file) return;
    setError(null);
    try {
      const inputName = pickUniqueName("mp4");
      const outputName = pickUniqueName("mp4");
      const buffer = new Uint8Array(await file.arrayBuffer());
      const data = await run(
        [{ name: inputName, data: buffer }],
        ["-i", inputName, "-vf", "reverse", "-af", "areverse", "-c:v", "libx264", "-pix_fmt", "yuv420p", "-c:a", "aac", outputName],
        outputName
      );
      downloadMediaBytes(data, `${stripMediaExtension(file.name)}-reversed.mp4`, "video/mp4");
    } catch {
      // error state already set by the hook
    }
  }

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <MediaUploadZone file={file} onFileSelect={setFile} onClear={() => setFile(null)} accept="video/*" kind="video" />

      {processing && <MediaProgressBar progress={progress} />}
      {error && <p className="mt-3 text-sm text-destructive">{error}</p>}

      <Button type="button" className="mt-4" onClick={reverse} disabled={!file || processing}>
        <Download className="size-4" />
        {processing ? "Reversing..." : "Reverse and download"}
      </Button>
      <p className="mt-2 text-xs text-muted-foreground">
        Plays the video and audio backward. Reversing has to hold every frame in memory at once, so
        it works best on shorter clips — very long or high-resolution videos may run slowly or use
        significant browser memory.
      </p>
    </div>
  );
}

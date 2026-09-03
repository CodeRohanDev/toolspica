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
import { downloadMediaBytes, stripMediaExtension, getMediaDuration, formatMediaBytes } from "@/lib/media-helpers";

export function VideoCompressorToTargetSize() {
  const [file, setFile] = React.useState<File | null>(null);
  const [duration, setDuration] = React.useState(0);
  const [targetMb, setTargetMb] = React.useState("10");
  const [resultSize, setResultSize] = React.useState<number | null>(null);
  const { run, progress, processing, error, setError } = useFfmpegJob();

  async function handleFile(picked: File) {
    setFile(picked);
    setError(null);
    setResultSize(null);
    try {
      setDuration(await getMediaDuration(picked, "video"));
    } catch {
      setError("Couldn't read this video's duration.");
    }
  }

  async function compress() {
    if (!file || !duration) return;
    setError(null);
    setResultSize(null);
    try {
      const targetBytes = Number(targetMb) * 1024 * 1024;
      const audioKbps = 128;
      const totalKbps = Math.floor((targetBytes * 8) / duration / 1000);
      const videoKbps = Math.max(100, totalKbps - audioKbps);

      const inputName = pickUniqueName("mp4");
      const outputName = pickUniqueName("mp4");
      const buffer = new Uint8Array(await file.arrayBuffer());
      const data = await run(
        [{ name: inputName, data: buffer }],
        ["-i", inputName, "-c:v", "libx264", "-b:v", `${videoKbps}k`, "-preset", "veryfast", "-pix_fmt", "yuv420p", "-c:a", "aac", "-b:a", `${audioKbps}k`, outputName],
        outputName
      );
      setResultSize(data.length);
      downloadMediaBytes(data, `${stripMediaExtension(file.name)}-${targetMb}mb.mp4`, "video/mp4");
    } catch {
      // error state already set by the hook
    }
  }

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <MediaUploadZone file={file} onFileSelect={handleFile} onClear={() => setFile(null)} accept="video/*" kind="video" />

      {file && duration > 0 && (
        <div className="mt-4 flex items-center gap-3">
          <Label htmlFor="target-mb" className="shrink-0 text-sm text-muted-foreground">Target size (MB)</Label>
          <Input id="target-mb" value={targetMb} onChange={(e) => setTargetMb(e.target.value.replace(/[^0-9.]/g, ""))} className="w-24 font-mono" />
        </div>
      )}

      {processing && <MediaProgressBar progress={progress} />}
      {error && <p className="mt-3 text-sm text-destructive">{error}</p>}

      <Button type="button" className="mt-4" onClick={compress} disabled={!file || processing || !targetMb}>
        <Download className="size-4" />
        {processing ? "Compressing..." : `Compress to ~${targetMb}MB`}
      </Button>
      {resultSize !== null && (
        <p className="mt-2 text-xs text-muted-foreground">Result: {formatMediaBytes(resultSize)} (target was {targetMb}MB)</p>
      )}
      <p className="mt-2 text-xs text-muted-foreground">
        Calculates the exact video bitrate needed to hit your target size given the video&apos;s
        duration, then encodes at that bitrate — actual size lands close to, not always exactly at,
        the target due to single-pass encoding variance.
      </p>
    </div>
  );
}

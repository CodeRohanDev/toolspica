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
import { downloadMediaBytes, stripMediaExtension, getMediaDuration } from "@/lib/media-helpers";

export function VideoThumbnailGenerator() {
  const [file, setFile] = React.useState<File | null>(null);
  const [timestamp, setTimestamp] = React.useState("1");
  const [previewUrl, setPreviewUrl] = React.useState<string | null>(null);
  const { run, progress, processing, error, setError } = useFfmpegJob();

  async function handleFile(picked: File) {
    setFile(picked);
    setPreviewUrl(null);
    setError(null);
    try {
      const d = await getMediaDuration(picked, "video");
      setTimestamp(String(Math.min(1, Math.floor(d / 2))));
    } catch {
      // duration read is best-effort
    }
  }

  async function generate() {
    if (!file) return;
    setError(null);
    try {
      const inputName = pickUniqueName("mp4");
      const outputName = pickUniqueName("png");
      const buffer = new Uint8Array(await file.arrayBuffer());
      const data = await run(
        [{ name: inputName, data: buffer }],
        ["-i", inputName, "-ss", timestamp, "-frames:v", "1", outputName],
        outputName
      );
      const blob = new Blob([data as BlobPart], { type: "image/png" });
      setPreviewUrl(URL.createObjectURL(blob));
      downloadMediaBytes(data, `${stripMediaExtension(file.name)}-thumb.png`, "image/png");
    } catch {
      // error state already set by the hook
    }
  }

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <MediaUploadZone file={file} onFileSelect={handleFile} onClear={() => setFile(null)} accept="video/*" kind="video" />

      {file && (
        <div className="mt-4 flex items-center gap-3">
          <Label htmlFor="thumb-time" className="shrink-0 text-sm text-muted-foreground">Timestamp (seconds)</Label>
          <Input id="thumb-time" value={timestamp} onChange={(e) => setTimestamp(e.target.value)} className="w-24 font-mono" />
        </div>
      )}

      {previewUrl && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={previewUrl} alt="Generated thumbnail" className="mt-4 max-h-64 rounded-lg border" />
      )}

      {processing && <MediaProgressBar progress={progress} />}
      {error && <p className="mt-3 text-sm text-destructive">{error}</p>}

      <Button type="button" className="mt-4" onClick={generate} disabled={!file || processing}>
        <Download className="size-4" />
        {processing ? "Generating..." : "Generate thumbnail"}
      </Button>
      <p className="mt-2 text-xs text-muted-foreground">
        Grabs a single frame from the exact timestamp you specify and saves it as a PNG image.
      </p>
    </div>
  );
}

"use client";

import * as React from "react";
import { Upload } from "lucide-react";
import { formatMediaBytes, formatTime } from "@/lib/media-helpers";

interface VideoMeta {
  duration: number;
  width: number;
  height: number;
  size: number;
  type: string;
  lastModified: string;
}

export function VideoMetadataViewer() {
  const [meta, setMeta] = React.useState<VideoMeta | null>(null);
  const [fileName, setFileName] = React.useState("");
  const [error, setError] = React.useState("");
  const [previewUrl, setPreviewUrl] = React.useState<string | null>(null);

  function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setFileName(file.name);
    setError("");
    setMeta(null);

    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
    const video = document.createElement("video");
    video.preload = "metadata";
    video.onloadedmetadata = () => {
      setMeta({
        duration: video.duration,
        width: video.videoWidth,
        height: video.videoHeight,
        size: file.size,
        type: file.type || "unknown",
        lastModified: new Date(file.lastModified).toLocaleString(),
      });
    };
    video.onerror = () => setError("Couldn't read metadata from this video file.");
    video.src = url;
  }

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <label className="flex w-fit cursor-pointer items-center gap-2 rounded-md border px-3 py-2 text-sm hover:bg-accent">
        <Upload className="size-4" />
        {fileName || "Upload a video file"}
        <input type="file" accept="video/*" onChange={handleUpload} className="hidden" />
      </label>

      {error && <p className="mt-3 text-sm text-destructive">{error}</p>}

      {meta && (
        <div className="mt-4 grid gap-4 sm:grid-cols-[auto_1fr]">
          {previewUrl && <video src={previewUrl} controls className="max-h-48 rounded-lg border" />}
          <div className="space-y-1.5 text-sm">
            <p><span className="text-muted-foreground">Resolution:</span> {meta.width} × {meta.height}</p>
            <p><span className="text-muted-foreground">Duration:</span> {formatTime(meta.duration)}</p>
            <p><span className="text-muted-foreground">File size:</span> {formatMediaBytes(meta.size)}</p>
            <p><span className="text-muted-foreground">Type:</span> {meta.type}</p>
            <p><span className="text-muted-foreground">Last modified:</span> {meta.lastModified}</p>
          </div>
        </div>
      )}
    </div>
  );
}

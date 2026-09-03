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
import { downloadMediaBytes, stripMediaExtension, getMediaDuration, formatTime } from "@/lib/media-helpers";

export function VideoTrimmer() {
  const [file, setFile] = React.useState<File | null>(null);
  const [duration, setDuration] = React.useState(0);
  const [start, setStart] = React.useState("0:00");
  const [end, setEnd] = React.useState("0:00");
  const { run, progress, processing, error, setError } = useFfmpegJob();

  async function handleFile(picked: File) {
    setFile(picked);
    setError(null);
    try {
      const d = await getMediaDuration(picked, "video");
      setDuration(d);
      setStart("0:00");
      setEnd(formatTime(d));
    } catch {
      setError("Couldn't read this video's duration.");
    }
  }

  function parseTime(t: string): number {
    const parts = t.split(":").map(Number);
    if (parts.some(Number.isNaN)) return 0;
    return parts.length === 2 ? parts[0] * 60 + parts[1] : parts[0];
  }

  async function trim() {
    if (!file) return;
    setError(null);
    const startSec = parseTime(start);
    const endSec = parseTime(end);
    if (endSec <= startSec) {
      setError("End time must be after start time.");
      return;
    }
    try {
      const inputName = pickUniqueName("mp4");
      const outputName = pickUniqueName("mp4");
      const buffer = new Uint8Array(await file.arrayBuffer());
      const data = await run(
        [{ name: inputName, data: buffer }],
        ["-i", inputName, "-ss", String(startSec), "-to", String(endSec), "-c:v", "libx264", "-pix_fmt", "yuv420p", "-c:a", "aac", outputName],
        outputName
      );
      downloadMediaBytes(data, `${stripMediaExtension(file.name)}-trimmed.mp4`, "video/mp4");
    } catch {
      // error state already set by the hook
    }
  }

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <MediaUploadZone file={file} onFileSelect={handleFile} onClear={() => setFile(null)} accept="video/*" kind="video" />

      {file && duration > 0 && (
        <div className="mt-4 flex flex-wrap items-end gap-4">
          <p className="text-sm text-muted-foreground">Duration: {formatTime(duration)}</p>
          <div>
            <Label htmlFor="trim-start" className="text-sm text-muted-foreground">Start (m:ss)</Label>
            <Input id="trim-start" value={start} onChange={(e) => setStart(e.target.value)} className="mt-1.5 w-24 font-mono" />
          </div>
          <div>
            <Label htmlFor="trim-end" className="text-sm text-muted-foreground">End (m:ss)</Label>
            <Input id="trim-end" value={end} onChange={(e) => setEnd(e.target.value)} className="mt-1.5 w-24 font-mono" />
          </div>
        </div>
      )}

      {processing && <MediaProgressBar progress={progress} />}
      {error && <p className="mt-3 text-sm text-destructive">{error}</p>}

      <Button type="button" className="mt-4" onClick={trim} disabled={!file || processing}>
        <Download className="size-4" />
        {processing ? "Trimming..." : "Trim and download"}
      </Button>
      <p className="mt-2 text-xs text-muted-foreground">
        Cuts the video to the exact start/end times you set, re-encoding for frame-accurate trim
        points — runs entirely in your browser via WebAssembly.
      </p>
    </div>
  );
}

"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Download } from "lucide-react";
import { MediaUploadZone } from "@/components/tools/media-upload-zone";
import { MediaProgressBar } from "@/components/tools/media-progress-bar";
import { useFfmpegJob } from "@/lib/use-ffmpeg-job";
import { pickUniqueName, pickInputName } from "@/lib/ffmpeg-setup";
import { downloadMediaBytes, stripMediaExtension, getMediaDuration, formatTime } from "@/lib/media-helpers";

export function RingtoneMaker() {
  const [file, setFile] = React.useState<File | null>(null);
  const [duration, setDuration] = React.useState(0);
  const [start, setStart] = React.useState("0:00");
  const [length, setLength] = React.useState(20);
  const { run, progress, processing, error, setError } = useFfmpegJob();

  async function handleFile(picked: File) {
    setFile(picked);
    setError(null);
    try {
      setDuration(await getMediaDuration(picked, "audio"));
      setStart("0:00");
    } catch {
      setError("Couldn't read this audio file's duration.");
    }
  }

  function parseTime(t: string): number {
    const parts = t.split(":").map(Number);
    if (parts.some(Number.isNaN)) return 0;
    return parts.length === 2 ? parts[0] * 60 + parts[1] : parts[0];
  }

  async function make() {
    if (!file) return;
    setError(null);
    try {
      const startSec = parseTime(start);
      const inputName = pickInputName(file);
      const outputName = pickUniqueName("m4a");
      const buffer = new Uint8Array(await file.arrayBuffer());
      const fadeOutStart = Math.max(0, length - 1.5);
      const filter = `afade=t=in:st=0:d=0.5,afade=t=out:st=${fadeOutStart.toFixed(2)}:d=1.5`;
      const data = await run(
        [{ name: inputName, data: buffer }],
        ["-i", inputName, "-ss", String(startSec), "-t", String(length), "-filter:a", filter, "-c:a", "aac", "-b:a", "192k", outputName],
        outputName
      );
      downloadMediaBytes(data, `${stripMediaExtension(file.name)}-ringtone.m4a`, "audio/mp4");
    } catch {
      // error state already set by the hook
    }
  }

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <MediaUploadZone file={file} onFileSelect={handleFile} onClear={() => setFile(null)} accept="audio/*" kind="audio" />

      {file && duration > 0 && (
        <div className="mt-4 flex flex-wrap items-end gap-4">
          <p className="text-sm text-muted-foreground">Duration: {formatTime(duration)}</p>
          <div>
            <Label htmlFor="ring-start" className="text-sm text-muted-foreground">Start (m:ss)</Label>
            <Input id="ring-start" value={start} onChange={(e) => setStart(e.target.value)} className="mt-1.5 w-24 font-mono" />
          </div>
          <div className="flex items-center gap-3">
            <Label htmlFor="ring-length" className="shrink-0 text-sm text-muted-foreground">Length ({length}s)</Label>
            <input id="ring-length" type="range" min={5} max={40} value={length} onChange={(e) => setLength(Number(e.target.value))} />
          </div>
        </div>
      )}

      {processing && <MediaProgressBar progress={progress} />}
      {error && <p className="mt-3 text-sm text-destructive">{error}</p>}

      <Button type="button" className="mt-4" onClick={make} disabled={!file || processing}>
        <Download className="size-4" />
        {processing ? "Creating..." : "Create ringtone"}
      </Button>
      <p className="mt-2 text-xs text-muted-foreground">
        Trims a short clip with a smooth fade-in and fade-out, exported as .m4a (AAC). For iPhone,
        you can rename the file extension to .m4r and sync it through Finder/iTunes as a ringtone.
      </p>
    </div>
  );
}

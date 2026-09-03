"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Download } from "lucide-react";
import { MediaUploadZone } from "@/components/tools/media-upload-zone";
import { MediaProgressBar } from "@/components/tools/media-progress-bar";
import { useFfmpegJob } from "@/lib/use-ffmpeg-job";
import { pickUniqueName, pickInputName } from "@/lib/ffmpeg-setup";
import { downloadMediaBytes, stripMediaExtension, getMediaDuration } from "@/lib/media-helpers";

export function AudioFadeInOutEditor() {
  const [file, setFile] = React.useState<File | null>(null);
  const [duration, setDuration] = React.useState(0);
  const [fadeIn, setFadeIn] = React.useState(2);
  const [fadeOut, setFadeOut] = React.useState(2);
  const { run, progress, processing, error, setError } = useFfmpegJob();

  async function handleFile(picked: File) {
    setFile(picked);
    setError(null);
    try {
      setDuration(await getMediaDuration(picked, "audio"));
    } catch {
      setError("Couldn't read this audio file's duration.");
    }
  }

  async function apply() {
    if (!file || !duration) return;
    setError(null);
    try {
      const fadeOutStart = Math.max(0, duration - fadeOut);
      const inputName = pickInputName(file);
      const outputName = pickUniqueName("mp3");
      const buffer = new Uint8Array(await file.arrayBuffer());
      const filter = `afade=t=in:st=0:d=${fadeIn},afade=t=out:st=${fadeOutStart.toFixed(2)}:d=${fadeOut}`;
      const data = await run(
        [{ name: inputName, data: buffer }],
        ["-i", inputName, "-filter:a", filter, "-c:a", "libmp3lame", "-q:a", "2", outputName],
        outputName
      );
      downloadMediaBytes(data, `${stripMediaExtension(file.name)}-faded.mp3`, "audio/mpeg");
    } catch {
      // error state already set by the hook
    }
  }

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <MediaUploadZone file={file} onFileSelect={handleFile} onClear={() => setFile(null)} accept="audio/*" kind="audio" />

      {file && duration > 0 && (
        <div className="mt-4 flex flex-wrap gap-6">
          <div className="flex items-center gap-3">
            <Label htmlFor="fade-in" className="shrink-0 text-sm text-muted-foreground">Fade in ({fadeIn}s)</Label>
            <input id="fade-in" type="range" min={0} max={10} step={0.5} value={fadeIn} onChange={(e) => setFadeIn(Number(e.target.value))} />
          </div>
          <div className="flex items-center gap-3">
            <Label htmlFor="fade-out" className="shrink-0 text-sm text-muted-foreground">Fade out ({fadeOut}s)</Label>
            <input id="fade-out" type="range" min={0} max={10} step={0.5} value={fadeOut} onChange={(e) => setFadeOut(Number(e.target.value))} />
          </div>
        </div>
      )}

      {processing && <MediaProgressBar progress={progress} />}
      {error && <p className="mt-3 text-sm text-destructive">{error}</p>}

      <Button type="button" className="mt-4" onClick={apply} disabled={!file || processing}>
        <Download className="size-4" />
        {processing ? "Processing..." : "Apply fades and download"}
      </Button>
      <p className="mt-2 text-xs text-muted-foreground">
        Smooths the start and end of a track instead of an abrupt cut-in or cut-off — a small touch
        that makes clips sound much more polished.
      </p>
    </div>
  );
}

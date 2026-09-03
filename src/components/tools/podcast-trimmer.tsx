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

export function PodcastTrimmer() {
  const [file, setFile] = React.useState<File | null>(null);
  const [duration, setDuration] = React.useState(0);
  const [trimStart, setTrimStart] = React.useState("0");
  const [trimEnd, setTrimEnd] = React.useState("0");
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

  async function trim() {
    if (!file) return;
    setError(null);
    const startSec = Number(trimStart) || 0;
    const endSec = duration - (Number(trimEnd) || 0);
    if (endSec <= startSec) {
      setError("Nothing left to keep — reduce the trim amounts.");
      return;
    }
    try {
      const inputName = pickInputName(file);
      const outputName = pickUniqueName("mp3");
      const buffer = new Uint8Array(await file.arrayBuffer());
      const data = await run(
        [{ name: inputName, data: buffer }],
        ["-i", inputName, "-ss", String(startSec), "-to", String(endSec), "-c:a", "libmp3lame", "-q:a", "2", outputName],
        outputName
      );
      downloadMediaBytes(data, `${stripMediaExtension(file.name)}-trimmed.mp3`, "audio/mpeg");
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
            <Label htmlFor="trim-lead" className="text-sm text-muted-foreground">Trim from start (sec)</Label>
            <Input id="trim-lead" value={trimStart} onChange={(e) => setTrimStart(e.target.value.replace(/\D/g, ""))} className="mt-1.5 w-24 font-mono" />
          </div>
          <div>
            <Label htmlFor="trim-trail" className="text-sm text-muted-foreground">Trim from end (sec)</Label>
            <Input id="trim-trail" value={trimEnd} onChange={(e) => setTrimEnd(e.target.value.replace(/\D/g, ""))} className="mt-1.5 w-24 font-mono" />
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
        Built for the common podcast-editing need — chopping dead air or a countdown off the start
        and end without having to specify exact clip boundaries.
      </p>
    </div>
  );
}

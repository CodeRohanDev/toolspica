"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Download } from "lucide-react";
import { MediaUploadZone } from "@/components/tools/media-upload-zone";
import { MediaProgressBar } from "@/components/tools/media-progress-bar";
import { useFfmpegJob } from "@/lib/use-ffmpeg-job";
import { pickUniqueName, pickInputName } from "@/lib/ffmpeg-setup";
import { downloadMediaBytes, stripMediaExtension, formatMediaBytes } from "@/lib/media-helpers";

export function AudioCompressor() {
  const [file, setFile] = React.useState<File | null>(null);
  const [bitrate, setBitrate] = React.useState(96);
  const [resultSize, setResultSize] = React.useState<number | null>(null);
  const { run, progress, processing, error, setError } = useFfmpegJob();

  async function compress() {
    if (!file) return;
    setError(null);
    setResultSize(null);
    try {
      const inputName = pickInputName(file);
      const outputName = pickUniqueName("mp3");
      const buffer = new Uint8Array(await file.arrayBuffer());
      const data = await run(
        [{ name: inputName, data: buffer }],
        ["-i", inputName, "-c:a", "libmp3lame", "-b:a", `${bitrate}k`, outputName],
        outputName
      );
      setResultSize(data.length);
      downloadMediaBytes(data, `${stripMediaExtension(file.name)}-compressed.mp3`, "audio/mpeg");
    } catch {
      // error state already set by the hook
    }
  }

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <MediaUploadZone file={file} onFileSelect={setFile} onClear={() => setFile(null)} accept="audio/*" kind="audio" />

      <div className="mt-4 flex items-center gap-3">
        <Label htmlFor="bitrate" className="shrink-0 text-sm text-muted-foreground">Bitrate ({bitrate} kbps)</Label>
        <input id="bitrate" type="range" min={32} max={256} step={16} value={bitrate} onChange={(e) => setBitrate(Number(e.target.value))} className="flex-1" />
      </div>

      {processing && <MediaProgressBar progress={progress} />}
      {error && <p className="mt-3 text-sm text-destructive">{error}</p>}

      <Button type="button" className="mt-4" onClick={compress} disabled={!file || processing}>
        <Download className="size-4" />
        {processing ? "Compressing..." : "Compress and download"}
      </Button>
      {file && resultSize !== null && (
        <p className="mt-2 text-xs text-muted-foreground">{formatMediaBytes(file.size)} → {formatMediaBytes(resultSize)}</p>
      )}
      <p className="mt-2 text-xs text-muted-foreground">
        Lower bitrates shrink the file more but reduce audio fidelity — 128kbps is a common
        good-enough balance for spoken word, 192-256kbps for music.
      </p>
    </div>
  );
}

"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { MediaUploadZone } from "@/components/tools/media-upload-zone";
import { MediaProgressBar } from "@/components/tools/media-progress-bar";
import { useFfmpegJob } from "@/lib/use-ffmpeg-job";
import { pickUniqueName, pickInputName } from "@/lib/ffmpeg-setup";
import { downloadMediaBytes, stripMediaExtension } from "@/lib/media-helpers";

export function AudioNormalizer() {
  const [file, setFile] = React.useState<File | null>(null);
  const { run, progress, processing, error, setError } = useFfmpegJob();

  async function normalize() {
    if (!file) return;
    setError(null);
    try {
      const inputName = pickInputName(file);
      const outputName = pickUniqueName("mp3");
      const buffer = new Uint8Array(await file.arrayBuffer());
      const data = await run(
        [{ name: inputName, data: buffer }],
        ["-i", inputName, "-filter:a", "loudnorm=I=-16:LRA=11:TP=-1.5", "-c:a", "libmp3lame", "-q:a", "2", outputName],
        outputName
      );
      downloadMediaBytes(data, `${stripMediaExtension(file.name)}-normalized.mp3`, "audio/mpeg");
    } catch {
      // error state already set by the hook
    }
  }

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <MediaUploadZone file={file} onFileSelect={setFile} onClear={() => setFile(null)} accept="audio/*" kind="audio" />

      {processing && <MediaProgressBar progress={progress} />}
      {error && <p className="mt-3 text-sm text-destructive">{error}</p>}

      <Button type="button" className="mt-4" onClick={normalize} disabled={!file || processing}>
        <Download className="size-4" />
        {processing ? "Normalizing..." : "Normalize and download"}
      </Button>
      <p className="mt-2 text-xs text-muted-foreground">
        Uses the EBU R128 loudness standard (-16 LUFS, the common target for podcasts and streaming)
        to even out volume automatically — smarter than a flat gain boost since it accounts for
        perceived loudness across the whole track.
      </p>
    </div>
  );
}

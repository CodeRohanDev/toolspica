"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { MediaUploadZone } from "@/components/tools/media-upload-zone";
import { MediaProgressBar } from "@/components/tools/media-progress-bar";
import { useFfmpegJob } from "@/lib/use-ffmpeg-job";
import { pickUniqueName } from "@/lib/ffmpeg-setup";
import { downloadMediaBytes, stripMediaExtension } from "@/lib/media-helpers";

export function Mp4ToWebm() {
  const [file, setFile] = React.useState<File | null>(null);
  const { run, progress, processing, error, setError } = useFfmpegJob();

  async function convert() {
    if (!file) return;
    setError(null);
    try {
      const inputName = pickUniqueName("mp4");
      const outputName = pickUniqueName("webm");
      const buffer = new Uint8Array(await file.arrayBuffer());
      const data = await run(
        [{ name: inputName, data: buffer }],
        ["-i", inputName, "-c:v", "libvpx", "-b:v", "1M", "-c:a", "libvorbis", outputName],
        outputName
      );
      downloadMediaBytes(data, `${stripMediaExtension(file.name)}.webm`, "video/webm");
    } catch {
      // error state already set by the hook
    }
  }

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <MediaUploadZone file={file} onFileSelect={setFile} onClear={() => setFile(null)} accept="video/mp4" kind="video" />

      {processing && <MediaProgressBar progress={progress} />}
      {error && <p className="mt-3 text-sm text-destructive">{error}</p>}

      <Button type="button" className="mt-4" onClick={convert} disabled={!file || processing}>
        <Download className="size-4" />
        {processing ? "Converting..." : "Convert to WebM"}
      </Button>
      <p className="mt-2 text-xs text-muted-foreground">
        Runs a real FFmpeg build compiled to WebAssembly, entirely in your browser — no upload. Uses
        the VP8 video codec and Vorbis audio codec, WebM&apos;s standard combination.
      </p>
    </div>
  );
}

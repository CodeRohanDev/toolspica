"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { MediaUploadZone } from "@/components/tools/media-upload-zone";
import { MediaProgressBar } from "@/components/tools/media-progress-bar";
import { useFfmpegJob } from "@/lib/use-ffmpeg-job";
import { pickUniqueName } from "@/lib/ffmpeg-setup";
import { downloadMediaBytes, stripMediaExtension } from "@/lib/media-helpers";

export function MuteVideo() {
  const [file, setFile] = React.useState<File | null>(null);
  const { run, progress, processing, error, setError } = useFfmpegJob();

  async function mute() {
    if (!file) return;
    setError(null);
    try {
      const inputName = pickUniqueName("mp4");
      const outputName = pickUniqueName("mp4");
      const buffer = new Uint8Array(await file.arrayBuffer());
      const data = await run(
        [{ name: inputName, data: buffer }],
        ["-i", inputName, "-c:v", "copy", "-an", outputName],
        outputName
      );
      downloadMediaBytes(data, `${stripMediaExtension(file.name)}-muted.mp4`, "video/mp4");
    } catch {
      // error state already set by the hook
    }
  }

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <MediaUploadZone file={file} onFileSelect={setFile} onClear={() => setFile(null)} accept="video/*" kind="video" />

      {processing && <MediaProgressBar progress={progress} />}
      {error && <p className="mt-3 text-sm text-destructive">{error}</p>}

      <Button type="button" className="mt-4" onClick={mute} disabled={!file || processing}>
        <Download className="size-4" />
        {processing ? "Removing audio..." : "Mute and download"}
      </Button>
      <p className="mt-2 text-xs text-muted-foreground">
        Removes the audio track entirely without re-encoding the video stream, so this is fast and
        the video quality is completely untouched.
      </p>
    </div>
  );
}

"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Download } from "lucide-react";
import { MediaUploadZone } from "@/components/tools/media-upload-zone";
import { MediaProgressBar } from "@/components/tools/media-progress-bar";
import { useFfmpegJob } from "@/lib/use-ffmpeg-job";
import { pickUniqueName } from "@/lib/ffmpeg-setup";
import { downloadMediaBytes, stripMediaExtension } from "@/lib/media-helpers";

export function LoopVideoMaker() {
  const [file, setFile] = React.useState<File | null>(null);
  const [repeats, setRepeats] = React.useState(3);
  const { run, progress, processing, error, setError } = useFfmpegJob();

  async function loop() {
    if (!file) return;
    setError(null);
    try {
      const inputName = pickUniqueName("mp4");
      const outputName = pickUniqueName("mp4");
      const buffer = new Uint8Array(await file.arrayBuffer());
      const data = await run(
        [{ name: inputName, data: buffer }],
        ["-stream_loop", String(repeats - 1), "-i", inputName, "-c", "copy", outputName],
        outputName
      );
      downloadMediaBytes(data, `${stripMediaExtension(file.name)}-looped.mp4`, "video/mp4");
    } catch {
      // error state already set by the hook
    }
  }

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <MediaUploadZone file={file} onFileSelect={setFile} onClear={() => setFile(null)} accept="video/*" kind="video" />

      <div className="mt-4 flex items-center gap-3">
        <Label htmlFor="loop-count" className="shrink-0 text-sm text-muted-foreground">Repeat ({repeats}x)</Label>
        <input id="loop-count" type="range" min={2} max={20} value={repeats} onChange={(e) => setRepeats(Number(e.target.value))} className="flex-1" />
      </div>

      {processing && <MediaProgressBar progress={progress} />}
      {error && <p className="mt-3 text-sm text-destructive">{error}</p>}

      <Button type="button" className="mt-4" onClick={loop} disabled={!file || processing}>
        <Download className="size-4" />
        {processing ? "Looping..." : `Loop ${repeats}x and download`}
      </Button>
      <p className="mt-2 text-xs text-muted-foreground">
        Repeats the whole clip back-to-back without re-encoding, so this is fast and there&apos;s no
        quality loss from the looping itself.
      </p>
    </div>
  );
}

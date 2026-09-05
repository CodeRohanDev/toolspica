"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Download } from "lucide-react";
import { MediaUploadZone } from "@/components/tools/media-upload-zone";
import { MediaProgressBar } from "@/components/tools/media-progress-bar";
import { useFfmpegJob } from "@/lib/use-ffmpeg-job";
import { downloadMediaBytes } from "@/lib/media-helpers";

export function GifMakerFromImages() {
  const [files, setFiles] = React.useState<File[]>([]);
  const [fps, setFps] = React.useState(2);
  const { run, progress, processing, error, setError } = useFfmpegJob();

  async function makeGif() {
    if (files.length === 0) return;
    setError(null);
    try {
      const inputs = await Promise.all(
        files.map(async (file, i) => ({
          name: `frame${String(i).padStart(4, "0")}.png`,
          data: new Uint8Array(await file.arrayBuffer()),
        }))
      );
      const outputName = `out${Date.now()}.gif`;
      const data = await run(
        inputs,
        [
          "-framerate", String(fps),
          "-i", "frame%04d.png",
          "-vf", "scale=480:-1:flags=lanczos,split[s0][s1];[s0]palettegen[p];[s1][p]paletteuse",
          "-loop", "0",
          outputName,
        ],
        outputName
      );
      downloadMediaBytes(data, "animation.gif", "image/gif");
    } catch {
      // error state already set by the hook
    }
  }

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <MediaUploadZone
        file={files[0] ?? null}
        onFileSelect={() => {}}
        onFilesSelect={setFiles}
        onClear={() => setFiles([])}
        accept="image/png,image/jpeg"
        multiple
        label="Drop images (in order), or click to browse"
      />
      {files.length > 0 && (
        <p className="mt-2 text-xs text-muted-foreground">{files.length} image(s) selected</p>
      )}

      <div className="mt-4 flex items-center gap-3">
        <Label htmlFor="fps" className="shrink-0 text-sm text-muted-foreground">
          Speed: {fps} frame{fps === 1 ? "" : "s"}/sec
        </Label>
        <input id="fps" type="range" min={1} max={10} value={fps} onChange={(e) => setFps(Number(e.target.value))} className="flex-1" />
      </div>

      {processing && <MediaProgressBar progress={progress} />}
      {error && <p className="mt-3 text-sm text-destructive">{error}</p>}

      <Button type="button" className="mt-4" onClick={makeGif} disabled={files.length === 0 || processing}>
        <Download className="size-4" />
        {processing ? "Building GIF..." : "Create and download GIF"}
      </Button>
      <p className="mt-2 text-xs text-muted-foreground">
        Images are combined in the order selected. Uses a generated color palette for the highest
        quality output GIF encoding can produce.
      </p>
    </div>
  );
}

"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Download } from "lucide-react";
import { MediaUploadZone } from "@/components/tools/media-upload-zone";
import { MediaProgressBar } from "@/components/tools/media-progress-bar";
import { useFfmpegJob } from "@/lib/use-ffmpeg-job";
import { pickUniqueName } from "@/lib/ffmpeg-setup";
import { downloadMediaBytes, stripMediaExtension, formatMediaBytes } from "@/lib/media-helpers";

export function GifCompressor() {
  const [file, setFile] = React.useState<File | null>(null);
  const [scale, setScale] = React.useState(75);
  const [fps, setFps] = React.useState(12);
  const [resultSize, setResultSize] = React.useState<number | null>(null);
  const { run, progress, processing, error, setError } = useFfmpegJob();

  async function compress() {
    if (!file) return;
    setError(null);
    setResultSize(null);
    try {
      const inputName = pickUniqueName("gif");
      const outputName = pickUniqueName("gif");
      const buffer = new Uint8Array(await file.arrayBuffer());
      const data = await run(
        [{ name: inputName, data: buffer }],
        [
          "-i", inputName,
          "-vf", `fps=${fps},scale=iw*${scale / 100}:-1:flags=lanczos,split[s0][s1];[s0]palettegen=max_colors=128[p];[s1][p]paletteuse`,
          "-loop", "0",
          outputName,
        ],
        outputName
      );
      setResultSize(data.length);
      downloadMediaBytes(data, `${stripMediaExtension(file.name)}-compressed.gif`, "image/gif");
    } catch {
      // error state already set by the hook
    }
  }

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <MediaUploadZone file={file} onFileSelect={setFile} onClear={() => setFile(null)} accept="image/gif" kind="video" label="Drop a GIF, or click to browse" />

      <div className="mt-4 flex items-center gap-3">
        <Label className="w-32 shrink-0 text-sm text-muted-foreground">Scale: {scale}%</Label>
        <input type="range" min={25} max={100} value={scale} onChange={(e) => setScale(Number(e.target.value))} className="flex-1" />
      </div>
      <div className="mt-3 flex items-center gap-3">
        <Label className="w-32 shrink-0 text-sm text-muted-foreground">Frame rate: {fps} fps</Label>
        <input type="range" min={5} max={30} value={fps} onChange={(e) => setFps(Number(e.target.value))} className="flex-1" />
      </div>

      {processing && <MediaProgressBar progress={progress} />}
      {error && <p className="mt-3 text-sm text-destructive">{error}</p>}

      <Button type="button" className="mt-4" onClick={compress} disabled={!file || processing}>
        <Download className="size-4" />
        {processing ? "Compressing..." : "Compress and download"}
      </Button>
      {file && resultSize !== null && (
        <p className="mt-2 text-xs text-muted-foreground">
          {formatMediaBytes(file.size)} → {formatMediaBytes(resultSize)}
        </p>
      )}
      <p className="mt-2 text-xs text-muted-foreground">
        Lowering scale and frame rate has the biggest impact on file size — a reduced color
        palette also helps.
      </p>
    </div>
  );
}

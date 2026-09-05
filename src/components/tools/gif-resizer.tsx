"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Download } from "lucide-react";
import { MediaUploadZone } from "@/components/tools/media-upload-zone";
import { MediaProgressBar } from "@/components/tools/media-progress-bar";
import { useFfmpegJob } from "@/lib/use-ffmpeg-job";
import { pickUniqueName } from "@/lib/ffmpeg-setup";
import { downloadMediaBytes, stripMediaExtension } from "@/lib/media-helpers";

export function GifResizer() {
  const [file, setFile] = React.useState<File | null>(null);
  const [width, setWidth] = React.useState(320);
  const { run, progress, processing, error, setError } = useFfmpegJob();

  async function resize() {
    if (!file) return;
    setError(null);
    try {
      const inputName = pickUniqueName("gif");
      const outputName = pickUniqueName("gif");
      const buffer = new Uint8Array(await file.arrayBuffer());
      const data = await run(
        [{ name: inputName, data: buffer }],
        [
          "-i", inputName,
          "-vf", `scale=${width}:-1:flags=lanczos,split[s0][s1];[s0]palettegen[p];[s1][p]paletteuse`,
          "-loop", "0",
          outputName,
        ],
        outputName
      );
      downloadMediaBytes(data, `${stripMediaExtension(file.name)}-resized.gif`, "image/gif");
    } catch {
      // error state already set by the hook
    }
  }

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <MediaUploadZone file={file} onFileSelect={setFile} onClear={() => setFile(null)} accept="image/gif" kind="video" label="Drop a GIF, or click to browse" />

      <div className="mt-4 flex items-center gap-3">
        <Label htmlFor="width" className="shrink-0 text-sm text-muted-foreground">
          Target width (px)
        </Label>
        <Input id="width" type="number" min={16} max={1920} value={width} onChange={(e) => setWidth(Number(e.target.value))} className="w-28" />
      </div>

      {processing && <MediaProgressBar progress={progress} />}
      {error && <p className="mt-3 text-sm text-destructive">{error}</p>}

      <Button type="button" className="mt-4" onClick={resize} disabled={!file || processing}>
        <Download className="size-4" />
        {processing ? "Resizing..." : "Resize and download"}
      </Button>
      <p className="mt-2 text-xs text-muted-foreground">
        Height scales automatically to preserve the original aspect ratio.
      </p>
    </div>
  );
}

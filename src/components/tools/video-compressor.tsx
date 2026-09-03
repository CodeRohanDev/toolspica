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

export function VideoCompressor() {
  const [file, setFile] = React.useState<File | null>(null);
  const [crf, setCrf] = React.useState(28);
  const [resultSize, setResultSize] = React.useState<number | null>(null);
  const { run, progress, processing, error, setError } = useFfmpegJob();

  async function compress() {
    if (!file) return;
    setError(null);
    setResultSize(null);
    try {
      const inputName = pickUniqueName("mp4");
      const outputName = pickUniqueName("mp4");
      const buffer = new Uint8Array(await file.arrayBuffer());
      const data = await run(
        [{ name: inputName, data: buffer }],
        ["-i", inputName, "-c:v", "libx264", "-crf", String(crf), "-preset", "veryfast", "-pix_fmt", "yuv420p", "-c:a", "aac", "-b:a", "128k", outputName],
        outputName
      );
      setResultSize(data.length);
      downloadMediaBytes(data, `${stripMediaExtension(file.name)}-compressed.mp4`, "video/mp4");
    } catch {
      // error state already set by the hook
    }
  }

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <MediaUploadZone file={file} onFileSelect={setFile} onClear={() => setFile(null)} accept="video/*" kind="video" />

      <div className="mt-4 flex items-center gap-3">
        <Label htmlFor="crf" className="shrink-0 text-sm text-muted-foreground">
          Compression ({crf < 24 ? "high quality" : crf < 32 ? "balanced" : "smallest file"})
        </Label>
        <input id="crf" type="range" min={18} max={40} value={crf} onChange={(e) => setCrf(Number(e.target.value))} className="flex-1" />
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
        Re-encodes with H.264 at a quality level you choose (CRF) — lower CRF means higher quality
        and a larger file, higher CRF means smaller file at reduced visual quality.
      </p>
    </div>
  );
}

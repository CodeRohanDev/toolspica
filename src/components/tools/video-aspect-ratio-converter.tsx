"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Download } from "lucide-react";
import { MediaUploadZone } from "@/components/tools/media-upload-zone";
import { MediaProgressBar } from "@/components/tools/media-progress-bar";
import { useFfmpegJob } from "@/lib/use-ffmpeg-job";
import { pickUniqueName } from "@/lib/ffmpeg-setup";
import { downloadMediaBytes, stripMediaExtension } from "@/lib/media-helpers";

const RATIOS = [
  { value: "16:9", w: 16, h: 9, label: "16:9 (widescreen)" },
  { value: "9:16", w: 9, h: 16, label: "9:16 (vertical/reels)" },
  { value: "1:1", w: 1, h: 1, label: "1:1 (square)" },
  { value: "4:3", w: 4, h: 3, label: "4:3 (classic)" },
];

export function VideoAspectRatioConverter() {
  const [file, setFile] = React.useState<File | null>(null);
  const [ratio, setRatio] = React.useState("16:9");
  const { run, progress, processing, error, setError } = useFfmpegJob();

  async function convert() {
    if (!file) return;
    setError(null);
    try {
      const target = RATIOS.find((r) => r.value === ratio)!;
      const inputName = pickUniqueName("mp4");
      const outputName = pickUniqueName("mp4");
      const buffer = new Uint8Array(await file.arrayBuffer());
      const vf = `scale=w='min(1280,iw)':h=-2,pad=ceil(iw/2)*2:ceil((iw*${target.h}/${target.w})/2)*2:(ow-iw)/2:(oh-ih)/2:color=black`;
      const data = await run(
        [{ name: inputName, data: buffer }],
        ["-i", inputName, "-vf", vf, "-c:v", "libx264", "-pix_fmt", "yuv420p", "-c:a", "copy", outputName],
        outputName
      );
      downloadMediaBytes(data, `${stripMediaExtension(file.name)}-${ratio.replace(":", "x")}.mp4`, "video/mp4");
    } catch {
      // error state already set by the hook
    }
  }

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <MediaUploadZone file={file} onFileSelect={setFile} onClear={() => setFile(null)} accept="video/*" kind="video" />

      <div className="mt-4">
        <Label className="text-sm text-muted-foreground">Target aspect ratio</Label>
        <Select value={ratio} onValueChange={(v) => v && setRatio(v)}>
          <SelectTrigger className="mt-1.5 w-52">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {RATIOS.map((r) => (
              <SelectItem key={r.value} value={r.value}>{r.label}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {processing && <MediaProgressBar progress={progress} />}
      {error && <p className="mt-3 text-sm text-destructive">{error}</p>}

      <Button type="button" className="mt-4" onClick={convert} disabled={!file || processing}>
        <Download className="size-4" />
        {processing ? "Converting..." : "Convert and download"}
      </Button>
      <p className="mt-2 text-xs text-muted-foreground">
        Fits the original video inside the new aspect ratio and adds black letterbox/pillarbox bars
        to fill the rest, rather than cropping or stretching your content out of proportion.
      </p>
    </div>
  );
}

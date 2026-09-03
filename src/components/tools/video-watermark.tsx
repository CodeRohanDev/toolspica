"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Download } from "lucide-react";
import { MediaUploadZone } from "@/components/tools/media-upload-zone";
import { MediaProgressBar } from "@/components/tools/media-progress-bar";
import { useFfmpegJob } from "@/lib/use-ffmpeg-job";
import { getFFmpeg, pickUniqueName, ensureDrawtextFont } from "@/lib/ffmpeg-setup";
import { downloadMediaBytes, stripMediaExtension } from "@/lib/media-helpers";

const POSITIONS: Record<string, string> = {
  "bottom-right": "W-w-16:H-h-16",
  "bottom-left": "16:H-h-16",
  "top-right": "W-w-16:16",
  "top-left": "16:16",
};

export function VideoWatermark() {
  const [file, setFile] = React.useState<File | null>(null);
  const [logo, setLogo] = React.useState<File | null>(null);
  const [text, setText] = React.useState("WATERMARK");
  const [mode, setMode] = React.useState<"text" | "image">("text");
  const [position, setPosition] = React.useState("bottom-right");
  const { progress, processing, error, setError } = useFfmpegJob();
  const [localProcessing, setLocalProcessing] = React.useState(false);

  async function apply() {
    if (!file) return;
    if (mode === "image" && !logo) return;
    setError(null);
    setLocalProcessing(true);
    try {
      const ffmpeg = await getFFmpeg();
      const inputName = pickUniqueName("mp4");
      const outputName = pickUniqueName("mp4");
      const buffer = new Uint8Array(await file.arrayBuffer());
      await ffmpeg.writeFile(inputName, buffer);

      let args: string[];
      if (mode === "text") {
        const fontPath = await ensureDrawtextFont(ffmpeg);
        // POSITIONS uses overlay-filter convention (W/H = video, w/h = overlay);
        // drawtext instead uses w/h for video and text_w/text_h for the text box.
        const [x, y] = POSITIONS[position].split(":");
        args = [
          "-i", inputName,
          "-vf", `drawtext=fontfile=${fontPath}:text='${text.replace(/'/g, "")}':x=${x.replace("w", "text_w").replace("W", "w")}:y=${y.replace("h", "text_h").replace("H", "h")}:fontsize=28:fontcolor=white@0.85:box=1:boxcolor=black@0.4:boxborderw=8`,
          "-c:v", "libx264", "-pix_fmt", "yuv420p", "-c:a", "copy",
          outputName,
        ];
      } else {
        const logoName = pickUniqueName("png");
        const logoBuffer = new Uint8Array(await logo!.arrayBuffer());
        await ffmpeg.writeFile(logoName, logoBuffer);
        args = [
          "-i", inputName, "-i", logoName,
          "-filter_complex", `[1:v]scale=120:-1[wm];[0:v][wm]overlay=${POSITIONS[position]}`,
          "-c:v", "libx264", "-pix_fmt", "yuv420p", "-c:a", "copy",
          outputName,
        ];
      }

      const code = await ffmpeg.exec(args);
      if (code !== 0) throw new Error("Couldn't apply the watermark — the video may be in an unsupported format.");
      const data = (await ffmpeg.readFile(outputName)) as Uint8Array;
      await ffmpeg.deleteFile(inputName).catch(() => {});
      await ffmpeg.deleteFile(outputName).catch(() => {});
      downloadMediaBytes(data, `${stripMediaExtension(file.name)}-watermarked.mp4`, "video/mp4");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Couldn't apply the watermark.");
    } finally {
      setLocalProcessing(false);
    }
  }

  const busy = processing || localProcessing;

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <MediaUploadZone file={file} onFileSelect={setFile} onClear={() => setFile(null)} accept="video/*" kind="video" />

      <div className="mt-4 flex gap-2">
        <Button type="button" variant={mode === "text" ? "default" : "outline"} size="sm" onClick={() => setMode("text")}>Text</Button>
        <Button type="button" variant={mode === "image" ? "default" : "outline"} size="sm" onClick={() => setMode("image")}>Image logo</Button>
      </div>

      {mode === "text" ? (
        <div className="mt-3">
          <Label htmlFor="wm-text" className="text-sm text-muted-foreground">Watermark text</Label>
          <Input id="wm-text" value={text} onChange={(e) => setText(e.target.value)} className="mt-1.5" />
        </div>
      ) : (
        <div className="mt-3">
          <Label className="text-sm text-muted-foreground">Logo image (PNG with transparency works best)</Label>
          <input
            type="file"
            accept="image/png,image/jpeg"
            onChange={(e) => setLogo(e.target.files?.[0] ?? null)}
            className="mt-1.5 block text-sm"
          />
        </div>
      )}

      <div className="mt-3 flex flex-wrap gap-2">
        {Object.keys(POSITIONS).map((p) => (
          <Button key={p} type="button" variant={position === p ? "default" : "outline"} size="sm" onClick={() => setPosition(p)}>
            {p.replace("-", " ")}
          </Button>
        ))}
      </div>

      {busy && <MediaProgressBar progress={progress} label="Processing..." />}
      {error && <p className="mt-3 text-sm text-destructive">{error}</p>}

      <Button type="button" className="mt-4" onClick={apply} disabled={!file || busy || (mode === "image" && !logo)}>
        <Download className="size-4" />
        {busy ? "Applying..." : "Add watermark and download"}
      </Button>
      <p className="mt-2 text-xs text-muted-foreground">
        Adds a permanent text or logo overlay burned directly into the video frames — it can&apos;t
        be removed afterward, which is the point of a watermark.
      </p>
    </div>
  );
}

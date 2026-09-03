"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Download } from "lucide-react";
import { MediaUploadZone } from "@/components/tools/media-upload-zone";
import { MediaProgressBar } from "@/components/tools/media-progress-bar";
import { getFFmpeg, pickUniqueName } from "@/lib/ffmpeg-setup";
import { downloadMediaBytes, stripMediaExtension } from "@/lib/media-helpers";
import { createZip } from "@/lib/zip-writer";

export function VideoFrameExtractor() {
  const [file, setFile] = React.useState<File | null>(null);
  const [interval, setInterval_] = React.useState(1);
  const [progress, setProgress] = React.useState(0);
  const [error, setError] = React.useState<string | null>(null);
  const [busy, setBusy] = React.useState(false);
  const [count, setCount] = React.useState<number | null>(null);

  async function extract() {
    if (!file) return;
    setError(null);
    setBusy(true);
    setCount(null);
    setProgress(0);
    try {
      const ffmpeg = await getFFmpeg();
      const prefix = pickUniqueName("").replace(/\.$/, "");
      const inputName = `${prefix}-in.mp4`;
      const pattern = `${prefix}-frame-%04d.png`;
      const buffer = new Uint8Array(await file.arrayBuffer());
      await ffmpeg.writeFile(inputName, buffer);

      const onProgress = ({ progress: p }: { progress: number }) => setProgress(Math.min(1, Math.max(0, p)));
      ffmpeg.on("progress", onProgress);
      const code = await ffmpeg.exec(["-i", inputName, "-vf", `fps=1/${interval}`, pattern]);
      ffmpeg.off("progress", onProgress);
      if (code !== 0) throw new Error("Couldn't extract frames from this video.");

      const files = await ffmpeg.listDir(".");
      const frameNames = files
        .map((f) => f.name)
        .filter((n) => n.startsWith(`${prefix}-frame-`))
        .sort();

      const entries = await Promise.all(
        frameNames.map(async (name) => ({ name, data: (await ffmpeg.readFile(name)) as Uint8Array }))
      );
      for (const name of frameNames) await ffmpeg.deleteFile(name).catch(() => {});
      await ffmpeg.deleteFile(inputName).catch(() => {});

      setCount(entries.length);
      if (entries.length === 0) throw new Error("No frames were extracted — try a shorter interval.");
      if (entries.length === 1) {
        downloadMediaBytes(entries[0].data, `${stripMediaExtension(file.name)}-frame.png`, "image/png");
      } else {
        const zip = createZip(entries);
        downloadMediaBytes(zip, `${stripMediaExtension(file.name)}-frames.zip`, "application/zip");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Couldn't extract frames from this video.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <MediaUploadZone file={file} onFileSelect={setFile} onClear={() => setFile(null)} accept="video/*" kind="video" />

      <div className="mt-4 flex items-center gap-3">
        <Label htmlFor="frame-interval" className="shrink-0 text-sm text-muted-foreground">
          Extract one frame every ({interval}s)
        </Label>
        <input id="frame-interval" type="range" min={0.5} max={10} step={0.5} value={interval} onChange={(e) => setInterval_(Number(e.target.value))} className="flex-1" />
      </div>

      {busy && <MediaProgressBar progress={progress} label="Extracting frames..." />}
      {error && <p className="mt-3 text-sm text-destructive">{error}</p>}
      {count !== null && !error && <p className="mt-2 text-xs text-muted-foreground">{count} frame(s) extracted.</p>}

      <Button type="button" className="mt-4" onClick={extract} disabled={!file || busy}>
        <Download className="size-4" />
        {busy ? "Extracting..." : "Extract frames"}
      </Button>
      <p className="mt-2 text-xs text-muted-foreground">
        Saves a PNG for every interval you set — multiple frames download together as a ZIP file.
      </p>
    </div>
  );
}

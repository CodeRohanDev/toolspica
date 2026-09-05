"use client";

import * as React from "react";
import JSZip from "jszip";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { MediaUploadZone } from "@/components/tools/media-upload-zone";
import { MediaProgressBar } from "@/components/tools/media-progress-bar";
import { getFFmpeg, pickUniqueName } from "@/lib/ffmpeg-setup";
import { stripMediaExtension } from "@/lib/media-helpers";

export function GifSplitter() {
  const [file, setFile] = React.useState<File | null>(null);
  const [processing, setProcessing] = React.useState(false);
  const [progress, setProgress] = React.useState(0);
  const [frameCount, setFrameCount] = React.useState<number | null>(null);
  const [error, setError] = React.useState<string | null>(null);

  async function split() {
    if (!file) return;
    setError(null);
    setFrameCount(null);
    setProcessing(true);
    setProgress(0);

    const ffmpeg = await getFFmpeg();
    const onProgress = ({ progress: p }: { progress: number }) => setProgress(Math.min(1, Math.max(0, p)));
    ffmpeg.on("progress", onProgress);

    const inputName = pickUniqueName("gif");
    const pattern = "frame%04d.png";
    const writtenNames: string[] = [];

    try {
      const buffer = new Uint8Array(await file.arrayBuffer());
      await ffmpeg.writeFile(inputName, buffer);
      const code = await ffmpeg.exec(["-i", inputName, "-vsync", "0", pattern]);
      if (code !== 0) throw new Error("Splitting failed — the file may not be a valid GIF.");

      const zip = new JSZip();
      let i = 1;
      while (i <= 2000) {
        const name = `frame${String(i).padStart(4, "0")}.png`;
        try {
          const data = (await ffmpeg.readFile(name)) as Uint8Array;
          zip.file(name, data);
          writtenNames.push(name);
          i++;
        } catch {
          break;
        }
      }

      if (writtenNames.length === 0) throw new Error("No frames were extracted from this file.");

      setFrameCount(writtenNames.length);
      const blob = await zip.generateAsync({ type: "blob" });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = `${stripMediaExtension(file.name)}-frames.zip`;
      link.click();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Splitting failed.");
    } finally {
      ffmpeg.off("progress", onProgress);
      await ffmpeg.deleteFile(inputName).catch(() => {});
      for (const name of writtenNames) await ffmpeg.deleteFile(name).catch(() => {});
      setProcessing(false);
    }
  }

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <MediaUploadZone file={file} onFileSelect={setFile} onClear={() => setFile(null)} accept="image/gif" kind="video" label="Drop a GIF, or click to browse" />

      {processing && <MediaProgressBar progress={progress} />}
      {error && <p className="mt-3 text-sm text-destructive">{error}</p>}

      <Button type="button" className="mt-4" onClick={split} disabled={!file || processing}>
        <Download className="size-4" />
        {processing ? "Extracting frames..." : "Extract frames as ZIP"}
      </Button>
      {frameCount !== null && (
        <p className="mt-2 text-xs text-muted-foreground">{frameCount} frame(s) extracted.</p>
      )}
      <p className="mt-2 text-xs text-muted-foreground">
        Every frame is saved as its own PNG image, numbered in order, bundled into a single ZIP
        download.
      </p>
    </div>
  );
}

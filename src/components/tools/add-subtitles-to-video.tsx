"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { MediaUploadZone } from "@/components/tools/media-upload-zone";
import { MediaProgressBar } from "@/components/tools/media-progress-bar";
import { useFfmpegJob } from "@/lib/use-ffmpeg-job";
import { getFFmpeg, pickUniqueName, ensureDrawtextFont } from "@/lib/ffmpeg-setup";
import { downloadMediaBytes, stripMediaExtension } from "@/lib/media-helpers";

interface Cue {
  start: number;
  end: number;
  text: string;
}

function timeToSeconds(t: string): number {
  const [h, m, rest] = t.split(":");
  const [s, ms] = rest.replace(",", ".").split(".");
  return Number(h) * 3600 + Number(m) * 60 + Number(s) + Number(ms ?? 0) / 1000;
}

function parseSrt(content: string): Cue[] {
  const blocks = content.replace(/\r/g, "").split(/\n\n+/).filter(Boolean);
  const cues: Cue[] = [];
  for (const block of blocks) {
    const lines = block.split("\n").filter(Boolean);
    const timeLine = lines.find((l) => l.includes("-->"));
    if (!timeLine) continue;
    const [startStr, endStr] = timeLine.split("-->").map((s) => s.trim());
    const textLines = lines.slice(lines.indexOf(timeLine) + 1);
    if (textLines.length === 0) continue;
    cues.push({ start: timeToSeconds(startStr), end: timeToSeconds(endStr), text: textLines.join(" ") });
  }
  return cues;
}

function escapeDrawtext(text: string): string {
  return text.replace(/\\/g, "\\\\").replace(/:/g, "\\:").replace(/'/g, "").replace(/%/g, "\\%");
}

export function AddSubtitlesToVideo() {
  const [file, setFile] = React.useState<File | null>(null);
  const [srtFile, setSrtFile] = React.useState<File | null>(null);
  const [cueCount, setCueCount] = React.useState(0);
  const { progress, processing, error, setError } = useFfmpegJob();
  const [busy, setBusy] = React.useState(false);

  async function handleSrt(picked: File) {
    setSrtFile(picked);
    const text = await picked.text();
    setCueCount(parseSrt(text).length);
  }

  async function apply() {
    if (!file || !srtFile) return;
    setError(null);
    setBusy(true);
    try {
      const cues = parseSrt(await srtFile.text());
      if (cues.length === 0) throw new Error("No subtitle cues found in this .srt file.");

      const ffmpeg = await getFFmpeg();
      const fontPath = await ensureDrawtextFont(ffmpeg);
      const inputName = pickUniqueName("mp4");
      const outputName = pickUniqueName("mp4");
      const buffer = new Uint8Array(await file.arrayBuffer());
      await ffmpeg.writeFile(inputName, buffer);

      const drawtextChain = cues
        .map(
          (c) =>
            `drawtext=fontfile=${fontPath}:text='${escapeDrawtext(c.text)}':x=(w-text_w)/2:y=h-text_h-30:fontsize=22:fontcolor=white:box=1:boxcolor=black@0.55:boxborderw=6:enable='between(t\\,${c.start.toFixed(2)}\\,${c.end.toFixed(2)})'`
        )
        .join(",");

      const code = await ffmpeg.exec([
        "-i", inputName,
        "-vf", drawtextChain,
        "-c:v", "libx264", "-pix_fmt", "yuv420p", "-c:a", "copy",
        outputName,
      ]);
      if (code !== 0) throw new Error("Couldn't burn in subtitles — check the .srt file is valid.");
      const data = (await ffmpeg.readFile(outputName)) as Uint8Array;
      await ffmpeg.deleteFile(inputName).catch(() => {});
      await ffmpeg.deleteFile(outputName).catch(() => {});
      downloadMediaBytes(data, `${stripMediaExtension(file.name)}-subtitled.mp4`, "video/mp4");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Couldn't add subtitles to this video.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <MediaUploadZone file={file} onFileSelect={setFile} onClear={() => setFile(null)} accept="video/*" kind="video" />

      <div className="mt-4">
        <label className="text-sm text-muted-foreground">Subtitle file (.srt)</label>
        <input
          type="file"
          accept=".srt"
          onChange={(e) => e.target.files?.[0] && handleSrt(e.target.files[0])}
          className="mt-1.5 block text-sm"
        />
        {srtFile && <p className="mt-1 text-xs text-muted-foreground">{cueCount} subtitle cues found in {srtFile.name}</p>}
      </div>

      {busy && <MediaProgressBar progress={progress} />}
      {error && <p className="mt-3 text-sm text-destructive">{error}</p>}

      <Button type="button" className="mt-4" onClick={apply} disabled={!file || !srtFile || busy}>
        <Download className="size-4" />
        {busy ? "Burning in subtitles..." : "Add subtitles and download"}
      </Button>
      <p className="mt-2 text-xs text-muted-foreground">
        Burns subtitles permanently into the video frames from a standard .srt file — this makes
        them always visible (unlike toggleable soft subtitles), which guarantees they display
        correctly on any platform, including ones that strip subtitle tracks.
      </p>
    </div>
  );
}

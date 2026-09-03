"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Download, X } from "lucide-react";
import { MediaUploadZone } from "@/components/tools/media-upload-zone";
import { MediaProgressBar } from "@/components/tools/media-progress-bar";
import { useFfmpegJob } from "@/lib/use-ffmpeg-job";
import { pickUniqueName } from "@/lib/ffmpeg-setup";
import { downloadMediaBytes, formatMediaBytes, getMediaDuration } from "@/lib/media-helpers";

interface Clip {
  file: File;
  start: string;
  end: string;
}

export function VideoJoinerByTimeline() {
  const [clips, setClips] = React.useState<Clip[]>([]);
  const { run, progress, processing, error, setError } = useFfmpegJob();

  async function addFiles(files: File[]) {
    const added = await Promise.all(
      files.map(async (file) => {
        const d = await getMediaDuration(file, "video").catch(() => 0);
        return { file, start: "0", end: d ? d.toFixed(1) : "0" };
      })
    );
    setClips((prev) => [...prev, ...added]);
  }
  function removeClip(i: number) {
    setClips((prev) => prev.filter((_, idx) => idx !== i));
  }
  function updateClip(i: number, field: "start" | "end", value: string) {
    setClips((prev) => prev.map((c, idx) => (idx === i ? { ...c, [field]: value } : c)));
  }

  async function join() {
    if (clips.length < 2) return;
    setError(null);
    try {
      const inputs = await Promise.all(
        clips.map(async (c, i) => ({ name: `in${i}.mp4`, data: new Uint8Array(await c.file.arrayBuffer()) }))
      );
      const outputName = pickUniqueName("mp4");
      const trimFilters = clips
        .map((c, i) => `[${i}:v]trim=${c.start}:${c.end},setpts=PTS-STARTPTS[v${i}];[${i}:a]atrim=${c.start}:${c.end},asetpts=PTS-STARTPTS[a${i}]`)
        .join(";");
      const concatInputs = clips.map((_, i) => `[v${i}][a${i}]`).join("");
      const args = [
        ...inputs.flatMap((inp) => ["-i", inp.name]),
        "-filter_complex", `${trimFilters};${concatInputs}concat=n=${clips.length}:v=1:a=1[v][a]`,
        "-map", "[v]", "-map", "[a]",
        "-c:v", "libx264", "-pix_fmt", "yuv420p", "-c:a", "aac",
        outputName,
      ];
      const data = await run(inputs, args, outputName);
      downloadMediaBytes(data, "joined.mp4", "video/mp4");
    } catch {
      // error state already set by the hook
    }
  }

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <MediaUploadZone file={null} onFileSelect={() => {}} onClear={() => {}} accept="video/*" kind="video" multiple onFilesSelect={addFiles} label="Add two or more clips, in order" />

      {clips.length > 0 && (
        <div className="mt-4 space-y-2">
          {clips.map((c, i) => (
            <div key={i} className="flex flex-wrap items-center gap-3 rounded-lg border p-2">
              <span className="w-6 text-center text-xs text-muted-foreground">{i + 1}</span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm">{c.file.name}</p>
                <p className="text-xs text-muted-foreground">{formatMediaBytes(c.file.size)}</p>
              </div>
              <Input value={c.start} onChange={(e) => updateClip(i, "start", e.target.value)} className="w-16 font-mono text-xs" />
              <span className="text-xs text-muted-foreground">to</span>
              <Input value={c.end} onChange={(e) => updateClip(i, "end", e.target.value)} className="w-16 font-mono text-xs" />
              <span className="text-xs text-muted-foreground">sec</span>
              <Button type="button" variant="ghost" size="icon-sm" onClick={() => removeClip(i)} aria-label="Remove"><X className="size-4" /></Button>
            </div>
          ))}
        </div>
      )}

      {processing && <MediaProgressBar progress={progress} />}
      {error && <p className="mt-3 text-sm text-destructive">{error}</p>}

      <Button type="button" className="mt-4" onClick={join} disabled={clips.length < 2 || processing}>
        <Download className="size-4" />
        {processing ? "Joining..." : `Join ${clips.length} clips`}
      </Button>
      <p className="mt-2 text-xs text-muted-foreground">
        Set exact in/out points (in seconds) for each clip before joining, so you can splice
        together just the parts you want from several source videos in one pass.
      </p>
    </div>
  );
}

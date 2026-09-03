"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Download, X } from "lucide-react";
import { MediaUploadZone } from "@/components/tools/media-upload-zone";
import { MediaProgressBar } from "@/components/tools/media-progress-bar";
import { useFfmpegJob } from "@/lib/use-ffmpeg-job";
import { pickUniqueName } from "@/lib/ffmpeg-setup";
import { downloadMediaBytes, formatMediaBytes } from "@/lib/media-helpers";

export function MergeVideos() {
  const [files, setFiles] = React.useState<File[]>([]);
  const { run, progress, processing, error, setError } = useFfmpegJob();

  function addFiles(picked: File[]) {
    setFiles((prev) => [...prev, ...picked]);
  }
  function removeFile(i: number) {
    setFiles((prev) => prev.filter((_, idx) => idx !== i));
  }
  function move(i: number, dir: -1 | 1) {
    setFiles((prev) => {
      const next = [...prev];
      const target = i + dir;
      if (target < 0 || target >= next.length) return prev;
      [next[i], next[target]] = [next[target], next[i]];
      return next;
    });
  }

  async function merge() {
    if (files.length < 2) return;
    setError(null);
    try {
      const inputs = await Promise.all(
        files.map(async (f, i) => ({ name: `in${i}.mp4`, data: new Uint8Array(await f.arrayBuffer()) }))
      );
      const outputName = pickUniqueName("mp4");
      const filterInputs = inputs.map((_, i) => `[${i}:v:0][${i}:a:0]`).join("");
      const args = [
        ...inputs.flatMap((inp) => ["-i", inp.name]),
        "-filter_complex", `${filterInputs}concat=n=${inputs.length}:v=1:a=1[v][a]`,
        "-map", "[v]", "-map", "[a]",
        "-c:v", "libx264", "-pix_fmt", "yuv420p", "-c:a", "aac",
        outputName,
      ];
      const data = await run(inputs, args, outputName);
      downloadMediaBytes(data, "merged.mp4", "video/mp4");
    } catch {
      // error state already set by the hook
    }
  }

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <MediaUploadZone file={null} onFileSelect={() => {}} onClear={() => {}} accept="video/*" kind="video" multiple onFilesSelect={addFiles} label="Add two or more videos, in order" />

      {files.length > 0 && (
        <div className="mt-4 space-y-2">
          {files.map((f, i) => (
            <div key={i} className="flex items-center gap-3 rounded-lg border p-2">
              <span className="w-6 text-center text-xs text-muted-foreground">{i + 1}</span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm">{f.name}</p>
                <p className="text-xs text-muted-foreground">{formatMediaBytes(f.size)}</p>
              </div>
              <Button type="button" variant="ghost" size="icon-sm" onClick={() => move(i, -1)} disabled={i === 0}>↑</Button>
              <Button type="button" variant="ghost" size="icon-sm" onClick={() => move(i, 1)} disabled={i === files.length - 1}>↓</Button>
              <Button type="button" variant="ghost" size="icon-sm" onClick={() => removeFile(i)} aria-label="Remove"><X className="size-4" /></Button>
            </div>
          ))}
        </div>
      )}

      {processing && <MediaProgressBar progress={progress} />}
      {error && <p className="mt-3 text-sm text-destructive">{error}</p>}

      <Button type="button" className="mt-4" onClick={merge} disabled={files.length < 2 || processing}>
        <Download className="size-4" />
        {processing ? "Merging..." : `Merge ${files.length} videos`}
      </Button>
      <p className="mt-2 text-xs text-muted-foreground">
        Re-encodes every clip to a common format before joining, so videos can be merged even if
        they started with different resolutions, frame rates, or codecs.
      </p>
    </div>
  );
}

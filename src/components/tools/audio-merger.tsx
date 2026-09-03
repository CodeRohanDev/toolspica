"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Download, X } from "lucide-react";
import { MediaUploadZone } from "@/components/tools/media-upload-zone";
import { MediaProgressBar } from "@/components/tools/media-progress-bar";
import { useFfmpegJob } from "@/lib/use-ffmpeg-job";
import { pickUniqueName } from "@/lib/ffmpeg-setup";
import { downloadMediaBytes, formatMediaBytes } from "@/lib/media-helpers";

export function AudioMerger() {
  const [files, setFiles] = React.useState<File[]>([]);
  const { run, progress, processing, error, setError } = useFfmpegJob();

  function addFiles(picked: File[]) {
    setFiles((prev) => [...prev, ...picked]);
  }
  function removeFile(i: number) {
    setFiles((prev) => prev.filter((_, idx) => idx !== i));
  }

  async function merge() {
    if (files.length < 2) return;
    setError(null);
    try {
      const inputs = await Promise.all(
        files.map(async (f, i) => ({ name: `in${i}.audio`, data: new Uint8Array(await f.arrayBuffer()) }))
      );
      const outputName = pickUniqueName("mp3");
      const filterInputs = inputs.map((_, i) => `[${i}:a:0]`).join("");
      const args = [
        ...inputs.flatMap((inp) => ["-i", inp.name]),
        "-filter_complex", `${filterInputs}amix=inputs=${inputs.length}:duration=longest:normalize=0[a]`,
        "-map", "[a]", "-c:a", "libmp3lame", "-q:a", "2",
        outputName,
      ];
      const data = await run(inputs, args, outputName);
      downloadMediaBytes(data, "merged.mp3", "audio/mpeg");
    } catch {
      // error state already set by the hook
    }
  }

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <MediaUploadZone file={null} onFileSelect={() => {}} onClear={() => {}} accept="audio/*" kind="audio" multiple onFilesSelect={addFiles} label="Add two or more audio tracks to mix together" />

      {files.length > 0 && (
        <div className="mt-4 space-y-2">
          {files.map((f, i) => (
            <div key={i} className="flex items-center gap-3 rounded-lg border p-2">
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm">{f.name}</p>
                <p className="text-xs text-muted-foreground">{formatMediaBytes(f.size)}</p>
              </div>
              <Button type="button" variant="ghost" size="icon-sm" onClick={() => removeFile(i)} aria-label="Remove"><X className="size-4" /></Button>
            </div>
          ))}
        </div>
      )}

      {processing && <MediaProgressBar progress={progress} />}
      {error && <p className="mt-3 text-sm text-destructive">{error}</p>}

      <Button type="button" className="mt-4" onClick={merge} disabled={files.length < 2 || processing}>
        <Download className="size-4" />
        {processing ? "Merging..." : `Merge ${files.length} tracks`}
      </Button>
      <p className="mt-2 text-xs text-muted-foreground">
        Mixes all tracks together to play at the same time — a voice-over with background music, for
        example — not end-to-end joining. For sequential joining instead, use Audio Joiner. The
        result runs as long as the longest input track.
      </p>
    </div>
  );
}

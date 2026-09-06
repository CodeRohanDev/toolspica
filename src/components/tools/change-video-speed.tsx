"use client";

import * as React from "react";
import { Label } from "@/components/ui/label";
import { BatchUploadZone } from "@/components/tools/batch-upload-zone";
import { BatchFileList } from "@/components/tools/batch-file-list";
import { useBatchFiles } from "@/lib/use-batch-files";
import { useFfmpegJob } from "@/lib/use-ffmpeg-job";
import { pickUniqueName } from "@/lib/ffmpeg-setup";
import { stripMediaExtension } from "@/lib/media-helpers";

function buildAtempoChain(factor: number): string {
  const parts: string[] = [];
  let remaining = factor;
  while (remaining > 2) {
    parts.push("atempo=2.0");
    remaining /= 2;
  }
  while (remaining < 0.5) {
    parts.push("atempo=0.5");
    remaining /= 0.5;
  }
  parts.push(`atempo=${remaining.toFixed(4)}`);
  return parts.join(",");
}

export function ChangeVideoSpeed() {
  const [speed, setSpeed] = React.useState(1);
  const { run } = useFfmpegJob();

  const convert = React.useCallback(
    async (file: File) => {
      const inputName = pickUniqueName("mp4");
      const outputName = pickUniqueName("mp4");
      const buffer = new Uint8Array(await file.arrayBuffer());
      const data = await run(
        [{ name: inputName, data: buffer }],
        [
          "-i", inputName,
          "-filter_complex", `[0:v]setpts=PTS/${speed}[v];[0:a]${buildAtempoChain(speed)}[a]`,
          "-map", "[v]", "-map", "[a]",
          "-c:v", "libx264", "-pix_fmt", "yuv420p", "-c:a", "aac",
          outputName,
        ],
        outputName
      );
      const blob = new Blob([data as BlobPart], { type: "video/mp4" });
      return { blob, name: `${stripMediaExtension(file.name)}-${speed}x.mp4` };
    },
    [speed, run]
  );

  const { items, addFiles, removeItem } = useBatchFiles(convert);

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <BatchUploadZone accept="video/*" onFilesSelect={addFiles} label="Drop videos to change the speed of" />

      <div className="mt-4 flex items-center gap-3">
        <Label htmlFor="speed" className="shrink-0 text-sm text-muted-foreground">Speed ({speed}x)</Label>
        <input id="speed" type="range" min={0.25} max={4} step={0.25} value={speed} onChange={(e) => setSpeed(Number(e.target.value))} className="flex-1" />
      </div>
      <p className="mt-2 text-xs text-muted-foreground">
        Speeds up or slows down both video and audio together, keeping them in sync — audio pitch
        stays natural since ffmpeg&apos;s tempo filter adjusts speed without altering pitch.
      </p>

      <BatchFileList items={items} onRemove={removeItem} zipName="speed-changed-videos.zip" />
    </div>
  );
}

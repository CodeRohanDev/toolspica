"use client";

import * as React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { BatchUploadZone } from "@/components/tools/batch-upload-zone";
import { BatchFileList } from "@/components/tools/batch-file-list";
import { useBatchFiles } from "@/lib/use-batch-files";
import { useFfmpegJob } from "@/lib/use-ffmpeg-job";
import { pickUniqueName } from "@/lib/ffmpeg-setup";
import { stripMediaExtension, getMediaDuration } from "@/lib/media-helpers";

export function VideoCompressorToTargetSize() {
  const [targetMb, setTargetMb] = React.useState("10");
  const { run } = useFfmpegJob();

  const convert = React.useCallback(
    async (file: File) => {
      const duration = await getMediaDuration(file, "video");
      const targetBytes = Number(targetMb) * 1024 * 1024;
      const audioKbps = 128;
      const totalKbps = Math.floor((targetBytes * 8) / duration / 1000);
      const videoKbps = Math.max(100, totalKbps - audioKbps);

      const inputName = pickUniqueName("mp4");
      const outputName = pickUniqueName("mp4");
      const buffer = new Uint8Array(await file.arrayBuffer());
      const data = await run(
        [{ name: inputName, data: buffer }],
        ["-i", inputName, "-c:v", "libx264", "-b:v", `${videoKbps}k`, "-preset", "veryfast", "-pix_fmt", "yuv420p", "-c:a", "aac", "-b:a", `${audioKbps}k`, outputName],
        outputName
      );
      const blob = new Blob([data as BlobPart], { type: "video/mp4" });
      return { blob, name: `${stripMediaExtension(file.name)}-${targetMb}mb.mp4` };
    },
    [targetMb, run]
  );

  const { items, addFiles, removeItem } = useBatchFiles(convert);

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <BatchUploadZone accept="video/*" onFilesSelect={addFiles} label="Drop videos to compress to a target size" />

      <div className="mt-4 flex items-center gap-3">
        <Label htmlFor="target-mb" className="shrink-0 text-sm text-muted-foreground">Target size (MB)</Label>
        <Input id="target-mb" value={targetMb} onChange={(e) => setTargetMb(e.target.value.replace(/[^0-9.]/g, ""))} className="w-24 font-mono" />
      </div>
      <p className="mt-2 text-xs text-muted-foreground">
        Calculates the exact video bitrate needed to hit your target size given each video&apos;s own
        duration, then encodes at that bitrate — actual size lands close to, not always exactly at,
        the target due to single-pass encoding variance.
      </p>

      <BatchFileList items={items} onRemove={removeItem} zipName="compressed-videos.zip" />
    </div>
  );
}

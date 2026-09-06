"use client";

import * as React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { BatchUploadZone } from "@/components/tools/batch-upload-zone";
import { BatchFileList } from "@/components/tools/batch-file-list";
import { useBatchFiles } from "@/lib/use-batch-files";
import { useFfmpegJob } from "@/lib/use-ffmpeg-job";
import { pickUniqueName } from "@/lib/ffmpeg-setup";
import { stripMediaExtension } from "@/lib/media-helpers";

export function VideoThumbnailGenerator() {
  const [timestamp, setTimestamp] = React.useState("1");
  const { run } = useFfmpegJob();

  const convert = React.useCallback(
    async (file: File) => {
      const inputName = pickUniqueName("mp4");
      const outputName = pickUniqueName("png");
      const buffer = new Uint8Array(await file.arrayBuffer());
      const data = await run([{ name: inputName, data: buffer }], ["-i", inputName, "-ss", timestamp, "-frames:v", "1", outputName], outputName);
      const blob = new Blob([data as BlobPart], { type: "image/png" });
      return { blob, name: `${stripMediaExtension(file.name)}-thumb.png` };
    },
    [timestamp, run]
  );

  const { items, addFiles, removeItem } = useBatchFiles(convert);

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <BatchUploadZone accept="video/*" onFilesSelect={addFiles} label="Drop videos to grab a thumbnail from" />

      <div className="mt-4 flex items-center gap-3">
        <Label htmlFor="thumb-time" className="shrink-0 text-sm text-muted-foreground">Timestamp (seconds)</Label>
        <Input id="thumb-time" value={timestamp} onChange={(e) => setTimestamp(e.target.value)} className="w-24 font-mono" />
      </div>
      <p className="mt-2 text-xs text-muted-foreground">
        Grabs a single frame from the same timestamp in every video you add and saves it as a PNG
        image.
      </p>

      <BatchFileList items={items} onRemove={removeItem} zipName="video-thumbnails.zip" />
    </div>
  );
}

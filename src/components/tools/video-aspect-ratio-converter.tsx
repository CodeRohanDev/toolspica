"use client";

import * as React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { BatchUploadZone } from "@/components/tools/batch-upload-zone";
import { BatchFileList } from "@/components/tools/batch-file-list";
import { useBatchFiles } from "@/lib/use-batch-files";
import { useFfmpegJob } from "@/lib/use-ffmpeg-job";
import { pickUniqueName } from "@/lib/ffmpeg-setup";
import { stripMediaExtension } from "@/lib/media-helpers";

const RATIOS = [
  { value: "16:9", w: 16, h: 9, label: "16:9 (widescreen)" },
  { value: "9:16", w: 9, h: 16, label: "9:16 (vertical/reels)" },
  { value: "1:1", w: 1, h: 1, label: "1:1 (square)" },
  { value: "4:3", w: 4, h: 3, label: "4:3 (classic)" },
];

export function VideoAspectRatioConverter() {
  const [ratio, setRatio] = React.useState("16:9");
  const { run } = useFfmpegJob();

  const convert = React.useCallback(
    async (file: File) => {
      const target = RATIOS.find((r) => r.value === ratio)!;
      const inputName = pickUniqueName("mp4");
      const outputName = pickUniqueName("mp4");
      const buffer = new Uint8Array(await file.arrayBuffer());
      const vf = `scale=w='min(1280,iw)':h=-2,pad=ceil(iw/2)*2:ceil((iw*${target.h}/${target.w})/2)*2:(ow-iw)/2:(oh-ih)/2:color=black`;
      const data = await run([{ name: inputName, data: buffer }], ["-i", inputName, "-vf", vf, "-c:v", "libx264", "-pix_fmt", "yuv420p", "-c:a", "copy", outputName], outputName);
      const blob = new Blob([data as BlobPart], { type: "video/mp4" });
      return { blob, name: `${stripMediaExtension(file.name)}-${ratio.replace(":", "x")}.mp4` };
    },
    [ratio, run]
  );

  const { items, addFiles, removeItem } = useBatchFiles(convert);

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <BatchUploadZone accept="video/*" onFilesSelect={addFiles} label="Drop videos to change the aspect ratio of" />

      <div className="mt-4">
        <Label className="text-sm text-muted-foreground">Target aspect ratio</Label>
        <Select value={ratio} onValueChange={(v) => v && setRatio(v)}>
          <SelectTrigger className="mt-1.5 w-52">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {RATIOS.map((r) => (
              <SelectItem key={r.value} value={r.value}>{r.label}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <p className="mt-2 text-xs text-muted-foreground">
        Fits each original video inside the new aspect ratio and adds black letterbox/pillarbox
        bars to fill the rest, rather than cropping or stretching content out of proportion.
      </p>

      <BatchFileList items={items} onRemove={removeItem} zipName="resized-videos.zip" />
    </div>
  );
}

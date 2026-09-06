"use client";

import * as React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { BatchUploadZone } from "@/components/tools/batch-upload-zone";
import { BatchFileList } from "@/components/tools/batch-file-list";
import { useBatchFiles } from "@/lib/use-batch-files";
import { useFfmpegJob } from "@/lib/use-ffmpeg-job";
import { pickInputName, pickUniqueName } from "@/lib/ffmpeg-setup";
import { stripMediaExtension } from "@/lib/media-helpers";

export function GifMakerFromVideo() {
  const [start, setStart] = React.useState(0);
  const [duration, setDuration] = React.useState(3);
  const [fps, setFps] = React.useState(10);
  const [width, setWidth] = React.useState(480);
  const { run } = useFfmpegJob();

  const convert = React.useCallback(
    async (file: File) => {
      const inputName = pickInputName(file);
      const outputName = pickUniqueName("gif");
      const buffer = new Uint8Array(await file.arrayBuffer());
      const data = await run(
        [{ name: inputName, data: buffer }],
        [
          "-ss", String(start),
          "-t", String(duration),
          "-i", inputName,
          "-vf", `fps=${fps},scale=${width}:-1:flags=lanczos,split[s0][s1];[s0]palettegen[p];[s1][p]paletteuse`,
          "-loop", "0",
          outputName,
        ],
        outputName
      );
      const blob = new Blob([data as BlobPart], { type: "image/gif" });
      return { blob, name: `${stripMediaExtension(file.name)}.gif` };
    },
    [start, duration, fps, width, run]
  );

  const { items, addFiles, removeItem } = useBatchFiles(convert);

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <BatchUploadZone accept="video/*" onFilesSelect={addFiles} label="Drop videos to turn into GIFs" />

      <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <div>
          <Label className="text-xs text-muted-foreground">Start (sec)</Label>
          <Input type="number" min={0} value={start} onChange={(e) => setStart(Number(e.target.value))} className="mt-1" />
        </div>
        <div>
          <Label className="text-xs text-muted-foreground">Duration (sec)</Label>
          <Input type="number" min={1} max={15} value={duration} onChange={(e) => setDuration(Number(e.target.value))} className="mt-1" />
        </div>
        <div>
          <Label className="text-xs text-muted-foreground">FPS</Label>
          <Input type="number" min={2} max={30} value={fps} onChange={(e) => setFps(Number(e.target.value))} className="mt-1" />
        </div>
        <div>
          <Label className="text-xs text-muted-foreground">Width (px)</Label>
          <Input type="number" min={64} max={1280} value={width} onChange={(e) => setWidth(Number(e.target.value))} className="mt-1" />
        </div>
      </div>
      <p className="mt-2 text-xs text-muted-foreground">
        The same start time and duration are used for every video you add — keep it short, a 3-5
        second clip already produces a reasonably sized GIF.
      </p>

      <BatchFileList items={items} onRemove={removeItem} zipName="video-gifs.zip" />
    </div>
  );
}

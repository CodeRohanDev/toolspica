"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { RotateCw } from "lucide-react";
import { BatchUploadZone } from "@/components/tools/batch-upload-zone";
import { BatchFileList } from "@/components/tools/batch-file-list";
import { useBatchFiles } from "@/lib/use-batch-files";
import { useFfmpegJob } from "@/lib/use-ffmpeg-job";
import { pickUniqueName } from "@/lib/ffmpeg-setup";
import { stripMediaExtension } from "@/lib/media-helpers";

const ROTATIONS: Record<number, string> = {
  90: "transpose=1",
  180: "transpose=1,transpose=1",
  270: "transpose=2",
};

export function VideoRotator() {
  const [angle, setAngle] = React.useState(90);
  const { run } = useFfmpegJob();

  const convert = React.useCallback(
    async (file: File) => {
      const inputName = pickUniqueName("mp4");
      const outputName = pickUniqueName("mp4");
      const buffer = new Uint8Array(await file.arrayBuffer());
      const data = await run([{ name: inputName, data: buffer }], ["-i", inputName, "-vf", ROTATIONS[angle], "-c:v", "libx264", "-pix_fmt", "yuv420p", "-c:a", "copy", outputName], outputName);
      const blob = new Blob([data as BlobPart], { type: "video/mp4" });
      return { blob, name: `${stripMediaExtension(file.name)}-rotated.mp4` };
    },
    [angle, run]
  );

  const { items, addFiles, removeItem } = useBatchFiles(convert);

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <BatchUploadZone accept="video/*" onFilesSelect={addFiles} label="Drop videos to rotate" />

      <div className="mt-4 flex gap-2">
        {[90, 180, 270].map((deg) => (
          <Button key={deg} type="button" variant={angle === deg ? "default" : "outline"} size="sm" onClick={() => setAngle(deg)}>
            <RotateCw className="size-3.5" /> {deg}°
          </Button>
        ))}
      </div>
      <p className="mt-2 text-xs text-muted-foreground">
        Fixes a sideways video from a phone recorded in the wrong orientation — width and height
        swap for 90°/270° rotations.
      </p>

      <BatchFileList items={items} onRemove={removeItem} zipName="rotated-videos.zip" />
    </div>
  );
}

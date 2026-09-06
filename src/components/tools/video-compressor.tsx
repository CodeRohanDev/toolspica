"use client";

import * as React from "react";
import { Label } from "@/components/ui/label";
import { BatchUploadZone } from "@/components/tools/batch-upload-zone";
import { BatchFileList } from "@/components/tools/batch-file-list";
import { useBatchFiles } from "@/lib/use-batch-files";
import { useFfmpegJob } from "@/lib/use-ffmpeg-job";
import { pickUniqueName } from "@/lib/ffmpeg-setup";
import { stripMediaExtension } from "@/lib/media-helpers";

export function VideoCompressor() {
  const [crf, setCrf] = React.useState(28);
  const { run } = useFfmpegJob();

  const convert = React.useCallback(
    async (file: File) => {
      const inputName = pickUniqueName("mp4");
      const outputName = pickUniqueName("mp4");
      const buffer = new Uint8Array(await file.arrayBuffer());
      const data = await run(
        [{ name: inputName, data: buffer }],
        ["-i", inputName, "-c:v", "libx264", "-crf", String(crf), "-preset", "veryfast", "-pix_fmt", "yuv420p", "-c:a", "aac", "-b:a", "128k", outputName],
        outputName
      );
      const blob = new Blob([data as BlobPart], { type: "video/mp4" });
      return { blob, name: `${stripMediaExtension(file.name)}-compressed.mp4` };
    },
    [crf, run]
  );

  const { items, addFiles, removeItem } = useBatchFiles(convert);

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <BatchUploadZone accept="video/*" onFilesSelect={addFiles} label="Drop videos to compress" />

      <div className="mt-4 flex items-center gap-3">
        <Label htmlFor="crf" className="shrink-0 text-sm text-muted-foreground">
          Compression ({crf < 24 ? "high quality" : crf < 32 ? "balanced" : "smallest file"})
        </Label>
        <input id="crf" type="range" min={18} max={40} value={crf} onChange={(e) => setCrf(Number(e.target.value))} className="flex-1" />
      </div>
      <p className="mt-2 text-xs text-muted-foreground">
        Re-encodes with H.264 at a quality level you choose (CRF) — lower CRF means higher quality
        and a larger file, higher CRF means smaller file at reduced visual quality.
      </p>

      <BatchFileList items={items} onRemove={removeItem} zipName="compressed-videos.zip" />
    </div>
  );
}

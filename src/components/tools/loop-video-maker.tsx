"use client";

import * as React from "react";
import { Label } from "@/components/ui/label";
import { BatchUploadZone } from "@/components/tools/batch-upload-zone";
import { BatchFileList } from "@/components/tools/batch-file-list";
import { useBatchFiles } from "@/lib/use-batch-files";
import { useFfmpegJob } from "@/lib/use-ffmpeg-job";
import { pickUniqueName } from "@/lib/ffmpeg-setup";
import { stripMediaExtension } from "@/lib/media-helpers";

export function LoopVideoMaker() {
  const [repeats, setRepeats] = React.useState(3);
  const { run } = useFfmpegJob();

  const convert = React.useCallback(
    async (file: File) => {
      const inputName = pickUniqueName("mp4");
      const outputName = pickUniqueName("mp4");
      const buffer = new Uint8Array(await file.arrayBuffer());
      const data = await run([{ name: inputName, data: buffer }], ["-stream_loop", String(repeats - 1), "-i", inputName, "-c", "copy", outputName], outputName);
      const blob = new Blob([data as BlobPart], { type: "video/mp4" });
      return { blob, name: `${stripMediaExtension(file.name)}-looped.mp4` };
    },
    [repeats, run]
  );

  const { items, addFiles, removeItem } = useBatchFiles(convert);

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <BatchUploadZone accept="video/*" onFilesSelect={addFiles} label="Drop videos to loop" />

      <div className="mt-4 flex items-center gap-3">
        <Label htmlFor="loop-count" className="shrink-0 text-sm text-muted-foreground">Repeat ({repeats}x)</Label>
        <input id="loop-count" type="range" min={2} max={20} value={repeats} onChange={(e) => setRepeats(Number(e.target.value))} className="flex-1" />
      </div>
      <p className="mt-2 text-xs text-muted-foreground">
        Repeats each clip back-to-back without re-encoding, so this is fast and there&apos;s no
        quality loss from the looping itself.
      </p>

      <BatchFileList items={items} onRemove={removeItem} zipName="looped-videos.zip" />
    </div>
  );
}

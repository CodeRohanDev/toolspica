"use client";

import * as React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { ImageBatchWorkspace } from "@/components/tools/image-batch-workspace";
import { useBatchFiles } from "@/lib/use-batch-files";
import { useFfmpegJob } from "@/lib/use-ffmpeg-job";
import { pickUniqueName } from "@/lib/ffmpeg-setup";
import { stripMediaExtension } from "@/lib/media-helpers";

export function GifResizer() {
  const [width, setWidth] = React.useState(320);
  const { run } = useFfmpegJob();

  const convert = React.useCallback(
    async (file: File) => {
      const inputName = pickUniqueName("gif");
      const outputName = pickUniqueName("gif");
      const buffer = new Uint8Array(await file.arrayBuffer());
      const data = await run(
        [{ name: inputName, data: buffer }],
        [
          "-i", inputName,
          "-vf", `scale=${width}:-1:flags=lanczos,split[s0][s1];[s0]palettegen[p];[s1][p]paletteuse`,
          "-loop", "0",
          outputName,
        ],
        outputName
      );
      const blob = new Blob([data as BlobPart], { type: "image/gif" });
      return { blob, name: `${stripMediaExtension(file.name)}-resized.gif` };
    },
    [width, run]
  );

  const { items, addFiles, removeItem } = useBatchFiles(convert, { live: true });

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <ImageBatchWorkspace
        items={items}
        onFilesSelect={addFiles}
        onRemove={removeItem}
        accept="image/gif"
        uploadLabel="Drop GIFs to resize"
        zipName="resized-gifs.zip"
      />

      <div className="mt-4 flex items-center gap-3">
        <Label htmlFor="width" className="shrink-0 text-sm text-muted-foreground">
          Target width (px)
        </Label>
        <Input id="width" type="number" min={16} max={1920} value={width} onChange={(e) => setWidth(Number(e.target.value))} className="w-28" />
      </div>
      <p className="mt-2 text-xs text-muted-foreground">
        Height scales automatically to preserve each GIF&apos;s original aspect ratio. Files process
        one at a time, in order.
      </p>
    </div>
  );
}

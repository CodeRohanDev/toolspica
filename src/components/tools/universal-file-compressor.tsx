"use client";

import * as React from "react";
import { BatchUploadZone } from "@/components/tools/batch-upload-zone";
import { BatchFileList } from "@/components/tools/batch-file-list";
import { useBatchFiles } from "@/lib/use-batch-files";

export function UniversalFileCompressor() {
  const convert = React.useCallback(async (file: File) => {
    const stream = file.stream().pipeThrough(new CompressionStream("gzip"));
    const buffer = await new Response(stream).arrayBuffer();
    const blob = new Blob([buffer], { type: "application/gzip" });
    return { blob, name: `${file.name}.gz` };
  }, []);

  const { items, addFiles, removeItem } = useBatchFiles(convert);

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <BatchUploadZone onFilesSelect={addFiles} label="Drop any files to compress" />

      <BatchFileList items={items} onRemove={removeItem} zipName="compressed-files.zip" />

      <p className="mt-3 text-xs text-muted-foreground">
        Works on any file type using your browser&apos;s native GZIP compression — no library, no
        upload. How much it shrinks depends entirely on the file&apos;s content (already-compressed
        files like JPGs or MP4s won&apos;t shrink much further).
      </p>
    </div>
  );
}

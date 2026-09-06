"use client";

import * as React from "react";
import { BatchUploadZone } from "@/components/tools/batch-upload-zone";
import { BatchFileList } from "@/components/tools/batch-file-list";
import { useBatchFiles } from "@/lib/use-batch-files";
import { stripMediaExtension } from "@/lib/media-helpers";

export function GzipExtractor() {
  const convert = React.useCallback(async (file: File) => {
    const stream = file.stream().pipeThrough(new DecompressionStream("gzip"));
    const buffer = await new Response(stream).arrayBuffer();
    const blob = new Blob([buffer], { type: "application/octet-stream" });
    return { blob, name: stripMediaExtension(file.name) };
  }, []);

  const { items, addFiles, removeItem } = useBatchFiles(convert);

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <BatchUploadZone accept=".gz,application/gzip" onFilesSelect={addFiles} label="Drop GZIP files to extract" />

      <BatchFileList items={items} onRemove={removeItem} zipName="extracted-files.zip" />

      <p className="mt-3 text-xs text-muted-foreground">
        Uses your browser&apos;s native decompression API — no library needed, no upload. GZIP
        compresses a single file, so extraction produces one file back per archive.
      </p>
    </div>
  );
}

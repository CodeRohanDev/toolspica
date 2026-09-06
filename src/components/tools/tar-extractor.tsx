"use client";

import * as React from "react";
import { BatchUploadZone } from "@/components/tools/batch-upload-zone";
import { BatchFileList } from "@/components/tools/batch-file-list";
import { useBatchFiles } from "@/lib/use-batch-files";
import { extractArchive } from "@/lib/sevenzip-setup";
import { createZip } from "@/lib/zip-writer";
import { stripMediaExtension } from "@/lib/media-helpers";

export function TarExtractor() {
  const convert = React.useCallback(async (file: File) => {
    const buffer = new Uint8Array(await file.arrayBuffer());
    const entries = await extractArchive(buffer, "in.tar");
    if (entries.length === 0) throw new Error("No files found — this may not be a valid TAR archive.");
    const zip = createZip(entries);
    const blob = new Blob([zip as BlobPart], { type: "application/zip" });
    return { blob, name: `${stripMediaExtension(file.name)}-extracted.zip` };
  }, []);

  const { items, addFiles, removeItem } = useBatchFiles(convert);

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <BatchUploadZone accept=".tar" onFilesSelect={addFiles} label="Drop TAR files to extract" />

      <BatchFileList items={items} onRemove={removeItem} zipName="extracted-archives.zip" />

      <p className="mt-3 text-xs text-muted-foreground">
        Uses a real 7-Zip build compiled to WebAssembly to read each TAR archive, entirely in your
        browser. Extracted files bundle into a ZIP for easy download.
      </p>
    </div>
  );
}

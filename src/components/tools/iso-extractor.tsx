"use client";

import * as React from "react";
import { BatchUploadZone } from "@/components/tools/batch-upload-zone";
import { BatchFileList } from "@/components/tools/batch-file-list";
import { useBatchFiles } from "@/lib/use-batch-files";
import { extractArchive } from "@/lib/sevenzip-setup";
import { createZip } from "@/lib/zip-writer";
import { stripMediaExtension } from "@/lib/media-helpers";

export function IsoExtractor() {
  const convert = React.useCallback(async (file: File) => {
    const buffer = new Uint8Array(await file.arrayBuffer());
    const entries = await extractArchive(buffer, "in.iso");
    if (entries.length === 0) throw new Error("No files found — this may not be a valid ISO file.");
    const zip = createZip(entries);
    const blob = new Blob([zip as BlobPart], { type: "application/zip" });
    return { blob, name: `${stripMediaExtension(file.name)}-extracted.zip` };
  }, []);

  const { items, addFiles, removeItem } = useBatchFiles(convert);

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <BatchUploadZone accept=".iso" onFilesSelect={addFiles} label="Drop ISO disc images to extract" />

      <BatchFileList items={items} onRemove={removeItem} zipName="extracted-archives.zip" />

      <p className="mt-3 text-xs text-muted-foreground">
        Reads each ISO 9660 disc image entirely in your browser using a real 7-Zip build compiled
        to WebAssembly. Large ISOs (multi-gigabyte disc images) may use significant browser
        memory.
      </p>
    </div>
  );
}

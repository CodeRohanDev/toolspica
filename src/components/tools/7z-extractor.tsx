"use client";

import * as React from "react";
import { BatchUploadZone } from "@/components/tools/batch-upload-zone";
import { BatchFileList } from "@/components/tools/batch-file-list";
import { useBatchFiles } from "@/lib/use-batch-files";
import { extractArchive } from "@/lib/sevenzip-setup";
import { createZip } from "@/lib/zip-writer";
import { stripMediaExtension } from "@/lib/media-helpers";

export function SevenZExtractor() {
  const convert = React.useCallback(async (file: File) => {
    const buffer = new Uint8Array(await file.arrayBuffer());
    const entries = await extractArchive(buffer, "in.7z");
    if (entries.length === 0) throw new Error("No files found — this may not be a valid 7Z archive.");
    const zip = createZip(entries);
    const blob = new Blob([zip as BlobPart], { type: "application/zip" });
    return { blob, name: `${stripMediaExtension(file.name)}-extracted.zip` };
  }, []);

  const { items, addFiles, removeItem } = useBatchFiles(convert);

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <BatchUploadZone accept=".7z" onFilesSelect={addFiles} label="Drop 7Z files to extract" />

      <BatchFileList items={items} onRemove={removeItem} zipName="extracted-archives.zip" />

      <p className="mt-3 text-xs text-muted-foreground">
        Uses a real 7-Zip build compiled to WebAssembly, the same engine behind the desktop 7-Zip
        app, running entirely in your browser. Password-protected 7Z files aren&apos;t supported
        here.
      </p>
    </div>
  );
}

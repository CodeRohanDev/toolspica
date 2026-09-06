"use client";

import * as React from "react";
import { BatchUploadZone } from "@/components/tools/batch-upload-zone";
import { BatchFileList } from "@/components/tools/batch-file-list";
import { useBatchFiles } from "@/lib/use-batch-files";
import { readZip } from "@/lib/pdf/zip-reader";
import { createZip } from "@/lib/zip-writer";
import { stripMediaExtension } from "@/lib/media-helpers";

export function ZipExtractor() {
  const convert = React.useCallback(async (file: File) => {
    const bytes = new Uint8Array(await file.arrayBuffer());
    const zipEntries = await readZip(bytes);
    const entries = await Promise.all(
      zipEntries
        .filter((e) => !e.name.endsWith("/"))
        .map(async (e) => ({ name: e.name, data: await e.getData() }))
    );
    if (entries.length === 0) throw new Error("No files found — this may not be a valid ZIP file.");
    const zip = createZip(entries);
    const blob = new Blob([zip as BlobPart], { type: "application/zip" });
    return { blob, name: `${stripMediaExtension(file.name)}-extracted.zip` };
  }, []);

  const { items, addFiles, removeItem } = useBatchFiles(convert);

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <BatchUploadZone accept=".zip,application/zip" onFilesSelect={addFiles} label="Drop ZIP files to extract" />

      <BatchFileList items={items} onRemove={removeItem} zipName="extracted-archives.zip" />

      <p className="mt-3 text-xs text-muted-foreground">
        Reads each ZIP&apos;s contents directly in your browser (supports both stored and
        DEFLATE-compressed entries) and repackages them for download — nothing is uploaded.
      </p>
    </div>
  );
}

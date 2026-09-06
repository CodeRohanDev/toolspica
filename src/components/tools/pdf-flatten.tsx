"use client";

import * as React from "react";
import { PDFDocument } from "pdf-lib";
import { BatchUploadZone } from "@/components/tools/batch-upload-zone";
import { BatchFileList } from "@/components/tools/batch-file-list";
import { useBatchFiles } from "@/lib/use-batch-files";
import { stripPdfExtension } from "@/lib/pdf/pdf-helpers";

export function PdfFlatten() {
  const convert = React.useCallback(async (file: File) => {
    const bytes = await file.arrayBuffer();
    const doc = await PDFDocument.load(bytes);
    const form = doc.getForm();
    form.flatten();
    const outBytes = await doc.save();
    const blob = new Blob([outBytes as BlobPart], { type: "application/pdf" });
    return { blob, name: `${stripPdfExtension(file.name)}-flattened.pdf` };
  }, []);

  const { items, addFiles, removeItem } = useBatchFiles(convert);

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <BatchUploadZone accept="application/pdf,.pdf" onFilesSelect={addFiles} label="Drop PDFs to flatten form fields in" />

      <BatchFileList items={items} onRemove={removeItem} zipName="flattened-pdfs.zip" />

      <p className="mt-3 text-xs text-muted-foreground">
        Turns fillable form fields (and their currently entered values) into permanent, static
        page content — the form can no longer be edited or filled in afterward. PDFs with no
        fillable fields pass through unchanged.
      </p>
    </div>
  );
}

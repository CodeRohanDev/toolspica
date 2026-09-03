"use client";

import * as React from "react";
import { PDFDocument } from "pdf-lib";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { PdfUploadZone } from "@/components/tools/pdf-upload-zone";
import { downloadPdfBytes, stripPdfExtension } from "@/lib/pdf/pdf-helpers";

export function PdfFlatten() {
  const [file, setFile] = React.useState<File | null>(null);
  const [fieldCount, setFieldCount] = React.useState<number | null>(null);
  const [processing, setProcessing] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  async function handleFile(picked: File) {
    setFile(picked);
    setError(null);
    setFieldCount(null);
    try {
      const bytes = await picked.arrayBuffer();
      const doc = await PDFDocument.load(bytes);
      const form = doc.getForm();
      setFieldCount(form.getFields().length);
    } catch {
      setError("Couldn't read this PDF — it may be corrupted or password-protected.");
    }
  }

  async function apply() {
    if (!file) return;
    setProcessing(true);
    setError(null);
    try {
      const bytes = await file.arrayBuffer();
      const doc = await PDFDocument.load(bytes);
      const form = doc.getForm();
      form.flatten();
      const outBytes = await doc.save();
      downloadPdfBytes(outBytes, `${stripPdfExtension(file.name)}-flattened.pdf`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Couldn't flatten this PDF's form fields.");
    } finally {
      setProcessing(false);
    }
  }

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <PdfUploadZone file={file} onFileSelect={handleFile} onClear={() => setFile(null)} />

      {file && fieldCount !== null && (
        <p className="mt-3 text-sm text-muted-foreground">
          {fieldCount > 0
            ? `Found ${fieldCount} fillable form field${fieldCount === 1 ? "" : "s"}.`
            : "This PDF has no fillable form fields to flatten."}
        </p>
      )}

      {error && <p className="mt-3 text-sm text-destructive">{error}</p>}

      <Button type="button" className="mt-4" onClick={apply} disabled={!file || processing || fieldCount === 0}>
        <Download className="size-4" />
        {processing ? "Flattening..." : "Flatten and download"}
      </Button>
      <p className="mt-2 text-xs text-muted-foreground">
        Turns fillable form fields (and their currently entered values) into permanent, static
        page content — the form can no longer be edited or filled in afterward.
      </p>
    </div>
  );
}

"use client";

import * as React from "react";
import { PDFDocument } from "pdf-lib";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Download } from "lucide-react";
import { PdfUploadZone } from "@/components/tools/pdf-upload-zone";
import { downloadPdfBytes, stripPdfExtension } from "@/lib/pdf/pdf-helpers";

interface Meta {
  title: string;
  author: string;
  subject: string;
  keywords: string;
}

export function PdfMetadataEditor() {
  const [file, setFile] = React.useState<File | null>(null);
  const [doc, setDoc] = React.useState<PDFDocument | null>(null);
  const [meta, setMeta] = React.useState<Meta>({ title: "", author: "", subject: "", keywords: "" });
  const [processing, setProcessing] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  async function handleFile(picked: File) {
    setFile(picked);
    setError(null);
    try {
      const bytes = await picked.arrayBuffer();
      const loaded = await PDFDocument.load(bytes);
      setDoc(loaded);
      setMeta({
        title: loaded.getTitle() ?? "",
        author: loaded.getAuthor() ?? "",
        subject: loaded.getSubject() ?? "",
        keywords: (loaded.getKeywords() ?? "").toString(),
      });
    } catch {
      setError("Couldn't read this PDF — it may be corrupted or password-protected.");
    }
  }

  async function apply() {
    if (!file || !doc) return;
    setProcessing(true);
    setError(null);
    try {
      doc.setTitle(meta.title);
      doc.setAuthor(meta.author);
      doc.setSubject(meta.subject);
      doc.setKeywords(meta.keywords.split(",").map((k) => k.trim()).filter(Boolean));
      doc.setModificationDate(new Date());
      const outBytes = await doc.save();
      downloadPdfBytes(outBytes, `${stripPdfExtension(file.name)}-metadata.pdf`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Couldn't update metadata.");
    } finally {
      setProcessing(false);
    }
  }

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      {!file && <PdfUploadZone file={file} onFileSelect={handleFile} onClear={() => setFile(null)} />}

      {file && doc && (
        <>
          <div className="flex items-center justify-between">
            <p className="text-sm">{file.name}</p>
            <Button type="button" variant="outline" size="sm" onClick={() => setFile(null)}>
              Choose a different file
            </Button>
          </div>

          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {[
              { key: "title" as const, label: "Title" },
              { key: "author" as const, label: "Author" },
              { key: "subject" as const, label: "Subject" },
              { key: "keywords" as const, label: "Keywords (comma-separated)" },
            ].map((field) => (
              <div key={field.key}>
                <Label htmlFor={`meta-${field.key}`} className="text-sm text-muted-foreground">
                  {field.label}
                </Label>
                <Input
                  id={`meta-${field.key}`}
                  value={meta[field.key]}
                  onChange={(e) => setMeta((m) => ({ ...m, [field.key]: e.target.value }))}
                  className="mt-1.5"
                />
              </div>
            ))}
          </div>

          {error && <p className="mt-3 text-sm text-destructive">{error}</p>}

          <Button type="button" className="mt-4" onClick={apply} disabled={processing}>
            <Download className="size-4" />
            {processing ? "Saving..." : "Save metadata and download"}
          </Button>
        </>
      )}
    </div>
  );
}

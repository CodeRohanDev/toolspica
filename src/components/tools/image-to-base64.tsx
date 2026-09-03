"use client";

import * as React from "react";
import { Textarea } from "@/components/ui/textarea";
import { ImageUploadCard } from "@/components/tools/image-upload-card";
import { CopyButton } from "@/components/tools/copy-button";
import { formatBytes } from "@/lib/image-processing";

export function ImageToBase64() {
  const [file, setFile] = React.useState<File | null>(null);
  const [originalUrl, setOriginalUrl] = React.useState<string | null>(null);
  const [base64, setBase64] = React.useState("");

  function handleFile(picked: File) {
    setFile(picked);
    setOriginalUrl(URL.createObjectURL(picked));
    const reader = new FileReader();
    reader.onload = () => setBase64(reader.result as string);
    reader.readAsDataURL(picked);
  }

  function clear() {
    setFile(null);
    setOriginalUrl(null);
    setBase64("");
  }

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <ImageUploadCard file={file} previewUrl={originalUrl} onFileSelect={handleFile} onClear={clear} />
        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
            Base64 (data URI)
          </p>
          <Textarea
            readOnly
            value={base64}
            placeholder="Base64 output appears here after you upload an image"
            rows={10}
            className="mt-2 resize-none bg-muted/40 font-mono text-xs"
          />
        </div>
      </div>

      {base64 && (
        <div className="mt-4 flex items-center justify-between border-t pt-4">
          <p className="text-xs text-muted-foreground">
            {file && `${formatBytes(file.size)} → `}
            {formatBytes(base64.length)} as text ({base64.length.toLocaleString()} characters)
          </p>
          <CopyButton value={base64} />
        </div>
      )}
    </div>
  );
}

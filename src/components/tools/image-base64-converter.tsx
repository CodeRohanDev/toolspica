"use client";

import * as React from "react";
import { Textarea } from "@/components/ui/textarea";
import { ImageUploadCard } from "@/components/tools/image-upload-card";
import { ImageResultCard } from "@/components/tools/image-result-card";
import { CopyButton } from "@/components/tools/copy-button";
import { formatBytes, downloadBlob } from "@/lib/image-processing";

function guessExtension(dataUri: string): string {
  const match = dataUri.match(/^data:image\/(\w+);base64,/);
  return match ? match[1] : "png";
}

export function ImageBase64Converter() {
  const [file, setFile] = React.useState<File | null>(null);
  const [originalUrl, setOriginalUrl] = React.useState<string | null>(null);
  const [base64, setBase64] = React.useState("");

  const [decodeInput, setDecodeInput] = React.useState("");
  const [resultUrl, setResultUrl] = React.useState<string | null>(null);
  const [decodeError, setDecodeError] = React.useState<string | null>(null);
  const [ext, setExt] = React.useState("png");

  function handleFile(picked: File) {
    setFile(picked);
    setOriginalUrl(URL.createObjectURL(picked));
    const reader = new FileReader();
    reader.onload = () => setBase64(reader.result as string);
    reader.readAsDataURL(picked);
  }

  function clearEncode() {
    setFile(null);
    setOriginalUrl(null);
    setBase64("");
  }

  React.useEffect(() => {
    const trimmed = decodeInput.trim();
    if (!trimmed) {
      Promise.resolve().then(() => {
        setResultUrl(null);
        setDecodeError(null);
      });
      return;
    }
    const dataUri = trimmed.startsWith("data:") ? trimmed : `data:image/png;base64,${trimmed}`;

    const img = new Image();
    img.onload = () => {
      setResultUrl(dataUri);
      setExt(guessExtension(dataUri));
      setDecodeError(null);
    };
    img.onerror = () => {
      setResultUrl(null);
      setDecodeError("Couldn't decode this as a valid image — check the Base64 string is complete and correct.");
    };
    img.src = dataUri;
  }, [decodeInput]);

  async function handleDownload() {
    if (!resultUrl) return;
    const res = await fetch(resultUrl);
    const blob = await res.blob();
    downloadBlob(blob, `decoded-image.${ext}`);
  }

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div className="rounded-xl border bg-card p-5 sm:p-6">
        <p className="text-sm font-semibold">Image to Base64</p>
        <div className="mt-3 grid gap-4 sm:grid-cols-2">
          <ImageUploadCard file={file} previewUrl={originalUrl} onFileSelect={handleFile} onClear={clearEncode} />
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Base64 (data URI)</p>
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

      <div className="rounded-xl border bg-card p-5 sm:p-6">
        <p className="text-sm font-semibold">Base64 to Image</p>
        <div className="mt-3 grid gap-4 sm:grid-cols-2">
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Base64 or data URI</p>
            <Textarea
              value={decodeInput}
              onChange={(e) => setDecodeInput(e.target.value)}
              placeholder="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA..."
              rows={10}
              className="mt-2 resize-y font-mono text-xs"
            />
            {decodeError && <p className="mt-2 text-sm text-destructive">{decodeError}</p>}
          </div>
          <ImageResultCard previewUrl={resultUrl} onDownload={handleDownload} placeholder="Paste a Base64 image string to preview it here" />
        </div>
      </div>
    </div>
  );
}

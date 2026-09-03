"use client";

import * as React from "react";
import { Textarea } from "@/components/ui/textarea";
import { ImageResultCard } from "@/components/tools/image-result-card";
import { downloadBlob } from "@/lib/image-processing";

function guessExtension(dataUri: string): string {
  const match = dataUri.match(/^data:image\/(\w+);base64,/);
  return match ? match[1] : "png";
}

export function Base64ToImage() {
  const [input, setInput] = React.useState("");
  const [resultUrl, setResultUrl] = React.useState<string | null>(null);
  const [error, setError] = React.useState<string | null>(null);
  const [ext, setExt] = React.useState("png");

  React.useEffect(() => {
    const trimmed = input.trim();
    if (!trimmed) {
      setResultUrl(null);
      setError(null);
      return;
    }
    const dataUri = trimmed.startsWith("data:")
      ? trimmed
      : `data:image/png;base64,${trimmed}`;

    const img = new Image();
    img.onload = () => {
      setResultUrl(dataUri);
      setExt(guessExtension(dataUri));
      setError(null);
    };
    img.onerror = () => {
      setResultUrl(null);
      setError("Couldn't decode this as a valid image — check the Base64 string is complete and correct.");
    };
    img.src = dataUri;
  }, [input]);

  async function handleDownload() {
    if (!resultUrl) return;
    const res = await fetch(resultUrl);
    const blob = await res.blob();
    downloadBlob(blob, `decoded-image.${ext}`);
  }

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
            Base64 or data URI
          </p>
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA..."
            rows={10}
            className="mt-2 resize-y font-mono text-xs"
          />
          {error && <p className="mt-2 text-sm text-destructive">{error}</p>}
        </div>
        <ImageResultCard
          previewUrl={resultUrl}
          onDownload={handleDownload}
          placeholder="Paste a Base64 image string to preview it here"
        />
      </div>
    </div>
  );
}

"use client";

import * as React from "react";
import { Upload } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

export function FontFilePreviewer() {
  const [fontFamily, setFontFamily] = React.useState<string | null>(null);
  const [fileName, setFileName] = React.useState("");
  const [error, setError] = React.useState("");
  const [text, setText] = React.useState("The quick brown fox jumps over the lazy dog. 0123456789");
  const [size, setSize] = React.useState(36);

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setFileName(file.name);
    setError("");
    setFontFamily(null);
    try {
      const buffer = await file.arrayBuffer();
      const family = `uploaded-font-${Date.now()}`;
      const fontFace = new FontFace(family, buffer);
      await fontFace.load();
      document.fonts.add(fontFace);
      setFontFamily(family);
    } catch {
      setError("Couldn't load that font file — make sure it's a valid .ttf, .otf, or .woff file.");
    }
  }

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <label className="flex w-fit cursor-pointer items-center gap-2 rounded-md border px-3 py-2 text-sm hover:bg-accent">
        <Upload className="size-4" />
        {fileName || "Upload a font file (.ttf, .otf, .woff, .woff2)"}
        <input type="file" accept=".ttf,.otf,.woff,.woff2" onChange={handleUpload} className="hidden" />
      </label>

      {error && <p className="mt-3 text-sm text-destructive">{error}</p>}

      {fontFamily && (
        <>
          <Textarea value={text} onChange={(e) => setText(e.target.value)} rows={4} className="mt-3 resize-y" />
          <Label className="mt-3 flex items-center gap-2 text-sm text-muted-foreground">
            Size: {size}px
            <input type="range" min={12} max={96} value={size} onChange={(e) => setSize(Number(e.target.value))} className="flex-1" />
          </Label>
          <div className="mt-3 overflow-auto rounded-lg border p-6">
            <p style={{ fontFamily, fontSize: size }}>{text || "Type something to preview"}</p>
          </div>
        </>
      )}
      <p className="mt-3 text-xs text-muted-foreground">
        Uses your browser&apos;s native font-loading API to render the actual font file — no
        conversion or upload involved.
      </p>
    </div>
  );
}

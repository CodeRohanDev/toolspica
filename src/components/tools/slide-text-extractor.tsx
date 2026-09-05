"use client";

import * as React from "react";
import JSZip from "jszip";
import { Textarea } from "@/components/ui/textarea";
import { CopyButton } from "@/components/tools/copy-button";
import { Upload } from "lucide-react";

async function extractSlideText(file: File): Promise<string> {
  const zip = await JSZip.loadAsync(file);
  const slideFiles = Object.keys(zip.files)
    .filter((name) => /^ppt\/slides\/slide\d+\.xml$/.test(name))
    .sort((a, b) => {
      const na = Number(a.match(/slide(\d+)\.xml/)?.[1] ?? 0);
      const nb = Number(b.match(/slide(\d+)\.xml/)?.[1] ?? 0);
      return na - nb;
    });

  if (slideFiles.length === 0) throw new Error("No slides found — is this a valid .pptx file?");

  const parser = new DOMParser();
  const slideTexts: string[] = [];

  for (let i = 0; i < slideFiles.length; i++) {
    const xml = await zip.file(slideFiles[i])!.async("string");
    const doc = parser.parseFromString(xml, "application/xml");
    const textNodes = Array.from(doc.getElementsByTagName("a:t"));
    const text = textNodes.map((n) => n.textContent ?? "").join(" ").trim();
    slideTexts.push(`--- Slide ${i + 1} ---\n${text || "(no text)"}`);
  }

  return slideTexts.join("\n\n");
}

export function SlideTextExtractor() {
  const [text, setText] = React.useState("");
  const [fileName, setFileName] = React.useState("");
  const [error, setError] = React.useState("");

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setError("");
    setFileName(file.name);
    try {
      setText(await extractSlideText(file));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Couldn't read that file — make sure it's a valid .pptx file.");
      setText("");
    }
  }

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <label className="flex w-fit cursor-pointer items-center gap-2 rounded-md border px-3 py-2 text-sm hover:bg-accent">
        <Upload className="size-4" />
        {fileName || "Upload a PowerPoint file (.pptx)"}
        <input type="file" accept=".pptx" onChange={handleUpload} className="hidden" />
      </label>

      {error && <p className="mt-3 text-sm text-destructive">{error}</p>}

      {text && (
        <div className="mt-5 border-t pt-4">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-muted-foreground">Extracted text</p>
            <CopyButton value={text} />
          </div>
          <Textarea readOnly value={text} rows={14} className="mt-2 resize-y bg-muted/40 text-sm" />
        </div>
      )}
    </div>
  );
}

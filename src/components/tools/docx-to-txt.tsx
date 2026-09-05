"use client";

import * as React from "react";
import JSZip from "jszip";
import { Textarea } from "@/components/ui/textarea";
import { CopyButton } from "@/components/tools/copy-button";
import { Upload } from "lucide-react";

async function extractText(file: File): Promise<string> {
  const zip = await JSZip.loadAsync(file);
  const xml = await zip.file("word/document.xml")?.async("string");
  if (!xml) throw new Error("Missing document.xml");

  const doc = new DOMParser().parseFromString(xml, "application/xml");
  const paragraphs = Array.from(doc.getElementsByTagName("w:p"));
  return paragraphs
    .map((p) =>
      Array.from(p.getElementsByTagName("w:t"))
        .map((t) => t.textContent ?? "")
        .join("")
    )
    .join("\n");
}

export function DocxToTxt() {
  const [text, setText] = React.useState("");
  const [fileName, setFileName] = React.useState("");
  const [error, setError] = React.useState("");

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setError("");
    setFileName(file.name);
    try {
      setText(await extractText(file));
    } catch {
      setError("Couldn't read that file — make sure it's a valid .docx file.");
      setText("");
    }
  }

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <label className="flex w-fit cursor-pointer items-center gap-2 rounded-md border px-3 py-2 text-sm hover:bg-accent">
        <Upload className="size-4" />
        {fileName || "Upload a Word document (.docx)"}
        <input type="file" accept=".docx" onChange={handleUpload} className="hidden" />
      </label>

      {error && <p className="mt-3 text-sm text-destructive">{error}</p>}

      {text && (
        <div className="mt-5 border-t pt-4">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-muted-foreground">Extracted text</p>
            <CopyButton value={text} />
          </div>
          <Textarea readOnly value={text} rows={12} className="mt-2 resize-y bg-muted/40 text-sm" />
        </div>
      )}
    </div>
  );
}

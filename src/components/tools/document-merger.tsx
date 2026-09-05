"use client";

import * as React from "react";
import JSZip from "jszip";
import { Document, Packer, Paragraph, HeadingLevel } from "docx";
import { Button } from "@/components/ui/button";
import { Upload, Download, GripVertical, X } from "lucide-react";

interface DocFile {
  file: File;
  id: string;
}

async function extractText(file: File): Promise<string> {
  if (file.name.toLowerCase().endsWith(".docx")) {
    const zip = await JSZip.loadAsync(file);
    const xml = await zip.file("word/document.xml")?.async("string");
    if (!xml) throw new Error(`Couldn't read ${file.name}`);
    const doc = new DOMParser().parseFromString(xml, "application/xml");
    return Array.from(doc.getElementsByTagName("w:p"))
      .map((p) => Array.from(p.getElementsByTagName("w:t")).map((t) => t.textContent ?? "").join(""))
      .join("\n");
  }
  return file.text();
}

export function DocumentMerger() {
  const [files, setFiles] = React.useState<DocFile[]>([]);
  const [error, setError] = React.useState("");
  const [merging, setMerging] = React.useState(false);

  function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const selected = Array.from(e.target.files ?? []);
    setFiles((prev) => [...prev, ...selected.map((file) => ({ file, id: `${file.name}-${Date.now()}-${Math.random()}` }))]);
  }

  function removeFile(id: string) {
    setFiles((prev) => prev.filter((f) => f.id !== id));
  }

  function move(index: number, dir: -1 | 1) {
    setFiles((prev) => {
      const next = [...prev];
      const target = index + dir;
      if (target < 0 || target >= next.length) return prev;
      [next[index], next[target]] = [next[target], next[index]];
      return next;
    });
  }

  async function merge() {
    if (files.length === 0) return;
    setError("");
    setMerging(true);
    try {
      const children: Paragraph[] = [];
      for (const { file } of files) {
        children.push(new Paragraph({ text: file.name, heading: HeadingLevel.HEADING_2 }));
        const text = await extractText(file);
        for (const line of text.split("\n")) children.push(new Paragraph(line));
        children.push(new Paragraph(""));
      }
      const doc = new Document({ sections: [{ children }] });
      const blob = await Packer.toBlob(doc);
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = "merged-document.docx";
      link.click();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Couldn't merge one of the files — make sure they're .txt or .docx.");
    } finally {
      setMerging(false);
    }
  }

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <label className="flex w-fit cursor-pointer items-center gap-2 rounded-md border px-3 py-2 text-sm hover:bg-accent">
        <Upload className="size-4" />
        Add files (.txt or .docx)
        <input type="file" accept=".txt,.docx" multiple onChange={handleUpload} className="hidden" />
      </label>

      {files.length > 0 && (
        <div className="mt-4 space-y-1.5">
          {files.map((f, i) => (
            <div key={f.id} className="flex items-center gap-2 rounded-md border bg-muted/40 px-3 py-2 text-sm">
              <GripVertical className="size-4 shrink-0 text-muted-foreground" />
              <span className="min-w-0 flex-1 truncate">{i + 1}. {f.file.name}</span>
              <button type="button" onClick={() => move(i, -1)} disabled={i === 0} className="text-xs text-muted-foreground hover:text-foreground disabled:opacity-30">
                ↑
              </button>
              <button type="button" onClick={() => move(i, 1)} disabled={i === files.length - 1} className="text-xs text-muted-foreground hover:text-foreground disabled:opacity-30">
                ↓
              </button>
              <button type="button" onClick={() => removeFile(f.id)} aria-label="Remove file">
                <X className="size-4 text-muted-foreground hover:text-destructive" />
              </button>
            </div>
          ))}
        </div>
      )}

      {error && <p className="mt-3 text-sm text-destructive">{error}</p>}

      <Button type="button" className="mt-4" onClick={merge} disabled={files.length === 0 || merging}>
        <Download className="size-4" />
        {merging ? "Merging..." : "Merge and download .docx"}
      </Button>
      <p className="mt-2 text-xs text-muted-foreground">
        Files are combined in the order shown above, each with its filename as a heading. Output
        is a single .docx file.
      </p>
    </div>
  );
}

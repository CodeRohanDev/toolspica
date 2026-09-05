"use client";

import * as React from "react";
import JSZip from "jszip";
import { Upload } from "lucide-react";

interface OdtBlock {
  type: "heading" | "paragraph" | "list-item";
  level: number;
  text: string;
}

async function parseOdt(file: File): Promise<OdtBlock[]> {
  const zip = await JSZip.loadAsync(file);
  const xml = await zip.file("content.xml")?.async("string");
  if (!xml) throw new Error("Missing content.xml — is this a valid .odt file?");

  const doc = new DOMParser().parseFromString(xml, "application/xml");
  if (doc.querySelector("parsererror")) throw new Error("Couldn't parse this document's content.");

  const body = doc.getElementsByTagNameNS("*", "text")[0] ?? doc.documentElement;
  const blocks: OdtBlock[] = [];

  function walk(node: Element) {
    for (const child of Array.from(node.children)) {
      const local = child.localName;
      if (local === "h") {
        const levelAttr = child.getAttributeNS("*", "outline-level") ?? "1";
        blocks.push({ type: "heading", level: Number(levelAttr) || 1, text: child.textContent?.trim() ?? "" });
      } else if (local === "p") {
        const text = child.textContent?.trim() ?? "";
        if (text) blocks.push({ type: "paragraph", level: 0, text });
      } else if (local === "list-item") {
        const text = child.textContent?.trim() ?? "";
        if (text) blocks.push({ type: "list-item", level: 0, text });
      } else {
        walk(child);
      }
    }
  }

  walk(body as Element);
  return blocks;
}

export function OdtViewer() {
  const [blocks, setBlocks] = React.useState<OdtBlock[]>([]);
  const [fileName, setFileName] = React.useState("");
  const [error, setError] = React.useState("");

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setFileName(file.name);
    setError("");
    try {
      setBlocks(await parseOdt(file));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Couldn't read this .odt file.");
      setBlocks([]);
    }
  }

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <label className="flex w-fit cursor-pointer items-center gap-2 rounded-md border px-3 py-2 text-sm hover:bg-accent">
        <Upload className="size-4" />
        {fileName || "Upload an OpenDocument file (.odt)"}
        <input type="file" accept=".odt" onChange={handleUpload} className="hidden" />
      </label>

      {error && <p className="mt-3 text-sm text-destructive">{error}</p>}

      {blocks.length > 0 && (
        <div className="mt-4 max-h-[600px] overflow-auto rounded-lg border bg-white p-6 text-black">
          {blocks.map((block, i) => {
            if (block.type === "heading") {
              const Tag = (`h${Math.min(6, Math.max(1, block.level))}` as unknown) as "h1";
              return <Tag key={i} className="mt-4 font-semibold first:mt-0">{block.text}</Tag>;
            }
            if (block.type === "list-item") {
              return <p key={i} className="mt-1 ml-4 text-sm">• {block.text}</p>;
            }
            return <p key={i} className="mt-2 text-sm leading-relaxed">{block.text}</p>;
          })}
        </div>
      )}
      <p className="mt-3 text-xs text-muted-foreground">
        Shows the document&apos;s text content with heading and paragraph structure preserved — page
        layout, fonts, and inline formatting (bold/italic) are not rendered.
      </p>
    </div>
  );
}

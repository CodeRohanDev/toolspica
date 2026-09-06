"use client";

import * as React from "react";
import JSZip from "jszip";
import { Upload, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface EpubBook {
  title: string;
  chapters: { href: string; label: string }[];
  zip: JSZip;
  basePath: string;
}

function dirname(path: string): string {
  const idx = path.lastIndexOf("/");
  return idx === -1 ? "" : path.slice(0, idx + 1);
}

async function loadEpub(file: File): Promise<EpubBook> {
  const zip = await JSZip.loadAsync(file);

  const containerXml = await zip.file("META-INF/container.xml")?.async("string");
  if (!containerXml) throw new Error("Missing META-INF/container.xml — is this a valid .epub file?");
  const containerDoc = new DOMParser().parseFromString(containerXml, "application/xml");
  const opfPath = containerDoc.querySelector("rootfile")?.getAttribute("full-path");
  if (!opfPath) throw new Error("Couldn't find the package document reference.");

  const opfXml = await zip.file(opfPath)?.async("string");
  if (!opfXml) throw new Error("Couldn't read the package document.");
  const opfDoc = new DOMParser().parseFromString(opfXml, "application/xml");
  const basePath = dirname(opfPath);

  const title = opfDoc.querySelector("metadata > title")?.textContent ?? "Untitled";

  const manifest = new Map<string, string>();
  opfDoc.querySelectorAll("manifest > item").forEach((item) => {
    const id = item.getAttribute("id");
    const href = item.getAttribute("href");
    if (id && href) manifest.set(id, href);
  });

  const chapters: { href: string; label: string }[] = [];
  opfDoc.querySelectorAll("spine > itemref").forEach((ref, i) => {
    const idref = ref.getAttribute("idref");
    const href = idref ? manifest.get(idref) : null;
    if (href) chapters.push({ href: basePath + href, label: `Chapter ${i + 1}` });
  });

  if (chapters.length === 0) throw new Error("No readable chapters found in this EPUB.");

  return { title, chapters, zip, basePath };
}

export function EpubViewer() {
  const [book, setBook] = React.useState<EpubBook | null>(null);
  const [chapterIndex, setChapterIndex] = React.useState(0);
  const [content, setContent] = React.useState("");
  const [error, setError] = React.useState("");

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setError("");
    try {
      const loaded = await loadEpub(file);
      setBook(loaded);
      setChapterIndex(0);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Couldn't open this EPUB file.");
      setBook(null);
    }
  }

  React.useEffect(() => {
    if (!book) return;
    const chapter = book.chapters[chapterIndex];
    book.zip.file(chapter.href)?.async("string").then(setContent).catch(() => setContent("<p>Couldn't load this chapter.</p>"));
  }, [book, chapterIndex]);

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <label className="flex w-fit cursor-pointer items-center gap-2 rounded-md border px-3 py-2 text-sm hover:bg-accent">
        <Upload className="size-4" />
        Upload an .epub file
        <input type="file" accept=".epub" onChange={handleUpload} className="hidden" />
      </label>

      {error && <p className="mt-3 text-sm text-destructive">{error}</p>}

      {book && (
        <div className="mt-4">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium">{book.title}</p>
            <p className="text-xs text-muted-foreground">
              Chapter {chapterIndex + 1} of {book.chapters.length}
            </p>
          </div>

          <iframe
            title="EPUB content"
            srcDoc={`<!doctype html><html><head><style>body{font-family:Georgia,serif;line-height:1.6;padding:1.5rem;max-width:700px;margin:0 auto}</style></head><body>${content}</body></html>`}
            sandbox=""
            className="mt-3 h-[700px] w-full rounded-lg border"
          />

          <div className="mt-3 flex justify-center gap-2">
            <Button type="button" variant="outline" size="sm" onClick={() => setChapterIndex((i) => Math.max(0, i - 1))} disabled={chapterIndex === 0}>
              <ChevronLeft className="size-4" /> Previous
            </Button>
            <Button type="button" variant="outline" size="sm" onClick={() => setChapterIndex((i) => Math.min(book.chapters.length - 1, i + 1))} disabled={chapterIndex === book.chapters.length - 1}>
              Next <ChevronRight className="size-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

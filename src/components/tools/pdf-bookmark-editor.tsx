"use client";

import * as React from "react";
import { PDFDocument, PDFName, PDFString } from "pdf-lib";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Download, Plus, X } from "lucide-react";
import { PdfUploadZone } from "@/components/tools/pdf-upload-zone";
import { usePdfThumbnails } from "@/lib/pdf/use-pdf-thumbnails";
import { downloadPdfBytes, stripPdfExtension } from "@/lib/pdf/pdf-helpers";

interface Bookmark {
  title: string;
  pageIndex: number;
}

export function PdfBookmarkEditor() {
  const [file, setFile] = React.useState<File | null>(null);
  const { pageCount } = usePdfThumbnails(file);
  const [bookmarks, setBookmarks] = React.useState<Bookmark[]>([]);
  const [newTitle, setNewTitle] = React.useState("");
  const [newPage, setNewPage] = React.useState("1");
  const [processing, setProcessing] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  function addBookmark() {
    const page = Math.max(1, Math.min(pageCount || 1, parseInt(newPage, 10) || 1));
    if (!newTitle.trim()) return;
    setBookmarks((prev) => [...prev, { title: newTitle.trim(), pageIndex: page - 1 }]);
    setNewTitle("");
  }
  function removeBookmark(i: number) {
    setBookmarks((prev) => prev.filter((_, idx) => idx !== i));
  }

  async function apply() {
    if (!file || bookmarks.length === 0) return;
    setProcessing(true);
    setError(null);
    try {
      const bytes = await file.arrayBuffer();
      const doc = await PDFDocument.load(bytes);
      const context = doc.context;

      const itemRefs = bookmarks.map(() => context.nextRef());
      const outlinesRef = context.nextRef();

      bookmarks.forEach((bm, i) => {
        const pageRef = doc.getPage(bm.pageIndex).ref;
        const dest = context.obj([pageRef, PDFName.of("Fit")]);
        const itemDict = context.obj({
          Title: PDFString.of(bm.title),
          Parent: outlinesRef,
          Dest: dest,
        });
        if (i > 0) itemDict.set(PDFName.of("Prev"), itemRefs[i - 1]);
        if (i < bookmarks.length - 1) itemDict.set(PDFName.of("Next"), itemRefs[i + 1]);
        context.assign(itemRefs[i], itemDict);
      });

      const outlinesDict = context.obj({
        Type: "Outlines",
        First: itemRefs[0],
        Last: itemRefs[itemRefs.length - 1],
        Count: bookmarks.length,
      });
      context.assign(outlinesRef, outlinesDict);
      doc.catalog.set(PDFName.of("Outlines"), outlinesRef);

      const outBytes = await doc.save();
      downloadPdfBytes(outBytes, `${stripPdfExtension(file.name)}-bookmarks.pdf`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Couldn't add bookmarks — the PDF may be corrupted or password-protected.");
    } finally {
      setProcessing(false);
    }
  }

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <PdfUploadZone file={file} onFileSelect={setFile} onClear={() => setFile(null)} />

      {file && (
        <>
          <div className="mt-4 flex flex-wrap items-end gap-2">
            <div className="flex-1">
              <Label htmlFor="bm-title" className="text-sm text-muted-foreground">
                Bookmark title
              </Label>
              <Input id="bm-title" value={newTitle} onChange={(e) => setNewTitle(e.target.value)} className="mt-1.5" placeholder="e.g. Chapter 2" />
            </div>
            <div className="w-24">
              <Label htmlFor="bm-page" className="text-sm text-muted-foreground">
                Page
              </Label>
              <Input id="bm-page" value={newPage} onChange={(e) => setNewPage(e.target.value)} className="mt-1.5 font-mono" />
            </div>
            <Button type="button" onClick={addBookmark}>
              <Plus className="size-4" /> Add
            </Button>
          </div>

          {bookmarks.length > 0 && (
            <div className="mt-4 space-y-1.5">
              {bookmarks.map((bm, i) => (
                <div key={i} className="flex items-center justify-between rounded-lg border px-3 py-1.5">
                  <span className="text-sm">
                    {bm.title} <span className="text-muted-foreground">— page {bm.pageIndex + 1}</span>
                  </span>
                  <Button type="button" variant="ghost" size="icon-sm" onClick={() => removeBookmark(i)}>
                    <X className="size-4" />
                  </Button>
                </div>
              ))}
            </div>
          )}

          {error && <p className="mt-3 text-sm text-destructive">{error}</p>}

          <Button type="button" className="mt-4" onClick={apply} disabled={processing || bookmarks.length === 0}>
            <Download className="size-4" />
            {processing ? "Saving..." : "Save bookmarks and download"}
          </Button>
        </>
      )}
    </div>
  );
}

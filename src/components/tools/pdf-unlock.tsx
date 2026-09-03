"use client";

import * as React from "react";
import { PDFDocument } from "pdf-lib";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Download, Eye, EyeOff } from "lucide-react";
import { PdfUploadZone } from "@/components/tools/pdf-upload-zone";
import { getPdfjs } from "@/lib/pdf/pdfjs-setup";
import { downloadPdfBytes, stripPdfExtension } from "@/lib/pdf/pdf-helpers";

export function PdfUnlock() {
  const [file, setFile] = React.useState<File | null>(null);
  const [password, setPassword] = React.useState("");
  const [visible, setVisible] = React.useState(false);
  const [processing, setProcessing] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  async function unlock() {
    if (!file || !password) return;
    setProcessing(true);
    setError(null);
    try {
      const pdfjs = getPdfjs();
      const buffer = await file.arrayBuffer();
      const srcDoc = await pdfjs.getDocument({
        data: new Uint8Array(buffer),
        password,
        standardFontDataUrl: "/pdfjs/standard_fonts/",
        cMapUrl: "/pdfjs/cmaps/",
        cMapPacked: true,
      }).promise;

      const outDoc = await PDFDocument.create();
      for (let i = 1; i <= srcDoc.numPages; i++) {
        const page = await srcDoc.getPage(i);
        const viewport = page.getViewport({ scale: 2 });
        const canvas = document.createElement("canvas");
        canvas.width = viewport.width;
        canvas.height = viewport.height;
        const ctx = canvas.getContext("2d")!;
        await page.render({ canvasContext: ctx, viewport, canvas }).promise;
        const blob: Blob = await new Promise((resolve, reject) =>
          canvas.toBlob((b) => (b ? resolve(b) : reject(new Error("export failed"))), "image/png")
        );
        const pngBytes = new Uint8Array(await blob.arrayBuffer());
        const embedded = await outDoc.embedPng(pngBytes);
        const outPage = outDoc.addPage([viewport.width, viewport.height]);
        outPage.drawImage(embedded, { x: 0, y: 0, width: viewport.width, height: viewport.height });
      }

      const outBytes = await outDoc.save();
      downloadPdfBytes(outBytes, `${stripPdfExtension(file.name)}-unlocked.pdf`);
    } catch (err) {
      const msg = err instanceof Error ? err.message : "";
      if (msg.toLowerCase().includes("password")) {
        setError("Incorrect password.");
      } else {
        setError("Couldn't unlock this PDF — it may be corrupted.");
      }
    } finally {
      setProcessing(false);
    }
  }

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <PdfUploadZone file={file} onFileSelect={setFile} onClear={() => setFile(null)} />

      <div className="mt-4">
        <Label htmlFor="unlock-password" className="text-sm text-muted-foreground">
          Current password
        </Label>
        <div className="mt-1.5 flex gap-2">
          <Input
            id="unlock-password"
            type={visible ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter the PDF's password"
          />
          <Button type="button" variant="outline" size="icon" onClick={() => setVisible((v) => !v)}>
            {visible ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
          </Button>
        </div>
      </div>

      {error && <p className="mt-3 text-sm text-destructive">{error}</p>}

      <Button type="button" className="mt-4" onClick={unlock} disabled={!file || !password || processing}>
        <Download className="size-4" />
        {processing ? "Unlocking..." : "Unlock and download"}
      </Button>
      <p className="mt-2 text-xs text-muted-foreground">
        You need to know the PDF&apos;s current password — this can&apos;t crack or guess an
        unknown password. Each page is rendered and rebuilt into a new, password-free PDF, which
        means the output&apos;s text is no longer selectable or searchable (it becomes an image),
        a necessary trade-off of removing the protection without a password-write library.
      </p>
    </div>
  );
}

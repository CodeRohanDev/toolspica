"use client";

import * as React from "react";
import {
  PDFDocument,
  PDFName,
  PDFDict,
  PDFStream,
  PDFRawStream,
  PDFArray,
  PDFNumber,
  decodePDFRawStream,
} from "pdf-lib";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { PdfUploadZone } from "@/components/tools/pdf-upload-zone";
import { downloadBytesFile, stripPdfExtension } from "@/lib/pdf/pdf-helpers";
import { createZip } from "@/lib/zip-writer";

function filterNames(dict: PDFDict): string[] {
  const filter = dict.lookup(PDFName.of("Filter"));
  if (filter instanceof PDFName) return [filter.asString().replace(/^\//, "")];
  if (filter instanceof PDFArray) {
    const names: string[] = [];
    for (let i = 0; i < filter.size(); i++) {
      const item = filter.lookup(i);
      if (item instanceof PDFName) names.push(item.asString().replace(/^\//, ""));
    }
    return names;
  }
  return [];
}

function colorSpaceName(dict: PDFDict): string | null {
  const cs = dict.lookup(PDFName.of("ColorSpace"));
  if (cs instanceof PDFName) return cs.asString().replace(/^\//, "");
  return null;
}

async function rgbBytesToPng(bytes: Uint8Array, width: number, height: number, channels: number): Promise<Uint8Array> {
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d")!;
  const imageData = ctx.createImageData(width, height);
  const out = imageData.data;
  const pixelCount = width * height;
  for (let p = 0; p < pixelCount; p++) {
    if (channels === 1) {
      const gray = bytes[p];
      out[p * 4] = gray;
      out[p * 4 + 1] = gray;
      out[p * 4 + 2] = gray;
      out[p * 4 + 3] = 255;
    } else {
      out[p * 4] = bytes[p * 3];
      out[p * 4 + 1] = bytes[p * 3 + 1];
      out[p * 4 + 2] = bytes[p * 3 + 2];
      out[p * 4 + 3] = 255;
    }
  }
  ctx.putImageData(imageData, 0, 0);
  const blob: Blob = await new Promise((resolve, reject) =>
    canvas.toBlob((b) => (b ? resolve(b) : reject(new Error("export failed"))), "image/png")
  );
  return new Uint8Array(await blob.arrayBuffer());
}

export function PdfPageExtractorToImages() {
  const [file, setFile] = React.useState<File | null>(null);
  const [processing, setProcessing] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [status, setStatus] = React.useState<string | null>(null);

  async function extract() {
    if (!file) return;
    setProcessing(true);
    setError(null);
    setStatus(null);
    try {
      const buffer = await file.arrayBuffer();
      const doc = await PDFDocument.load(buffer, { ignoreEncryption: true });
      const images: { name: string; data: Uint8Array }[] = [];
      let skipped = 0;
      let counter = 0;

      for (const page of doc.getPages()) {
        const resources = page.node.Resources();
        if (!resources) continue;
        const xobjects = resources.lookupMaybe(PDFName.of("XObject"), PDFDict);
        if (!xobjects) continue;

        for (const [, ref] of xobjects.entries()) {
          const xobj = doc.context.lookup(ref);
          if (!(xobj instanceof PDFStream)) continue;
          const dict = xobj.dict;
          const subtype = dict.lookup(PDFName.of("Subtype"));
          if (!(subtype instanceof PDFName) || subtype.asString() !== "/Image") continue;
          if (!(xobj instanceof PDFRawStream)) continue;

          counter++;
          const filters = filterNames(dict);

          if (filters.includes("DCTDecode")) {
            images.push({ name: `image-${counter}.jpg`, data: xobj.getContents() });
            continue;
          }

          if (filters.length === 0 || (filters.length === 1 && filters[0] === "FlateDecode")) {
            const cs = colorSpaceName(dict);
            const bpc = dict.lookup(PDFName.of("BitsPerComponent"));
            const width = dict.lookup(PDFName.of("Width"));
            const height = dict.lookup(PDFName.of("Height"));
            const bitsOk = bpc instanceof PDFNumber && bpc.asNumber() === 8;
            if (bitsOk && width instanceof PDFNumber && height instanceof PDFNumber && (cs === "DeviceRGB" || cs === "DeviceGray")) {
              try {
                const decoded = decodePDFRawStream(xobj).decode();
                const png = await rgbBytesToPng(decoded, width.asNumber(), height.asNumber(), cs === "DeviceGray" ? 1 : 3);
                images.push({ name: `image-${counter}.png`, data: png });
                continue;
              } catch {
                skipped++;
                continue;
              }
            }
          }
          skipped++;
        }
      }

      if (images.length === 0) {
        throw new Error("No extractable embedded images found in this PDF (it may only contain page-rendered content or unsupported image encodings).");
      }

      setStatus(skipped > 0 ? `Extracted ${images.length} image(s); skipped ${skipped} in an unsupported encoding.` : `Extracted ${images.length} image(s).`);

      if (images.length === 1) {
        downloadBytesFile(images[0].data, `${stripPdfExtension(file.name)}-${images[0].name}`, images[0].name.endsWith(".png") ? "image/png" : "image/jpeg");
      } else {
        const zip = createZip(images);
        downloadBytesFile(zip, `${stripPdfExtension(file.name)}-images.zip`, "application/zip");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Couldn't extract images from this PDF.");
    } finally {
      setProcessing(false);
    }
  }

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <PdfUploadZone file={file} onFileSelect={setFile} onClear={() => setFile(null)} />

      {error && <p className="mt-3 text-sm text-destructive">{error}</p>}
      {status && <p className="mt-3 text-sm text-muted-foreground">{status}</p>}

      <Button type="button" className="mt-4" onClick={extract} disabled={!file || processing}>
        <Download className="size-4" />
        {processing ? "Extracting..." : "Extract embedded images"}
      </Button>
      <p className="mt-2 text-xs text-muted-foreground">
        Pulls out the original embedded photos/graphics from inside the PDF — not a page render.
        JPEG images are extracted at their original quality; plain RGB/grayscale images are
        converted to PNG. Indexed-color, CMYK, and other advanced encodings aren&apos;t supported yet.
      </p>
    </div>
  );
}

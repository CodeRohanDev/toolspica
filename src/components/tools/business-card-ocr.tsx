"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { ImageUploadCard } from "@/components/tools/image-upload-card";
import { useTesseractOcr } from "@/lib/use-tesseract-ocr";
import { downloadTextFile } from "@/lib/pdf/pdf-helpers";
import { stripExtension } from "@/lib/image-processing";

const EMAIL_RE = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/;
const PHONE_RE = /(\+?\d[\d\s().-]{7,}\d)/;

function buildVcard(text: string): { vcard: string; name: string } {
  const lines = text.split("\n").map((l) => l.trim()).filter(Boolean);
  const email = lines.map((l) => l.match(EMAIL_RE)?.[0]).find(Boolean) ?? "";
  const phone = lines.map((l) => l.match(PHONE_RE)?.[0]).find(Boolean) ?? "";
  const name = lines.find((l) => !l.match(EMAIL_RE) && !l.match(PHONE_RE)) ?? "Unknown";
  const org = lines.find((l, i) => l !== name && !l.match(EMAIL_RE) && !l.match(PHONE_RE) && i > 0) ?? "";

  const vcard = [
    "BEGIN:VCARD",
    "VERSION:3.0",
    `FN:${name}`,
    org ? `ORG:${org}` : "",
    phone ? `TEL:${phone.replace(/[^\d+]/g, "")}` : "",
    email ? `EMAIL:${email}` : "",
    "END:VCARD",
  ].filter(Boolean).join("\n");

  return { vcard, name };
}

export function BusinessCardOcr() {
  const [file, setFile] = React.useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = React.useState<string | null>(null);
  const [vcard, setVcard] = React.useState("");
  const [vcardName, setVcardName] = React.useState("contact");
  const { recognize, status, busy, error, setError } = useTesseractOcr();

  function handleFile(picked: File) {
    setFile(picked);
    setPreviewUrl(URL.createObjectURL(picked));
    setVcard("");
    setError(null);
  }
  function clear() {
    setFile(null);
    setPreviewUrl(null);
    setVcard("");
    setError(null);
  }

  async function run() {
    if (!file) return;
    try {
      const data = await recognize(file);
      const { vcard: built, name } = buildVcard(data.text);
      setVcard(built);
      setVcardName(name);
    } catch {
      // error already set by hook
    }
  }

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <ImageUploadCard file={file} previewUrl={previewUrl} onFileSelect={handleFile} onClear={clear} />

      {file && (
        <Button type="button" className="mt-4" onClick={run} disabled={busy}>
          {busy ? status || "Recognizing..." : "Scan business card"}
        </Button>
      )}

      {error && <p className="mt-3 text-sm text-destructive">{error}</p>}

      {vcard && (
        <div className="mt-4">
          <pre className="whitespace-pre-wrap rounded-lg border bg-muted/40 p-3 text-sm">{vcard}</pre>
          <Button
            type="button"
            className="mt-3"
            onClick={() => downloadTextFile(vcard, `${stripPdfExtensionSafe(vcardName)}.vcf`, "text/vcard")}
          >
            <Download className="size-3.5" /> Download .vcf
          </Button>
        </div>
      )}

      <p className="mt-3 text-xs text-muted-foreground">
        Extracts text from a business card photo and picks out an email and phone number using pattern matching, then builds a standard .vcf contact file you can import into any contacts app. Field detection is heuristic — always double-check the result before saving.
      </p>
    </div>
  );
}

function stripPdfExtensionSafe(name: string): string {
  return name.replace(/[^a-zA-Z0-9-_ ]/g, "").trim() || "contact";
}

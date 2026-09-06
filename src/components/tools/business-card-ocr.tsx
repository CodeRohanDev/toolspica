"use client";

import * as React from "react";
import { BatchUploadZone } from "@/components/tools/batch-upload-zone";
import { BatchFileList } from "@/components/tools/batch-file-list";
import { useBatchFiles } from "@/lib/use-batch-files";

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

function safeName(name: string): string {
  return name.replace(/[^a-zA-Z0-9-_ ]/g, "").trim() || "contact";
}

export function BusinessCardOcr() {
  const convert = React.useCallback(async (file: File) => {
    const { createWorker } = await import("tesseract.js");
    const worker = await createWorker("eng", 1, { corePath: "/tesseract-core", workerPath: "/tesseract-worker.min.js" });
    const { data } = await worker.recognize(file);
    await worker.terminate();
    const { vcard, name } = buildVcard(data.text);
    const blob = new Blob([vcard], { type: "text/vcard" });
    return { blob, name: `${safeName(name)}.vcf` };
  }, []);

  const { items, addFiles, removeItem } = useBatchFiles(convert);

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <BatchUploadZone accept="image/*" onFilesSelect={addFiles} label="Drop business card photos" />

      <BatchFileList items={items} onRemove={removeItem} zipName="business-card-contacts.zip" />

      <p className="mt-3 text-xs text-muted-foreground">
        Extracts text from each business card photo and picks out an email and phone number using
        pattern matching, then builds a standard .vcf contact file you can import into any
        contacts app. Field detection is heuristic — always double-check the result before saving.
      </p>
    </div>
  );
}

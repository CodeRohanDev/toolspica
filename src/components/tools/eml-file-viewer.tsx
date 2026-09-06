"use client";

import * as React from "react";
import { Upload } from "lucide-react";

interface ParsedEml {
  from: string;
  to: string;
  subject: string;
  date: string;
  body: string;
}

function decodeQuotedPrintable(text: string): string {
  return text
    .replace(/=\r?\n/g, "")
    .replace(/=([0-9A-F]{2})/gi, (_, hex) => String.fromCharCode(parseInt(hex, 16)));
}

function parseEml(raw: string): ParsedEml {
  const headerEnd = raw.search(/\r?\n\r?\n/);
  const headerBlock = headerEnd === -1 ? raw : raw.slice(0, headerEnd);
  let bodyBlock = headerEnd === -1 ? "" : raw.slice(headerEnd).replace(/^\r?\n\r?\n/, "");

  const headers: Record<string, string> = {};
  let currentKey = "";
  for (const line of headerBlock.split(/\r?\n/)) {
    const match = line.match(/^([A-Za-z-]+):\s*(.*)$/);
    if (match) {
      currentKey = match[1].toLowerCase();
      headers[currentKey] = (headers[currentKey] ? headers[currentKey] + " " : "") + match[2];
    } else if (currentKey && /^\s/.test(line)) {
      headers[currentKey] += " " + line.trim();
    }
  }

  if (/quoted-printable/i.test(headers["content-transfer-encoding"] ?? "")) {
    bodyBlock = decodeQuotedPrintable(bodyBlock);
  }

  // If multipart, grab the first text/plain (or text/html stripped) section
  const boundaryMatch = (headers["content-type"] ?? "").match(/boundary="?([^";]+)"?/i);
  if (boundaryMatch) {
    const boundary = boundaryMatch[1];
    const parts = bodyBlock.split(new RegExp(`--${boundary.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}`));
    const textPart = parts.find((p) => /content-type:\s*text\/plain/i.test(p));
    if (textPart) {
      const partBody = textPart.split(/\r?\n\r?\n/).slice(1).join("\n\n");
      bodyBlock = /quoted-printable/i.test(textPart) ? decodeQuotedPrintable(partBody) : partBody;
    }
  }

  return {
    from: headers.from ?? "(unknown)",
    to: headers.to ?? "(unknown)",
    subject: headers.subject ?? "(no subject)",
    date: headers.date ?? "(unknown)",
    body: bodyBlock.trim().replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim().slice(0, 5000),
  };
}

export function EmlFileViewer() {
  const [parsed, setParsed] = React.useState<ParsedEml | null>(null);
  const [error, setError] = React.useState("");
  const [fileName, setFileName] = React.useState("");

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setFileName(file.name);
    setError("");
    try {
      const text = await file.text();
      setParsed(parseEml(text));
    } catch {
      setError("Couldn't parse that file — make sure it's a valid .eml file.");
      setParsed(null);
    }
  }

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <label className="flex w-fit cursor-pointer items-center gap-2 rounded-md border px-3 py-2 text-sm hover:bg-accent">
        <Upload className="size-4" />
        {fileName || "Upload a .eml file"}
        <input type="file" accept=".eml" onChange={handleUpload} className="hidden" />
      </label>

      {error && <p className="mt-3 text-sm text-destructive">{error}</p>}

      {parsed && (
        <div className="mt-4 rounded-lg border">
          <div className="space-y-1 border-b bg-muted/30 p-3 text-sm">
            <p><span className="text-muted-foreground">From:</span> {parsed.from}</p>
            <p><span className="text-muted-foreground">To:</span> {parsed.to}</p>
            <p><span className="text-muted-foreground">Subject:</span> {parsed.subject}</p>
            <p><span className="text-muted-foreground">Date:</span> {parsed.date}</p>
          </div>
          <div className="max-h-[750px] overflow-auto whitespace-pre-wrap p-3 text-sm">{parsed.body || "(no readable body content)"}</div>
        </div>
      )}
      <p className="mt-3 text-xs text-muted-foreground">
        Plain-text body content is shown; HTML tags in the message body are stripped for a clean
        read.
      </p>
    </div>
  );
}

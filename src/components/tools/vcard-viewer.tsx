"use client";

import * as React from "react";
import { Textarea } from "@/components/ui/textarea";
import { Upload, User } from "lucide-react";

interface Contact {
  fn: string;
  org: string;
  title: string;
  tels: string[];
  emails: string[];
  addresses: string[];
}

function parseVcards(text: string): Contact[] {
  const cards = text.split(/BEGIN:VCARD/i).slice(1);
  return cards.map((block) => {
    const lines = block.split("\n").map((l) => l.trim()).filter(Boolean);
    const contact: Contact = { fn: "", org: "", title: "", tels: [], emails: [], addresses: [] };
    for (const line of lines) {
      const [rawKey, ...rest] = line.split(":");
      const value = rest.join(":").trim();
      const key = rawKey.split(";")[0].toUpperCase();
      if (key === "FN") contact.fn = value;
      else if (key === "ORG") contact.org = value;
      else if (key === "TITLE") contact.title = value;
      else if (key === "TEL") contact.tels.push(value);
      else if (key === "EMAIL") contact.emails.push(value);
      else if (key === "ADR") contact.addresses.push(value.replace(/;/g, " ").trim());
    }
    return contact;
  }).filter((c) => c.fn || c.emails.length > 0 || c.tels.length > 0);
}

export function VcardViewer() {
  const [input, setInput] = React.useState("");

  function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    file.text().then(setInput);
  }

  const contacts = React.useMemo(() => parseVcards(input), [input]);

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <label className="flex w-fit cursor-pointer items-center gap-2 rounded-md border px-3 py-2 text-sm hover:bg-accent">
        <Upload className="size-4" />
        Upload a .vcf file
        <input type="file" accept=".vcf" onChange={handleUpload} className="hidden" />
      </label>

      <Textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder={"Paste .vcf content, or upload a file above...\nBEGIN:VCARD\nFN:Jane Doe\nEMAIL:jane@example.com\nEND:VCARD"}
        rows={16}
        className="mt-3 resize-y font-mono text-xs"
      />

      {contacts.length > 0 && (
        <div className="mt-4 grid gap-3 border-t pt-4 sm:grid-cols-2">
          {contacts.map((c, i) => (
            <div key={i} className="flex gap-3 rounded-lg border p-3">
              <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-brand-soft text-brand">
                <User className="size-4" />
              </span>
              <div className="min-w-0">
                <p className="truncate text-sm font-medium">{c.fn || "(no name)"}</p>
                {(c.title || c.org) && <p className="truncate text-xs text-muted-foreground">{[c.title, c.org].filter(Boolean).join(" at ")}</p>}
                {c.tels.map((t, j) => <p key={j} className="truncate text-xs">{t}</p>)}
                {c.emails.map((e, j) => <p key={j} className="truncate text-xs text-muted-foreground">{e}</p>)}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

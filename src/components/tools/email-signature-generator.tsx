"use client";

import * as React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CopyButton } from "@/components/tools/copy-button";

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export function EmailSignatureGenerator() {
  const [name, setName] = React.useState("");
  const [title, setTitle] = React.useState("");
  const [company, setCompany] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [website, setWebsite] = React.useState("");

  const plainText = [
    name,
    [title, company].filter(Boolean).join(" at "),
    phone,
    email,
    website,
  ]
    .filter(Boolean)
    .join("\n");

  const safeName = escapeHtml(name || "Your Name");
  const safeRole = escapeHtml([title, company].filter(Boolean).join(" at "));
  const safeContact = escapeHtml([phone, email].filter(Boolean).join(" | "));
  const safeWebsite = escapeHtml(website);

  const html = `<div style="font-family: Arial, sans-serif; font-size: 14px; color: #222;">
  <p style="margin: 0; font-weight: bold;">${safeName}</p>
  ${title || company ? `<p style="margin: 0; color: #555;">${safeRole}</p>` : ""}
  <p style="margin: 6px 0 0; color: #555;">
    ${safeContact}
  </p>
  ${website ? `<p style="margin: 0;"><a href="${safeWebsite}" style="color: #2563eb;">${safeWebsite}</a></p>` : ""}
</div>`;

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <div className="grid gap-3 sm:grid-cols-2">
        <div>
          <Label className="text-sm text-muted-foreground">Full name</Label>
          <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Jane Doe" className="mt-1.5" />
        </div>
        <div>
          <Label className="text-sm text-muted-foreground">Job title</Label>
          <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Marketing Manager" className="mt-1.5" />
        </div>
        <div>
          <Label className="text-sm text-muted-foreground">Company</Label>
          <Input value={company} onChange={(e) => setCompany(e.target.value)} placeholder="Acme Inc." className="mt-1.5" />
        </div>
        <div>
          <Label className="text-sm text-muted-foreground">Phone</Label>
          <Input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+1 555 123 4567" className="mt-1.5" />
        </div>
        <div>
          <Label className="text-sm text-muted-foreground">Email</Label>
          <Input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="jane@acme.com" className="mt-1.5" />
        </div>
        <div>
          <Label className="text-sm text-muted-foreground">Website</Label>
          <Input value={website} onChange={(e) => setWebsite(e.target.value)} placeholder="https://acme.com" className="mt-1.5" />
        </div>
      </div>

      {name && (
        <div className="mt-5 space-y-4 border-t pt-4">
          <div>
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-muted-foreground">Preview</p>
            </div>
            <div className="mt-2 rounded-md border p-3 font-sans text-sm text-foreground">
              <p className="font-bold">{name || "Your Name"}</p>
              {(title || company) && (
                <p className="text-muted-foreground">{[title, company].filter(Boolean).join(" at ")}</p>
              )}
              <p className="mt-1.5 text-muted-foreground">{[phone, email].filter(Boolean).join(" | ")}</p>
              {website && (
                <p>
                  <span className="text-primary underline">{website}</span>
                </p>
              )}
            </div>
          </div>
          <div>
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-muted-foreground">Plain text</p>
              <CopyButton value={plainText} />
            </div>
            <pre className="mt-2 whitespace-pre-wrap rounded-md border bg-muted/40 p-3 text-sm">{plainText}</pre>
          </div>
          <div>
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-muted-foreground">HTML</p>
              <CopyButton value={html} />
            </div>
            <pre className="mt-2 max-h-40 overflow-auto whitespace-pre-wrap rounded-md border bg-muted/40 p-3 font-mono text-xs">{html}</pre>
          </div>
        </div>
      )}
    </div>
  );
}

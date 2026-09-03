"use client";

import * as React from "react";
import { Textarea } from "@/components/ui/textarea";

const RE = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const COMMON_TYPOS: Record<string, string> = { "gmial.com": "gmail.com", "gmai.com": "gmail.com", "yaho.com": "yahoo.com", "hotmial.com": "hotmail.com", "outlok.com": "outlook.com" };

function validate(email: string) {
  const trimmed = email.trim();
  const syntaxValid = RE.test(trimmed);
  const domain = trimmed.split("@")[1]?.toLowerCase();
  const suggestion = domain && COMMON_TYPOS[domain] ? trimmed.split("@")[0] + "@" + COMMON_TYPOS[domain] : null;
  return { syntaxValid, suggestion };
}

export function EmailValidator() {
  const [text, setText] = React.useState("");
  const emails = text.split(/[\n,;\s]+/).filter(Boolean);
  const results = emails.map((e) => ({ email: e, ...validate(e) }));

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <Textarea value={text} onChange={(e) => setText(e.target.value)} placeholder="Enter one or more email addresses (comma, space, or newline separated)..." className="min-h-[120px]" />
      {results.length > 0 && (
        <div className="mt-4 space-y-2 border-t pt-4">
          {results.map((r, i) => (
            <div key={i} className="flex items-center justify-between rounded-md border px-3 py-2 text-sm">
              <span className="font-mono">{r.email}</span>
              <div className="flex items-center gap-2">
                {r.suggestion && <span className="text-xs text-yellow-600">Did you mean {r.suggestion}?</span>}
                <span className={r.syntaxValid ? "text-primary" : "text-destructive"}>
                  {r.syntaxValid ? "Valid format" : "Invalid format"}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
      <p className="mt-3 text-xs text-muted-foreground">
        Checks syntax (RFC-style format) only — it can&apos;t confirm the mailbox actually exists or accepts mail.
      </p>
    </div>
  );
}

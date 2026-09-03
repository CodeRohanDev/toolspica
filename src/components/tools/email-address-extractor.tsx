"use client";

import * as React from "react";
import { Textarea } from "@/components/ui/textarea";
import { CopyButton } from "@/components/tools/copy-button";

const RE = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;

export function EmailAddressExtractor() {
  const [text, setText] = React.useState("");
  const emails = React.useMemo(() => {
    const found = text.match(RE) ?? [];
    return [...new Set(found.map((e) => e.toLowerCase()))];
  }, [text]);

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <Textarea value={text} onChange={(e) => setText(e.target.value)} placeholder="Paste any text, email thread, or webpage content — every email address found will be extracted below..." className="min-h-[200px]" />
      <div className="mt-4 flex items-center justify-between border-t pt-3">
        <p className="text-sm text-muted-foreground">{emails.length} unique email{emails.length !== 1 ? "s" : ""} found</p>
        <CopyButton value={emails.join("\n")} label="Copy all" />
      </div>
      {emails.length > 0 && (
        <ul className="mt-2 max-h-64 space-y-1 overflow-auto rounded-md border bg-muted/30 p-3 font-mono text-sm">
          {emails.map((e) => <li key={e}>{e}</li>)}
        </ul>
      )}
    </div>
  );
}

"use client";

import * as React from "react";
import { Textarea } from "@/components/ui/textarea";
import { CopyButton } from "@/components/tools/copy-button";
import { htmlToMarkdown } from "@/lib/markdown";

export function HtmlToMarkdown() {
  const [input, setInput] = React.useState("<h1>Hello</h1>\n<p>This is <strong>bold</strong> and <em>italic</em> text.</p>\n<ul><li>item one</li><li>item two</li></ul>");
  const md = React.useMemo(() => htmlToMarkdown(input), [input]);

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <Textarea value={input} onChange={(e) => setInput(e.target.value)} placeholder="Paste HTML..." className="min-h-[220px] font-mono text-sm" />
      <div className="mt-4 flex items-center justify-between border-t pt-3">
        <p className="text-sm font-medium text-muted-foreground">Markdown output</p>
        <CopyButton value={md} label="Copy Markdown" />
      </div>
      <pre className="mt-2 max-h-64 overflow-auto rounded-md bg-muted p-3 text-xs">{md}</pre>
    </div>
  );
}

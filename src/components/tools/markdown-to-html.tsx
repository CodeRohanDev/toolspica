"use client";

import * as React from "react";
import { Textarea } from "@/components/ui/textarea";
import { CopyButton } from "@/components/tools/copy-button";
import { markdownToHtml } from "@/lib/markdown";

export function MarkdownToHtml() {
  const [input, setInput] = React.useState("# Hello\n\nThis is **bold** and *italic* text.\n\n- item one\n- item two\n\n[a link](https://example.com)");
  const html = React.useMemo(() => markdownToHtml(input), [input]);

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <Textarea value={input} onChange={(e) => setInput(e.target.value)} placeholder="Write Markdown..." className="min-h-[220px] font-mono text-sm" />
      <div className="mt-4 flex items-center justify-between border-t pt-3">
        <p className="text-sm font-medium text-muted-foreground">HTML output</p>
        <CopyButton value={html} label="Copy HTML" />
      </div>
      <pre className="mt-2 max-h-64 overflow-auto rounded-md bg-muted p-3 text-xs">{html}</pre>
    </div>
  );
}

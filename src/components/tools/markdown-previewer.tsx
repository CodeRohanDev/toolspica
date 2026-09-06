"use client";

import * as React from "react";
import { Textarea } from "@/components/ui/textarea";
import { markdownToHtml } from "@/lib/markdown";

export function MarkdownPreviewer() {
  const [input, setInput] = React.useState("# Live Preview\n\nType **Markdown** on the left and see it rendered on the *right*, live.\n\n- fast\n- private\n- no upload");
  const html = React.useMemo(() => markdownToHtml(input), [input]);

  return (
    <div className="grid gap-4 rounded-xl border bg-card p-5 sm:grid-cols-2 sm:p-6">
      <Textarea value={input} onChange={(e) => setInput(e.target.value)} className="min-h-[520px] font-mono text-sm" />
      <div className="prose prose-sm min-h-[520px] max-w-none overflow-auto rounded-md border bg-background p-4 dark:prose-invert" dangerouslySetInnerHTML={{ __html: html }} />
    </div>
  );
}

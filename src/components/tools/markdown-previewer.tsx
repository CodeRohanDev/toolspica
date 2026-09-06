"use client";

import * as React from "react";
import { Textarea } from "@/components/ui/textarea";
import { markdownToHtml } from "@/lib/markdown";

export function MarkdownPreviewer() {
  const [input, setInput] = React.useState("# Live Preview\n\nType **Markdown** on the left and see it rendered on the *right*, live.\n\n- fast\n- private\n- no upload");
  const html = React.useMemo(() => markdownToHtml(input), [input]);

  return (
    <div className="relative left-1/2 w-screen max-w-[1600px] -translate-x-1/2 px-4 sm:px-6 lg:px-8">
      <div className="grid gap-4 rounded-xl border bg-card p-5 lg:grid-cols-2 sm:p-6">
        <Textarea value={input} onChange={(e) => setInput(e.target.value)} className="min-h-[520px] max-h-[70vh] font-mono text-sm" />
        <div data-lenis-prevent className="prose prose-sm min-h-[520px] max-h-[70vh] max-w-none overflow-y-auto rounded-md border bg-background p-4" dangerouslySetInnerHTML={{ __html: html }} />
      </div>
    </div>
  );
}

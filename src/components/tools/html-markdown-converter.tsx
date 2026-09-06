"use client";

import * as React from "react";
import { Textarea } from "@/components/ui/textarea";
import { CopyButton } from "@/components/tools/copy-button";
import { htmlToMarkdown, markdownToHtml } from "@/lib/markdown";

export function HtmlMarkdownConverter() {
  const [htmlInput, setHtmlInput] = React.useState(
    "<h1>Hello</h1>\n<p>This is <strong>bold</strong> and <em>italic</em> text.</p>\n<ul><li>item one</li><li>item two</li></ul>"
  );
  const [mdInput, setMdInput] = React.useState(
    "# Hello\n\nThis is **bold** and *italic* text.\n\n- item one\n- item two\n\n[a link](https://example.com)"
  );

  const markdown = React.useMemo(() => htmlToMarkdown(htmlInput), [htmlInput]);
  const html = React.useMemo(() => markdownToHtml(mdInput), [mdInput]);

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div className="rounded-xl border bg-card p-5 sm:p-6">
        <p className="text-sm font-semibold">HTML to Markdown</p>
        <Textarea
          value={htmlInput}
          onChange={(e) => setHtmlInput(e.target.value)}
          placeholder="Paste HTML..."
          className="mt-3 min-h-[220px] font-mono text-sm"
        />
        <div className="mt-4 flex items-center justify-between border-t pt-3">
          <p className="text-sm font-medium text-muted-foreground">Markdown output</p>
          <CopyButton value={markdown} label="Copy Markdown" />
        </div>
        <pre className="mt-2 max-h-96 overflow-auto rounded-md bg-muted p-3 text-xs">{markdown}</pre>
      </div>

      <div className="rounded-xl border bg-card p-5 sm:p-6">
        <p className="text-sm font-semibold">Markdown to HTML</p>
        <Textarea
          value={mdInput}
          onChange={(e) => setMdInput(e.target.value)}
          placeholder="Write Markdown..."
          className="mt-3 min-h-[220px] font-mono text-sm"
        />
        <div className="mt-4 flex items-center justify-between border-t pt-3">
          <p className="text-sm font-medium text-muted-foreground">HTML output</p>
          <CopyButton value={html} label="Copy HTML" />
        </div>
        <pre className="mt-2 max-h-96 overflow-auto rounded-md bg-muted p-3 text-xs">{html}</pre>
      </div>
    </div>
  );
}

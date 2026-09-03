"use client";

import * as React from "react";
import { Textarea } from "@/components/ui/textarea";
import { CopyButton } from "@/components/tools/copy-button";

const VOID_TAGS = new Set(["area", "base", "br", "col", "embed", "hr", "img", "input", "link", "meta", "param", "source", "track", "wbr"]);

function beautifyHtml(html: string) {
  const clean = html.replace(/>\s+</g, "><").trim();
  const tokens = clean.split(/(<[^>]+>)/g).filter((t) => t.trim());
  let depth = 0;
  const lines: string[] = [];
  for (const token of tokens) {
    if (token.startsWith("</")) {
      depth = Math.max(0, depth - 1);
      lines.push("  ".repeat(depth) + token);
    } else if (token.startsWith("<")) {
      const tagMatch = token.match(/^<([a-zA-Z0-9-]+)/);
      const tag = tagMatch?.[1]?.toLowerCase() ?? "";
      const selfClosing = token.endsWith("/>") || VOID_TAGS.has(tag);
      lines.push("  ".repeat(depth) + token);
      if (!selfClosing) depth++;
    } else {
      lines.push("  ".repeat(depth) + token.trim());
    }
  }
  return lines.join("\n");
}

export function HtmlFormatterBeautifier() {
  const [input, setInput] = React.useState('<div class="card"><p>Hello</p><img src="a.png"><span>world</span></div>');
  const output = React.useMemo(() => beautifyHtml(input), [input]);

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <Textarea value={input} onChange={(e) => setInput(e.target.value)} placeholder="Paste minified or messy HTML..." className="min-h-[160px] font-mono text-sm" />
      <div className="mt-4 flex items-center justify-between border-t pt-3">
        <p className="text-sm font-medium text-muted-foreground">Beautified HTML</p>
        <CopyButton value={output} label="Copy" />
      </div>
      <pre className="mt-2 max-h-64 overflow-auto rounded-md bg-muted p-3 text-xs">{output}</pre>
    </div>
  );
}

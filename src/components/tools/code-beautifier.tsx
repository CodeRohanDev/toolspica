"use client";

import * as React from "react";
import { Textarea } from "@/components/ui/textarea";
import { CopyButton } from "@/components/tools/copy-button";

function beautify(code: string) {
  let depth = 0;
  const lines: string[] = [];
  let current = "";
  for (const ch of code) {
    if (ch === "{" || ch === "[" || ch === "(") {
      current += ch;
      lines.push("  ".repeat(depth) + current.trim());
      current = "";
      depth++;
    } else if (ch === "}" || ch === "]" || ch === ")") {
      if (current.trim()) { lines.push("  ".repeat(depth) + current.trim()); current = ""; }
      depth = Math.max(0, depth - 1);
      lines.push("  ".repeat(depth) + ch);
    } else if (ch === ";" || ch === "\n") {
      current += ch === ";" ? ";" : "";
      if (current.trim()) lines.push("  ".repeat(depth) + current.trim());
      current = "";
    } else {
      current += ch;
    }
  }
  if (current.trim()) lines.push("  ".repeat(depth) + current.trim());
  return lines.filter(Boolean).join("\n");
}

export function CodeBeautifier() {
  const [input, setInput] = React.useState("function add(a,b){return a+b;} const x={a:1,b:2};");
  const output = React.useMemo(() => beautify(input), [input]);

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <Textarea value={input} onChange={(e) => setInput(e.target.value)} placeholder="Paste minified or messy code (JS, JSON-like, CSS, C-style)..." className="min-h-[180px] font-mono text-sm" />
      <div className="mt-4 flex items-center justify-between border-t pt-3">
        <p className="text-sm font-medium text-muted-foreground">Beautified output</p>
        <CopyButton value={output} label="Copy" />
      </div>
      <pre className="mt-2 max-h-64 overflow-auto rounded-md bg-muted p-3 text-xs">{output}</pre>
      <p className="mt-2 text-xs text-muted-foreground">Generic brace/bracket-based reindenter — works across C-style languages, but isn&apos;t a language-specific parser.</p>
    </div>
  );
}

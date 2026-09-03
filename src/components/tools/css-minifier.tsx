"use client";

import * as React from "react";
import { Textarea } from "@/components/ui/textarea";
import { CopyButton } from "@/components/tools/copy-button";

function minifyCss(css: string) {
  return css
    .replace(/\/\*[\s\S]*?\*\//g, "")
    .replace(/\s*([{}:;,])\s*/g, "$1")
    .replace(/;}/g, "}")
    .replace(/\s{2,}/g, " ")
    .trim();
}

export function CssMinifier() {
  const [input, setInput] = React.useState(".card {\n  padding: 16px;\n  color: #333;\n}\n\n/* comment */\n.title { font-size: 20px; }");
  const output = React.useMemo(() => minifyCss(input), [input]);
  const saved = input.length ? Math.round((1 - output.length / input.length) * 100) : 0;

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <Textarea value={input} onChange={(e) => setInput(e.target.value)} placeholder="Paste CSS..." className="min-h-[180px] font-mono text-sm" />
      <div className="mt-4 flex items-center justify-between border-t pt-3">
        <p className="text-sm text-muted-foreground">{input.length} → {output.length} characters ({saved}% smaller)</p>
        <CopyButton value={output} label="Copy" />
      </div>
      <pre className="mt-2 max-h-64 overflow-auto rounded-md bg-muted p-3 text-xs break-all">{output}</pre>
    </div>
  );
}

"use client";

import * as React from "react";
import { Textarea } from "@/components/ui/textarea";
import { CopyButton } from "@/components/tools/copy-button";

function minifyJs(js: string) {
  // Strip comments while respecting strings, then collapse whitespace.
  let out = "";
  let i = 0;
  const n = js.length;
  while (i < n) {
    const c = js[i];
    if (c === '"' || c === "'" || c === "`") {
      const quote = c;
      out += c; i++;
      while (i < n && js[i] !== quote) { if (js[i] === "\\") { out += js[i]; i++; } out += js[i]; i++; }
      out += js[i]; i++;
      continue;
    }
    if (c === "/" && js[i + 1] === "/") { while (i < n && js[i] !== "\n") i++; continue; }
    if (c === "/" && js[i + 1] === "*") { i += 2; while (i < n && !(js[i] === "*" && js[i + 1] === "/")) i++; i += 2; continue; }
    out += c; i++;
  }
  return out
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean)
    .join("\n")
    .replace(/\s*([{}();,:=+\-*/<>])\s*/g, "$1")
    .replace(/\n/g, "");
}

export function JsMinifier() {
  const [input, setInput] = React.useState("function greet(name) {\n  // say hello\n  console.log('Hello, ' + name);\n}");
  const output = React.useMemo(() => { try { return minifyJs(input); } catch { return input; } }, [input]);
  const saved = input.length ? Math.round((1 - output.length / input.length) * 100) : 0;

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <Textarea value={input} onChange={(e) => setInput(e.target.value)} placeholder="Paste JavaScript..." className="min-h-[180px] font-mono text-sm" />
      <div className="mt-4 flex items-center justify-between border-t pt-3">
        <p className="text-sm text-muted-foreground">{input.length} → {output.length} characters ({saved}% smaller)</p>
        <CopyButton value={output} label="Copy" />
      </div>
      <pre className="mt-2 max-h-64 overflow-auto rounded-md bg-muted p-3 text-xs break-all">{output}</pre>
      <p className="mt-2 text-xs text-muted-foreground">Strips comments and collapses whitespace — a safe textual minifier, not a full parser-based minifier like Terser.</p>
    </div>
  );
}

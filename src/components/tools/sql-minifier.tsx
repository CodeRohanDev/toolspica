"use client";

import * as React from "react";
import { Textarea } from "@/components/ui/textarea";
import { CopyButton } from "@/components/tools/copy-button";

function minifySql(sql: string) {
  return sql
    .replace(/--.*$/gm, "")
    .replace(/\/\*[\s\S]*?\*\//g, "")
    .replace(/\s+/g, " ")
    .trim();
}

export function SqlMinifier() {
  const [input, setInput] = React.useState("SELECT id, name\nFROM users\n-- active only\nWHERE active = 1\n  AND created_at > '2024-01-01'");
  const output = React.useMemo(() => minifySql(input), [input]);

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <Textarea value={input} onChange={(e) => setInput(e.target.value)} placeholder="Paste SQL..." className="min-h-[160px] font-mono text-sm" />
      <div className="mt-4 flex items-center justify-between border-t pt-3">
        <p className="text-sm text-muted-foreground">{input.length} → {output.length} characters</p>
        <CopyButton value={output} label="Copy" />
      </div>
      <pre className="mt-2 max-h-64 overflow-auto rounded-md bg-muted p-3 text-xs break-all">{output}</pre>
    </div>
  );
}

"use client";

import * as React from "react";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { CopyButton } from "@/components/tools/copy-button";

function evalPath(data: unknown, path: string): unknown {
  const tokens = path.replace(/^\$\.?/, "").match(/[^.[\]]+|\[\d+\]/g) ?? [];
  let cur = data;
  for (let t of tokens) {
    if (t.startsWith("[")) t = t.slice(1, -1);
    if (cur == null) return undefined;
    cur = (cur as Record<string, unknown>)[t];
  }
  return cur;
}

export function JsonPathTester() {
  const [json, setJson] = React.useState('{\n  "store": {\n    "book": [\n      {"title": "Book A", "price": 10},\n      {"title": "Book B", "price": 15}\n    ]\n  }\n}');
  const [path, setPath] = React.useState("$.store.book[0].title");
  const [error, setError] = React.useState<string | null>(null);

  const result = React.useMemo(() => {
    try {
      const data = JSON.parse(json);
      setError(null);
      return evalPath(data, path);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Invalid JSON");
      return undefined;
    }
  }, [json, path]);

  const resultText = result === undefined ? "" : JSON.stringify(result, null, 2);

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <Textarea value={json} onChange={(e) => setJson(e.target.value)} className="min-h-[180px] font-mono text-sm" />
      <Input value={path} onChange={(e) => setPath(e.target.value)} placeholder="$.store.book[0].title" className="mt-3 font-mono" />
      {error && <p className="mt-2 text-sm text-destructive">{error}</p>}
      {!error && (
        <div className="mt-3 border-t pt-3">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-muted-foreground">Result</p>
            {resultText && <CopyButton value={resultText} label="Copy" />}
          </div>
          <pre className="mt-2 max-h-48 overflow-auto rounded-md bg-muted p-3 text-xs">{resultText || "undefined (path not found)"}</pre>
        </div>
      )}
      <p className="mt-2 text-xs text-muted-foreground">Supports basic dot and bracket-index paths (e.g. $.a.b[0].c) — not the full JSONPath specification (filters, wildcards, slices).</p>
    </div>
  );
}

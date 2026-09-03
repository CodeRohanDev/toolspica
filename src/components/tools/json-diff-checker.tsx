"use client";

import * as React from "react";
import { Textarea } from "@/components/ui/textarea";
import { diffLines } from "@/lib/line-diff";

export function JsonDiffChecker() {
  const [a, setA] = React.useState("");
  const [b, setB] = React.useState("");
  const [error, setError] = React.useState<string | null>(null);

  const diff = React.useMemo(() => {
    try {
      setError(null);
      const pa = a.trim() ? JSON.stringify(JSON.parse(a), null, 2) : "";
      const pb = b.trim() ? JSON.stringify(JSON.parse(b), null, 2) : "";
      return diffLines(pa, pb);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Invalid JSON");
      return [];
    }
  }, [a, b]);

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <div className="grid gap-3 sm:grid-cols-2">
        <Textarea value={a} onChange={(e) => setA(e.target.value)} placeholder='{"a": 1}' className="min-h-[180px] font-mono text-sm" />
        <Textarea value={b} onChange={(e) => setB(e.target.value)} placeholder='{"a": 2}' className="min-h-[180px] font-mono text-sm" />
      </div>
      {error && <p className="mt-3 text-sm text-destructive">{error}</p>}
      {!error && (a || b) && (
        <div className="mt-3 max-h-96 overflow-auto rounded-md border font-mono text-sm">
          {diff.map((d, i) => (
            <div key={i} className={`whitespace-pre px-3 py-0.5 ${d.type === "added" ? "bg-green-500/15 text-green-700 dark:text-green-400" : d.type === "removed" ? "bg-red-500/15 text-red-700 dark:text-red-400" : ""}`}>
              {d.type === "added" ? "+ " : d.type === "removed" ? "- " : "  "}{d.text || " "}
            </div>
          ))}
        </div>
      )}
      <p className="mt-2 text-xs text-muted-foreground">Both inputs are normalized (parsed and re-formatted) before comparing, so formatting differences alone won&apos;t show as changes.</p>
    </div>
  );
}

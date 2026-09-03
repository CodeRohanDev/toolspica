"use client";

import * as React from "react";
import { Textarea } from "@/components/ui/textarea";
import { diffLines } from "@/lib/line-diff";

export function TextDiffChecker() {
  const [a, setA] = React.useState("");
  const [b, setB] = React.useState("");
  const diff = React.useMemo(() => diffLines(a, b), [a, b]);
  const added = diff.filter((d) => d.type === "added").length;
  const removed = diff.filter((d) => d.type === "removed").length;

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <div className="grid gap-3 sm:grid-cols-2">
        <Textarea value={a} onChange={(e) => setA(e.target.value)} placeholder="Original text" className="min-h-[180px]" />
        <Textarea value={b} onChange={(e) => setB(e.target.value)} placeholder="Changed text" className="min-h-[180px]" />
      </div>
      {(a || b) && (
        <>
          <p className="mt-3 text-sm text-muted-foreground">{added} lines added, {removed} lines removed</p>
          <div className="mt-2 max-h-96 overflow-auto rounded-md border font-mono text-sm">
            {diff.map((d, i) => (
              <div key={i} className={`whitespace-pre-wrap px-3 py-0.5 ${d.type === "added" ? "bg-green-500/15 text-green-700 dark:text-green-400" : d.type === "removed" ? "bg-red-500/15 text-red-700 dark:text-red-400" : ""}`}>
                {d.type === "added" ? "+ " : d.type === "removed" ? "- " : "  "}{d.text || " "}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

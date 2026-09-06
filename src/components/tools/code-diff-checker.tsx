"use client";

import * as React from "react";
import { Textarea } from "@/components/ui/textarea";
import { diffLines } from "@/lib/line-diff";

export function CodeDiffChecker() {
  const [a, setA] = React.useState("");
  const [b, setB] = React.useState("");
  const diff = React.useMemo(() => diffLines(a, b), [a, b]);

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <div className="grid gap-3 lg:grid-cols-2">
        <Textarea value={a} onChange={(e) => setA(e.target.value)} placeholder="Original code" className="min-h-[220px] font-mono text-sm" />
        <Textarea value={b} onChange={(e) => setB(e.target.value)} placeholder="Modified code" className="min-h-[220px] font-mono text-sm" />
      </div>
      {(a || b) && (
        <div className="mt-3 max-h-96 overflow-auto rounded-md border font-mono text-sm">
          {diff.map((d, i) => (
            <div key={i} className={`whitespace-pre px-3 py-0.5 ${d.type === "added" ? "bg-green-500/15 text-green-700" : d.type === "removed" ? "bg-red-500/15 text-red-700" : ""}`}>
              {d.type === "added" ? "+ " : d.type === "removed" ? "- " : "  "}{d.text || " "}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

"use client";

import * as React from "react";
import { Textarea } from "@/components/ui/textarea";

const STOP_WORDS = new Set("a an the and or but if then for of in on at to from by with as is are was were be been this that it its".split(" "));

export function KeywordDensityChecker() {
  const [text, setText] = React.useState("");

  const rows = React.useMemo(() => {
    const words = text.toLowerCase().replace(/[^a-z0-9\s]/g, " ").split(/\s+/).filter((w) => w.length > 1 && !STOP_WORDS.has(w));
    const total = words.length || 1;
    const freq = new Map<string, number>();
    for (const w of words) freq.set(w, (freq.get(w) ?? 0) + 1);
    return [...freq.entries()]
      .sort((a, b) => b[1] - a[1])
      .slice(0, 25)
      .map(([word, count]) => ({ word, count, pct: ((count / total) * 100).toFixed(2) }));
  }, [text]);

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <Textarea value={text} onChange={(e) => setText(e.target.value)} placeholder="Paste your page content or article text to analyze keyword density..." className="min-h-[200px]" />
      {rows.length > 0 && (
        <table className="mt-4 w-full border-t pt-2 text-sm">
          <thead>
            <tr className="text-left text-muted-foreground">
              <th className="py-2">Keyword</th>
              <th className="py-2">Count</th>
              <th className="py-2">Density</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.word} className="border-t">
                <td className="py-1.5 font-medium">{r.word}</td>
                <td className="py-1.5 tabular-nums">{r.count}</td>
                <td className="py-1.5 tabular-nums">{r.pct}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

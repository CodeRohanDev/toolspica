"use client";

import * as React from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { CopyButton } from "@/components/tools/copy-button";

const STOP_WORDS = new Set(
  "a an the and or but if then else for while of in on at to from by with about as is are was were be been being this that these those it its i you he she they we my your his her their our not no do does did can could will would should may might must".split(" ")
);

function extractKeywords(text: string, limit: number) {
  const words = text
    .toLowerCase()
    .replace(/[^a-z0-9\s'-]/g, " ")
    .split(/\s+/)
    .filter((w) => w.length > 2 && !STOP_WORDS.has(w));
  const freq = new Map<string, number>();
  for (const w of words) freq.set(w, (freq.get(w) ?? 0) + 1);
  return [...freq.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit)
    .map(([word, count]) => ({ word, count }));
}

export function AiKeywordExtractor() {
  const [text, setText] = React.useState("");
  const [limit, setLimit] = React.useState(15);
  const keywords = React.useMemo(() => extractKeywords(text, limit), [text, limit]);

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <Textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Paste an article, blog post, or any text to extract its most frequent meaningful keywords..."
        className="min-h-[220px]"
      />
      <div className="mt-4 flex items-center gap-3">
        <label className="text-sm text-muted-foreground">Max keywords</label>
        <input
          type="number"
          min={5}
          max={50}
          value={limit}
          onChange={(e) => setLimit(Math.max(5, Math.min(50, Number(e.target.value) || 15)))}
          className="w-20 rounded-md border bg-background px-2 py-1 text-sm"
        />
        <div className="ml-auto">
          <CopyButton value={keywords.map((k) => k.word).join(", ")} label="Copy keywords" />
        </div>
      </div>
      {keywords.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2 border-t pt-4">
          {keywords.map((k) => (
            <span
              key={k.word}
              className="rounded-full border bg-muted px-3 py-1 text-sm font-medium"
            >
              {k.word} <span className="text-muted-foreground">×{k.count}</span>
            </span>
          ))}
        </div>
      )}
      <Button
        type="button"
        variant="outline"
        size="sm"
        className="mt-4"
        onClick={() => setText("")}
      >
        Clear
      </Button>
    </div>
  );
}

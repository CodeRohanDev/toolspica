"use client";

import * as React from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { CopyButton } from "@/components/tools/copy-button";

const MINOR_WORDS = new Set([
  "a", "an", "the", "and", "but", "or", "nor", "for", "so", "yet",
  "at", "by", "in", "of", "on", "to", "up", "as", "if", "vs",
  "from", "into", "onto", "with",
]);

function toProperTitleCase(text: string): string {
  return text
    .split("\n")
    .map((line) => {
      const words = line.split(" ");
      return words
        .map((word, index) => {
          if (word.length === 0) return word;
          const lower = word.toLowerCase();
          const isFirstOrLast = index === 0 || index === words.length - 1;
          if (!isFirstOrLast && MINOR_WORDS.has(lower)) {
            return lower;
          }
          return lower.charAt(0).toUpperCase() + lower.slice(1);
        })
        .join(" ");
    })
    .join("\n");
}

export function TitleCaseConverter() {
  const [text, setText] = React.useState("");
  const output = React.useMemo(() => toProperTitleCase(text), [text]);

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <div className="flex items-center justify-between gap-3">
        <p className="text-sm font-medium text-muted-foreground">Your text</p>
        <Button type="button" variant="ghost" size="sm" onClick={() => setText("")}>
          Clear
        </Button>
      </div>
      <Textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="the quick guide to writing better headlines"
        rows={6}
        className="mt-3 resize-y text-sm"
      />

      <div className="mt-5 border-t pt-4">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium text-muted-foreground">
            Title Case (small words like "the", "of", "in" stay lowercase)
          </p>
          <CopyButton value={output} />
        </div>
        <Textarea
          readOnly
          value={output}
          rows={6}
          className="mt-2 resize-y bg-muted/40 text-sm"
        />
      </div>
    </div>
  );
}

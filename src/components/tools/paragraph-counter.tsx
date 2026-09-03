"use client";

import * as React from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { StatBar } from "@/components/tools/stat-bar";

export function ParagraphCounter() {
  const [text, setText] = React.useState("");

  const stats = React.useMemo(() => {
    const paragraphs = text
      .split(/\n\s*\n/)
      .map((p) => p.trim())
      .filter((p) => p.length > 0);

    const totalWords = paragraphs.reduce(
      (sum, p) => sum + (p.length === 0 ? 0 : p.split(/\s+/).length),
      0
    );

    return {
      count: paragraphs.length,
      avgWords:
        paragraphs.length === 0 ? 0 : Math.round(totalWords / paragraphs.length),
      totalWords,
    };
  }, [text]);

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
        placeholder={"Paste text with paragraphs separated by a blank line...\n\nLike this second paragraph."}
        rows={12}
        className="mt-3 resize-y text-sm"
      />

      <StatBar
        items={[
          { label: "paragraphs", value: stats.count },
          { label: "total words", value: stats.totalWords },
          { label: "avg words / paragraph", value: stats.avgWords },
        ]}
      />
    </div>
  );
}

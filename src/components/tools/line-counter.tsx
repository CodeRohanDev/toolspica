"use client";

import * as React from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { StatBar } from "@/components/tools/stat-bar";

export function LineCounter() {
  const [text, setText] = React.useState("");

  const stats = React.useMemo(() => {
    if (text.length === 0) {
      return { total: 0, nonEmpty: 0, empty: 0, longest: 0 };
    }
    const lines = text.split("\n");
    const nonEmpty = lines.filter((line) => line.trim().length > 0).length;
    const longest = Math.max(...lines.map((line) => line.length));
    return {
      total: lines.length,
      nonEmpty,
      empty: lines.length - nonEmpty,
      longest,
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
        placeholder="Paste text to count its lines..."
        rows={12}
        className="mt-3 resize-y text-sm"
      />

      <StatBar
        items={[
          { label: "total lines", value: stats.total },
          { label: "non-empty lines", value: stats.nonEmpty },
          { label: "empty lines", value: stats.empty },
          { label: "longest line (chars)", value: stats.longest },
        ]}
      />
    </div>
  );
}

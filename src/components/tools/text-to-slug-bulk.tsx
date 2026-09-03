"use client";

import * as React from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { CopyButton } from "@/components/tools/copy-button";

const COMBINING_MARKS = new RegExp("[\\u0300-\\u036f]", "g");

function toSlug(input: string): string {
  return input
    .normalize("NFKD")
    .replace(COMBINING_MARKS, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/[\s-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function TextToSlugBulk() {
  const [text, setText] = React.useState("");

  const output = React.useMemo(() => {
    return text
      .split("\n")
      .map((line) => toSlug(line))
      .join("\n");
  }, [text]);

  const nonEmptyCount = text.split("\n").filter((l) => l.trim()).length;

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <div className="flex items-center justify-between gap-3">
        <p className="text-sm font-medium text-muted-foreground">
          Titles or phrases (one per line)
        </p>
        <Button type="button" variant="ghost" size="sm" onClick={() => setText("")}>
          Clear
        </Button>
      </div>
      <Textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder={"10 Best Productivity Tools\nHow to Learn JavaScript Fast\nCafé Résumé Tips"}
        rows={10}
        className="mt-3 resize-y text-sm"
      />

      <div className="mt-5 border-t pt-4">
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            {nonEmptyCount > 0 ? `${nonEmptyCount} slug(s) generated` : "Slugs"}
          </p>
          <CopyButton value={output} />
        </div>
        <Textarea
          readOnly
          value={output}
          rows={10}
          className="mt-2 resize-y bg-muted/40 font-mono text-sm"
        />
      </div>
    </div>
  );
}

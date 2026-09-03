"use client";

import * as React from "react";
import { Input } from "@/components/ui/input";
import { CopyButton } from "@/components/tools/copy-button";

function slugify(input: string): string {
  return input
    .normalize("NFKD")
    .replace(new RegExp("[\\u0300-\\u036f]", "g"), "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/[\s-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function SlugifyTool() {
  const [text, setText] = React.useState("");
  const slug = React.useMemo(() => slugify(text), [text]);

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <Input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="e.g. My Component's Display Name!"
      />

      <div className="mt-5 border-t pt-4">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium text-muted-foreground">Slug</p>
          <CopyButton value={slug} />
        </div>
        <p className="mt-2 break-all rounded-lg bg-muted/40 p-3 font-mono text-sm">
          {slug || "your-slug-here"}
        </p>
      </div>
    </div>
  );
}

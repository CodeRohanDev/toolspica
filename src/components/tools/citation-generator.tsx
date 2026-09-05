"use client";

import * as React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CopyButton } from "@/components/tools/copy-button";
import { formatApa, formatMla, formatChicago, type CitationFields } from "@/lib/citation-format";

export function CitationGenerator() {
  const [fields, setFields] = React.useState<CitationFields>({
    author: "",
    title: "",
    year: "",
    source: "",
    url: "",
  });

  function update<K extends keyof CitationFields>(key: K, value: string) {
    setFields((prev) => ({ ...prev, [key]: value }));
  }

  const formats = [
    { label: "APA", value: formatApa(fields) },
    { label: "MLA", value: formatMla(fields) },
    { label: "Chicago", value: formatChicago(fields) },
  ];

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <div className="grid gap-3 sm:grid-cols-2">
        <div>
          <Label className="text-sm text-muted-foreground">Author</Label>
          <Input value={fields.author} onChange={(e) => update("author", e.target.value)} placeholder="Smith, Jane" className="mt-1.5" />
        </div>
        <div>
          <Label className="text-sm text-muted-foreground">Title</Label>
          <Input value={fields.title} onChange={(e) => update("title", e.target.value)} placeholder="Article or page title" className="mt-1.5" />
        </div>
        <div>
          <Label className="text-sm text-muted-foreground">Source / publisher</Label>
          <Input value={fields.source} onChange={(e) => update("source", e.target.value)} placeholder="Website or journal name" className="mt-1.5" />
        </div>
        <div>
          <Label className="text-sm text-muted-foreground">Year</Label>
          <Input value={fields.year} onChange={(e) => update("year", e.target.value)} placeholder="2026" className="mt-1.5" />
        </div>
        <div className="sm:col-span-2">
          <Label className="text-sm text-muted-foreground">URL (optional)</Label>
          <Input value={fields.url} onChange={(e) => update("url", e.target.value)} placeholder="https://example.com/article" className="mt-1.5" />
        </div>
      </div>

      <div className="mt-5 space-y-3 border-t pt-4">
        {formats.map((f) => (
          <div key={f.label} className="rounded-md border bg-muted/40 p-3">
            <div className="flex items-center justify-between">
              <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">{f.label}</p>
              <CopyButton value={f.value} label="" />
            </div>
            <p className="mt-1.5 text-sm">{f.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

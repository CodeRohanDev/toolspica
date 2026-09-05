"use client";

import * as React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { CopyButton } from "@/components/tools/copy-button";
import { formatApa, formatMla, formatChicago, type CitationFields } from "@/lib/citation-format";
import { Plus, X } from "lucide-react";

const EMPTY: CitationFields = { author: "", title: "", year: "", source: "", url: "" };

const FORMATTERS = { APA: formatApa, MLA: formatMla, Chicago: formatChicago } as const;

export function BibliographyGenerator() {
  const [entries, setEntries] = React.useState<CitationFields[]>([{ ...EMPTY }]);
  const [style, setStyle] = React.useState<keyof typeof FORMATTERS>("APA");

  function update(index: number, key: keyof CitationFields, value: string) {
    setEntries((prev) => prev.map((e, i) => (i === index ? { ...e, [key]: value } : e)));
  }

  function addEntry() {
    setEntries((prev) => [...prev, { ...EMPTY }]);
  }

  function removeEntry(index: number) {
    setEntries((prev) => prev.filter((_, i) => i !== index));
  }

  const formatter = FORMATTERS[style];
  const sorted = [...entries]
    .filter((e) => e.author || e.title)
    .sort((a, b) => a.author.localeCompare(b.author));
  const output = sorted.map(formatter).join("\n\n");

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <div className="flex flex-wrap gap-2">
        {(Object.keys(FORMATTERS) as (keyof typeof FORMATTERS)[]).map((s) => (
          <Button key={s} type="button" size="sm" variant={style === s ? "default" : "outline"} onClick={() => setStyle(s)}>
            {s}
          </Button>
        ))}
      </div>

      <div className="mt-4 space-y-4">
        {entries.map((entry, i) => (
          <div key={i} className="relative grid gap-2 rounded-lg border p-3 sm:grid-cols-2">
            {entries.length > 1 && (
              <button
                type="button"
                onClick={() => removeEntry(i)}
                className="absolute right-2 top-2 text-muted-foreground hover:text-destructive"
                aria-label="Remove entry"
              >
                <X className="size-4" />
              </button>
            )}
            <div>
              <Label className="text-xs text-muted-foreground">Author</Label>
              <Input value={entry.author} onChange={(e) => update(i, "author", e.target.value)} placeholder="Smith, Jane" className="mt-1" />
            </div>
            <div>
              <Label className="text-xs text-muted-foreground">Title</Label>
              <Input value={entry.title} onChange={(e) => update(i, "title", e.target.value)} placeholder="Title" className="mt-1" />
            </div>
            <div>
              <Label className="text-xs text-muted-foreground">Source</Label>
              <Input value={entry.source} onChange={(e) => update(i, "source", e.target.value)} placeholder="Publisher" className="mt-1" />
            </div>
            <div>
              <Label className="text-xs text-muted-foreground">Year</Label>
              <Input value={entry.year} onChange={(e) => update(i, "year", e.target.value)} placeholder="2026" className="mt-1" />
            </div>
          </div>
        ))}
      </div>

      <Button type="button" variant="outline" size="sm" className="mt-3" onClick={addEntry}>
        <Plus className="size-4" /> Add source
      </Button>

      <div className="mt-5 border-t pt-4">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium text-muted-foreground">Bibliography ({style})</p>
          <CopyButton value={output} />
        </div>
        <Textarea readOnly value={output} rows={8} className="mt-2 resize-y bg-muted/40 text-sm" />
      </div>
    </div>
  );
}

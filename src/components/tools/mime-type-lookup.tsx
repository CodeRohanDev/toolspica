"use client";

import * as React from "react";
import { Input } from "@/components/ui/input";
import { CopyButton } from "@/components/tools/copy-button";
import { MIME_TYPES } from "@/lib/mime-types";

export function MimeTypeLookup() {
  const [query, setQuery] = React.useState("");

  const filtered = MIME_TYPES.filter(
    (entry) =>
      entry.ext.toLowerCase().includes(query.toLowerCase()) ||
      entry.type.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <Input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search by extension or MIME type, e.g. .png or image"
      />

      <div className="mt-4 space-y-1.5">
        {filtered.map((entry) => (
          <div
            key={entry.ext}
            className="flex items-center justify-between gap-3 rounded-lg border p-2.5"
          >
            <span className="font-mono text-sm font-medium">{entry.ext}</span>
            <span className="flex min-w-0 items-center gap-2">
              <span className="truncate font-mono text-xs text-muted-foreground">
                {entry.type}
              </span>
              <CopyButton value={entry.type} label="" />
            </span>
          </div>
        ))}
        {filtered.length === 0 && (
          <p className="text-sm text-muted-foreground">No matching MIME types.</p>
        )}
      </div>
    </div>
  );
}

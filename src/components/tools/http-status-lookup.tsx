"use client";

import * as React from "react";
import { Input } from "@/components/ui/input";
import { HTTP_STATUS_CODES } from "@/lib/http-status-codes";

function categoryColor(code: number) {
  if (code < 300) return "text-emerald-600 bg-emerald-500/10";
  if (code < 400) return "text-blue-600 bg-blue-500/10";
  if (code < 500) return "text-amber-600 bg-amber-500/10";
  return "text-rose-600 bg-rose-500/10";
}

export function HttpStatusLookup() {
  const [query, setQuery] = React.useState("");

  const filtered = HTTP_STATUS_CODES.filter(
    (entry) =>
      String(entry.code).includes(query) ||
      entry.text.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <Input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search by code or name, e.g. 404 or Not Found"
      />

      <div className="mt-4 space-y-2">
        {filtered.map((entry) => (
          <div key={entry.code} className="flex items-start gap-3 rounded-lg border p-3">
            <span
              className={`shrink-0 rounded-md px-2 py-0.5 font-mono text-sm font-semibold ${categoryColor(entry.code)}`}
            >
              {entry.code}
            </span>
            <div>
              <p className="text-sm font-medium">{entry.text}</p>
              <p className="text-xs text-muted-foreground">{entry.description}</p>
            </div>
          </div>
        ))}
        {filtered.length === 0 && (
          <p className="text-sm text-muted-foreground">No matching status codes.</p>
        )}
      </div>
    </div>
  );
}

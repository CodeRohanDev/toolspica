"use client";

import * as React from "react";
import { Input } from "@/components/ui/input";

const ENTRIES = Array.from({ length: 128 }, (_, i) => i);

function displayChar(code: number): string {
  if (code < 32) {
    const names: Record<number, string> = {
      0: "NUL", 9: "TAB", 10: "LF", 13: "CR", 27: "ESC", 32: "SPACE",
    };
    return names[code] ?? "ctrl";
  }
  if (code === 32) return "SPACE";
  return String.fromCharCode(code);
}

export function AsciiTable() {
  const [query, setQuery] = React.useState("");

  const filtered = ENTRIES.filter((code) => {
    if (!query) return true;
    const char = displayChar(code);
    return (
      String(code).includes(query) ||
      char.toLowerCase().includes(query.toLowerCase()) ||
      code.toString(16).includes(query.toLowerCase())
    );
  });

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <Input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search by character, decimal, or hex..."
      />

      <div className="mt-4 grid max-h-[28rem] grid-cols-2 gap-1.5 overflow-y-auto sm:grid-cols-3 md:grid-cols-4">
        {filtered.map((code) => (
          <div
            key={code}
            className="flex items-center justify-between rounded-lg border px-2.5 py-1.5 text-xs"
          >
            <span className="font-mono font-semibold">{displayChar(code)}</span>
            <span className="text-muted-foreground">
              {code} · 0x{code.toString(16).padStart(2, "0").toUpperCase()}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

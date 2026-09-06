"use client";

import * as React from "react";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";

const LEVEL_STYLES: Record<string, string> = {
  ERROR: "bg-red-500/10 text-red-700 dark:text-red-400",
  FATAL: "bg-red-500/10 text-red-700 dark:text-red-400",
  WARN: "bg-amber-500/10 text-amber-700 dark:text-amber-400",
  WARNING: "bg-amber-500/10 text-amber-700 dark:text-amber-400",
  INFO: "bg-blue-500/10 text-blue-700 dark:text-blue-400",
  DEBUG: "bg-muted text-muted-foreground",
};

function detectLevel(line: string): string | null {
  const match = line.match(/\b(ERROR|FATAL|WARN(?:ING)?|INFO|DEBUG)\b/i);
  return match ? match[1].toUpperCase() : null;
}

export function LogFileViewer() {
  const [input, setInput] = React.useState("");
  const [filter, setFilter] = React.useState("");
  const [levelFilter, setLevelFilter] = React.useState<string | null>(null);

  function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    file.text().then(setInput);
  }

  const lines = React.useMemo(() => (input ? input.split("\n") : []), [input]);

  const counts = React.useMemo(() => {
    const c: Record<string, number> = {};
    for (const line of lines) {
      const level = detectLevel(line);
      if (level) c[level] = (c[level] ?? 0) + 1;
    }
    return c;
  }, [lines]);

  const filtered = lines.filter((line) => {
    if (filter && !line.toLowerCase().includes(filter.toLowerCase())) return false;
    if (levelFilter && detectLevel(line) !== levelFilter) return false;
    return true;
  });

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <div className="flex flex-wrap items-center gap-2">
        <input type="file" accept=".log,.txt" onChange={handleUpload} className="text-sm" />
        <Input value={filter} onChange={(e) => setFilter(e.target.value)} placeholder="Search..." className="max-w-xs" />
        {Object.entries(counts).map(([level, count]) => (
          <button
            key={level}
            type="button"
            onClick={() => setLevelFilter((l) => (l === level ? null : level))}
            className={`rounded-full px-2.5 py-1 text-xs font-medium ${LEVEL_STYLES[level] ?? "bg-muted"} ${levelFilter === level ? "ring-2 ring-brand" : ""}`}
          >
            {level} ({count})
          </button>
        ))}
      </div>

      {lines.length === 0 ? (
        <Textarea value={input} onChange={(e) => setInput(e.target.value)} placeholder="Paste log content, or upload a file above..." rows={16} className="mt-3 resize-y font-mono text-xs" />
      ) : (
        <div className="mt-3 max-h-[700px] overflow-auto rounded-lg border font-mono text-xs">
          {filtered.map((line, i) => {
            const level = detectLevel(line);
            return (
              <div key={i} className={`whitespace-pre-wrap border-b px-2 py-1 last:border-b-0 ${level ? LEVEL_STYLES[level] : ""}`}>
                {line || " "}
              </div>
            );
          })}
          {filtered.length === 0 && <p className="p-3 text-muted-foreground">No lines match the current filter.</p>}
        </div>
      )}
    </div>
  );
}

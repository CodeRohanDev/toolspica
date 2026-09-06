"use client";

import * as React from "react";
import { Textarea } from "@/components/ui/textarea";

type LineKind = "add" | "remove" | "hunk" | "file" | "context";

function classify(line: string): LineKind {
  if (line.startsWith("+++") || line.startsWith("---")) return "file";
  if (line.startsWith("@@")) return "hunk";
  if (line.startsWith("+")) return "add";
  if (line.startsWith("-")) return "remove";
  return "context";
}

const STYLES: Record<LineKind, string> = {
  add: "bg-green-500/10 text-green-700 dark:text-green-400",
  remove: "bg-red-500/10 text-red-700 dark:text-red-400",
  hunk: "bg-blue-500/10 text-blue-700 dark:text-blue-400 font-medium",
  file: "font-semibold",
  context: "",
};

export function GitPatchDiffFileViewer() {
  const [input, setInput] = React.useState("");

  function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    file.text().then(setInput);
  }

  const lines = React.useMemo(() => (input ? input.split("\n") : []), [input]);
  const stats = React.useMemo(() => {
    let added = 0;
    let removed = 0;
    for (const line of lines) {
      const kind = classify(line);
      if (kind === "add") added++;
      if (kind === "remove") removed++;
    }
    return { added, removed };
  }, [lines]);

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <input type="file" accept=".patch,.diff,.txt" onChange={handleUpload} className="text-sm" />

      <Textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Paste a .patch or .diff file's contents, or upload one above..."
        rows={14}
        className="mt-3 resize-y font-mono text-xs"
      />

      {lines.length > 0 && (
        <>
          <p className="mt-3 text-sm text-muted-foreground">
            <span className="text-green-600">+{stats.added} added</span>
            {" · "}
            <span className="text-red-600">-{stats.removed} removed</span>
          </p>
          <div className="mt-2 max-h-[700px] overflow-auto rounded-lg border font-mono text-xs">
            {lines.map((line, i) => (
              <div key={i} className={`whitespace-pre px-2 py-0.5 ${STYLES[classify(line)]}`}>
                {line || " "}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

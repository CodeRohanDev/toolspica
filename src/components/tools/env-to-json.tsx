"use client";

import * as React from "react";
import { Textarea } from "@/components/ui/textarea";
import { CopyButton } from "@/components/tools/copy-button";

function parseEnv(input: string): Record<string, string> {
  const result: Record<string, string> = {};
  for (const rawLine of input.split("\n")) {
    const line = rawLine.trim();
    if (!line || line.startsWith("#")) continue;
    const match = line.match(/^([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*)$/);
    if (!match) continue;
    let [, key, value] = match;
    value = value.trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    result[key] = value;
  }
  return result;
}

export function EnvToJson() {
  const [input, setInput] = React.useState("");
  const output = React.useMemo(() => {
    const parsed = parseEnv(input);
    return Object.keys(parsed).length > 0 ? JSON.stringify(parsed, null, 2) : "";
  }, [input]);

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <p className="text-sm font-medium text-muted-foreground">.env content</p>
      <Textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder={"# Database\nDATABASE_URL=postgres://localhost:5432/db\nAPI_KEY=\"abc123\"\nDEBUG=true"}
        rows={10}
        className="mt-3 resize-y font-mono text-sm"
      />

      <div className="mt-5 border-t pt-4">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium text-muted-foreground">JSON output</p>
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

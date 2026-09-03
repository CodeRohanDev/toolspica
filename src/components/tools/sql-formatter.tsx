"use client";

import * as React from "react";
import { Textarea } from "@/components/ui/textarea";
import { CopyButton } from "@/components/tools/copy-button";

const KEYWORDS = ["SELECT", "FROM", "WHERE", "AND", "OR", "JOIN", "LEFT JOIN", "RIGHT JOIN", "INNER JOIN", "GROUP BY", "ORDER BY", "HAVING", "LIMIT", "INSERT INTO", "VALUES", "UPDATE", "SET", "DELETE FROM", "ON"];

function formatSql(sql: string) {
  let out = sql.replace(/\s+/g, " ").trim();
  for (const kw of KEYWORDS) {
    out = out.replace(new RegExp(`\\s*\\b${kw}\\b\\s*`, "gi"), `\n${kw.toUpperCase()} `);
  }
  out = out.replace(/,\s*/g, ",\n  ");
  return out.trim();
}

export function SqlFormatter() {
  const [input, setInput] = React.useState("select id, name, email from users where active = 1 and created_at > '2024-01-01' order by created_at desc limit 10");
  const output = React.useMemo(() => formatSql(input), [input]);

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <Textarea value={input} onChange={(e) => setInput(e.target.value)} placeholder="Paste SQL..." className="min-h-[140px] font-mono text-sm" />
      <div className="mt-4 flex items-center justify-between border-t pt-3">
        <p className="text-sm font-medium text-muted-foreground">Formatted SQL</p>
        <CopyButton value={output} label="Copy" />
      </div>
      <pre className="mt-2 max-h-64 overflow-auto rounded-md bg-muted p-3 text-xs">{output}</pre>
      <p className="mt-2 text-xs text-muted-foreground">Keyword-based formatter — reindents around clause keywords rather than parsing a full SQL grammar.</p>
    </div>
  );
}

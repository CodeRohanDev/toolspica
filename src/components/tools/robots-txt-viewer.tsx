"use client";

import * as React from "react";
import { Textarea } from "@/components/ui/textarea";

interface RobotGroup {
  agents: string[];
  rules: { type: string; value: string }[];
}

function parseRobots(text: string): { groups: RobotGroup[]; sitemaps: string[] } {
  const lines = text.split("\n").map((l) => l.trim()).filter((l) => l && !l.startsWith("#"));
  const groups: RobotGroup[] = [];
  const sitemaps: string[] = [];
  let current: RobotGroup | null = null;

  for (const line of lines) {
    const [rawKey, ...rest] = line.split(":");
    const key = rawKey.trim().toLowerCase();
    const value = rest.join(":").trim();

    if (key === "sitemap") {
      sitemaps.push(value);
      continue;
    }
    if (key === "user-agent") {
      if (!current || current.rules.length > 0) {
        current = { agents: [value], rules: [] };
        groups.push(current);
      } else {
        current.agents.push(value);
      }
      continue;
    }
    if (current && ["allow", "disallow", "crawl-delay"].includes(key)) {
      current.rules.push({ type: key, value });
    }
  }

  return { groups, sitemaps };
}

export function RobotsTxtViewer() {
  const [input, setInput] = React.useState("User-agent: *\nDisallow: /admin\nAllow: /\n\nSitemap: https://example.com/sitemap.xml");

  function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    file.text().then(setInput);
  }

  const { groups, sitemaps } = React.useMemo(() => parseRobots(input), [input]);

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <input type="file" accept=".txt" onChange={handleUpload} className="text-sm" />

      <Textarea value={input} onChange={(e) => setInput(e.target.value)} rows={14} className="mt-3 resize-y font-mono text-sm" />

      <div className="mt-4 space-y-3 border-t pt-4">
        {groups.map((group, i) => (
          <div key={i} className="rounded-lg border p-3">
            <p className="text-sm font-medium">User-agent: {group.agents.join(", ")}</p>
            <ul className="mt-1.5 space-y-0.5">
              {group.rules.map((r, j) => (
                <li key={j} className="font-mono text-xs">
                  <span className={r.type === "disallow" ? "text-destructive" : "text-emerald-600"}>{r.type}</span>: {r.value || "(none)"}
                </li>
              ))}
            </ul>
          </div>
        ))}
        {sitemaps.length > 0 && (
          <div>
            <p className="text-sm font-medium text-muted-foreground">Sitemaps</p>
            {sitemaps.map((s, i) => (
              <p key={i} className="font-mono text-xs">{s}</p>
            ))}
          </div>
        )}
        {groups.length === 0 && sitemaps.length === 0 && (
          <p className="text-sm text-muted-foreground">No recognizable rules found.</p>
        )}
      </div>
    </div>
  );
}

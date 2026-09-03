"use client";

import * as React from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { CopyButton } from "@/components/tools/copy-button";

interface Rule {
  agent: string;
  disallow: string;
}

export function RobotsTxtGenerator() {
  const [rules, setRules] = React.useState<Rule[]>([{ agent: "*", disallow: "/admin/" }]);
  const [sitemap, setSitemap] = React.useState("");
  const [extra, setExtra] = React.useState("");

  function updateRule(i: number, field: keyof Rule, value: string) {
    setRules((r) => r.map((rule, idx) => (idx === i ? { ...rule, [field]: value } : rule)));
  }

  const output = [
    ...rules.map((r) => `User-agent: ${r.agent}\nDisallow: ${r.disallow}`),
    extra.trim(),
    sitemap && `Sitemap: ${sitemap}`,
  ]
    .filter(Boolean)
    .join("\n\n");

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      {rules.map((r, i) => (
        <div key={i} className="mb-3 grid gap-2 sm:grid-cols-2">
          <Input value={r.agent} onChange={(e) => updateRule(i, "agent", e.target.value)} placeholder="User-agent (e.g. *)" />
          <Input value={r.disallow} onChange={(e) => updateRule(i, "disallow", e.target.value)} placeholder="Disallow path (e.g. /admin/)" />
        </div>
      ))}
      <Button type="button" variant="outline" size="sm" onClick={() => setRules((r) => [...r, { agent: "*", disallow: "/" }])}>
        Add rule
      </Button>
      <Textarea value={extra} onChange={(e) => setExtra(e.target.value)} placeholder="Extra lines (optional, e.g. Allow: /public/)" className="mt-3 min-h-[60px]" />
      <Input value={sitemap} onChange={(e) => setSitemap(e.target.value)} placeholder="Sitemap URL (e.g. https://example.com/sitemap.xml)" className="mt-3" />
      <div className="mt-4 flex items-center justify-between border-t pt-3">
        <p className="text-sm font-medium text-muted-foreground">robots.txt</p>
        <CopyButton value={output} label="Copy" />
      </div>
      <pre className="mt-2 overflow-x-auto rounded-md bg-muted p-3 text-xs">{output}</pre>
    </div>
  );
}

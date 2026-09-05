"use client";

import * as React from "react";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { CopyButton } from "@/components/tools/copy-button";

const FREQUENCIES = ["always", "hourly", "daily", "weekly", "monthly", "yearly", "never"];

export function SitemapGenerator() {
  const [urls, setUrls] = React.useState("");
  const [changefreq, setChangefreq] = React.useState("weekly");
  const [priority, setPriority] = React.useState("0.8");

  const lines = urls
    .split("\n")
    .map((u) => u.trim())
    .filter(Boolean);

  const xml =
    lines.length === 0
      ? ""
      : `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${lines
          .map(
            (url) =>
              `  <url>\n    <loc>${url}</loc>\n    <changefreq>${changefreq}</changefreq>\n    <priority>${priority}</priority>\n  </url>`
          )
          .join("\n")}\n</urlset>`;

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <Label className="text-sm text-muted-foreground">URLs (one per line)</Label>
      <Textarea
        value={urls}
        onChange={(e) => setUrls(e.target.value)}
        placeholder={"https://example.com/\nhttps://example.com/about\nhttps://example.com/contact"}
        rows={8}
        className="mt-1.5 resize-y font-mono text-sm"
      />

      <div className="mt-3 grid gap-3 sm:grid-cols-2">
        <div>
          <Label className="text-sm text-muted-foreground">Change frequency</Label>
          <select
            value={changefreq}
            onChange={(e) => setChangefreq(e.target.value)}
            className="mt-1.5 w-full rounded-md border bg-transparent px-2.5 py-1.5 text-sm"
          >
            {FREQUENCIES.map((f) => (
              <option key={f} value={f}>
                {f}
              </option>
            ))}
          </select>
        </div>
        <div>
          <Label className="text-sm text-muted-foreground">Priority (0.0 - 1.0)</Label>
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="mt-1.5 w-full rounded-md border bg-transparent px-2.5 py-1.5 text-sm"
          >
            {["1.0", "0.9", "0.8", "0.7", "0.6", "0.5"].map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
        </div>
      </div>

      {xml && (
        <div className="mt-5 border-t pt-4">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-muted-foreground">sitemap.xml</p>
            <CopyButton value={xml} />
          </div>
          <Textarea readOnly value={xml} rows={12} className="mt-2 resize-y bg-muted/40 font-mono text-xs" />
        </div>
      )}
    </div>
  );
}

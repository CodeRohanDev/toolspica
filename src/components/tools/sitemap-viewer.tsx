"use client";

import * as React from "react";
import { Textarea } from "@/components/ui/textarea";
import { Upload } from "lucide-react";

interface SitemapUrl {
  loc: string;
  lastmod: string;
  changefreq: string;
  priority: string;
}

export function SitemapViewer() {
  const [input, setInput] = React.useState("");

  function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    file.text().then(setInput);
  }

  const urls = React.useMemo<SitemapUrl[]>(() => {
    if (!input.trim()) return [];
    try {
      const doc = new DOMParser().parseFromString(input, "application/xml");
      if (doc.querySelector("parsererror")) return [];
      return Array.from(doc.querySelectorAll("url")).map((el) => ({
        loc: el.querySelector("loc")?.textContent ?? "",
        lastmod: el.querySelector("lastmod")?.textContent ?? "—",
        changefreq: el.querySelector("changefreq")?.textContent ?? "—",
        priority: el.querySelector("priority")?.textContent ?? "—",
      }));
    } catch {
      return [];
    }
  }, [input]);

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <label className="flex w-fit cursor-pointer items-center gap-2 rounded-md border px-3 py-2 text-sm hover:bg-accent">
        <Upload className="size-4" />
        Upload sitemap.xml
        <input type="file" accept=".xml" onChange={handleUpload} className="hidden" />
      </label>

      <Textarea value={input} onChange={(e) => setInput(e.target.value)} placeholder="Paste sitemap.xml content, or upload a file above..." rows={14} className="mt-3 resize-y font-mono text-xs" />

      {urls.length > 0 && (
        <div className="mt-4 border-t pt-4">
          <p className="mb-2 text-sm text-muted-foreground">{urls.length} URL{urls.length === 1 ? "" : "s"}</p>
          <div className="max-h-[750px] overflow-auto rounded-lg border">
            <table className="w-full text-sm">
              <thead className="sticky top-0 bg-card">
                <tr className="border-b bg-muted/40">
                  <th className="p-2 text-left font-medium text-muted-foreground">URL</th>
                  <th className="p-2 text-left font-medium text-muted-foreground">Last modified</th>
                  <th className="p-2 text-left font-medium text-muted-foreground">Change freq</th>
                  <th className="p-2 text-left font-medium text-muted-foreground">Priority</th>
                </tr>
              </thead>
              <tbody>
                {urls.map((u, i) => (
                  <tr key={i} className="border-b last:border-b-0">
                    <td className="max-w-[260px] truncate p-2 font-mono text-xs" title={u.loc}>{u.loc}</td>
                    <td className="p-2 text-xs text-muted-foreground">{u.lastmod}</td>
                    <td className="p-2 text-xs text-muted-foreground">{u.changefreq}</td>
                    <td className="p-2 text-xs text-muted-foreground">{u.priority}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

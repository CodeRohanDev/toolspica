"use client";

import * as React from "react";
import { Upload } from "lucide-react";
import { StatBar } from "@/components/tools/stat-bar";

interface HarEntry {
  method: string;
  url: string;
  status: number;
  time: number;
  size: number;
}

function parseHar(text: string): HarEntry[] {
  const json = JSON.parse(text);
  const entries = json?.log?.entries ?? [];
  return entries.map((e: Record<string, unknown>) => {
    const request = e.request as Record<string, unknown>;
    const response = e.response as Record<string, unknown>;
    const content = response?.content as Record<string, unknown> | undefined;
    return {
      method: (request?.method as string) ?? "?",
      url: (request?.url as string) ?? "",
      status: (response?.status as number) ?? 0,
      time: Math.round((e.time as number) ?? 0),
      size: (content?.size as number) ?? 0,
    };
  });
}

function statusColor(status: number): string {
  if (status >= 500) return "text-red-600";
  if (status >= 400) return "text-amber-600";
  if (status >= 300) return "text-blue-600";
  if (status >= 200) return "text-emerald-600";
  return "text-muted-foreground";
}

export function HarFileViewer() {
  const [entries, setEntries] = React.useState<HarEntry[]>([]);
  const [error, setError] = React.useState("");
  const [fileName, setFileName] = React.useState("");

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setFileName(file.name);
    setError("");
    try {
      const text = await file.text();
      setEntries(parseHar(text));
    } catch {
      setError("Couldn't parse that file — make sure it's a valid .har file.");
      setEntries([]);
    }
  }

  const totalTime = entries.reduce((sum, e) => sum + e.time, 0);
  const totalSize = entries.reduce((sum, e) => sum + e.size, 0);

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <label className="flex w-fit cursor-pointer items-center gap-2 rounded-md border px-3 py-2 text-sm hover:bg-accent">
        <Upload className="size-4" />
        {fileName || "Upload a .har file"}
        <input type="file" accept=".har" onChange={handleUpload} className="hidden" />
      </label>

      {error && <p className="mt-3 text-sm text-destructive">{error}</p>}

      {entries.length > 0 && (
        <>
          <StatBar
            items={[
              { label: "requests", value: entries.length },
              { label: "total time", value: `${totalTime} ms` },
              { label: "total size", value: `${(totalSize / 1024).toFixed(1)} KB` },
            ]}
          />
          <div className="mt-2 max-h-[450px] overflow-auto rounded-lg border">
            <table className="w-full text-sm">
              <thead className="sticky top-0 bg-card">
                <tr className="border-b bg-muted/40">
                  <th className="p-2 text-left font-medium text-muted-foreground">Method</th>
                  <th className="p-2 text-left font-medium text-muted-foreground">URL</th>
                  <th className="p-2 text-left font-medium text-muted-foreground">Status</th>
                  <th className="p-2 text-left font-medium text-muted-foreground">Time</th>
                </tr>
              </thead>
              <tbody>
                {entries.map((e, i) => (
                  <tr key={i} className="border-b last:border-b-0">
                    <td className="p-2 font-mono text-xs">{e.method}</td>
                    <td className="max-w-[300px] truncate p-2 font-mono text-xs" title={e.url}>{e.url}</td>
                    <td className={`p-2 font-mono text-xs font-medium ${statusColor(e.status)}`}>{e.status}</td>
                    <td className="p-2 font-mono text-xs text-muted-foreground">{e.time} ms</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
      <p className="mt-3 text-xs text-muted-foreground">
        Export a .har file from your browser&apos;s DevTools Network tab (right-click → &quot;Save
        all as HAR&quot;) to analyze it here.
      </p>
    </div>
  );
}

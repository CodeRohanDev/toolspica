"use client";

import * as React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { CopyButton } from "@/components/tools/copy-button";

interface HeaderResult {
  status: number;
  statusText: string;
  headers: Record<string, string>;
  finalUrl: string;
  redirected: boolean;
}

export function HttpHeaderChecker() {
  const [url, setUrl] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [result, setResult] = React.useState<HeaderResult | null>(null);

  async function check() {
    if (!url.trim()) return;
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const res = await fetch(`/api/http-headers?url=${encodeURIComponent(url.trim())}`);
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Could not fetch headers.");
      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not fetch headers.");
    } finally {
      setLoading(false);
    }
  }

  const headerText = result
    ? Object.entries(result.headers)
        .map(([k, v]) => `${k}: ${v}`)
        .join("\n")
    : "";

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <Label htmlFor="header-url" className="text-sm text-muted-foreground">
        Website URL
      </Label>
      <div className="mt-1.5 flex gap-2">
        <Input
          id="header-url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="example.com"
          onKeyDown={(e) => e.key === "Enter" && check()}
        />
        <Button type="button" onClick={check} disabled={loading || !url.trim()}>
          {loading ? "Checking..." : "Check headers"}
        </Button>
      </div>

      {error && <p className="mt-3 text-sm text-destructive">{error}</p>}

      {result && (
        <div className="mt-5">
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-md bg-brand-soft px-2 py-1 text-sm font-semibold">
              {result.status} {result.statusText}
            </span>
            {result.redirected && (
              <span className="text-xs text-muted-foreground">Redirected to {result.finalUrl}</span>
            )}
          </div>
          <div className="mt-3 flex items-center justify-between gap-2">
            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              Response headers
            </p>
            <CopyButton value={headerText} />
          </div>
          <div className="mt-1.5 overflow-hidden rounded-lg border">
            <table className="w-full text-sm">
              <tbody>
                {Object.entries(result.headers).map(([key, value]) => (
                  <tr key={key} className="border-b last:border-0">
                    <td className="w-1/3 bg-muted/40 px-3 py-1.5 font-mono text-xs font-medium">
                      {key}
                    </td>
                    <td className="px-3 py-1.5 font-mono text-xs break-all">{value}</td>
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

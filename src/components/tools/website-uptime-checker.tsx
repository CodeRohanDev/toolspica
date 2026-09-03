"use client";

import * as React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

interface UptimeResult {
  up: boolean;
  status: number | null;
  responseTimeMs: number | null;
  error: string | null;
  checkedAt: string;
}

export function WebsiteUptimeChecker() {
  const [url, setUrl] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [result, setResult] = React.useState<UptimeResult | null>(null);

  async function check() {
    if (!url.trim()) return;
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const res = await fetch(`/api/website-uptime-check?url=${encodeURIComponent(url.trim())}`);
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Could not check this site.");
      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not check this site.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <Label htmlFor="uptime-url" className="text-sm text-muted-foreground">
        Website URL
      </Label>
      <div className="mt-1.5 flex gap-2">
        <Input
          id="uptime-url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="example.com"
          onKeyDown={(e) => e.key === "Enter" && check()}
        />
        <Button type="button" onClick={check} disabled={loading || !url.trim()}>
          {loading ? "Checking..." : "Check now"}
        </Button>
      </div>

      <p className="mt-2 text-xs text-muted-foreground">
        This checks whether the site is up right now — a single live check, not continuous
        historical monitoring.
      </p>

      {error && <p className="mt-3 text-sm text-destructive">{error}</p>}

      {result && (
        <div
          className={`mt-5 rounded-lg p-4 ${
            result.up ? "bg-brand-soft" : "bg-destructive/10 text-destructive"
          }`}
        >
          <p className="text-lg font-bold">{result.up ? "Site is UP" : "Site is DOWN"}</p>
          <div className="mt-2 grid grid-cols-2 gap-3 text-sm sm:grid-cols-3">
            <div>
              <p className="text-xs uppercase tracking-wide opacity-70">Status code</p>
              <p className="font-mono font-semibold">{result.status ?? "—"}</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-wide opacity-70">Response time</p>
              <p className="font-mono font-semibold">
                {result.responseTimeMs !== null ? `${result.responseTimeMs.toFixed(0)} ms` : "—"}
              </p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-wide opacity-70">Checked at</p>
              <p className="font-mono font-semibold">{new Date(result.checkedAt).toLocaleTimeString()}</p>
            </div>
          </div>
          {result.error && <p className="mt-2 text-sm">{result.error}</p>}
        </div>
      )}
    </div>
  );
}

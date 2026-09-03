"use client";

import * as React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

interface SpeedResult {
  dnsTimeMs: number;
  connectTimeMs: number;
  tlsTimeMs: number | null;
  ttfbMs: number;
  totalTimeMs: number;
  bytesReceived: number;
  status: number;
}

function fmt(ms: number) {
  return `${ms.toFixed(0)} ms`;
}

export function WebsiteSpeedTest() {
  const [url, setUrl] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [result, setResult] = React.useState<SpeedResult | null>(null);

  async function runTest() {
    if (!url.trim()) return;
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const res = await fetch(`/api/website-speed-test?url=${encodeURIComponent(url.trim())}`);
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Speed test failed.");
      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Speed test failed.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <Label htmlFor="speed-url" className="text-sm text-muted-foreground">
        Website URL
      </Label>
      <div className="mt-1.5 flex gap-2">
        <Input
          id="speed-url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="example.com"
          onKeyDown={(e) => e.key === "Enter" && runTest()}
        />
        <Button type="button" onClick={runTest} disabled={loading || !url.trim()}>
          {loading ? "Testing..." : "Run test"}
        </Button>
      </div>

      <p className="mt-2 text-xs text-muted-foreground">
        Measures response timing for the main HTML document from our server — not a full
        page-load test with images, scripts, and rendering like Lighthouse.
      </p>

      {error && <p className="mt-3 text-sm text-destructive">{error}</p>}

      {result && (
        <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3">
          {[
            { label: "DNS lookup", value: fmt(result.dnsTimeMs) },
            { label: "TCP connect", value: fmt(result.connectTimeMs) },
            { label: "TLS handshake", value: result.tlsTimeMs !== null ? fmt(result.tlsTimeMs) : "N/A" },
            { label: "Time to first byte", value: fmt(result.ttfbMs) },
            { label: "Total time", value: fmt(result.totalTimeMs) },
            { label: "HTML size", value: `${(result.bytesReceived / 1024).toFixed(1)} KB` },
          ].map((item) => (
            <div key={item.label} className="rounded-lg border bg-card p-3">
              <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                {item.label}
              </p>
              <p className="mt-1 font-mono text-sm font-semibold">{item.value}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

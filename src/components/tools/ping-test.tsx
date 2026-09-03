"use client";

import * as React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface PingResult {
  host: string;
  port: number;
  attempts: { success: boolean; timeMs: number | null }[];
  minMs: number | null;
  avgMs: number | null;
  maxMs: number | null;
  lossPercent: number;
}

const PORTS = [
  { value: "443", label: "443 (HTTPS)" },
  { value: "80", label: "80 (HTTP)" },
  { value: "22", label: "22 (SSH)" },
  { value: "21", label: "21 (FTP)" },
  { value: "25", label: "25 (SMTP)" },
];

export function PingTest() {
  const [host, setHost] = React.useState("");
  const [port, setPort] = React.useState("443");
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [result, setResult] = React.useState<PingResult | null>(null);

  async function runPing() {
    if (!host.trim()) return;
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const res = await fetch(
        `/api/ping-test?host=${encodeURIComponent(host.trim())}&port=${port}`
      );
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Ping failed.");
      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Ping failed.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <div className="flex flex-wrap items-end gap-3">
        <div className="min-w-0 flex-1">
          <Label htmlFor="ping-host" className="text-sm text-muted-foreground">
            Hostname
          </Label>
          <Input
            id="ping-host"
            value={host}
            onChange={(e) => setHost(e.target.value)}
            placeholder="example.com"
            onKeyDown={(e) => e.key === "Enter" && runPing()}
            className="mt-1.5"
          />
        </div>
        <div className="w-40">
          <Label className="text-sm text-muted-foreground">Port</Label>
          <Select value={port} onValueChange={(v) => v && setPort(v)}>
            <SelectTrigger className="mt-1.5 w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {PORTS.map((p) => (
                <SelectItem key={p.value} value={p.value}>
                  {p.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <Button type="button" onClick={runPing} disabled={loading || !host.trim()}>
          {loading ? "Pinging..." : "Ping"}
        </Button>
      </div>

      <p className="mt-2 text-xs text-muted-foreground">
        Measures TCP connect latency to the chosen port — a browser-safe stand-in for ICMP ping,
        which isn&apos;t reachable from a normal web server.
      </p>

      {error && <p className="mt-3 text-sm text-destructive">{error}</p>}

      {result && (
        <div className="mt-5">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {[
              { label: "Min", value: result.minMs !== null ? `${result.minMs.toFixed(1)} ms` : "—" },
              { label: "Avg", value: result.avgMs !== null ? `${result.avgMs.toFixed(1)} ms` : "—" },
              { label: "Max", value: result.maxMs !== null ? `${result.maxMs.toFixed(1)} ms` : "—" },
              { label: "Packet loss", value: `${result.lossPercent}%` },
            ].map((item) => (
              <div key={item.label} className="rounded-lg border bg-card p-3">
                <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  {item.label}
                </p>
                <p className="mt-1 font-mono text-sm font-semibold">{item.value}</p>
              </div>
            ))}
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            {result.attempts.map((a, i) => (
              <span
                key={i}
                className={`rounded-md px-2 py-1 font-mono text-xs ${
                  a.success ? "bg-muted" : "bg-destructive/10 text-destructive"
                }`}
              >
                #{i + 1}: {a.success ? `${a.timeMs?.toFixed(1)} ms` : "timeout"}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

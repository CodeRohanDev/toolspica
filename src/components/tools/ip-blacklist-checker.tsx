"use client";

import * as React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Check, X } from "lucide-react";

interface BlacklistResult {
  ip: string;
  listedCount: number;
  results: { zone: string; name: string; listed: boolean }[];
}

export function IpBlacklistChecker() {
  const [ip, setIp] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [result, setResult] = React.useState<BlacklistResult | null>(null);

  async function check() {
    if (!ip.trim()) return;
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const res = await fetch(`/api/ip-blacklist-check?ip=${encodeURIComponent(ip.trim())}`);
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Blacklist check failed.");
      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Blacklist check failed.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <Label htmlFor="blacklist-ip" className="text-sm text-muted-foreground">
        IPv4 address
      </Label>
      <div className="mt-1.5 flex gap-2">
        <Input
          id="blacklist-ip"
          value={ip}
          onChange={(e) => setIp(e.target.value)}
          placeholder="192.0.2.1"
          onKeyDown={(e) => e.key === "Enter" && check()}
        />
        <Button type="button" onClick={check} disabled={loading || !ip.trim()}>
          {loading ? "Checking..." : "Check"}
        </Button>
      </div>

      <p className="mt-2 text-xs text-muted-foreground">
        Checks against public DNSBL (DNS-based blackhole list) zones used to flag spam and abuse
        sources — IPv4 only.
      </p>

      {error && <p className="mt-3 text-sm text-destructive">{error}</p>}

      {result && (
        <div className="mt-5">
          <div
            className={`rounded-lg p-3 text-sm font-semibold ${
              result.listedCount === 0 ? "bg-brand-soft" : "bg-destructive/10 text-destructive"
            }`}
          >
            {result.listedCount === 0
              ? "Not listed on any checked blacklist"
              : `Listed on ${result.listedCount} of ${result.results.length} checked blacklists`}
          </div>
          <div className="mt-3 space-y-2">
            {result.results.map((r) => (
              <div
                key={r.zone}
                className="flex items-center justify-between rounded-lg border bg-card p-3 text-sm"
              >
                <span>{r.name}</span>
                <span
                  className={`flex items-center gap-1.5 font-medium ${
                    r.listed ? "text-destructive" : "text-green-600 dark:text-green-500"
                  }`}
                >
                  {r.listed ? <X className="size-4" /> : <Check className="size-4" />}
                  {r.listed ? "Listed" : "Clean"}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

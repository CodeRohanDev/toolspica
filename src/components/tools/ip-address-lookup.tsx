"use client";

import * as React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

interface IpInfo {
  ip: string;
  city?: string;
  region?: string;
  country?: string;
  countryCode?: string;
  isp?: string;
  org?: string;
  timezone?: string;
  lat?: number;
  lon?: number;
}

export function IpAddressLookup() {
  const [ip, setIp] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [info, setInfo] = React.useState<IpInfo | null>(null);

  async function lookup() {
    if (!ip.trim()) return;
    setLoading(true);
    setError(null);
    setInfo(null);
    try {
      const res = await fetch(`/api/ip-lookup?ip=${encodeURIComponent(ip.trim())}`);
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "IP lookup failed.");
      setInfo(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "IP lookup failed.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <Label htmlFor="ip-input" className="text-sm text-muted-foreground">
        IP address
      </Label>
      <div className="mt-1.5 flex gap-2">
        <Input
          id="ip-input"
          value={ip}
          onChange={(e) => setIp(e.target.value)}
          placeholder="8.8.8.8"
          onKeyDown={(e) => e.key === "Enter" && lookup()}
        />
        <Button type="button" onClick={lookup} disabled={loading || !ip.trim()}>
          {loading ? "Looking up..." : "Lookup"}
        </Button>
      </div>

      {error && <p className="mt-3 text-sm text-destructive">{error}</p>}

      {info && (
        <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3">
          {[
            { label: "IP address", value: info.ip },
            { label: "City", value: info.city ?? "—" },
            { label: "Region", value: info.region ?? "—" },
            { label: "Country", value: info.country ? `${info.country} (${info.countryCode})` : "—" },
            { label: "ISP", value: info.isp ?? "—" },
            { label: "Organization", value: info.org ?? "—" },
            { label: "Timezone", value: info.timezone ?? "—" },
            {
              label: "Coordinates",
              value: info.lat !== undefined ? `${info.lat}, ${info.lon}` : "—",
            },
          ].map((item) => (
            <div key={item.label} className="rounded-lg border bg-card p-3">
              <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                {item.label}
              </p>
              <p className="mt-1 text-sm font-semibold break-words">{item.value}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

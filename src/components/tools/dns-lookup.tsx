"use client";

import * as React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

interface DnsRecords {
  a?: string[];
  aaaa?: string[];
  mx?: { exchange: string; priority: number }[];
  txt?: string[][];
  ns?: string[];
  cname?: string[];
  soa?: {
    nsname: string;
    hostmaster: string;
    serial: number;
    refresh: number;
    retry: number;
    expire: number;
    minttl: number;
  };
}

export function DnsLookup() {
  const [domain, setDomain] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [records, setRecords] = React.useState<DnsRecords | null>(null);

  async function lookup() {
    if (!domain.trim()) return;
    setLoading(true);
    setError(null);
    setRecords(null);
    try {
      const res = await fetch(`/api/dns-lookup?domain=${encodeURIComponent(domain.trim())}&type=ALL`);
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "DNS lookup failed.");
      setRecords(data.records);
    } catch (err) {
      setError(err instanceof Error ? err.message : "DNS lookup failed.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <Label htmlFor="dns-domain" className="text-sm text-muted-foreground">
        Domain name
      </Label>
      <div className="mt-1.5 flex gap-2">
        <Input
          id="dns-domain"
          value={domain}
          onChange={(e) => setDomain(e.target.value)}
          placeholder="example.com"
          onKeyDown={(e) => e.key === "Enter" && lookup()}
        />
        <Button type="button" onClick={lookup} disabled={loading || !domain.trim()}>
          {loading ? "Looking up..." : "Lookup"}
        </Button>
      </div>

      {error && <p className="mt-3 text-sm text-destructive">{error}</p>}

      {records && (
        <div className="mt-5 space-y-4">
          {records.a && (
            <RecordBlock title="A (IPv4)">
              {records.a.map((ip) => (
                <p key={ip} className="font-mono text-sm">
                  {ip}
                </p>
              ))}
            </RecordBlock>
          )}
          {records.aaaa && (
            <RecordBlock title="AAAA (IPv6)">
              {records.aaaa.map((ip) => (
                <p key={ip} className="font-mono text-sm break-all">
                  {ip}
                </p>
              ))}
            </RecordBlock>
          )}
          {records.cname && (
            <RecordBlock title="CNAME">
              {records.cname.map((c) => (
                <p key={c} className="font-mono text-sm">
                  {c}
                </p>
              ))}
            </RecordBlock>
          )}
          {records.mx && (
            <RecordBlock title="MX">
              {records.mx
                .slice()
                .sort((a, b) => a.priority - b.priority)
                .map((mx, i) => (
                  <p key={i} className="font-mono text-sm">
                    {mx.priority} {mx.exchange || "(null MX — accepts no mail)"}
                  </p>
                ))}
            </RecordBlock>
          )}
          {records.ns && (
            <RecordBlock title="NS">
              {records.ns.map((ns) => (
                <p key={ns} className="font-mono text-sm">
                  {ns}
                </p>
              ))}
            </RecordBlock>
          )}
          {records.txt && (
            <RecordBlock title="TXT">
              {records.txt.map((chunks, i) => (
                <p key={i} className="break-all font-mono text-sm">
                  {chunks.join("")}
                </p>
              ))}
            </RecordBlock>
          )}
          {records.soa && (
            <RecordBlock title="SOA">
              <p className="font-mono text-sm">Primary NS: {records.soa.nsname}</p>
              <p className="font-mono text-sm">Admin: {records.soa.hostmaster}</p>
              <p className="font-mono text-sm">Serial: {records.soa.serial}</p>
              <p className="font-mono text-sm">
                Refresh {records.soa.refresh}s / Retry {records.soa.retry}s / Expire{" "}
                {records.soa.expire}s
              </p>
            </RecordBlock>
          )}
        </div>
      )}
    </div>
  );
}

function RecordBlock({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-lg border bg-card p-3">
      <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">{title}</p>
      <div className="mt-1.5 space-y-0.5">{children}</div>
    </div>
  );
}

"use client";

import * as React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

interface MxRecord {
  exchange: string;
  priority: number;
}

export function MxRecordLookup() {
  const [domain, setDomain] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [records, setRecords] = React.useState<MxRecord[] | null>(null);

  async function lookup() {
    if (!domain.trim()) return;
    setLoading(true);
    setError(null);
    setRecords(null);
    try {
      const res = await fetch(`/api/dns-lookup?domain=${encodeURIComponent(domain.trim())}&type=MX`);
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "MX lookup failed.");
      setRecords(data.records.mx ?? []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "MX lookup failed.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <Label htmlFor="mx-domain" className="text-sm text-muted-foreground">
        Domain name
      </Label>
      <div className="mt-1.5 flex gap-2">
        <Input
          id="mx-domain"
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
        <div className="mt-5">
          {records.length === 0 ? (
            <p className="text-sm text-muted-foreground">This domain has no MX records.</p>
          ) : (
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b text-left text-xs uppercase tracking-wide text-muted-foreground">
                  <th className="pb-2 pr-4">Priority</th>
                  <th className="pb-2">Mail server</th>
                </tr>
              </thead>
              <tbody>
                {records
                  .slice()
                  .sort((a, b) => a.priority - b.priority)
                  .map((r, i) => (
                    <tr key={i} className="border-b last:border-0">
                      <td className="py-2 pr-4 font-mono">{r.priority}</td>
                      <td className="py-2 font-mono break-all">
                        {r.exchange || "(null MX — accepts no mail)"}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  );
}

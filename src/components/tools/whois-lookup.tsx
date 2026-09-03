"use client";

import * as React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { CopyButton } from "@/components/tools/copy-button";

export function WhoisLookup() {
  const [domain, setDomain] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [raw, setRaw] = React.useState<string | null>(null);
  const [server, setServer] = React.useState<string | null>(null);

  async function lookup() {
    if (!domain.trim()) return;
    setLoading(true);
    setError(null);
    setRaw(null);
    try {
      const res = await fetch(`/api/whois-lookup?domain=${encodeURIComponent(domain.trim())}`);
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "WHOIS lookup failed.");
      setRaw(data.raw);
      setServer(data.server);
    } catch (err) {
      setError(err instanceof Error ? err.message : "WHOIS lookup failed.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <Label htmlFor="whois-domain" className="text-sm text-muted-foreground">
        Domain name
      </Label>
      <div className="mt-1.5 flex gap-2">
        <Input
          id="whois-domain"
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

      {raw && (
        <div className="mt-5">
          <div className="flex items-center justify-between gap-2">
            <p className="text-xs text-muted-foreground">Source: {server}</p>
            <CopyButton value={raw} />
          </div>
          <pre className="mt-1.5 max-h-[28rem] overflow-auto rounded-lg border bg-muted/40 p-3 text-xs whitespace-pre-wrap">
            {raw}
          </pre>
        </div>
      )}
    </div>
  );
}

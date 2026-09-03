"use client";

import * as React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

interface CertResult {
  host: string;
  subject: Record<string, string>;
  issuer: Record<string, string>;
  validFrom: string;
  validTo: string;
  daysRemaining: number;
  serialNumber: string;
  fingerprint256: string;
  subjectAltNames: string[];
  protocol: string | null;
}

export function SslCertificateChecker() {
  const [host, setHost] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [result, setResult] = React.useState<CertResult | null>(null);

  async function check() {
    if (!host.trim()) return;
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const res = await fetch(`/api/ssl-certificate-check?host=${encodeURIComponent(host.trim())}`);
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Could not check the SSL certificate.");
      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not check the SSL certificate.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <Label htmlFor="ssl-host" className="text-sm text-muted-foreground">
        Domain name
      </Label>
      <div className="mt-1.5 flex gap-2">
        <Input
          id="ssl-host"
          value={host}
          onChange={(e) => setHost(e.target.value)}
          placeholder="example.com"
          onKeyDown={(e) => e.key === "Enter" && check()}
        />
        <Button type="button" onClick={check} disabled={loading || !host.trim()}>
          {loading ? "Checking..." : "Check certificate"}
        </Button>
      </div>

      {error && <p className="mt-3 text-sm text-destructive">{error}</p>}

      {result && (
        <div className="mt-5 space-y-3">
          <div
            className={`rounded-lg p-3 text-sm font-semibold ${
              result.daysRemaining > 14 ? "bg-brand-soft" : "bg-destructive/10 text-destructive"
            }`}
          >
            {result.daysRemaining > 0
              ? `Valid — expires in ${result.daysRemaining} days`
              : `Expired ${Math.abs(result.daysRemaining)} days ago`}
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div className="rounded-lg border bg-card p-3">
              <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Issued to
              </p>
              <p className="mt-1 text-sm font-semibold">{result.subject.CN ?? result.host}</p>
            </div>
            <div className="rounded-lg border bg-card p-3">
              <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Issued by
              </p>
              <p className="mt-1 text-sm font-semibold">{result.issuer.O ?? result.issuer.CN ?? "—"}</p>
            </div>
            <div className="rounded-lg border bg-card p-3">
              <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Valid from
              </p>
              <p className="mt-1 text-sm font-semibold">{result.validFrom}</p>
            </div>
            <div className="rounded-lg border bg-card p-3">
              <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Valid to
              </p>
              <p className="mt-1 text-sm font-semibold">{result.validTo}</p>
            </div>
            <div className="rounded-lg border bg-card p-3">
              <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                TLS protocol
              </p>
              <p className="mt-1 text-sm font-semibold">{result.protocol ?? "—"}</p>
            </div>
            <div className="rounded-lg border bg-card p-3">
              <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Serial number
              </p>
              <p className="mt-1 font-mono text-xs break-all">{result.serialNumber}</p>
            </div>
          </div>

          {result.subjectAltNames.length > 0 && (
            <div className="rounded-lg border bg-card p-3">
              <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Also covers
              </p>
              <p className="mt-1 font-mono text-xs break-all">{result.subjectAltNames.join(", ")}</p>
            </div>
          )}

          <div className="rounded-lg border bg-card p-3">
            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              SHA-256 fingerprint
            </p>
            <p className="mt-1 font-mono text-xs break-all">{result.fingerprint256}</p>
          </div>
        </div>
      )}
    </div>
  );
}

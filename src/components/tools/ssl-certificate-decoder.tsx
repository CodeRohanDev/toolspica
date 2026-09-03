"use client";

import * as React from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { parsePemCertificate, type X509Certificate } from "@/lib/x509";

export function SslCertificateDecoder() {
  const [pem, setPem] = React.useState("");
  const [result, setResult] = React.useState<X509Certificate | null>(null);
  const [error, setError] = React.useState<string | null>(null);

  function decode() {
    setError(null);
    setResult(null);
    try {
      setResult(parsePemCertificate(pem));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Couldn't parse this certificate.");
    }
  }

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <Textarea
        value={pem}
        onChange={(e) => setPem(e.target.value)}
        placeholder="-----BEGIN CERTIFICATE-----&#10;...&#10;-----END CERTIFICATE-----"
        rows={8}
        className="resize-y font-mono text-xs"
      />
      <Button type="button" onClick={decode} disabled={!pem.trim()} className="mt-3">
        Decode certificate
      </Button>

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
            <Field label="Subject">
              {result.subject.map(([k, v]) => `${k}=${v}`).join(", ")}
            </Field>
            <Field label="Issuer">
              {result.issuer.map(([k, v]) => `${k}=${v}`).join(", ")}
            </Field>
            <Field label="Version">v{result.version}</Field>
            <Field label="Signature algorithm">{result.signatureAlgorithm}</Field>
            <Field label="Valid from">{result.notBefore.toUTCString()}</Field>
            <Field label="Valid to">{result.notAfter.toUTCString()}</Field>
            <Field label="Serial number" mono>
              {result.serialNumber}
            </Field>
          </div>

          {result.subjectAltNames.length > 0 && (
            <Field label={`Subject alternative names (${result.subjectAltNames.length})`}>
              <span className="font-mono text-xs">{result.subjectAltNames.join(", ")}</span>
            </Field>
          )}
        </div>
      )}
    </div>
  );
}

function Field({
  label,
  children,
  mono,
}: {
  label: string;
  children: React.ReactNode;
  mono?: boolean;
}) {
  return (
    <div className="rounded-lg border bg-card p-3">
      <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">{label}</p>
      <p className={`mt-1 text-sm font-semibold break-all ${mono ? "font-mono" : ""}`}>{children}</p>
    </div>
  );
}

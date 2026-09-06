"use client";

import * as React from "react";
import { Textarea } from "@/components/ui/textarea";
import { parsePemCertificate, type X509Certificate } from "@/lib/x509";
import { ShieldCheck, ShieldAlert } from "lucide-react";

function splitPemChain(text: string): string[] {
  const matches = text.match(/-----BEGIN CERTIFICATE-----[\s\S]*?-----END CERTIFICATE-----/g);
  return matches ?? [];
}

function findField(pairs: [string, string][], key: string): string {
  return pairs.find(([k]) => k === key)?.[1] ?? "—";
}

export function CertificateChainViewer() {
  const [input, setInput] = React.useState("");

  const results = React.useMemo(() => {
    const blocks = splitPemChain(input);
    return blocks.map((block) => {
      try {
        return { cert: parsePemCertificate(block) as X509Certificate, error: null };
      } catch (e) {
        return { cert: null, error: e instanceof Error ? e.message : "Couldn't parse this certificate." };
      }
    });
  }, [input]);

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <Textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Paste a certificate chain — one or more PEM certificates, one after another..."
        rows={16}
        className="resize-y font-mono text-xs"
      />

      {results.length > 0 && (
        <div className="mt-4 space-y-3 border-t pt-4">
          <p className="text-sm text-muted-foreground">{results.length} certificate{results.length === 1 ? "" : "s"} found in chain</p>
          {results.map((r, i) => (
            <div key={i} className="rounded-lg border p-3">
              <p className="mb-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                {i === 0 ? "Leaf certificate" : i === results.length - 1 ? "Root / final certificate" : `Intermediate ${i}`}
              </p>
              {r.cert ? (
                <div className="space-y-1 text-sm">
                  <p className="flex items-center gap-1.5">
                    {r.cert.daysRemaining > 0 ? <ShieldCheck className="size-4 text-emerald-600" /> : <ShieldAlert className="size-4 text-destructive" />}
                    <span className="font-medium">{findField(r.cert.subject, "CN")}</span>
                  </p>
                  <p className="text-xs text-muted-foreground">Issuer: {findField(r.cert.issuer, "CN")}</p>
                  <p className="text-xs text-muted-foreground">
                    Valid: {r.cert.notBefore.toLocaleDateString()} – {r.cert.notAfter.toLocaleDateString()}
                    {" "}({r.cert.daysRemaining > 0 ? `${r.cert.daysRemaining} days remaining` : "expired"})
                  </p>
                  <p className="text-xs text-muted-foreground">Serial: {r.cert.serialNumber}</p>
                </div>
              ) : (
                <p className="text-sm text-destructive">{r.error}</p>
              )}
            </div>
          ))}
        </div>
      )}
      <p className="mt-3 text-xs text-muted-foreground">
        Paste a full chain (server certificate followed by any intermediates) to see each link
        parsed individually, in order.
      </p>
    </div>
  );
}

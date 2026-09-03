"use client";

import * as React from "react";
import { Textarea } from "@/components/ui/textarea";
import { CopyButton } from "@/components/tools/copy-button";

function base64UrlDecode(input: string): string {
  const padded = input.replace(/-/g, "+").replace(/_/g, "/").padEnd(
    input.length + ((4 - (input.length % 4)) % 4),
    "="
  );
  const binary = atob(padded);
  const bytes = Uint8Array.from(binary, (c) => c.charCodeAt(0));
  return new TextDecoder("utf-8").decode(bytes);
}

function decodeJwt(token: string) {
  const parts = token.trim().split(".");
  if (parts.length !== 3) {
    return { error: "A JWT must have exactly 3 parts separated by periods (header.payload.signature)." };
  }
  try {
    const header = JSON.stringify(JSON.parse(base64UrlDecode(parts[0])), null, 2);
    const payload = JSON.stringify(JSON.parse(base64UrlDecode(parts[1])), null, 2);
    return { header, payload, signature: parts[2], error: null as string | null };
  } catch {
    return { error: "Couldn't decode this token — check that it's a valid, complete JWT." };
  }
}

export function JwtDecoder() {
  const [token, setToken] = React.useState("");
  const result = React.useMemo(() => (token.trim() ? decodeJwt(token) : null), [token]);

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <p className="text-sm font-medium text-muted-foreground">JWT</p>
      <Textarea
        value={token}
        onChange={(e) => setToken(e.target.value)}
        placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIn0.SIGNATURE"
        rows={4}
        className="mt-3 resize-y font-mono text-xs"
      />

      {result?.error && (
        <p className="mt-4 text-sm text-destructive">{result.error}</p>
      )}

      {result && !result.error && (
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div>
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-muted-foreground">Header</p>
              <CopyButton value={result.header ?? ""} />
            </div>
            <Textarea
              readOnly
              value={result.header}
              rows={6}
              className="mt-2 resize-y bg-muted/40 font-mono text-xs"
            />
          </div>
          <div>
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-muted-foreground">Payload</p>
              <CopyButton value={result.payload ?? ""} />
            </div>
            <Textarea
              readOnly
              value={result.payload}
              rows={6}
              className="mt-2 resize-y bg-muted/40 font-mono text-xs"
            />
          </div>
        </div>
      )}

      <p className="mt-4 text-xs text-muted-foreground">
        This decodes the header and payload only — it does not (and cannot,
        without your secret key) verify the signature.
      </p>
    </div>
  );
}

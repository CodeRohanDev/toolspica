"use client";

import * as React from "react";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { CopyButton } from "@/components/tools/copy-button";

function base64url(bytes: ArrayBuffer | Uint8Array) {
  const b = bytes instanceof Uint8Array ? bytes : new Uint8Array(bytes);
  let str = "";
  for (const byte of b) str += String.fromCharCode(byte);
  return btoa(str).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

export function JwtGenerator() {
  const [payload, setPayload] = React.useState('{\n  "sub": "1234567890",\n  "name": "Jane Doe",\n  "iat": 1700000000\n}');
  const [secret, setSecret] = React.useState("your-256-bit-secret");
  const [token, setToken] = React.useState("");
  const [error, setError] = React.useState<string | null>(null);

  async function generate() {
    try {
      const header = { alg: "HS256", typ: "JWT" };
      JSON.parse(payload);
      const headerB64 = base64url(new TextEncoder().encode(JSON.stringify(header)));
      const payloadB64 = base64url(new TextEncoder().encode(JSON.stringify(JSON.parse(payload))));
      const signingInput = `${headerB64}.${payloadB64}`;
      const key = await crypto.subtle.importKey("raw", new TextEncoder().encode(secret), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
      const sig = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(signingInput));
      setToken(`${signingInput}.${base64url(sig)}`);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Invalid payload JSON");
    }
  }

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <Textarea value={payload} onChange={(e) => setPayload(e.target.value)} className="min-h-[140px] font-mono text-sm" />
      <Input value={secret} onChange={(e) => setSecret(e.target.value)} placeholder="HMAC secret" className="mt-3" />
      {error && <p className="mt-2 text-sm text-destructive">{error}</p>}
      <button type="button" onClick={generate} className="mt-3 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground">Generate JWT (HS256)</button>
      {token && (
        <div className="mt-4 border-t pt-3">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-muted-foreground">Signed token</p>
            <CopyButton value={token} label="Copy" />
          </div>
          <pre className="mt-2 overflow-x-auto rounded-md bg-muted p-3 text-xs break-all">{token}</pre>
        </div>
      )}
      <p className="mt-2 text-xs text-muted-foreground">Signing happens locally using the Web Crypto API — your secret never leaves your browser.</p>
    </div>
  );
}

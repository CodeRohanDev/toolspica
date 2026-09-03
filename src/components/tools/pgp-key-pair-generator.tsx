"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { CopyButton } from "@/components/tools/copy-button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

function toPem(buffer: ArrayBuffer, label: string): string {
  let binary = "";
  for (const b of new Uint8Array(buffer)) binary += String.fromCharCode(b);
  const base64 = btoa(binary);
  const lines = base64.match(/.{1,64}/g)?.join("\n") ?? base64;
  return `-----BEGIN ${label}-----\n${lines}\n-----END ${label}-----`;
}

const KEY_SIZES = [
  { value: "2048", label: "RSA 2048-bit" },
  { value: "4096", label: "RSA 4096-bit" },
];

export function PgpKeyPairGenerator() {
  const [keySize, setKeySize] = React.useState("2048");
  const [busy, setBusy] = React.useState(false);
  const [publicKey, setPublicKey] = React.useState("");
  const [privateKey, setPrivateKey] = React.useState("");

  async function generate() {
    setBusy(true);
    try {
      const keyPair = await crypto.subtle.generateKey(
        {
          name: "RSA-OAEP",
          modulusLength: Number(keySize),
          publicExponent: new Uint8Array([1, 0, 1]),
          hash: "SHA-256",
        },
        true,
        ["encrypt", "decrypt"]
      );
      const [spki, pkcs8] = await Promise.all([
        crypto.subtle.exportKey("spki", keyPair.publicKey),
        crypto.subtle.exportKey("pkcs8", keyPair.privateKey),
      ]);
      setPublicKey(toPem(spki, "PUBLIC KEY"));
      setPrivateKey(toPem(pkcs8, "PRIVATE KEY"));
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <div className="rounded-lg bg-brand-soft p-3 text-sm">
        This generates a real RSA public/private keypair using your browser&apos;s built-in
        cryptography, exported in standard PEM format. It is <strong>not</strong> the OpenPGP
        packet/ASCII-armor format used by tools like GnuPG — for that specific format, use a
        dedicated OpenPGP tool such as GnuPG or OpenPGP.js.
      </div>

      <div className="mt-4 flex flex-wrap items-end gap-3">
        <div>
          <Label className="text-sm text-muted-foreground">Key size</Label>
          <Select value={keySize} onValueChange={(v) => v && setKeySize(v)}>
            <SelectTrigger className="mt-1.5 w-44">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {KEY_SIZES.map((k) => (
                <SelectItem key={k.value} value={k.value}>
                  {k.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <Button type="button" onClick={generate} disabled={busy}>
          {busy ? "Generating..." : "Generate keypair"}
        </Button>
      </div>

      {publicKey && (
        <div className="mt-5 space-y-4">
          <div>
            <div className="flex items-center justify-between gap-2">
              <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Public key (share this)
              </p>
              <CopyButton value={publicKey} />
            </div>
            <pre className="mt-1.5 max-h-40 overflow-auto rounded-lg border bg-muted/40 p-3 text-xs whitespace-pre-wrap break-all">
              {publicKey}
            </pre>
          </div>
          <div>
            <div className="flex items-center justify-between gap-2">
              <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Private key (keep this secret)
              </p>
              <CopyButton value={privateKey} />
            </div>
            <pre className="mt-1.5 max-h-40 overflow-auto rounded-lg border bg-destructive/5 p-3 text-xs whitespace-pre-wrap break-all">
              {privateKey}
            </pre>
          </div>
        </div>
      )}

      <p className="mt-4 text-xs text-muted-foreground">
        Generated entirely in your browser using the Web Crypto API — neither key is ever sent
        anywhere. Nothing is saved: copy your private key somewhere safe before leaving this page.
      </p>
    </div>
  );
}

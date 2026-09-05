"use client";

import * as React from "react";
import { Textarea } from "@/components/ui/textarea";
import { Key } from "lucide-react";

interface KeyInfo {
  isPrivate: boolean;
  keyId: string;
  fingerprint: string;
  algorithm: string;
  created: string;
  expires: string;
  userIds: string[];
}

export function PgpKeyViewer() {
  const [input, setInput] = React.useState("");
  const [info, setInfo] = React.useState<KeyInfo | null>(null);
  const [error, setError] = React.useState("");

  React.useEffect(() => {
    if (!input.trim()) return;
    let cancelled = false;
    import("openpgp").then(async (openpgp) => {
      try {
        const key = await openpgp.readKey({ armoredKey: input });
        const expirationTime = await key.getExpirationTime();
        if (cancelled) return;
        setInfo({
          isPrivate: key.isPrivate(),
          keyId: key.getKeyID().toHex().toUpperCase(),
          fingerprint: key.getFingerprint().toUpperCase().replace(/(.{4})/g, "$1 ").trim(),
          algorithm: key.getAlgorithmInfo().algorithm,
          created: key.getCreationTime().toLocaleDateString(),
          expires: expirationTime === null || expirationTime === Infinity ? "Never" : new Date(expirationTime).toLocaleDateString(),
          userIds: key.getUserIDs(),
        });
        setError("");
      } catch (e) {
        if (!cancelled) {
          setError(e instanceof Error ? e.message : "Couldn't parse this key.");
          setInfo(null);
        }
      }
    });
    return () => {
      cancelled = true;
    };
  }, [input]);

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <Textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Paste an armored PGP public or private key block (-----BEGIN PGP ... KEY BLOCK-----)..."
        rows={10}
        className="resize-y font-mono text-xs"
      />

      {error && input.trim() && <p className="mt-3 text-sm text-destructive">{error}</p>}

      {info && input.trim() && (
        <div className="mt-4 space-y-2 rounded-lg border p-4 text-sm">
          <p className="flex items-center gap-1.5 font-medium">
            <Key className="size-4 text-brand" />
            {info.isPrivate ? "Private Key" : "Public Key"} — {info.algorithm}
          </p>
          <p><span className="text-muted-foreground">Key ID:</span> <span className="font-mono">{info.keyId}</span></p>
          <p><span className="text-muted-foreground">Fingerprint:</span> <span className="font-mono text-xs">{info.fingerprint}</span></p>
          <p><span className="text-muted-foreground">Created:</span> {info.created}</p>
          <p><span className="text-muted-foreground">Expires:</span> {info.expires}</p>
          {info.userIds.length > 0 && (
            <div>
              <p className="text-muted-foreground">User IDs:</p>
              {info.userIds.map((uid, i) => (
                <p key={i} className="ml-2 text-xs">{uid}</p>
              ))}
            </div>
          )}
        </div>
      )}
      <p className="mt-3 text-xs text-muted-foreground">
        Parses the key structure only — this never extracts or exposes private key material
        beyond metadata, and nothing is used to sign, encrypt, or decrypt anything.
      </p>
    </div>
  );
}

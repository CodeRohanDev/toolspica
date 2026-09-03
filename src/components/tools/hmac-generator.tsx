"use client";

import * as React from "react";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CopyButton } from "@/components/tools/copy-button";

const ALGORITHMS = ["SHA-1", "SHA-256", "SHA-384", "SHA-512"];

function bytesToHex(bytes: ArrayBuffer): string {
  return Array.from(new Uint8Array(bytes))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

export function HmacGenerator() {
  const [message, setMessage] = React.useState("");
  const [secret, setSecret] = React.useState("");
  const [algorithm, setAlgorithm] = React.useState("SHA-256");
  const [hmac, setHmac] = React.useState("");

  React.useEffect(() => {
    if (!message || !secret) {
      setHmac("");
      return;
    }
    let cancelled = false;
    (async () => {
      const key = await crypto.subtle.importKey(
        "raw",
        new TextEncoder().encode(secret),
        { name: "HMAC", hash: algorithm },
        false,
        ["sign"]
      );
      const signature = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(message));
      if (!cancelled) setHmac(bytesToHex(signature));
    })();
    return () => {
      cancelled = true;
    };
  }, [message, secret, algorithm]);

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <Label htmlFor="hmac-secret" className="text-sm text-muted-foreground">
            Secret key
          </Label>
          <Input
            id="hmac-secret"
            value={secret}
            onChange={(e) => setSecret(e.target.value)}
            placeholder="Your shared secret"
            className="mt-1.5 font-mono"
          />
        </div>
        <div>
          <Label className="text-sm text-muted-foreground">Hash algorithm</Label>
          <Select value={algorithm} onValueChange={(v) => v && setAlgorithm(v)}>
            <SelectTrigger className="mt-1.5 w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {ALGORITHMS.map((a) => (
                <SelectItem key={a} value={a}>
                  HMAC-{a}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <Label htmlFor="hmac-message" className="mt-4 block text-sm text-muted-foreground">
        Message
      </Label>
      <Textarea
        id="hmac-message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Message to authenticate..."
        rows={4}
        className="mt-1.5 resize-y"
      />

      {hmac && (
        <div className="mt-4 rounded-lg border bg-muted/40 p-3">
          <div className="flex items-center justify-between gap-2">
            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              HMAC-{algorithm}
            </p>
            <CopyButton value={hmac} />
          </div>
          <p className="mt-1.5 break-all font-mono text-sm">{hmac}</p>
        </div>
      )}
    </div>
  );
}

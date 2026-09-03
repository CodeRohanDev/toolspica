"use client";

import * as React from "react";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CopyButton } from "@/components/tools/copy-button";

const ALGORITHMS = [
  { value: "SHA-1", label: "SHA-1" },
  { value: "SHA-256", label: "SHA-256" },
  { value: "SHA-384", label: "SHA-384" },
  { value: "SHA-512", label: "SHA-512" },
];

function bytesToHex(bytes: ArrayBuffer): string {
  return Array.from(new Uint8Array(bytes))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

export function Sha256Generator() {
  const [text, setText] = React.useState("");
  const [algorithm, setAlgorithm] = React.useState("SHA-256");
  const [hash, setHash] = React.useState("");

  React.useEffect(() => {
    if (!text) {
      setHash("");
      return;
    }
    let cancelled = false;
    crypto.subtle
      .digest(algorithm, new TextEncoder().encode(text))
      .then((digest) => {
        if (!cancelled) setHash(bytesToHex(digest));
      });
    return () => {
      cancelled = true;
    };
  }, [text, algorithm]);

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <label htmlFor="hash-algo" className="text-sm text-muted-foreground">
          Algorithm
        </label>
        <Select value={algorithm} onValueChange={(v) => v && setAlgorithm(v)}>
          <SelectTrigger id="hash-algo" className="w-40">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {ALGORITHMS.map((a) => (
              <SelectItem key={a.value} value={a.value}>
                {a.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type or paste text to hash..."
        rows={5}
        className="mt-3 resize-y"
      />

      {hash && (
        <div className="mt-4 rounded-lg border bg-muted/40 p-3">
          <div className="flex items-center justify-between gap-2">
            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              {algorithm} hash
            </p>
            <CopyButton value={hash} />
          </div>
          <p className="mt-1.5 break-all font-mono text-sm">{hash}</p>
        </div>
      )}
    </div>
  );
}

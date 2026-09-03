"use client";

import * as React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CopyButton } from "@/components/tools/copy-button";
import { md5 } from "@/lib/md5";
import { Check, X } from "lucide-react";

const ALGORITHMS = ["MD5", "SHA-1", "SHA-256", "SHA-512"] as const;

function bytesToHex(bytes: ArrayBuffer): string {
  return Array.from(new Uint8Array(bytes))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

export function FileHashChecker() {
  const [fileName, setFileName] = React.useState("");
  const [hashes, setHashes] = React.useState<Record<string, string> | null>(null);
  const [expected, setExpected] = React.useState("");
  const [computing, setComputing] = React.useState(false);

  async function handleFile(file: File) {
    setComputing(true);
    setFileName(file.name);
    setHashes(null);
    const buffer = new Uint8Array(await file.arrayBuffer());

    const results: Record<string, string> = { MD5: md5(buffer) };
    for (const algo of ["SHA-1", "SHA-256", "SHA-512"] as const) {
      const digest = await crypto.subtle.digest(algo, buffer);
      results[algo] = bytesToHex(digest);
    }
    setHashes(results);
    setComputing(false);
  }

  const normalizedExpected = expected.trim().toLowerCase();
  const match = normalizedExpected
    ? Object.values(hashes ?? {}).some((h) => h.toLowerCase() === normalizedExpected)
    : null;

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <Label htmlFor="file-hash-input" className="text-sm text-muted-foreground">
        Choose a file
      </Label>
      <Input
        id="file-hash-input"
        type="file"
        className="mt-1.5"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleFile(file);
        }}
      />
      <p className="mt-1.5 text-xs text-muted-foreground">
        The file is hashed entirely in your browser — it&apos;s never uploaded anywhere.
      </p>

      {computing && <p className="mt-4 text-sm text-muted-foreground">Hashing {fileName}...</p>}

      {hashes && !computing && (
        <div className="mt-5 space-y-2">
          <p className="text-sm font-medium">{fileName}</p>
          {ALGORITHMS.map((algo) => (
            <div key={algo} className="rounded-lg border bg-muted/40 p-3">
              <div className="flex items-center justify-between gap-2">
                <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  {algo}
                </p>
                <CopyButton value={hashes[algo]} />
              </div>
              <p className="mt-1 break-all font-mono text-xs">{hashes[algo]}</p>
            </div>
          ))}

          <div className="mt-4">
            <Label htmlFor="expected-hash" className="text-sm text-muted-foreground">
              Compare against an expected hash (optional)
            </Label>
            <Input
              id="expected-hash"
              value={expected}
              onChange={(e) => setExpected(e.target.value)}
              placeholder="Paste the published checksum here..."
              className="mt-1.5 font-mono"
            />
            {match !== null && (
              <p
                className={`mt-2 flex items-center gap-1.5 text-sm font-medium ${
                  match ? "text-green-600 dark:text-green-500" : "text-destructive"
                }`}
              >
                {match ? <Check className="size-4" /> : <X className="size-4" />}
                {match ? "Matches — the file is intact" : "Does not match any computed hash"}
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

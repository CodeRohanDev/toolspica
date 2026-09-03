"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { CopyButton } from "@/components/tools/copy-button";

const CHARS = "23456789ABCDEFGHJKLMNPQRSTUVWXYZ"; // no 0/O/1/I

function randomCode(): string {
  const bytes = new Uint32Array(8);
  crypto.getRandomValues(bytes);
  const raw = Array.from(bytes, (b) => CHARS[b % CHARS.length]).join("");
  return `${raw.slice(0, 4)}-${raw.slice(4, 8)}`;
}

export function TwoFactorBackupCodeGenerator() {
  const [count, setCount] = React.useState("10");
  const [codes, setCodes] = React.useState<string[]>([]);

  function generate() {
    const n = Math.max(1, Math.min(20, parseInt(count, 10) || 10));
    setCodes(Array.from({ length: n }, randomCode));
  }

  React.useEffect(() => {
    generate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const allCodes = codes.join("\n");

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <div className="flex flex-wrap items-end gap-3">
        <div>
          <Label htmlFor="code-count" className="text-sm text-muted-foreground">
            How many codes (1-20)
          </Label>
          <Input
            id="code-count"
            type="number"
            inputMode="numeric"
            min={1}
            max={20}
            value={count}
            onChange={(e) => setCount(e.target.value)}
            className="mt-1.5 w-24"
          />
        </div>
        <Button type="button" onClick={generate}>
          Generate new codes
        </Button>
      </div>

      {codes.length > 0 && (
        <div className="mt-5">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium">Backup codes</p>
            <CopyButton value={allCodes} label="Copy all" />
          </div>
          <div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-3">
            {codes.map((code, i) => (
              <div
                key={i}
                className="rounded-md border bg-muted/40 px-3 py-2 text-center font-mono text-sm"
              >
                {code}
              </div>
            ))}
          </div>
          <p className="mt-3 text-xs text-muted-foreground">
            Store these somewhere safe (a password manager or printed copy) — each code is meant
            to be used once as a fallback when you can&apos;t access your normal two-factor
            authenticator.
          </p>
        </div>
      )}
    </div>
  );
}

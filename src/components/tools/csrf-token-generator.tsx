"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { CopyButton } from "@/components/tools/copy-button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

function bytesToHex(bytes: Uint8Array): string {
  return Array.from(bytes)
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

function bytesToBase64Url(bytes: Uint8Array): string {
  let binary = "";
  for (const b of bytes) binary += String.fromCharCode(b);
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

export function CsrfTokenGenerator() {
  const [length, setLength] = React.useState("32");
  const [format, setFormat] = React.useState<"hex" | "base64url">("hex");
  const [token, setToken] = React.useState("");

  function generate() {
    const n = Math.max(16, Math.min(128, parseInt(length, 10) || 32));
    const bytes = crypto.getRandomValues(new Uint8Array(n));
    setToken(format === "hex" ? bytesToHex(bytes) : bytesToBase64Url(bytes));
  }

  React.useEffect(() => {
    generate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [format]);

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <div className="flex flex-wrap items-end gap-3">
        <div>
          <Label htmlFor="csrf-length" className="text-sm text-muted-foreground">
            Token length in bytes (16-128)
          </Label>
          <Input
            id="csrf-length"
            type="number"
            inputMode="numeric"
            min={16}
            max={128}
            value={length}
            onChange={(e) => setLength(e.target.value)}
            className="mt-1.5 w-28"
          />
        </div>
        <div>
          <Label className="text-sm text-muted-foreground">Format</Label>
          <Select value={format} onValueChange={(v) => v && setFormat(v as "hex" | "base64url")}>
            <SelectTrigger className="mt-1.5 w-36">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="hex">Hex</SelectItem>
              <SelectItem value="base64url">Base64URL</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button type="button" onClick={generate}>
          Generate
        </Button>
      </div>

      {token && (
        <div className="mt-5 rounded-lg border bg-muted/40 p-3">
          <div className="flex items-center justify-between gap-2">
            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              CSRF token
            </p>
            <CopyButton value={token} />
          </div>
          <p className="mt-1.5 break-all font-mono text-sm">{token}</p>
        </div>
      )}
    </div>
  );
}

"use client";

import * as React from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { CopyButton } from "@/components/tools/copy-button";

function toBase64(text: string): string {
  const bytes = new TextEncoder().encode(text);
  let binary = "";
  bytes.forEach((b) => (binary += String.fromCharCode(b)));
  return btoa(binary);
}

function fromBase64(input: string): string {
  const binary = atob(input.trim());
  const bytes = Uint8Array.from(binary, (c) => c.charCodeAt(0));
  return new TextDecoder("utf-8", { fatal: true }).decode(bytes);
}

export function Base64EncoderDecoder() {
  const [encodeInput, setEncodeInput] = React.useState("");
  const [decodeInput, setDecodeInput] = React.useState("");

  const encoded = React.useMemo(() => {
    try {
      return toBase64(encodeInput);
    } catch {
      return "";
    }
  }, [encodeInput]);

  const { decoded, decodeError } = React.useMemo(() => {
    if (!decodeInput.trim()) return { decoded: "", decodeError: null as string | null };
    try {
      return { decoded: fromBase64(decodeInput), decodeError: null as string | null };
    } catch {
      return {
        decoded: "",
        decodeError: "Invalid Base64 — check for typos, missing padding, or invalid characters.",
      };
    }
  }, [decodeInput]);

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div className="rounded-xl border bg-card p-5 sm:p-6">
        <div className="flex items-center justify-between gap-3">
          <p className="text-sm font-semibold">Encode</p>
          <Button type="button" variant="ghost" size="sm" onClick={() => setEncodeInput("")}>
            Clear
          </Button>
        </div>
        <Textarea
          value={encodeInput}
          onChange={(e) => setEncodeInput(e.target.value)}
          placeholder="Hello, world!"
          rows={6}
          className="mt-3 resize-y text-sm"
        />
        <div className="mt-4 border-t pt-4">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-muted-foreground">Base64</p>
            <CopyButton value={encoded} />
          </div>
          <Textarea readOnly value={encoded} rows={6} className="mt-2 resize-y bg-muted/40 font-mono text-sm" />
        </div>
      </div>

      <div className="rounded-xl border bg-card p-5 sm:p-6">
        <div className="flex items-center justify-between gap-3">
          <p className="text-sm font-semibold">Decode</p>
          <Button type="button" variant="ghost" size="sm" onClick={() => setDecodeInput("")}>
            Clear
          </Button>
        </div>
        <Textarea
          value={decodeInput}
          onChange={(e) => setDecodeInput(e.target.value)}
          placeholder="SGVsbG8sIHdvcmxkIQ=="
          rows={6}
          className="mt-3 resize-y font-mono text-sm"
        />
        <div className="mt-4 border-t pt-4">
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">{decodeError ?? "Decoded text"}</p>
            <CopyButton value={decoded} />
          </div>
          <Textarea readOnly value={decoded} rows={6} className="mt-2 resize-y bg-muted/40 text-sm" />
        </div>
      </div>
    </div>
  );
}

"use client";

import * as React from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { CopyButton } from "@/components/tools/copy-button";
import { base32Encode, base32Decode } from "@/lib/base32";

type Mode = "encode" | "decode";

export function Base32EncodeDecode() {
  const [mode, setMode] = React.useState<Mode>("encode");
  const [input, setInput] = React.useState("");

  const { output, error } = React.useMemo(() => {
    if (!input.trim()) return { output: "", error: null as string | null };
    try {
      return {
        output: mode === "encode" ? base32Encode(input) : base32Decode(input.trim()),
        error: null as string | null,
      };
    } catch (e) {
      return { output: "", error: (e as Error).message };
    }
  }, [input, mode]);

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <div className="flex gap-1">
        <Button
          type="button"
          size="sm"
          variant={mode === "encode" ? "default" : "outline"}
          onClick={() => setMode("encode")}
        >
          Encode
        </Button>
        <Button
          type="button"
          size="sm"
          variant={mode === "decode" ? "default" : "outline"}
          onClick={() => setMode("decode")}
        >
          Decode
        </Button>
      </div>

      <Textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder={mode === "encode" ? "Hello, world!" : "JBSWY3DPFQQFO33SNRSCC"}
        rows={6}
        className="mt-4 resize-y font-mono text-sm"
      />

      <div className="mt-5 border-t pt-4">
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">{error ?? "Result"}</p>
          <CopyButton value={output} />
        </div>
        <Textarea
          readOnly
          value={output}
          rows={6}
          className="mt-2 resize-y bg-muted/40 font-mono text-sm"
        />
      </div>
    </div>
  );
}

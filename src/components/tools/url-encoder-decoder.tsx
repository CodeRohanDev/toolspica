"use client";

import * as React from "react";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { CopyButton } from "@/components/tools/copy-button";

export function UrlEncoderDecoder() {
  const [encodeInput, setEncodeInput] = React.useState("");
  const [fullUri, setFullUri] = React.useState(false);
  const [decodeInput, setDecodeInput] = React.useState("");

  const encoded = React.useMemo(() => {
    try {
      return fullUri ? encodeURI(encodeInput) : encodeURIComponent(encodeInput);
    } catch {
      return "";
    }
  }, [encodeInput, fullUri]);

  const { decoded, decodeError } = React.useMemo(() => {
    if (!decodeInput) return { decoded: "", decodeError: null as string | null };
    try {
      return { decoded: decodeURIComponent(decodeInput), decodeError: null as string | null };
    } catch {
      return {
        decoded: "",
        decodeError: "Couldn't decode this text — it contains an invalid % sequence.",
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
        <Label className="mt-3 block text-xs text-muted-foreground">Text or URL to encode</Label>
        <Textarea
          value={encodeInput}
          onChange={(e) => setEncodeInput(e.target.value)}
          placeholder="https://example.com/search?q=hello world&lang=en"
          rows={6}
          className="mt-1.5 resize-y font-mono text-sm"
        />
        <div className="mt-3 flex items-center gap-2">
          <Switch id="full-uri" checked={fullUri} onCheckedChange={setFullUri} />
          <Label htmlFor="full-uri" className="text-sm font-normal">
            Full URL mode (keep :/?&= characters)
          </Label>
        </div>
        <div className="mt-4 border-t pt-4">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-muted-foreground">Encoded result</p>
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
        <Label className="mt-3 block text-xs text-muted-foreground">Encoded text or URL</Label>
        <Textarea
          value={decodeInput}
          onChange={(e) => setDecodeInput(e.target.value)}
          placeholder="https%3A%2F%2Fexample.com%2Fsearch%3Fq%3Dhello%20world"
          rows={6}
          className="mt-1.5 resize-y font-mono text-sm"
        />
        <div className="mt-4 border-t pt-4">
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">{decodeError ?? "Decoded result"}</p>
            <CopyButton value={decoded} />
          </div>
          <Textarea readOnly value={decoded} rows={6} className="mt-2 resize-y bg-muted/40 font-mono text-sm" />
        </div>
      </div>
    </div>
  );
}

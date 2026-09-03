"use client";

import * as React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function UrlParser() {
  const [input, setInput] = React.useState("");

  const parsed = React.useMemo(() => {
    if (!input.trim()) return null;
    try {
      return new URL(input);
    } catch {
      return null;
    }
  }, [input]);

  const params = parsed ? [...parsed.searchParams.entries()] : [];

  const rows: { label: string; value: string }[] = parsed
    ? [
        { label: "Protocol", value: parsed.protocol },
        { label: "Host", value: parsed.host },
        { label: "Hostname", value: parsed.hostname },
        { label: "Port", value: parsed.port || "(default)" },
        { label: "Pathname", value: parsed.pathname || "/" },
        { label: "Hash", value: parsed.hash || "(none)" },
      ]
    : [];

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <Label htmlFor="url-input" className="text-sm text-muted-foreground">
        URL to parse
      </Label>
      <Input
        id="url-input"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="https://example.com:8080/search?q=hello&lang=en#results"
        className="mt-1.5 font-mono"
      />

      {input.trim() && !parsed && (
        <p className="mt-4 text-sm text-destructive">
          That doesn't look like a valid, complete URL (include the protocol, e.g. https://).
        </p>
      )}

      {parsed && (
        <div className="mt-5 border-t pt-4">
          <div className="space-y-2">
            {rows.map((row) => (
              <div key={row.label} className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">{row.label}</span>
                <span className="font-mono">{row.value}</span>
              </div>
            ))}
          </div>

          {params.length > 0 && (
            <div className="mt-4 border-t pt-4">
              <p className="text-sm font-medium text-muted-foreground">
                Query parameters
              </p>
              <div className="mt-2 space-y-1.5">
                {params.map(([key, value], i) => (
                  <div key={i} className="flex items-center justify-between text-sm">
                    <span className="font-mono text-brand">{key}</span>
                    <span className="font-mono">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

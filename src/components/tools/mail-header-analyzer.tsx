"use client";

import * as React from "react";
import { Textarea } from "@/components/ui/textarea";

interface ParsedHop {
  from: string;
  by: string;
  time: string;
}

function parseHeaders(raw: string) {
  const fields: Record<string, string> = {};
  const lines = raw.split(/\r?\n/);
  let currentKey = "";
  for (const line of lines) {
    const match = line.match(/^([A-Za-z-]+):\s*(.*)$/);
    if (match) {
      currentKey = match[1];
      fields[currentKey] = (fields[currentKey] ? fields[currentKey] + " " : "") + match[2];
    } else if (currentKey && /^\s/.test(line)) {
      fields[currentKey] += " " + line.trim();
    }
  }

  const received = lines
    .join("\n")
    .split(/\nReceived:/)
    .slice(1)
    .map((block) => "Received:" + block);

  const hops: ParsedHop[] = received.map((block) => {
    const from = block.match(/from\s+(\S+)/)?.[1] ?? "?";
    const by = block.match(/by\s+(\S+)/)?.[1] ?? "?";
    const time = block.match(/;\s*(.+)$/m)?.[1]?.trim() ?? "?";
    return { from, by, time };
  });

  return { fields, hops };
}

export function MailHeaderAnalyzer() {
  const [raw, setRaw] = React.useState("");
  const { fields, hops } = React.useMemo(() => parseHeaders(raw), [raw]);

  const keyFields = ["From", "To", "Subject", "Date", "Return-Path", "Message-ID"];

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <Textarea
        value={raw}
        onChange={(e) => setRaw(e.target.value)}
        placeholder="Paste raw email headers here (View Source / Show Original in your email client)..."
        rows={8}
        className="resize-y font-mono text-xs"
      />

      {raw.trim() && (
        <div className="mt-5 space-y-5 border-t pt-4">
          <div>
            <p className="mb-2 text-sm font-medium text-muted-foreground">Key fields</p>
            <div className="space-y-1.5 text-sm">
              {keyFields.map((key) =>
                fields[key] ? (
                  <div key={key} className="flex gap-2">
                    <span className="w-28 shrink-0 font-medium text-muted-foreground">{key}:</span>
                    <span className="break-all">{fields[key]}</span>
                  </div>
                ) : null
              )}
            </div>
          </div>

          {hops.length > 0 && (
            <div>
              <p className="mb-2 text-sm font-medium text-muted-foreground">
                Delivery path ({hops.length} hop{hops.length === 1 ? "" : "s"}, most recent first)
              </p>
              <div className="space-y-2">
                {hops.map((hop, i) => (
                  <div key={i} className="rounded-md border bg-muted/40 p-2.5 text-xs">
                    <span className="font-medium">{hop.from}</span> → <span className="font-medium">{hop.by}</span>
                    <span className="ml-2 text-muted-foreground">{hop.time}</span>
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

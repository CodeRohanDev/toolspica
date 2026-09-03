"use client";

import * as React from "react";
import { Textarea } from "@/components/ui/textarea";
import { CopyButton } from "@/components/tools/copy-button";
import { md5Text } from "@/lib/md5";

export function Md5Generator() {
  const [text, setText] = React.useState("");
  const hash = React.useMemo(() => (text ? md5Text(text) : ""), [text]);

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <Textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type or paste text to hash..."
        rows={5}
        className="resize-y"
      />

      {hash && (
        <div className="mt-4 rounded-lg border bg-muted/40 p-3">
          <div className="flex items-center justify-between gap-2">
            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              MD5 hash
            </p>
            <CopyButton value={hash} />
          </div>
          <p className="mt-1.5 break-all font-mono text-sm">{hash}</p>
        </div>
      )}

      <p className="mt-3 text-xs text-muted-foreground">
        MD5 is broken for security purposes (collisions are trivial to produce) — use it only for
        legacy checksum compatibility, never for passwords or security-sensitive hashing. Use the
        SHA-256 Generator for anything security-related.
      </p>
    </div>
  );
}

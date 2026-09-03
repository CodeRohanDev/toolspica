"use client";

import * as React from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { CopyButton } from "@/components/tools/copy-button";
import { StatBar } from "@/components/tools/stat-bar";
import { cn } from "@/lib/utils";

const LIMITS = [
  { label: "Twitter/X post", value: 280 },
  { label: "SMS message", value: 160 },
  { label: "Meta title tag", value: 60 },
  { label: "Meta description", value: 160 },
  { label: "Instagram caption", value: 2200 },
];

export function CharacterCounter() {
  const [text, setText] = React.useState("");

  const characters = text.length;
  const charactersNoSpaces = text.replace(/\s/g, "").length;
  const words = text.trim().length === 0 ? 0 : text.trim().split(/\s+/).length;
  const bytes = new TextEncoder().encode(text).length;

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <div className="flex items-center justify-between gap-3">
        <p className="text-sm font-medium text-muted-foreground">Your text</p>
        <div className="flex gap-2">
          <Button type="button" variant="ghost" size="sm" onClick={() => setText("")}>
            Clear
          </Button>
          <CopyButton value={text} />
        </div>
      </div>

      <Textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type or paste your text to count characters..."
        rows={8}
        className="mt-3 resize-y text-sm"
      />

      <StatBar
        items={[
          { label: "characters", value: characters },
          { label: "no spaces", value: charactersNoSpaces },
          { label: "words", value: words },
          { label: "bytes (UTF-8)", value: bytes },
        ]}
      />

      <div className="mt-5 space-y-3 border-t pt-4">
        <p className="text-sm font-medium text-muted-foreground">
          Common character limits
        </p>
        {LIMITS.map((limit) => {
          const remaining = limit.value - characters;
          const overLimit = remaining < 0;
          const percent = Math.min(100, (characters / limit.value) * 100);
          return (
            <div key={limit.label}>
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">{limit.label}</span>
                <span
                  className={cn(
                    "font-medium tabular-nums",
                    overLimit ? "text-destructive" : "text-muted-foreground"
                  )}
                >
                  {overLimit ? `${Math.abs(remaining)} over` : `${remaining} left`}
                </span>
              </div>
              <div className="mt-1 h-1 overflow-hidden rounded-full bg-muted">
                <div
                  className={cn(
                    "h-full rounded-full transition-all",
                    overLimit ? "bg-destructive" : "bg-foreground/70"
                  )}
                  style={{ width: `${percent}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

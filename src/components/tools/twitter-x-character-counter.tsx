"use client";

import * as React from "react";
import { Textarea } from "@/components/ui/textarea";

const LIMIT = 280;

export function TwitterXCharacterCounter() {
  const [text, setText] = React.useState("");
  const count = text.length;
  const remaining = LIMIT - count;
  const over = remaining < 0;

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <Textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Write your post..."
        className="min-h-[150px]"
      />
      <div className="mt-3 flex items-center justify-between border-t pt-3">
        <div className="flex items-center gap-3">
          <div
            className={`relative h-9 w-9 rounded-full border-2 ${
              over ? "border-destructive" : count > LIMIT * 0.9 ? "border-yellow-500" : "border-primary"
            }`}
          >
            <div
              className="absolute inset-0 rounded-full"
              style={{
                background: `conic-gradient(currentColor ${Math.min(100, (count / LIMIT) * 100)}%, transparent 0)`,
                opacity: 0.15,
              }}
            />
          </div>
          <span className={`font-semibold tabular-nums ${over ? "text-destructive" : ""}`}>
            {remaining}
          </span>
          <span className="text-sm text-muted-foreground">characters remaining</span>
        </div>
        <span className="text-sm text-muted-foreground">{count} / {LIMIT}</span>
      </div>
      {over && (
        <p className="mt-2 text-sm text-destructive">
          {Math.abs(remaining)} characters over the limit — this post won&apos;t fit as a single tweet.
        </p>
      )}
    </div>
  );
}

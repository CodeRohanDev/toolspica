"use client";

import * as React from "react";
import { Textarea } from "@/components/ui/textarea";
import { detectLanguage } from "@/lib/language-detect";

export function LanguageDetector() {
  const [text, setText] = React.useState("");
  const results = React.useMemo(() => detectLanguage(text), [text]);

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <Textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Paste a sentence or paragraph to detect its language..."
        rows={5}
        className="resize-y"
      />

      {text.trim() && (
        <div className="mt-4 border-t pt-4">
          {results.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              Not enough recognizable common words to confidently detect a language — try a longer sample.
            </p>
          ) : (
            <div className="space-y-2">
              {results.map((r, i) => (
                <div key={r.language} className="flex items-center gap-3">
                  <span className={`w-28 shrink-0 text-sm ${i === 0 ? "font-semibold" : "text-muted-foreground"}`}>
                    {r.language}
                  </span>
                  <div className="h-2 flex-1 overflow-hidden rounded-full bg-muted">
                    <div className="h-full rounded-full bg-brand" style={{ width: `${r.confidence}%` }} />
                  </div>
                  <span className="w-10 shrink-0 text-right text-xs tabular-nums text-muted-foreground">{r.confidence}%</span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
      <p className="mt-3 text-xs text-muted-foreground">
        Detects English, Spanish, French, German, Portuguese, Italian, Dutch, and Hindi using
        common-word frequency — a lightweight heuristic, not a machine-learning model.
      </p>
    </div>
  );
}

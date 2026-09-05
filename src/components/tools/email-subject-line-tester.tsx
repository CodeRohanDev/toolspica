"use client";

import * as React from "react";
import { Input } from "@/components/ui/input";
import { StatBar } from "@/components/tools/stat-bar";

const SPAM_WORDS = [
  "free", "guarantee", "no obligation", "act now", "limited time", "click here",
  "buy now", "cash", "urgent", "winner", "risk-free", "100%", "!!!",
];

function analyze(subject: string) {
  const length = subject.length;
  const words = subject.trim() ? subject.trim().split(/\s+/) : [];
  const lower = subject.toLowerCase();
  const spamHits = SPAM_WORDS.filter((w) => lower.includes(w));
  const allCapsWords = words.filter((w) => w.length > 2 && w === w.toUpperCase()).length;
  const exclamations = (subject.match(/!/g) ?? []).length;
  const hasEmoji = /[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}]/u.test(subject);

  let score = 100;
  if (length > 60) score -= 20;
  else if (length < 20) score -= 10;
  score -= spamHits.length * 15;
  score -= allCapsWords * 10;
  score -= Math.max(0, exclamations - 1) * 10;
  score = Math.max(0, Math.min(100, score));

  return { length, wordCount: words.length, spamHits, allCapsWords, exclamations, hasEmoji, score };
}

function verdict(score: number) {
  if (score >= 80) return "Looks good — low spam risk, reasonable length.";
  if (score >= 50) return "Could be improved — check the flags below.";
  return "High risk of being filtered as spam or looking unprofessional.";
}

export function EmailSubjectLineTester() {
  const [subject, setSubject] = React.useState("");
  const r = analyze(subject);

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <Input value={subject} onChange={(e) => setSubject(e.target.value)} placeholder="Enter your email subject line..." />

      {subject.trim() && (
        <>
          <div className="mt-4 border-t pt-4">
            <p className="text-3xl font-bold tabular-nums">{r.score}/100</p>
            <p className="text-sm text-muted-foreground">{verdict(r.score)}</p>
          </div>
          <StatBar
            items={[
              { label: "characters", value: r.length },
              { label: "words", value: r.wordCount },
              { label: "all-caps words", value: r.allCapsWords },
              { label: "exclamation marks", value: r.exclamations },
            ]}
          />
          {r.spamHits.length > 0 && (
            <p className="mt-3 text-sm text-destructive">
              Spam-trigger phrases found: {r.spamHits.join(", ")}
            </p>
          )}
          {r.length > 60 && (
            <p className="mt-2 text-sm text-amber-600">
              Subject is over 60 characters — it may get truncated in many inboxes.
            </p>
          )}
        </>
      )}
    </div>
  );
}

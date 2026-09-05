"use client";

import * as React from "react";
import { Textarea } from "@/components/ui/textarea";
import { StatBar } from "@/components/tools/stat-bar";

function countSyllables(word: string) {
  word = word.toLowerCase().replace(/[^a-z]/g, "");
  if (!word) return 0;
  const matches = word.match(/[aeiouy]+/g);
  let count = matches ? matches.length : 1;
  if (word.endsWith("e") && count > 1) count--;
  return Math.max(1, count);
}

function analyze(text: string) {
  const sentences = (text.match(/[.!?]+(?=\s|$)/g) ?? []).length || (text.trim() ? 1 : 0);
  const words = text.trim() ? text.trim().split(/\s+/) : [];
  const syllables = words.reduce((sum, w) => sum + countSyllables(w), 0);
  const wc = words.length || 1;
  const sc = sentences || 1;
  const flesch = 206.835 - 1.015 * (wc / sc) - 84.6 * (syllables / wc);
  const grade = 0.39 * (wc / sc) + 11.8 * (syllables / wc) - 15.59;
  const avgWordsPerSentence = Math.round((wc / sc) * 10) / 10;
  return {
    words: words.length,
    sentences,
    avgWordsPerSentence,
    flesch: Math.round(flesch),
    grade: Math.max(0, Math.round(grade * 10) / 10),
  };
}

function verdict(score: number) {
  if (score >= 70) return { label: "Easy to read", note: "Suitable for a general audience with no special reading effort." };
  if (score >= 50) return { label: "Moderately readable", note: "Comfortable for most adult readers; fine for blog posts and articles." };
  if (score >= 30) return { label: "Fairly difficult", note: "Best suited to readers comfortable with longer, denser sentences." };
  return { label: "Very difficult", note: "Consider shorter sentences and simpler words to widen your audience." };
}

export function ReadabilityChecker() {
  const [text, setText] = React.useState("");
  const r = analyze(text);
  const v = verdict(r.flesch);

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <Textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Paste an article, blog post, or paragraph to check how easy it is to read..."
        className="min-h-[220px]"
      />

      <div className="mt-4 border-t pt-4">
        <p className="text-3xl font-bold tabular-nums">{text.trim() ? r.flesch : "—"}</p>
        <p className="text-sm text-muted-foreground">
          {text.trim() ? `${v.label} — ${v.note}` : "Reading ease score"}
        </p>
      </div>

      <StatBar
        items={[
          { label: "words", value: r.words },
          { label: "sentences", value: r.sentences },
          { label: "avg words/sentence", value: text.trim() ? r.avgWordsPerSentence : "—" },
          { label: "grade level", value: text.trim() ? r.grade : "—" },
        ]}
      />
    </div>
  );
}

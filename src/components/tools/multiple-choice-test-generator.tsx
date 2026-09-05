"use client";

import * as React from "react";
import { Textarea } from "@/components/ui/textarea";
import { CopyButton } from "@/components/tools/copy-button";

interface McqQuestion {
  question: string;
  options: string[];
  correctIndex: number;
}

function parseQuestions(raw: string): McqQuestion[] {
  const blocks = raw.split(/\n\s*\n/).map((b) => b.trim()).filter(Boolean);
  return blocks
    .map((block) => {
      const lines = block.split("\n").map((l) => l.trim()).filter(Boolean);
      const question = lines[0] ?? "";
      const options = lines.slice(1).map((l) => l.replace(/^\*/, "").trim());
      const correctIndex = lines.slice(1).findIndex((l) => l.startsWith("*"));
      return { question, options, correctIndex: correctIndex === -1 ? 0 : correctIndex };
    })
    .filter((q) => q.question && q.options.length >= 2);
}

const LETTERS = ["A", "B", "C", "D", "E", "F"];

export function MultipleChoiceTestGenerator() {
  const [raw, setRaw] = React.useState("");
  const questions = React.useMemo(() => parseQuestions(raw), [raw]);

  const testText = questions
    .map((q, i) => `${i + 1}. ${q.question}\n${q.options.map((o, j) => `   ${LETTERS[j]}. ${o}`).join("\n")}`)
    .join("\n\n");

  const answerKey = questions.map((q, i) => `${i + 1}. ${LETTERS[q.correctIndex]}`).join("\n");

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <Textarea
        value={raw}
        onChange={(e) => setRaw(e.target.value)}
        placeholder={"Separate questions with a blank line. Mark the correct option with a * prefix.\n\nWhat is the capital of France?\nLondon\n*Paris\nBerlin\nMadrid\n\n2 + 2 = ?\n3\n*4\n5"}
        rows={8}
        className="resize-y font-mono text-sm"
      />

      {questions.length > 0 && (
        <div className="mt-5 space-y-4 border-t pt-4">
          <div>
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-muted-foreground">Test ({questions.length} questions)</p>
              <CopyButton value={testText} />
            </div>
            <pre className="mt-2 max-h-64 overflow-auto whitespace-pre-wrap rounded-md border bg-muted/40 p-3 text-sm">{testText}</pre>
          </div>
          <div>
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-muted-foreground">Answer key</p>
              <CopyButton value={answerKey} />
            </div>
            <pre className="mt-2 whitespace-pre-wrap rounded-md border bg-muted/40 p-3 text-sm">{answerKey}</pre>
          </div>
        </div>
      )}
    </div>
  );
}

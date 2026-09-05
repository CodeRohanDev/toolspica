"use client";

import * as React from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { CheckCircle2, XCircle } from "lucide-react";

interface QuizQuestion {
  question: string;
  answer: string;
}

function parseQuestions(raw: string): QuizQuestion[] {
  return raw
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const [question, answer] = line.split("|").map((s) => s.trim());
      return { question: question ?? "", answer: answer ?? "" };
    })
    .filter((q) => q.question && q.answer);
}

export function QuizGenerator() {
  const [raw, setRaw] = React.useState("");
  const [started, setStarted] = React.useState(false);
  const [responses, setResponses] = React.useState<Record<number, string>>({});
  const [submitted, setSubmitted] = React.useState(false);
  const questions = React.useMemo(() => parseQuestions(raw), [raw]);

  function start() {
    setStarted(true);
    setResponses({});
    setSubmitted(false);
  }

  function score() {
    return questions.reduce((total, q, i) => {
      const given = (responses[i] ?? "").trim().toLowerCase();
      return total + (given === q.answer.trim().toLowerCase() ? 1 : 0);
    }, 0);
  }

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      {!started ? (
        <>
          <Textarea
            value={raw}
            onChange={(e) => setRaw(e.target.value)}
            placeholder={"One question per line, format: Question | Correct Answer\nWhat is the capital of France? | Paris\n2 + 2 = ? | 4"}
            rows={5}
            className="resize-y"
          />
          <Button type="button" className="mt-4" onClick={start} disabled={questions.length === 0}>
            Start Quiz ({questions.length} question{questions.length === 1 ? "" : "s"})
          </Button>
        </>
      ) : (
        <div className="space-y-4">
          {questions.map((q, i) => {
            const given = responses[i] ?? "";
            const isCorrect = submitted && given.trim().toLowerCase() === q.answer.trim().toLowerCase();
            return (
              <div key={i} className="rounded-lg border p-3">
                <p className="text-sm font-medium">
                  {i + 1}. {q.question}
                </p>
                <input
                  type="text"
                  value={given}
                  onChange={(e) => setResponses((prev) => ({ ...prev, [i]: e.target.value }))}
                  disabled={submitted}
                  placeholder="Your answer"
                  className="mt-2 w-full rounded-md border bg-transparent px-2.5 py-1.5 text-sm disabled:opacity-70"
                />
                {submitted && (
                  <p className={`mt-1.5 flex items-center gap-1.5 text-xs ${isCorrect ? "text-emerald-600" : "text-destructive"}`}>
                    {isCorrect ? <CheckCircle2 className="size-3.5" /> : <XCircle className="size-3.5" />}
                    {isCorrect ? "Correct" : `Correct answer: ${q.answer}`}
                  </p>
                )}
              </div>
            );
          })}

          <div className="flex items-center gap-3 border-t pt-4">
            {!submitted ? (
              <Button type="button" onClick={() => setSubmitted(true)}>
                Submit Answers
              </Button>
            ) : (
              <p className="text-lg font-semibold">
                Score: {score()} / {questions.length}
              </p>
            )}
            <Button type="button" variant="outline" onClick={() => setStarted(false)}>
              Edit Questions
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

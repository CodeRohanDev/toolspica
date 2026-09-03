"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { CopyButton } from "@/components/tools/copy-button";

const SUBJECTS = [
  "The old lighthouse keeper", "A curious fox", "The village baker", "An ambitious student",
  "The night train", "A wandering musician", "The retired detective", "A young astronomer",
  "The garden's oldest oak", "An unlikely friendship", "The morning market", "A forgotten letter",
  "The mountain guide", "A patient teacher", "The river ferry", "An eager apprentice",
];

const VERBS = [
  "discovered", "carried", "revealed", "transformed", "sheltered", "inspired",
  "surprised", "guided", "welcomed", "outlasted", "connected", "restored",
  "celebrated", "protected", "reflected", "awakened",
];

const OBJECTS = [
  "a hidden pathway through the hills", "the secret everyone had overlooked",
  "an old map with faded markings", "the last light of the harvest season",
  "a melody nobody could forget", "the courage to begin again",
  "a garden that bloomed out of season", "the story behind the locked door",
  "an answer written in the margins", "the quiet strength of routine",
  "a tradition worth keeping alive", "the first sign of changing weather",
  "a friendship built over shared meals", "the view that made the climb worthwhile",
];

const ENDINGS = [
  "before the first snow arrived.", "just as the town began to stir.",
  "despite every prediction otherwise.", "to everyone's lasting delight.",
  "without asking for anything in return.", "long after the crowds had gone.",
  "in a way no one expected.", "as the seasons slowly turned.",
];

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

export function RandomSentenceGenerator() {
  const [sentences, setSentences] = React.useState<string[]>([]);

  function generate(count: number) {
    const result: string[] = [];
    for (let i = 0; i < count; i++) {
      result.push(`${pick(SUBJECTS)} ${pick(VERBS)} ${pick(OBJECTS)} ${pick(ENDINGS)}`);
    }
    setSentences(result);
  }

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <div className="flex flex-wrap gap-2">
        <Button type="button" onClick={() => generate(1)}>
          Generate one sentence
        </Button>
        <Button type="button" variant="outline" onClick={() => generate(5)}>
          Generate five
        </Button>
      </div>

      {sentences.length > 0 && (
        <div className="mt-5">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium">Result</p>
            <CopyButton value={sentences.join("\n")} />
          </div>
          <div className="mt-2 space-y-2">
            {sentences.map((s, i) => (
              <p key={i} className="rounded-lg bg-brand-soft px-4 py-2.5 text-sm">
                {s}
              </p>
            ))}
          </div>
        </div>
      )}

      <p className="mt-4 text-xs text-muted-foreground">
        Sentences are assembled from grammatical building blocks, so every result reads as a
        proper English sentence — useful for writing prompts, placeholder copy, and testing.
      </p>
    </div>
  );
}

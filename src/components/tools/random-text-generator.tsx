"use client";

import * as React from "react";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { CopyButton } from "@/components/tools/copy-button";

const SUBJECTS = [
  "the team",
  "our customers",
  "the new system",
  "this feature",
  "the report",
  "every user",
  "the algorithm",
  "management",
  "the server",
  "our product",
];
const VERBS = [
  "reviewed",
  "updated",
  "launched",
  "tested",
  "improved",
  "analyzed",
  "deployed",
  "documented",
  "measured",
  "simplified",
];
const OBJECTS = [
  "the dashboard",
  "the workflow",
  "the pricing page",
  "the onboarding flow",
  "the database schema",
  "the customer feedback",
  "the release notes",
  "the search results",
  "the mobile layout",
  "the API response",
];
const CONNECTORS = [
  "before the deadline",
  "without any issues",
  "ahead of schedule",
  "after the last meeting",
  "based on user feedback",
  "during the sprint review",
  "over the weekend",
  "in record time",
];

type Unit = "words" | "sentences" | "paragraphs";

function randomOf<T>(list: T[]): T {
  return list[Math.floor(Math.random() * list.length)];
}

function makeSentence() {
  return `${randomOf(SUBJECTS)} ${randomOf(VERBS)} ${randomOf(OBJECTS)} ${randomOf(CONNECTORS)}.`.replace(
    /^./,
    (c) => c.toUpperCase()
  );
}

function makeParagraph() {
  const count = Math.floor(Math.random() * 3) + 3;
  return Array.from({ length: count }, makeSentence).join(" ");
}

const ALL_WORDS = Array.from(
  new Set([...SUBJECTS, ...VERBS, ...OBJECTS, ...CONNECTORS].join(" ").split(" "))
);

function generate(unit: Unit, count: number): string {
  if (unit === "words") {
    return Array.from({ length: count }, () => randomOf(ALL_WORDS)).join(" ");
  }
  if (unit === "sentences") {
    return Array.from({ length: count }, makeSentence).join(" ");
  }
  return Array.from({ length: count }, makeParagraph).join("\n\n");
}

const DEFAULT_OUTPUT =
  "The team reviewed the dashboard before the deadline. Our customers tested the onboarding flow without any issues. The new system improved the search results ahead of schedule.";

export function RandomTextGenerator() {
  const [unit, setUnit] = React.useState<Unit>("sentences");
  const [count, setCount] = React.useState(5);
  const [output, setOutput] = React.useState(DEFAULT_OUTPUT);

  function handleGenerate() {
    setOutput(generate(unit, Math.max(1, Math.min(count, 200))));
  }

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <div className="flex flex-wrap items-end gap-x-6 gap-y-3">
        <div>
          <Label className="text-sm text-muted-foreground">Generate</Label>
          <div className="mt-2 flex gap-1">
            {(["words", "sentences", "paragraphs"] as Unit[]).map((u) => (
              <Button
                key={u}
                type="button"
                size="sm"
                variant={unit === u ? "default" : "outline"}
                onClick={() => setUnit(u)}
              >
                {u}
              </Button>
            ))}
          </div>
        </div>
        <div>
          <Label htmlFor="random-count" className="text-sm text-muted-foreground">
            Count
          </Label>
          <Input
            id="random-count"
            type="number"
            min={1}
            max={200}
            value={count}
            onChange={(e) => setCount(Number(e.target.value))}
            className="mt-2 w-24"
          />
        </div>
        <Button type="button" size="sm" onClick={handleGenerate}>
          Generate
        </Button>
      </div>

      <div className="mt-5 border-t pt-4">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium text-muted-foreground">Output</p>
          <CopyButton value={output} />
        </div>
        <Textarea
          readOnly
          value={output}
          rows={10}
          className="mt-2 resize-y bg-muted/40 text-sm"
        />
      </div>
    </div>
  );
}

"use client";

import * as React from "react";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { CopyButton } from "@/components/tools/copy-button";

const WORD_BANK =
  "lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua enim ad minim veniam quis nostrud exercitation ullamco laboris nisi aliquip ex ea commodo consequat duis aute irure in reprehenderit voluptate velit esse cillum eu fugiat nulla pariatur excepteur sint occaecat cupidatat non proident sunt culpa qui officia deserunt mollit anim id est laborum".split(
    " "
  );

type Unit = "paragraphs" | "sentences" | "words";

function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function makeSentence(): string {
  const length = randomInt(6, 14);
  const words: string[] = [];
  for (let i = 0; i < length; i++) {
    words.push(WORD_BANK[randomInt(0, WORD_BANK.length - 1)]);
  }
  const sentence = words.join(" ");
  return sentence.charAt(0).toUpperCase() + sentence.slice(1) + ".";
}

function makeParagraph(): string {
  const sentenceCount = randomInt(4, 7);
  return Array.from({ length: sentenceCount }, makeSentence).join(" ");
}

function generate(unit: Unit, count: number, startClassic: boolean): string {
  const classicStart =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit.";

  if (unit === "words") {
    const words = Array.from(
      { length: count },
      () => WORD_BANK[randomInt(0, WORD_BANK.length - 1)]
    );
    return words.join(" ");
  }

  if (unit === "sentences") {
    const sentences = Array.from({ length: count }, makeSentence);
    if (startClassic && sentences.length > 0) sentences[0] = classicStart;
    return sentences.join(" ");
  }

  const paragraphs = Array.from({ length: count }, makeParagraph);
  if (startClassic && paragraphs.length > 0) {
    paragraphs[0] = classicStart + " " + paragraphs[0];
  }
  return paragraphs.join("\n\n");
}

export function LoremIpsumGenerator() {
  const [unit, setUnit] = React.useState<Unit>("paragraphs");
  const [count, setCount] = React.useState(3);
  const [startClassic, setStartClassic] = React.useState(true);
  // Static default (not randomly generated) so server-rendered HTML matches
  // the client's first render exactly — random output only appears after
  // the user clicks Generate.
  const [output, setOutput] = React.useState(
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
  );

  function handleGenerate() {
    setOutput(generate(unit, Math.max(1, Math.min(count, 100)), startClassic));
  }

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <div className="flex flex-wrap items-end gap-x-6 gap-y-3">
        <div>
          <Label className="text-sm text-muted-foreground">Generate</Label>
          <div className="mt-2 flex gap-1">
            {(["paragraphs", "sentences", "words"] as Unit[]).map((u) => (
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
          <Label htmlFor="lorem-count" className="text-sm text-muted-foreground">
            Count
          </Label>
          <Input
            id="lorem-count"
            type="number"
            min={1}
            max={100}
            value={count}
            onChange={(e) => setCount(Number(e.target.value))}
            className="mt-2 w-24"
          />
        </div>
        <div className="flex items-center gap-2 pb-2">
          <Switch
            id="start-classic"
            checked={startClassic}
            onCheckedChange={setStartClassic}
          />
          <Label htmlFor="start-classic" className="text-sm font-normal">
            Start with "Lorem ipsum dolor sit amet..."
          </Label>
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

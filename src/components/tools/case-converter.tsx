"use client";

import * as React from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { CopyButton } from "@/components/tools/copy-button";

function toTitleCase(input: string) {
  return input.replace(
    /\w\S*/g,
    (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
  );
}

function toSentenceCase(input: string) {
  const lower = input.toLowerCase();
  return lower.replace(
    /(^\s*\w|[.!?]\s+\w)/g,
    (match) => match.toUpperCase()
  );
}

function words(input: string) {
  return input
    .trim()
    .split(/[\s_-]+|(?=[A-Z])/)
    .map((w) => w.trim())
    .filter(Boolean)
    .map((w) => w.toLowerCase());
}

function toCamelCase(input: string) {
  const parts = words(input);
  return parts
    .map((w, i) => (i === 0 ? w : w.charAt(0).toUpperCase() + w.slice(1)))
    .join("");
}

function toPascalCase(input: string) {
  return words(input)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join("");
}

function toSnakeCase(input: string) {
  return words(input).join("_");
}

function toKebabCase(input: string) {
  return words(input).join("-");
}

function toAlternatingCase(input: string) {
  return input
    .split("")
    .map((char, i) => (i % 2 === 0 ? char.toLowerCase() : char.toUpperCase()))
    .join("");
}

const CASES = [
  { label: "UPPERCASE", fn: (s: string) => s.toUpperCase() },
  { label: "lowercase", fn: (s: string) => s.toLowerCase() },
  { label: "Title Case", fn: toTitleCase },
  { label: "Sentence case", fn: toSentenceCase },
  { label: "camelCase", fn: toCamelCase },
  { label: "PascalCase", fn: toPascalCase },
  { label: "snake_case", fn: toSnakeCase },
  { label: "kebab-case", fn: toKebabCase },
  { label: "aLtErNaTiNg CaSe", fn: toAlternatingCase },
];

export function CaseConverter() {
  const [text, setText] = React.useState("");
  const [output, setOutput] = React.useState("");
  const [activeCase, setActiveCase] = React.useState<string | null>(null);

  function applyCase(label: string, fn: (s: string) => string) {
    setOutput(fn(text));
    setActiveCase(label);
  }

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <Textarea
        value={text}
        onChange={(e) => {
          setText(e.target.value);
          setActiveCase(null);
        }}
        placeholder="Type or paste your text here..."
        rows={6}
        className="resize-y text-sm"
      />

      <div className="mt-4 flex flex-wrap gap-2">
        {CASES.map((c) => (
          <Button
            key={c.label}
            type="button"
            size="sm"
            variant={activeCase === c.label ? "default" : "outline"}
            onClick={() => applyCase(c.label, c.fn)}
            disabled={!text}
          >
            {c.label}
          </Button>
        ))}
      </div>

      {activeCase && (
        <div className="mt-4">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium">Result — {activeCase}</p>
            <CopyButton value={output} />
          </div>
          <Textarea
            readOnly
            value={output}
            rows={6}
            className="mt-2 resize-y bg-brand-soft text-sm"
          />
        </div>
      )}
    </div>
  );
}

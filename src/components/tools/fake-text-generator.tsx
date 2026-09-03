"use client";

import * as React from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { CopyButton } from "@/components/tools/copy-button";

const HEADINGS = [
  "Your Headline Goes Here",
  "Build Something Great Today",
  "The Future Starts Now",
  "Simple. Fast. Reliable.",
  "Everything You Need, In One Place",
];
const SUBHEADINGS = [
  "A short subheading that explains the value in one line.",
  "Everything you need to get started, right out of the box.",
  "Trusted by teams who want to move faster.",
  "No setup required — start in seconds.",
];
const PARAGRAPHS = [
  "This is placeholder body copy for a design mockup. Replace this paragraph with real content before publishing — it's here purely to test spacing, line length, and readability at this font size.",
  "Use this block to preview how paragraph text will look in your layout. It's intentionally generic so it doesn't distract from evaluating the actual design.",
];
const BUTTON_LABELS = [
  "Get Started",
  "Learn More",
  "Sign Up Free",
  "Try It Now",
  "Contact Sales",
  "Download",
];
const LIST_ITEMS = [
  "Fast, reliable performance",
  "Works on any device",
  "No credit card required",
  "Cancel anytime",
  "24/7 customer support",
];

type Kind = "heading" | "subheading" | "paragraph" | "button" | "list";

function randomOf<T>(list: T[]): T {
  return list[Math.floor(Math.random() * list.length)];
}

function generate(kind: Kind): string {
  switch (kind) {
    case "heading":
      return randomOf(HEADINGS);
    case "subheading":
      return randomOf(SUBHEADINGS);
    case "paragraph":
      return randomOf(PARAGRAPHS);
    case "button":
      return Array.from({ length: 5 }, () => randomOf(BUTTON_LABELS)).join(", ");
    case "list":
      return LIST_ITEMS.map((item) => `• ${item}`).join("\n");
  }
}

const KIND_LABELS: { value: Kind; label: string }[] = [
  { value: "heading", label: "Heading" },
  { value: "subheading", label: "Subheading" },
  { value: "paragraph", label: "Paragraph" },
  { value: "button", label: "Button labels" },
  { value: "list", label: "List items" },
];

export function FakeTextGenerator() {
  const [kind, setKind] = React.useState<Kind>("heading");
  const [output, setOutput] = React.useState(HEADINGS[0]);

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <div className="flex flex-wrap gap-2">
        {KIND_LABELS.map((k) => (
          <Button
            key={k.value}
            type="button"
            size="sm"
            variant={kind === k.value ? "default" : "outline"}
            onClick={() => setKind(k.value)}
          >
            {k.label}
          </Button>
        ))}
      </div>

      <Button
        type="button"
        size="sm"
        className="mt-4"
        onClick={() => setOutput(generate(kind))}
      >
        Generate
      </Button>

      <div className="mt-5 border-t pt-4">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium text-muted-foreground">Placeholder text</p>
          <CopyButton value={output} />
        </div>
        <Textarea
          readOnly
          value={output}
          rows={5}
          className="mt-2 resize-y bg-muted/40 text-sm"
        />
      </div>
    </div>
  );
}

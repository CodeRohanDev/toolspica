"use client";

import * as React from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { CopyButton } from "@/components/tools/copy-button";

const MORSE_MAP: Record<string, string> = {
  A: ".-", B: "-...", C: "-.-.", D: "-..", E: ".", F: "..-.",
  G: "--.", H: "....", I: "..", J: ".---", K: "-.-", L: ".-..",
  M: "--", N: "-.", O: "---", P: ".--.", Q: "--.-", R: ".-.",
  S: "...", T: "-", U: "..-", V: "...-", W: ".--", X: "-..-",
  Y: "-.--", Z: "--..",
  "0": "-----", "1": ".----", "2": "..---", "3": "...--", "4": "....-",
  "5": ".....", "6": "-....", "7": "--...", "8": "---..", "9": "----.",
  ".": ".-.-.-", ",": "--..--", "?": "..--..", "'": ".----.",
  "!": "-.-.--", "/": "-..-.", "(": "-.--.", ")": "-.--.-",
  "&": ".-...", ":": "---...", ";": "-.-.-.", "=": "-...-",
  "+": ".-.-.", "-": "-....-", "_": "..--.-", '"': ".-..-.",
  "@": ".--.-.",
};

const REVERSE_MORSE_MAP: Record<string, string> = Object.fromEntries(
  Object.entries(MORSE_MAP).map(([letter, code]) => [code, letter])
);

function textToMorse(text: string): string {
  return text
    .toUpperCase()
    .split(" ")
    .map((word) =>
      word
        .split("")
        .map((char) => MORSE_MAP[char] ?? "")
        .filter(Boolean)
        .join(" ")
    )
    .join(" / ");
}

function morseToText(morse: string): string {
  return morse
    .trim()
    .split(" / ")
    .map((word) =>
      word
        .trim()
        .split(/\s+/)
        .map((code) => REVERSE_MORSE_MAP[code] ?? "")
        .join("")
    )
    .join(" ");
}

type Direction = "to-morse" | "to-text";

export function MorseCodeTranslator() {
  const [direction, setDirection] = React.useState<Direction>("to-morse");
  const [input, setInput] = React.useState("");

  const output = React.useMemo(() => {
    return direction === "to-morse" ? textToMorse(input) : morseToText(input);
  }, [input, direction]);

  function swap() {
    setDirection((d) => (d === "to-morse" ? "to-text" : "to-morse"));
    setInput(output);
  }

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex gap-1">
          <Button
            type="button"
            size="sm"
            variant={direction === "to-morse" ? "default" : "outline"}
            onClick={() => setDirection("to-morse")}
          >
            Text → Morse
          </Button>
          <Button
            type="button"
            size="sm"
            variant={direction === "to-text" ? "default" : "outline"}
            onClick={() => setDirection("to-text")}
          >
            Morse → Text
          </Button>
        </div>
        <Button type="button" variant="ghost" size="sm" onClick={swap}>
          Swap
        </Button>
      </div>

      <Textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder={
          direction === "to-morse"
            ? "Type text to convert to Morse code..."
            : "Enter Morse code (dots and dashes, / between words)..."
        }
        rows={6}
        className="mt-4 resize-y font-mono text-sm"
      />

      <div className="mt-5 border-t pt-4">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium text-muted-foreground">
            {direction === "to-morse" ? "Morse code" : "Decoded text"}
          </p>
          <CopyButton value={output} />
        </div>
        <Textarea
          readOnly
          value={output}
          rows={6}
          className="mt-2 resize-y bg-muted/40 font-mono text-sm"
        />
      </div>
    </div>
  );
}

"use client";

import * as React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { CopyButton } from "@/components/tools/copy-button";

const EMOJI = [
  "😀", "😂", "🥰", "😎", "🤔", "😴", "🤯", "🥳", "😇", "🤩",
  "👍", "👏", "🙌", "🤝", "💪", "🧠", "👀", "🦾", "✌️", "🤞",
  "🐶", "🐱", "🦊", "🐼", "🦁", "🐸", "🦄", "🐙", "🦋", "🐢",
  "🌵", "🌴", "🌸", "🍀", "🌈", "⭐", "🌙", "☀️", "❄️", "🔥",
  "🍕", "🍔", "🍩", "🍓", "🥑", "🍜", "🍰", "☕", "🧋", "🍉",
  "⚽", "🏀", "🎮", "🎸", "🎨", "📚", "🚀", "✈️", "🚲", "🏖️",
  "💡", "🎯", "🎁", "🔑", "💎", "🧲", "🔮", "🎲", "🧩", "📌",
];

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

export function RandomEmojiGenerator() {
  const [count, setCount] = React.useState("5");
  const [emoji, setEmoji] = React.useState<string[]>([]);

  function generate() {
    const n = Math.max(1, Math.min(30, parseInt(count, 10) || 5));
    setEmoji(Array.from({ length: n }, () => pick(EMOJI)));
  }

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <div className="flex flex-wrap items-end gap-3">
        <div>
          <Label htmlFor="emoji-count" className="text-sm text-muted-foreground">
            How many (1-30)
          </Label>
          <Input
            id="emoji-count"
            type="number"
            inputMode="numeric"
            min={1}
            max={30}
            value={count}
            onChange={(e) => setCount(e.target.value)}
            className="mt-1.5 w-24"
          />
        </div>
        <Button type="button" onClick={generate}>
          Generate
        </Button>
      </div>

      {emoji.length > 0 && (
        <div className="mt-5">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium">Result</p>
            <CopyButton value={emoji.join("")} />
          </div>
          <p className="mt-3 text-center text-5xl leading-relaxed tracking-wide">
            {emoji.join(" ")}
          </p>
        </div>
      )}
    </div>
  );
}

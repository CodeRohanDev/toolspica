"use client";

import * as React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { CopyButton } from "@/components/tools/copy-button";

const WORDS = [
  "apple", "anchor", "bridge", "candle", "dragon", "ember", "forest", "garden",
  "harbor", "island", "journey", "kitchen", "lantern", "meadow", "needle", "ocean",
  "puzzle", "quartz", "river", "shadow", "temple", "umbrella", "valley", "window",
  "yellow", "zephyr", "blanket", "compass", "diamond", "engine", "feather", "glacier",
  "hammer", "ivory", "jungle", "kettle", "ladder", "mirror", "nectar", "orchard",
  "pepper", "quiver", "ribbon", "saddle", "thunder", "united", "velvet", "whisper",
  "basket", "canyon", "dolphin", "eagle", "falcon", "goblet", "horizon", "iceberg",
  "jacket", "keyboard", "lighthouse", "mountain", "notebook", "octopus", "painter",
  "quarter", "rocket", "sunset", "tunnel", "universe", "village", "waterfall",
  "avalanche", "butterfly", "cathedral", "dandelion", "elephant", "firefly",
  "gondola", "hurricane", "illusion", "jasmine", "kaleidoscope", "labyrinth",
  "magnolia", "nightingale", "orchestra", "parachute", "quicksand", "reservoir",
  "sapphire", "telescope", "ultimate", "vineyard", "wilderness", "xylophone",
  "yesterday", "zeppelin", "acoustic", "balance", "cascade", "delicate", "elegant",
  "fragile", "graceful", "harmony", "infinite", "jubilant", "kindred", "luminous",
  "majestic", "noble", "obscure", "peaceful", "quaint", "radiant", "serene",
  "tranquil", "unique", "vivid", "wistful", "youthful", "zealous", "ancient",
  "brave", "curious", "daring", "eager", "fierce", "gentle", "humble", "intense",
];

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

export function RandomWordGenerator() {
  const [count, setCount] = React.useState("5");
  const [words, setWords] = React.useState<string[]>([]);

  function generate() {
    const n = Math.max(1, Math.min(50, parseInt(count, 10) || 5));
    const picked = new Set<string>();
    while (picked.size < Math.min(n, WORDS.length)) {
      picked.add(pick(WORDS));
    }
    setWords([...picked]);
  }

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <div className="flex flex-wrap items-end gap-3">
        <div>
          <Label htmlFor="word-count" className="text-sm text-muted-foreground">
            How many words (1-50)
          </Label>
          <Input
            id="word-count"
            type="number"
            inputMode="numeric"
            min={1}
            max={50}
            value={count}
            onChange={(e) => setCount(e.target.value)}
            className="mt-1.5 w-24"
          />
        </div>
        <Button type="button" onClick={generate}>
          Generate
        </Button>
      </div>

      {words.length > 0 && (
        <div className="mt-5">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium">Random words</p>
            <CopyButton value={words.join(", ")} />
          </div>
          <div className="mt-2 flex flex-wrap gap-2">
            {words.map((word, i) => (
              <span key={i} className="rounded-full bg-brand-soft px-3 py-1 text-sm font-medium">
                {word}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

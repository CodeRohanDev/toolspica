"use client";

import * as React from "react";
import { Input } from "@/components/ui/input";

const EMOJI: Record<string, string[]> = {
  Smileys: ["😀","😁","😂","🤣","😊","😍","😘","🥰","😎","🤩","😢","😭","😡","😱","🥳","🤔","😴","🤯","😇","🙄"],
  Gestures: ["👍","👎","👏","🙌","🙏","👋","💪","✌️","🤝","👌","🤞","✋","🤙","👊","🫶"],
  Hearts: ["❤️","🧡","💛","💚","💙","💜","🖤","🤍","🤎","💔","❤️‍🔥","💕","💞","💓"],
  Objects: ["🔥","✨","🎉","🎁","💯","⭐","🌟","💡","📌","🔔","🎯","🏆","💰","📱","💻"],
  Nature: ["🌸","🌻","🌈","☀️","🌙","⚡","❄️","🌊","🌳","🍀","🐶","🐱","🦋","🐝"],
  Food: ["🍕","🍔","🍟","🍩","🍰","☕","🍺","🍎","🍓","🍫","🌮","🍜"],
};

export function EmojiPickerAndCopyTool() {
  const [query, setQuery] = React.useState("");
  const [copied, setCopied] = React.useState<string | null>(null);

  async function copy(e: string) {
    try {
      await navigator.clipboard.writeText(e);
      setCopied(e);
      setTimeout(() => setCopied(null), 1200);
    } catch {}
  }

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <Input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search by category name (e.g. hearts, food, nature)..."
      />
      <div className="mt-4 space-y-4">
        {Object.entries(EMOJI)
          .filter(([cat]) => !query || cat.toLowerCase().includes(query.toLowerCase()))
          .map(([cat, list]) => (
            <div key={cat}>
              <p className="mb-2 text-sm font-medium text-muted-foreground">{cat}</p>
              <div className="flex flex-wrap gap-1.5">
                {list.map((e) => (
                  <button
                    key={e}
                    type="button"
                    onClick={() => copy(e)}
                    className="flex h-10 w-10 items-center justify-center rounded-md border text-xl hover:bg-muted"
                    title="Click to copy"
                  >
                    {e}
                  </button>
                ))}
              </div>
            </div>
          ))}
      </div>
      {copied && (
        <p className="mt-3 text-sm text-primary">Copied {copied} to clipboard.</p>
      )}
    </div>
  );
}

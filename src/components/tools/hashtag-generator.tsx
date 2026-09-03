"use client";

import * as React from "react";
import { Input } from "@/components/ui/input";
import { CopyButton } from "@/components/tools/copy-button";

function generateHashtags(topic: string) {
  const clean = topic.trim().toLowerCase().replace(/[^a-z0-9\s]/g, "");
  if (!clean) return [];
  const words = clean.split(/\s+/).filter(Boolean);
  const base = words.join("");
  const capWords = words.map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join("");
  const suffixes = ["daily", "life", "love", "community", "tips", "trends", "world", "vibes", "goals", "inspo"];
  const tags = new Set<string>();
  tags.add(`#${base}`);
  tags.add(`#${capWords}`);
  for (const w of words) tags.add(`#${w}`);
  for (const s of suffixes) tags.add(`#${base}${s}`);
  return [...tags].slice(0, 20);
}

export function HashtagGenerator() {
  const [topic, setTopic] = React.useState("");
  const tags = generateHashtags(topic);

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <Input value={topic} onChange={(e) => setTopic(e.target.value)} placeholder="Enter a topic, e.g. sustainable fashion" />
      {tags.length > 0 && (
        <>
          <div className="mt-4 flex flex-wrap gap-2 border-t pt-4">
            {tags.map((t) => <span key={t} className="rounded-full border bg-muted px-3 py-1 text-sm">{t}</span>)}
          </div>
          <div className="mt-3 flex justify-end">
            <CopyButton value={tags.join(" ")} label="Copy all" />
          </div>
        </>
      )}
    </div>
  );
}

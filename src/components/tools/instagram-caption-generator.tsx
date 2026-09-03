"use client";

import * as React from "react";
import { Input } from "@/components/ui/input";
import { CopyButton } from "@/components/tools/copy-button";

const TEMPLATES = [
  (t: string) => `Living my best life, one ${t} at a time. ✨`,
  (t: string) => `${t} hits different today. 💛`,
  (t: string) => `Just here for the ${t} vibes. 🌿`,
  (t: string) => `Currently obsessed with ${t}.`,
  (t: string) => `${t} — because why not?`,
  (t: string) => `Chasing good ${t} moments. 📸`,
  (t: string) => `Note to self: more ${t}, less stress.`,
  (t: string) => `This ${t} moment deserved a post.`,
];

export function InstagramCaptionGenerator() {
  const [topic, setTopic] = React.useState("");
  const captions = topic.trim() ? TEMPLATES.map((fn) => fn(topic.trim())) : [];

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <Input value={topic} onChange={(e) => setTopic(e.target.value)} placeholder="Enter a topic or mood, e.g. sunset, coffee, weekend" />
      {captions.length > 0 && (
        <div className="mt-4 space-y-2 border-t pt-4">
          {captions.map((c, i) => (
            <div key={i} className="flex items-center justify-between gap-3 rounded-md border bg-muted/40 px-3 py-2">
              <p className="text-sm">{c}</p>
              <CopyButton value={c} label="" />
            </div>
          ))}
        </div>
      )}
      <p className="mt-3 text-xs text-muted-foreground">Template-based caption ideas to spark inspiration — tweak the wording to match your own voice.</p>
    </div>
  );
}

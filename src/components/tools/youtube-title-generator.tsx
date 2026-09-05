"use client";

import * as React from "react";
import { Input } from "@/components/ui/input";
import { CopyButton } from "@/components/tools/copy-button";

const TEMPLATES = [
  (t: string) => `How to ${t} (Step by Step)`,
  (t: string) => `${t}: Everything You Need to Know`,
  (t: string) => `I Tried ${t} for 30 Days — Here's What Happened`,
  (t: string) => `The Ultimate Guide to ${t}`,
  (t: string) => `${t} Explained in 10 Minutes`,
  (t: string) => `Why ${t} Actually Matters`,
  (t: string) => `${t}: What Nobody Tells You`,
  (t: string) => `Top 5 Mistakes People Make With ${t}`,
];

export function YoutubeTitleGenerator() {
  const [topic, setTopic] = React.useState("");
  const titles = topic.trim() ? TEMPLATES.map((fn) => fn(topic.trim())) : [];

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <Input value={topic} onChange={(e) => setTopic(e.target.value)} placeholder="Enter your video's topic, e.g. sourdough bread" />
      {titles.length > 0 && (
        <div className="mt-4 space-y-2 border-t pt-4">
          {titles.map((title, i) => (
            <div key={i} className="flex items-center justify-between gap-3 rounded-md border bg-muted/40 px-3 py-2">
              <p className="text-sm">{title}</p>
              <CopyButton value={title} label="" />
            </div>
          ))}
        </div>
      )}
      <p className="mt-3 text-xs text-muted-foreground">
        Template-based title ideas built around proven patterns — pick one and adjust the wording to match your actual video.
      </p>
    </div>
  );
}

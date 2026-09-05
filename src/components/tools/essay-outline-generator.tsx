"use client";

import * as React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { CopyButton } from "@/components/tools/copy-button";

export function EssayOutlineGenerator() {
  const [topic, setTopic] = React.useState("");
  const [points, setPoints] = React.useState("");

  const pointList = points
    .split("\n")
    .map((p) => p.trim())
    .filter(Boolean);

  const outline = !topic.trim()
    ? ""
    : `I. Introduction
   A. Hook / opening statement about ${topic}
   B. Background context on ${topic}
   C. Thesis statement (your main argument about ${topic})

${pointList
  .map(
    (point, i) => `${["II", "III", "IV", "V", "VI", "VII"][i] ?? `Body ${i + 1}`}. ${point}
   A. Supporting evidence or example
   B. Analysis — why this point supports the thesis
   C. Transition to next point`
  )
  .join("\n\n")}

${["II", "III", "IV", "V", "VI", "VII"][pointList.length] ?? "Final"}. Conclusion
   A. Restate the thesis in light of the evidence presented
   B. Summarize the main points
   C. Closing thought or broader implication of ${topic}`;

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <div className="grid gap-3">
        <div>
          <Label className="text-sm text-muted-foreground">Essay topic</Label>
          <Input value={topic} onChange={(e) => setTopic(e.target.value)} placeholder="The impact of remote work on productivity" className="mt-1.5" />
        </div>
        <div>
          <Label className="text-sm text-muted-foreground">Main points (one per line)</Label>
          <Textarea
            value={points}
            onChange={(e) => setPoints(e.target.value)}
            placeholder={"Flexibility improves focus\nCommunication challenges\nWork-life balance effects"}
            rows={4}
            className="mt-1.5 resize-y"
          />
        </div>
      </div>

      {outline && (
        <div className="mt-5 border-t pt-4">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-muted-foreground">Outline</p>
            <CopyButton value={outline} />
          </div>
          <Textarea readOnly value={outline} rows={16} className="mt-2 resize-y bg-muted/40 text-sm" />
        </div>
      )}
    </div>
  );
}

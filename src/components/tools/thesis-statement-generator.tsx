"use client";

import * as React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CopyButton } from "@/components/tools/copy-button";

export function ThesisStatementGenerator() {
  const [topic, setTopic] = React.useState("");
  const [stance, setStance] = React.useState("");
  const [reason1, setReason1] = React.useState("");
  const [reason2, setReason2] = React.useState("");
  const [reason3, setReason3] = React.useState("");

  const reasons = [reason1, reason2, reason3].filter(Boolean);

  const thesis =
    topic.trim() && stance.trim() && reasons.length > 0
      ? `${stance.trim().replace(/\.$/, "")}${reasons.length === 1 ? ` because ${reasons[0]}.` : reasons.length === 2 ? ` because ${reasons[0]} and ${reasons[1]}.` : ` because ${reasons.slice(0, -1).join(", ")}, and ${reasons.at(-1)}.`}`
      : "";

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <div className="grid gap-3">
        <div>
          <Label className="text-sm text-muted-foreground">Topic</Label>
          <Input value={topic} onChange={(e) => setTopic(e.target.value)} placeholder="social media use among teenagers" className="mt-1.5" />
        </div>
        <div>
          <Label className="text-sm text-muted-foreground">Your stance / claim</Label>
          <Input value={stance} onChange={(e) => setStance(e.target.value)} placeholder="Social media use among teenagers should be limited" className="mt-1.5" />
        </div>
        <div className="grid gap-3 sm:grid-cols-3">
          <div>
            <Label className="text-sm text-muted-foreground">Reason 1</Label>
            <Input value={reason1} onChange={(e) => setReason1(e.target.value)} placeholder="it disrupts sleep patterns" className="mt-1.5" />
          </div>
          <div>
            <Label className="text-sm text-muted-foreground">Reason 2 (optional)</Label>
            <Input value={reason2} onChange={(e) => setReason2(e.target.value)} placeholder="it increases anxiety" className="mt-1.5" />
          </div>
          <div>
            <Label className="text-sm text-muted-foreground">Reason 3 (optional)</Label>
            <Input value={reason3} onChange={(e) => setReason3(e.target.value)} placeholder="it reduces face-to-face social skills" className="mt-1.5" />
          </div>
        </div>
      </div>

      {thesis && (
        <div className="mt-5 border-t pt-4">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-muted-foreground">Thesis statement</p>
            <CopyButton value={thesis} />
          </div>
          <p className="mt-2 rounded-md border bg-muted/40 p-3 text-sm">{thesis}</p>
        </div>
      )}
    </div>
  );
}

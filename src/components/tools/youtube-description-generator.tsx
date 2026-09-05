"use client";

import * as React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { CopyButton } from "@/components/tools/copy-button";

export function YoutubeDescriptionGenerator() {
  const [topic, setTopic] = React.useState("");
  const [keyPoints, setKeyPoints] = React.useState("");
  const [channelName, setChannelName] = React.useState("");
  const [social, setSocial] = React.useState("");

  const points = keyPoints
    .split("\n")
    .map((p) => p.trim())
    .filter(Boolean);

  const description = !topic.trim()
    ? ""
    : `In this video, we dive into ${topic}. ${points.length > 0 ? "Here's what's covered:" : ""}

${points.map((p) => `- ${p}`).join("\n")}

${points.length > 0 ? "\n" : ""}If you found this helpful, drop a like and subscribe to ${channelName || "the channel"} for more videos like this one.

${social ? `Follow us: ${social}` : ""}

#${topic.trim().toLowerCase().replace(/[^a-z0-9\s]/g, "").replace(/\s+/g, "")} #youtube`;

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <div className="grid gap-3">
        <div>
          <Label className="text-sm text-muted-foreground">Video topic</Label>
          <Input value={topic} onChange={(e) => setTopic(e.target.value)} placeholder="beginner guitar chords" className="mt-1.5" />
        </div>
        <div>
          <Label className="text-sm text-muted-foreground">Key points (one per line)</Label>
          <Textarea
            value={keyPoints}
            onChange={(e) => setKeyPoints(e.target.value)}
            placeholder={"How to hold the guitar\nThe four basic chords\nCommon beginner mistakes"}
            rows={3}
            className="mt-1.5 resize-y"
          />
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          <div>
            <Label className="text-sm text-muted-foreground">Channel name</Label>
            <Input value={channelName} onChange={(e) => setChannelName(e.target.value)} placeholder="Your Channel" className="mt-1.5" />
          </div>
          <div>
            <Label className="text-sm text-muted-foreground">Social links (optional)</Label>
            <Input value={social} onChange={(e) => setSocial(e.target.value)} placeholder="instagram.com/yourhandle" className="mt-1.5" />
          </div>
        </div>
      </div>

      {description && (
        <div className="mt-5 border-t pt-4">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-muted-foreground">Description</p>
            <CopyButton value={description} />
          </div>
          <Textarea readOnly value={description} rows={10} className="mt-2 resize-y bg-muted/40 text-sm" />
        </div>
      )}
    </div>
  );
}

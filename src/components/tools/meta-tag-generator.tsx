"use client";

import * as React from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { CopyButton } from "@/components/tools/copy-button";

export function MetaTagGenerator() {
  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [keywords, setKeywords] = React.useState("");
  const [author, setAuthor] = React.useState("");
  const [viewport, setViewport] = React.useState(true);
  const [robots, setRobots] = React.useState("index, follow");

  const output = [
    title && `<title>${title}</title>`,
    description && `<meta name="description" content="${description}" />`,
    keywords && `<meta name="keywords" content="${keywords}" />`,
    author && `<meta name="author" content="${author}" />`,
    viewport && `<meta name="viewport" content="width=device-width, initial-scale=1" />`,
    `<meta name="robots" content="${robots}" />`,
    `<meta charset="UTF-8" />`,
  ]
    .filter(Boolean)
    .join("\n");

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <div className="grid gap-3">
        <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Page title" />
        <Textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Meta description (150-160 characters recommended)" className="min-h-[70px]" />
        <Input value={keywords} onChange={(e) => setKeywords(e.target.value)} placeholder="Keywords (comma separated, optional)" />
        <Input value={author} onChange={(e) => setAuthor(e.target.value)} placeholder="Author (optional)" />
        <select value={robots} onChange={(e) => setRobots(e.target.value)} className="rounded-md border bg-background px-3 py-2 text-sm">
          <option value="index, follow">index, follow</option>
          <option value="noindex, follow">noindex, follow</option>
          <option value="index, nofollow">index, nofollow</option>
          <option value="noindex, nofollow">noindex, nofollow</option>
        </select>
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" checked={viewport} onChange={(e) => setViewport(e.target.checked)} />
          Include responsive viewport tag
        </label>
      </div>
      <div className="mt-4 flex items-center justify-between border-t pt-3">
        <p className="text-sm font-medium text-muted-foreground">Generated tags</p>
        <CopyButton value={output} label="Copy HTML" />
      </div>
      <pre className="mt-2 overflow-x-auto rounded-md bg-muted p-3 text-xs">{output}</pre>
    </div>
  );
}

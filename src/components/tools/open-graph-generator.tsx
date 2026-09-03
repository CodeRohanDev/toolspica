"use client";

import * as React from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { CopyButton } from "@/components/tools/copy-button";

export function OpenGraphGenerator() {
  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [image, setImage] = React.useState("");
  const [url, setUrl] = React.useState("");
  const [type, setType] = React.useState("website");
  const [siteName, setSiteName] = React.useState("");

  const output = [
    title && `<meta property="og:title" content="${title}" />`,
    description && `<meta property="og:description" content="${description}" />`,
    image && `<meta property="og:image" content="${image}" />`,
    url && `<meta property="og:url" content="${url}" />`,
    `<meta property="og:type" content="${type}" />`,
    siteName && `<meta property="og:site_name" content="${siteName}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
  ]
    .filter(Boolean)
    .join("\n");

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <div className="grid gap-3">
        <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="og:title" />
        <Textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="og:description" className="min-h-[70px]" />
        <Input value={image} onChange={(e) => setImage(e.target.value)} placeholder="og:image URL (1200x630 recommended)" />
        <Input value={url} onChange={(e) => setUrl(e.target.value)} placeholder="og:url" />
        <Input value={siteName} onChange={(e) => setSiteName(e.target.value)} placeholder="og:site_name (optional)" />
        <select value={type} onChange={(e) => setType(e.target.value)} className="rounded-md border bg-background px-3 py-2 text-sm">
          <option value="website">website</option>
          <option value="article">article</option>
          <option value="product">product</option>
          <option value="video.other">video</option>
        </select>
      </div>
      {image && (
        <div className="mt-4 overflow-hidden rounded-lg border">
          <img src={image} alt="OG preview" className="h-40 w-full object-cover" />
          <div className="bg-muted/50 p-3">
            <p className="truncate text-sm font-semibold">{title || "Title preview"}</p>
            <p className="truncate text-xs text-muted-foreground">{description || "Description preview"}</p>
          </div>
        </div>
      )}
      <div className="mt-4 flex items-center justify-between border-t pt-3">
        <p className="text-sm font-medium text-muted-foreground">Generated tags</p>
        <CopyButton value={output} label="Copy HTML" />
      </div>
      <pre className="mt-2 overflow-x-auto rounded-md bg-muted p-3 text-xs">{output}</pre>
    </div>
  );
}

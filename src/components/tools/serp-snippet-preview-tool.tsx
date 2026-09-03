"use client";

import * as React from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export function SerpSnippetPreviewTool() {
  const [title, setTitle] = React.useState("Your Page Title Here");
  const [url, setUrl] = React.useState("https://example.com/page");
  const [description, setDescription] = React.useState("Your meta description will appear here. Keep it under 160 characters for the best display in Google search results.");

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <div className="grid gap-3">
        <div>
          <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Page title" />
          <p className="mt-1 text-xs text-muted-foreground">{title.length} / 60 characters {title.length > 60 && "(will be truncated)"}</p>
        </div>
        <Input value={url} onChange={(e) => setUrl(e.target.value)} placeholder="Page URL" />
        <div>
          <Textarea value={description} onChange={(e) => setDescription(e.target.value)} className="min-h-[80px]" placeholder="Meta description" />
          <p className="mt-1 text-xs text-muted-foreground">{description.length} / 160 characters {description.length > 160 && "(will be truncated)"}</p>
        </div>
      </div>
      <div className="mt-5 max-w-xl rounded-lg border bg-white p-4 font-arial">
        <p className="truncate text-sm text-[#202124]">{url}</p>
        <p className="mt-0.5 truncate text-xl text-[#1a0dab]">{title.slice(0, 60)}</p>
        <p className="mt-0.5 text-sm text-[#4d5156]">{description.slice(0, 160)}</p>
      </div>
    </div>
  );
}

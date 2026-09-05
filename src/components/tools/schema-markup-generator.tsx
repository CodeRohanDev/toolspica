"use client";

import * as React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { CopyButton } from "@/components/tools/copy-button";

type SchemaType = "Article" | "Product" | "LocalBusiness" | "FAQPage";

const TYPES: SchemaType[] = ["Article", "Product", "LocalBusiness", "FAQPage"];

export function SchemaMarkupGenerator() {
  const [type, setType] = React.useState<SchemaType>("Article");
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [url, setUrl] = React.useState("");
  const [extra, setExtra] = React.useState("");

  const schema = React.useMemo(() => {
    const base: Record<string, unknown> = {
      "@context": "https://schema.org",
      "@type": type,
      name: name || "[Name]",
      description: description || "[Description]",
      url: url || "[https://example.com]",
    };
    if (type === "Product") base.offers = { "@type": "Offer", price: extra || "0.00", priceCurrency: "USD" };
    if (type === "LocalBusiness") base.telephone = extra || "[Phone number]";
    if (type === "Article") base.author = { "@type": "Person", name: extra || "[Author name]" };
    if (type === "FAQPage") {
      base.mainEntity = extra
        .split("\n")
        .filter(Boolean)
        .map((line) => {
          const [q, a] = line.split("|").map((s) => s.trim());
          return {
            "@type": "Question",
            name: q || "[Question]",
            acceptedAnswer: { "@type": "Answer", text: a || "[Answer]" },
          };
        });
    }
    return JSON.stringify(base, null, 2);
  }, [type, name, description, url, extra]);

  const scriptTag = `<script type="application/ld+json">\n${schema}\n</script>`;

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <div className="flex flex-wrap gap-2">
        {TYPES.map((t) => (
          <Button key={t} type="button" size="sm" variant={type === t ? "default" : "outline"} onClick={() => setType(t)}>
            {t}
          </Button>
        ))}
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <div>
          <Label className="text-sm text-muted-foreground">Name / title</Label>
          <Input value={name} onChange={(e) => setName(e.target.value)} className="mt-1.5" />
        </div>
        <div>
          <Label className="text-sm text-muted-foreground">URL</Label>
          <Input value={url} onChange={(e) => setUrl(e.target.value)} placeholder="https://example.com/page" className="mt-1.5" />
        </div>
        <div className="sm:col-span-2">
          <Label className="text-sm text-muted-foreground">Description</Label>
          <Input value={description} onChange={(e) => setDescription(e.target.value)} className="mt-1.5" />
        </div>
        <div className="sm:col-span-2">
          <Label className="text-sm text-muted-foreground">
            {type === "Product" && "Price (USD)"}
            {type === "LocalBusiness" && "Phone number"}
            {type === "Article" && "Author name"}
            {type === "FAQPage" && "Questions (one per line, format: Question | Answer)"}
          </Label>
          {type === "FAQPage" ? (
            <Textarea
              value={extra}
              onChange={(e) => setExtra(e.target.value)}
              placeholder="Is this free? | Yes, completely free."
              rows={4}
              className="mt-1.5 resize-y"
            />
          ) : (
            <Input value={extra} onChange={(e) => setExtra(e.target.value)} className="mt-1.5" />
          )}
        </div>
      </div>

      <div className="mt-5 border-t pt-4">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium text-muted-foreground">JSON-LD script tag</p>
          <CopyButton value={scriptTag} />
        </div>
        <Textarea readOnly value={scriptTag} rows={12} className="mt-2 resize-y bg-muted/40 font-mono text-xs" />
      </div>
    </div>
  );
}

"use client";

import * as React from "react";
import Link from "next/link";
import { Search, ArrowRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ALL_TOOLS } from "@/lib/tools-data.generated";
import { TOOL_VARIANTS } from "@/lib/tool-variants";
import { cn } from "@/lib/utils";

interface ToolSearchProps {
  className?: string;
  size?: "default" | "lg";
  placeholder?: string;
}

// Shown whenever nothing scores a real match, so the dropdown never goes
// empty — a query like "img to pdf" with no literal tool-name hit should
// still surface something useful rather than a dead end.
const FALLBACK_SLUGS = [
  "pdf-merge",
  "image-compressor",
  "pdf-compress",
  "image-to-pdf",
  "qr-code-generator",
  "word-counter",
];

interface SearchResult {
  slug: string;
  name: string;
  categoryName: string;
  done: boolean;
  href: string;
}

const VARIANTS_BY_TOOL = new Map<string, typeof TOOL_VARIANTS>();
for (const variant of TOOL_VARIANTS) {
  const list = VARIANTS_BY_TOOL.get(variant.toolSlug);
  if (list) list.push(variant);
  else VARIANTS_BY_TOOL.set(variant.toolSlug, [variant]);
}

function scoreMatch(query: string, words: string[], tool: (typeof ALL_TOOLS)[number]) {
  const name = tool.name.toLowerCase();
  const category = tool.categoryName.toLowerCase();
  let score = 0;
  let bestVariant: (typeof TOOL_VARIANTS)[number] | undefined;

  if (name.includes(query)) score += 100;

  for (const variant of VARIANTS_BY_TOOL.get(tool.slug) ?? []) {
    const h1 = variant.h1.toLowerCase();
    if (h1.includes(query)) {
      score += 90;
      if (!bestVariant) bestVariant = variant;
    } else {
      const wordHits = words.filter((w) => h1.includes(w)).length;
      if (wordHits > 0) {
        score += wordHits * 4;
        if (!bestVariant && wordHits === words.length) bestVariant = variant;
      }
    }
  }

  for (const word of words) {
    if (name.includes(word)) score += 10;
    if (category.includes(word)) score += 3;
  }

  return { score, bestVariant };
}

export function ToolSearch({
  className,
  size = "default",
  placeholder = "Search 570+ tools... e.g. \"merge pdf\" or \"compress image\"",
}: ToolSearchProps) {
  const [query, setQuery] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const containerRef = React.useRef<HTMLDivElement>(null);

  const { results, isFallback } = React.useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return { results: [] as SearchResult[], isFallback: false };

    const words = q.split(/\s+/).filter(Boolean);
    const scored = ALL_TOOLS.map((tool) => ({ tool, ...scoreMatch(q, words, tool) }))
      .filter((r) => r.score > 0)
      .sort((a, b) => b.score - a.score || Number(b.tool.done) - Number(a.tool.done));

    if (scored.length > 0) {
      return {
        isFallback: false,
        results: scored.slice(0, 8).map(({ tool, bestVariant }) => ({
          slug: tool.slug,
          name: bestVariant?.h1 ?? tool.name,
          categoryName: tool.categoryName,
          done: tool.done,
          href: bestVariant ? `/${bestVariant.slug}` : `/tools/${tool.slug}`,
        })),
      };
    }

    // Nothing scored — always show something relevant instead of a dead end.
    const fallback = FALLBACK_SLUGS.map((slug) => ALL_TOOLS.find((t) => t.slug === slug))
      .filter((t): t is (typeof ALL_TOOLS)[number] => Boolean(t))
      .map((tool) => ({
        slug: tool.slug,
        name: tool.name,
        categoryName: tool.categoryName,
        done: tool.done,
        href: `/tools/${tool.slug}`,
      }));
    return { results: fallback, isFallback: true };
  }, [query]);

  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={containerRef} className={cn("relative w-full", className)}>
      <div className="relative">
        <Search className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          value={query}
          onChange={(event) => {
            setQuery(event.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          placeholder={placeholder}
          aria-label="Search tools"
          className={cn(
            "pl-11 pr-4 shadow-sm",
            size === "lg" && "h-14 rounded-2xl text-base"
          )}
        />
      </div>

      {open && query.trim().length > 0 && (
        <div className="absolute z-50 mt-2 w-full overflow-hidden rounded-xl border bg-popover shadow-lg">
          {isFallback && (
            <p className="border-b bg-muted/40 px-4 py-2 text-xs text-muted-foreground">
              No exact match for &ldquo;{query}&rdquo; — here are some popular tools
            </p>
          )}
          <ul data-lenis-prevent className="max-h-80 overflow-y-auto overscroll-contain py-1">
            {results.map((tool) => (
              <li key={tool.slug}>
                <Link
                  href={tool.href}
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-between gap-3 px-4 py-2.5 text-sm hover:bg-accent hover:text-accent-foreground"
                >
                  <span className="flex flex-col">
                    <span className="font-medium">{tool.name}</span>
                    <span className="text-xs text-muted-foreground">
                      {tool.categoryName}
                    </span>
                  </span>
                  {!tool.done && (
                    <Badge variant="secondary" className="shrink-0 text-[10px]">
                      Coming soon
                    </Badge>
                  )}
                </Link>
              </li>
            ))}
          </ul>
          <Link
            href={`/search?q=${encodeURIComponent(query)}`}
            onClick={() => setOpen(false)}
            className="flex items-center justify-center gap-1.5 border-t bg-muted/40 px-4 py-2.5 text-xs font-medium text-muted-foreground hover:text-foreground"
          >
            See all results <ArrowRight className="size-3.5" />
          </Link>
        </div>
      )}
    </div>
  );
}

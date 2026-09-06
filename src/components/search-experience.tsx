"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Search, X, LayoutGrid } from "lucide-react";
import { ToolCard } from "@/components/tool-card";
import { getCategoryAccent, getCategoryIcon } from "@/lib/category-icons";
import { ALL_TOOLS, TOOL_CATEGORIES, TOTAL_TOOLS, TOTAL_TOOLS_DONE } from "@/lib/tools-data.generated";
import { highlightMatch } from "@/lib/highlight-match";

type StatusFilter = "all" | "available" | "soon";

const POPULAR_CATEGORY_SLUGS = [...TOOL_CATEGORIES]
  .sort((a, b) => b.tools.length - a.tools.length)
  .slice(0, 8)
  .map((c) => c.slug);

export function SearchExperience({ initialQuery }: { initialQuery: string }) {
  const router = useRouter();
  const [query, setQuery] = React.useState(initialQuery);
  const [status, setStatus] = React.useState<StatusFilter>("all");
  const [category, setCategory] = React.useState<string>("all");
  const inputRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      const url = query.trim() ? `/search?q=${encodeURIComponent(query.trim())}` : "/search";
      router.replace(url, { scroll: false });
    }, 200);
    return () => clearTimeout(timer);
  }, [query, router]);

  React.useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "/" && document.activeElement !== inputRef.current) {
        e.preventDefault();
        inputRef.current?.focus();
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const trimmed = query.trim().toLowerCase();

  const matches = React.useMemo(() => {
    if (!trimmed) return [];
    return ALL_TOOLS.filter((tool) => tool.name.toLowerCase().includes(trimmed)).sort(
      (a, b) => Number(b.done) - Number(a.done)
    );
  }, [trimmed]);

  const categoryOptions = React.useMemo(() => {
    const counts = new Map<string, { name: string; count: number }>();
    for (const tool of matches) {
      const entry = counts.get(tool.categorySlug);
      if (entry) entry.count++;
      else counts.set(tool.categorySlug, { name: tool.categoryName, count: 1 });
    }
    return Array.from(counts.entries())
      .map(([slug, v]) => ({ slug, ...v }))
      .sort((a, b) => b.count - a.count);
  }, [matches]);

  const effectiveCategory = categoryOptions.some((c) => c.slug === category) ? category : "all";

  const results = React.useMemo(() => {
    return matches.filter((tool) => {
      if (effectiveCategory !== "all" && tool.categorySlug !== effectiveCategory) return false;
      if (status === "available" && !tool.done) return false;
      if (status === "soon" && tool.done) return false;
      return true;
    });
  }, [matches, effectiveCategory, status]);

  const availableCount = matches.filter((t) => t.done).length;
  const soonCount = matches.length - availableCount;

  return (
    <>
      <section className="mx-auto max-w-3xl px-4 pb-6 pt-10 sm:px-6 lg:px-8">
        <div className="relative">
          <Search className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-muted-foreground" />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={`Search ${TOTAL_TOOLS}+ tools... e.g. "merge pdf" or "compress image"`}
            aria-label="Search tools"
            autoFocus
            className="h-14 w-full rounded-2xl border bg-background pl-12 pr-11 text-base shadow-sm outline-none ring-brand/30 transition-shadow focus:ring-4"
          />
          {query && (
            <button
              type="button"
              onClick={() => {
                setQuery("");
                inputRef.current?.focus();
              }}
              aria-label="Clear search"
              className="absolute right-4 top-1/2 flex size-6 -translate-y-1/2 items-center justify-center rounded-full text-muted-foreground hover:bg-muted hover:text-foreground"
            >
              <X className="size-4" />
            </button>
          )}
        </div>
        {!query && (
          <p className="mt-2 text-center text-xs text-muted-foreground">
            Tip: press <kbd className="rounded border bg-muted px-1 py-0.5 font-mono">/</kbd> anywhere to jump here
          </p>
        )}
      </section>

      {trimmed ? (
        <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
          <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
            <p className="text-sm text-muted-foreground">
              <span className="font-medium text-foreground">{results.length}</span> of{" "}
              {matches.length} result{matches.length === 1 ? "" : "s"} for &ldquo;{query}&rdquo;
            </p>
            <div className="flex overflow-hidden rounded-lg border text-xs font-medium">
              {(
                [
                  ["all", `All (${matches.length})`],
                  ["available", `Available (${availableCount})`],
                  ["soon", `Coming soon (${soonCount})`],
                ] as [StatusFilter, string][]
              ).map(([value, label]) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => setStatus(value)}
                  className={`px-3 py-1.5 transition-colors ${
                    status === value
                      ? "bg-foreground text-background"
                      : "bg-background text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          {categoryOptions.length > 1 && (
            <div className="mb-6 flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => setCategory("all")}
                className={`rounded-full border px-3 py-1.5 text-xs font-medium transition-colors ${
                  effectiveCategory === "all"
                    ? "border-brand bg-brand-soft text-brand"
                    : "hover:border-brand/50"
                }`}
              >
                All categories
              </button>
              {categoryOptions.map((c) => (
                <button
                  key={c.slug}
                  type="button"
                  onClick={() => setCategory(c.slug)}
                  className={`rounded-full border px-3 py-1.5 text-xs font-medium transition-colors ${
                    effectiveCategory === c.slug
                      ? "border-brand bg-brand-soft text-brand"
                      : "hover:border-brand/50"
                  }`}
                >
                  {c.name} <span className="opacity-60">({c.count})</span>
                </button>
              ))}
            </div>
          )}

          {results.length === 0 ? (
            <div className="flex flex-col items-center gap-3 rounded-2xl border border-dashed py-16 text-center">
              <p className="text-muted-foreground">
                {matches.length === 0
                  ? <>No tools matched &ldquo;{query}&rdquo;.</>
                  : "No tools match the selected filters."}
              </p>
              <div className="flex gap-3 text-sm">
                {matches.length > 0 && (
                  <button
                    type="button"
                    onClick={() => {
                      setStatus("all");
                      setCategory("all");
                    }}
                    className="text-brand hover:underline"
                  >
                    Clear filters
                  </button>
                )}
                <Link href="/categories" className="text-brand hover:underline">
                  Browse all categories
                </Link>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {results.map((tool) => (
                <ToolCard
                  key={tool.slug}
                  slug={tool.slug}
                  name={highlightMatch(tool.name, query.trim())}
                  categoryName={tool.categoryName}
                  categorySlug={tool.categorySlug}
                  done={tool.done}
                />
              ))}
            </div>
          )}
        </section>
      ) : (
        <section className="mx-auto max-w-5xl px-4 pb-20 sm:px-6 lg:px-8">
          <p className="mb-4 flex items-center gap-2 text-sm font-medium text-muted-foreground">
            <LayoutGrid className="size-4" /> Or jump straight into a popular category
          </p>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {POPULAR_CATEGORY_SLUGS.map((slug) => {
              const cat = TOOL_CATEGORIES.find((c) => c.slug === slug)!;
              const Icon = getCategoryIcon(slug);
              const accent = getCategoryAccent(slug);
              return (
                <Link
                  key={slug}
                  href={`/${slug}`}
                  className="group flex flex-col gap-2 rounded-xl border bg-card p-4 transition-all hover:-translate-y-0.5 hover:border-transparent hover:shadow-lg hover:shadow-black/5"
                >
                  <span className={`flex size-9 items-center justify-center rounded-lg transition-transform duration-300 group-hover:scale-110 ${accent}`}>
                    <Icon className="size-4" />
                  </span>
                  <span>
                    <span className="block text-sm font-medium">{cat.name}</span>
                    <span className="block text-xs text-muted-foreground">{cat.tools.length} tools</span>
                  </span>
                </Link>
              );
            })}
          </div>
          <p className="mt-8 text-center text-xs text-muted-foreground">
            {TOTAL_TOOLS_DONE} of {TOTAL_TOOLS}+ tools are live right now — start typing above to search all of them.
          </p>
        </section>
      )}
    </>
  );
}

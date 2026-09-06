"use client";

import * as React from "react";
import { Search, X } from "lucide-react";
import { ToolCard } from "@/components/tool-card";
import { highlightMatch } from "@/lib/highlight-match";

type StatusFilter = "all" | "available" | "soon";

interface CategoryTool {
  name: string;
  slug: string;
  done: boolean;
}

export function CategoryToolGrid({
  tools,
  categorySlug,
  categoryName,
}: {
  tools: CategoryTool[];
  categorySlug: string;
  categoryName: string;
}) {
  const [query, setQuery] = React.useState("");
  const [status, setStatus] = React.useState<StatusFilter>("all");
  const trimmed = query.trim().toLowerCase();

  const soonCount = tools.filter((t) => !t.done).length;

  const matches = React.useMemo(() => {
    if (!trimmed) return tools;
    return tools.filter((tool) => tool.name.toLowerCase().includes(trimmed));
  }, [tools, trimmed]);

  const filtered = React.useMemo(() => {
    return matches.filter((tool) => {
      if (status === "available") return tool.done;
      if (status === "soon") return !tool.done;
      return true;
    });
  }, [matches, status]);

  const showSearch = tools.length > 6;
  const showStatusToggle = soonCount > 0;

  return (
    <div>
      {(showSearch || showStatusToggle) && (
        <div className="mb-6 flex flex-wrap items-center gap-3">
          {showSearch && (
            <div className="relative max-w-md flex-1">
              <Search className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={`Search ${tools.length} tools in ${categoryName}...`}
                aria-label={`Search tools in ${categoryName}`}
                className="h-11 w-full rounded-xl border bg-background pl-10 pr-9 text-sm shadow-sm outline-none ring-brand/30 transition-shadow focus:ring-4"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery("")}
                  aria-label="Clear search"
                  className="absolute right-3 top-1/2 flex size-5 -translate-y-1/2 items-center justify-center rounded-full text-muted-foreground hover:bg-muted hover:text-foreground"
                >
                  <X className="size-3.5" />
                </button>
              )}
            </div>
          )}
          {showStatusToggle && (
            <div className="flex overflow-hidden rounded-lg border text-xs font-medium">
              {(
                [
                  ["all", `All (${matches.length})`],
                  ["available", `Available (${matches.filter((t) => t.done).length})`],
                  ["soon", `Coming soon (${matches.filter((t) => !t.done).length})`],
                ] as [StatusFilter, string][]
              ).map(([value, label]) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => setStatus(value)}
                  className={`px-3 py-2 transition-colors ${
                    status === value
                      ? "bg-foreground text-background"
                      : "bg-background text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {trimmed && (
        <p className="mb-4 -mt-2 text-xs text-muted-foreground">
          {filtered.length} of {tools.length} tools match &ldquo;{query}&rdquo;
        </p>
      )}

      {filtered.length === 0 ? (
        <div className="flex flex-col items-center gap-2 rounded-2xl border border-dashed py-14 text-center">
          <p className="text-muted-foreground">
            {trimmed
              ? <>No tools in {categoryName} match &ldquo;{query}&rdquo;.</>
              : "No tools match the selected filter."}
          </p>
          <button
            type="button"
            onClick={() => {
              setQuery("");
              setStatus("all");
            }}
            className="text-sm text-brand hover:underline"
          >
            Clear filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {filtered.map((tool) => (
            <ToolCard
              key={tool.slug}
              slug={tool.slug}
              name={highlightMatch(tool.name, query.trim())}
              categorySlug={categorySlug}
              done={tool.done}
            />
          ))}
        </div>
      )}
    </div>
  );
}

"use client";

import * as React from "react";
import Link from "next/link";
import { History } from "lucide-react";
import { ALL_TOOLS } from "@/lib/tools-data.generated";
import { getCategoryIcon } from "@/lib/category-icons";
import { getRecentToolSlugs } from "@/lib/recent-tools";

export function RecentlyUsed() {
  const [slugs, setSlugs] = React.useState<string[]>([]);

  React.useEffect(() => {
    setSlugs(getRecentToolSlugs());
  }, []);

  const tools = slugs
    .map((slug) => ALL_TOOLS.find((tool) => tool.slug === slug))
    .filter((tool): tool is NonNullable<typeof tool> => Boolean(tool));

  if (tools.length === 0) return null;

  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="flex items-center gap-2">
        <History className="size-5 text-muted-foreground" />
        <h2 className="text-xl font-semibold tracking-tight">
          Recently used
        </h2>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {tools.map((tool) => {
          const Icon = getCategoryIcon(tool.categorySlug);
          return (
            <Link
              key={tool.slug}
              href={`/tools/${tool.slug}`}
              className="flex items-center gap-3 rounded-xl border bg-card p-4 hover:bg-accent"
            >
              <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-brand-soft text-brand">
                <Icon className="size-4" />
              </span>
              <span className="truncate text-sm font-medium">{tool.name}</span>
            </Link>
          );
        })}
      </div>
    </section>
  );
}

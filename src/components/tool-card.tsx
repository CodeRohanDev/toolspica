import { createElement, type ReactNode } from "react";
import Link from "next/link";
import { ArrowUpRight, Clock } from "lucide-react";
import {
  getCategoryAccent,
  getCategoryBorderGlow,
  getCategoryGlow,
  getCategoryIcon,
} from "@/lib/category-icons";

interface ToolCardProps {
  slug: string;
  name: ReactNode;
  categoryName?: string;
  categorySlug: string;
  done: boolean;
}

export function ToolCard({ slug, name, categoryName, categorySlug, done }: ToolCardProps) {
  const accent = getCategoryAccent(categorySlug);
  const borderGlow = getCategoryBorderGlow(categorySlug);
  const glow = getCategoryGlow(categorySlug);

  return (
    <Link
      href={`/tools/${slug}`}
      className={`group relative flex h-full flex-col gap-4 overflow-hidden rounded-2xl border bg-card p-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${borderGlow} ${
        done ? "" : "opacity-70 hover:opacity-100"
      }`}
    >
      <span
        aria-hidden
        className={`pointer-events-none absolute -right-8 -top-8 size-28 rounded-full opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-20 ${glow}`}
      />

      {!done && (
        <span className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-full bg-muted px-2 py-0.5 text-[10px] font-medium text-muted-foreground">
          <Clock className="size-2.5" />
          Soon
        </span>
      )}

      <span
        className={`flex size-12 shrink-0 items-center justify-center rounded-2xl shadow-sm ring-1 ring-inset ring-black/5 transition-transform duration-300 ease-out group-hover:-rotate-6 group-hover:scale-110 ${accent}`}
      >
        {createElement(getCategoryIcon(categorySlug), { className: "size-6" })}
      </span>

      <span className="flex min-w-0 flex-1 flex-col justify-end">
        <span className="block text-sm font-semibold leading-snug line-clamp-2">
          {name}
        </span>
        {categoryName && (
          <span className="mt-1 block truncate text-xs text-muted-foreground">
            {categoryName}
          </span>
        )}
      </span>

      <span className="absolute bottom-4 right-4 flex size-7 items-center justify-center rounded-full bg-foreground text-background opacity-0 shadow-md transition-all duration-200 translate-y-1 group-hover:translate-y-0 group-hover:opacity-100">
        <ArrowUpRight className="size-4" />
      </span>
    </Link>
  );
}

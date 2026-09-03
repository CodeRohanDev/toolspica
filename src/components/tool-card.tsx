import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { getCategoryAccent, getCategoryIcon } from "@/lib/category-icons";

interface ToolCardProps {
  slug: string;
  name: string;
  categoryName?: string;
  categorySlug: string;
  done: boolean;
}

export function ToolCard({ slug, name, categoryName, categorySlug, done }: ToolCardProps) {
  const Icon = getCategoryIcon(categorySlug);
  const accent = getCategoryAccent(categorySlug);

  return (
    <Link
      href={`/tools/${slug}`}
      className="group flex items-center gap-3 rounded-xl border bg-card p-3 transition-all hover:-translate-y-0.5 hover:border-transparent hover:shadow-lg hover:shadow-black/5 sm:p-4"
    >
      <span
        className={`flex size-9 shrink-0 items-center justify-center rounded-lg transition-transform duration-300 group-hover:scale-110 ${accent}`}
      >
        <Icon className="size-4" />
      </span>
      <span className="min-w-0 flex-1">
        <span className="flex items-center gap-1.5">
          <span className="min-w-0 truncate text-sm font-medium">{name}</span>
          {!done && (
            <Badge
              variant="secondary"
              className="shrink-0 px-1.5 py-0 text-[9px] leading-4"
            >
              Soon
            </Badge>
          )}
        </span>
        {categoryName && (
          <span className="block truncate text-xs text-muted-foreground">
            {categoryName}
          </span>
        )}
      </span>
    </Link>
  );
}

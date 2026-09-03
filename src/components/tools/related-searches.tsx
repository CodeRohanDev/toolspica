import Link from "next/link";
import { Search } from "lucide-react";

interface RelatedSearchItem {
  label: string;
  href: string;
}

export function RelatedSearches({ items }: { items: RelatedSearchItem[] }) {
  if (items.length === 0) return null;

  return (
    <section className="border-t bg-muted/30">
      <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
        <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
          People also search for
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="inline-flex items-center gap-1.5 rounded-full border bg-background px-3 py-1.5 text-sm text-foreground/80 transition-colors hover:border-brand/40 hover:text-brand"
            >
              <Search className="size-3 text-muted-foreground" />
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

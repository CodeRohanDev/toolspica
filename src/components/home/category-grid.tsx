import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { TOOL_CATEGORIES } from "@/lib/tools-data.generated";
import { getCategoryAccent, getCategoryIcon } from "@/lib/category-icons";

export function CategoryGrid() {
  return (
    <section className="border-y bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            Browse by category
          </h2>
          <p className="mx-auto mt-2 max-w-xl text-muted-foreground">
            {TOOL_CATEGORIES.length} categories, covering everything from PDF
            editing to AI writing assistants.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {TOOL_CATEGORIES.map((category) => {
            const Icon = getCategoryIcon(category.slug);
            const accent = getCategoryAccent(category.slug);
            return (
              <Link
                key={category.slug}
                href={`/${category.slug}`}
                className="group relative flex flex-col gap-3 overflow-hidden rounded-2xl border bg-card p-5 transition-all hover:-translate-y-1 hover:border-transparent hover:shadow-lg hover:shadow-black/5"
              >
                <span
                  className={`flex size-11 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110 ${accent}`}
                >
                  <Icon className="size-5" />
                </span>
                <span>
                  <span className="block text-sm font-semibold">
                    {category.name}
                  </span>
                  <span className="mt-0.5 block text-xs text-muted-foreground">
                    {category.tools.length} tools
                  </span>
                </span>
                <ArrowRight className="absolute right-4 top-5 size-4 text-muted-foreground opacity-0 transition-all -translate-x-1 group-hover:translate-x-0 group-hover:opacity-100" />
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ALL_TOOLS } from "@/lib/tools-data.generated";
import { ToolCard } from "@/components/tool-card";

const POPULAR_SLUGS = [
  "pdf-merge",
  "image-compressor",
  "remove-background",
  "word-counter",
  "json-formatter",
  "video-compressor",
  "age-calculator",
  "currency-converter",
  "length-converter",
  "password-generator",
  "color-picker",
  "qr-code-generator",
];

export function PopularTools() {
  const tools = POPULAR_SLUGS.map((slug) =>
    ALL_TOOLS.find((tool) => tool.slug === slug)
  ).filter((tool): tool is NonNullable<typeof tool> => Boolean(tool));

  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="flex items-end justify-between gap-4">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            Popular tools
          </h2>
          <p className="mt-2 text-muted-foreground">
            The tools people reach for most, ready in one click.
          </p>
        </div>
        <Link
          href="/categories"
          className="hidden shrink-0 items-center gap-1 text-sm font-medium text-brand hover:underline sm:inline-flex"
        >
          View all tools <ArrowRight className="size-4" />
        </Link>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {tools.map((tool) => (
          <ToolCard
            key={tool.slug}
            slug={tool.slug}
            name={tool.name}
            categoryName={tool.categoryName}
            categorySlug={tool.categorySlug}
            done={tool.done}
          />
        ))}
      </div>
    </section>
  );
}

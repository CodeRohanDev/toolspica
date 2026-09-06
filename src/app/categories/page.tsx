import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/page-header";
import { getCategoryAccent, getCategoryIcon } from "@/lib/category-icons";
import { TOOL_CATEGORIES, TOTAL_TOOLS } from "@/lib/tools-data.generated";
import { JsonLd, breadcrumbJsonLd, collectionPageJsonLd, pageMetadata } from "@/lib/seo";

const description = `Browse all ${TOOL_CATEGORIES.length} tool categories on Toolspica — ${TOTAL_TOOLS}+ free, browser-based tools for PDF, image, video, developer, SEO, and AI workflows.`;

export const metadata: Metadata = pageMetadata({
  title: "All Categories",
  description,
  path: "/categories",
});

export default function CategoriesPage() {
  return (
    <>
      <PageHeader
        eyebrow={`${TOOL_CATEGORIES.length} categories`}
        title="Every category, in one place"
        description={`${TOTAL_TOOLS}+ free tools, organized so you can find exactly what you need in a couple of clicks.`}
      />

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {TOOL_CATEGORIES.map((category) => {
            const Icon = getCategoryIcon(category.slug);
            const accent = getCategoryAccent(category.slug);
            return (
              <Link
                key={category.slug}
                href={`/${category.slug}`}
                className="group flex flex-col gap-3 rounded-2xl border bg-card p-5 transition-all hover:-translate-y-1 hover:border-transparent hover:shadow-lg hover:shadow-black/5"
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
              </Link>
            );
          })}
        </div>
      </section>

      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Categories", path: "/categories" },
        ])}
      />
      <JsonLd
        data={collectionPageJsonLd({
          name: "All Categories",
          description,
          path: "/categories",
          itemNames: TOOL_CATEGORIES.map((c) => c.name),
          itemPaths: TOOL_CATEGORIES.map((c) => `/${c.slug}`),
        })}
      />
    </>
  );
}

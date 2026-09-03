import type { Metadata } from "next";
import Link from "next/link";
import { ToolSearch } from "@/components/tool-search";
import { PageHeader } from "@/components/page-header";
import { ToolCard } from "@/components/tool-card";
import { ALL_TOOLS } from "@/lib/tools-data.generated";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Search Tools",
  description: "Search 570+ free browser-based tools on Toolspica.",
  path: "/search",
  noIndex: true,
});

export default async function SearchPage(props: PageProps<"/search">) {
  const searchParams = await props.searchParams;
  const query =
    typeof searchParams.q === "string" ? searchParams.q.trim() : "";

  const results = query
    ? ALL_TOOLS.filter((tool) =>
        tool.name.toLowerCase().includes(query.toLowerCase())
      ).sort((a, b) => Number(b.done) - Number(a.done))
    : [];

  return (
    <>
      <PageHeader
        eyebrow="Search"
        title={query ? `Results for "${query}"` : "Search all tools"}
        description={
          query
            ? `${results.length} tool${results.length === 1 ? "" : "s"} found.`
            : "Search across 570+ tools by name."
        }
      />

      <section className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
        <ToolSearch size="lg" />
      </section>

      {query && (
        <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
          {results.length === 0 ? (
            <p className="text-center text-muted-foreground">
              No tools matched &ldquo;{query}&rdquo;. Try a different search
              term, or{" "}
              <Link href="/categories" className="text-brand hover:underline">
                browse all categories
              </Link>
              .
            </p>
          ) : (
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {results.map((tool) => (
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
          )}
        </section>
      )}
    </>
  );
}

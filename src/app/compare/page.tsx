import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { COMPARE_PAGES } from "@/lib/compare-content";
import { JsonLd, breadcrumbJsonLd, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Compare Toolspica",
  description: "Honest, feature-by-feature comparisons of Toolspica against other free online tool sites.",
  path: "/compare",
});

export default function CompareIndexPage() {
  return (
    <>
      <PageHeader
        eyebrow="Compare"
        title="How Toolspica compares"
        description="Feature-by-feature comparisons against other free online tool sites — price, privacy, limits, and ads."
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Compare" }]}
      />

      <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-3">
          {COMPARE_PAGES.map((page) => (
            <Link
              key={page.slug}
              href={`/compare/${page.slug}`}
              className="group flex items-center justify-between gap-3 rounded-xl border bg-card p-5 transition-all hover:-translate-y-0.5 hover:shadow-lg"
            >
              <span>
                <span className="block text-sm font-semibold">{page.h1}</span>
                <span className="block text-sm text-muted-foreground">{page.metaDescription}</span>
              </span>
              <ArrowRight className="size-5 shrink-0 text-muted-foreground transition-colors group-hover:text-brand" />
            </Link>
          ))}
        </div>
      </section>

      <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Compare", path: "/compare" }])} />
    </>
  );
}

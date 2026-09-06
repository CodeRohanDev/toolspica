import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Check, ArrowRight } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { FaqSection } from "@/components/faq-section";
import { COMPARE_PAGES, getComparePage } from "@/lib/compare-content";
import { JsonLd, breadcrumbJsonLd, faqJsonLd, pageMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return COMPARE_PAGES.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata(props: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await props.params;
  const page = getComparePage(slug);
  if (!page) return {};

  return pageMetadata({
    title: page.metaTitle,
    description: page.metaDescription,
    path: `/compare/${slug}`,
    eyebrow: "Comparison",
  });
}

export default async function ComparePage(props: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await props.params;
  const page = getComparePage(slug);
  if (!page) notFound();

  return (
    <>
      <PageHeader
        eyebrow="Comparison"
        title={page.h1}
        description={`An honest, feature-by-feature look at Toolspica vs ${page.competitorName}.`}
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "Compare", href: "/compare" },
          { label: page.h1 },
        ]}
      />

      <section className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="prose prose-neutral max-w-none">
          {page.intro.map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </div>

        <div className="mt-10 overflow-x-auto rounded-xl border">
          <table className="w-full min-w-[560px] border-collapse text-sm">
            <thead>
              <tr className="border-b bg-muted/40">
                <th className="p-3 text-left font-medium">Feature</th>
                <th className="p-3 text-left font-medium text-brand">Toolspica</th>
                <th className="p-3 text-left font-medium text-muted-foreground">{page.competitorName}</th>
              </tr>
            </thead>
            <tbody>
              {page.rows.map((row, i) => (
                <tr key={i} className="border-b last:border-b-0">
                  <td className="p-3 font-medium">{row.feature}</td>
                  <td className="p-3">
                    <span className="flex items-start gap-1.5">
                      <Check className="mt-0.5 size-4 shrink-0 text-emerald-600" />
                      {row.toolspica}
                    </span>
                  </td>
                  <td className="p-3 text-muted-foreground">{row.competitor}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <Link
          href="/categories"
          className="mt-8 flex items-center justify-between gap-3 rounded-xl border bg-card p-5 transition-colors hover:border-brand/40"
        >
          <span>
            <span className="block text-sm font-semibold">Browse all Toolspica tools</span>
            <span className="block text-sm text-muted-foreground">Free, runs in your browser — no sign-up.</span>
          </span>
          <ArrowRight className="size-5 shrink-0 text-brand" />
        </Link>
      </section>

      <div className="border-t bg-muted/30">
        <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
          <FaqSection faqs={page.faqs} />
        </div>
      </div>

      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Compare", path: "/compare" },
          { name: page.h1, path: `/compare/${slug}` },
        ])}
      />
      <JsonLd data={faqJsonLd(page.faqs)} />
    </>
  );
}

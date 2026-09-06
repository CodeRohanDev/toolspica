import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight, Clock3 } from "lucide-react";
import { FaqSection } from "@/components/faq-section";
import { ToolPageHeader } from "@/components/tools/tool-page-header";
import { ToolContentSections } from "@/components/tools/tool-content-sections";
import { SeoIntroHero } from "@/components/tools/seo-intro-hero";
import { ToolFeaturesAndAudience } from "@/components/tools/tool-features-audience";
import { RelatedSearches } from "@/components/tools/related-searches";
import { Badge } from "@/components/ui/badge";
import { getCategoryAccent, getCategoryIcon } from "@/lib/category-icons";
import { ALL_TOOLS } from "@/lib/tools-data.generated";
import { getRegisteredTool } from "@/lib/tools-registry";
import { getHeroSubtitle } from "@/lib/hero-subtitle";
import { getToolFeatures } from "@/lib/tool-features";
import { getCategoryAudience } from "@/lib/category-audience";
import { getVariantsForTool } from "@/lib/tool-variants";
import { getToolContentLastModified } from "@/lib/content-freshness";
import {
  JsonLd,
  breadcrumbJsonLd,
  faqJsonLd,
  howToJsonLd,
  pageMetadata,
  softwareApplicationJsonLd,
} from "@/lib/seo";

export function generateStaticParams() {
  return ALL_TOOLS.map((tool) => ({ slug: tool.slug }));
}

function findTool(slug: string) {
  return ALL_TOOLS.find((tool) => tool.slug === slug);
}

export async function generateMetadata(
  props: PageProps<"/tools/[slug]">
): Promise<Metadata> {
  const { slug } = await props.params;
  const tool = findTool(slug);
  if (!tool) return {};

  const registered = getRegisteredTool(slug);
  const description = registered
    ? registered.content.overview[0]
    : `${tool.name} — free, browser-based ${tool.categoryName.toLowerCase()} tool on Toolspica. Coming soon.`;

  return pageMetadata({
    title: `Free Online ${tool.name}`,
    description,
    path: `/tools/${tool.slug}`,
    eyebrow: tool.categoryName,
    noIndex: !tool.done,
  });
}

export default async function ToolPage(props: PageProps<"/tools/[slug]">) {
  const { slug } = await props.params;
  const tool = findTool(slug);
  if (!tool) notFound();

  const registered = getRegisteredTool(slug);
  const Icon = getCategoryIcon(tool.categorySlug);
  const accent = getCategoryAccent(tool.categorySlug);
  const relatedTools = ALL_TOOLS.filter(
    (t) => t.categorySlug === tool.categorySlug && t.slug !== tool.slug
  ).slice(0, 6);

  const otherToolsSection = relatedTools.length > 0 && (
    <div className="border-t">
      <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 lg:px-8">
        <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
          Other tools in {tool.categoryName}
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
          {relatedTools.map((related) => (
            <Link
              key={related.slug}
              href={`/tools/${related.slug}`}
              className="inline-flex items-center gap-1 rounded-full border bg-background px-3 py-1.5 text-sm text-foreground/80 transition-colors hover:border-foreground/30 hover:text-foreground"
            >
              {related.name}
              <ArrowUpRight className="size-3 text-muted-foreground" />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );

  if (!registered) {
    return (
      <>
        <ToolPageHeader
          categoryName={tool.categoryName}
          categorySlug={tool.categorySlug}
          breadcrumbLabel={tool.name}
          h1={`Free Online ${tool.name}`}
          subtitle="This tool is coming soon. In the meantime, explore other tools below."
          icon={Icon}
          accentClass={accent}
        />

        <section className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="flex flex-col items-start gap-3 rounded-xl border border-dashed bg-muted/30 p-6">
            <Badge variant="secondary" className="gap-1.5">
              <Clock3 className="size-3.5" />
              Coming soon
            </Badge>
            <p className="text-sm text-muted-foreground">
              We&apos;re building {tool.name} right now. It will run{" "}
              {tool.tier <= 4
                ? "entirely in your browser"
                : "with privacy-first processing"}{" "}
              — no sign-up, no cost, and no files kept.
            </p>
          </div>
        </section>

        {otherToolsSection}

        <div className="border-t">
          <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
            <FaqSection
              faqs={[
                {
                  question: `Is ${tool.name} free to use?`,
                  answer: `Yes — ${tool.name} is completely free, with no sign-up required.`,
                },
                {
                  question: "Will my file be uploaded anywhere?",
                  answer:
                    "Wherever technically possible, Toolspica processes files entirely in your browser, so nothing is uploaded. If this specific tool requires temporary cloud processing, that will be clearly labeled here once the tool is live, along with our automatic deletion guarantees.",
                },
                {
                  question: "When will this tool be available?",
                  answer:
                    "We're actively building out the Toolspica catalog. Check back soon, or explore other tools above in the meantime.",
                },
              ]}
              title="Frequently asked questions"
            />
          </div>
        </div>

        <JsonLd
          data={breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: tool.categoryName, path: `/${tool.categorySlug}` },
            { name: tool.name, path: `/tools/${tool.slug}` },
          ])}
        />
      </>
    );
  }

  const heroSubtitle = getHeroSubtitle(
    registered.content.heroSubtitle,
    registered.content.overview
  );
  const features = getToolFeatures(tool.tier);
  const audience = getCategoryAudience(tool.categorySlug);

  const dateModified = getToolContentLastModified(tool.slug);
  const variants = getVariantsForTool(tool.slug);
  const relatedSearchItems = [
    ...variants.map((v) => ({ label: v.h1, href: `/${v.slug}` })),
    ...relatedTools
      .slice(0, Math.max(0, 5 - variants.length))
      .map((r) => ({ label: `${r.name} tool`, href: `/tools/${r.slug}` })),
  ];

  return (
    <>
      <ToolPageHeader
        categoryName={tool.categoryName}
        categorySlug={tool.categorySlug}
        breadcrumbLabel={tool.name}
        h1={`Free Online ${tool.name}`}
        subtitle={heroSubtitle}
        icon={Icon}
        accentClass={accent}
      />

      <SeoIntroHero
        toolName={tool.name}
        introParagraph={registered.content.overview[0]}
        usesCloud={tool.tier > 4}
      />

      <section className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        <registered.Component />
      </section>

      {otherToolsSection}

      <ToolFeaturesAndAudience features={features} audience={audience} />

      <RelatedSearches items={relatedSearchItems} />

      <ToolContentSections toolName={tool.name} content={registered.content} />

      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: tool.categoryName, path: `/${tool.categorySlug}` },
          { name: tool.name, path: `/tools/${tool.slug}` },
        ])}
      />
      <JsonLd
        data={softwareApplicationJsonLd({
          name: tool.name,
          description: registered.content.overview[0],
          path: `/tools/${tool.slug}`,
          categoryName: tool.categoryName,
          dateModified,
        })}
      />
      <JsonLd data={faqJsonLd(registered.content.faqs, dateModified)} />
      <JsonLd
        data={howToJsonLd({
          name: tool.name,
          description: registered.content.overview[0],
          steps: registered.content.howItWorks,
        })}
      />
    </>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { FaqSection } from "@/components/faq-section";
import { ToolCard } from "@/components/tool-card";
import { ToolPageHeader } from "@/components/tools/tool-page-header";
import { SeoIntroHero } from "@/components/tools/seo-intro-hero";
import { ToolFeaturesAndAudience } from "@/components/tools/tool-features-audience";
import { RelatedSearches } from "@/components/tools/related-searches";
import { ToolContentSections } from "@/components/tools/tool-content-sections";
import { getCategoryAccent, getCategoryIcon } from "@/lib/category-icons";
import { ALL_TOOLS, TOOL_CATEGORIES } from "@/lib/tools-data.generated";
import { getRegisteredTool } from "@/lib/tools-registry";
import { TOOL_VARIANTS, findToolVariant, getVariantsForTool } from "@/lib/tool-variants";
import { getHeroSubtitle } from "@/lib/hero-subtitle";
import { getToolFeatures } from "@/lib/tool-features";
import { getCategoryAudience } from "@/lib/category-audience";
import {
  buildCategoryFaqs,
  buildCategoryIntro,
  buildCategorySeoParagraphs,
  getRelatedCategories,
} from "@/lib/category-content";
import {
  JsonLd,
  breadcrumbJsonLd,
  collectionPageJsonLd,
  faqJsonLd,
  howToJsonLd,
  pageMetadata,
  softwareApplicationJsonLd,
} from "@/lib/seo";

export function generateStaticParams() {
  const categoryParams = TOOL_CATEGORIES.map((category) => ({
    category: category.slug,
  }));
  const variantParams = TOOL_VARIANTS.map((variant) => ({
    category: variant.slug,
  }));
  return [...categoryParams, ...variantParams];
}

function findCategory(slug: string) {
  return TOOL_CATEGORIES.find((category) => category.slug === slug);
}

export async function generateMetadata(
  props: PageProps<"/[category]">
): Promise<Metadata> {
  const { category: slug } = await props.params;

  const category = findCategory(slug);
  if (category) {
    const intro = buildCategoryIntro(category);
    return pageMetadata({
      title: category.name,
      description: intro,
      path: `/${category.slug}`,
      eyebrow: `${category.tools.length} free tools`,
    });
  }

  const variant = findToolVariant(slug);
  if (variant) {
    return pageMetadata({
      title: variant.metaTitle,
      description: variant.metaDescription,
      path: `/${variant.slug}`,
      eyebrow: variant.h1,
    });
  }

  return {};
}

export default async function CategoryOrVariantPage(
  props: PageProps<"/[category]">
) {
  const { category: slug } = await props.params;

  const category = findCategory(slug);
  if (category) {
    return <CategoryPage category={category} />;
  }

  const variant = findToolVariant(slug);
  if (variant) {
    return <VariantLandingPage variantSlug={slug} />;
  }

  notFound();
}

function CategoryPage({
  category,
}: {
  category: (typeof TOOL_CATEGORIES)[number];
}) {
  const Icon = getCategoryIcon(category.slug);
  const accent = getCategoryAccent(category.slug);
  const intro = buildCategoryIntro(category);
  const faqs = buildCategoryFaqs(category);
  const seoParagraphs = buildCategorySeoParagraphs(category);
  const relatedCategories = getRelatedCategories(category);

  return (
    <>
      <PageHeader
        eyebrow={`${category.tools.length} tools`}
        title={category.name}
        description={intro}
        icon={Icon}
        accentClass={accent}
      />

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {category.tools.map((tool) => (
            <ToolCard
              key={tool.slug}
              slug={tool.slug}
              name={tool.name}
              categorySlug={category.slug}
              done={tool.done}
            />
          ))}
        </div>
      </section>

      <section className="border-t bg-muted/30">
        <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="prose prose-neutral max-w-none prose-headings:font-semibold">
            <h2>About {category.name}</h2>
            {seoParagraphs.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <FaqSection faqs={faqs} title={`${category.name} FAQ`} />
      </div>

      <section className="border-t">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <h2 className="text-xl font-semibold tracking-tight">
            Related categories
          </h2>
          <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {relatedCategories.map((related) => {
              const RelatedIcon = getCategoryIcon(related.slug);
              const relatedAccent = getCategoryAccent(related.slug);
              return (
                <Link
                  key={related.slug}
                  href={`/${related.slug}`}
                  className="group flex items-center justify-between gap-2 rounded-xl border bg-card p-4 transition-all hover:-translate-y-0.5 hover:border-transparent hover:shadow-lg hover:shadow-black/5"
                >
                  <span className="flex items-center gap-2.5 min-w-0">
                    <span
                      className={`flex size-8 shrink-0 items-center justify-center rounded-lg ${relatedAccent}`}
                    >
                      <RelatedIcon className="size-4" />
                    </span>
                    <span className="truncate text-sm font-medium">
                      {related.name}
                    </span>
                  </span>
                  <ArrowRight className="size-4 shrink-0 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: category.name, path: `/${category.slug}` },
        ])}
      />
      <JsonLd
        data={collectionPageJsonLd({
          name: category.name,
          description: intro,
          path: `/${category.slug}`,
          itemNames: category.tools.map((t) => t.name),
        })}
      />
      <JsonLd data={faqJsonLd(faqs)} />
    </>
  );
}

function VariantLandingPage({ variantSlug }: { variantSlug: string }) {
  const variant = findToolVariant(variantSlug)!;
  const tool = ALL_TOOLS.find((t) => t.slug === variant.toolSlug);
  const registered = getRegisteredTool(variant.toolSlug);
  if (!tool || !registered) notFound();

  const Icon = getCategoryIcon(tool.categorySlug);
  const accent = getCategoryAccent(tool.categorySlug);
  const features = getToolFeatures(tool.tier);
  const audience = getCategoryAudience(tool.categorySlug);

  const siblingVariants = getVariantsForTool(tool.slug).filter(
    (v) => v.slug !== variant.slug
  );
  const relatedTools = ALL_TOOLS.filter(
    (t) => t.categorySlug === tool.categorySlug && t.slug !== tool.slug
  ).slice(0, 4);
  const relatedSearchItems = [
    { label: tool.name, href: `/tools/${tool.slug}` },
    ...siblingVariants.map((v) => ({ label: v.h1, href: `/${v.slug}` })),
    ...relatedTools
      .slice(0, Math.max(0, 4 - siblingVariants.length))
      .map((r) => ({ label: `${r.name} tool`, href: `/tools/${r.slug}` })),
  ];

  return (
    <>
      <ToolPageHeader
        categoryName={tool.categoryName}
        categorySlug={tool.categorySlug}
        breadcrumbLabel={variant.h1}
        h1={variant.h1}
        subtitle={variant.subtitle}
        icon={Icon}
        accentClass={accent}
      />

      <SeoIntroHero
        toolName={variant.h1}
        introParagraph={variant.introParagraph}
        usesCloud={tool.tier > 4}
      />

      <section className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
        <registered.Component />
      </section>

      <ToolFeaturesAndAudience features={features} audience={audience} />

      <RelatedSearches items={relatedSearchItems} />

      <ToolContentSections toolName={variant.h1} content={registered.content} />

      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: tool.categoryName, path: `/${tool.categorySlug}` },
          { name: variant.h1, path: `/${variant.slug}` },
        ])}
      />
      <JsonLd
        data={softwareApplicationJsonLd({
          name: variant.h1,
          description: variant.introParagraph,
          path: `/${variant.slug}`,
          categoryName: tool.categoryName,
        })}
      />
      <JsonLd data={faqJsonLd(registered.content.faqs)} />
      <JsonLd
        data={howToJsonLd({
          name: variant.h1,
          description: variant.introParagraph,
          steps: registered.content.howItWorks,
        })}
      />
    </>
  );
}

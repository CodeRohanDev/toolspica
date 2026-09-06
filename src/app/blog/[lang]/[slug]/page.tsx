import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { FaqSection } from "@/components/faq-section";
import { getCategoryAccent, getCategoryIcon } from "@/lib/category-icons";
import { ALL_TOOLS } from "@/lib/tools-data.generated";
import { getBlogPost, getAllBlogSlugs, getAvailableLangsForSlug } from "@/lib/blog/registry";
import { BLOG_LANGS, BLOG_LANG_LABEL, BLOG_LANG_TAG, type BlogLang } from "@/lib/blog/types";
import { getBlogPostLastModified } from "@/lib/content-freshness";
import { JsonLd, blogPostingJsonLd, breadcrumbJsonLd, pageMetadata } from "@/lib/seo";

function isBlogLang(value: string): value is BlogLang {
  return (BLOG_LANGS as string[]).includes(value);
}

export function generateStaticParams() {
  return BLOG_LANGS.flatMap((lang) =>
    getAllBlogSlugs()
      .filter((slug) => getBlogPost(lang, slug))
      .map((slug) => ({ lang, slug }))
  );
}

export async function generateMetadata(props: {
  params: Promise<{ lang: string; slug: string }>;
}): Promise<Metadata> {
  const { lang, slug } = await props.params;
  if (!isBlogLang(lang)) return {};
  const post = getBlogPost(lang, slug);
  if (!post) return {};

  const base = pageMetadata({
    title: post.title,
    description: post.description,
    path: `/blog/${lang}/${slug}`,
    eyebrow: "Blog",
  });

  const languages: Record<string, string> = {};
  for (const altLang of getAvailableLangsForSlug(slug)) {
    languages[BLOG_LANG_TAG[altLang]] = `/blog/${altLang}/${slug}`;
  }

  return {
    ...base,
    alternates: { ...base.alternates, languages },
  };
}

export default async function BlogPostPage(props: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang, slug } = await props.params;
  if (!isBlogLang(lang)) notFound();

  const post = getBlogPost(lang, slug);
  if (!post) notFound();

  const tool = ALL_TOOLS.find((t) => t.slug === slug);
  const Icon = tool ? getCategoryIcon(tool.categorySlug) : undefined;
  const accent = tool ? getCategoryAccent(tool.categorySlug) : undefined;
  const otherLangs = getAvailableLangsForSlug(slug).filter((l) => l !== lang);
  const dateModified = getBlogPostLastModified(lang, slug);

  return (
    <>
      <PageHeader
        eyebrow="Blog"
        title={post.title}
        description={post.description}
        icon={Icon}
        accentClass={accent}
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "Blog", href: "/blog" },
          { label: post.title },
        ]}
      />

      <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
        {otherLangs.length > 0 && (
          <div className="mb-8 flex flex-wrap items-center gap-2 text-sm">
            <span className="text-muted-foreground">Also available in:</span>
            {otherLangs.map((l) => (
              <Link
                key={l}
                href={`/blog/${l}/${slug}`}
                className="rounded-full border px-3 py-1 text-xs font-medium hover:bg-accent"
              >
                {BLOG_LANG_LABEL[l]}
              </Link>
            ))}
          </div>
        )}

        <div className="prose prose-neutral max-w-none prose-headings:font-semibold">
          {post.sections.map((section, i) => (
            <section key={i}>
              <h2>{section.heading}</h2>
              {section.body.map((paragraph, j) => (
                <p key={j}>{paragraph}</p>
              ))}
            </section>
          ))}
        </div>

        {tool && (
          <Link
            href={`/tools/${tool.slug}`}
            className="mt-8 flex items-center justify-between gap-3 rounded-xl border bg-card p-5 transition-colors hover:border-brand/40"
          >
            <span>
              <span className="block text-sm font-semibold">Try {tool.name} now</span>
              <span className="block text-sm text-muted-foreground">
                Free, runs in your browser — no sign-up.
              </span>
            </span>
            <ArrowRight className="size-5 shrink-0 text-brand" />
          </Link>
        )}
      </article>

      {post.faqs.length > 0 && (
        <div className="border-t bg-muted/30">
          <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
            <FaqSection faqs={post.faqs} />
          </div>
        </div>
      )}

      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Blog", path: "/blog" },
          { name: post.title, path: `/blog/${lang}/${slug}` },
        ])}
      />
      <JsonLd
        data={blogPostingJsonLd({
          title: post.title,
          description: post.description,
          path: `/blog/${lang}/${slug}`,
          inLanguage: BLOG_LANG_TAG[lang],
          datePublished: post.publishedAt ?? dateModified,
          dateModified,
        })}
      />
    </>
  );
}

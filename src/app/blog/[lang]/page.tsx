import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/page-header";
import { getCategoryAccent, getCategoryIcon } from "@/lib/category-icons";
import { ALL_TOOLS } from "@/lib/tools-data.generated";
import { getBlogSlugsForLang } from "@/lib/blog/registry";
import { BLOG_LANGS, BLOG_LANG_LABEL, type BlogLang } from "@/lib/blog/types";
import { JsonLd, breadcrumbJsonLd, pageMetadata } from "@/lib/seo";

function isBlogLang(value: string): value is BlogLang {
  return (BLOG_LANGS as string[]).includes(value);
}

export function generateStaticParams() {
  return BLOG_LANGS.map((lang) => ({ lang }));
}

export async function generateMetadata(props: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await props.params;
  if (!isBlogLang(lang)) return {};
  return pageMetadata({
    title: `Blog (${BLOG_LANG_LABEL[lang]})`,
    description: `Free, practical guides for Toolspica's tools — how-tos, tips, and answers to common questions, in ${BLOG_LANG_LABEL[lang]}.`,
    path: `/blog/${lang}`,
  });
}

export default async function BlogLangIndexPage(props: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await props.params;
  if (!isBlogLang(lang)) notFound();

  const slugs = getBlogSlugsForLang(lang);
  const posts = slugs
    .map((slug) => ALL_TOOLS.find((t) => t.slug === slug))
    .filter((t): t is (typeof ALL_TOOLS)[number] => Boolean(t));

  return (
    <>
      <PageHeader
        eyebrow="Blog"
        title={`Toolspica Blog — ${BLOG_LANG_LABEL[lang]}`}
        description="Practical, no-fluff guides for getting things done with Toolspica's tools."
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "Blog", href: "/blog" },
          { label: BLOG_LANG_LABEL[lang] },
        ]}
      />

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        {BLOG_LANGS.length > 1 && (
          <div className="mb-8 flex flex-wrap gap-2">
            {BLOG_LANGS.map((l) => (
              <Link
                key={l}
                href={`/blog/${l}`}
                className={`rounded-full border px-3 py-1.5 text-sm font-medium ${
                  l === lang ? "bg-foreground text-background" : "hover:bg-accent"
                }`}
              >
                {BLOG_LANG_LABEL[l]}
              </Link>
            ))}
          </div>
        )}

        {posts.length === 0 ? (
          <p className="text-muted-foreground">No posts yet in this language — check back soon.</p>
        ) : (
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((tool) => {
              const Icon = getCategoryIcon(tool.categorySlug);
              const accent = getCategoryAccent(tool.categorySlug);
              return (
                <Link
                  key={tool.slug}
                  href={`/blog/${lang}/${tool.slug}`}
                  className="group flex items-center gap-3 rounded-xl border bg-card p-4 transition-all hover:-translate-y-0.5 hover:shadow-lg"
                >
                  <span className={`flex size-10 shrink-0 items-center justify-center rounded-xl ${accent}`}>
                    <Icon className="size-4.5" />
                  </span>
                  <span className="min-w-0">
                    <span className="block truncate text-sm font-medium">{tool.name}</span>
                    <span className="block truncate text-xs text-muted-foreground">{tool.categoryName}</span>
                  </span>
                </Link>
              );
            })}
          </div>
        )}
      </section>

      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Blog", path: "/blog" },
          { name: BLOG_LANG_LABEL[lang], path: `/blog/${lang}` },
        ])}
      />
    </>
  );
}

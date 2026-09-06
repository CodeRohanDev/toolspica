import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";
import { ALL_TOOLS, TOOL_CATEGORIES } from "@/lib/tools-data.generated";
import { TOOL_VARIANTS } from "@/lib/tool-variants";
import { BLOG_LANGS } from "@/lib/blog/types";
import { getBlogSlugsForLang } from "@/lib/blog/registry";
import { COMPARE_PAGES } from "@/lib/compare-content";
import {
  getToolContentLastModified,
  getBlogPostLastModified,
  getMostRecent,
} from "@/lib/content-freshness";

const STATIC_PAGES: { path: string; priority: number }[] = [
  { path: "/", priority: 1 },
  { path: "/categories", priority: 0.9 },
  { path: "/compare", priority: 0.5 },
  { path: "/request-a-tool", priority: 0.5 },
  { path: "/about", priority: 0.5 },
  { path: "/contact", priority: 0.4 },
  { path: "/privacy-policy", priority: 0.3 },
  { path: "/terms", priority: 0.3 },
  { path: "/disclaimer", priority: 0.3 },
  { path: "/data-processing-policy", priority: 0.3 },
  { path: "/file-retention-policy", priority: 0.3 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  // Real per-file last-commit dates, not a fabricated "now" on every build —
  // search engines discount lastModified signals that never vary.
  const homeDate = getMostRecent(
    ALL_TOOLS.filter((t) => t.done).map((t) => getToolContentLastModified(t.slug))
  );

  const staticEntries: MetadataRoute.Sitemap = STATIC_PAGES.map((page) => ({
    url: `${SITE.url}${page.path}`,
    ...((page.path === "/" || page.path === "/categories") && {
      lastModified: homeDate,
    }),
    changeFrequency: "weekly",
    priority: page.priority,
  }));

  const categoryEntries: MetadataRoute.Sitemap = TOOL_CATEGORIES.map(
    (category) => ({
      url: `${SITE.url}/${category.slug}`,
      lastModified: getMostRecent(
        category.tools
          .filter((t) => t.done)
          .map((t) => getToolContentLastModified(t.slug))
      ),
      changeFrequency: "weekly",
      priority: 0.8,
    })
  );

  // Only live tools are indexed — "coming soon" tool pages are noIndex
  // and intentionally excluded from the sitemap until they ship.
  const toolEntries: MetadataRoute.Sitemap = ALL_TOOLS.filter(
    (tool) => tool.done
  ).map((tool) => ({
    url: `${SITE.url}/tools/${tool.slug}`,
    lastModified: getToolContentLastModified(tool.slug),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  // SEO landing-page variants (e.g. /essay-word-counter) — same engine as
  // their target tool, unique intro/meta copy per variant, self-canonical.
  const variantEntries: MetadataRoute.Sitemap = TOOL_VARIANTS.filter((v) =>
    ALL_TOOLS.some((tool) => tool.slug === v.toolSlug && tool.done)
  ).map((variant) => ({
    url: `${SITE.url}/${variant.slug}`,
    lastModified: getToolContentLastModified(variant.toolSlug),
    changeFrequency: "monthly",
    priority: 0.65,
  }));

  const blogEntries: MetadataRoute.Sitemap = BLOG_LANGS.flatMap((lang) =>
    getBlogSlugsForLang(lang).map((slug) => ({
      url: `${SITE.url}/blog/${lang}/${slug}`,
      lastModified: getBlogPostLastModified(lang, slug),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    }))
  );

  const compareEntries: MetadataRoute.Sitemap = COMPARE_PAGES.map((page) => ({
    url: `${SITE.url}/compare/${page.slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.55,
  }));

  return [...staticEntries, ...categoryEntries, ...toolEntries, ...variantEntries, ...blogEntries, ...compareEntries];
}

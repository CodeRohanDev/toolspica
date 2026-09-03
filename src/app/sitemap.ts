import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";
import { ALL_TOOLS, TOOL_CATEGORIES } from "@/lib/tools-data.generated";
import { TOOL_VARIANTS } from "@/lib/tool-variants";

const STATIC_PAGES: { path: string; priority: number }[] = [
  { path: "/", priority: 1 },
  { path: "/categories", priority: 0.9 },
  { path: "/about", priority: 0.5 },
  { path: "/contact", priority: 0.4 },
  { path: "/privacy-policy", priority: 0.3 },
  { path: "/terms", priority: 0.3 },
  { path: "/disclaimer", priority: 0.3 },
  { path: "/data-processing-policy", priority: 0.3 },
  { path: "/file-retention-policy", priority: 0.3 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticEntries: MetadataRoute.Sitemap = STATIC_PAGES.map((page) => ({
    url: `${SITE.url}${page.path}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: page.priority,
  }));

  const categoryEntries: MetadataRoute.Sitemap = TOOL_CATEGORIES.map(
    (category) => ({
      url: `${SITE.url}/${category.slug}`,
      lastModified: now,
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
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  // SEO landing-page variants (e.g. /essay-word-counter) — same engine as
  // their target tool, unique intro/meta copy per variant, self-canonical.
  const variantEntries: MetadataRoute.Sitemap = TOOL_VARIANTS.filter((v) =>
    ALL_TOOLS.some((tool) => tool.slug === v.toolSlug && tool.done)
  ).map((variant) => ({
    url: `${SITE.url}/${variant.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.65,
  }));

  return [...staticEntries, ...categoryEntries, ...toolEntries, ...variantEntries];
}

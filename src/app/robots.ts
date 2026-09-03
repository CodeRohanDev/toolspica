import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    // Deliberately allow-all, including AI/answer-engine crawlers
    // (GPTBot, PerplexityBot, ClaudeBot, Google-Extended, etc.) — being
    // findable and citable by AI answer engines (AEO/GEO) is a goal here,
    // not something to block.
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/search"],
    },
    sitemap: `${SITE.url}/sitemap.xml`,
    host: SITE.url,
  };
}

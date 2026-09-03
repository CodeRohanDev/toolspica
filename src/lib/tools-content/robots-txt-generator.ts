import type { ToolContent } from "./types";

export const robotsTxtGeneratorContent: ToolContent = {
  heroSubtitle: "Build a Correctly Formatted robots.txt File",
  overview: [
    "robots.txt tells search engine crawlers which parts of your site they should and shouldn't access, and it has to sit at your domain's root with exact syntax — a typo in the directive name or a misplaced rule can accidentally block your entire site from search engines, or fail to block the pages you actually wanted hidden. This tool builds the file through a simple form instead of hand-editing plain text.",
    "Add as many User-agent/Disallow rule pairs as you need, include any extra lines for Allow exceptions or crawl-delay directives, and specify your sitemap URL — the tool assembles everything into correctly formatted, ready-to-deploy robots.txt content. Multiple rules for different crawlers (like blocking one bot while allowing others) are fully supported.",
    "This matters most for anyone managing a site without a CMS plugin generating this automatically: staging environments you want to keep out of search results, admin sections that shouldn't be crawled, or simply making sure your sitemap is being pointed to correctly so search engines discover your pages faster.",
  ],
  howItWorks: [
    { title: "Add User-agent rules", description: "Specify which crawlers and which paths to disallow." },
    { title: "Add your sitemap URL", description: "Helps search engines discover all your pages." },
    { title: "Copy the generated file", description: "Save as robots.txt at your site's root." },
  ],
  examples: [
    { label: "Blocking an admin section", input: "User-agent: *, Disallow: /admin/", output: "User-agent: *\\nDisallow: /admin/\\n\\nSitemap: https://example.com/sitemap.xml" },
  ],
  faqs: [
    { question: "Where does robots.txt need to be placed?", answer: "It must sit at your domain's root — e.g. https://example.com/robots.txt — for search engines to find it." },
    { question: "Does Disallow guarantee a page won't appear in search results?", answer: "Not entirely — it blocks crawling, but a page can still be indexed by URL alone if other sites link to it. Use a noindex meta tag for guaranteed exclusion." },
    { question: "Can I block one crawler but allow others?", answer: "Yes — add a separate User-agent rule block for the specific crawler you want to restrict, and a separate `User-agent: *` block for everyone else." },
    { question: "What does Disallow: / do?", answer: "It blocks the entire site from that crawler — use with caution, as this is a common accidental-mistake that de-indexes an entire site." },
    { question: "Is including a sitemap link required?", answer: "No, but it's recommended — it helps crawlers discover your full page list faster than relying on internal links alone." },
  ],
};

import type { ToolContent } from "./types";

export const sitemapGeneratorContent: ToolContent = {
  heroSubtitle: "Generate an XML Sitemap from a List of URLs",
  overview: [
    "A sitemap.xml file tells search engines exactly which pages on your site exist and are worth crawling — it doesn't guarantee ranking, but it does help search engines discover pages faster, especially on newer sites or ones without a lot of internal links pointing to every page yet. Most static sites, small business sites, and hand-built pages without a CMS don't have an automated way to generate one.",
    "This tool takes a plain list of URLs — one per line, pasted directly — and produces a valid sitemap.xml file following the standard Sitemaps protocol, with a shared change-frequency (how often the pages tend to update) and priority value (a relative importance hint between 0.0 and 1.0) applied across all URLs in the list.",
    "This generates a flat, single-priority sitemap suitable for sites with up to a few hundred URLs where every page follows the same general update pattern. Larger, more complex sites — especially ones where different sections update at very different rates, like a blog versus a static About page — often benefit from a more granular, page-by-page priority and frequency setup, or from splitting into multiple sitemap files linked by a sitemap index.",
  ],
  howItWorks: [
    { title: "Paste your URLs", description: "One full URL per line, including the https:// prefix." },
    { title: "Set change frequency and priority", description: "Choose values that reasonably describe how often the pages update." },
    { title: "Copy the sitemap.xml", description: "Save the output as sitemap.xml in your site's root directory and submit it to Search Console." },
  ],
  examples: [
    {
      label: "Three URLs",
      input: "https://example.com/\nhttps://example.com/about\nhttps://example.com/contact",
      output: "<urlset>...<url><loc>https://example.com/</loc><changefreq>weekly</changefreq><priority>0.8</priority></url>...</urlset>",
    },
  ],
  faqs: [
    {
      question: "Does having a sitemap guarantee better search rankings?",
      answer:
        "No — a sitemap helps search engines discover and crawl your pages more efficiently, but it doesn't directly affect ranking. Ranking still depends on content quality, relevance, and other standard SEO factors.",
    },
    {
      question: "Where should I save and submit the sitemap file?",
      answer:
        "Save it as sitemap.xml in your website's root directory (so it's reachable at yoursite.com/sitemap.xml), then submit that URL in Google Search Console and Bing Webmaster Tools.",
    },
    {
      question: "Should every URL have the same priority?",
      answer:
        "Not necessarily — this tool applies one priority value to the whole batch for simplicity. For a more refined sitemap, generate separate batches for high-priority pages (like your homepage) versus lower-priority ones (like legal pages) and combine the output.",
    },
    {
      question: "Is my list of URLs sent anywhere?",
      answer:
        "No — the sitemap XML is generated entirely in your browser from the text you paste. Nothing is uploaded or stored.",
    },
  ],
};

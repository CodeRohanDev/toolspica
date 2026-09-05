import type { ToolContent } from "./types";

export const xmlSitemapValidatorContent: ToolContent = {
  heroSubtitle: "Validate Your sitemap.xml Against the Sitemaps Protocol",
  overview: [
    "A sitemap that's malformed or violates the sitemap protocol can get silently ignored or partially rejected by search engines, without any obvious error on your own site — the file loads fine in a browser, but Google Search Console quietly reports it as invalid or reads fewer URLs than you expected. Catching format problems before submission avoids that quiet failure.",
    "This tool parses your sitemap.xml content directly using the browser's built-in XML parser and checks it against the actual Sitemaps protocol rules: a valid XML document, the required `<urlset>` root element with the correct namespace, every `<url>` entry having a required `<loc>` with an absolute URL, the 50,000 URL per-file limit, priority values falling between 0.0 and 1.0, and changefreq values matching the protocol's defined set.",
    "Errors indicate something that will likely cause search engines to reject or skip an entry (a missing `<loc>`, invalid XML, a relative instead of absolute URL); warnings flag things that are technically tolerated but non-standard (a non-standard changefreq value, an unusually long URL) and worth double-checking rather than necessarily fixing.",
  ],
  howItWorks: [
    { title: "Paste your sitemap.xml content", description: "Copy the full XML content of your sitemap file." },
    { title: "Review errors and warnings", description: "See exactly which entries have problems and why." },
    { title: "Fix and re-check", description: "Correct the issues in your actual sitemap file and re-validate." },
  ],
  examples: [
    {
      label: "Missing loc element",
      input: "<url><changefreq>weekly</changefreq></url>",
      output: "Error: Entry 1: missing required <loc> element.",
    },
  ],
  faqs: [
    {
      question: "What's the difference between an error and a warning?",
      answer:
        "Errors flag problems likely to cause search engines to reject or skip an entry entirely (missing <loc>, invalid XML, relative URLs). Warnings flag non-standard but technically tolerated values, like an unusual changefreq or a very long URL, worth reviewing but less critical.",
    },
    {
      question: "What's the maximum number of URLs allowed in one sitemap?",
      answer:
        "The Sitemaps protocol caps a single sitemap file at 50,000 URLs (and 50MB uncompressed). Larger sites need to split into multiple sitemap files linked together by a sitemap index file.",
    },
    {
      question: "Does passing this validator guarantee Google will index all my pages?",
      answer:
        "No — this checks technical protocol compliance (valid structure, required fields, correct value ranges), not whether search engines will choose to crawl or index the pages. A valid sitemap just ensures your submission is correctly readable.",
    },
    {
      question: "Is my sitemap content sent to a server?",
      answer:
        "No — validation runs entirely in your browser using its built-in XML parser. Nothing you paste is uploaded or stored.",
    },
  ],
};

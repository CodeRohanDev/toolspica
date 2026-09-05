import type { ToolContent } from "./types";

export const sitemapViewerContent: ToolContent = {
  heroSubtitle: "View a sitemap.xml File's URLs as a Readable Table",
  overview: [
    "A sitemap.xml file lists every URL a site wants search engines to crawl, but the raw XML — with each URL wrapped in nested <url>, <loc>, and metadata tags — is tedious to scan for a quick check of what's actually included and how it's configured.",
    "This tool parses a sitemap.xml file and displays every URL entry in a clean table — the URL itself, its last-modified date, change frequency, and priority value all in separate columns — making it easy to scan a sitemap's contents or spot-check specific entries.",
    "This is a read-only viewing tool for understanding what's in an existing sitemap — for checking whether a sitemap actually follows the Sitemaps protocol correctly (valid structure, required fields, correct value ranges), use this site's separate XML Sitemap Validator tool instead.",
  ],
  howItWorks: [
    { title: "Paste or upload a sitemap.xml file", description: "Paste the XML content, or upload the file." },
    { title: "Review the URL table", description: "See every URL with its last-modified date, change frequency, and priority." },
    { title: "Scan quickly", description: "Long URLs are truncated in the table with the full URL shown on hover." },
  ],
  examples: [
    {
      label: "Simple sitemap",
      input: "<url><loc>https://example.com/</loc><priority>1.0</priority></url>",
      output: "A table row: URL https://example.com/, Priority 1.0.",
    },
  ],
  faqs: [
    {
      question: "Does this validate the sitemap's format?",
      answer:
        "No — this focuses on displaying the URL entries readably. For checking protocol compliance and catching structural errors, use this site's XML Sitemap Validator tool instead.",
    },
    {
      question: "Can I view a very large sitemap?",
      answer:
        "Yes, though sitemaps with thousands of URLs may take a moment to render fully in the table, since every entry is parsed and displayed.",
    },
    {
      question: "What if a field like lastmod is missing from an entry?",
      answer:
        "Missing optional fields (lastmod, changefreq, priority) are shown as a dash in the table, since the Sitemaps protocol only requires the loc field for each URL.",
    },
    {
      question: "Is my sitemap content sent anywhere?",
      answer:
        "No — parsing happens entirely in your browser using the built-in XML parser. Nothing you paste or upload is sent to a server.",
    },
  ],
};

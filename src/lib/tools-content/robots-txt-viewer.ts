import type { ToolContent } from "./types";

export const robotsTxtViewerContent: ToolContent = {
  heroSubtitle: "Parse and Visualize a robots.txt File's Rules",
  overview: [
    "A robots.txt file's directives are simple individually, but reading raw text to understand which rules apply to which crawler — especially with multiple user-agent groups and overlapping allow/disallow rules — takes more careful reading than the format's simplicity suggests.",
    "This tool parses a robots.txt file and groups its rules by user-agent, clearly showing which Allow and Disallow paths apply to each crawler group, plus any Sitemap directives listed separately — turning a flat text file into a structured view of exactly what's blocked and what's open for each bot.",
    "This reads and displays existing robots.txt rules for understanding and auditing — for building a new one from scratch, use this site's separate robots.txt Generator tool instead, which is built for creating rules rather than parsing existing ones.",
  ],
  howItWorks: [
    { title: "Paste or upload a robots.txt file", description: "Paste the content directly, or upload the file." },
    { title: "Review the grouped rules", description: "See Allow/Disallow rules organized by which user-agent they apply to." },
    { title: "Check listed sitemaps", description: "Any Sitemap directives are shown separately." },
  ],
  examples: [
    {
      label: "Simple robots.txt",
      input: "User-agent: *\nDisallow: /admin\nAllow: /",
      output: "A group for \"*\" showing Disallow: /admin and Allow: /.",
    },
  ],
  faqs: [
    {
      question: "Does this check if my robots.txt is actually valid?",
      answer:
        "It parses recognized directives (User-agent, Allow, Disallow, Sitemap, Crawl-delay) and displays them structured — lines it doesn't recognize are simply not included in the grouped view rather than flagged as errors.",
    },
    {
      question: "Can multiple user-agent lines share the same rules?",
      answer:
        "Yes — consecutive User-agent lines with no rules between them are grouped together as sharing the rules that follow, matching how the robots.txt specification itself groups multiple agents.",
    },
    {
      question: "Does this tool generate a new robots.txt file?",
      answer:
        "No — this is a read-only viewer for understanding existing rules. Use this site's Robots.txt Generator tool to build a new file from scratch.",
    },
    {
      question: "Is my robots.txt content sent anywhere?",
      answer:
        "No — parsing happens entirely in your browser. Nothing you paste or upload is sent to a server.",
    },
  ],
};

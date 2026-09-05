import type { ToolContent } from "./types";

export const logFileViewerContent: ToolContent = {
  heroSubtitle: "Search and Filter Log Files by Level, Color-Coded",
  overview: [
    "Raw log files are dense, uniform walls of text — finding the actual error buried among hundreds of routine INFO lines usually means scrolling and squinting, or writing a quick grep command just to filter down to what matters.",
    "This tool color-codes every log line by its detected level (ERROR and FATAL in red, WARN in amber, INFO in blue, DEBUG muted), shows a count badge for each level found, and lets you click a badge to filter down to just that level, combined with a free-text search box for filtering by keyword.",
    "Level detection works by matching common log level keywords directly in each line's text — it doesn't require a specific log format, so it works reasonably well across server logs, application logs, and most conventional logging output, though logs using non-standard level naming won't be color-coded.",
  ],
  howItWorks: [
    { title: "Paste or upload a log file", description: "Paste log text directly, or upload a .log or .txt file." },
    { title: "Filter by level", description: "Click a level badge (ERROR, WARN, INFO, DEBUG) to filter to just that level." },
    { title: "Search by keyword", description: "Type in the search box to filter lines containing specific text." },
  ],
  examples: [
    {
      label: "Filtering to errors only",
      input: "A log with mixed INFO and ERROR lines, click the ERROR badge",
      output: "Only lines containing \"ERROR\" are shown, highlighted in red.",
    },
  ],
  faqs: [
    {
      question: "How does level detection work?",
      answer:
        "Each line is scanned for common level keywords (ERROR, FATAL, WARN/WARNING, INFO, DEBUG) as whole words — it doesn't require a specific structured log format, so it works across most conventional logging styles.",
    },
    {
      question: "Can I combine a level filter with a text search?",
      answer:
        "Yes — both filters apply together, so you can narrow down to, for example, only ERROR lines that also contain a specific keyword like a request ID.",
    },
    {
      question: "Is there a file size limit for uploads?",
      answer:
        "No hard limit is enforced, but very large log files may take a moment to render fully, since every line is processed in your browser.",
    },
    {
      question: "Is my log file uploaded to a server?",
      answer:
        "No — the entire file is read and processed in your browser. Nothing is uploaded anywhere.",
    },
  ],
};

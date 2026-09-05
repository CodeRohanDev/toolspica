import type { ToolContent } from "./types";

export const cookieFileViewerContent: ToolContent = {
  heroSubtitle: "View a Netscape-Format Cookies.txt File as a Table",
  overview: [
    "Browser cookie exports (used by automation tools, scrapers, and some browser extensions) follow the Netscape cookie file format — a tab-separated plain text layout that's technically readable but genuinely hard to scan by eye, since columns don't visually align without a monospace grid.",
    "This tool parses a Netscape-format cookies.txt file and displays each cookie in a proper table — domain, name, value, path, whether it's secure, and expiry date all in clearly labeled columns, instead of a wall of tab-separated text.",
    "Session cookies (with no fixed expiry) are labeled clearly as \"Session\" rather than showing a confusing raw zero value, and long cookie values are truncated in the table with the full value available on hover, keeping the table readable even with lengthy session tokens.",
  ],
  howItWorks: [
    { title: "Paste or upload a cookies.txt file", description: "Paste the tab-separated content, or upload a Netscape-format cookie file." },
    { title: "Review the table", description: "See every cookie's domain, name, value, path, and expiry clearly laid out." },
    { title: "Hover to see full values", description: "Long values are truncated in the table but shown in full on hover." },
  ],
  examples: [
    {
      label: "Single cookie entry",
      input: "example.com\tTRUE\t/\tTRUE\t0\tsession_id\tabc123",
      output: "A table row: Domain example.com, Name session_id, Value abc123, Expiry Session.",
    },
  ],
  faqs: [
    {
      question: "What format does this expect?",
      answer:
        "The Netscape cookie file format — a tab-separated plain text format used by many browser extensions, automation tools (like curl and yt-dlp), and scraping libraries for exporting and importing cookies.",
    },
    {
      question: "What does an expiry of \"Session\" mean?",
      answer:
        "It means the cookie has no fixed expiration date and will be cleared when the browser session ends — the Netscape format represents this as an expiry value of 0.",
    },
    {
      question: "Can I edit cookies with this tool?",
      answer:
        "No — this is a read-only viewer for inspecting cookie file contents, not an editor for modifying or re-exporting cookie data.",
    },
    {
      question: "Is my cookie data sent anywhere?",
      answer:
        "No — parsing happens entirely in your browser. Cookie values, which can be sensitive session tokens, are never uploaded or sent to a server.",
    },
  ],
};

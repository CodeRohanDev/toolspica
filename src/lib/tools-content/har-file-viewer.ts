import type { ToolContent } from "./types";

export const harFileViewerContent: ToolContent = {
  heroSubtitle: "Analyze a HAR File's Network Requests",
  overview: [
    "A HAR (HTTP Archive) file — exported from any browser's DevTools Network tab — captures every request a page made while loading, but the raw file is a deeply nested JSON structure that's genuinely painful to read directly, even though DevTools itself shows it nicely at capture time.",
    "This tool reads an exported .har file and displays every network request in a clean table: HTTP method, URL, status code (color-coded by range — green for 2xx, blue for 3xx, amber for 4xx, red for 5xx), and response time — plus summary totals for request count, combined load time, and total transferred size.",
    "This is especially useful for sharing a performance or debugging investigation with someone else after the original DevTools session has closed — export the HAR once, and anyone can review the exact request timeline and status codes without needing to reproduce the original browsing session.",
  ],
  howItWorks: [
    { title: "Export a .har file", description: "In Chrome DevTools, right-click the Network tab's request list and choose \"Save all as HAR.\"" },
    { title: "Upload the file", description: "Choose the exported .har file." },
    { title: "Review the request table", description: "See every request's method, URL, status, and timing." },
  ],
  examples: [
    {
      label: "Slow request",
      input: "A HAR file with a request taking 3200ms",
      output: "That row shows \"3200 ms\" clearly, making the slow request easy to spot in the table.",
    },
  ],
  faqs: [
    {
      question: "How do I export a HAR file?",
      answer:
        "Open your browser's DevTools, go to the Network tab, reload the page or perform the action you want to capture, then right-click the request list and choose \"Save all as HAR\" (wording varies slightly by browser).",
    },
    {
      question: "What do the status code colors mean?",
      answer:
        "Green indicates a successful 2xx response, blue a 3xx redirect, amber a 4xx client error, and red a 5xx server error — the same convention most network monitoring tools use.",
    },
    {
      question: "Does this show request/response headers and body content?",
      answer:
        "Not currently — this focuses on the summary view (method, URL, status, timing) for quickly scanning a request list, not deep inspection of individual header or body content.",
    },
    {
      question: "Is my HAR file uploaded to a server?",
      answer:
        "No — parsing happens entirely in your browser. HAR files can contain sensitive request data (cookies, auth tokens), and none of it is uploaded anywhere.",
    },
  ],
};

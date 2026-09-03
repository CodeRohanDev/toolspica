import type { ToolContent } from "./types";

export const pdfSplitterByFileSizeContent: ToolContent = {
  heroSubtitle: "Split a Large PDF Into Parts That Each Fit a Size Limit",
  overview: [
    "Many upload forms, email attachments, and submission portals cap file size at a fixed limit — 5MB, 10MB, 25MB — and a large PDF (especially one full of scanned pages or high-resolution images) can easily exceed that. Splitting by a fixed number of pages doesn't reliably solve this, since pages can vary enormously in size depending on their content. This tool splits a PDF by actual file size instead, guaranteeing every resulting part stays under the limit you specify.",
    "It works by building up each output file page-by-page, checking the actual resulting file size after each page is added, and starting a new file the moment adding another page would push the current one over your specified limit. This means the split points are determined by real measured size, not an estimate or a fixed page count, so the guarantee holds even for documents where page sizes vary wildly (a mix of text-only pages and pages with large embedded photos, for example).",
    "Because the size check happens after each page is actually added and saved, this is a genuinely accurate size-based split rather than an approximation — you can trust that every output file, except potentially the last, is as close to your limit as the page boundaries allow without exceeding it.",
    "There's one hard constraint worth knowing upfront: a single page can't be split smaller than itself. If one page's own content pushes it over your size limit even by itself, that page will still be output as its own file exceeding the limit, since there's no way to further subdivide the content within a single page.",
  ],
  howItWorks: [
    { title: "Upload your PDF", description: "The file loads ready for splitting." },
    { title: "Set your maximum size per file", description: "Enter the size limit in megabytes for each output part." },
    { title: "Split and download", description: "Get a ZIP of parts, each kept under your specified size limit." },
  ],
  examples: [
    { label: "Meeting a 5MB email attachment limit", input: "22MB PDF, 5MB limit", output: "ZIP file with several parts (e.g. part-1.pdf through part-5.pdf), each under 5MB" },
  ],
  faqs: [
    { question: "How exact is the size limit — will parts ever exceed it?", answer: "The tool measures each part's actual saved file size after adding every page, so parts stay under your limit as precisely as page boundaries allow — the only exception is a single page whose own content alone exceeds the limit, which can't be split further." },
    { question: "Can one page really exceed my size limit by itself?", answer: "Yes, if that page contains a very large embedded image or other heavy content. Since a page can't be subdivided, that page is still output as its own file, even though it exceeds your requested limit — this is a hard constraint of splitting by whole pages." },
    { question: "How do I know how many parts I'll end up with?", answer: "It depends on your PDF's total size, page count, and how the content is distributed across pages — the tool determines this automatically rather than requiring you to specify a part count upfront." },
    { question: "Does splitting affect quality?", answer: "No — pages are copied as PDF objects into each part, not re-rendered as images, so text and images retain their original quality throughout." },
    { question: "How is this different from the regular PDF Split tool?", answer: "The regular PDF Split tool divides by a fixed page count or specific ranges; this tool divides based on actual output file size, which is what you need when the goal is meeting an upload or attachment size limit rather than a specific page grouping." },
  ],
};

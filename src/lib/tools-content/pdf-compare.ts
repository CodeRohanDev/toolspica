import type { ToolContent } from "./types";

export const pdfCompareContent: ToolContent = {
  heroSubtitle: "Spot Visual Differences Between Two Versions of a PDF",
  overview: [
    "Comparing two versions of a document — a contract before and after a round of edits, a design proof against a revised version, a report resubmitted after corrections — is tedious to do by eye, especially across many pages where a small change can easily get missed. This tool renders both PDFs page by page and highlights exactly where the visual content differs, so changes jump out immediately instead of requiring a careful side-by-side read-through.",
    "Both files are rendered to images at matching resolution, then compared pixel by pixel: any pixel where the color difference between the two versions exceeds a threshold is marked bright red in the output, while matching areas are shown as a dimmed grayscale version of the original page. This produces a clear visual map of exactly where changes occurred on each page, down to individual characters or graphic elements.",
    "Each page gets its own diff percentage — the share of pixels that differ — so you can quickly triage which pages have substantial changes worth reviewing carefully versus which are essentially unchanged with only minor rendering noise. All page diffs can be downloaded together as a single ZIP file for record-keeping or sharing with a reviewer.",
    "This is a purely visual, pixel-level comparison rather than a text-aware diff — it will flag differences even in identical text that's rendered at a slightly different position, and it can't produce a word-level \"added/removed\" summary the way a text-diff tool would. If the two PDFs have different page counts, only the pages present in both are compared, and a note flags the count mismatch.",
  ],
  howItWorks: [
    { title: "Upload both PDF versions", description: "Provide the original (PDF A) and the revised version (PDF B)." },
    { title: "Run the comparison", description: "Every shared page is rendered and compared pixel by pixel." },
    { title: "Review the highlighted differences", description: "Changed areas appear in red on each page, with a diff percentage shown." },
  ],
  examples: [
    { label: "Reviewing a contract revision", input: "contract-v1.pdf vs contract-v2.pdf", output: "page 3 shows 2.1% different (one clause edited), other pages 0%" },
  ],
  faqs: [
    { question: "Does this compare text content or just visual appearance?", answer: "It's a purely visual, pixel-level comparison — it detects any change in how a page renders, including text edits, moved elements, or formatting changes, but doesn't produce a word-level text diff." },
    { question: "What does the red highlighting mean?", answer: "Red marks pixels where the two versions differ by more than a small threshold; unchanged areas are shown dimmed in grayscale so the differences stand out clearly against the original page content." },
    { question: "What happens if the two PDFs have different page counts?", answer: "Only pages present in both files are compared, and a note is shown flagging the page count mismatch so you're aware some pages weren't compared." },
    { question: "Why does a page show as different when I can't see any visible change?", answer: "Very small rendering differences (subtle anti-aliasing, minor position shifts) can register as a small nonzero diff percentage even when the visible content is effectively identical — check the diff percentage and image for pages with only trace differences." },
    { question: "Can I compare pages that are different sizes between the two PDFs?", answer: "No — pages with mismatched rendered dimensions between the two files are skipped in the comparison, since a pixel-by-pixel comparison requires matching dimensions." },
  ],
};

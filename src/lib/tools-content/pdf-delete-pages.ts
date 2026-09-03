import type { ToolContent } from "./types";

export const pdfDeletePagesContent: ToolContent = {
  heroSubtitle: "Remove Unwanted Pages Without Touching the Rest",
  overview: [
    "It's common to end up with a PDF that's almost right except for a page or two — a blank scanned sheet at the end, a duplicate page from a mis-fed scanner, an outdated cover page, or an internal note that shouldn't go out with the final document. Rather than starting over or extracting every page you want to keep, this tool flips the problem around: mark the pages you don't want, and everything else is preserved exactly as it was.",
    "Pages to delete are selected by clicking their thumbnail (which dims and marks it with a trash icon) or by typing a page range like \"1-3,5,8-10\" for faster selection in longer documents. The tool refuses to let you delete every page — at least one must remain — since a zero-page PDF isn't a meaningful file.",
    "Deletion works by copying every page except the ones you marked into a new PDF as direct page objects, not by rendering anything as an image. That means the pages you keep retain their original vector text, embedded fonts, and image quality exactly as they were, with text remaining fully selectable and searchable in the result.",
    "This is the inverse operation of PDF Extract Pages — extract keeps only what you select, delete keeps everything except what you select — so whichever is faster for your specific document (marking the few pages you want gone versus marking the few you want to keep) is the one to reach for.",
  ],
  howItWorks: [
    { title: "Upload your PDF", description: "Page thumbnails are rendered for you to review." },
    { title: "Mark pages to remove", description: "Click thumbnails or type a page range like 1-3,5,8-10." },
    { title: "Delete and download", description: "A new PDF with those pages removed and everything else intact is created." },
  ],
  examples: [
    { label: "Removing a blank trailing page", input: "9-page scan, page 9 blank", output: "8-page PDF with the blank page removed" },
  ],
  faqs: [
    { question: "Can I delete every page in the PDF?", answer: "No — the tool requires at least one page to remain, since a PDF with zero pages isn't a valid output. Use Extract Pages instead if you only want a single specific page." },
    { question: "Do the remaining pages lose quality or become non-selectable?", answer: "No — kept pages are copied as PDF objects, not re-rendered as images, so vector text stays selectable, fonts and images stay at original quality." },
    { question: "How do I select several non-consecutive pages to delete?", answer: "Type a page range like \"1-3,5,8-10\" to select pages 1 through 3, plus page 5, plus pages 8 through 10 — or click each thumbnail individually." },
    { question: "What's the difference between Delete Pages and Extract Pages?", answer: "Delete Pages keeps everything except what you mark; Extract Pages keeps only what you mark. They're inverse operations, so pick whichever requires fewer clicks for your document." },
    { question: "Can I delete pages from an encrypted PDF?", answer: "Not directly — run it through PDF Unlock first to remove the password, then delete pages from the resulting file." },
  ],
};

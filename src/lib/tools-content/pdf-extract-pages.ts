import type { ToolContent } from "./types";

export const pdfExtractPagesContent: ToolContent = {
  heroSubtitle: "Pull Out Only the Pages You Need Into a New PDF",
  overview: [
    "Large PDFs often contain far more than you actually need to share — a 40-page report where only the executive summary matters, a scanned book where you only need one chapter, or a signed contract where a reviewer only needs the signature page. Sending the whole file is wasteful and, in some cases, exposes information that has nothing to do with the request. This tool lets you pick exactly the pages you want and produces a clean new PDF containing only those.",
    "You can select pages two ways: clicking individual page thumbnails to toggle them on or off, or typing a page range like \"1-3,5,8-10\" for faster selection across longer documents. Both methods can be combined — type a range to get most of the way there, then fine-tune with individual clicks. Selected pages are highlighted directly on the thumbnail grid so it's always clear exactly what will end up in the output.",
    "The extraction itself copies the selected pages as PDF objects rather than rendering them as images, so text stays fully selectable and searchable, embedded fonts and images come through untouched, and there's no quality loss of any kind. The resulting file's size scales roughly with how many pages you kept, not the size of the original document.",
    "Extracted pages keep their original order relative to each other — page 5 will still come before page 8 in the output even if you selected them out of order — which matters when the sequence of the extracted content is meaningful, like consecutive pages of a multi-page form.",
  ],
  howItWorks: [
    { title: "Upload your PDF", description: "Page thumbnails are rendered for you to review." },
    { title: "Select pages to keep", description: "Click thumbnails or type a page range like 1-3,5,8-10." },
    { title: "Extract and download", description: "A new PDF containing only the selected pages, in original order, is created." },
  ],
  examples: [
    { label: "Pulling out a signature page", input: "22-page contract, page 22 only", output: "1-page PDF with just the signature page" },
    { label: "Extracting a chapter", input: "180-page ebook, pages 45-62", output: "18-page PDF of just that chapter" },
  ],
  faqs: [
    { question: "What format should I use for the page range?", answer: "Comma-separated numbers and ranges, like \"1-3,5,8-10\" — this selects pages 1, 2, 3, 5, 8, 9, and 10. You can also just click individual thumbnails instead." },
    { question: "Does extracting pages reduce quality or make text non-selectable?", answer: "No — pages are copied as PDF objects, not rendered as images, so vector text stays selectable and searchable, and images and fonts come through at original quality." },
    { question: "Will the extracted pages keep their original order?", answer: "Yes — regardless of the order you click or type pages in, the output preserves their original sequence from the source document." },
    { question: "Can I extract pages from a password-protected PDF?", answer: "Not directly — remove the password first using the PDF Unlock tool, then extract pages from the resulting file." },
    { question: "What's the difference between this and PDF Split?", answer: "Extract Pages produces one new PDF from your chosen selection; PDF Split is for dividing an entire document into multiple separate files (for example, one file per page or per fixed page count)." },
  ],
};

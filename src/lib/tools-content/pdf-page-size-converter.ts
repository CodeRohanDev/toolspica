import type { ToolContent } from "./types";

export const pdfPageSizeConverterContent: ToolContent = {
  heroSubtitle: "Convert Any PDF to A4, US Letter, or US Legal",
  overview: [
    "PDFs created in different countries or by different software often use different default page sizes — A4 is standard almost everywhere outside North America, while US Letter and US Legal dominate in the United States and a few other countries. A document sized for the wrong standard can print with odd margins, get cut off, or look inconsistent when combined with other pages, especially when merging documents from multiple sources into one packet.",
    "This tool converts a PDF between A4, US Letter, and US Legal by scaling each page's content proportionally to fit the new target dimensions, then centering the result on the new page size with equal margins on all sides. Because the scaling is proportional (using the smaller of the width or height ratio), content is never stretched or squashed out of its original aspect ratio — a page converted from A4 to Letter looks like a faithfully shrunk or enlarged copy, not a distorted one.",
    "Technically, this uses the PDF's own content-scaling and content-translation operations rather than rendering pages as images, so vector text, embedded fonts, and images are all preserved at full quality through the conversion — nothing is rasterized. The page's dimensions themselves are updated to the exact target size (595.28×841.89pt for A4, 612×792pt for Letter, 612×1008pt for Legal), so the file will now print correctly on paper matching that standard.",
    "Because scaling is proportional, the amount of white space added or removed depends on how different the original size's aspect ratio is from the target — converting between A4 and Letter (which are close in aspect ratio) results in less visible margin change than converting to or from Legal, which is notably taller relative to its width.",
  ],
  howItWorks: [
    { title: "Upload your PDF", description: "The file loads ready for size conversion." },
    { title: "Choose a target size", description: "Pick A4, US Letter, or US Legal from the dropdown." },
    { title: "Convert and download", description: "Every page is proportionally scaled and centered onto the new page size." },
  ],
  examples: [
    { label: "Converting for US printing", input: "A4-sized report", output: "same content resized to fit US Letter (612×792pt), centered with equal margins" },
  ],
  faqs: [
    { question: "Will my content get stretched or distorted?", answer: "No — scaling is always proportional (the same ratio applied to both width and height), so the original aspect ratio is preserved. Content is centered on the new page with equal margins, never stretched to fill it exactly." },
    { question: "Does this work on scanned PDFs made of images?", answer: "Yes — the scaling operation applies to whatever content is on the page, whether it's vector text or a scanned image, since it operates at the page-transform level rather than on specific content types." },
    { question: "Why is there extra white space after converting?", answer: "Because scaling is proportional and centered rather than stretched to exactly fill the new page, some margin is added when the target size's aspect ratio differs from the original — this is expected and preserves your content's true proportions." },
    { question: "Does converting page size reduce quality?", answer: "No — this uses PDF-native scaling and translation operations on the page content directly, not image rendering, so vector text and embedded images keep their original quality regardless of the size change." },
    { question: "Can I convert a password-protected PDF's page size?", answer: "Not directly — remove the password first with PDF Unlock, then convert the resulting file's page size." },
  ],
};

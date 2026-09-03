import type { ToolContent } from "./types";

export const pdfToJpgContent: ToolContent = {
  heroSubtitle: "Turn Every PDF Page Into a High-Quality JPG Image",
  overview: [
    "Sometimes you need a PDF's pages as actual images rather than a document — pasting a page into a slide deck, posting it to a platform that only accepts images, or generating thumbnails for a preview grid. This tool renders every page of a PDF to a JPG image at a resolution well above typical screen density, so the output looks sharp even when viewed larger than the original page size.",
    "Each page is rendered at 2x scale using the same rendering engine that powers PDF viewing in browsers (Mozilla's pdf.js), which faithfully reproduces vector text, embedded images, and graphics exactly as they'd appear in any standards-compliant PDF viewer — not an approximation. The rendered canvas is then exported as a JPEG at 92% quality, a level that balances visual fidelity with reasonable file size.",
    "For a single-page PDF, you get one JPG file directly; for multi-page documents, every page's JPG is bundled into a single ZIP file so you get one download containing all pages, named sequentially (page-1.jpg, page-2.jpg, and so on) so the order is always clear.",
    "Because this rasterizes each page into a fixed image, the output is a snapshot of how the page looks — it's no longer searchable or selectable text, and further edits would need to be made to the original PDF rather than the image. That's the expected trade-off any time a document is converted from a text-based format into a picture format.",
  ],
  howItWorks: [
    { title: "Upload your PDF", description: "Page count is detected automatically." },
    { title: "Click convert", description: "Every page is rendered to a high-quality JPG image." },
    { title: "Download your image(s)", description: "One JPG for a single page, or a ZIP of all pages for multi-page PDFs." },
  ],
  examples: [
    { label: "Converting a one-page flyer", input: "1-page PDF flyer", output: "one high-resolution JPG file" },
    { label: "Converting a multi-page report", input: "8-page PDF report", output: "one ZIP file containing page-1.jpg through page-8.jpg" },
  ],
  faqs: [
    { question: "How sharp will the resulting images be?", answer: "Pages render at 2x scale, which produces noticeably crisper images than a plain screen-resolution capture — sharp enough for most presentation, thumbnail, or web-posting purposes." },
    { question: "Will text in the images still be selectable?", answer: "No — once a page is rendered to a JPG, it becomes a flat picture with no underlying text data, so text is no longer selectable or searchable. This is inherent to converting any document format into an image format." },
    { question: "How do I get all the pages if my PDF has more than one?", answer: "Multi-page PDFs download as a single ZIP file containing one JPG per page, sequentially named so the order is always clear." },
    { question: "Why JPG instead of PNG for this conversion?", answer: "JPG's lossy compression produces much smaller files for photographic or complex page content, which is usually the priority when converting pages to images for sharing — use the PDF to PNG tool instead if you specifically need lossless output." },
    { question: "Can I convert specific pages instead of the whole document?", answer: "This tool converts every page. To convert only a subset, first use PDF Extract Pages to pull out the pages you want, then convert that smaller PDF to JPG." },
  ],
};

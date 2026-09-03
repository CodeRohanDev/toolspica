import type { ToolContent } from "./types";

export const pdfSplitContent: ToolContent = {
  heroSubtitle: "Break a Multi-Page PDF Into Separate Single-Page Files",
  overview: [
    "Sometimes a single PDF needs to become many — a scanned batch of invoices that arrived as one 20-page file but need to be filed individually, or a bundled report where only one section needs to be shared. Splitting by hand usually means extracting pages one at a time in a heavier desktop PDF editor. This tool does the whole file in one pass: upload a multi-page PDF and get back every page as its own separate PDF, bundled into a single ZIP download.",
    "Page thumbnails render right in the browser so you can confirm you've got the right file and see the page count before committing to the split — useful when working with long documents where it's easy to lose track of exactly how many pages are in play.",
    "Splitting works the same way as this project's other page tools: each output page is copied as a genuine PDF page object into its own new document, not rendered as an image, so every split file keeps its original text, fonts, and image quality intact. A 40-page PDF becomes 40 individually valid, fully functional single-page PDFs.",
    "The output is packaged as a ZIP file with pages named sequentially (page-1.pdf, page-2.pdf, and so on), which keeps a large split job organized and makes it easy to identify a specific page afterward without having to open every file to check. All of this happens locally in your browser — the file never leaves your device.",
  ],
  howItWorks: [
    { title: "Upload your PDF", description: "The tool reads the file and shows a thumbnail for every page." },
    { title: "Review the page count", description: "Confirm this is the file you meant to split, and how many pages it has." },
    { title: "Split and download", description: "Every page becomes its own PDF, delivered together as one ZIP file." },
  ],
  examples: [
    { label: "Splitting a batch of scanned invoices", input: "invoices-batch.pdf (12 pages)", output: "invoices-batch-split.zip containing page-1.pdf through page-12.pdf" },
  ],
  faqs: [
    { question: "What format do I get the split pages in?", answer: "A single ZIP file containing one PDF per page, named page-1.pdf, page-2.pdf, and so on in order — so you can extract the whole batch at once or grab an individual page as needed." },
    { question: "Does splitting affect the quality of the pages?", answer: "No — each page is copied as a real PDF page object rather than converted to an image, so text stays selectable and searchable and any embedded images keep their original resolution." },
    { question: "Can I split just a few specific pages instead of every page?", answer: "This tool splits every page into its own file. If you only need a specific subset pulled out together as one document, the PDF Extract Pages tool is the better fit." },
    { question: "What happens with a one-page PDF?", answer: "The split button is disabled for single-page files, since there's nothing to separate — you'd just get back the same file you uploaded." },
    { question: "Will this work on a password-protected PDF?", answer: "No — an encrypted file needs its password removed first. Run it through PDF Unlock, then split the resulting file." },
  ],
};

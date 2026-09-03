import type { ToolContent } from "./types";

export const pdfReaderOnlineContent: ToolContent = {
  heroSubtitle: "Open and View Any PDF Instantly, No Download Required",
  overview: [
    "Not every PDF needs a full desktop reader installed just to glance at it — sometimes you just want to quickly check a document's contents without waiting for a heavyweight application to launch, or you're on a device where installing PDF software isn't practical. This tool opens any PDF file directly in your browser with page navigation and zoom controls, nothing else needed.",
    "Once a file is loaded, you can move between pages with next/previous controls that show your current position (\"Page 3 of 24\"), and zoom in or out in fixed steps from 50% up to 300% to read fine print or get an overview of a page's layout. Each page is rendered fresh at the chosen zoom level using the same rendering engine that powers PDF viewing in web browsers (Mozilla's pdf.js), so text and graphics render crisply at any zoom rather than just scaling up a blurry fixed-size image.",
    "This is a pure viewer — it doesn't edit, annotate, or extract anything from the document, and no file is ever uploaded anywhere; the PDF is read and rendered entirely within your browser tab. That makes it a fast, no-commitment way to check a document's contents, especially for one-off situations where installing or opening a separate application feels like overkill.",
    "Because rendering happens page-by-page on demand rather than all at once, this handles reasonably large documents smoothly — only the currently viewed page needs to be rendered at any given moment, regardless of how many total pages the PDF contains.",
  ],
  howItWorks: [
    { title: "Upload a PDF", description: "The file opens directly in the browser-based viewer." },
    { title: "Navigate pages", description: "Use the next/previous buttons to move through the document." },
    { title: "Zoom as needed", description: "Adjust from 50% to 300% to read details or see the full page." },
  ],
  examples: [
    { label: "Quickly checking a document", input: "a 40-page PDF received by email", output: "instant in-browser viewing with page navigation, no software install" },
  ],
  faqs: [
    { question: "Is my PDF uploaded anywhere to be viewed?", answer: "No — the file is read and rendered entirely in your browser using JavaScript; it's never sent to a server at any point." },
    { question: "Can I edit or annotate the PDF with this tool?", answer: "No — this is a pure viewer for reading and navigating a document. For annotations, highlighting, or edits, use the dedicated PDF Annotator or other PDF Tools instead." },
    { question: "What's the maximum zoom level available?", answer: "Zoom ranges from 50% up to 300% in fixed steps, which covers reading fine print as well as getting a full-page overview." },
    { question: "Does this work on password-protected PDFs?", answer: "No — you'll need to unlock the PDF first (with the PDF Unlock tool, if you know the password) before it can be opened here." },
    { question: "Will large PDFs be slow to open?", answer: "Pages render on demand as you navigate to them rather than all at once, so even lengthy documents open quickly and stay responsive while browsing." },
  ],
};

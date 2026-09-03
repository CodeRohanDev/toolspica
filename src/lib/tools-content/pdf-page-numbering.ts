import type { ToolContent } from "./types";

export const pdfPageNumberingContent: ToolContent = {
  heroSubtitle: "Add Page Numbers in Any Position, Format, or Starting Number",
  overview: [
    "A document without page numbers is awkward to reference in conversation or in print — \"see the third paragraph on the seventh page\" only works if the pages are actually numbered. Word processors add this automatically, but a PDF assembled from scans, exported from a tool without a numbering option, or merged from several separate files often has none. This tool adds page numbers to every page of an existing PDF without needing the original source document.",
    "You control where the number sits — five position presets covering bottom-center, bottom-left, bottom-right, top-center, and top-right — along with what number the count starts at, which matters when a document is a continuation of another (like Volume 2 starting at page 201 instead of page 1). A custom format string supports {n} for the page number and {total} for the total page count, so you can produce anything from a bare \"7\" to a full \"Page 7 of 42\".",
    "Numbers are drawn as real vector text in Helvetica, positioned using the page's actual measured width so centered numbers stay precisely centered regardless of how many digits they have or how the format string is set up. Because they're added as a new text layer on top of the existing page, nothing about the original content changes — only the number is added.",
    "This applies the same position and format consistently across the entire document, incrementing by one per page — there's no support for restarting numbering mid-document (for a table of contents section using roman numerals, for example); for that level of control, a full desktop word processor would be the better tool.",
  ],
  howItWorks: [
    { title: "Upload your PDF", description: "The file loads ready for numbering." },
    { title: "Choose position, start number, and format", description: "Pick where numbers go and how they should read, e.g. \"Page {n} of {total}\"." },
    { title: "Apply and download", description: "Every page gets its number added in the chosen style." },
  ],
  examples: [
    { label: "Standard footer numbering", input: "bottom-center, start at 1, format \"{n}\"", output: "pages numbered 1, 2, 3... centered at the bottom" },
    { label: "Full reference format", input: "bottom-right, format \"Page {n} of {total}\"", output: "\"Page 1 of 24\", \"Page 2 of 24\", etc." },
  ],
  faqs: [
    { question: "Can I make numbering start at something other than 1?", answer: "Yes — set the \"Start at\" field to any number, useful for documents that continue numbering from a previous volume or section." },
    { question: "What placeholders can I use in the format field?", answer: "{n} is replaced with the current page number and {total} with the total page count — combine them freely, e.g. \"{n} / {total}\" or \"Page {n} of {total}\"." },
    { question: "Can different sections of the document have different number formats?", answer: "No — one format and position is applied consistently across every page in a single pass. For section-specific numbering, split the document first and number each section separately." },
    { question: "Will page numbers cover up existing content near the edges?", answer: "Numbers are placed with a fixed margin near the page edge — if your document already has content very close to that edge, it's worth previewing the result before relying on it for a document with tight margins." },
    { question: "Can I number pages in a locked PDF?", answer: "Not directly — run it through PDF Unlock first to remove the password, then apply page numbers to the resulting file." },
  ],
};

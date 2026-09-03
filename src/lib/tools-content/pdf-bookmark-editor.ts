import type { ToolContent } from "./types";

export const pdfBookmarkEditorContent: ToolContent = {
  heroSubtitle: "Add a Clickable Table of Contents to Any PDF",
  overview: [
    "Long PDFs without bookmarks force readers to scroll or page-hunt for the section they need, while a document with a proper bookmark outline lets anyone jump straight to a chapter or section from the navigation panel any PDF reader provides. Bookmarks (technically called \"outlines\" in the PDF specification) are the same feature that generates the clickable sidebar table of contents in most PDF viewers, and this tool adds them to a PDF that doesn't already have them.",
    "You add each bookmark by giving it a title and the page number it should jump to — \"Introduction\" pointing to page 1, \"Chapter 2\" pointing to page 15, and so on — building up an ordered list of navigation entries. Each entry appears in your list before saving, so you can review the full outline and remove any you added by mistake before committing.",
    "This is built using the PDF specification's actual outline object structure — a linked list of outline items, each pointing to a destination page — rather than a workaround or approximation. That means the resulting bookmarks show up in the standard navigation panel of any PDF reader (Adobe Acrobat, browser-based PDF viewers, mobile PDF apps) exactly the way bookmarks from any other PDF-generating software would.",
    "This creates a flat, single-level bookmark list rather than nested sub-bookmarks (a \"Chapter 2\" bookmark with indented sub-sections underneath it, for example) — for most documents a flat list of major sections is sufficient, but deeply hierarchical navigation structures aren't supported by this simpler tool.",
  ],
  howItWorks: [
    { title: "Upload your PDF", description: "The file loads ready for bookmarks to be added." },
    { title: "Add each bookmark", description: "Enter a title and target page number, one entry at a time." },
    { title: "Save and download", description: "A proper clickable bookmark outline is added to the PDF." },
  ],
  examples: [
    { label: "Adding chapter navigation", input: "\"Chapter 1\" → page 1, \"Chapter 2\" → page 12, \"Appendix\" → page 40", output: "PDF with a 3-entry clickable outline in the reader's navigation panel" },
  ],
  faqs: [
    { question: "Will the bookmarks show up in any PDF reader, or just this tool?", answer: "They show up in any standards-compliant PDF reader's navigation panel — this tool builds a real PDF outline structure, the same underlying feature every PDF-generating application uses for bookmarks." },
    { question: "Can I create nested or hierarchical bookmarks?", answer: "No — this tool creates a flat list of bookmark entries, not nested sub-sections. For most documents a flat list of major sections is sufficient, but deeply hierarchical outlines aren't supported here." },
    { question: "What happens if I enter a page number that doesn't exist?", answer: "The page number is automatically clamped to a valid page within the document, so it can't point to a page beyond the actual page count." },
    { question: "Can I add bookmarks to a PDF that already has some?", answer: "This tool adds a new bookmark outline; if the document already had bookmarks, they may be replaced by the new set rather than merged with it, since only one outline structure exists per document." },
    { question: "Does adding bookmarks change the visible page content?", answer: "No — bookmarks are purely a navigation aid stored separately from page content; nothing about how the pages look or read is affected." },
  ],
};

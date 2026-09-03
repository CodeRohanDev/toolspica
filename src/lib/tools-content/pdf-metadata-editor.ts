import type { ToolContent } from "./types";

export const pdfMetadataEditorContent: ToolContent = {
  heroSubtitle: "Edit Title, Author, Subject & Keywords Stored Inside a PDF",
  overview: [
    "Every PDF carries a small block of metadata alongside its visible content — a title, author, subject, and keywords that show up in file properties dialogs, search results, and some document management systems, but never in the page content itself. This metadata is often wrong or missing entirely: a title that's just a default filename like \"Untitled-3\", an author field left over from whoever's computer generated the file, or no metadata at all. This tool reads and lets you rewrite all of it.",
    "When you upload a PDF, the tool immediately reads its existing Title, Author, Subject, and Keywords fields (if present) and pre-fills the form with whatever is already there, so you can see exactly what's currently stored before changing anything. Keywords are edited as a single comma-separated field for convenience and split back into individual keyword entries on save.",
    "Saving updates these four fields directly in the PDF's document information dictionary — a standard, universally-supported part of the PDF format — and also refreshes the modification date to the current time. None of the visible page content, page count, or file structure is touched; this is purely a metadata edit, so the operation is fast regardless of document size.",
    "Accurate metadata matters more than it might seem: search tools and document management systems often index by these fields, screen readers and accessibility tools can use the title, and a clear author/subject makes a file easier to identify later in a folder full of similarly-named PDFs.",
  ],
  howItWorks: [
    { title: "Upload your PDF", description: "Existing Title, Author, Subject, and Keywords (if any) are read and shown." },
    { title: "Edit the fields", description: "Update any of the four metadata fields as needed." },
    { title: "Save and download", description: "The updated metadata is written into the PDF, and the modification date refreshes." },
  ],
  examples: [
    { label: "Fixing a generic title", input: "Title: \"Untitled-3\"", output: "Title: \"Q3 2026 Board Report\"" },
  ],
  faqs: [
    { question: "Does editing metadata change how the document looks or reads?", answer: "No — metadata is separate from page content entirely. Editing it doesn't touch text, images, page count, or layout in any way." },
    { question: "Where does this metadata actually show up?", answer: "In file properties dialogs (right-click → Properties in most operating systems), some PDF viewer title bars, search indexes, and document management systems — never directly on the visible page." },
    { question: "What happens to keywords I don't separate with commas correctly?", answer: "Keywords are split on commas and trimmed of extra whitespace, so \"finance, report , 2026\" becomes three clean keyword entries: \"finance\", \"report\", \"2026\"." },
    { question: "Does this update the file's creation date too?", answer: "No — only the modification date is refreshed to the current time on save. The original creation date, if present, is left untouched." },
    { question: "Can I clear a metadata field entirely?", answer: "Yes — leave the field blank before saving, and that field will be set to empty in the output PDF." },
  ],
};

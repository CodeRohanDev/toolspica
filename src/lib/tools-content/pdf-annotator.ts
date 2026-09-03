import type { ToolContent } from "./types";

export const pdfAnnotatorContent: ToolContent = {
  heroSubtitle: "Highlight and Draw Freehand Notes Directly on Any PDF Page",
  overview: [
    "Marking up a PDF — highlighting a key passage, circling an important figure, scribbling a quick note in the margin — is something most PDF viewers make surprisingly awkward without a paid subscription or specific annotation software. This tool provides two freehand drawing tools, a highlighter and a pen, that let you mark directly on any page, per page, before saving your marks permanently into the document.",
    "The highlighter draws a thick, semi-transparent yellow stroke that sits over content without obscuring it, ideal for marking passages the way a physical highlighter would; the pen draws a thin, solid red stroke suited to circling, underlining, or writing short notes freehand. Both are drawn by moving your pointer or finger across the page preview, and each page can have any number of separate strokes in either tool, viewable and manageable through a per-page dropdown selector.",
    "When you save, only pages with actual marks on them are rendered to an image with those strokes baked directly into the pixels — pages with no annotations are copied through as their original, unmodified content, preserving their selectable text exactly as it was. This selective approach means a 50-page document with notes on only three pages keeps 47 pages fully intact and searchable.",
    "As with other tools in this category that flatten marks into pixels (Redact, Flatten), this is a deliberate, permanent design: once saved, annotations become part of the page image itself rather than a removable, toggleable overlay the way annotations in a dedicated PDF annotation format would work — this guarantees your marks display identically in every viewer, at the cost of being unable to edit or remove them later without starting over from the original file.",
  ],
  howItWorks: [
    { title: "Upload your PDF", description: "Page previews are rendered for you to mark up." },
    { title: "Highlight or draw on pages", description: "Choose highlighter or pen and mark directly on any page." },
    { title: "Save and download", description: "Marked pages have your annotations baked in; unmarked pages stay untouched." },
  ],
  examples: [
    { label: "Highlighting key clauses", input: "5-page contract, 2 clauses highlighted on page 3", output: "same 5-page PDF, page 3 shows the highlights, pages 1-2 and 4-5 unchanged" },
  ],
  faqs: [
    { question: "Can I remove or edit an annotation after saving?", answer: "Not from the saved file — annotations are baked permanently into the page image on save, guaranteeing they display identically everywhere, but that means they can't be toggled off or edited afterward. Keep your original file if you might need an unmarked version later." },
    { question: "Will pages without any annotations lose their selectable text?", answer: "No — only pages you actually mark are rendered to an image. Every page with no annotations is copied through unchanged, keeping its original selectable, searchable text." },
    { question: "What's the difference between the highlighter and pen tools?", answer: "The highlighter draws a thick, semi-transparent yellow stroke suited to marking passages without obscuring the text; the pen draws a thin, solid red stroke better suited to circling, underlining, or freehand notes." },
    { question: "Can I clear all marks on a page and start over?", answer: "Yes — the \"Clear page\" button removes all strokes on the currently selected page, letting you redo your annotations on that page before saving." },
    { question: "Can I annotate a password-protected PDF?", answer: "Not directly — remove the password first with PDF Unlock, then annotate the resulting file." },
  ],
};

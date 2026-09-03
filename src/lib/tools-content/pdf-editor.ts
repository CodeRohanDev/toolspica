import type { ToolContent } from "./types";

export const pdfEditorContent: ToolContent = {
  heroSubtitle: "Add Text Anywhere on a PDF, Right in Your Browser",
  overview: [
    "Editing a PDF usually means installing Acrobat or uploading a sensitive document to some website that promises to 'process it securely.' This editor skips both — upload a PDF, click anywhere on any page to drop in a text box, type what you need, and download the result. Everything happens locally using pdf-lib and pdfjs, both running entirely inside your browser's WebAssembly and JavaScript sandbox.",
    "The tool renders each page as a preview so you can see exactly where your text will land, then bakes real, embedded text onto the original PDF at export time — not a flattened image overlay. That means the output stays a genuine, lightweight PDF with your additions as first-class text objects, positioned using the same coordinate system Acrobat itself uses.",
    "It's built for quick, targeted edits: filling in a missing field, adding a note, correcting a typo's replacement text, or annotating a contract before sending it back. It isn't a full desktop-class PDF editor — there's no support yet for editing existing text in place or reflowing paragraphs — but for adding new text to any page, it's fast, free, and never touches a server.",
  ],
  howItWorks: [
    { title: "Upload your PDF", description: "Pages render as an interactive preview." },
    { title: "Click to place text", description: "Click anywhere on a page, type your text, and place it." },
    { title: "Download the edited PDF", description: "All your additions are baked in as real, embedded text." },
  ],
  examples: [
    { label: "Filling in a missing field", input: "A scanned form with a blank date line", output: "Same PDF with a date typed directly onto the blank" },
  ],
  faqs: [
    { question: "Can I edit text that's already in the PDF?", answer: "Not yet — this tool adds new text on top of the page. Existing text can't be modified or deleted in place." },
    { question: "Is my PDF uploaded anywhere?", answer: "No. Rendering, editing, and saving all happen locally in your browser using pdf-lib and pdfjs." },
    { question: "Will the added text be selectable and searchable?", answer: "Yes — it's drawn as real embedded text, not a flattened image, so it stays selectable and searchable in the final PDF." },
    { question: "Can I undo a placed text box?", answer: "Yes — use \"Clear all\" to remove every placement on the current session and start over before exporting." },
    { question: "Does this work on scanned (image-only) PDFs?", answer: "Yes — you can still place text on top of a scanned page; it just won't be able to edit the scanned content itself, only add new text over it." },
  ],
};

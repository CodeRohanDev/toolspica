import type { ToolContent } from "./types";

export const pdfMergeContent: ToolContent = {
  heroSubtitle: "Combine Multiple PDFs Into One File, in Any Order",
  overview: [
    "Merging PDFs is one of those tasks that comes up constantly in ordinary work — combining a cover letter with a resume, stitching together scanned receipts for an expense report, or assembling a set of separately-exported chapters into one manuscript. Doing it without the right tool usually means opening a PDF printer, print-to-file dialogs, or installing a desktop app just for a one-off task. This tool skips all of that: pick your files, arrange them, and get one combined PDF back.",
    "Under the hood, this works by copying each page from every source file directly into a new PDF document, preserving the original vector content, embedded fonts, and images exactly as they were — nothing gets rasterized or re-rendered, so text stays selectable and searchable and image quality is untouched. Because it's a direct page-object copy rather than a visual re-render, the merged file is typically close to the sum of the original files' sizes, not smaller or larger.",
    "You can add as many PDFs as you like and reorder them with the up/down controls before merging — the order in the list is the order pages appear in the final file. This matters for anything where sequence is meaningful, like a multi-part contract or an application packet where a reviewer expects documents in a specific order.",
    "Everything happens locally in your browser using the pdf-lib library — your files are never uploaded to a server. That matters for anything sensitive: signed contracts, financial statements, medical records, or anything else you wouldn't want passing through a third party's infrastructure just to combine a few pages together.",
  ],
  howItWorks: [
    { title: "Add your PDFs", description: "Select or drag in two or more PDF files." },
    { title: "Reorder if needed", description: "Use the up/down arrows to set the order pages should appear in." },
    { title: "Merge and download", description: "All pages are combined into a single new PDF, ready to save." },
  ],
  examples: [
    { label: "Combining an application packet", input: "cover-letter.pdf + resume.pdf + references.pdf", output: "one merged.pdf with all pages in the order you set" },
  ],
  faqs: [
    { question: "Does merging PDFs reduce image or text quality?", answer: "No — pages are copied as PDF objects, not re-rendered as images, so vector text, embedded fonts, and images come through at their original quality with text remaining fully selectable and searchable." },
    { question: "Is there a limit to how many PDFs I can merge?", answer: "No hard limit is enforced by the tool itself, though very large batches will take longer and use more browser memory since everything is processed on your device rather than a server." },
    { question: "Can I merge password-protected PDFs?", answer: "Not directly — an encrypted source PDF will fail to load. Run it through the PDF Unlock tool first to remove the password, then merge the result." },
    { question: "Will bookmarks or forms from the original files carry over?", answer: "Page content, fonts, and images carry over, but interactive elements like bookmarks and fillable form fields from the source files are not preserved in the merge — only the visual page content." },
    { question: "Does the order in the upload list matter?", answer: "Yes — pages appear in the final PDF in exactly the order the files are listed, which you control with the up/down reorder buttons before merging." },
  ],
};

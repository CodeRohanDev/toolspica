import type { ToolContent } from "./types";

export const wordDocumentViewerContent: ToolContent = {
  heroSubtitle: "Preview a Word Document's Layout Without Opening Word",
  overview: [
    "Checking what's inside a .docx file — confirming formatting, reviewing a document someone sent, or previewing a template — usually requires Microsoft Word or a compatible app installed, which isn't always available on every device.",
    "This tool renders a genuine visual preview of a Word document directly in your browser — paragraphs, headings, tables, and text formatting laid out the way the document is actually structured, not just extracted plain text.",
    "Rendering fidelity is good for standard documents but isn't pixel-perfect for every possible Word feature — complex headers/footers, unusual styles, and some advanced layout features may render slightly differently than they would in Microsoft Word itself. For most everyday documents (letters, reports, resumes), the preview closely matches the original.",
  ],
  howItWorks: [
    { title: "Upload a .docx file", description: "Choose a Word document from your device." },
    { title: "Review the rendered preview", description: "See the document's actual layout, not just raw text." },
    { title: "Scroll through the full document", description: "The full content renders in a scrollable preview area." },
  ],
  examples: [
    {
      label: "Typical use",
      input: "A formatted resume.docx",
      output: "A visual preview showing headings, bullet points, and layout as they appear in the document.",
    },
  ],
  faqs: [
    {
      question: "Does this show tables and formatting, not just plain text?",
      answer:
        "Yes — this renders an actual visual preview including paragraph formatting, headings, and tables, unlike a plain-text extraction tool that strips all formatting away.",
    },
    {
      question: "Will the preview look exactly like it does in Microsoft Word?",
      answer:
        "Very close for standard documents, but not guaranteed pixel-perfect for every feature — complex headers/footers and some advanced styling may render slightly differently than in Word itself.",
    },
    {
      question: "Can I edit the document here?",
      answer:
        "No — this is a read-only preview tool. Open the file in Word, Google Docs, or another editor to make changes.",
    },
    {
      question: "Is my document uploaded to a server?",
      answer:
        "No — rendering happens entirely in your browser. Nothing is uploaded anywhere.",
    },
  ],
};

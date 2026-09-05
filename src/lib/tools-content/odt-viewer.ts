import type { ToolContent } from "./types";

export const odtViewerContent: ToolContent = {
  heroSubtitle: "Read an OpenDocument (.odt) File's Content and Structure",
  overview: [
    "OpenDocument Text (.odt) files — produced by LibreOffice, OpenOffice, and Google Docs' export options — aren't directly readable without compatible office software installed, which not every device or situation has available.",
    "This tool reads a .odt file's actual content structure — headings, paragraphs, and list items — and displays it with that structure preserved, so headings appear as headings and lists as lists, rather than one undifferentiated block of text.",
    "This preserves document structure (what's a heading versus a paragraph versus a list item) rather than full visual page layout — fonts, exact spacing, and inline formatting like bold or italic aren't rendered, so treat this as a structural content reader rather than a pixel-accurate document viewer.",
  ],
  howItWorks: [
    { title: "Upload a .odt file", description: "Choose an OpenDocument Text file from your device." },
    { title: "Review the structured content", description: "Headings and paragraphs are shown with their original structure." },
    { title: "Scroll through the full document", description: "The complete content is shown in a scrollable view." },
  ],
  examples: [
    {
      label: "Typical use",
      input: "A LibreOffice Writer document with headings and body text",
      output: "The headings render larger and bold, with paragraph text below in normal weight.",
    },
  ],
  faqs: [
    {
      question: "Does this render exact page layout and fonts?",
      answer:
        "No — this preserves the document's structural content (headings, paragraphs, lists), not full visual page layout, fonts, or inline text formatting like bold and italic.",
    },
    {
      question: "Can this open .doc or .docx files instead?",
      answer:
        "No — this is specifically for .odt (OpenDocument Text) files. For .docx files, use this site's Word Document Viewer tool instead, which renders actual visual layout.",
    },
    {
      question: "Why use this instead of installing LibreOffice?",
      answer:
        "For a quick check of a document's content without installing office software, especially on a device where you don't have (or don't want to install) a compatible app.",
    },
    {
      question: "Is my document uploaded to a server?",
      answer:
        "No — the file is read and parsed entirely in your browser. Nothing is uploaded anywhere.",
    },
  ],
};

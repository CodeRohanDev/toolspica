import type { ToolContent } from "./types";

export const docxToTxtContent: ToolContent = {
  heroSubtitle: "Extract Plain Text from a Word Document",
  overview: [
    "A .docx file is actually a ZIP archive containing XML markup describing every formatting detail — fonts, styles, page layout — wrapped around the actual text content. When all you need is the raw text (to paste into a plain-text field, feed into a script, or strip out formatting from a document someone sent you), opening Word just to copy-paste the content is more effort than the task needs.",
    "This tool reads an uploaded .docx file directly in your browser, unpacks it as the ZIP archive it actually is, parses the underlying document XML, and extracts just the text content, paragraph by paragraph, with formatting, styles, and layout completely stripped away.",
    "This extracts body text only — tables, headers, footers, footnotes, and embedded images are not included in the output, since those live in separate parts of the document's internal structure beyond the main body text this tool targets. For a document that's primarily tables or has significant content in headers/footers, some content may not appear in the extracted text.",
  ],
  howItWorks: [
    { title: "Upload a .docx file", description: "Choose a Word document from your device." },
    { title: "Review the extracted text", description: "See the plain text content, formatting stripped." },
    { title: "Copy the result", description: "Copy the plain text for use anywhere formatting isn't wanted." },
  ],
  examples: [
    {
      label: "Simple document",
      input: "A .docx file with two paragraphs of formatted text",
      output: "Plain text with the same two paragraphs, no bold/italic/font formatting.",
    },
  ],
  faqs: [
    {
      question: "Does this extract text from tables in the document?",
      answer:
        "No — this extracts the main body paragraph text. Content inside tables, headers, footers, and footnotes lives in separate parts of the document's structure and isn't included in the output.",
    },
    {
      question: "Will this work on older .doc files (not .docx)?",
      answer:
        "No — .doc (the older Word format) uses a completely different, binary file structure, not the ZIP/XML format .docx uses. This tool only supports .docx files.",
    },
    {
      question: "Is any formatting preserved, like bold or bullet points?",
      answer:
        "No — the output is completely plain text with all formatting, including bold, italics, bullet points, and headings, stripped away, leaving just the raw words.",
    },
    {
      question: "Is my document uploaded to a server?",
      answer:
        "No — the file is unpacked and parsed entirely in your browser. Nothing is uploaded anywhere.",
    },
  ],
};

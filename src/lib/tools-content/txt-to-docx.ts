import type { ToolContent } from "./types";

export const txtToDocxContent: ToolContent = {
  heroSubtitle: "Convert Plain Text into a Downloadable Word Document",
  overview: [
    "Plain text is fine for a script or a note to yourself, but many workflows — submitting a document, sharing something a non-technical colleague expects to open in Word, or a template that needs to be a .docx by convention — specifically require a real Word document rather than a .txt file.",
    "This tool takes text typed or pasted directly into a text box and generates a genuine .docx file — each line of your input becomes its own paragraph in the resulting Word document, downloadable immediately with no need to open Microsoft Word or any word processor at all.",
    "This produces a plain, unformatted document — normal paragraph text with default styling, no headings, bold text, or custom fonts applied automatically. For a document that needs specific formatting, open the generated .docx in Word or Google Docs afterward and apply formatting there, since this tool focuses purely on the text-to-DOCX conversion step.",
  ],
  howItWorks: [
    { title: "Type or paste your text", description: "Enter the content you want in the Word document." },
    { title: "Download as .docx", description: "Click the button to generate and download a real Word file." },
    { title: "Open and format further", description: "Open in Word or Google Docs to add any additional formatting needed." },
  ],
  examples: [
    {
      label: "Simple text",
      input: "Hello world.\nThis is a second paragraph.",
      output: "document.docx — a two-paragraph Word document.",
    },
  ],
  faqs: [
    {
      question: "Does this preserve any text formatting from what I paste?",
      answer:
        "No — this generates plain paragraph text with default Word styling. Each line of input becomes its own paragraph, but bold, italics, or other formatting from a source document isn't carried over since plain text doesn't encode that information.",
    },
    {
      question: "Does the generated file open correctly in Word and Google Docs?",
      answer:
        "Yes — the output is a standard .docx file using the same format Word itself produces, so it opens correctly in Microsoft Word, Google Docs, LibreOffice Writer, and Apple Pages.",
    },
    {
      question: "How are blank lines in my input handled?",
      answer:
        "Each line, including blank ones, becomes its own paragraph — so blank lines in your input appear as blank paragraphs (empty lines) in the resulting document, preserving your original spacing.",
    },
    {
      question: "Is my text sent anywhere?",
      answer:
        "No — the .docx file is generated entirely in your browser. Nothing you type is uploaded to a server.",
    },
  ],
};

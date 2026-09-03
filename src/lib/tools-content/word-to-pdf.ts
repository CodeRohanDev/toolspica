import type { ToolContent } from "./types";

export const wordToPdfContent: ToolContent = {
  heroSubtitle: "Convert a .docx File to PDF Directly in Your Browser",
  overview: [
    "Sharing a Word document as a PDF is standard practice for anything that shouldn't be casually edited after the fact — a final contract, a resume, a report going out for review — but doing that conversion usually means opening Word itself or uploading the file to some conversion website. This tool reads a .docx file directly and rebuilds its text content as a paginated PDF, entirely in your browser, without Word or any server involved.",
    "Since a .docx file is actually a ZIP archive containing XML documents (the Word Open XML format), this tool includes a from-scratch ZIP reader that opens the archive, decompresses its contents (supporting both the stored and standard DEFLATE compression methods real-world .docx files use, verified against genuinely DEFLATE-compressed test files), and parses the document's main XML file to extract paragraph text and detect headings from the paragraph style information Word embeds.",
    "Extracted paragraphs are laid out into a properly paginated PDF with word-wrapped text sized to fit standard page margins, using a bold, larger font for detected headings and a regular font for body text — automatically flowing onto additional pages as needed so nothing gets cut off regardless of document length.",
    "This is a text-only, basic conversion: images, tables, columns, precise fonts, and exact formatting from the original Word document are not reconstructed, only the paragraph text with simple heading detection. For a document where visual fidelity matters more than a quick, private, no-upload conversion, printing directly from Word to PDF will produce a more faithful result — but for getting a readable PDF out of a .docx file's text content without opening Word at all, this handles it entirely on your device.",
  ],
  howItWorks: [
    { title: "Upload your .docx file", description: "The Word document's internal XML is read directly." },
    { title: "Text and headings are extracted", description: "Paragraphs are pulled out with basic heading detection from paragraph styles." },
    { title: "Download the PDF", description: "A paginated PDF is built from the extracted text, wrapped to fit the page." },
  ],
  examples: [
    { label: "Converting a Word report to PDF", input: "8-page .docx report", output: "a paginated PDF with the same text content and headings, ready to share" },
  ],
  faqs: [
    { question: "Will images and tables from my Word document appear in the PDF?", answer: "No — this is a text-only conversion. Images, tables, columns, and precise formatting from the original .docx aren't reconstructed; only the paragraph text with basic heading detection is carried over." },
    { question: "Is my Word document uploaded to a server for this conversion?", answer: "No — the .docx file's internal ZIP archive is read and parsed entirely in your browser using a built-in ZIP reader; nothing is uploaded anywhere." },
    { question: "How does the tool know what's a heading versus body text?", answer: "It reads the paragraph style information Word embeds in the document's XML (looking for style names containing \"Heading\" or \"Title\", or bold short paragraphs) — this works well for documents that used Word's built-in heading styles, less reliably for documents using only manual bold/large text formatting." },
    { question: "What .docx compression formats are supported?", answer: "Both the stored (uncompressed) and standard DEFLATE compression methods that real-world .docx files use — this was verified against a genuinely DEFLATE-compressed test file to confirm compatibility with files actually produced by Word." },
    { question: "Can I convert an older .doc file (not .docx)?", answer: "No — this tool reads the modern Word Open XML (.docx) format specifically. Older binary .doc files use a completely different, non-ZIP-based internal format and aren't supported." },
  ],
};

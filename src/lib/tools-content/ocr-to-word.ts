import type { ToolContent } from "./types";

export const ocrToWordContent: ToolContent = {
  heroSubtitle: "Recognize Text From an Image and Save Directly as Word",
  overview: [
    "Getting text out of a photo or scan and into an editable document usually takes two steps — extract the text, then paste it into a word processor. This tool combines both: recognize the text with a real OCR engine (Tesseract, compiled to WebAssembly, running in your browser) and save the result directly as a genuine, editable .docx file.",
    "Each recognized line of text becomes its own paragraph in the output document, using the same .docx construction this site's PDF Tools use — a real Word Open XML file that opens natively in Microsoft Word, Google Docs, or LibreOffice, no conversion warnings.",
    "This carries over text content only, not the original image's layout, fonts, or formatting — a plain-text reflow into editable paragraphs, honestly framed the same way as this site's other text-extraction tools.",
    "Everything happens on your device: the image is decoded, recognized, and converted to a Word document entirely within your browser, with no upload at any point.",
  ],
  howItWorks: [
    { title: "Upload your image", description: "Any photo or scan with visible text." },
    { title: "Text is recognized locally", description: "Each line becomes its own paragraph." },
    { title: "Download the Word document", description: "A genuine .docx file, ready to edit." },
  ],
  examples: [
    { label: "Making a scanned note editable", input: "photo of a printed note", output: "a .docx file with the recognized text as paragraphs" },
  ],
  faqs: [
    { question: "Will the Word document preserve the image's layout?", answer: "No — this is a plain-text reflow; each recognized line becomes a paragraph, without the original image's layout, columns, or formatting." },
    { question: "Is my image uploaded to a server?", answer: "No — recognition and the .docx file construction both happen entirely in your browser." },
    { question: "Will the resulting file open correctly in Microsoft Word?", answer: "Yes — it's a genuine .docx file with standard Word Open XML structure, opening natively in Word, Google Docs, or LibreOffice." },
    { question: "Does this work on multi-column text?", answer: "Not reliably — text is recognized in reading order without column awareness, so multi-column source images may interleave text unexpectedly." },
    { question: "Can I choose a different output format?", answer: "For plain text or copying, use the Image to Text tool instead — this one is specifically for direct Word document output." },
  ],
};

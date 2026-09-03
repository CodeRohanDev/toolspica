import type { ToolContent } from "./types";

export const tableOcrContent: ToolContent = {
  heroSubtitle: "Recognize a Photographed Table and Export It to Excel",
  overview: [
    "A table captured in a photo or screenshot — a printed report, a whiteboard grid, a scanned data sheet — is locked in image pixels with no way to copy individual cells. This tool recognizes the text and its exact position on the page, then reconstructs rows and columns from that position data, the same heuristic technique used by this site's PDF table tools.",
    "Recognition (via Tesseract, compiled to WebAssembly) returns not just plain text but each word's precise bounding box location. Words are clustered into rows by shared vertical position, then split into columns wherever the horizontal gap between adjacent words is unusually large relative to normal spacing — recovering tabular structure purely from where the text sits, since images have no inherent concept of table cells.",
    "The reconstructed table is written directly into a genuine .xlsx Excel file, so it opens with real spreadsheet structure — rows and columns already in place — rather than needing manual reformatting after the fact.",
    "This works best on tables with clear, evenly-spaced columns and reasonably sharp, well-lit source images — tightly-packed columns, low resolution, or a skewed photo angle can cause adjacent columns to merge incorrectly, since the technique relies on consistent spacing to detect column boundaries.",
  ],
  howItWorks: [
    { title: "Upload a photo of a table", description: "Works on printed tables, whiteboards, or screenshots." },
    { title: "Rows and columns are reconstructed", description: "Word positions are clustered into rows, then split into cells." },
    { title: "Download as Excel", description: "A genuine .xlsx file with the table's structure intact." },
  ],
  examples: [
    { label: "Digitizing a printed data table", input: "photo of a 3-column printed table", output: "an .xlsx file with matching rows and columns" },
  ],
  faqs: [
    { question: "How accurate is the table reconstruction?", answer: "Best on tables with clear, evenly-spaced columns and a sharp, well-lit photo — tightly-packed columns or a skewed angle can cause adjacent columns to merge, since the heuristic relies on consistent spacing to detect boundaries." },
    { question: "Is my image uploaded anywhere?", answer: "No — recognition and table reconstruction both run entirely in your browser via WebAssembly." },
    { question: "Will merged or multi-line cells work correctly?", answer: "Not reliably — the reconstruction groups by row position, so a cell with wrapped text may split across multiple output rows, since there's no explicit cell-boundary data in an image to reference." },
    { question: "Does this work on a photo of a whiteboard table?", answer: "Yes, as long as the grid lines and text are reasonably clear — handwritten whiteboard text will have the same accuracy limits as our Handwriting OCR tool." },
    { question: "Can I get CSV instead of Excel?", answer: "This tool outputs directly to .xlsx — for CSV output from a table image, extract the text with Image to Text and reformat manually, or use the PDF to CSV tool if your source is a PDF instead of an image." },
  ],
};

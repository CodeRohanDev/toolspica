import type { ToolContent } from "./types";

export const pdfToCsvContent: ToolContent = {
  heroSubtitle: "Pull Tables Out of a PDF Into Clean, Usable CSV Rows",
  overview: [
    "Data trapped in a PDF table — a financial statement, a report appendix, an exported list — is genuinely painful to work with, since copy-pasting from a PDF viewer often garbles column alignment or merges cells together unpredictably. This tool reconstructs tabular structure from a PDF's text automatically and outputs it as proper CSV, ready to open in a spreadsheet.",
    "Since PDF has no concept of tables or cells at the format level (it only knows where individual pieces of text sit on a page), reconstruction works by clustering text into rows based on shared vertical position, then splitting each row into separate cells wherever the horizontal gap between consecutive pieces of text is noticeably larger than the typical character spacing in that row — a well-established technique for recovering tabular layout purely from position data, and one that was verified against a real generated test table before shipping.",
    "This works well on clean, evenly-spaced tables — the kind produced by spreadsheet exports, invoicing software, and most well-formatted reports — since consistent spacing is exactly what the gap-detection heuristic relies on. Tables with unusual spacing, merged cells, multi-line cell content, or inconsistent column alignment will produce a more approximate result, since there's no ground-truth table structure to reference, only the visual positions of text on the page.",
    "Every page's detected rows are combined into one continuous CSV output, properly escaping any cell content that itself contains commas or quotation marks so the resulting file opens correctly in Excel, Google Sheets, or any other spreadsheet application without corrupted columns.",
  ],
  howItWorks: [
    { title: "Upload your PDF", description: "The file's pages are scanned for tabular text." },
    { title: "Rows and columns are reconstructed", description: "Text is grouped into rows by position, then split into cells by spacing gaps." },
    { title: "Copy or download the CSV", description: "Get clean, properly-escaped CSV ready for any spreadsheet." },
  ],
  examples: [
    { label: "Extracting a financial table", input: "PDF page with a 3-column expense table", output: "CSV rows matching the original table's structure exactly" },
  ],
  faqs: [
    { question: "How accurate is the table reconstruction?", answer: "Very accurate on clean, evenly-spaced tables (verified against a real test table with perfect reconstruction), since the technique relies on consistent spacing to detect column boundaries — irregular or unusually-formatted tables will be more approximate." },
    { question: "Will multi-line cells be handled correctly?", answer: "Not reliably — the reconstruction groups text by row position, so a cell whose content wraps across multiple lines may be split into separate rows rather than kept as one cell, since there's no explicit cell-boundary data in a PDF to reference." },
    { question: "Does this work on scanned image tables?", answer: "No — this reads embedded text positions, so it requires a PDF with a real text layer. A scanned image of a table has no text data to extract; a dedicated OCR tool would be needed first." },
    { question: "What happens with multiple tables across several pages?", answer: "Every page's detected rows are combined into one continuous CSV output — if you need each table kept separate, extract the relevant pages first with PDF Extract Pages and convert each extracted set individually." },
    { question: "Are commas and quotes inside cell values handled correctly?", answer: "Yes — any cell containing a comma or quotation mark is automatically wrapped and escaped per standard CSV rules, so the file opens correctly in spreadsheet software without misaligned columns." },
  ],
};

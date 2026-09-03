import type { ToolContent } from "./types";

export const pdfToExcelContent: ToolContent = {
  heroSubtitle: "Pull Tables From a PDF Into a Real, Editable Excel File",
  overview: [
    "Table data locked inside a PDF is awkward to work with directly — you generally want it in a spreadsheet to sort, filter, calculate, or chart it. This tool reconstructs tabular structure from a PDF's text and writes it directly into a genuine .xlsx Excel file, so you can open it straight in Excel, Google Sheets, or LibreOffice Calc and start working with it as real spreadsheet data.",
    "Table reconstruction uses the exact same row/column position-heuristic engine as the PDF to CSV tool — text is clustered into rows by shared vertical position, then split into cells wherever the horizontal gap between adjacent pieces of text is noticeably larger than the typical spacing in that row. This was verified against a real generated 3×3 test table, producing perfect row and column reconstruction before shipping.",
    "The difference from PDF to CSV is the output format itself: rather than a plain-text CSV file, this writes a genuine Excel Open XML (.xlsx) spreadsheet from scratch — a real ZIP-and-XML structure with a proper worksheet, matching exactly what Excel itself produces — so it opens with correct cell references and grid structure immediately, no import step required.",
    "As with the CSV version, this works best on clean, evenly-spaced tables where consistent spacing gives the gap-detection heuristic a reliable signal — tables with merged cells, multi-line content, or unusual spacing will reconstruct more approximately. Only cell values are written; no formulas, cell formatting, colors, or charts are generated, since there's no such information in the original PDF to reconstruct in the first place.",
  ],
  howItWorks: [
    { title: "Upload your PDF", description: "The document's pages are scanned for tabular text." },
    { title: "Rows and columns are reconstructed", description: "Text is grouped into rows by position, then split into cells by spacing gaps." },
    { title: "Download the Excel file", description: "A genuine .xlsx spreadsheet is generated, ready to open directly." },
  ],
  examples: [
    { label: "Extracting a data table", input: "PDF page with a 4-column sales table", output: "an .xlsx file with the same rows and columns, ready to sort and calculate" },
  ],
  faqs: [
    { question: "Will formulas or cell formatting be included?", answer: "No — only the extracted text values are written into cells. There's no formula, color, or formatting information in the original PDF to reconstruct, so the output is a plain values-only spreadsheet." },
    { question: "How accurate is the table reconstruction?", answer: "Very accurate on clean, evenly-spaced tables (verified against a real test table with perfect reconstruction), since the heuristic relies on consistent spacing to detect column boundaries — irregular or unusually-formatted tables will be more approximate." },
    { question: "What's the difference between this and PDF to CSV?", answer: "Both use the identical table-reconstruction logic — the difference is purely the output file format. This produces a genuine .xlsx Excel file that opens directly with spreadsheet structure already in place; PDF to CSV produces plain-text CSV instead." },
    { question: "Does this work on scanned PDF tables?", answer: "No — it requires an embedded text layer with position data. A scanned image of a table has no text data to extract; a dedicated OCR tool would be needed first." },
    { question: "Will multiple tables on different pages be kept separate?", answer: "No — all detected rows from every page are combined onto one sheet. If you need tables kept separate, extract the relevant pages first with PDF Extract Pages and convert each set individually." },
  ],
};

import type { ToolContent } from "./types";

export const csvToExcelContent: ToolContent = {
  heroSubtitle: "Convert CSV Data into a Downloadable Excel File",
  overview: [
    "CSV files are simple and universal, but they're not always what's actually needed — a colleague who wants to filter and format data expects an Excel file, not a plain-text CSV that Excel opens with default, un-styled formatting. Converting on demand solves that expectation gap.",
    "This tool takes CSV data pasted directly into a text box and converts it into a real .xlsx workbook, downloadable immediately with a single click — no need to open Excel, import the CSV manually, and re-save, which is the usual multi-step workaround for this exact conversion.",
    "The output is a standard single-sheet .xlsx workbook, opening correctly in Excel, Google Sheets, LibreOffice Calc, and Apple Numbers. This performs a straightforward data conversion — cell values transfer over, but there's no custom formatting, column widths, or formulas applied beyond what a plain CSV import produces.",
  ],
  howItWorks: [
    { title: "Paste your CSV data", description: "Copy CSV data from anywhere and paste it into the text box." },
    { title: "Download as .xlsx", description: "Click the download button to get a ready-to-open Excel file." },
    { title: "Open in any spreadsheet app", description: "The file opens correctly in Excel, Google Sheets, or LibreOffice." },
  ],
  examples: [
    {
      label: "Simple CSV",
      input: "name,age\nAlice,30\nBob,25",
      output: "converted.xlsx — a two-column, two-row Excel workbook.",
    },
  ],
  faqs: [
    {
      question: "Does the converted file open correctly in Google Sheets?",
      answer:
        "Yes — the output is a standard .xlsx workbook, which Google Sheets, LibreOffice Calc, and Apple Numbers all open correctly alongside Excel itself.",
    },
    {
      question: "How does this handle commas inside a quoted CSV field?",
      answer:
        "Correctly — this uses a proper CSV parser that respects quoted fields, so a value like \"Smith, John\" containing a comma inside quotes is treated as a single field, not split incorrectly.",
    },
    {
      question: "Can I convert data with more than one sheet's worth of content?",
      answer:
        "This tool creates a single-sheet workbook from your pasted CSV data — for multiple sheets, convert each CSV separately and combine the sheets manually in Excel afterward.",
    },
    {
      question: "Is my CSV data uploaded anywhere?",
      answer:
        "No — the conversion and file generation happen entirely in your browser. Nothing is sent to a server.",
    },
  ],
};

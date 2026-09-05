import type { ToolContent } from "./types";

export const excelToCsvContent: ToolContent = {
  heroSubtitle: "Convert an Excel Spreadsheet to CSV Format",
  overview: [
    "CSV is the universal format most tools, scripts, and databases expect for tabular data — but data usually starts life in Excel, where opening and re-saving as CSV means launching a desktop app just to change a file format, and re-saving strips formatting anyway. Extracting the raw data is often all that's actually needed.",
    "This tool reads an uploaded .xlsx or .xls file directly in your browser and converts its first sheet into standard CSV text — the same format Excel's own \"Save As CSV\" produces, but without opening Excel at all. The result is shown as plain text you can copy directly or use anywhere a CSV file is expected.",
    "This converts the first sheet in a workbook — if your spreadsheet has multiple sheets and you need a different one, that sheet needs to be the first one in the file, or extracted to its own file first. Formatting, formulas (their computed values are kept, not the formulas themselves), and charts are not preserved, since CSV is a pure data format with no room for any of that.",
  ],
  howItWorks: [
    { title: "Upload your Excel file", description: "Choose a .xlsx or .xls file from your device." },
    { title: "Review the CSV output", description: "See the first sheet's data converted to plain CSV text." },
    { title: "Copy the result", description: "Copy the CSV text for use anywhere a CSV format is needed." },
  ],
  examples: [
    {
      label: "Simple spreadsheet",
      input: "An .xlsx file with columns Name, Age",
      output: "name,age\nAlice,30\nBob,25",
    },
  ],
  faqs: [
    {
      question: "Which sheet gets converted if my file has multiple sheets?",
      answer:
        "Only the first sheet in the workbook is converted. If you need a different sheet, reorder it to be first in Excel, or save that sheet as its own file before uploading.",
    },
    {
      question: "Are formulas preserved in the CSV output?",
      answer:
        "No — CSV only stores plain values, so formula cells are converted to their currently computed result, not the formula itself.",
    },
    {
      question: "Does this preserve cell formatting or colors?",
      answer:
        "No — CSV is a pure data format with no support for formatting, colors, fonts, or charts, so only the raw cell values carry over.",
    },
    {
      question: "Is my spreadsheet file uploaded to a server?",
      answer:
        "No — the file is read and converted entirely in your browser using JavaScript. Nothing is uploaded anywhere.",
    },
  ],
};

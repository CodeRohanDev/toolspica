import type { ToolContent } from "./types";

export const excelViewerContent: ToolContent = {
  heroSubtitle: "View an Excel Spreadsheet in Your Browser",
  overview: [
    "Sometimes you just need to look at what's inside an Excel file — check a value, confirm the data someone sent you looks right — without actually opening Microsoft Excel, especially on a device where it isn't installed or when you just want a quick read-only look.",
    "This tool reads an uploaded .xlsx or .xls file and displays it as a clean, scrollable table directly in your browser — if the workbook has multiple sheets, tabs let you switch between them, the same way Excel's own sheet tabs work.",
    "This is a read-only viewer for looking at spreadsheet data, not an editor — for actually modifying values or converting the format, use this site's other spreadsheet tools (CSV to Excel, Excel to JSON, and the rest of the Spreadsheet & Data Tools category).",
  ],
  howItWorks: [
    { title: "Upload your Excel file", description: "Choose a .xlsx or .xls file from your device." },
    { title: "Browse the data", description: "View the spreadsheet as a scrollable table." },
    { title: "Switch sheets if needed", description: "Use the tabs to view other sheets in a multi-sheet workbook." },
  ],
  examples: [
    {
      label: "Multi-sheet workbook",
      input: "An .xlsx file with \"Sales\" and \"Inventory\" sheets",
      output: "Two tabs shown; click either to view that sheet's data as a table.",
    },
  ],
  faqs: [
    {
      question: "Can I edit values in this viewer?",
      answer:
        "No — this is a read-only viewer for looking at spreadsheet contents. To edit data, open the file in Excel, Google Sheets, or another spreadsheet editor.",
    },
    {
      question: "Does this preserve cell formatting, colors, or formulas?",
      answer:
        "Formulas show their currently computed values, not the underlying formula. Cell formatting, colors, and fonts aren't shown — this displays plain data content in a simple table.",
    },
    {
      question: "Can I view every sheet in a workbook?",
      answer:
        "Yes — if the workbook has multiple sheets, tabs appear above the table letting you switch between any of them.",
    },
    {
      question: "Is my spreadsheet uploaded to a server?",
      answer:
        "No — the file is read and rendered entirely in your browser. Nothing is uploaded anywhere.",
    },
  ],
};

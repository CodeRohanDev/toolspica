import type { ToolContent } from "./types";

export const excelToJsonContent: ToolContent = {
  heroSubtitle: "Convert an Excel Spreadsheet to JSON",
  overview: [
    "Feeding spreadsheet data into a script, an API, or a web app almost always means JSON, not Excel's binary format — but exporting an Excel sheet to JSON isn't a built-in Excel feature, so this conversion usually means going through CSV first and then a separate CSV-to-JSON step, or writing a small script just for a one-off export.",
    "This tool reads an uploaded .xlsx or .xls file directly in your browser and converts its first sheet straight into a JSON array of objects — one object per row, with each spreadsheet column header becoming a JSON key — in a single step, ready to copy directly into code, an API request body, or a config file.",
    "Column headers (the first row of the sheet) become the JSON object keys automatically, so a clean, consistent header row produces the cleanest JSON output. Empty cells and mismatched row lengths are handled the way most spreadsheet-to-JSON converters handle them: missing values are simply omitted from that row's object rather than inserted as null.",
  ],
  howItWorks: [
    { title: "Upload your Excel file", description: "Choose a .xlsx or .xls file from your device." },
    { title: "Review the JSON output", description: "See the first sheet converted into an array of objects." },
    { title: "Copy the result", description: "Copy the JSON directly into your code or API request." },
  ],
  examples: [
    {
      label: "Simple spreadsheet",
      input: "An .xlsx file with columns Name, Age",
      output: '[\n  { "Name": "Alice", "Age": 30 },\n  { "Name": "Bob", "Age": 25 }\n]',
    },
  ],
  faqs: [
    {
      question: "What becomes the JSON key for each field?",
      answer:
        "The text in each column's header cell (the first row of the sheet) becomes the corresponding JSON key for every row below it.",
    },
    {
      question: "What happens to empty cells?",
      answer:
        "Empty cells are omitted from that row's JSON object entirely, rather than being included as null or an empty string — matching how most spreadsheet libraries handle sparse data.",
    },
    {
      question: "Which sheet gets converted if my file has multiple sheets?",
      answer:
        "Only the first sheet in the workbook. If you need a different sheet, reorder it to be first in Excel before uploading, or extract it to its own file.",
    },
    {
      question: "Is my spreadsheet uploaded to a server?",
      answer:
        "No — the file is read and converted entirely in your browser. Nothing is uploaded anywhere.",
    },
  ],
};

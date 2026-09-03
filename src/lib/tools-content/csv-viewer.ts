import type { ToolContent } from "./types";

export const csvViewerContent: ToolContent = {
  heroSubtitle: "Open and Browse a CSV File as a Clean, Scrollable Table",
  overview: [
    "CSV files are plain text, which means opening one directly shows you an unreadable wall of commas rather than the structured table it actually represents — and opening it in a spreadsheet app is overkill when you just want to quickly check what's inside a file someone sent you. This tool parses any CSV and renders it as a proper, scrollable table instantly, right in your browser.",
    "The parser correctly handles quoted fields containing commas, embedded quotes, and both Windows and Unix line endings — the same edge cases that trip up naive comma-splitting and can silently misalign columns in less careful CSV readers. The first row is treated as a header and pinned to the top as you scroll through large files.",
    "This is genuinely useful for a quick sanity check before importing a CSV into another system, verifying an export actually contains what you expected, or just reading through a dataset without needing to open a full spreadsheet application.",
  ],
  howItWorks: [
    { title: "Upload your CSV file", description: "Select any .csv file from your device." },
    { title: "Browse the parsed table", description: "Headers pin to the top as you scroll." },
    { title: "Check row and column counts", description: "See the file's dimensions at a glance." },
  ],
  examples: [
    { label: "Viewing an exported contact list", input: "contacts.csv with 500 rows", output: "A scrollable table, 500 rows × 6 columns" },
  ],
  faqs: [
    { question: "Does this handle quoted fields with commas inside them?", answer: "Yes — the parser correctly handles quoted fields, embedded commas, and escaped quotes per standard CSV formatting rules." },
    { question: "Is there a file size limit?", answer: "It depends on your device's available memory — very large CSV files (hundreds of MB) may be slow to parse in the browser." },
    { question: "Can I edit the data in this viewer?", answer: "No — this is a read-only viewer. Use a spreadsheet application if you need to edit the file." },
    { question: "Is my CSV file uploaded anywhere?", answer: "No — parsing and display happen entirely in your browser." },
    { question: "Does it support tab-separated (TSV) files?", answer: "No — this parser is specifically for comma-separated files; a differently delimited file will display incorrectly split columns." },
  ],
};

import type { ToolContent } from "./types";

export const jsonToCsvContent: ToolContent = {
  heroSubtitle: "Convert a JSON Array of Objects Into a Spreadsheet-Ready CSV",
  overview: [
    "APIs return data as JSON, but spreadsheets and most data-analysis tools expect CSV — converting between the two by hand means manually building column headers and making sure every row lines up correctly, which gets tedious past a handful of records. This tool takes a JSON array of objects and instantly produces a correctly formatted CSV.",
    "Column headers are automatically collected from every object's keys across the entire array — even if some objects have different fields than others — so no data silently gets dropped because one record's shape didn't match the rest. Fields containing commas, quotes, or line breaks are automatically quoted and escaped per standard CSV rules, so the output opens correctly in Excel, Google Sheets, or any CSV parser without garbled columns.",
    "This is genuinely useful for pulling API response data into a spreadsheet for analysis, converting exported JSON logs into something non-technical teammates can open, or preparing JSON data for import into a system that only accepts CSV.",
  ],
  howItWorks: [
    { title: "Paste a JSON array", description: "An array of objects with consistent-ish fields." },
    { title: "Review the CSV output", description: "Headers are auto-collected from all object keys." },
    { title: "Copy or save", description: "Paste directly into a spreadsheet or save as .csv." },
  ],
  examples: [
    { label: "Converting an API response", input: '[{"name":"Alice","age":30},{"name":"Bob","age":25}]', output: "name,age\\nAlice,30\\nBob,25" },
  ],
  faqs: [
    { question: "What if my objects have different fields?", answer: "Headers are collected from every object across the array, so all fields are captured — missing fields in a given row show as empty cells." },
    { question: "Does this handle nested objects or arrays as values?", answer: "Yes — nested values are stringified as JSON text within their cell rather than expanded into separate columns." },
    { question: "Does this work if I paste a single object instead of an array?", answer: "Yes — a single object is automatically treated as a one-row array." },
    { question: "Are commas and quotes inside values handled correctly?", answer: "Yes — any field containing a comma, quote, or line break is automatically quoted and escaped per standard CSV formatting rules." },
    { question: "Is my data uploaded anywhere?", answer: "No — conversion happens entirely in your browser." },
  ],
};

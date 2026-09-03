import type { ToolContent } from "./types";

export const csvToJsonContent: ToolContent = {
  heroSubtitle: "Convert a CSV File Into a Clean JSON Array of Objects",
  overview: [
    "Plenty of tools export data as CSV, but if you're feeding that data into a script, an API, or any JSON-based system, you need it converted first — and doing that conversion by hand for anything beyond a few rows is slow and easy to get wrong. This tool parses CSV text and converts it directly into a properly structured JSON array, using your first row as object keys automatically.",
    "The CSV parser correctly handles quoted fields containing commas or embedded quotes, and both Windows and Unix line endings, so it holds up against real-world exported CSVs rather than just the simplest comma-separated case. Each subsequent row becomes one JSON object, with your header row's values used as the property names.",
    "Useful for turning a spreadsheet export into API-ready payload data, feeding CSV data into a JavaScript project, or just quickly checking what a CSV file's structure actually looks like once converted to a more inspectable format.",
  ],
  howItWorks: [
    { title: "Paste your CSV", description: "First row is treated as column headers." },
    { title: "Review the JSON output", description: "Each row becomes one object in the array." },
    { title: "Copy the result", description: "Ready to paste into code or another tool." },
  ],
  examples: [
    { label: "Converting a spreadsheet export", input: "name,age\\nAlice,30\\nBob,25", output: '[{"name":"Alice","age":"30"},{"name":"Bob","age":"25"}]' },
  ],
  faqs: [
    { question: "Are all values converted to strings?", answer: "Yes — CSV has no native type system, so all values are treated as text; convert specific fields to numbers in your own code afterward if needed." },
    { question: "Does it handle quoted fields with embedded commas?", answer: "Yes — the parser correctly handles standard CSV quoting and escaping rules." },
    { question: "What if a row has fewer fields than the header?", answer: "Missing trailing fields will show as empty strings in the resulting object." },
    { question: "Is my CSV data uploaded anywhere?", answer: "No — parsing and conversion happen entirely in your browser." },
    { question: "Does this support TSV (tab-separated) files?", answer: "No — this parser expects comma-separated values specifically." },
  ],
};

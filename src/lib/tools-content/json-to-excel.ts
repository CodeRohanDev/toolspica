import type { ToolContent } from "./types";

export const jsonToExcelContent: ToolContent = {
  heroSubtitle: "Convert a JSON Array into a Downloadable Excel File",
  overview: [
    "JSON is how APIs and scripts naturally return data, but a colleague, a client, or a report reviewer usually wants to see that data in a spreadsheet, not a raw JSON file they don't know how to open. Converting an API response or exported JSON array into Excel is a common last-mile step that's tedious to do manually for anything beyond a handful of rows.",
    "This tool takes a JSON array of objects — the standard shape most APIs return, and what most database and script exports naturally produce — and converts it directly into a downloadable .xlsx workbook. Each object in the array becomes one row, and the union of all object keys becomes the column headers.",
    "This expects a JSON array of flat objects, not deeply nested structures — a nested object or array as a field's value won't automatically flatten into separate columns. For that kind of data, flatten the structure into simple key-value pairs per row before converting, since Excel's grid format doesn't natively represent nested data.",
  ],
  howItWorks: [
    { title: "Paste your JSON array", description: "Paste an array of objects, e.g. from an API response." },
    { title: "Download as .xlsx", description: "Click the download button to get a ready-to-open Excel file." },
    { title: "Open and review", description: "Each object becomes a row, with object keys as column headers." },
  ],
  examples: [
    {
      label: "Simple array",
      input: '[{ "name": "Alice", "age": 30 }, { "name": "Bob", "age": 25 }]',
      output: "converted.xlsx — two rows with Name and Age columns.",
    },
  ],
  faqs: [
    {
      question: "Can this handle nested JSON objects or arrays as field values?",
      answer:
        "Not automatically — this expects flat objects (simple key-value pairs). A field containing a nested object or array won't split into separate columns; flatten your data structure first if it contains nesting.",
    },
    {
      question: "What if my objects have different sets of keys?",
      answer:
        "The output includes the union of all keys found across every object as columns, with a blank cell for any row missing a particular key.",
    },
    {
      question: "What error do I get for invalid JSON?",
      answer:
        "A clear message telling you the JSON couldn't be parsed — check for missing commas, unmatched brackets, or unquoted keys, which are the most common causes.",
    },
    {
      question: "Is my JSON data uploaded anywhere?",
      answer:
        "No — parsing and file generation happen entirely in your browser. Nothing is sent to a server.",
    },
  ],
};

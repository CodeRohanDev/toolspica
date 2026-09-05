import type { ToolContent } from "./types";

export const csvMergerContent: ToolContent = {
  heroSubtitle: "Merge Two CSV Files into One",
  overview: [
    "Data often arrives split across multiple CSV exports — a monthly sales report exported month by month, survey responses collected in separate batches, or data from two different sources that need to sit in one combined file for analysis. Combining them by hand means carefully copy-pasting rows while making sure the header doesn't get duplicated.",
    "This tool takes two CSV inputs, checks that both share the same column structure, and merges them into a single CSV — keeping the first file's header row and appending the data rows from both files below it, so the result is ready to use directly in a spreadsheet or data pipeline without a leftover duplicate header row in the middle.",
    "This assumes both CSV inputs use the same columns in the same order — merging files with genuinely different structures (different columns, different order) will produce a technically valid but misaligned CSV, since this tool doesn't reconcile mismatched schemas automatically. Check that both inputs share the same header before merging.",
  ],
  howItWorks: [
    { title: "Paste both CSV files", description: "Paste the content of each CSV file into its own box." },
    { title: "Review the merged result", description: "See both files combined with a single header row." },
    { title: "Copy the merged CSV", description: "Copy the result for use in a spreadsheet or data pipeline." },
  ],
  examples: [
    {
      label: "Two matching files",
      input: "File 1: name,age / Alice,30 — File 2: name,age / Bob,25",
      output: "name,age\nAlice,30\nBob,25",
    },
  ],
  faqs: [
    {
      question: "What happens if the two files have different columns?",
      answer:
        "The merge assumes both files share the same column structure and order — if they don't, the result will be misaligned since this tool doesn't automatically reconcile mismatched schemas. Check both headers match before merging.",
    },
    {
      question: "Does the second file's header row get duplicated in the output?",
      answer:
        "No — only the first file's header row is kept; the second file's header row is skipped and just its data rows are appended below.",
    },
    {
      question: "Can I merge more than two files at once?",
      answer:
        "This tool merges two at a time — for more files, merge two, then take the result and merge it again with the next file, repeating until all files are combined.",
    },
    {
      question: "Is my CSV data sent anywhere?",
      answer:
        "No — the merge happens entirely in your browser. Nothing you paste is uploaded or stored.",
    },
  ],
};

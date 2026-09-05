import type { ToolContent } from "./types";

export const duplicateRowRemoverContent: ToolContent = {
  heroSubtitle: "Remove Duplicate Rows from CSV Data",
  overview: [
    "Duplicate rows creep into data more often than expected — a form that got submitted twice, an export that accidentally ran two overlapping date ranges, or data merged from two sources that partially overlap. Left in place, duplicates skew counts, totals, and any analysis run on the data, often silently.",
    "This tool takes CSV data and removes any row that's an exact duplicate of an earlier row (comparing every column's value), keeping the first occurrence and dropping the rest — reporting exactly how many duplicate rows were found and removed so you know the cleanup actually did something.",
    "This checks for genuinely exact duplicates — a row identical in every column. A near-duplicate with a slightly different value in just one column (a typo, a different timestamp, extra whitespace) is treated as a distinct row and won't be removed, since this tool doesn't attempt fuzzy matching — a single differing character makes two rows count as different data.",
  ],
  howItWorks: [
    { title: "Paste your CSV data", description: "Paste the CSV content that may contain duplicate rows." },
    { title: "Review the cleanup summary", description: "See exactly how many duplicate rows were found and removed." },
    { title: "Copy the cleaned CSV", description: "Copy the deduplicated result for further use." },
  ],
  examples: [
    {
      label: "One duplicate",
      input: "name,age\nAlice,30\nBob,25\nAlice,30",
      output: "name,age\nAlice,30\nBob,25 — 1 duplicate row removed.",
    },
  ],
  faqs: [
    {
      question: "Does this catch near-duplicates with small differences?",
      answer:
        "No — this only removes exact duplicates, where every column value matches precisely. A row differing by even one character (a typo, extra whitespace, a different value in one column) is treated as distinct and kept.",
    },
    {
      question: "Which copy of a duplicate is kept?",
      answer:
        "The first occurrence in the data is kept, and every later exact match is removed — so row order in your original data determines which copy survives.",
    },
    {
      question: "Does this check the header row for duplication?",
      answer:
        "No — the header row is always kept as-is; only the data rows below it are checked for and cleaned of duplicates.",
    },
    {
      question: "Is my CSV data sent anywhere?",
      answer:
        "No — deduplication happens entirely in your browser. Nothing you paste is uploaded or stored.",
    },
  ],
};

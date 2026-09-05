import type { ToolContent } from "./types";

export const dataCleanerContent: ToolContent = {
  heroSubtitle: "Clean Up Messy CSV Data in One Pass",
  overview: [
    "Real-world CSV exports are rarely perfectly clean — stray whitespace around values from a poorly-formatted source, blank rows left over from a spreadsheet template, duplicate entries from a data merge. Each of these is a small, tedious fix on its own, but they commonly show up together in the same messy file.",
    "This tool applies three common cleanup operations to CSV data in one pass, each toggleable independently: trimming leading and trailing whitespace from every cell, removing entirely blank rows, and removing exact duplicate rows. A summary shows exactly how many rows were affected by each operation, so the cleanup is transparent rather than a silent black box.",
    "These three operations cover the most common, unambiguous cleanup needs — they don't attempt more judgment-heavy cleaning like fixing inconsistent capitalization, correcting typos, or standardizing date formats, since those require knowing what \"correct\" should look like for your specific data rather than a universal rule.",
  ],
  howItWorks: [
    { title: "Paste your messy CSV data", description: "Paste data with any combination of whitespace, blank rows, or duplicates." },
    { title: "Toggle the cleanup operations", description: "Choose which of the three operations to apply." },
    { title: "Copy the cleaned result", description: "See exactly how many rows were fixed, then copy the cleaned CSV." },
  ],
  examples: [
    {
      label: "Messy input",
      input: "name, age \nAlice , 30\n\nBob,25\nAlice ,30",
      output: "name,age\nAlice,30\nBob,25 — whitespace trimmed, 1 empty row removed, 1 duplicate removed.",
    },
  ],
  faqs: [
    {
      question: "What exactly does \"trim whitespace\" clean up?",
      answer:
        "It removes leading and trailing spaces from every cell value — so \" Alice \" becomes \"Alice\" — which commonly causes duplicate-looking values or failed exact matches in other tools if left in place.",
    },
    {
      question: "Does this fix inconsistent capitalization or typos?",
      answer:
        "No — this handles unambiguous, rule-based cleanup (whitespace, blank rows, exact duplicates). Fixing capitalization or typos requires knowing what the \"correct\" value should be, which varies per dataset and isn't something this tool guesses at.",
    },
    {
      question: "Can I run just one of the three cleanup operations?",
      answer:
        "Yes — each of the three operations (trim whitespace, remove empty rows, remove duplicates) has its own toggle, so you can apply any combination independently.",
    },
    {
      question: "Is my CSV data sent anywhere?",
      answer:
        "No — all cleaning happens entirely in your browser. Nothing you paste is uploaded or stored.",
    },
  ],
};

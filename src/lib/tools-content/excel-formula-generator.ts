import type { ToolContent } from "./types";

export const excelFormulaGeneratorContent: ToolContent = {
  heroSubtitle: "Build Common Excel & Google Sheets Formulas Without Memorizing Syntax",
  overview: [
    "Spreadsheet formulas like VLOOKUP, SUMIF, and INDEX/MATCH are enormously useful once written correctly, but the exact argument order and syntax are easy to forget between uses — is it lookup value first or range first? Does the criteria need quotes? A small syntax slip is the difference between a working formula and a cryptic #N/A or #VALUE! error.",
    "This tool builds six of the most commonly needed spreadsheet formulas — VLOOKUP, IF, SUMIF, COUNTIF, INDEX/MATCH, and CONCATENATE — from a simple fill-in-the-blanks form. Pick the formula type, enter your cell references and criteria in plain fields, and get back a correctly formatted formula string ready to paste directly into Excel or Google Sheets.",
    "The generated formulas use standard Excel/Google Sheets syntax that works identically in both applications for these particular functions. This tool builds the formula structure correctly; it doesn't know your actual spreadsheet's layout, so double-check that the cell references and ranges you enter match where your real data actually lives before using the result.",
  ],
  howItWorks: [
    { title: "Pick a formula type", description: "Choose VLOOKUP, IF, SUMIF, COUNTIF, INDEX/MATCH, or CONCATENATE." },
    { title: "Fill in your cell references", description: "Enter the ranges, criteria, and cells specific to your spreadsheet." },
    { title: "Copy the formula", description: "Paste the generated formula directly into a cell in Excel or Google Sheets." },
  ],
  examples: [
    {
      label: "VLOOKUP example",
      input: "Lookup: A2, Range: Sheet2!A:D, Column: 3",
      output: "=VLOOKUP(A2, Sheet2!A:D, 3, FALSE)",
    },
  ],
  faqs: [
    {
      question: "Does this work in both Excel and Google Sheets?",
      answer:
        "Yes — VLOOKUP, IF, SUMIF, COUNTIF, INDEX/MATCH, and CONCATENATE all use identical syntax in both Excel and Google Sheets, so the generated formula works the same in either.",
    },
    {
      question: "Why does my formula show an error when I paste it in?",
      answer:
        "Most commonly this means a cell reference or range in the formula doesn't match your actual spreadsheet layout — double-check that the ranges you entered here correspond to where your real data lives.",
    },
    {
      question: "What's the difference between VLOOKUP and INDEX/MATCH?",
      answer:
        "VLOOKUP can only look up a value using the leftmost column of a range and return a column to its right. INDEX/MATCH is more flexible — it can look up and return values in any direction, including columns to the left of the lookup column.",
    },
    {
      question: "Is my spreadsheet data uploaded anywhere?",
      answer:
        "No — this tool never touches your actual spreadsheet file. It only builds a formula string from the cell references and criteria you type in.",
    },
  ],
};

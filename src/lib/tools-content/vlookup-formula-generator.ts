import type { ToolContent } from "./types";

export const vlookupFormulaGeneratorContent: ToolContent = {
  heroSubtitle: "Build a Correct VLOOKUP Formula Without Memorizing Argument Order",
  overview: [
    "VLOOKUP is one of Excel and Google Sheets' most useful functions, but its four arguments — lookup value, table array, column index, and match type — are easy to get in the wrong order or forget entirely, especially the TRUE/FALSE exact-match flag that trips up even experienced spreadsheet users. This tool builds the formula for you from a simple form, so you never have to second-guess the argument order.",
    "Enter your lookup cell, the range to search, and which column to pull the result from, and get back a correctly formatted VLOOKUP formula ready to paste directly into a cell. It also generates the modern XLOOKUP equivalent alongside it, since XLOOKUP (available in Excel 365 and Google Sheets) is generally more flexible and doesn't require counting column positions manually.",
    "This is aimed at anyone who uses VLOOKUP occasionally rather than daily — enough to know what it does, not enough to have the exact syntax memorized. Building it once here and pasting the result saves the usual trial-and-error of getting the formula to actually work.",
  ],
  howItWorks: [
    { title: "Enter your lookup value cell", description: "The cell containing what you're searching for." },
    { title: "Set the table range and column", description: "Where to search and which column to return." },
    { title: "Copy the formula", description: "Paste directly into your spreadsheet." },
  ],
  examples: [
    { label: "Looking up a price by product ID", input: "A2, Sheet2!A:C, column 2, exact match", output: "=VLOOKUP(A2, Sheet2!A:C, 2, FALSE)" },
  ],
  faqs: [
    { question: "What does the TRUE/FALSE argument actually do?", answer: "FALSE requires an exact match (most common use case); TRUE allows an approximate match, which requires your lookup column to be sorted ascending." },
    { question: "Why does my VLOOKUP return #N/A?", answer: "Usually because the lookup value doesn't exist in the first column of your table range, or there's a formatting mismatch (text vs. number)." },
    { question: "Should I use XLOOKUP instead?", answer: "If your spreadsheet app supports it (Excel 365, Google Sheets), XLOOKUP is generally easier to use and can look left as well as right, unlike VLOOKUP." },
    { question: "Does VLOOKUP work across different sheets?", answer: "Yes — reference the other sheet's name before the range, like Sheet2!A:C, exactly as this generator does automatically." },
    { question: "Can the column index be a formula instead of a fixed number?", answer: "Yes, using MATCH() nested inside VLOOKUP, but that's beyond what this basic generator builds — it outputs a fixed column index." },
  ],
};

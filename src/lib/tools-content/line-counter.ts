import type { ToolContent } from "./types";

export const lineCounterContent: ToolContent = {
  overview: [
    "A line counter counts exactly how many lines a block of text contains — every line, as defined by the line breaks in the text, regardless of how many words or characters each one holds. It's a narrower measurement than a word or character count, but it answers a specific, common question that those other counts can't: how many separate rows or entries does this content actually have?",
    "This comes up constantly with structured, line-oriented data rather than flowing prose: counting how many rows are in a CSV file pasted as text, checking how many entries are in a list of email addresses or URLs before a bulk import, verifying that a code snippet or configuration file matches an expected line count, or checking a poem or song lyric's line structure against a required format. It's also useful as a quick sanity check before pasting content into a system with a per-line limit, like a form field that accepts one entry per line up to a maximum count.",
    "Beyond the total line count, this tool breaks the count down further: non-empty lines (lines that contain at least one non-whitespace character) and empty lines (blank lines, including ones that contain only spaces or tabs) are counted separately, which is useful for spotting how much of a pasted block is actual content versus stray blank lines left over from copying out of a PDF, spreadsheet, or email. It also reports the length of the longest single line in the text, in characters — handy for checking whether any line in a code file or data export exceeds a specific width limit.",
    "Everything is calculated instantly in your browser as you type or paste, with no limit on how many lines you can check — from a short 5-line list to a document with tens of thousands of lines.",
  ],
  howItWorks: [
    {
      title: "Paste your text",
      description: "Drop in any line-based content — a list, a CSV export, code, or lyrics.",
    },
    {
      title: "Read the breakdown",
      description:
        "Total lines, non-empty lines, empty lines, and the longest line's length all update instantly.",
    },
  ],
  examples: [
    {
      label: "A short list with a blank line",
      input: "apple\nbanana\n\ncherry",
      output: "4 total lines · 3 non-empty · 1 empty · longest line: 6 characters",
    },
  ],
  faqs: [
    {
      question: "Does a trailing newline at the end of my text add an extra line?",
      answer:
        "It depends on exactly where it falls — splitting text by line breaks means a final newline character at the very end of the text can produce one additional, empty final line, since everything after the last line break (even nothing) is still counted as a line.",
    },
    {
      question: "Is a blank line the same as an empty line here?",
      answer:
        "Yes — a line is counted as \"empty\" if it contains nothing, or contains only whitespace (spaces or tabs) with no visible characters. A line with even a single visible character counts as non-empty.",
    },
    {
      question: "Why would I care about the longest line's length?",
      answer:
        "It's useful for checking code style rules (many style guides cap line length at 80 or 100 characters), verifying a data export doesn't have an unexpectedly long row, or checking a design constraint where a specific line can't exceed a character limit.",
    },
    {
      question: "Does this count wrapped lines in a text editor as multiple lines?",
      answer:
        "No — this counts actual line breaks (newline characters) in the text, not visual line wrapping caused by a narrow display width. A long line that wraps to two visual rows on screen is still counted as one line here.",
    },
    {
      question: "Can I use this to count rows in a CSV file?",
      answer:
        "Yes, as long as each CSV row is on its own line (the standard format) — paste the raw CSV text in and the total line count will match the number of rows, including the header row if present.",
    },
  ],
};

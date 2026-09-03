import type { ToolContent } from "./types";

export const sortLinesContent: ToolContent = {
  overview: [
    "Sort Lines takes a block of text — one entry per line — and puts it into alphabetical or numeric order. It's one of those tasks that's trivial in a spreadsheet but surprisingly annoying in a plain text editor, which is exactly the gap this tool fills: paste in a messy list and get an ordered one back in a click, without opening Excel or Google Sheets just to sort a dozen lines.",
    "Beyond a basic A-to-Z sort, this tool handles the edge cases that trip up a naive sort. \"Z → A\" reverses the order for a descending sort. \"Case-insensitive\" makes sure \"Banana\" and \"apple\" sort based on their letters rather than by ASCII value, where by default all uppercase letters sort before all lowercase ones — without this option, a list like [\"banana\", \"Apple\", \"cherry\"] would sort as [\"Apple\", \"banana\", \"cherry\"] purely because of capitalization, which usually isn't what you want. \"Numeric sort\" detects when your lines are actually numbers (like a list of prices, scores, or IDs) and sorts them by numeric value instead of alphabetically — without it, a plain text sort would put \"10\" before \"9\", since it compares the character \"1\" to \"9\" rather than the numbers ten and nine. \"Remove empty lines\" clears out blank lines before sorting, which is on by default since stray blank lines almost always end up at the very top or bottom of an alphabetical sort and rarely add value.",
    "Typical uses: alphabetizing a list of names for a roster or credits list, sorting a list of tags or categories for consistency, ordering a set of file names or URLs before a batch operation, or sorting numeric data like scores or prices pasted from a table. As with every tool here, sorting happens instantly in your browser using JavaScript's native comparison functions, with no upload and no limit on list length.",
  ],
  howItWorks: [
    {
      title: "Paste your list",
      description: "One entry per line — names, tags, numbers, file names, anything sortable.",
    },
    {
      title: "Set your sort options",
      description:
        "Choose ascending or descending order, toggle case-insensitivity, numeric sorting, and whether to drop empty lines.",
    },
    {
      title: "Copy the sorted result",
      description: "The reordered list appears below instantly, ready to copy.",
    },
  ],
  examples: [
    {
      label: "Sorting names alphabetically",
      input: "Charlie\nalice\nBob",
      output: "alice\nBob\nCharlie  (with Case-insensitive on)",
    },
    {
      label: "Sorting numbers correctly",
      input: "10\n2\n33\n4",
      output: "2\n4\n10\n33  (with Numeric sort on — without it: 10, 2, 33, 4)",
    },
  ],
  faqs: [
    {
      question: "Why did my numbers sort as 10, 2, 33, 4 instead of in numeric order?",
      answer:
        "By default, lines are sorted as text, which compares strings character by character — so \"10\" sorts before \"2\" because \"1\" comes before \"2\". Turn on \"Numeric sort\" to compare lines as actual numbers instead.",
    },
    {
      question: "What happens if my list has a mix of numbers and text with numeric sort on?",
      answer:
        "For any line that isn't a valid number, the tool falls back to a standard text comparison for that line, so a mixed list still sorts sensibly rather than breaking.",
    },
    {
      question: "Does sorting remove duplicate lines?",
      answer:
        "No — this tool only reorders your lines, it doesn't deduplicate them. If you also need duplicates removed, run your list through the Remove Duplicate Lines tool first (or after), then sort.",
    },
    {
      question: "Can I sort by the second word or a specific column instead of the whole line?",
      answer:
        "Not with this tool — it sorts based on the entire line's content. For column-based sorting (like sorting a CSV by its second field), a spreadsheet tool is a better fit.",
    },
    {
      question: "Is uppercase or lowercase sorted first by default?",
      answer:
        "With \"Case-insensitive\" off, sorting follows standard character ordering, where all uppercase letters (A-Z) come before all lowercase letters (a-z) — so \"Zebra\" sorts before \"apple\". Turn on \"Case-insensitive\" to sort purely alphabetically regardless of capitalization.",
    },
  ],
};

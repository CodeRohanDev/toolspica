import type { ToolContent } from "./types";

export const removeDuplicateLinesContent: ToolContent = {
  overview: [
    "Remove Duplicate Lines takes a block of text — one item per line — and strips out any line that appears more than once, keeping only the first occurrence of each. It's a small, unglamorous task that comes up constantly: cleaning a list of email addresses exported from two different tools before a mail merge, de-duplicating a list of URLs before a crawl, tidying a CSV column you pasted into a text editor, or merging two to-do lists without ending up with the same task twice.",
    "Doing this by hand for anything longer than ten or fifteen lines is tedious and error-prone — you have to scan the whole list repeatedly to catch every repeat, and it's easy to miss a duplicate that differs only in trailing whitespace or capitalization. This tool handles all of that with three toggles. \"Case-insensitive\" treats \"Apple\" and \"apple\" as the same line, which matters for things like deduplicating names or tags where capitalization is inconsistent. \"Trim whitespace\" strips leading and trailing spaces from each line before comparing, so \"banana\" and \"banana \" (with a trailing space) are correctly recognized as duplicates instead of slipping through as technically-different strings. \"Remove empty lines\" additionally strips out any blank lines in the result, useful when your source list has stray line breaks from copy-pasting out of a spreadsheet or PDF.",
    "The tool preserves the original order of the first occurrence of each line — it doesn't sort your list, just deduplicates it in place — and reports exactly how many duplicate lines were removed, so you have a quick sanity check that something actually changed. Processing happens entirely in your browser using a JavaScript Set for tracking seen lines, which makes it fast even on lists with tens of thousands of lines, and nothing you paste is ever uploaded anywhere.",
  ],
  howItWorks: [
    {
      title: "Paste your list",
      description:
        "One item per line — email addresses, URLs, tags, to-do items, anything.",
    },
    {
      title: "Choose your matching rules",
      description:
        "Toggle case-insensitive matching, whitespace trimming, and empty-line removal depending on how strict you want the dedup to be.",
    },
    {
      title: "Copy the cleaned list",
      description:
        "The deduplicated result appears below with a count of how many lines were removed, ready to copy.",
    },
  ],
  examples: [
    {
      label: "Deduplicating a fruit list",
      input: "apple\nbanana\nApple\ncherry\nbanana\n",
      output: "apple\nbanana\ncherry\n(with \"Case-insensitive\" on — 2 duplicates removed)",
    },
  ],
  faqs: [
    {
      question: "Does it keep the first or the last copy of a duplicate line?",
      answer:
        "It always keeps the first occurrence and removes every later repeat, preserving your original order — the result isn't sorted or reordered.",
    },
    {
      question: "Will it catch duplicates that differ only by capitalization?",
      answer:
        "Only if you turn on \"Case-insensitive.\" With it off, \"Apple\" and \"apple\" are treated as different lines, since sometimes capitalization differences are meaningful (for example, in code or in exact-match tag lists).",
    },
    {
      question: "What happens to blank lines in my list?",
      answer:
        "By default they're left alone (and treated like any other line, so repeated blank lines get deduplicated to one). Turn on \"Remove empty lines\" if you want them stripped out entirely instead.",
    },
    {
      question: "Can I use this to deduplicate a comma-separated list instead of one-per-line?",
      answer:
        "Not directly — this tool splits on line breaks, not commas. If your list is comma-separated, replace the commas with line breaks first (Find & Replace works well for this), run the dedup, then join it back together if needed.",
    },
    {
      question: "Is there a limit to how many lines I can paste in?",
      answer:
        "No fixed limit — since everything runs in your browser rather than on a server, you can paste in lists with tens of thousands of lines and it will still process instantly.",
    },
  ],
};

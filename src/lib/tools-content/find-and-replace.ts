import type { ToolContent } from "./types";

export const findAndReplaceContent: ToolContent = {
  overview: [
    "Find and Replace scans a block of text for every occurrence of one string and swaps it for another, all at once — the same core feature every word processor and code editor has built in, available here as a standalone tool for whenever you're working outside of one of those programs, such as cleaning up text pasted from an email, a PDF export, or a chat log before it goes somewhere else.",
    "Three toggles control exactly how matching works. \"Case-sensitive\" determines whether \"Apple\" and \"apple\" are treated as the same text to find — off by default, meaning a search for \"apple\" replaces both \"Apple\" and \"apple\" and \"APPLE\"; turn it on when the casing itself matters, like replacing a specific capitalized product name without touching an unrelated lowercase word that happens to match. \"Whole word only\" prevents partial matches inside longer words — searching for \"cat\" with this on will replace \"cat\" but leave \"category\" and \"concatenate\" untouched, which matters constantly in practice, since a plain substring search for a short word will otherwise mangle text in ways that are easy to miss until you spot a broken word deep in a paragraph.",
    "\"Treat 'Find' as regex\" unlocks pattern-based matching for anyone comfortable with regular expressions — instead of a literal string, the Find field is interpreted as a JavaScript regular expression, so you can match patterns like `\\d{3}-\\d{4}` for a phone number format, `[A-Z][a-z]+` for any capitalized word, or use capture groups with `$1` in the replacement field to reuse part of the match. With regex mode off (the default), every character you type in Find — including ones that have special meaning in regex, like `.` or `(` — is automatically escaped and matched completely literally, so you can safely search for things like \"3.5\" or \"(draft)\" without accidentally triggering pattern-matching behavior you didn't intend.",
    "The tool reports exactly how many matches were replaced, so you have immediate confirmation that something actually changed (or a clear signal if your search term didn't match anything, which usually means a typo or an unexpected case-sensitivity issue). All matching and replacing happens instantly in your browser using JavaScript's native string and regex engine — there's no length limit and no delay, even on long documents.",
  ],
  howItWorks: [
    {
      title: "Paste your text",
      description: "Drop in the text you want to search and modify.",
    },
    {
      title: "Enter what to find and replace",
      description: "Type the text to search for and what it should become.",
    },
    {
      title: "Adjust matching rules if needed",
      description:
        "Toggle case-sensitivity, whole-word matching, or regex mode for more precise control.",
    },
    {
      title: "Copy the result",
      description: "The updated text and match count appear instantly below.",
    },
  ],
  examples: [
    {
      label: "Simple replacement",
      input: "Find: cat → Replace: dog\nText: The cat sat near the category sign.",
      output:
        "With \"Whole word only\" ON: The dog sat near the category sign.\nWith it OFF: The dog sat near the dogegory sign.",
    },
  ],
  faqs: [
    {
      question: "Why did my replacement break a longer word?",
      answer:
        "By default, Find matches any occurrence of your search text as a substring, including inside longer words — searching for \"cat\" will also match the \"cat\" inside \"category\". Turn on \"Whole word only\" to restrict matches to standalone words.",
    },
    {
      question: "Can I use $1 in the Replace field?",
      answer:
        "Yes, but only when \"Treat 'Find' as regex\" is turned on and your pattern includes a capture group in parentheses — `$1` (and `$2`, `$3`, etc.) refers back to whatever that group matched, letting you rearrange or reuse parts of the matched text in the replacement.",
    },
    {
      question: "What happens if my regex pattern is invalid?",
      answer:
        "The tool shows \"Invalid regular expression\" instead of a match count, and leaves your original text unchanged in the result box, so a typo in a regex pattern never silently corrupts your text.",
    },
    {
      question: "Does this replace all matches, or just the first one?",
      answer:
        "All matches are replaced in one pass — there's no \"replace first occurrence only\" mode. If you need to replace just one specific instance, temporarily make your search text unique enough to match only that one (for example, by including a few surrounding words).",
    },
    {
      question: "Is the search case-sensitive by default?",
      answer:
        "No — by default, searching for \"Apple\" also matches \"apple\" and \"APPLE\". Turn on \"Case-sensitive\" if you need the exact capitalization to matter.",
    },
  ],
};

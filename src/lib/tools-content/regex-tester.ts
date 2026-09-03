import type { ToolContent } from "./types";

export const regexTesterContent: ToolContent = {
  overview: [
    "Regular expressions (regex) are a compact, powerful pattern language for matching, extracting, and validating text — used everywhere from form validation (checking that an email address or phone number looks right) to search-and-replace in a code editor, log file parsing, and data extraction. They're also notoriously easy to get subtly wrong: a pattern that seems correct can fail to match an edge case, or worse, match something you never intended it to.",
    "A regex tester closes that feedback loop instantly. Instead of writing a pattern into your actual code, running it, and debugging why it didn't match, you type your pattern and a sample test string directly here and see every match highlighted in real time as you adjust either one. This tool uses JavaScript's native RegExp engine — the exact same regex implementation used by every JavaScript and TypeScript codebase, and very close to what's used in most other modern languages — so a pattern that works here will behave identically in your actual application code.",
    "Flags control how the pattern behaves: `g` (global) finds all matches in the string rather than stopping after the first one — this tool always applies it internally so you see every match, regardless of what you type. `i` makes matching case-insensitive. `m` changes how `^` and `$` behave with multi-line text, matching the start/end of each line rather than only the start/end of the whole string. `s` makes `.` match newline characters too, which it doesn't by default. You can combine multiple flags, like `gi` for global, case-insensitive matching.",
    "Matches are highlighted directly within your test string, so you can visually confirm the pattern is capturing exactly the text you expect — no more, no less. If your pattern has a syntax error (an unclosed group, an invalid escape sequence), the tool shows the exact error the RegExp engine reports, the same message you'd see thrown as an exception in your own code.",
  ],
  howItWorks: [
    {
      title: "Enter your pattern and flags",
      description: "Type your regular expression and any flags (i, m, s) you need.",
    },
    {
      title: "Paste a test string",
      description: "Enter the text you want to test your pattern against.",
    },
    {
      title: "See matches highlighted live",
      description: "Every match is highlighted directly in the text, updating as you type.",
    },
  ],
  examples: [
    {
      label: "Matching phone number patterns",
      input: "Pattern: \\d{3}-\\d{4}\nText: Call 555-1234 or 555-5678 for support.",
      output: "2 matches found: 555-1234 and 555-5678",
    },
  ],
  faqs: [
    {
      question: "Why does the tool always seem to find all matches, even without the 'g' flag?",
      answer:
        "This tester always applies the global flag internally so you can see every match in your test string at once, regardless of what flags you type — this makes testing easier, since finding only the first match is rarely what you want while iterating on a pattern.",
    },
    {
      question: "What's the difference between the 'i' and 'm' flags?",
      answer:
        "'i' makes the entire match case-insensitive (so \"Hello\" matches \"hello\"). 'm' (multiline) changes how `^` and `$` work in a multi-line string, making them match the start and end of each individual line rather than only the very start and end of the whole string.",
    },
    {
      question: "Why isn't my pattern matching text with a line break in it?",
      answer:
        "By default, the `.` character in regex doesn't match newline characters. If you need `.` to match across line breaks, add the `s` flag (dotAll mode), which makes `.` match any character including newlines.",
    },
    {
      question: "Does this show capture groups separately?",
      answer:
        "The current highlighting shows the full match for each result, matching what you'd get from `.matchAll()` in JavaScript. For inspecting individual capture groups within a complex pattern, you may need to check your groups in your actual code alongside this tool.",
    },
    {
      question: "Is JavaScript's regex the same as regex in Python or other languages?",
      answer:
        "Mostly, but not entirely — the core syntax (character classes, quantifiers, groups) is very similar across languages, but there are differences in specific features (like lookbehind support, named group syntax, and some flag behaviors). A pattern tested here is guaranteed to behave the same in JavaScript, and will very likely — but not certainly — behave the same in other languages.",
    },
  ],
};

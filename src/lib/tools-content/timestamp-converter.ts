import type { ToolContent } from "./types";

export const timestampConverterContent: ToolContent = {
  overview: [
    "Computers almost universally store and exchange dates as a single number — a timestamp representing how many seconds (or milliseconds) have passed since a fixed reference point — rather than as human-readable text, because a number is unambiguous, easy to compare and sort, and doesn't depend on any particular language or date format. A timestamp converter bridges the gap between that machine-friendly number and a date and time a human can actually read and reason about.",
    "This tool converts in both directions. Enter a Unix timestamp (the tool automatically detects whether you've entered seconds or milliseconds based on the number's length) and see it converted into your local time, UTC time, and ISO 8601 format simultaneously — three representations that cover the overwhelming majority of what you'd need when debugging a timestamp found in a log file, database record, or API response. Enter a date and time instead, and the tool converts it into both its Unix seconds and milliseconds equivalents.",
    "Showing local time and UTC side by side matters more than it might seem: a huge share of timestamp-related bugs come from confusing which timezone a stored value represents, especially when a team is distributed across timezones or a server runs in UTC while a developer is debugging locally. Seeing both values at once makes it immediately obvious whether a discrepancy you're investigating is a genuine data bug or just a timezone display difference.",
    "The ISO 8601 format (like `2026-01-01T00:00:00.000Z`) is included because it's the standard, unambiguous, sortable date format used across most modern APIs, databases, and programming languages — if you're working with an API that expects or returns dates in this format, having it available directly alongside the Unix timestamp saves a manual conversion step.",
  ],
  howItWorks: [
    {
      title: "Enter a timestamp or a date",
      description: "Paste a Unix timestamp, or pick a date and time, depending on which direction you need.",
    },
    {
      title: "See both conversions instantly",
      description: "Local time, UTC, ISO 8601, and Unix seconds/milliseconds all update live.",
    },
    {
      title: "Use \"Use now\" for the current time",
      description: "Quickly grab the current Unix timestamp with one click.",
    },
  ],
  examples: [
    {
      label: "Converting a Unix timestamp",
      input: "1735689600",
      output: "UTC: Wed, 01 Jan 2026 00:00:00 GMT · ISO 8601: 2026-01-01T00:00:00.000Z",
    },
  ],
  faqs: [
    {
      question: "How does the tool know if I entered seconds or milliseconds?",
      answer:
        "It checks the length of the number you enter — Unix timestamps in seconds for dates in the modern era are 10 digits, while millisecond timestamps are 13 digits. The tool uses that length as a heuristic to decide which unit you meant.",
    },
    {
      question: "Why do I see a different time in \"Local\" versus \"UTC\"?",
      answer:
        "\"Local\" reflects your browser's configured timezone, while \"UTC\" is the same instant in time expressed in Coordinated Universal Time (no timezone offset). Both represent the exact same moment — they'll only show the same clock time if your local timezone happens to be UTC.",
    },
    {
      question: "What's the difference between this and the Epoch Converter tool?",
      answer:
        "This tool is built for two-way conversion between a specific date/time and its timestamp equivalents, with local/UTC/ISO views. The Epoch Converter additionally shows a continuously updating live \"current epoch time\" ticker and focuses more specifically on understanding the Unix epoch concept itself.",
    },
    {
      question: "Can I convert a timestamp from before 1970?",
      answer:
        "Yes — Unix timestamps can be negative to represent dates before January 1, 1970 (the epoch), and this tool correctly handles negative timestamp values the same way as positive ones.",
    },
    {
      question: "Is ISO 8601 always displayed in UTC?",
      answer:
        "Yes, as shown here — the ISO 8601 output uses the `Z` suffix, indicating it's expressed in UTC (Zulu time), which is the most common and least ambiguous way to represent ISO 8601 timestamps in APIs and databases.",
    },
  ],
};

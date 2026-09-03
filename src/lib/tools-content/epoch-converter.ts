import type { ToolContent } from "./types";

export const epochConverterContent: ToolContent = {
  overview: [
    "The Unix epoch is the reference point nearly every computer system uses to represent time as a single number: January 1, 1970, 00:00:00 UTC, defined as second zero. Every Unix timestamp you'll ever encounter — in a log file, a database column, an API response, a JWT's expiration claim — is simply a count of how many seconds (occasionally milliseconds) have elapsed since that exact moment. Understanding this one fact demystifies most of what looks confusing about timestamps in code.",
    "This tool keeps a live, continuously updating display of the current epoch time, ticking upward once per second in real time — a genuinely useful reference when you're debugging something time-sensitive and want to quickly compare \"right now\" against a timestamp you're looking at elsewhere, without needing to run a script or open a console just to check the current value.",
    "Below the live ticker, you can convert any specific epoch timestamp (in seconds) into its corresponding UTC date and time. This is the direction most people actually need when debugging: you have a raw number from a log line or database row, and you want to know what actual calendar date and time it represents, without doing the arithmetic yourself or writing a throwaway script.",
    "The choice to use UTC specifically for this conversion (rather than local time) is deliberate: Unix timestamps themselves have no inherent timezone — they're a pure count of elapsed seconds from a UTC-defined reference point — so converting to UTC first, and only applying a timezone offset afterward if truly needed, avoids introducing timezone confusion that isn't actually present in the original number.",
  ],
  howItWorks: [
    {
      title: "Watch the live epoch counter",
      description: "See the current Unix timestamp update in real time, once per second.",
    },
    {
      title: "Enter a timestamp to convert",
      description: "Paste any epoch value in seconds to see its UTC date and time.",
    },
    {
      title: "Read the result",
      description: "The corresponding UTC date appears instantly below.",
    },
  ],
  examples: [
    {
      label: "Converting an epoch timestamp",
      input: "1735689600",
      output: "UTC date: Wed, 01 Jan 2026 00:00:00 GMT",
    },
  ],
  faqs: [
    {
      question: "Why January 1, 1970 specifically?",
      answer:
        "It was an arbitrary but practical choice made by early Unix developers in the early 1970s — recent enough to be a convenient reference point for the systems of that era, defined once, and then adopted so broadly across computing that changing it now would be effectively impossible.",
    },
    {
      question: "What happens when Unix time exceeds what a 32-bit number can hold?",
      answer:
        "This is the well-known \"Year 2038 problem\" — systems that store Unix time as a signed 32-bit integer will overflow on January 19, 2038, wrapping around to a negative number (interpreted as a date in 1901). Modern systems using 64-bit timestamps aren't affected, but some older or embedded systems still are.",
    },
    {
      question: "Is the live counter using my device's clock or a server's?",
      answer:
        "It uses your own device's system clock (via your browser's JavaScript engine), updated locally every second — there's no server involved, which also means its accuracy depends on your device's clock being correctly set.",
    },
    {
      question: "Can epoch time be negative?",
      answer:
        "Yes — a negative Unix timestamp represents a date before January 1, 1970. Most systems and libraries handle negative timestamps correctly, though it's a less common case to encounter in everyday work.",
    },
    {
      question: "Why does this tool convert to UTC instead of my local timezone?",
      answer:
        "A raw Unix timestamp doesn't carry any timezone information — it's purely a count of seconds from a UTC-defined moment. Converting to UTC first shows the value as it's actually defined, without introducing an extra, potentially confusing timezone conversion on top of it.",
    },
  ],
};

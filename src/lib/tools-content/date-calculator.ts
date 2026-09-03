import type { ToolContent } from "./types";

export const dateCalculatorContent: ToolContent = {
  heroSubtitle: "Find the Difference Between Dates or Add/Subtract Days",
  overview: [
    "Date math is one of those calculations that looks simple but has enough hidden complexity — variable month lengths, leap years, the exact question being asked — that doing it reliably by hand or with a mental calendar is genuinely error-prone. This tool covers the two most common date-related questions in one place: finding the exact difference between two dates, and finding what date results from adding or subtracting a number of days from a starting date.",
    "\"Difference between dates\" answers questions like \"how many days until my trip,\" \"how long ago was this event,\" or \"how many days has it been since we launched.\" Rather than just showing a raw day count, it also breaks the difference down into years, months, and days — a more human-readable figure for spans longer than a few weeks, alongside the precise total day and week counts for when an exact number is what's actually needed.",
    "\"Add/subtract days\" answers the reverse question — starting from a known date, what date is a certain number of days before or after it. This is common for calculating a deadline (\"30 days from the invoice date\"), a return policy window (\"90 days from purchase\"), a project timeline, or working out what date a countdown will actually land on. The result shows the full weekday and date, since knowing whether a deadline falls on a weekend can matter as much as the date itself.",
    "Both calculations are calendar-accurate, correctly handling month-length differences (28 through 31 days) and leap years, so a calculation spanning February in a leap year comes out exactly right rather than off by a day the way a naive fixed-30-days-per-month estimate would be.",
  ],
  howItWorks: [
    {
      title: "Pick a calculation mode",
      description: "Difference between two dates, or add/subtract days from a starting date.",
    },
    {
      title: "Enter your date(s)",
      description: "For the add/subtract mode, also enter the number of days and choose add or subtract.",
    },
    {
      title: "Read the result instantly",
      description: "The date difference or resulting date updates live as you fill in the fields.",
    },
  ],
  examples: [
    {
      label: "Difference between dates",
      input: "From January 1, 2026 to March 15, 2026",
      output: "2 months, 14 days (73 total days)",
    },
    {
      label: "Add days to a date",
      input: "Start date January 1, 2026, add 90 days",
      output: "Thursday, April 1, 2026",
    },
  ],
  faqs: [
    {
      question: "Does the date difference count include both the start and end date?",
      answer:
        "The total days figure represents the number of days between the two dates (an exclusive count) — for example, January 1 to January 2 is 1 day apart. If you need an inclusive count (counting both endpoints), add 1 to the total days result.",
    },
    {
      question: "Why does adding days sometimes land on an unexpected date across a month boundary?",
      answer:
        "Because months have different lengths (28 to 31 days), adding a fixed number of days doesn't move a fixed number of \"months\" — the result correctly accounts for exactly how many days each month in between actually has, rather than assuming a flat 30-day month.",
    },
    {
      question: "Can I subtract days to find a date in the past?",
      answer:
        "Yes — switch the operation to \"Subtract\" and the result shows the exact date that many days before your starting date, correctly handling month and year boundaries the same way addition does.",
    },
    {
      question: "Does this account for time zones?",
      answer:
        "The calculation works with calendar dates only (not specific times), so it isn't affected by time zone differences — a date is treated the same regardless of where you are, which is the correct behavior for date-only calculations like deadlines and countdowns.",
    },
    {
      question: "Why does the result show the day of the week?",
      answer:
        "Knowing whether a calculated deadline or target date falls on a weekend or weekday is often just as important as the date itself — for scheduling, deadlines, and planning purposes — so the full weekday is shown alongside the date.",
    },
  ],
};

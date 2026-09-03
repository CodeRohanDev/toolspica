import type { ToolContent } from "./types";

export const randomDateGeneratorContent: ToolContent = {
  heroSubtitle: "Generate Random Dates Within Any Range",
  overview: [
    "Random dates are useful test data for anything date-related — a booking system, a database seeded with sample records, or a scheduling app mockup that needs varied, realistic-looking dates rather than the same placeholder date repeated everywhere.",
    "This tool generates random dates uniformly distributed between any start and end date you choose, so every day in the range has an equal chance of being picked. Generate a single date, or up to 20 at once for a full batch of sample data.",
    "Because the range is fully configurable, you can generate dates confined to a specific year, a birthday range for realistic test profiles, or any custom window your test data or scheduling scenario needs.",
    "This is useful for seeding test databases with date fields, generating sample appointment or booking dates, picking a random date for a giveaway drawing, and any mockup or demo that needs believable, varied dates.",
  ],
  howItWorks: [
    {
      title: "Set a start and end date",
      description: "Defines the range dates will be picked from, inclusive.",
    },
    {
      title: "Choose how many dates",
      description: "From 1 up to 20 at once.",
    },
    {
      title: "Click Generate",
      description: "Random dates within your range appear instantly.",
    },
  ],
  examples: [
    {
      label: "Generating test booking dates",
      input: "Start: Jan 1, 2026, End: Dec 31, 2026, count: 3",
      output: "March 14, 2026; July 2, 2026; October 29, 2026",
    },
  ],
  faqs: [
    {
      question: "Is every date in the range equally likely?",
      answer:
        "Yes — dates are drawn uniformly across the full range, so a date near the start of the range is exactly as likely as one near the end or in the middle.",
    },
    {
      question: "Can I generate dates in the past or the future?",
      answer:
        "Yes — the start and end dates can be any dates you choose, in the past, the future, or spanning both, whatever your use case needs.",
    },
    {
      question: "Can the same date appear twice in one batch?",
      answer:
        "It's possible for a narrow date range, since each date is drawn independently — for a wide range, duplicates within a batch are rare in practice.",
    },
    {
      question: "What format are the generated dates in?",
      answer:
        "Dates are shown in a clear, readable format (like 'March 14, 2026') so they're easy to read at a glance and easy to copy into a spreadsheet or document.",
    },
    {
      question: "Can I use this for a raffle or giveaway drawing based on a date?",
      answer:
        "Yes — if your entries are tied to dates in a range (like daily entries over a month), this gives you a fair, unbiased way to pick the winning date.",
    },
  ],
};

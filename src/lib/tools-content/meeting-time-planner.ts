import type { ToolContent } from "./types";

export const meetingTimePlannerContent: ToolContent = {
  heroSubtitle: "Find Overlapping Meeting Times Across Time Zones",
  overview: [
    "Scheduling a meeting across time zones almost always involves someone manually converting hours in their head, getting daylight saving time wrong, or discovering after sending an invite that the proposed time is 3am for one of the attendees. This gets worse the more time zones are involved, since mental time-zone math doesn't scale past two or three people.",
    "This tool shows every hour of the day converted simultaneously across as many time zones as you add, in a single table — pick from common zones or type any full IANA time zone name (like Europe/London or Asia/Kolkata), and instantly see what 9am in New York actually is in London, Dubai, and Tokyo, side by side, for every hour of the day at once rather than one conversion at a time.",
    "Because this uses IANA time zone identifiers and the browser's built-in Intl API rather than fixed UTC offsets, daylight saving time is handled automatically and correctly for each zone — a zone that observes DST will show the right local time whether the reference date falls in summer or winter, without you needing to manually adjust for it.",
  ],
  howItWorks: [
    { title: "Add your time zones", description: "Pick from common zones or type a full IANA time zone name." },
    { title: "Scan the table", description: "See every hour converted across all zones at once, in one row per hour." },
    { title: "Pick a time that works for everyone", description: "Find the row where every zone shows a reasonable working hour." },
  ],
  examples: [
    {
      label: "Three-zone comparison",
      input: "New York, London, Kolkata at UTC hour 14",
      output: "New York: 9:00 AM — London: 2:00 PM — Kolkata: 7:30 PM",
    },
  ],
  faqs: [
    {
      question: "Does this account for daylight saving time automatically?",
      answer:
        "Yes — it uses full IANA time zone identifiers (like America/New_York) rather than fixed UTC offsets, so daylight saving time is calculated correctly and automatically for the current date in each zone.",
    },
    {
      question: "Why do I need to type a full zone name instead of just a city?",
      answer:
        "IANA time zone names (e.g. Asia/Kolkata rather than just \"India\") are the standardized identifiers that correctly encode a region's specific daylight saving rules — a handful of common ones are offered as suggestions, and you can type any valid one directly.",
    },
    {
      question: "How many time zones can I compare at once?",
      answer:
        "There's no fixed limit — add as many as you need to check overlap for your specific group of attendees.",
    },
    {
      question: "Is any scheduling information sent anywhere?",
      answer:
        "No — all time zone conversion happens locally in your browser using the Intl API. Nothing is uploaded or stored.",
    },
  ],
};

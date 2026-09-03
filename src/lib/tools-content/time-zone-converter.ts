import type { ToolContent } from "./types";

export const timeZoneConverterContent: ToolContent = {
  heroSubtitle: "Convert Any Time Between 25 Time Zones Instantly",
  overview: [
    "Scheduling a call or meeting across time zones means converting a specific clock time from one zone into what it corresponds to in another — and doing that mental math correctly, especially across half-hour offsets (like India's UTC+5:30) or during daylight saving transitions, is a common source of missed calls and confused invitations.",
    "This tool takes a date and time, along with a source and destination time zone, and calculates exactly what that moment corresponds to in the destination zone. It uses the browser's built-in time zone database (the same one your operating system uses), so daylight saving time is handled automatically and correctly for the specific date you enter — a fixed offset assumption would get this wrong for roughly half the year in regions that observe DST.",
    "25 major time zones are covered, spanning every major populated region and covering the full range of standard offsets, including half-hour and 45-minute offsets used by a handful of specific zones. Each is identified by both a readable city name and its underlying time zone identifier, so the conversion is unambiguous even for zones that share a similar but not identical offset with a neighboring region.",
    "Beyond the converted time itself, the tool shows the exact hour difference between the two zones for the date you entered — useful context when you're trying to explain to a colleague or scheduling tool exactly how many hours apart two locations are on a specific day, since that gap can shift by an hour around DST transition dates.",
  ],
  howItWorks: [
    {
      title: "Enter the date and time",
      description: "The specific moment you want to convert.",
    },
    {
      title: "Choose the source and destination time zones",
      description: "Pick from 25 major time zones covering every region.",
    },
    {
      title: "View the converted time",
      description: "See the exact equivalent time in the destination zone, plus the hour difference.",
    },
  ],
  examples: [
    {
      label: "New York to India",
      input: "9:00 AM, America/New_York → Asia/Kolkata",
      output: "6:30 PM the same day (9.5 hour difference)",
    },
    {
      label: "London to Tokyo",
      input: "2:00 PM, Europe/London → Asia/Tokyo",
      output: "11:00 PM the same day (9 hour difference)",
    },
  ],
  faqs: [
    {
      question: "Does this account for daylight saving time?",
      answer:
        "Yes — the conversion uses the actual time zone rules for the specific date you enter, so daylight saving time is applied or not applied automatically and correctly, rather than assuming a fixed year-round offset that would be wrong for part of the year.",
    },
    {
      question: "Why is India's offset a half hour (like +5:30) instead of a whole number?",
      answer:
        "A handful of time zones, including India Standard Time, use a 30- or 45-minute offset rather than a whole hour, for historical and geographic reasons specific to that region. This tool's conversion correctly handles those non-whole-hour offsets.",
    },
    {
      question: "Can the hour difference between two zones change depending on the date?",
      answer:
        "Yes — if one zone observes daylight saving time and the other doesn't (or they switch on different dates), the gap between them can shift by an hour for part of the year. That's why this tool calculates the difference based on the specific date you enter, not a fixed assumption.",
    },
    {
      question: "Why only 25 time zones instead of every possible one?",
      answer:
        "These 25 cover every major populated region and every distinct standard offset in use worldwide, giving accurate coverage for the vast majority of real scheduling needs without an overwhelming, hard-to-scan list of hundreds of nearly-identical zone names.",
    },
    {
      question: "Is the conversion accurate right at a daylight saving transition moment?",
      answer:
        "The conversion is accurate for any specific date and time you enter, correctly reflecting whichever side of a DST transition that moment falls on — it's only the handful of clock times that don't technically exist (during a \"spring forward\" transition) that fall into inherently ambiguous territory, same as with any time zone calculation.",
    },
  ],
};

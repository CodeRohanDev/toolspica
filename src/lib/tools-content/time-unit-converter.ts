import type { ToolContent } from "./types";

export const timeUnitConverterContent: ToolContent = {
  heroSubtitle: "Convert Between Seconds, Hours, Days, Years & More",
  overview: [
    "Time units seem simple until you need to convert across a wide range — seconds to years spans nine orders of magnitude, and units like \"month\" don't have a single fixed length the way seconds or hours do, since calendar months vary from 28 to 31 days. This tool converts between eight common time units, handling that ambiguity with clearly labeled average values where an exact fixed length doesn't exist.",
    "Seconds, minutes, hours, days, and weeks all have fixed, unambiguous lengths and convert cleanly. Months and years are different — this tool uses an average month (30.4375 days, based on the average Gregorian calendar year divided by 12) and a year based on 365.25 days (accounting for the extra day added roughly every 4 years in a leap year), both clearly the average/approximate values rather than a specific calendar month or year.",
    "This approach — using averages for month and year — is standard for a general-purpose time converter, since there's no single correct answer for \"how many seconds in a month\" without picking a specific month; February and July are genuinely different lengths. For date-specific calculations (like counting the exact days between two calendar dates), the dedicated Date Calculator handles that differently, using actual calendar dates rather than averages.",
    "This is useful for converting a duration between different units for planning or reporting purposes, understanding a value given in an unfamiliar time unit, or general calculations involving time spans where exact calendar-date precision isn't required.",
  ],
  howItWorks: [
    {
      title: "Enter a time value and select its unit",
      description: "Any of the eight supported time units.",
    },
    {
      title: "Select the target unit",
      description: "Or use the swap button to reverse direction.",
    },
    {
      title: "View the exact converted result",
      description: "Plus the value in every other supported unit at once.",
    },
  ],
  examples: [
    {
      label: "Hours to minutes",
      input: "2.5 hours",
      output: "150 minutes",
    },
    {
      label: "Days to weeks",
      input: "30 days",
      output: "4.285714 weeks",
    },
  ],
  faqs: [
    {
      question: "Why doesn't 'month' have one fixed conversion value?",
      answer:
        "Calendar months genuinely vary in length — 28 to 31 days depending on the specific month and whether it's a leap year — so there's no single exact answer for how many seconds are in \"a month\" without specifying which one. This tool uses the average month length (30.4375 days) as a clearly-labeled approximation for general conversion purposes.",
    },
    {
      question: "Why is the year based on 365.25 days instead of 365?",
      answer:
        "365.25 days accounts for the leap year that adds an extra day roughly every 4 years, giving a more accurate long-run average year length than a flat 365, which would drift noticeably over many years of conversions if used as the base.",
    },
    {
      question: "Should I use this for calculating the exact days between two specific dates?",
      answer:
        "No — for an exact difference between two specific calendar dates (accounting for the real number of days in each specific month involved), the dedicated Date Calculator is the right tool, since it works from actual calendar dates rather than average unit lengths.",
    },
    {
      question: "Are seconds, minutes, hours, days, and weeks exact or approximate?",
      answer:
        "These five units have fixed, unambiguous, exact lengths (60 seconds per minute, 24 hours per day, 7 days per week, and so on) and convert with no approximation involved — it's specifically month and year that require an average value due to their inherent calendar variability.",
    },
    {
      question: "Can I convert milliseconds to larger units like days or years?",
      answer:
        "Yes — the full range from milliseconds through years is supported, so you can convert directly between any two units regardless of how far apart they are in scale, useful for anything from precise timing measurements up to long-duration planning.",
    },
  ],
};

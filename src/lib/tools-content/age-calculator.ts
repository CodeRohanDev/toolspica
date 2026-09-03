import type { ToolContent } from "./types";

export const ageCalculatorContent: ToolContent = {
  heroSubtitle: "Calculate Exact Age in Years, Months & Days",
  overview: [
    "Most people know their age only as a round number of years, but plenty of situations call for something more precise — a medical intake form asking for exact age, a legal eligibility check tied to a specific date, or simple curiosity about exactly how long you've been alive down to the day. This tool calculates exact age in years, months, and days between a birth date and any reference date, rather than the rough estimate you'd get from just subtracting birth year from the current year.",
    "The calculation is calendar-aware, not a naive division of total days by 365.25. A naive approach breaks down around leap years and varying month lengths — dividing days lived by 365.25 gives a decent approximation but not the exact, legally and medically meaningful \"X years, Y months, Z days\" figure. This tool instead walks the calendar month by month and day by day, correctly handling short months, long months, and February in both leap and non-leap years, so the year/month/day breakdown is always exact.",
    "By default, age is calculated as of today, but the \"age as of\" field can be set to any other date — useful for figuring out how old you'll be on a specific future date (an event, an application deadline, a legal eligibility cutoff), or how old someone was on a specific date in the past. This flexibility is what separates a genuine age calculator from a simple \"years since birth\" subtraction.",
    "Beyond the years/months/days breakdown, the tool also shows total days lived and total weeks lived, which come up surprisingly often — a popular way to mark a specific day milestone (like turning 10,000 days old), or just genuine curiosity about the numbers behind a lifetime. It also shows the exact number of days remaining until the next birthday, useful for birthday planning or countdown purposes.",
  ],
  howItWorks: [
    {
      title: "Enter the date of birth",
      description: "Pick the birth date using the date field.",
    },
    {
      title: "Optionally change the reference date",
      description:
        "Defaults to today, but can be set to any past or future date to calculate age as of that day.",
    },
    {
      title: "View the exact breakdown",
      description:
        "See age in years, months, and days, plus total days lived, weeks lived, and days until the next birthday.",
    },
  ],
  examples: [
    {
      label: "Standard age calculation",
      input: "Date of birth: March 10, 1995 — Age as of: March 10, 2026",
      output: "31 years, 0 months, 0 days",
    },
    {
      label: "Leap year birthday, non-leap reference year",
      input: "Date of birth: February 29, 2000 — Age as of: March 1, 2025",
      output: "25 years, 0 months, 1 day",
    },
  ],
  faqs: [
    {
      question: "Why does this show years, months, and days instead of just a single age number?",
      answer:
        "A single year count (\"31 years old\") hides useful precision that some forms and situations genuinely need — a medical intake form, a legal eligibility check, or a precise age comparison. Showing the full years/months/days breakdown gives the exact figure rather than a rounded approximation.",
    },
    {
      question: "How does this handle someone born on February 29 in a leap year?",
      answer:
        "The calculation works from actual calendar dates, not a fixed 365-day year, so a February 29 birth date is handled correctly even when the reference year isn't a leap year — the tool correctly treats March 1 as the day after the anniversary in non-leap years.",
    },
    {
      question: "Can I calculate my age on a future date, not just today?",
      answer:
        "Yes — change the \"age as of\" field to any future or past date. This is useful for checking age-based eligibility on a specific date (like a program's application deadline) or figuring out exactly how old you'll be for a future event.",
    },
    {
      question: "Why is total days lived not exactly years times 365?",
      answer:
        "Leap years add an extra day roughly every four years, so the true day count over a lifetime is always somewhat higher than a simple years-times-365 estimate. The total days figure here is calculated from actual calendar dates, so it's exact.",
    },
    {
      question: "Is my date of birth sent anywhere?",
      answer:
        "No — the entire calculation runs locally in your browser using JavaScript. Your date of birth is never transmitted, logged, or stored anywhere.",
    },
  ],
};

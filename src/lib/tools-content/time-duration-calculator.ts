import type { ToolContent } from "./types";

export const timeDurationCalculatorContent: ToolContent = {
  heroSubtitle: "Calculate the Duration Between Two Clock Times",
  overview: [
    "Figuring out how long a shift, meeting, or event lasted from its start and end clock times sounds trivial, until the end time is on the other side of midnight — a shift running from 10:00 PM to 6:00 AM isn't a simple subtraction, since the end time appears to be \"before\" the start time on a 24-hour clock unless you account for the day rollover.",
    "This tool takes a start time and end time and calculates the exact duration between them in hours and minutes, plus decimal hours and total minutes. A dedicated toggle for \"end time is the next day\" handles the overnight-shift case correctly, adding a full 24 hours before calculating so a 10:00 PM to 6:00 AM shift correctly comes out to 8 hours rather than a nonsensical negative number.",
    "This is genuinely useful for payroll and timesheet calculations (converting a recorded start/end punch into total hours worked), scheduling (checking exactly how long a meeting or event block runs), and any situation where you have two clock times and need the elapsed duration between them — distinct from adding or subtracting already-known durations, which the separate Time Calculator handles.",
    "The result includes decimal hours specifically because payroll systems and hourly-rate calculations typically need duration expressed as a decimal (like 7.5 hours) rather than the more intuitive but less calculation-friendly \"7 hours 30 minutes\" format.",
  ],
  howItWorks: [
    {
      title: "Enter the start time",
      description: "The clock time the period began.",
    },
    {
      title: "Enter the end time",
      description: "The clock time the period ended. Toggle 'next day' if it spans midnight.",
    },
    {
      title: "View the duration",
      description: "Shown as hours and minutes, plus decimal hours and total minutes.",
    },
  ],
  examples: [
    {
      label: "Same-day duration",
      input: "9:00 AM to 5:30 PM",
      output: "8h 30m (8.5 decimal hours)",
    },
    {
      label: "Overnight shift",
      input: "10:00 PM to 6:00 AM (next day)",
      output: "8h 0m (8.0 decimal hours)",
    },
  ],
  faqs: [
    {
      question: "Why do I need to specify 'end time is the next day'?",
      answer:
        "A clock time alone (like 6:00 AM) doesn't say which day it falls on — without the toggle, an end time earlier in the day than the start time would appear to be a negative duration. Turning it on tells the calculator to treat the end time as the following day, correctly handling overnight shifts.",
    },
    {
      question: "Does this work for shifts longer than 24 hours?",
      answer:
        "No — this tool is built for a single start and end clock time within a one-day (or overnight) span. For a duration spanning multiple full days, the Date Calculator's difference mode, combined with clock times, is a better fit.",
    },
    {
      question: "Why is the result shown in decimal hours as well as hours and minutes?",
      answer:
        "Payroll systems and hourly billing typically require a decimal hours figure (like 7.5) to multiply against an hourly rate, while hours-and-minutes is more intuitive to read at a glance — this tool provides both so you have whichever format you need.",
    },
    {
      question: "Can I calculate the duration of a lunch break or meeting the same way?",
      answer:
        "Yes — enter the start and end time of any period, whether it's a work shift, a meeting, a break, or an event, and the tool calculates the exact elapsed duration between them.",
    },
    {
      question: "What happens if I enter the same start and end time?",
      answer:
        "The result shows a duration of 0 hours 0 minutes, correctly reflecting that no time elapsed between an identical start and end time.",
    },
  ],
};

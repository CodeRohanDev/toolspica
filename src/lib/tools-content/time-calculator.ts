import type { ToolContent } from "./types";

export const timeCalculatorContent: ToolContent = {
  heroSubtitle: "Add or Subtract Hours, Minutes & Seconds",
  overview: [
    "Adding or subtracting time values — two work shifts, a set of recorded task durations, a total across several video clips — is deceptively easy to get wrong by hand, because time doesn't carry the way normal decimal numbers do. Adding 2 hours 45 minutes to 1 hour 30 minutes isn't 3 hours 75 minutes; the 75 minutes needs to roll over into an extra hour and 15 minutes, and doing that carry correctly across hours, minutes, and seconds by hand invites mistakes.",
    "This tool takes two time values, each broken into hours, minutes, and seconds, and either adds or subtracts them, automatically handling every carry and borrow correctly. The result is shown both as a formatted H/M/S duration and as decimal hours (like 4.25 hours instead of 4h 15m), since decimal hours are often what's actually needed for timesheets, billing, or spreadsheet formulas.",
    "This is distinct from calculating the time between two clock times (like 9:00 AM to 5:30 PM) — that's a different calculation better suited to a dedicated duration-between-times tool. This tool is specifically for combining or comparing two already-known durations, like summing hours worked across multiple entries or figuring out the difference between two recorded time lengths.",
    "Subtraction can produce a negative result if the second time value is larger than the first — the tool shows this clearly with a minus sign rather than an unexpected large positive number, so it's immediately obvious which direction the difference runs.",
  ],
  howItWorks: [
    {
      title: "Enter Time A and Time B",
      description: "Break each into hours, minutes, and seconds.",
    },
    {
      title: "Choose add or subtract",
      description: "Add combines both durations; subtract calculates A minus B.",
    },
    {
      title: "Read the result",
      description: "Shown as a formatted H/M/S value and as decimal hours, updated live.",
    },
  ],
  examples: [
    {
      label: "Adding two durations",
      input: "2h 45m + 1h 30m",
      output: "4h 15m (4.25 decimal hours)",
    },
    {
      label: "Subtracting two durations",
      input: "3h 10m − 1h 40m",
      output: "1h 30m (1.5 decimal hours)",
    },
  ],
  faqs: [
    {
      question: "Why isn't 2h 45m + 1h 30m simply 3h 75m?",
      answer:
        "Minutes only go up to 59 before rolling over into an extra hour, the same way seconds roll over into minutes. 75 minutes is 1 hour and 15 minutes, so the correct total is 4h 15m — this tool handles that carry automatically.",
    },
    {
      question: "What are decimal hours used for?",
      answer:
        "Timesheets, billing systems, and spreadsheet formulas often expect a decimal hour value (like 4.25) rather than an H/M/S format, since decimal values are easier to sum and multiply by an hourly rate. This tool shows both formats so you have whichever one you need.",
    },
    {
      question: "What happens if I subtract a larger time from a smaller one?",
      answer:
        "The result shows as negative, with a minus sign in front of the H/M/S value, making clear that Time B was actually larger than Time A rather than showing a confusing large positive number.",
    },
    {
      question: "Is this the same as calculating the time between two clock times?",
      answer:
        "No — this tool combines or compares two already-known durations (like \"2 hours 45 minutes\"). For finding the elapsed time between two specific clock times (like 9:00 AM and 5:30 PM), the Time Duration Calculator is built specifically for that.",
    },
    {
      question: "Can I leave seconds blank if I don't need that precision?",
      answer:
        "Yes — any field left blank is treated as zero, so you can enter just hours and minutes (or even just hours) if that's all the precision you need.",
    },
  ],
};

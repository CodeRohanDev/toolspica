import type { ToolContent } from "./types";

export const workDaysCalculatorContent: ToolContent = {
  heroSubtitle: "Count Working Days Between Two Dates, Excluding Weekends and Holidays",
  overview: [
    "Calculating how many actual working days fall between two dates sounds simple until you realize weekends need to be excluded and any holidays in between shouldn't count either — doing this by hand on a calendar is slow and error-prone, especially across a multi-month range. This calculator counts every Monday through Friday between your start and end dates, and lets you exclude specific holiday dates too.",
    "Enter a start date, an end date, and optionally a list of holiday dates to skip, and get back the exact count of working days in the range. This is genuinely useful for project planning, calculating contractor or freelancer billing days, estimating delivery timelines that exclude weekends, or figuring out how many working days of PTO a date range actually covers.",
    "The calculation is inclusive of both the start and end dates if they themselves fall on a weekday, and treats Saturday and Sunday as non-working days by default — the standard convention most businesses use, though it doesn't currently account for regional differences where the weekend falls on different days.",
  ],
  howItWorks: [
    { title: "Set your start and end dates", description: "The date range you want to calculate." },
    { title: "List any holidays to exclude", description: "Optional — add specific dates to skip." },
    { title: "Get your working day count", description: "Weekends are automatically excluded." },
  ],
  examples: [
    { label: "Calculating a project timeline", input: "Jan 1 to Jan 31, excluding Jan 1 holiday", output: "21 working days" },
  ],
  faqs: [
    { question: "Are weekends always Saturday and Sunday?", answer: "Yes, currently — this calculator uses the standard Mon-Fri work week and doesn't support regions where the weekend falls on different days." },
    { question: "How do I add multiple holidays?", answer: "List them separated by commas or on separate lines, in YYYY-MM-DD format." },
    { question: "Are the start and end dates included in the count?", answer: "Yes — if either date falls on a weekday (and isn't listed as a holiday), it's included in the total." },
    { question: "Can I use this for calculating billable contractor days?", answer: "Yes — that's a common use case; just exclude any holidays your contract specifies as non-billable." },
    { question: "What if the end date is before the start date?", answer: "The calculator expects the start date to come first — swap them if you enter the range backwards." },
  ],
};

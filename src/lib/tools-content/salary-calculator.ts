import type { ToolContent } from "./types";

export const salaryCalculatorContent: ToolContent = {
  heroSubtitle: "Convert Salary Between Hourly, Weekly, Monthly & Annual",
  overview: [
    "A job offer quoted as an annual salary and another quoted as an hourly rate aren't directly comparable at a glance — converting both into the same unit is the only reliable way to actually compare their true value. This tool converts a salary figure entered in any pay period (hourly, daily, weekly, monthly, or annual) into all the others simultaneously, so you can compare offers, budget accurately, or just understand what a stated rate actually works out to.",
    "The conversion is built on a standard 52-week year, with your actual hours-per-week and days-per-week figures used to calculate the hourly and daily equivalents accurately — a salaried role assuming 40 hours a week converts differently than a part-time role at 25 hours a week, even at the same annual salary, since the effective hourly rate differs.",
    "This is genuinely useful in several real situations: comparing a new job offer quoted hourly against your current annual salary, figuring out what an advertised \"$25/hour\" role actually amounts to annually before deciding whether it clears your target income, or converting a monthly retainer or contract rate into an annual figure for tax or budgeting purposes.",
    "The default assumptions (40 hours per week, 5 days per week) match the most common full-time schedule, but both are adjustable — useful for calculating equivalents for a part-time role, a compressed 4-day work week, or any non-standard schedule where the standard 40-hour assumption wouldn't give an accurate hourly or daily figure.",
  ],
  howItWorks: [
    {
      title: "Enter your salary amount",
      description: "Any figure — hourly rate, weekly pay, or annual salary.",
    },
    {
      title: "Select the pay period it represents",
      description: "Choose hourly, daily, weekly, monthly, or annual.",
    },
    {
      title: "Adjust hours and days per week if needed",
      description: "Defaults to a standard 40-hour, 5-day work week.",
    },
  ],
  examples: [
    {
      label: "Hourly to annual",
      input: "$25/hour, 40 hours/week",
      output: "Annual: $52,000 — Monthly: $4,333.33 — Weekly: $1,000",
    },
    {
      label: "Annual to hourly",
      input: "$75,000/year, 40 hours/week",
      output: "Hourly: $36.06 — Weekly: $1,442.31 — Monthly: $6,250",
    },
  ],
  faqs: [
    {
      question: "Does this assume 52 weeks in a year exactly?",
      answer:
        "Yes — the conversion uses a standard 52-week year, which is the common assumption used in salary conversion calculations, even though a calendar year technically has slightly more than 52 weeks. This matches how most salary-to-hourly conversions are typically calculated.",
    },
    {
      question: "How does adjusting hours per week change the result?",
      answer:
        "It changes how an hourly, weekly, or annual figure converts into the others — a $50,000 annual salary at 40 hours a week converts to a different hourly rate than the same $50,000 salary at 30 hours a week, since the total hours worked per year differs.",
    },
    {
      question: "Does this account for taxes or deductions?",
      answer:
        "No — all figures shown are gross amounts before any tax withholding or deductions, matching the stated salary or rate exactly as entered. Take-home pay after taxes would be lower and depends on factors this tool doesn't calculate.",
    },
    {
      question: "Can I use this for a part-time job with fewer than 40 hours a week?",
      answer:
        "Yes — adjust the hours-per-week field to match the actual part-time schedule, and all the converted figures will accurately reflect that reduced schedule rather than assuming full-time hours.",
    },
    {
      question: "Why does the monthly figure use annual ÷ 12 instead of weekly × a fixed number of weeks?",
      answer:
        "Months have different numbers of days and don't divide evenly into weeks, so annual ÷ 12 is the standard, most accurate way to calculate a representative monthly figure rather than compounding rounding errors from a weekly-to-monthly conversion.",
    },
  ],
};

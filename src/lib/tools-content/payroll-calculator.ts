import type { ToolContent } from "./types";

export const payrollCalculatorContent: ToolContent = {
  heroSubtitle: "Estimate Net Pay From Gross Salary & Deductions",
  overview: [
    "The gap between gross pay (what's on the offer letter) and net pay (what actually lands in a bank account) is often surprisingly large once taxes and deductions are factored in — and understanding that gap for a specific paycheck requires working through the deductions in the right order, not just applying one flat percentage to the gross amount.",
    "This tool calculates net pay for a single pay period using the standard order real payroll systems follow: pre-tax deductions (like 401(k) or retirement contributions and certain insurance premiums) are subtracted from gross pay first, since they reduce the income that's actually taxed. Tax is then calculated on that reduced taxable income, not the full gross amount. Finally, post-tax deductions (like wage garnishments or after-tax benefit contributions) are subtracted to arrive at the final net pay.",
    "This ordering matters for accuracy: a pre-tax 401(k) contribution genuinely lowers your tax bill (since it reduces taxable income before tax is calculated), while a post-tax deduction doesn't provide that same tax benefit — mixing up which category a deduction belongs to produces a meaningfully wrong net pay estimate.",
    "Real payroll withholding is more complex than a single combined rate — it typically involves separate calculations for federal income tax, state income tax (where applicable), Social Security, and Medicare, each with its own rules and rate structure. This tool simplifies that into one combined withholding percentage you provide, useful for a quick estimate or planning purposes, but not a substitute for an actual payroll statement.",
  ],
  howItWorks: [
    {
      title: "Enter your gross pay for the period",
      description: "Before any deductions.",
    },
    {
      title: "Enter pre-tax deductions and your tax rate",
      description: "Pre-tax deductions reduce the income tax is calculated on.",
    },
    {
      title: "Enter any post-tax deductions",
      description: "Subtracted after tax to arrive at net pay.",
    },
  ],
  examples: [
    {
      label: "Net pay calculation",
      input: "Gross $4,000, pre-tax deductions $200, tax rate 22%, no post-tax deductions",
      output: "Taxable income: $3,800 — Tax withheld: $836 — Net pay: $2,964",
    },
  ],
  faqs: [
    {
      question: "Why does a pre-tax deduction reduce my tax bill more than a post-tax one?",
      answer:
        "A pre-tax deduction (like a traditional 401(k) contribution) is subtracted from gross pay before tax is calculated, so it lowers the income that's actually taxed. A post-tax deduction is subtracted after tax is already calculated on the full taxable amount, so it doesn't reduce your tax bill at all — it just reduces your final take-home amount.",
    },
    {
      question: "Why is this a simplified estimate rather than exact?",
      answer:
        "Real payroll withholding involves multiple separate taxes — federal income tax (using progressive brackets), state income tax (where applicable, with its own rules), Social Security, and Medicare — each calculated differently. This tool combines them into one rate you provide for a quick estimate, rather than modeling each tax separately.",
    },
    {
      question: "What counts as a typical pre-tax deduction?",
      answer:
        "Common pre-tax deductions include traditional 401(k) or retirement plan contributions, health insurance premiums paid through an employer plan, and certain flexible spending account contributions — check your specific benefits enrollment to see which of your deductions are classified as pre-tax.",
    },
    {
      question: "Can I use this to estimate an annual salary instead of a single pay period?",
      answer:
        "Yes — enter your figures for a full year instead of a single period (annual gross salary, annual pre-tax deductions, and so on) and the same calculation logic applies, just scaled to a yearly view instead of a per-paycheck one.",
    },
    {
      question: "Should I use this for actual payroll processing?",
      answer:
        "No — this is a planning and estimation tool, not payroll software. Actual payroll processing requires proper tax tables, compliance with current tax law, and correct handling of all applicable taxes — use a real payroll provider or accountant for that.",
    },
  ],
};

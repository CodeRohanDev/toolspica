import type { ToolContent } from "./types";

export const freelanceRateCalculatorContent: ToolContent = {
  heroSubtitle: "Calculate the Hourly Rate You Actually Need to Charge",
  overview: [
    "A common mistake when setting a freelance rate is dividing a desired salary by 2,080 hours (a standard full-time work year) — which badly overestimates actual billable capacity. Freelancers don't bill 40 hours a week, every week: time goes to admin work, marketing, unpaid pitching, vacation, and sick days, none of which generate revenue but all of which need to be covered by the rate charged on the hours that do.",
    "This tool calculates the real hourly rate needed by starting from what actually matters — desired take-home income — and working backward through every factor that affects it: annual business expenses (which need to be covered on top of take-home pay, not out of it), weeks off per year (vacation, sick time, and non-billable admin time), realistic billable hours per week (not total working hours), and an estimated tax rate (since self-employment income is taxed before it becomes actual take-home pay).",
    "The calculation grosses up your desired income and expenses by your tax rate first (since you need to earn more pre-tax to net a specific take-home amount), then divides that gross figure by your actual total billable hours for the year — accounting for both the weeks you're not working and the realistic non-billable time within the weeks you are.",
    "This is genuinely useful for setting a sustainable freelance rate from the start, rather than picking a number that sounds reasonable but doesn't actually cover real income needs once taxes, expenses, and realistic billable capacity are factored in — a common reason freelancers end up working far more hours than expected for less than intended pay.",
  ],
  howItWorks: [
    {
      title: "Enter your desired take-home income and expenses",
      description: "What you want to actually keep, plus what your business costs to run.",
    },
    {
      title: "Enter realistic weeks off and billable hours per week",
      description: "Not total working hours — just the hours you can actually bill a client for.",
    },
    {
      title: "Enter your estimated tax rate",
      description: "See the exact hourly rate that covers everything.",
    },
  ],
  examples: [
    {
      label: "Freelance rate calculation",
      input: "$80,000 desired income, $5,000 expenses, 4 weeks off, 25 billable hrs/week, 25% tax rate",
      output: "Required hourly rate: $94.44 — Day rate (8h): $755.56",
    },
  ],
  faqs: [
    {
      question: "Why isn't billable hours per week the same as total working hours?",
      answer:
        "A full-time freelancer working 40 hours a week rarely bills all 40 to clients — time goes to finding new work, admin, invoicing, and other unpaid tasks. Billable hours should reflect realistically how many hours per week actually generate client revenue, which is often significantly less than total time worked.",
    },
    {
      question: "Why does the calculation gross up income and expenses by the tax rate?",
      answer:
        "If you want to actually take home a specific amount after tax, you need to earn more than that amount pre-tax to cover the tax owed on it — dividing by (1 − tax rate) correctly calculates the larger gross figure needed to net your target take-home amount after tax is subtracted.",
    },
    {
      question: "Should business expenses be included in the rate calculation?",
      answer:
        "Yes — expenses like software subscriptions, equipment, insurance, and other business costs need to be covered by your rate on top of your desired personal income, since they come out of the same revenue before anything becomes actual take-home pay.",
    },
    {
      question: "Is the tax rate the same as an employee's tax rate?",
      answer:
        "Not necessarily — self-employed income is often subject to additional self-employment tax on top of regular income tax, so the effective rate for a freelancer is frequently higher than a comparable employee's withholding rate. Use a rate that reflects your actual expected self-employment tax burden.",
    },
    {
      question: "Why calculate a day rate alongside the hourly rate?",
      answer:
        "Some clients and project types are quoted by the day rather than the hour, so the day rate (simply the hourly rate × 8) gives a quick reference for that pricing format without needing a separate calculation.",
    },
  ],
};

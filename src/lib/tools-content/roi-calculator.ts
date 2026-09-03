import type { ToolContent } from "./types";

export const roiCalculatorContent: ToolContent = {
  heroSubtitle: "Calculate Return on Investment & Annualized ROI",
  overview: [
    "ROI (Return on Investment) measures how much profit an investment generated relative to what was put in — a straightforward percentage that answers \"was this worth it,\" whether the investment is a stock, a piece of real estate, a marketing campaign, or a business initiative. The basic formula is simple: net gain divided by the initial investment, times 100.",
    "This tool calculates that basic ROI from an initial investment and final value, showing both the net dollar gain and the ROI percentage. But basic ROI alone has a real limitation — it doesn't account for how long the investment took to produce that return, which makes comparing investments of different durations misleading. A 40% ROI over 6 months is a very different result than a 40% ROI over 10 years.",
    "That's why this tool also calculates annualized ROI when you provide a time period — using the compound annual growth rate (CAGR) formula, which expresses the return as an equivalent constant yearly growth rate. This makes it possible to fairly compare two investments with different holding periods on the same annualized basis, rather than being misled by a total ROI figure that doesn't account for time.",
    "This is useful for evaluating whether a specific investment performed well, comparing multiple investment opportunities with different time horizons, or checking a business initiative's return against a target hurdle rate before committing further resources.",
  ],
  howItWorks: [
    {
      title: "Enter your initial investment and final value",
      description: "What you put in, and what it's worth now (or was worth when sold/closed).",
    },
    {
      title: "Optionally add the time period",
      description: "In years — enables the annualized ROI calculation for fair comparison.",
    },
    {
      title: "View total and annualized ROI",
      description: "Net gain and both ROI figures calculated instantly.",
    },
  ],
  examples: [
    {
      label: "Basic ROI",
      input: "Invested $10,000, final value $14,000",
      output: "Net gain: $4,000 — ROI: 40%",
    },
    {
      label: "Annualized ROI over 2 years",
      input: "Invested $10,000, final value $14,000, over 2 years",
      output: "Total ROI: 40% — Annualized ROI: 18.32%",
    },
  ],
  faqs: [
    {
      question: "Why is annualized ROI lower than total ROI?",
      answer:
        "Total ROI is the full return over the entire holding period, while annualized ROI spreads that same return evenly across each year using compound growth math — for any holding period longer than one year, the annualized figure will always be lower than the total, since it represents the per-year growth rate rather than the cumulative total.",
    },
    {
      question: "Why does the time period matter for comparing investments?",
      answer:
        "A 40% return sounds identical whether it took 6 months or 10 years, but those represent vastly different actual performance — annualizing the return accounts for time, making it possible to fairly compare a short-term investment against a long-term one on equal footing.",
    },
    {
      question: "What does a negative ROI mean?",
      answer:
        "A negative ROI means the final value is lower than the initial investment — you lost money, and the percentage shown represents how much of your initial investment was lost, not gained.",
    },
    {
      question: "Does ROI account for inflation?",
      answer:
        "No — this calculates nominal ROI based on the raw dollar figures entered, without adjusting for inflation eroding purchasing power over the investment period. A high nominal ROI over a long period can represent a much smaller real (inflation-adjusted) return.",
    },
    {
      question: "Can I use this for a business investment, not just stocks or real estate?",
      answer:
        "Yes — ROI is a general-purpose measure applicable to any investment of resources with a measurable return, including a marketing campaign's return, a business initiative's payoff, or any other scenario with a clear initial cost and resulting value.",
    },
  ],
};

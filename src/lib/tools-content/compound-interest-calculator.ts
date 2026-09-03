import type { ToolContent } from "./types";

export const compoundInterestCalculatorContent: ToolContent = {
  heroSubtitle: "Calculate Compound Interest Growth Over Time",
  overview: [
    "Compound interest is often called one of the most powerful forces in personal finance, because unlike simple interest, each period's earned interest gets added back into the balance and starts earning interest itself — growth compounds on top of growth. Understanding exactly how much a given rate and compounding schedule actually produces over time is essential for evaluating savings accounts, investments, and loans alike.",
    "This tool calculates compound interest using the standard formula A = P(1 + r/n)^(nt), where P is the principal, r is the annual interest rate, n is how many times per year interest compounds, and t is the time in years. It supports the five most common compounding frequencies — annually, semi-annually, quarterly, monthly, and daily — since the same nominal annual rate produces a meaningfully different final balance depending on how often it compounds.",
    "The difference compounding frequency makes is real, not just theoretical: a 5% annual rate compounded monthly grows faster than the same 5% compounded only once a year, because interest starts earning interest sooner and more often. This is why comparing two savings or investment offers with the same headline rate but different compounding schedules can matter more than it first appears.",
    "This tool is genuinely useful for projecting how a savings account, CD, or investment will grow over a chosen time period, comparing offers with different rates or compounding frequencies, or working through finance coursework where compound interest is a foundational concept building toward more advanced topics like the time value of money.",
  ],
  howItWorks: [
    {
      title: "Enter the principal amount",
      description: "The starting balance or investment amount.",
    },
    {
      title: "Enter the annual interest rate and compounding frequency",
      description: "Choose how often interest compounds — annually through daily.",
    },
    {
      title: "Enter the time period in years",
      description: "See the final balance and total interest earned instantly.",
    },
  ],
  examples: [
    {
      label: "Monthly compounding",
      input: "Principal $1,000, rate 5%, 10 years, compounded monthly",
      output: "Final balance: $1,647.01 — Interest earned: $647.01",
    },
    {
      label: "Annual vs. daily compounding comparison",
      input: "Principal $1,000, rate 5%, 10 years",
      output: "Annually: $1,628.89 — Daily: $1,648.66",
    },
  ],
  faqs: [
    {
      question: "Why does the final balance change based on compounding frequency alone, with the same rate?",
      answer:
        "More frequent compounding means interest gets added to the balance sooner and more often, so each subsequent interest calculation happens on a slightly larger balance. Over enough time periods, this produces a meaningfully larger final balance even though the nominal annual rate never changed.",
    },
    {
      question: "What's the practical difference between monthly and daily compounding?",
      answer:
        "The difference is real but relatively small for most typical rates and time periods — daily compounding produces a slightly higher final balance than monthly, since interest compounds 365 times a year instead of 12, but the gap narrows as a percentage the longer the money is invested.",
    },
    {
      question: "Does this account for additional contributions over time?",
      answer:
        "No — this calculates growth on a single lump-sum principal with no additional deposits added during the term. For a projection including regular contributions, a dedicated savings-with-contributions calculator would be needed.",
    },
    {
      question: "How is compound interest different from simple interest?",
      answer:
        "Simple interest is calculated only on the original principal for the entire term. Compound interest recalculates on the growing balance (principal plus previously earned interest) at each compounding period, producing faster growth over time — the Simple Interest Calculator handles that separate calculation.",
    },
    {
      question: "Is this the same math banks and investment platforms use?",
      answer:
        "Yes — A = P(1 + r/n)^(nt) is the standard compound interest formula used across finance, banking, and investing to project or verify growth under a fixed rate and compounding schedule.",
    },
  ],
};

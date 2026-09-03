import type { ToolContent } from "./types";

export const taxCalculatorContent: ToolContent = {
  heroSubtitle: "Estimate Tax Owed With Progressive Brackets or a Flat Rate",
  overview: [
    "A progressive tax system doesn't apply one single rate to your entire income — instead, income is divided into brackets, and each bracket's portion is taxed at that bracket's own rate, with only the income above each threshold taxed at the next higher rate. This is why your \"marginal rate\" (the rate on your last dollar earned) is always higher than your \"effective rate\" (your actual total tax divided by your total income) under a progressive system — a common point of confusion.",
    "This tool calculates tax owed two ways: progressive brackets, which apply illustrative example tax brackets and rates the way a real income tax system works, and flat rate, which applies a single percentage to the entire income — useful for a jurisdiction or tax type that uses a flat rate, or for a simplified estimate. Both modes show the tax owed, effective rate, marginal rate, and resulting take-home amount.",
    "It's essential to understand what this tool is and isn't: the progressive bracket structure shown is a simplified, illustrative example matching the general shape of how a real progressive system works, not the official, current tax law for any specific country or year. Actual tax brackets, thresholds, deductions, credits, and rates vary significantly by country, change from year to year, and depend on filing status and many other factors this general tool doesn't account for.",
    "This is useful for understanding how progressive taxation works conceptually, getting a rough directional estimate, or comparing how a flat-rate versus progressive structure would affect the same income differently — but it is explicitly not a substitute for official tax software, a tax professional, or your local tax authority's actual current rates when you need an accurate, filing-ready number.",
  ],
  howItWorks: [
    {
      title: "Choose progressive brackets or a flat rate",
      description: "Progressive uses illustrative example brackets; flat applies one rate to everything.",
    },
    {
      title: "Enter your taxable income",
      description: "For flat mode, also set your chosen flat percentage.",
    },
    {
      title: "View the estimate",
      description: "Tax owed, effective rate, marginal rate, and take-home amount, all instantly.",
    },
  ],
  examples: [
    {
      label: "Progressive bracket estimate",
      input: "Income $60,000, progressive brackets",
      output: "Tax: $8,507.50 — Effective rate: 14.18% — Marginal rate: 22%",
    },
    {
      label: "Flat rate estimate",
      input: "Income $60,000, flat rate 20%",
      output: "Tax: $12,000 — Take-home: $48,000",
    },
  ],
  faqs: [
    {
      question: "Why is my effective tax rate lower than my marginal tax rate?",
      answer:
        "Under a progressive system, only the income within your highest bracket is taxed at your marginal rate — every dollar in the lower brackets is still taxed at their lower rates. Effective rate is your total tax divided by total income, which blends all the brackets together and always comes out lower than the top marginal rate.",
    },
    {
      question: "Are the tax brackets shown here official and accurate?",
      answer:
        "No — they're a simplified, illustrative example matching the general shape of a progressive tax system, not official current tax law for any specific country or year. Always check your local tax authority's actual current brackets, or consult a tax professional, for a real, filing-accurate calculation.",
    },
    {
      question: "When would I use flat rate mode instead of progressive?",
      answer:
        "Flat rate mode is useful for jurisdictions or tax types that apply a single percentage regardless of income level, or simply for a quick, simplified estimate when you already know (or want to test) a specific effective rate rather than working through a bracket structure.",
    },
    {
      question: "Does this account for deductions, credits, or exemptions?",
      answer:
        "No — this calculates tax on the taxable income figure you enter directly. Real tax calculations typically start from gross income and subtract various deductions and exemptions to arrive at taxable income first, which this tool doesn't calculate — you'd need to enter your already-determined taxable income.",
    },
    {
      question: "Can I rely on this for filing my actual taxes?",
      answer:
        "No — this tool is for general educational and estimation purposes only. Filing taxes accurately requires official, current-year tax software or a qualified tax professional who can account for your specific jurisdiction, filing status, deductions, and all applicable rules.",
    },
  ],
};

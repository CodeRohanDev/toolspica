import type { ToolContent } from "./types";

export const simpleInterestCalculatorContent: ToolContent = {
  heroSubtitle: "Calculate Simple Interest & Total Repayment",
  overview: [
    "Simple interest is the most straightforward way interest is calculated on a loan or deposit — interest accrues only on the original principal amount, at a fixed rate, for a set period of time, with no compounding along the way. It's used for many short-term loans, some auto loans, certain bonds, and basic savings calculations where the math intentionally stays simple rather than compounding.",
    "The formula is principal × rate × time, divided by 100 when the rate is expressed as a percentage — straightforward, but easy to fumble when time isn't a whole number of years, or when comparing multiple loan or deposit offers with different rates and terms. This tool takes the principal, annual interest rate, and time period in years and calculates the exact interest earned or owed, plus the total amount (principal plus interest).",
    "The key thing that distinguishes simple interest from compound interest is that the interest itself never earns additional interest — a $1,000 principal at 5% for 3 years always earns exactly $150 in interest total, evenly $50 per year, regardless of how the calculation is broken down. Compound interest, calculated by the separate Compound Interest Calculator, would produce a higher total because each period's interest gets added back into the principal before the next period's interest is calculated.",
    "This tool is useful for quickly checking a lender's stated interest figure on a simple-interest loan, comparing offers, or working through basic finance coursework where simple interest is typically taught before compound interest as the foundational concept.",
  ],
  howItWorks: [
    {
      title: "Enter the principal amount",
      description: "The original amount being loaned, borrowed, or deposited.",
    },
    {
      title: "Enter the annual interest rate",
      description: "As a percentage, e.g. 5 for 5%.",
    },
    {
      title: "Enter the time period",
      description: "In years — decimal values like 2.5 are supported.",
    },
  ],
  examples: [
    {
      label: "Simple interest calculation",
      input: "Principal $1,000, rate 5%, time 3 years",
      output: "Interest: $150 — Total: $1,150",
    },
    {
      label: "Fractional year",
      input: "Principal $2,000, rate 4%, time 1.5 years",
      output: "Interest: $120 — Total: $2,120",
    },
  ],
  faqs: [
    {
      question: "How is simple interest different from compound interest?",
      answer:
        "Simple interest is calculated only on the original principal for the entire term, so it grows the same fixed amount every period. Compound interest adds each period's interest back into the principal, so subsequent interest is calculated on a growing balance — resulting in a larger total over time for the same rate.",
    },
    {
      question: "Can I calculate simple interest for a period that isn't a whole number of years?",
      answer:
        "Yes — enter a decimal value like 1.5 for 18 months, or 0.5 for 6 months. The formula scales linearly with time, so fractional years work correctly.",
    },
    {
      question: "Is simple interest common for mortgages?",
      answer:
        "Most mortgages actually use amortized compound interest rather than simple interest, though the exact structure varies by loan type and lender. Simple interest is more common for certain short-term loans, some auto loans, and basic bonds.",
    },
    {
      question: "What does the 'total' figure represent?",
      answer:
        "Total is the principal plus the calculated interest — the full amount you'd owe at the end of a loan term, or the full amount you'd have at the end of a simple-interest deposit term.",
    },
    {
      question: "Does the interest rate need to be entered as a decimal or a whole number?",
      answer:
        "Enter it as a whole percentage number — 5 for 5%, not 0.05. The tool applies the percentage conversion internally.",
    },
  ],
};

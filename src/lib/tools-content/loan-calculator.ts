import type { ToolContent } from "./types";

export const loanCalculatorContent: ToolContent = {
  heroSubtitle: "Calculate Your Monthly Loan Payment & Total Interest",
  overview: [
    "Any fixed-rate installment loan — a personal loan, a car loan, a student loan, general business financing — follows the same underlying amortization math: a fixed monthly payment calculated so the loan is fully paid off, principal and interest combined, by the end of the term. This tool calculates that exact monthly payment for any loan amount, interest rate, and term.",
    "The calculation uses the standard loan amortization formula, the same one lenders use to generate the payment figure on a loan offer or pre-approval letter. Beyond the monthly payment, the tool shows the total interest you'll pay over the full life of the loan and the total amount repaid — numbers that matter just as much as the monthly payment when evaluating whether a loan is actually a good deal.",
    "Comparing two loan offers side by side often reveals a real tradeoff: a longer term typically means a lower, more affordable monthly payment, but meaningfully more total interest paid over the life of the loan. This tool makes that tradeoff visible by showing both numbers together, rather than just the monthly payment figure that's usually advertised most prominently.",
    "This is useful for budgeting before taking out a loan, comparing offers from different lenders with different rates or terms, or simply understanding what a loan you're already considering will actually cost beyond the monthly payment amount.",
  ],
  howItWorks: [
    {
      title: "Enter the loan amount",
      description: "The principal you're borrowing.",
    },
    {
      title: "Enter the annual interest rate and loan term",
      description: "The rate offered and how many years you'll be repaying.",
    },
    {
      title: "View your monthly payment and total cost",
      description: "See the fixed monthly payment, total interest, and total repayment instantly.",
    },
  ],
  examples: [
    {
      label: "Personal loan",
      input: "$20,000 loan, 6.5% rate, 5-year term",
      output: "Monthly payment: $391.32 — Total interest: $3,479.38",
    },
    {
      label: "Same loan, shorter term",
      input: "$20,000 loan, 6.5% rate, 3-year term",
      output: "Monthly payment: $612.98 — Total interest: $2,067.28",
    },
  ],
  faqs: [
    {
      question: "Why does a longer loan term mean paying more total interest?",
      answer:
        "A longer term spreads the same principal over more monthly payments, lowering each individual payment — but it also means the outstanding balance takes longer to pay down, giving interest more time to accumulate on the remaining balance, which increases the total interest paid over the full loan.",
    },
    {
      question: "Does this work for any type of fixed-rate loan?",
      answer:
        "Yes — the standard amortization formula used here applies to any fixed-rate installment loan structure, whether it's a personal loan, auto loan, student loan, or general financing, as long as the rate stays fixed for the full term.",
    },
    {
      question: "How is this different from the EMI Calculator?",
      answer:
        "They use the exact same underlying amortization formula — the difference is purely in terminology and typical audience. EMI is the term commonly used across India and South Asia for this same fixed monthly installment concept, while this tool uses more globally familiar terminology and currency-neutral framing.",
    },
    {
      question: "Does this account for loan origination fees or other upfront costs?",
      answer:
        "No — this calculates the payment based purely on the principal, rate, and term you enter. Real loans sometimes include origination fees or other upfront costs that effectively increase the true cost of borrowing beyond what the interest rate alone reflects.",
    },
    {
      question: "Can I use this to check if a lower advertised monthly payment is actually a better deal?",
      answer:
        "Yes — this is exactly the kind of comparison this tool is built for. Run both loan offers through the calculator and compare the total interest figure, not just the monthly payment, since a lower monthly payment from a longer term can end up costing significantly more overall.",
    },
  ],
};

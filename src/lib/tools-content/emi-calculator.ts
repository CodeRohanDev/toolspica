import type { ToolContent } from "./types";

export const emiCalculatorContent: ToolContent = {
  heroSubtitle: "Calculate Your Monthly EMI, Interest & Total Payment",
  overview: [
    "EMI — Equated Monthly Installment — is the fixed monthly payment amount used across home loans, personal loans, car loans, and business loans throughout India and much of Asia. Unlike a simple interest calculation, EMI is structured so the same fixed amount is paid every month for the full loan term, even though the actual split between principal and interest shifts with each payment — early payments are mostly interest, later payments are mostly principal.",
    "This tool calculates the exact EMI using the standard formula: EMI = P × r × (1+r)^n / ((1+r)^n − 1), where P is the loan principal, r is the monthly interest rate (annual rate divided by 12), and n is the total number of monthly installments. This is the same formula banks and lending institutions use to calculate the EMI figure shown on a loan offer.",
    "Beyond the monthly EMI figure itself, the tool shows the total interest payable over the full loan term and the total amount repaid (principal plus interest) — genuinely useful for understanding the real cost of a loan beyond just the monthly figure, since a lower EMI from a longer tenure often means paying significantly more total interest over the life of the loan.",
    "This is useful for comparing loan offers with different interest rates or tenures before committing, checking whether a monthly EMI fits your budget, or understanding exactly how much a loan will actually cost in total interest over its full term.",
  ],
  howItWorks: [
    {
      title: "Enter the loan amount",
      description: "The principal amount you're borrowing.",
    },
    {
      title: "Enter the annual interest rate and tenure",
      description: "The rate offered by your lender and the loan term in years.",
    },
    {
      title: "View your EMI",
      description: "See the fixed monthly payment, total interest, and total repayment instantly.",
    },
  ],
  examples: [
    {
      label: "Home loan EMI",
      input: "Loan ₹5,00,000, rate 9%, tenure 5 years",
      output: "EMI: ₹10,379.18 — Total interest: ₹1,22,750.66",
    },
    {
      label: "Shorter tenure, same rate",
      input: "Loan ₹5,00,000, rate 9%, tenure 3 years",
      output: "EMI: ₹15,899.87 — Total interest: ₹72,395.19",
    },
  ],
  faqs: [
    {
      question: "Why does a shorter loan tenure have a higher EMI but lower total interest?",
      answer:
        "A shorter tenure means the principal is repaid faster, so less time exists for interest to accumulate — resulting in a higher monthly payment but significantly less total interest paid over the loan's life, compared to spreading the same loan over a longer tenure.",
    },
    {
      question: "Does the EMI amount change from month to month?",
      answer:
        "No — the EMI itself stays fixed for the entire loan term (assuming a fixed interest rate), but the split between how much of each payment goes to interest versus principal changes over time, with interest making up a larger share early on and principal making up more later.",
    },
    {
      question: "How is EMI different from a general loan calculator?",
      answer:
        "EMI uses exactly the same underlying formula as any standard amortizing loan calculation — the terminology and typical currency context (rupees, Indian lending institutions) is what distinguishes \"EMI\" as a term, most commonly used across India and South Asia for the same fixed monthly installment concept.",
    },
    {
      question: "What happens if the interest rate is 0%?",
      answer:
        "With a 0% interest rate, the EMI is simply the loan amount divided evenly across the number of months in the tenure, since there's no interest component to calculate — some promotional 0% financing offers work exactly this way.",
    },
    {
      question: "Can I use this for a floating (variable) interest rate loan?",
      answer:
        "This calculator assumes a fixed interest rate for the full tenure. For a floating-rate loan, the EMI (or the tenure) typically changes whenever the rate resets — you'd need to recalculate with the new rate at each reset point to see the updated EMI.",
    },
  ],
};

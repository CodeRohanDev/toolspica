import type { ToolContent } from "./types";

export const carLoanCalculatorContent: ToolContent = {
  heroSubtitle: "Calculate Your Monthly Car Payment and Total Interest",
  overview: [
    "Before signing a car loan, knowing your actual monthly payment and total interest cost requires the same amortization math banks use internally — a formula involving the loan principal, monthly interest rate, and number of payments that isn't something you can accurately estimate by simple division.",
    "This calculator takes the vehicle price, your down payment, any trade-in value, the loan's APR, and the loan term in months, computes the remaining loan principal, and applies the standard amortizing-loan payment formula to give you the exact fixed monthly payment.",
    "It also shows total interest paid over the life of the loan — often a surprisingly large number on longer terms — so you can compare how a shorter term with a higher monthly payment stacks up against a longer term that costs less per month but far more in total interest.",
  ],
  howItWorks: [
    { title: "Enter loan details", description: "Input vehicle price, down payment, trade-in value, and APR." },
    { title: "Set the loan term", description: "Adjust the slider to your loan length in months." },
    { title: "Read your monthly payment", description: "See monthly payment, loan amount, and total interest instantly." },
  ],
  examples: [
    {
      label: "$30,000 car, $3,000 down, 6.5% APR, 60 months",
      input: "Price: $30,000, Down: $3,000, APR: 6.5%, Term: 60mo",
      output: "Monthly payment: ≈ $529, Total interest: ≈ $4,713",
    },
  ],
  faqs: [
    {
      question: "Does this include taxes and fees?",
      answer: "No — this calculates payment based purely on vehicle price minus down payment and trade-in. Sales tax, registration, and dealer fees vary by state and dealer, and would typically be added to the financed amount.",
    },
    {
      question: "Why does a longer loan term cost more overall?",
      answer: "A longer term spreads the same principal over more payments, lowering each monthly payment, but interest accrues over a longer period, increasing the total interest paid across the life of the loan.",
    },
    {
      question: "What APR should I use if I don't have a quote yet?",
      answer: "Check current average auto loan rates for your credit tier as a starting estimate, then update the calculator once you receive an actual rate quote from a lender.",
    },
    {
      question: "Is my loan information private?",
      answer: "Yes — every calculation runs locally in your browser. No financial details are transmitted or stored.",
    },
  ],
};

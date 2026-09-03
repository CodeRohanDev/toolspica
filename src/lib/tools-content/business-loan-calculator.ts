import type { ToolContent } from "./types";

export const businessLoanCalculatorContent: ToolContent = {
  heroSubtitle: "Calculate Payments Including Origination Fees",
  overview: [
    "A business loan's true cost often differs meaningfully from a personal loan's in one specific way: origination fees. Many business lenders charge an upfront percentage fee deducted from the loan proceeds before the funds are disbursed — meaning you're repaying the full principal amount through your monthly payments, but actually received less than that amount in your account on day one.",
    "This tool calculates the standard monthly payment and total interest the same way any amortizing loan does, but adds the origination fee calculation on top — showing both the fee amount and, critically, the net funds you'd actually receive after the fee is deducted. This distinction matters for accurately comparing loan offers: two loans with the same rate and term but different origination fees result in genuinely different net proceeds for the same repayment obligation.",
    "Business loan terms are also commonly quoted in months rather than years (a 36-month term, an 18-month term), which is why this tool accepts the term directly in months rather than requiring a years-to-months conversion first — matching how most business lenders actually present their loan terms.",
    "This is useful for comparing business loan offers with different origination fees, understanding the real net funding a loan provides versus its face value, and budgeting for the actual monthly payment obligation a business loan creates.",
  ],
  howItWorks: [
    {
      title: "Enter the loan amount, rate, and term in months",
      description: "Standard business loan terms are typically quoted in months.",
    },
    {
      title: "Enter the origination fee percentage",
      description: "Enter 0 if the lender doesn't charge one.",
    },
    {
      title: "View your payment, total cost, and net funds received",
      description: "See the monthly payment, total interest, and how the fee affects actual proceeds.",
    },
  ],
  examples: [
    {
      label: "Business loan with origination fee",
      input: "$50,000 loan, 9% rate, 36-month term, 2% origination fee",
      output: "Monthly payment: $1,589.99 — Fee: $1,000 — Net funds received: $49,000",
    },
  ],
  faqs: [
    {
      question: "Why do I repay the full loan amount even though I received less due to the fee?",
      answer:
        "The origination fee is deducted from the disbursement, not from what you owe — you still owe and repay the full principal amount according to the amortization schedule, but only actually received the principal minus the fee upfront. This effectively makes the true cost of borrowing higher than the stated interest rate alone suggests.",
    },
    {
      question: "How does an origination fee affect the true cost of a loan compared to one with no fee?",
      answer:
        "Two loans with identical rates and terms but different origination fees aren't equally good deals — the one with the higher fee provides less net funding for the same repayment obligation, effectively raising the real cost of borrowing beyond what the interest rate alone reflects.",
    },
    {
      question: "Why are business loan terms typically in months rather than years?",
      answer:
        "Many business loans — especially shorter-term working capital loans — run for periods like 12, 18, or 36 months rather than clean multi-year terms, so lenders commonly quote and structure them in months directly rather than in years.",
    },
    {
      question: "Are all business loans subject to an origination fee?",
      answer:
        "No — it varies significantly by lender and loan type. Some traditional bank loans charge no origination fee at all, while some alternative and online lenders charge a meaningful percentage. Enter 0 if your specific loan offer doesn't include one.",
    },
    {
      question: "Does this account for other fees like prepayment penalties or annual fees?",
      answer:
        "No — this calculates the standard amortization payment plus the one-time origination fee only. Other fee structures like prepayment penalties, annual maintenance fees, or draw fees on a line of credit would need to be factored in separately when comparing offers.",
    },
  ],
};

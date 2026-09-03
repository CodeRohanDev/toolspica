import type { ToolContent } from "./types";

export const mortgageCalculatorContent: ToolContent = {
  heroSubtitle: "Calculate Your Full Monthly Mortgage Payment (PITI)",
  overview: [
    "A mortgage payment is genuinely more than just principal and interest — the full monthly cost of homeownership typically includes property tax and homeowners insurance too, commonly abbreviated as PITI (Principal, Interest, Taxes, Insurance). A calculator that only shows principal and interest can understate the real monthly cost by hundreds of dollars, which is exactly the gap this tool is built to close.",
    "Start with the home price and your planned down payment — the tool calculates the actual loan principal (home price minus down payment) automatically, since that's the amount actually being financed and amortized, not the full home price. From there, it applies the standard mortgage amortization formula to calculate the principal and interest portion of your monthly payment over the loan term (commonly 15 or 30 years).",
    "Property tax and homeowners insurance are entered as annual figures (matching how they're typically quoted) and converted to their monthly equivalent automatically, then added to the principal and interest to show the true total monthly payment — a number that maps much more closely to what actually leaves your bank account each month than a bare principal-and-interest figure would.",
    "This is genuinely useful for realistic home-buying budgeting, comparing how a larger down payment reduces your monthly payment, or understanding how property tax and insurance costs in a specific area affect total affordability beyond just the loan itself. It's worth noting that PMI (private mortgage insurance, often required with a down payment under 20%) and HOA fees aren't included here, since they vary too specifically by lender and property to calculate generically.",
  ],
  howItWorks: [
    {
      title: "Enter the home price and down payment",
      description: "The loan principal is calculated automatically as the difference.",
    },
    {
      title: "Enter the interest rate and loan term",
      description: "Commonly 15 or 30 years for a standard mortgage.",
    },
    {
      title: "Optionally add property tax and insurance",
      description: "Annual figures, converted to monthly and added to your total payment.",
    },
  ],
  examples: [
    {
      label: "Full PITI mortgage payment",
      input: "$350,000 home, $70,000 down, 6.5% rate, 30 years, $3,500 tax, $1,200 insurance",
      output: "Total monthly payment: $2,161.46 (P&I: $1,769.79 + tax: $291.67 + insurance: $100)",
    },
  ],
  faqs: [
    {
      question: "What does PITI stand for?",
      answer:
        "Principal, Interest, Taxes, and Insurance — the four components that typically make up a complete monthly mortgage payment, as opposed to just the principal-and-interest figure often advertised as \"the payment\" on a rate quote.",
    },
    {
      question: "Why isn't PMI (private mortgage insurance) included?",
      answer:
        "PMI is typically required when a down payment is below 20% of the home price, but its exact rate varies significantly by lender, loan type, and credit profile, making it impossible to calculate generically the way property tax and homeowners insurance can be estimated from stated annual figures.",
    },
    {
      question: "How does a bigger down payment affect the monthly payment?",
      answer:
        "A larger down payment reduces the loan principal directly, which lowers the principal-and-interest portion of the monthly payment (and often helps avoid PMI if it crosses the 20% threshold) — the property tax and insurance portions stay the same regardless of down payment size, since they're based on the home's value, not the loan amount.",
    },
    {
      question: "Why do property tax and insurance need to be entered as annual figures?",
      answer:
        "Property tax bills and home insurance premiums are almost always quoted as annual amounts (even though they're often paid monthly through an escrow account), so entering the annual figure and letting the tool divide by 12 matches how you'd actually find these numbers from a tax assessment or insurance quote.",
    },
    {
      question: "Is a 15-year or 30-year mortgage term better?",
      answer:
        "This depends on individual financial priorities — a 15-year term has a higher monthly payment but pays off the loan faster with significantly less total interest, while a 30-year term has a lower, more manageable monthly payment but costs considerably more in total interest over the life of the loan. Run both terms through this calculator to compare the actual numbers for your specific loan amount and rate.",
    },
  ],
};

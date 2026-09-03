import type { ToolContent } from "./types";

export const loanAmortizationCalculatorContent: ToolContent = {
  heroSubtitle: "See Your Full Month-by-Month Loan Payment Schedule",
  overview: [
    "A loan's fixed monthly payment stays the same every month, but the split between how much goes toward interest versus principal shifts significantly over the life of the loan — early payments are mostly interest, while later payments are mostly principal. An amortization schedule is the month-by-month breakdown that shows exactly this shift, and it's the level of detail a simple monthly-payment calculator doesn't provide.",
    "This tool generates a complete amortization schedule for any loan amount, interest rate, and term — every single monthly payment, broken into its principal and interest components, alongside the remaining loan balance after that payment. Each row's interest is calculated on the current outstanding balance, which is exactly why the interest portion shrinks and the principal portion grows every month even though the total payment stays fixed.",
    "Seeing the full schedule reveals something a summary total doesn't: how slowly the balance actually drops in the early years of a longer loan, since so much of each early payment goes toward interest rather than reducing principal. This is genuinely useful for understanding the real impact of an extra payment (which goes straight to principal and effectively skips ahead in the schedule), or for verifying a lender's own amortization table matches what the stated rate and term should produce.",
    "The final row of the schedule is adjusted to exactly zero out the remaining balance, correctly accounting for the small rounding differences that accumulate over many months of a fixed payment amount — a detail that matters for the schedule to be mathematically accurate down to the last payment.",
  ],
  howItWorks: [
    {
      title: "Enter the loan amount, rate, and term",
      description: "The same inputs as a standard loan calculator.",
    },
    {
      title: "View the summary totals",
      description: "Monthly payment, total interest, and total payment at a glance.",
    },
    {
      title: "Scroll the full schedule",
      description: "Every payment's principal, interest, and remaining balance, month by month.",
    },
  ],
  examples: [
    {
      label: "3-year loan amortization summary",
      input: "$20,000 loan, 6.5% rate, 3-year term",
      output: "Monthly payment: $612.98 — Total interest: $2,067.28",
    },
  ],
  faqs: [
    {
      question: "Why does the interest portion of my payment shrink every month?",
      answer:
        "Interest for each payment is calculated on the current outstanding balance, which decreases every month as principal gets paid down. A smaller balance means a smaller interest charge, so a growing share of each fixed payment goes toward principal as the loan progresses.",
    },
    {
      question: "How does an extra payment affect the amortization schedule?",
      answer:
        "An extra payment applied directly to principal reduces the outstanding balance immediately, which reduces the interest charged in every subsequent month and can significantly shorten the effective loan term — this schedule shows the standard payment path, but the effect of an extra payment can be estimated by mentally skipping ahead to a lower balance at that point in the table.",
    },
    {
      question: "Why does the last payment sometimes differ slightly from the others?",
      answer:
        "Small rounding differences accumulate across many months of a fixed payment amount, so the final payment is adjusted to exactly bring the remaining balance to zero, ensuring the loan is fully paid off exactly at the end of the term rather than leaving a tiny residual balance.",
    },
    {
      question: "Can I use this for a mortgage as well as a smaller loan?",
      answer:
        "Yes — the amortization math is identical regardless of loan size, though a 30-year mortgage produces a 360-row schedule, which the scrollable table handles the same way as a shorter loan's schedule.",
    },
    {
      question: "How is this different from the basic Loan Calculator?",
      answer:
        "The Loan Calculator shows summary totals only — monthly payment, total interest, total repayment. This tool shows those same totals plus the complete month-by-month breakdown of every individual payment, useful when you need to see the detail behind the summary numbers.",
    },
  ],
};

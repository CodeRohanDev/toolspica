import type { ToolContent } from "./types";

export const savingsGoalCalculatorContent: ToolContent = {
  heroSubtitle: "Calculate the Monthly Savings Needed to Hit Your Goal",
  overview: [
    "Working backward from a specific savings goal — a down payment, an emergency fund, a big purchase — to the monthly contribution needed to actually get there is a genuinely different calculation than projecting forward from a fixed monthly amount. This tool solves that reverse problem: given a target amount, a deadline, and an expected rate of return, what monthly contribution actually closes the gap.",
    "The calculation starts by projecting your current savings forward with compound growth to see how much of the goal that existing balance will cover on its own by the target date. Whatever gap remains between that projected amount and the full goal is then solved for as a required monthly contribution, using the same future-value-of-a-series math that governs any regular contribution plan, run in reverse.",
    "If your current savings, projected forward with growth, are already enough to reach the goal by the deadline on their own, the required monthly contribution correctly comes out to zero — the tool doesn't just blindly divide the goal by the number of months without first accounting for what your existing balance will grow into.",
    "This is genuinely useful for setting a concrete, actionable monthly savings target rather than a vague \"save more\" intention — turning a goal amount and deadline into an exact number you can actually set up as a recurring transfer, and understanding how much of the goal is expected to come from your own contributions versus investment growth.",
  ],
  howItWorks: [
    {
      title: "Enter your savings goal and current savings",
      description: "The target amount, and what you've already saved toward it.",
    },
    {
      title: "Enter your timeline and expected return",
      description: "How long you have, and an assumed annual growth rate.",
    },
    {
      title: "View your required monthly contribution",
      description: "The exact monthly amount needed to close the gap by your deadline.",
    },
  ],
  examples: [
    {
      label: "Savings goal calculation",
      input: "$20,000 goal, $2,000 current savings, 3 years, 5% expected return",
      output: "Required monthly contribution: $454.25",
    },
  ],
  faqs: [
    {
      question: "Why does the required monthly contribution account for my current savings' growth?",
      answer:
        "Your existing savings balance doesn't just sit still — it grows at the assumed rate of return over the timeline too, reducing how much new monthly contribution is actually needed. Ignoring that growth would overstate the required monthly amount, especially for a longer timeline or larger existing balance.",
    },
    {
      question: "What happens if my current savings are already enough to reach the goal?",
      answer:
        "If your current savings, projected forward with growth, are expected to meet or exceed the goal by your deadline on their own, the required monthly contribution comes out to zero — you don't need to add anything more, assuming the projected growth rate holds.",
    },
    {
      question: "Is the expected return rate guaranteed?",
      answer:
        "No — like any investment growth assumption, the rate you enter is a planning estimate, not a guarantee. If you're saving in a non-investment account like a basic savings account, use a lower rate reflecting that account's actual interest rate rather than an investment-level return assumption.",
    },
    {
      question: "Can I use this for a short-term goal, like an emergency fund in 6 months?",
      answer:
        "Yes — enter a fractional year value like 0.5 for a 6-month timeline. For such a short period, the expected return rate typically has a much smaller effect on the result, since there's little time for growth to compound meaningfully.",
    },
    {
      question: "Should I use a savings account or investment growth rate for a short-term goal?",
      answer:
        "For a short-term goal (generally under a few years), a conservative, low-volatility rate — reflecting a high-yield savings account rather than stock market returns — is usually more appropriate, since a short-term goal doesn't have time to recover from market downturns the way a long-term goal would.",
    },
  ],
};

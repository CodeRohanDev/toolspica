import type { ToolContent } from "./types";

export const algebraCalculatorContent: ToolContent = {
  heroSubtitle: "Simplify Algebraic Expressions & Evaluate at Any x",
  overview: [
    "An algebraic expression like 3x + 2(x − 4) + 7 can be simplified by expanding parentheses and combining like terms — a process that's mechanical but easy to make a small sign or arithmetic error in, especially with multiple parentheses or negative coefficients involved.",
    "This tool simplifies any linear or quadratic expression in x into its cleanest equivalent form (like 5x − 1), regardless of how the original expression is written. Rather than symbolically expanding and combining terms the way a person would on paper, it evaluates the expression at a few sample points and mathematically reconstructs the underlying simplified polynomial — a technique that's immune to the sign errors and dropped terms that make manual simplification error-prone.",
    "Beyond simplifying, you can also evaluate the expression at any specific value of x — useful for checking a specific case, plugging in a known value, or verifying that a simplified form actually matches the original expression by testing it against the same input.",
    "This is useful for checking algebra homework for expansion and simplification errors, evaluating an expression at a specific value quickly, verifying that two differently-written expressions are actually equivalent, and general algebra practice and learning.",
  ],
  howItWorks: [
    {
      title: "Enter an expression in x",
      description: "Including parentheses, exponents, and coefficients as needed.",
    },
    {
      title: "See the simplified form",
      description: "Expanded and combined into its cleanest equivalent expression.",
    },
    {
      title: "Optionally evaluate at a specific x",
      description: "Plug in any number to see the expression's value there.",
    },
  ],
  examples: [
    {
      label: "Simplifying an expression with parentheses",
      input: "3x + 2(x - 4) + 7",
      output: "5x - 1",
    },
    {
      label: "Expanding a squared binomial",
      input: "(x + 2)^2",
      output: "x² + 4x + 4",
    },
  ],
  faqs: [
    {
      question: "How does this simplify expressions without doing algebra step by step?",
      answer:
        "It evaluates the expression at a few sample x values and reconstructs the equivalent simplified polynomial from those results — any two algebraically equivalent expressions always produce identical output at every input, so this recovers the correct simplified form regardless of how the original was written.",
    },
    {
      question: "Can this simplify expressions with more than an x² term?",
      answer:
        "No — it's built for linear and quadratic expressions (degree 1 and 2 in x). Higher-degree expressions, or ones involving trigonometric or logarithmic functions of x, fall outside what it can simplify and will show an error instead of an incorrect result.",
    },
    {
      question: "What's the difference between this and the Equation Solver tool?",
      answer:
        "The Equation Solver finds the value(s) of x that make an equation true (something = something else). This tool works with a single expression (no equals sign) and simplifies it or evaluates it at a chosen x — related but different tasks.",
    },
    {
      question: "Why would I want to evaluate an expression instead of just simplifying it?",
      answer:
        "Sometimes you need the expression's value for one specific case rather than its general simplified form — like checking what a formula gives at a particular input, or verifying your simplified version actually matches the original by testing both at the same x.",
    },
    {
      question: "Is (x+2)^2 the same as x^2 + 4?",
      answer:
        "No — this is a very common algebra mistake. (x+2)^2 expands to x² + 4x + 4 (via the FOIL method or binomial expansion), not x² + 4. This tool's simplification would immediately reveal that discrepancy if you tested both forms.",
    },
  ],
};

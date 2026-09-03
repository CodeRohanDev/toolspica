import type { ToolContent } from "./types";

export const graphingCalculatorContent: ToolContent = {
  heroSubtitle: "Plot Any Function y = f(x) Instantly",
  overview: [
    "Seeing a function's shape often reveals things a formula alone doesn't — where it crosses zero, whether it has a maximum or minimum, how steeply it rises or falls, or whether it repeats in a pattern. Graphing by hand, point by point, is tedious and easy to get subtly wrong near curves and turning points.",
    "This tool plots any function of x on a canvas, supporting standard arithmetic (+, −, ×, ÷, exponents), parentheses, implicit multiplication (like 2x or 2(x+1)), and common functions including sin, cos, tan, sqrt, abs, log, ln, and exp. Adjust the visible x-range to zoom into a specific region or see the broader shape of the curve.",
    "The expression is parsed with a proper tokenizer and recursive-descent parser rather than a shortcut evaluation method, correctly handling operator precedence (multiplication before addition), right-associative exponents (2^3^2 means 2^(3^2)), and unary minus interacting correctly with exponentiation (−2^2 equals −4, not 4) — all verified against hand-computed expected values.",
    "This is useful for visualizing algebra and precalculus functions for homework, checking the shape of a function before working with it analytically, exploring how changing coefficients affects a graph's shape, and general math learning and exploration.",
  ],
  howItWorks: [
    {
      title: "Enter a function of x",
      description: "Using standard notation: x^2, sin(x), sqrt(x), 2(x+1), and so on.",
    },
    {
      title: "Set the x-axis range",
      description: "Adjust the min and max to zoom in or see the broader shape.",
    },
    {
      title: "View the plotted curve",
      description: "The y-axis scales automatically to fit the function's values.",
    },
  ],
  examples: [
    {
      label: "Graphing a parabola",
      input: "x^2 - 2x - 3",
      output: "A parabola crossing the x-axis at x = -1 and x = 3",
    },
    {
      label: "Graphing a trigonometric function",
      input: "sin(x)",
      output: "A smooth wave oscillating between -1 and 1",
    },
  ],
  faqs: [
    {
      question: "What notation should I use for exponents and multiplication?",
      answer:
        "Use ^ for exponents (x^2 for x squared) and either * or implicit adjacency for multiplication (2x and 2*x both work, as does 2(x+1) for distributing). Parentheses group terms exactly as in standard math notation.",
    },
    {
      question: "Why does part of my graph appear to be missing?",
      answer:
        "This usually happens where the function is undefined or produces an extreme value within the current x-range — like tan(x) near its vertical asymptotes, or sqrt() of a negative number. The tool breaks the line at those points rather than drawing a misleading connection across them.",
    },
    {
      question: "How is the y-axis scale determined?",
      answer:
        "It automatically fits to the function's actual minimum and maximum values across the visible x-range, with a small padding margin — this keeps the curve's shape clearly visible regardless of how large or small its values are.",
    },
    {
      question: "Which functions are supported?",
      answer:
        "sin, cos, tan, asin, acos, atan, sqrt, abs, exp, log (base 10), and ln (natural log), along with the constants pi and e — covering the functions most commonly needed for algebra, precalculus, and early calculus graphing.",
    },
    {
      question: "Why does 2^3^2 evaluate to 512, not 64?",
      answer:
        "Exponentiation is right-associative in standard mathematical convention, meaning 2^3^2 is evaluated as 2^(3^2) = 2^9 = 512, not (2^3)^2 = 64. This tool follows that same standard convention, matching how graphing calculators and programming languages handle chained exponents.",
    },
  ],
};

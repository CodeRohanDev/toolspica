import type { ToolContent } from "./types";

export const factorialCalculatorContent: ToolContent = {
  heroSubtitle: "Calculate Factorials of Any Size Exactly",
  overview: [
    "A factorial (written n!) is the product of every whole number from 1 up to n — 5! means 5×4×3×2×1, which equals 120. Factorials grow explosively fast: 10! is already over 3.6 million, and 20! exceeds 2.4 quintillion, far beyond what a normal calculator or even standard JavaScript numbers can represent exactly.",
    "This tool computes factorials using JavaScript's BigInt type, which handles arbitrarily large whole numbers with full precision — meaning the result is always mathematically exact, never rounded or approximated, no matter how large the input. The digit count of the result is also shown, since for large factorials, the sheer size of the number is often as interesting as the digits themselves.",
    "Factorials are foundational to combinatorics — counting the number of ways to arrange n distinct items in order is exactly n!, and factorials appear throughout probability, statistics, and the binomial coefficient formula used for combinations and permutations.",
    "This is useful for combinatorics and probability homework, understanding how quickly factorial growth outpaces exponential growth, checking permutation and combination calculations, and general curiosity about how large these numbers actually get.",
  ],
  howItWorks: [
    {
      title: "Enter a whole number n",
      description: "Any non-negative integer.",
    },
    {
      title: "The factorial computes exactly",
      description: "Using arbitrary-precision arithmetic — no rounding, ever.",
    },
    {
      title: "See the result and its digit count",
      description: "Large factorials can have hundreds or thousands of digits.",
    },
  ],
  examples: [
    {
      label: "Computing a small factorial",
      input: "5!",
      output: "120",
    },
    {
      label: "Computing a large factorial",
      input: "20!",
      output: "2,432,902,008,176,640,000",
    },
  ],
  faqs: [
    {
      question: "What is 0! and why does it equal 1?",
      answer:
        "By mathematical convention, 0! is defined as 1, not 0. This isn't arbitrary — it keeps formulas involving factorials (like combinations and permutations) mathematically consistent, since choosing 0 items from a set can be done in exactly one way (choosing nothing).",
    },
    {
      question: "Why does this need special handling for large numbers?",
      answer:
        "Standard JavaScript numbers lose precision beyond about 9 quadrillion (2^53), which factorials blow past almost immediately — 18! already exceeds that limit. This tool uses BigInt arithmetic instead, which represents whole numbers of any size with complete precision.",
    },
    {
      question: "Why is there a limit around 5000?",
      answer:
        "Factorials of very large numbers produce results with thousands of digits — 5000! has over 16,000 digits. Beyond that point, the result becomes impractical to display or use meaningfully, so the tool caps input to keep results genuinely useful rather than just an enormous unreadable string.",
    },
    {
      question: "How fast does factorial growth compare to exponential growth?",
      answer:
        "Factorial growth eventually outpaces any fixed exponential growth rate — while 2^n grows fast, n! eventually grows even faster because each additional term in the factorial product is itself getting larger, not staying at a fixed base like exponential growth does.",
    },
    {
      question: "What are factorials actually used for?",
      answer:
        "They count the number of ways to arrange a set of distinct items — 5 books can be arranged on a shelf in 5! = 120 different orders. They're also the building block for combination and permutation formulas used throughout probability and statistics.",
    },
  ],
};

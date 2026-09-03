import type { ToolContent } from "./types";

export const ratioCalculatorContent: ToolContent = {
  heroSubtitle: "Simplify Ratios & Solve for a Missing Value",
  overview: [
    "A ratio like 8:12 is mathematically identical to 2:3 — same relationship, different numbers — and simplifying it to its smallest whole-number form makes that relationship immediately clear, the same way 8/12 and 2/3 represent the same fraction. This tool simplifies any ratio to its lowest terms using the greatest common divisor of both values, the same underlying math as simplifying a fraction.",
    "Beyond simplifying, the tool solves the more common practical ratio question: given a known ratio A:B, and a new value that should maintain that same proportion, what's the missing fourth value? This is the classic \"if 2 cups of flour makes 3 cookies, how many cups do I need for 12 cookies\" type of problem — mathematically, solving A:B = C:D for whichever value is missing.",
    "This kind of proportional scaling comes up constantly in real situations: adjusting a recipe for a different serving size, scaling a mixture or paint ratio, converting between map scale and real distance, resizing an image while keeping its aspect ratio, or scaling ingredient ratios in any formulation. The math is straightforward cross-multiplication, but doing it correctly by hand for an unfamiliar problem is a common source of small errors.",
    "Both tools work together — enter your known ratio in the simplify section, then use that same A and B to solve for a missing C or D value in the proportion section below it, so you're not re-entering the same numbers twice.",
  ],
  howItWorks: [
    {
      title: "Enter a ratio to simplify",
      description: "Enter A and B — see the simplified lowest-terms ratio instantly.",
    },
    {
      title: "Use the same ratio to solve a proportion",
      description: "Enter a known C or D value to find the missing fourth value.",
    },
    {
      title: "Read the result",
      description: "The complete proportion A:B = C:D is shown with the solved value filled in.",
    },
  ],
  examples: [
    {
      label: "Simplifying a ratio",
      input: "8 : 12",
      output: "2 : 3",
    },
    {
      label: "Solving a proportion (recipe scaling)",
      input: "2 : 3 = 8 : ?",
      output: "2 : 3 = 8 : 12",
    },
  ],
  faqs: [
    {
      question: "How is simplifying a ratio different from simplifying a fraction?",
      answer:
        "It's the same underlying math — dividing both values by their greatest common divisor — just applied to a ratio's two values instead of a fraction's numerator and denominator. A ratio of 8:12 simplifies to 2:3 exactly the same way the fraction 8/12 simplifies to 2/3.",
    },
    {
      question: "What real situations use proportion solving (A:B = C:D)?",
      answer:
        "Recipe scaling (doubling or halving ingredient amounts while keeping proportions correct), converting a map scale to real-world distance, mixing a solution or paint ratio at a different total volume, and resizing an image while preserving its aspect ratio are all common examples of the exact same underlying math.",
    },
    {
      question: "Why do I enter C or D but not both at the same time?",
      answer:
        "The proportion A:B = C:D has four values, and if three are known, the fourth is mathematically determined — entering both C and D would either be redundant (if they happen to already match the ratio) or contradictory (if they don't), so the tool solves for whichever one is left blank.",
    },
    {
      question: "Does this work with decimal values, not just whole numbers?",
      answer:
        "Yes — both the simplify and proportion-solving sections accept decimal values, though a simplified ratio is most meaningful when both values are whole numbers, which is the most common real-world use case.",
    },
    {
      question: "Can a ratio have more than two values, like A:B:C?",
      answer:
        "This tool handles the standard two-value ratio (A:B) and its proportional scaling. A three-part ratio would need each pair compared separately using the same simplification and proportion logic.",
    },
  ],
};

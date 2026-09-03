import type { ToolContent } from "./types";

export const fractionCalculatorContent: ToolContent = {
  heroSubtitle: "Add, Subtract, Multiply & Divide Fractions",
  overview: [
    "Adding or subtracting fractions with different denominators requires finding a common denominator first — a step that's easy to get wrong by hand, especially with larger or less obviously related numbers. Multiplying and dividing fractions follow entirely different rules of their own (multiply straight across, or flip and multiply for division), and mixing up which rule applies to which operation is a common source of errors.",
    "This tool handles all four basic operations — addition, subtraction, multiplication, and division — on two fractions, applying the correct mathematical rule for each operation automatically. Addition and subtraction find the common denominator internally (using the product of both denominators, then simplifying), multiplication multiplies numerators and denominators directly, and division flips the second fraction and multiplies.",
    "Every result is automatically simplified to its lowest terms using the greatest common divisor of the resulting numerator and denominator — so an unsimplified result like 6/8 is automatically reduced to 3/4, matching how a fraction answer should always be presented in math coursework and practical use. The decimal equivalent is also shown, useful for quickly sanity-checking a fraction result against an expected value.",
    "This is useful for checking homework, converting a recipe's fractional measurements, working through a home-improvement project's fractional dimensions, or any situation involving fraction arithmetic where getting the exact simplified answer matters.",
  ],
  howItWorks: [
    {
      title: "Enter the first fraction",
      description: "Numerator on top, denominator on the bottom.",
    },
    {
      title: "Choose an operation",
      description: "Addition, subtraction, multiplication, or division.",
    },
    {
      title: "Enter the second fraction",
      description: "The result is calculated and simplified instantly.",
    },
  ],
  examples: [
    {
      label: "Adding fractions with different denominators",
      input: "1/2 + 1/3",
      output: "5/6 (≈ 0.8333)",
    },
    {
      label: "Dividing fractions",
      input: "3/4 ÷ 2/5",
      output: "15/8 (= 1.875)",
    },
  ],
  faqs: [
    {
      question: "Why do I need a common denominator to add or subtract fractions?",
      answer:
        "A fraction's denominator defines the size of each \"piece\" — 1/2 and 1/3 represent different-sized pieces, so they can't be directly added without first converting both to the same-sized pieces (a common denominator). Multiplication and division don't have this requirement, which is why their rules are different.",
    },
    {
      question: "Why is the result always shown in simplified (lowest terms) form?",
      answer:
        "A fraction like 6/8 and 3/4 represent the exact same value, but 3/4 is the standard, conventionally correct way to express it — math coursework and most practical contexts expect a simplified answer. This tool finds the greatest common divisor of the result and divides both numerator and denominator by it automatically.",
    },
    {
      question: "Can I enter negative numbers?",
      answer:
        "Yes — a negative numerator or denominator is handled correctly, with the sign normalized to the numerator in the simplified result (so -1/2 rather than 1/-2), matching standard mathematical convention.",
    },
    {
      question: "What happens if I try to divide by a fraction that equals zero?",
      answer:
        "Dividing by zero is mathematically undefined, so if the second fraction's numerator is 0 during a division operation, the tool flags this clearly rather than showing a meaningless result.",
    },
    {
      question: "Why is the decimal equivalent shown alongside the fraction result?",
      answer:
        "A decimal equivalent provides a quick sanity check — if you have a rough expected value in mind, seeing the decimal alongside the exact fraction helps confirm the calculation looks right at a glance.",
    },
  ],
};

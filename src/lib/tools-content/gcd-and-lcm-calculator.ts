import type { ToolContent } from "./types";

export const gcdAndLcmCalculatorContent: ToolContent = {
  heroSubtitle: "Calculate the GCD and LCM of Any Numbers",
  overview: [
    "The greatest common divisor (GCD) is the largest number that divides evenly into every number in a set, and the least common multiple (LCM) is the smallest number that every number in the set divides evenly into — two of the most fundamental concepts in number theory, showing up constantly in fraction simplification, scheduling problems, and basic algebra.",
    "This tool computes both the GCD and LCM for two or more whole numbers using the Euclidean algorithm — an efficient, ancient method (dating back over 2,000 years) that finds the GCD of two numbers by repeatedly replacing the larger number with the remainder of dividing it by the smaller, until the remainder reaches zero. The LCM is then derived directly from the GCD using the relationship LCM(a,b) = (a × b) / GCD(a,b).",
    "For more than two numbers, the GCD and LCM are computed by combining results pairwise — the GCD of a full set is the GCD of the first two numbers combined with the third, and so on, which is mathematically equivalent to computing it all at once but far simpler to implement correctly.",
    "This is useful for simplifying fractions to their lowest terms (divide numerator and denominator by their GCD), finding a common denominator when adding fractions (the LCM of the denominators), solving scheduling and repetition problems (when do two repeating events next coincide), and general number theory coursework.",
  ],
  howItWorks: [
    {
      title: "Enter two or more numbers",
      description: "Separated by commas, any non-negative whole numbers.",
    },
    {
      title: "GCD and LCM compute automatically",
      description: "Using the Euclidean algorithm for accuracy and speed.",
    },
    {
      title: "Use the results",
      description: "For simplifying fractions, finding common denominators, or scheduling problems.",
    },
  ],
  examples: [
    {
      label: "Finding GCD and LCM of three numbers",
      input: "24, 36, 60",
      output: "GCD: 12, LCM: 360",
    },
  ],
  faqs: [
    {
      question: "How does the Euclidean algorithm actually work?",
      answer:
        "It repeatedly replaces the larger of two numbers with the remainder of dividing it by the smaller one, continuing until the remainder is zero — whatever number remains at that point is the GCD. This works because any number that divides both original numbers must also divide their difference (and therefore their remainder), so the GCD never changes throughout the process.",
    },
    {
      question: "How is LCM calculated from GCD?",
      answer:
        "Using the identity LCM(a, b) = (a × b) / GCD(a, b) — this works because the product of two numbers always equals the product of their GCD and LCM, a relationship that falls directly out of how prime factorizations combine.",
    },
    {
      question: "What's the GCD or LCM used for in simplifying fractions?",
      answer:
        "Dividing both the numerator and denominator of a fraction by their GCD reduces it to lowest terms (24/36 becomes 2/3 after dividing both by their GCD of 12). The LCM of two denominators gives the smallest common denominator needed to add or compare two fractions.",
    },
    {
      question: "What if I enter numbers that share no common factors?",
      answer:
        "Their GCD will be 1 (since 1 divides every number), and their LCM will simply be the product of the numbers — this is the expected, correct result for what mathematicians call 'coprime' numbers.",
    },
    {
      question: "Can I calculate GCD and LCM for more than two numbers?",
      answer:
        "Yes — enter as many comma-separated numbers as you need, and both values are computed correctly across the entire set by combining the numbers pairwise, which is mathematically equivalent to computing them all together.",
    },
  ],
};

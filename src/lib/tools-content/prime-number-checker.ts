import type { ToolContent } from "./types";

export const primeNumberCheckerContent: ToolContent = {
  heroSubtitle: "Check if a Number is Prime & See Its Factors",
  overview: [
    "A prime number is a whole number greater than 1 with no divisors other than 1 and itself — 2, 3, 5, 7, 11, and so on. Primes are the fundamental building blocks of number theory (every whole number greater than 1 is either prime or a product of primes) and underpin much of modern cryptography.",
    "This tool checks whether any whole number is prime using trial division up to its square root, computed with JavaScript's BigInt type so the check remains exact even for numbers far larger than JavaScript's normal safe integer limit. If a number isn't prime, its complete prime factorization is shown as well.",
    "Trial division works by testing whether the number is divisible by any integer from 2 up to its square root — if none divide evenly, the number is prime. Only checking up to the square root (rather than all the way up to the number itself) is a well-known optimization: if a number has a factor larger than its square root, it must also have a corresponding factor smaller than its square root, so checking further is redundant.",
    "This is useful for number theory homework and exploration, understanding prime factorization, checking whether a specific number used in a cryptography or math context is prime, and general curiosity about a number's properties.",
  ],
  howItWorks: [
    {
      title: "Enter a whole number",
      description: "Any non-negative integer, of any size.",
    },
    {
      title: "See whether it's prime",
      description: "Checked using trial division up to the square root.",
    },
    {
      title: "View the prime factorization",
      description: "Shown automatically if the number isn't prime.",
    },
  ],
  examples: [
    {
      label: "Checking a prime number",
      input: "97",
      output: "97 is a prime number",
    },
    {
      label: "Checking a composite number",
      input: "84",
      output: "84 is not a prime number — factorization: 2 × 2 × 3 × 7",
    },
  ],
  faqs: [
    {
      question: "Why is 1 not considered a prime number?",
      answer:
        "By definition, a prime number has exactly two distinct positive divisors: 1 and itself. The number 1 only has one divisor (itself), which excludes it from the definition — this isn't arbitrary, it keeps the fundamental theorem of arithmetic (every number has a unique prime factorization) clean and consistent.",
    },
    {
      question: "Why check divisibility only up to the square root?",
      answer:
        "If a number n has a factor larger than its square root, dividing n by that factor produces a smaller factor that must be less than or equal to the square root — so any factor pair always has at least one member at or below the square root, making it unnecessary to check any further.",
    },
    {
      question: "How large a number can this check?",
      answer:
        "This uses BigInt arithmetic rather than standard JavaScript numbers, so it remains mathematically exact for very large numbers. Very large numbers do take longer to check since trial division's speed depends on the size of the smallest factor (or the square root, for primes) — extremely large numbers can take a noticeable moment.",
    },
    {
      question: "What is prime factorization used for?",
      answer:
        "It's the foundation of number theory and has direct applications in cryptography (RSA encryption relies on the difficulty of factoring large numbers), simplifying fractions, and finding the greatest common divisor or least common multiple of numbers.",
    },
    {
      question: "Is 2 the only even prime number?",
      answer:
        "Yes — every even number greater than 2 is divisible by 2 in addition to itself and 1, giving it at least three divisors, which disqualifies it from being prime. This makes 2 the unique even prime and the smallest prime number overall.",
    },
  ],
};

import type { ToolContent } from "./types";

export const randomNumberRangeCalculatorContent: ToolContent = {
  heroSubtitle: "Generate Random Numbers Within Any Range",
  overview: [
    "Generating a genuinely random number within a specific range — for a raffle drawing, a dice-roll simulation, picking a random sample from a dataset, or assigning random test values — needs more than just \"pick something.\" A properly random number generator draws uniformly across the entire specified range, so every possible value has an equal chance of being selected, unlike a human trying to \"randomly\" pick a number, which tends to unconsciously favor certain values.",
    "This tool generates one or more random numbers between a minimum and maximum you specify, using the browser's built-in random number generator. Two toggles control the exact behavior: \"allow duplicates\" determines whether the same number can appear more than once when generating multiple values, and \"allow decimals\" switches between whole numbers only and numbers with two decimal places.",
    "Without duplicates allowed, the tool generates a set of genuinely unique random values — useful for drawing multiple unique raffle winners from a numbered pool, or selecting a random unique sample of record IDs. With duplicates allowed (the more common case for something like simulating repeated dice rolls), each value is generated fully independently, with no memory of previous results.",
    "This is genuinely useful for a wide range of tasks: picking a random winner from a numbered list of entries, generating test data with values in a specific range, simulating dice rolls or lottery-style draws, or any situation calling for an unbiased random value within known bounds.",
  ],
  howItWorks: [
    {
      title: "Enter a minimum and maximum",
      description: "Defines the range the random number(s) will fall within.",
    },
    {
      title: "Choose how many numbers and your options",
      description: "Set the count, and toggle duplicates and decimals as needed.",
    },
    {
      title: "Click Generate",
      description: "Get a fresh set of random numbers instantly, ready to copy.",
    },
  ],
  examples: [
    {
      label: "Single random number",
      input: "Min 1, Max 100, count 1",
      output: "A single random whole number between 1 and 100",
    },
    {
      label: "Unique raffle winners",
      input: "Min 1, Max 50, count 5, duplicates off",
      output: "Five unique random whole numbers between 1 and 50",
    },
  ],
  faqs: [
    {
      question: "Is this truly random, or predictable?",
      answer:
        "It uses the browser's built-in pseudorandom number generator, which is suitable for general-purpose randomness like games, sampling, and drawings, but isn't cryptographically secure — for a security-sensitive use case (like generating a secret token), a dedicated cryptographic random generator would be more appropriate.",
    },
    {
      question: "What happens if I ask for more unique numbers than fit in the range?",
      answer:
        "With duplicates turned off and decimals turned off, there's a hard limit — a range of 1 to 10 only contains 10 unique whole numbers, so requesting 15 unique values would be impossible. The tool flags this clearly rather than hanging or producing an incomplete result.",
    },
    {
      question: "Can I generate decimal numbers, not just whole numbers?",
      answer:
        "Yes — turn on \"Allow decimals\" to generate random values with two decimal places within your specified range, useful for simulating continuous measurements rather than discrete whole-number outcomes.",
    },
    {
      question: "Why would I want to allow duplicates?",
      answer:
        "Simulating repeated independent events — like rolling a die multiple times — should allow duplicates, since each roll is independent and can legitimately produce the same value more than once. Turn duplicates off only when you specifically need a set of distinct values, like unique raffle winners.",
    },
    {
      question: "Does clicking Generate again give a different result?",
      answer:
        "Yes — every click produces a completely fresh, independently generated set of random numbers, with no relationship to the previous result.",
    },
  ],
};

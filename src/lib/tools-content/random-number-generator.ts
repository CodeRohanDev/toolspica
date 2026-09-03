import type { ToolContent } from "./types";

export const randomNumberGeneratorContent: ToolContent = {
  heroSubtitle: "Generate Random Numbers in Any Range Instantly",
  overview: [
    "Picking a genuinely random number — for a giveaway winner, a game, a classroom activity, or a quick unbiased decision — is something humans are famously bad at doing in their heads: people unconsciously avoid \"round\" numbers, repeat favorites, and cluster toward the middle of a range. A true random number generator has none of those biases.",
    "This tool generates one or many random whole numbers between any minimum and maximum you set, with every value in the range having an exactly equal chance of being selected. Generate a single number for a quick pick, or up to 100 at once for larger drawings and assignments.",
    "The \"no duplicates\" option switches between two genuinely different behaviors: with duplicates allowed (the default), every number is drawn independently — like rolling a die repeatedly, where repeats are natural. With duplicates off, each number can appear only once — like drawing numbered tickets from a hat, which is what you want when picking multiple distinct winners from a numbered list.",
    "This is useful for raffle and giveaway drawings (number your entries, generate a winner), random sampling, assigning random order to a list, classroom activities, games, and any situation where a provably unbiased pick beats a human \"just choosing one.\"",
  ],
  howItWorks: [
    {
      title: "Set your minimum and maximum",
      description: "The range the numbers will be drawn from, inclusive on both ends.",
    },
    {
      title: "Choose how many numbers and whether duplicates are allowed",
      description: "Up to 100 at once; no-duplicates mode guarantees distinct results.",
    },
    {
      title: "Click Generate",
      description: "Fresh random numbers appear instantly, ready to copy.",
    },
  ],
  examples: [
    {
      label: "Picking a giveaway winner",
      input: "Min 1, max 250 (entry numbers), 1 number",
      output: "A single random winner, e.g. 137",
    },
    {
      label: "Drawing three distinct winners",
      input: "Min 1, max 50, 3 numbers, no duplicates",
      output: "Three different numbers, e.g. 8, 23, 41",
    },
  ],
  faqs: [
    {
      question: "Are the minimum and maximum values themselves included in the range?",
      answer:
        "Yes — the range is inclusive on both ends, so generating between 1 and 10 can produce both 1 and 10, along with everything in between, each with equal probability.",
    },
    {
      question: "When should I turn 'no duplicates' on?",
      answer:
        "Turn it on when each result must be distinct — like drawing multiple raffle winners from numbered entries, where the same entry shouldn't win twice. Leave it off when repeats are natural and correct, like simulating repeated dice rolls or independent random events.",
    },
    {
      question: "Is this random enough to fairly pick a contest winner?",
      answer:
        "Yes for informal drawings — every number in the range has an equal chance, with no human bias. For legally regulated lotteries or high-stakes drawings, official rules may require a certified drawing procedure, which is a legal requirement rather than a randomness-quality issue.",
    },
    {
      question: "Why can't I generate more unique numbers than the range contains?",
      answer:
        "A range of 1 to 10 only contains 10 distinct whole numbers, so requesting 15 unique values from it is mathematically impossible — the tool flags this clearly instead of hanging or silently repeating values.",
    },
    {
      question: "Does previous output influence the next generation?",
      answer:
        "No — every click draws completely fresh, independent random numbers with no memory of earlier results. A number appearing once makes it neither more nor less likely to appear again.",
    },
  ],
};

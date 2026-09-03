import type { ToolContent } from "./types";

export const numberRoundingToolContent: ToolContent = {
  heroSubtitle: "Round Numbers to Decimals, Significant Figures & More",
  overview: [
    "Rounding a number correctly depends entirely on context — financial figures typically round to 2 decimal places, scientific measurements often round to significant figures to reflect precision, and some situations need rounding to the nearest multiple of a specific value (like rounding to the nearest nickel or the nearest 50 units for inventory purposes).",
    "This tool covers every common rounding method in one place: basic round/floor/ceiling to the nearest whole number, rounding to a specified number of decimal places, rounding to a specified number of significant figures, and rounding to the nearest multiple of any chosen value.",
    "Significant figures rounding, in particular, is easy to get wrong by hand — unlike decimal rounding, it depends on the magnitude of the number itself (0.00456 to 2 significant figures is 0.0046, while 456 to 2 significant figures is 460), since significant figures track meaningful precision rather than a fixed decimal position.",
    "This is useful for formatting financial figures to 2 decimal places, rounding scientific measurements to the correct number of significant figures, rounding prices or quantities to the nearest practical increment, and general everyday rounding across different conventions.",
  ],
  howItWorks: [
    {
      title: "Enter a number",
      description: "Any positive or negative number, with decimals if needed.",
    },
    {
      title: "See all rounding methods at once",
      description: "Nearest integer, decimal places, significant figures, and nearest multiple.",
    },
    {
      title: "Adjust the precision for each method",
      description: "Change decimal places, significant figures, or the multiple independently.",
    },
  ],
  examples: [
    {
      label: "Rounding to 2 decimal places",
      input: "3.14159265, 2 decimal places",
      output: "3.14",
    },
    {
      label: "Rounding to significant figures",
      input: "0.00456, 2 significant figures",
      output: "0.0046",
    },
  ],
  faqs: [
    {
      question: "What's the difference between decimal places and significant figures?",
      answer:
        "Decimal places count digits after the decimal point regardless of the number's size — 3.14159 to 2 decimal places is 3.14. Significant figures count all meaningful digits starting from the first non-zero digit, so it depends on the number's magnitude — 0.00456 to 2 significant figures is 0.0046, since the leading zeros aren't considered significant.",
    },
    {
      question: "What's the difference between round, floor, and ceiling?",
      answer:
        "Round goes to the nearest whole number (rounding 0.5 upward by convention). Floor always rounds down to the next lower whole number, even for positive fractional values. Ceiling always rounds up to the next higher whole number, even when the fractional part is small.",
    },
    {
      question: "How does rounding to the nearest multiple work?",
      answer:
        "It finds the closest number that's an exact multiple of your chosen value — rounding 23 to the nearest multiple of 5 gives 25 (since 23 is closer to 25 than to 20). This is useful for things like rounding prices to the nearest nickel or quantities to the nearest case size.",
    },
    {
      question: "Why does 0.00456 round to 0.0046 and not 0.005 at 2 significant figures?",
      answer:
        "The first two significant figures in 0.00456 are 4 and 5 (the leading zeros don't count as significant) — rounding those two digits based on the following digit (6) gives 0.0046, not a simpler-looking but mathematically incorrect 0.005.",
    },
    {
      question: "Why might financial calculations always round to exactly 2 decimal places?",
      answer:
        "Most currencies have a smallest practical unit equal to 1/100th of the main unit (cents, pence, and similar), so financial figures conventionally round to 2 decimal places to match that smallest usable denomination, regardless of how many decimal digits an underlying calculation produces.",
    },
  ],
};

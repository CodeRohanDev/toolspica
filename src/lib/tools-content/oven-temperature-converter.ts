import type { ToolContent } from "./types";

export const ovenTemperatureConverterContent: ToolContent = {
  heroSubtitle: "Convert Between Fahrenheit, Celsius and UK Gas Marks",
  overview: [
    "Recipes from different regions describe oven temperature in different systems — American recipes use Fahrenheit, most of the world uses Celsius, and older British recipes often specify a 'gas mark' instead of a numeric temperature — so following a foreign recipe accurately means converting between all three.",
    "This tool converts a Fahrenheit temperature to its Celsius equivalent and finds the closest matching UK gas mark, along with a plain-language description (like 'Moderate' or 'Hot') that's often used alongside the numeric gas mark in older recipes.",
    "A full reference table below the converter lists every standard gas mark from 1 to 9 with its Fahrenheit and Celsius equivalents and description, so you can look up any oven setting at a glance without recalculating each time.",
  ],
  howItWorks: [
    { title: "Enter a temperature in Fahrenheit", description: "Type your oven temperature in degrees Fahrenheit." },
    { title: "See the conversions", description: "View the equivalent Celsius temperature and nearest UK gas mark." },
    { title: "Check the reference table", description: "Browse the full gas mark table for quick lookups." },
  ],
  examples: [
    {
      label: "Converting 350°F",
      input: "350°F",
      output: "177°C, Gas mark 4 (Moderate)",
    },
  ],
  faqs: [
    {
      question: "What is a gas mark?",
      answer: "Gas mark is a temperature scale used mainly in the UK and Ireland for gas ovens, numbered roughly 1 through 9, each corresponding to a specific Fahrenheit/Celsius range.",
    },
    {
      question: "Why doesn't my Celsius number match exactly to a gas mark?",
      answer: "Gas marks correspond to fixed temperature bands rather than exact degree equivalents, so this tool finds the nearest matching mark to your entered temperature.",
    },
    {
      question: "Should I use a fan/convection oven adjustment?",
      answer: "Fan ovens typically run about 20°C (or 25°F) hotter for the same setting — many recipes note a separate fan oven temperature. This converter shows standard (non-fan) equivalents.",
    },
    {
      question: "Is this conversion done locally?",
      answer: "Yes — it's simple arithmetic run entirely in your browser, with no data sent to any server.",
    },
  ],
};

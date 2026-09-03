import type { ToolContent } from "./types";

export const temperatureConverterContent: ToolContent = {
  heroSubtitle: "Convert Between Celsius, Fahrenheit & Kelvin",
  overview: [
    "Temperature conversion is fundamentally different from converting length or weight — it's not a simple multiplication, since Celsius and Fahrenheit use different zero points as well as different scale sizes. Converting between them requires both a scaling factor and an offset, which is why a naive \"just multiply\" approach produces wrong answers for temperature specifically.",
    "This tool converts between the three temperature scales in common and scientific use: Celsius (used by most of the world for everyday temperature), Fahrenheit (used primarily in the United States), and Kelvin (the scientific standard, used throughout physics and chemistry, where 0 K represents absolute zero — the theoretical coldest possible temperature).",
    "Enter a value in any of the three scales, and the tool converts it into all three simultaneously using the exact standard formulas: Celsius to Fahrenheit multiplies by 9/5 and adds 32; Celsius to Kelvin simply adds 273.15 (since Kelvin uses the same scale size as Celsius, just a different zero point at absolute zero instead of the freezing point of water).",
    "This is useful for understanding a weather forecast from a different country, following a recipe that specifies oven temperature in a scale you're not used to, converting a scientific measurement, or just satisfying curiosity about how a given temperature compares across the different scales.",
  ],
  howItWorks: [
    {
      title: "Enter a temperature value",
      description: "Any positive or negative number, in whichever scale you have it.",
    },
    {
      title: "Select the input scale",
      description: "Celsius, Fahrenheit, or Kelvin.",
    },
    {
      title: "View the converted result in all three scales",
      description: "Calculated instantly using the exact standard formulas.",
    },
  ],
  examples: [
    {
      label: "Water boiling point",
      input: "100°C",
      output: "212°F — 373.15 K",
    },
    {
      label: "Body temperature",
      input: "98.6°F",
      output: "37°C — 310.15 K",
    },
  ],
  faqs: [
    {
      question: "Why can't I just multiply to convert Celsius to Fahrenheit?",
      answer:
        "Celsius and Fahrenheit have different zero points (0°C is water's freezing point, while 0°F is a different, colder reference point entirely) as well as different degree sizes — the conversion needs both a multiplication (by 9/5) and an addition (of 32) to account for both differences, not multiplication alone.",
    },
    {
      question: "Why does Kelvin only need addition, not multiplication, from Celsius?",
      answer:
        "Kelvin uses the exact same degree size as Celsius — a 1-degree change means the same thing in both scales — the only difference is the zero point, with 0 K set at absolute zero (-273.15°C) instead of water's freezing point. That's why converting only requires adding or subtracting 273.15, no multiplication needed.",
    },
    {
      question: "Can Kelvin be negative?",
      answer:
        "No — 0 K represents absolute zero, the theoretical lowest possible temperature where all thermal motion stops, so negative Kelvin values aren't physically meaningful in this context. The tool flags a negative Kelvin input as invalid.",
    },
    {
      question: "Why does the US use Fahrenheit while most of the world uses Celsius?",
      answer:
        "This is largely a historical holdover — Fahrenheit was the dominant scale globally before most countries standardized on the metric system (and Celsius with it) in the 20th century, but the US didn't fully make that transition for everyday temperature measurement.",
    },
    {
      question: "What's a quick mental approximation for Celsius to Fahrenheit?",
      answer:
        "A common rough shortcut is doubling the Celsius value and adding 30 (rather than the exact ×9/5 + 32), close enough for a quick mental estimate but not precise — this tool always uses the exact formula for an accurate result.",
    },
  ],
};

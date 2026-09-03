import type { ToolContent } from "./types";

export const energyConverterContent: ToolContent = {
  heroSubtitle: "Convert Between Joules, Calories, kWh & BTU",
  overview: [
    "Energy is measured in genuinely different units depending on the field — joules in physics, calories in nutrition, kilowatt-hours on an electricity bill, and BTU for heating and cooling systems (especially air conditioners and furnaces) — and these units span everything from a physics textbook problem to household energy consumption.",
    "This tool converts between seven common energy units: joules and kilojoules (the SI standard), calories and kilocalories (nutrition — note that a food \"Calorie\" with a capital C is actually a kilocalorie, a common point of confusion), watt-hours and kilowatt-hours (electricity), and BTU (British Thermal Units, common in HVAC specifications, especially in the US).",
    "The calorie/kilocalorie distinction is worth understanding clearly: a nutritional \"Calorie\" as printed on food labels is actually 1,000 small calories — a kilocalorie — even though it's conventionally written as just \"Calorie\" with a capital C. This tool's \"kcal\" unit is what food labels actually mean by \"Calories,\" while the small \"cal\" unit represents the base calorie used in chemistry and physics.",
    "This is useful for understanding an electricity bill's kWh usage in other terms, converting a food's calorie content to joules for a science context, comparing an appliance's BTU rating to other energy units, or general physics and engineering energy conversions.",
  ],
  howItWorks: [
    {
      title: "Enter an energy value and select its unit",
      description: "Any of the seven supported energy units.",
    },
    {
      title: "Select the target unit",
      description: "Or use the swap button to reverse direction.",
    },
    {
      title: "View the exact converted result",
      description: "Plus the value in every other supported unit at once.",
    },
  ],
  examples: [
    {
      label: "Kilocalories to kilojoules",
      input: "500 kcal",
      output: "2,092 kJ",
    },
    {
      label: "Kilowatt-hours to megajoules",
      input: "1 kWh",
      output: "3,600 kJ",
    },
  ],
  faqs: [
    {
      question: "Is a food 'Calorie' the same as the 'cal' unit in this tool?",
      answer:
        "No — a nutritional \"Calorie\" (capital C, as printed on food labels) is actually equal to 1,000 small calories, making it equivalent to this tool's \"kcal\" (kilocalorie) unit, not the plain \"cal\" unit. This is a genuinely common point of confusion, since food labeling convention drops the \"kilo\" prefix in everyday writing.",
    },
    {
      question: "Why does an electricity bill use kilowatt-hours instead of joules?",
      answer:
        "Kilowatt-hours are a more practically sized unit for household electricity consumption — a joule is a tiny amount of energy, so measuring a month's electricity use in joules would require an unwieldy large number, while kilowatt-hours (power in kilowatts multiplied by hours of use) produces numbers in a much more manageable range.",
    },
    {
      question: "What is BTU used for?",
      answer:
        "BTU (British Thermal Unit) is commonly used to rate the heating or cooling capacity of HVAC equipment — air conditioners, furnaces, and heaters are frequently specified in BTU or BTU per hour, especially in US product listings.",
    },
    {
      question: "Why is 1 calorie exactly 4.184 joules?",
      answer:
        "This is the internationally agreed thermochemical definition of the calorie relative to the joule, standardized so that scientific work using either unit can convert precisely — it's an exact defined relationship, not an experimentally measured approximation.",
    },
    {
      question: "Can I use this to compare different foods' energy content in scientific terms?",
      answer:
        "Yes — converting a food's kilocalorie content (as printed on nutrition labels) into kilojoules is exactly the kind of conversion this tool handles, useful for comparing against energy values reported in SI units in a scientific or international context, since many countries print both kcal and kJ on nutrition labels.",
    },
  ],
};

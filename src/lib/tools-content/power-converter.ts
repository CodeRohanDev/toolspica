import type { ToolContent } from "./types";

export const powerConverterContent: ToolContent = {
  heroSubtitle: "Convert Between Watts, Kilowatts & Horsepower",
  overview: [
    "Power — the rate of energy transfer or work done — is measured in watts as the scientific standard, but horsepower remains the dominant unit for vehicle engines and mechanical equipment, especially in the US and UK, creating a regular need to convert between the two systems.",
    "This tool converts between five power units: watts, kilowatts, and megawatts (the metric progression), horsepower (the traditional mechanical unit), and BTU per hour (common in HVAC power ratings). Mechanical horsepower is defined as exactly 745.699872 watts — a specific historical value originally based on James Watt's estimate of a horse's sustained work rate, standardized precisely since.",
    "It's worth knowing that \"horsepower\" isn't perfectly universal — this tool uses mechanical (imperial) horsepower, the most common definition, though metric horsepower (a very slightly different value, about 735.5 watts) is used in some European vehicle specifications. The difference between the two is small (about 1.4%) but not zero.",
    "This is useful for comparing an electric vehicle's power rating (typically in kW) against a traditional engine's horsepower rating, understanding appliance or equipment power specifications, or general engineering and physics power conversions.",
  ],
  howItWorks: [
    {
      title: "Enter a power value and select its unit",
      description: "Any of the five supported power units.",
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
      label: "Kilowatts to horsepower",
      input: "1 kW",
      output: "1.341022 hp",
    },
    {
      label: "Horsepower to kilowatts",
      input: "300 hp",
      output: "223.71 kW",
    },
  ],
  faqs: [
    {
      question: "Why does an EV's power rating in kW differ from an equivalent gas engine's horsepower?",
      answer:
        "They're the same underlying physical quantity (power), just reported in different units by convention — electric vehicles are commonly rated in kilowatts (the natural unit for electric motors), while traditional combustion engines are commonly rated in horsepower, a holdover from mechanical engineering tradition. Converting between them lets you compare directly.",
    },
    {
      question: "Is horsepower the same everywhere in the world?",
      answer:
        "Not exactly — this tool uses mechanical (imperial) horsepower at 745.699872 watts, the most commonly referenced definition, but metric horsepower (used in some European specifications, sometimes labeled PS) is a very slightly different value at about 735.5 watts. The difference is small but real, and matters for precise conversions.",
    },
    {
      question: "Why was horsepower originally defined based on an actual horse?",
      answer:
        "James Watt, developing the steam engine in the 18th century, needed a way to compare his engines' output to the horses they were replacing in mills and mines — he estimated a horse's sustained work rate and used that as the original basis for the unit, later standardized to its precise modern value.",
    },
    {
      question: "What's the relationship between BTU/hour and watts?",
      answer:
        "BTU per hour is a rate of energy transfer (making it a power unit, unlike plain BTU which measures a quantity of energy) — commonly used for HVAC equipment ratings, especially in the US, and convertible directly to watts using the precise defined relationship this tool applies.",
    },
    {
      question: "Why include megawatts alongside watts and kilowatts?",
      answer:
        "Megawatts are the practical scale for large power sources like power plants or industrial equipment — watts and kilowatts would require unwieldy large numbers at that scale, so having the megawatt unit available keeps large-scale power figures in a manageable range.",
    },
  ],
};

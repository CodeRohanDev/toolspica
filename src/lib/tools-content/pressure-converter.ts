import type { ToolContent } from "./types";

export const pressureConverterContent: ToolContent = {
  heroSubtitle: "Convert Between Pascals, PSI, Bar, Atmospheres & More",
  overview: [
    "Pressure units are scattered across different industries and regions — PSI dominates in the US for tire pressure and plumbing, bar is common in Europe and for many gauges, pascals are the scientific SI standard, and mmHg/torr are specifically used in medical and vacuum contexts. This tool converts between all seven common pressure units.",
    "The pascal (equal to one newton per square meter) is the SI base unit and serves as the internal reference point every other unit converts through. PSI (pounds per square inch), by contrast, is defined through the imperial system and equals exactly 6894.757293168 pascals — a precise but non-round number reflecting its origin in a completely different unit system than the pascal.",
    "mmHg (millimeters of mercury) and torr are nearly but not exactly identical — mmHg is defined based on the pressure exerted by an actual column of mercury under standard gravity, while torr is defined as exactly 1/760 of a standard atmosphere. The difference between them is vanishingly small (about 0.000015%) and irrelevant for virtually all practical purposes, but this tool uses the precise separate definitions for both.",
    "This is useful for tire pressure specifications from different regions, weather barometric pressure reported in different units, scientific and engineering work requiring SI units, or medical contexts using mmHg for blood pressure or vacuum measurements.",
  ],
  howItWorks: [
    {
      title: "Enter a pressure value and select its unit",
      description: "Any of the seven supported pressure units.",
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
      label: "Bar to PSI",
      input: "1 bar",
      output: "14.503774 PSI",
    },
    {
      label: "Atmospheres to kPa",
      input: "1 atmosphere",
      output: "101.325 kPa",
    },
  ],
  faqs: [
    {
      question: "Why is tire pressure often given in PSI in the US but bar elsewhere?",
      answer:
        "This reflects the same US/metric split seen across many measurement units — PSI is the standard in the US and some other countries following imperial conventions, while bar (or kPa) is standard across most of Europe and other metric-using regions for the same tire pressure specification.",
    },
    {
      question: "What's the difference between mmHg and torr?",
      answer:
        "They're numerically almost identical but defined differently — mmHg is based on the pressure of an actual column of mercury under standard gravity, while torr is defined as exactly 1/760 of a standard atmosphere. The difference (about 0.000015%) is negligible for essentially any practical use, but this tool uses each unit's precise separate definition.",
    },
    {
      question: "Why is 1 atmosphere exactly 101,325 pascals?",
      answer:
        "This is the internationally standardized definition of \"standard atmosphere,\" representing the average atmospheric pressure at sea level under standard conditions — a precisely fixed reference value used throughout science and engineering, not an approximation.",
    },
    {
      question: "Where does mmHg show up outside of vacuum measurements?",
      answer:
        "Blood pressure readings (like \"120/80\") are conventionally reported in mmHg in medical contexts worldwide, making it one of the more commonly encountered pressure units in everyday life despite its origin as a specialized scientific measurement.",
    },
    {
      question: "Is pascal used in everyday contexts, or mainly scientific ones?",
      answer:
        "Pascal (and its more commonly seen multiple, kilopascal) shows up in some everyday contexts like weather barometric pressure reports in certain countries and some product specifications, but PSI and bar remain more commonly encountered in consumer contexts like tire pressure gauges.",
    },
  ],
};

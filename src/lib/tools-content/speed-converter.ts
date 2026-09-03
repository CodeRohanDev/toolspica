import type { ToolContent } from "./types";

export const speedConverterContent: ToolContent = {
  heroSubtitle: "Convert Between km/h, mph, m/s, Knots & More",
  overview: [
    "Speed is expressed differently depending on context and region — kilometers per hour on most of the world's road signs, miles per hour in the US and UK, meters per second in physics and scientific contexts, and knots specifically in aviation and maritime navigation. Converting accurately between them matters whether you're reading a foreign speed limit sign or working through a physics problem.",
    "This tool converts between five common speed units: meters per second (the SI base unit for speed), kilometers per hour, miles per hour, knots, and feet per second. Each conversion uses an exact defined relationship — a knot, for instance, is defined as exactly one nautical mile (1,852 meters) per hour, a precise value rather than an approximation.",
    "Knots deserve special mention since they're less familiar outside aviation and maritime contexts: a knot is specifically nautical miles per hour, distinct from statute miles per hour used on land. This distinction matters for anyone reading aviation weather reports, boat speeds, or wind speed data, which are conventionally reported in knots.",
    "This is useful for converting a foreign speed limit or speedometer reading, understanding wind speed or aircraft speed reported in knots, physics coursework requiring SI units, or comparing speeds across different contexts that conventionally use different units.",
  ],
  howItWorks: [
    {
      title: "Enter a speed value and select its unit",
      description: "Any of the five supported speed units.",
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
      label: "km/h to mph",
      input: "100 km/h",
      output: "62.137119 mph",
    },
    {
      label: "Knots to km/h",
      input: "50 knots",
      output: "92.6 km/h",
    },
  ],
  faqs: [
    {
      question: "Why is a knot different from a regular mile per hour?",
      answer:
        "A knot is nautical miles per hour, and a nautical mile (1,852 meters) is longer than a statute mile (1,609.344 meters) — so a given knot value represents a slightly faster actual speed than the same numeric value in regular mph. Knots are specifically used in aviation and maritime navigation, tied to the nautical mile's relationship to degrees of latitude.",
    },
    {
      question: "Why is meters per second the base unit here?",
      answer:
        "Meters per second is the SI (International System of Units) standard unit for speed, making it the natural common reference point to convert every other unit through — every other speed unit here is defined as some exact multiple or fraction of meters per second.",
    },
    {
      question: "Which countries use mph versus km/h for road speed limits?",
      answer:
        "The United States and the United Kingdom are the most notable countries still using mph for road speed limits, while the vast majority of the rest of the world uses km/h — a common source of confusion for travelers renting a car in a country using the other system.",
    },
    {
      question: "Why would I need feet per second?",
      answer:
        "Feet per second shows up in specific technical and scientific contexts in the US — ballistics (bullet velocity), some engineering calculations, and certain sports statistics (like pitch speed measurements in some contexts) commonly use it instead of mph.",
    },
    {
      question: "How precise is the km/h to mph conversion?",
      answer:
        "The conversion is based on the exact internationally defined mile (1,609.344 meters) and the exact definition of an hour, so the result is precise to as many decimal places as displayed — not a rounded rule-of-thumb approximation like the common \"multiply by 0.6\" mental shortcut.",
    },
  ],
};

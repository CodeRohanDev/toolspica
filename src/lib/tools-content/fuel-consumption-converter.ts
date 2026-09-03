import type { ToolContent } from "./types";

export const fuelConsumptionConverterContent: ToolContent = {
  heroSubtitle: "Convert Between MPG, L/100km & km/L Fuel Efficiency",
  overview: [
    "Fuel efficiency is expressed in genuinely different conventions around the world — miles per gallon in the US (and a slightly different miles per gallon in the UK, since the two countries use different gallon sizes), liters per 100 kilometers across most of Europe, and kilometers per liter in parts of Asia — and converting between them requires more than simple multiplication, since some of these units measure distance-per-fuel while others measure fuel-per-distance.",
    "This tool converts between four units: MPG (US), MPG (UK), kilometers per liter, and liters per 100km. The first three all express efficiency as distance covered per unit of fuel (higher number means better efficiency), while liters per 100km expresses the inverse — fuel consumed per fixed distance (lower number means better efficiency) — which is why converting to or from L/100km specifically requires a reciprocal calculation, not just a multiplication factor.",
    "US and UK gallons are genuinely different sizes (a US gallon is about 3.785 liters, while a UK/Imperial gallon is about 4.546 liters, roughly 20% larger), which is why MPG (US) and MPG (UK) produce different numbers for the exact same real-world fuel efficiency — a vehicle's MPG rating isn't directly comparable between the two countries without converting for the gallon size difference.",
    "This is useful for comparing a vehicle's fuel efficiency rating across US and European or UK specifications, understanding a European car's L/100km rating in more familiar MPG terms, or general fuel economy conversion for travel, vehicle shopping, or fleet management across regions.",
  ],
  howItWorks: [
    {
      title: "Enter a fuel efficiency value and select its unit",
      description: "MPG (US), MPG (UK), km/L, or L/100km.",
    },
    {
      title: "View the converted result in every other unit",
      description: "Calculated correctly whether the relationship is direct or inverse.",
    },
  ],
  examples: [
    {
      label: "US MPG to metric units",
      input: "30 MPG (US)",
      output: "12.75 km/L — 7.84 L/100km",
    },
  ],
  faqs: [
    {
      question: "Why is L/100km an inverse relationship compared to MPG?",
      answer:
        "MPG and km/L both measure distance covered per fixed amount of fuel, so a higher number always means better efficiency. L/100km measures the opposite — how much fuel is needed to cover a fixed distance — so a lower number means better efficiency. Converting between these two framings requires a reciprocal calculation (dividing into a constant), not simple multiplication.",
    },
    {
      question: "Why do US and UK MPG give different numbers for the same car?",
      answer:
        "A US gallon (3.785 liters) is smaller than a UK/Imperial gallon (4.546 liters) — since MPG measures distance per gallon, the same actual fuel efficiency produces a higher MPG number when measured in the larger UK gallon than in the smaller US gallon, purely due to the different gallon size, not any difference in the vehicle itself.",
    },
    {
      question: "Which unit is used in most of Europe?",
      answer:
        "Liters per 100 kilometers (L/100km) is the standard fuel efficiency unit across most of continental Europe, distinct from both US and UK MPG conventions — a car's efficiency rating in a European market listing will typically be shown this way.",
    },
    {
      question: "Is a lower L/100km value always better?",
      answer:
        "Yes — since L/100km measures fuel consumed per fixed distance, a lower value means the vehicle uses less fuel to travel the same distance, which is the opposite direction from MPG and km/L, where a higher number indicates better efficiency.",
    },
    {
      question: "How accurate is this conversion?",
      answer:
        "The conversion factors used (based on the precise US and Imperial gallon definitions and the exact km/mile relationship) are mathematically exact — any imprecision would come from the original fuel efficiency figure being an estimate itself (as most real-world MPG or L/100km ratings are), not from this conversion calculation.",
    },
  ],
};

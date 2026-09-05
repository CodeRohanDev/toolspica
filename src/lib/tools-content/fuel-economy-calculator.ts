import type { ToolContent } from "./types";

export const fuelEconomyCalculatorContent: ToolContent = {
  heroSubtitle: "Calculate MPG, L/100km, and Fuel Cost Per Mile",
  overview: [
    "Knowing your car's actual fuel economy — rather than the manufacturer's sticker estimate — requires tracking real distance traveled against real fuel consumed, then converting that into whichever unit you're used to: miles per gallon in the US, or liters per 100 kilometers almost everywhere else.",
    "This calculator takes the distance you traveled and the fuel you used to compute MPG or L/100km depending on which unit system you select, and also factors in your local fuel price to show the actual cost per mile or per kilometer of driving.",
    "Tracking this over time — after each fill-up, log your trip distance and fuel added — gives a much more realistic picture of your vehicle's real-world efficiency than any published estimate, since it reflects your actual driving conditions, terrain, and habits.",
  ],
  howItWorks: [
    { title: "Choose your unit system", description: "Select miles/gallons or kilometers/liters." },
    { title: "Enter distance and fuel used", description: "Input how far you drove and how much fuel that trip used." },
    { title: "See economy and cost", description: "View your MPG or L/100km, plus cost per unit distance." },
  ],
  examples: [
    {
      label: "300 miles on 10 gallons",
      input: "Distance: 300 miles, Fuel: 10 gallons",
      output: "30.0 MPG",
    },
  ],
  faqs: [
    {
      question: "Why is L/100km calculated differently from MPG?",
      answer: "L/100km measures fuel consumed per fixed distance (lower is better), while MPG measures distance covered per fixed fuel amount (higher is better) — they're inverse relationships, which is why L/100km can't simply be divided the same way.",
    },
    {
      question: "How do I measure fuel used accurately?",
      answer: "The most reliable method is filling your tank completely, noting your odometer reading, driving until your next fill-up, then recording exactly how much fuel it takes to fill up again — that amount is what you used over that distance.",
    },
    {
      question: "Does this account for different fuel types?",
      answer: "No — it works purely off distance, fuel volume, and price regardless of fuel type (gasoline, diesel, etc.), since the underlying arithmetic is the same.",
    },
    {
      question: "Is my driving data stored anywhere?",
      answer: "No — every calculation happens locally in your browser and nothing you enter is saved or transmitted.",
    },
  ],
};

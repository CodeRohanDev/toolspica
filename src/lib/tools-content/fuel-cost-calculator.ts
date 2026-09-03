import type { ToolContent } from "./types";

export const fuelCostCalculatorContent: ToolContent = {
  heroSubtitle: "Calculate Trip Fuel Cost in MPG, L/100km or km/L",
  overview: [
    "Estimating what a road trip or daily commute actually costs in fuel means combining three numbers correctly — the distance, the vehicle's fuel efficiency, and the current fuel price — and the math changes depending on which efficiency unit you're working with. This tool supports all three common fuel efficiency conventions used around the world: miles per gallon (MPG, standard in the US), liters per 100 kilometers (L/100km, standard across most of Europe), and kilometers per liter (km/L, common in parts of Asia).",
    "Each unit represents fuel efficiency in a fundamentally different way, which is why they aren't simply interchangeable with a basic conversion factor applied to the final cost. MPG and km/L both express distance per unit of fuel (higher is better), while L/100km expresses fuel per unit of distance (lower is better) — the calculation logic for each is genuinely different, not just a relabeling of the same formula.",
    "Enter your trip distance, your vehicle's efficiency rating in whichever unit matches how it's listed (a US vehicle's window sticker, a European spec sheet, or a manufacturer's km/L rating), and the current fuel price, and this tool calculates both the amount of fuel the trip will require and the total cost.",
    "This is useful for budgeting a road trip before you leave, comparing the true cost of two vehicles with different efficiency ratings and fuel types, or estimating a regular commute's fuel cost over a week or month by multiplying the per-trip result.",
  ],
  howItWorks: [
    {
      title: "Choose your fuel efficiency unit",
      description: "MPG, L/100km, or km/L, matching your vehicle's listed rating.",
    },
    {
      title: "Enter distance, efficiency, and fuel price",
      description: "Fields update their unit labels to match your selection.",
    },
    {
      title: "View fuel needed and total cost",
      description: "Both update instantly based on your inputs.",
    },
  ],
  examples: [
    {
      label: "MPG calculation",
      input: "300 miles, 30 MPG, $3.50/gallon",
      output: "Fuel needed: 10 gallons — Cost: $35.00",
    },
    {
      label: "L/100km calculation",
      input: "500 km, 7 L/100km, $1.60/liter",
      output: "Fuel needed: 35 liters — Cost: $56.00",
    },
  ],
  faqs: [
    {
      question: "Why is L/100km calculated differently than MPG or km/L?",
      answer:
        "L/100km expresses fuel consumed per fixed distance (lower numbers mean better efficiency), while MPG and km/L express distance covered per unit of fuel (higher numbers mean better efficiency) — they're inverse relationships, so each requires its own formula rather than a simple conversion factor.",
    },
    {
      question: "Which fuel efficiency unit does my car use?",
      answer:
        "This depends on your region — MPG is standard in the US and UK, L/100km is standard across most of the EU and many other countries, and km/L is common in several Asian markets. Check your vehicle's manual or window sticker for the rating it uses.",
    },
    {
      question: "Does this account for changes in driving conditions, like highway vs. city driving?",
      answer:
        "No — the calculation uses whatever single efficiency figure you enter, matching the assumption that your driving conditions are consistent with that rating. Actual fuel use often varies between highway and city driving, which this tool doesn't separately model.",
    },
    {
      question: "Can I use this to compare an electric vehicle's cost per trip?",
      answer:
        "This tool is built specifically for liquid fuel efficiency ratings (MPG, L/100km, km/L). An EV's cost per trip is calculated differently — based on battery efficiency in kWh per distance and electricity price — which this tool doesn't directly support.",
    },
    {
      question: "Why would I need to know how much fuel a trip requires, not just the cost?",
      answer:
        "Knowing the actual volume of fuel needed is useful for checking whether your tank has enough range for a trip without refueling, not just for budgeting the cost — both figures are shown together for that reason.",
    },
  ],
};

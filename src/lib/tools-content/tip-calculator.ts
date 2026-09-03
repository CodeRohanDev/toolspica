import type { ToolContent } from "./types";

export const tipCalculatorContent: ToolContent = {
  heroSubtitle: "Calculate Tip Amount & Split the Bill Instantly",
  overview: [
    "Calculating a tip at the table means doing two things quickly and correctly — figuring out the actual dollar amount a percentage represents on an often-odd bill total, and then splitting that total fairly if you're at the table with other people. Doing both in your head, especially on a bill like $47.83, is exactly the kind of small math that's easy to fumble under time pressure.",
    "This tool takes your bill amount and a tip percentage — with quick preset buttons for the most common rates (10%, 15%, 18%, 20%, 25%) alongside a custom field for any other percentage — and instantly calculates the tip amount and the total bill including tip. If you're splitting the bill across multiple people, entering the number of people also calculates the per-person total and per-person tip share automatically.",
    "The preset percentages reflect commonly referenced tipping ranges in many service contexts, though appropriate tipping norms vary significantly by country, region, and type of service — this tool doesn't prescribe what percentage you should tip, it just does the math accurately once you've decided on a rate.",
    "Splitting evenly across a group is the default assumption here (total divided equally by the number of people), which covers the most common real-world case. For a bill that needs to be split unevenly based on what each person actually ordered, this tool's per-person total gives you the baseline even split figure as a useful reference point.",
  ],
  howItWorks: [
    {
      title: "Enter the bill amount",
      description: "The pre-tip total from the receipt.",
    },
    {
      title: "Choose a tip percentage",
      description: "Pick a preset (10-25%) or enter a custom percentage.",
    },
    {
      title: "Enter the number of people (optional)",
      description: "Splits the total and tip evenly if more than one person is paying.",
    },
  ],
  examples: [
    {
      label: "Simple tip calculation",
      input: "Bill $60.00, tip 20%",
      output: "Tip: $12.00 — Total: $72.00",
    },
    {
      label: "Splitting a bill four ways",
      input: "Bill $120.00, tip 18%, 4 people",
      output: "Total: $141.60 — Per person: $35.40",
    },
  ],
  faqs: [
    {
      question: "What tip percentage should I use?",
      answer:
        "Appropriate tipping norms vary widely by country, region, and type of service, and this tool doesn't recommend a specific rate — the preset buttons (10-25%) simply reflect commonly referenced ranges. Use whatever percentage fits your own situation and local norms.",
    },
    {
      question: "Does splitting the bill divide the tip evenly too?",
      answer:
        "Yes — when you enter more than one person, both the total bill (including tip) and the tip amount itself are divided evenly across that number of people, giving you a per-person total and a per-person tip figure.",
    },
    {
      question: "Can I split a bill unevenly, based on what each person ordered?",
      answer:
        "This tool calculates an even split as its default assumption. For an uneven split, use the even per-person total shown here as a baseline reference, then adjust manually based on what each person actually ordered.",
    },
    {
      question: "Is the tip calculated before or after any sales tax on the bill?",
      answer:
        "The tool calculates the tip as a percentage of whatever bill amount you enter — if your receipt's bill amount already includes tax, the tip is calculated on that tax-inclusive total, matching how many people calculate tips in practice.",
    },
    {
      question: "Can I enter a tip percentage that isn't one of the presets?",
      answer:
        "Yes — the custom percentage field next to the presets accepts any value, including decimals like 17.5%, for whatever specific rate you want to calculate.",
    },
  ],
};

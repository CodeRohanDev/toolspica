import type { ToolContent } from "./types";

export const randomNameGeneratorContent: ToolContent = {
  heroSubtitle: "Generate Realistic Random Names Instantly",
  overview: [
    "Realistic placeholder names come up constantly — test users for an app, characters for a story draft, sample rows for a database, names for a design mockup's user list. Making them up one by one gets repetitive fast, and reusing \"John Doe\" everywhere makes test data look obviously fake.",
    "This tool generates full names by randomly combining curated lists of common first names and surnames, producing natural-sounding results rather than gibberish. Choose female, male, or any (a random mix), and generate up to 50 names at once — enough to populate a whole test dataset in one click.",
    "Every name is a random pairing, not a lookup of real people — any match with an actual person is pure coincidence, the same way a phone book contains thousands of \"real\" name combinations that also belong to no one in particular. That makes these names safe to use as placeholder data where using real customer names would be a privacy problem.",
    "This is useful for seeding test databases, populating design mockups with believable user lists, writing exercises and character naming, role-play and game characters, and any context that needs realistic names without touching real personal data.",
  ],
  howItWorks: [
    {
      title: "Pick a category",
      description: "Female, male, or any for a random mix.",
    },
    {
      title: "Choose how many names",
      description: "From a single name up to 50 at once.",
    },
    {
      title: "Generate and copy",
      description: "Copy the full list with one click, one name per line.",
    },
  ],
  examples: [
    {
      label: "Generating test users",
      input: "Category: any, count: 5",
      output: "Emma Walker, Liam Torres, Sophia Nguyen, Jack Rivera, Grace Campbell",
    },
  ],
  faqs: [
    {
      question: "Are these names of real people?",
      answer:
        "No — each name is a random combination from curated lists of common first names and surnames. Any resemblance to a real individual is coincidental, which is exactly what makes these safe as placeholder data where real names would raise privacy concerns.",
    },
    {
      question: "Why use generated names instead of real customer data for testing?",
      answer:
        "Using real personal data in test environments is a genuine privacy and compliance risk (and outright prohibited under regulations like GDPR in many cases). Generated names give test data a realistic look with zero connection to actual people.",
    },
    {
      question: "Can I get the same name twice in one batch?",
      answer:
        "It's possible but uncommon — names are drawn independently, and with thousands of possible first-surname combinations, repeats within a typical batch are rare. If one appears, just regenerate.",
    },
    {
      question: "What naming style do these lists use?",
      answer:
        "The lists draw from names common in English-speaking countries — the most broadly useful default for test data and mockups aimed at international audiences. They aren't intended to represent every naming tradition worldwide.",
    },
    {
      question: "Can I use these names in published fiction or a game?",
      answer:
        "Yes — the generated combinations are free to use anywhere. For a major character, it's still worth a quick search to make sure the exact combination isn't strongly associated with a famous real person, purely to avoid unintended association.",
    },
  ],
};

import type { ToolContent } from "./types";

export const packingListGeneratorContent: ToolContent = {
  heroSubtitle: "Generate a Custom Packing List for Any Trip",
  overview: [
    "Packing for a trip usually means remembering the same handful of essentials plus a set of trip-specific items — and it's the trip-specific category (sunscreen for a beach trip, hiking boots for the outdoors, a laptop for a business trip) that's easiest to forget when packing quickly the night before departure.",
    "This tool generates a checklist combining universal travel essentials, clothing quantities scaled to your trip length, and a category-specific item set based on your chosen trip type — beach, city/business, hiking, winter/ski, or international — so you get a tailored list rather than a generic one.",
    "Each item has a checkbox so you can tick things off as you actually pack them, and the list updates instantly if you change your trip length or trip type, recalculating clothing quantities and swapping the category-specific items automatically.",
  ],
  howItWorks: [
    { title: "Select your trip type", description: "Choose beach, city/business, hiking, winter/ski, or international." },
    { title: "Enter trip length", description: "Input how many days you'll be traveling — clothing quantities scale accordingly." },
    { title: "Check off items as you pack", description: "Tick each item's checkbox to track your packing progress." },
  ],
  examples: [
    {
      label: "5-day beach trip",
      input: "Trip type: Beach, Days: 5",
      output: "Includes swimsuit, sunscreen, sunglasses, plus 5 sets of clothing basics",
    },
  ],
  faqs: [
    {
      question: "How are clothing quantities calculated?",
      answer: "Underwear and socks scale one-to-one with trip days, while tops scale slightly lower (about 80% of trip days) since tops are often reworn once during a trip more comfortably than underwear.",
    },
    {
      question: "Can I add my own items?",
      answer: "The generated list covers common essentials and trip-type-specific items — treat it as a strong starting checklist and add any personal or activity-specific items you know you'll need.",
    },
    {
      question: "Does the checklist save automatically?",
      answer: "Checked items persist only while you're on the page in that session — refreshing will reset checkmarks, so complete your packing in one sitting or take a screenshot for reference.",
    },
    {
      question: "Is my trip information stored anywhere?",
      answer: "No — the list is generated entirely in your browser and nothing about your trip is sent to a server.",
    },
  ],
};

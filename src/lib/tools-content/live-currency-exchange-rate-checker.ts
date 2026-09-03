import type { ToolContent } from "./types";

export const liveCurrencyExchangeRateCheckerContent: ToolContent = {
  heroSubtitle: "Check Live Exchange Rates for 20 Major Currencies",
  overview: [
    "Foreign exchange rates shift constantly during trading hours, which matters for anyone converting currency for travel, international payments, or just understanding what a price in another currency really costs right now, rather than what it cost whenever a rate was last checked.",
    "This tool fetches live exchange rates for 20 major world currencies from the Frankfurter API, which sources its data from the European Central Bank — a stable, authoritative reference used widely across financial applications. Pick a base currency and an amount, and see the equivalent value across every other supported currency at once.",
    "Rates update from the ECB's published reference rates, which are set once each business day rather than continuously throughout trading — this makes them a reliable daily reference point, though not a live tick-by-tick trading rate for active currency trading purposes.",
    "This is useful for planning currency conversion before international travel, checking what a price or salary in another currency is worth, converting invoice or payment amounts for international business, and general currency awareness across major world currencies.",
  ],
  howItWorks: [
    {
      title: "Choose a base currency",
      description: "The currency you're converting from.",
    },
    {
      title: "Enter an amount",
      description: "Any amount in the base currency.",
    },
    {
      title: "See rates across 19 other major currencies",
      description: "Updated live from the European Central Bank's published reference rates.",
    },
  ],
  examples: [
    {
      label: "Checking how much $100 USD is worth abroad",
      input: "100 USD",
      output: "Equivalent values in EUR, GBP, JPY, INR, and 15 other currencies at once",
    },
  ],
  faqs: [
    {
      question: "How often do these rates update?",
      answer:
        "The European Central Bank publishes reference rates once each business day (typically around 16:00 CET), so rates reflect the most recent daily ECB reference point rather than continuous real-time trading fluctuations throughout the day.",
    },
    {
      question: "Are these the exact rates I'd get at a bank or currency exchange?",
      answer:
        "No — banks and currency exchange services typically add a markup or spread on top of the interbank reference rate shown here, which is the raw market reference rate without any retail margin added. Expect to receive a somewhat less favorable rate at an actual exchange.",
    },
    {
      question: "Why does the ECB's data only cover certain currencies?",
      answer:
        "The European Central Bank publishes reference rates for the major currencies it tracks for eurozone financial purposes — this happens to cover all the world's most commonly traded currencies, which is why it's a widely used free data source for exchange rate tools.",
    },
    {
      question: "Can I use this for very small or very large amounts?",
      answer:
        "Yes — enter any amount and every currency's equivalent value scales directly from the live rate, whether you're converting a few dollars or a large sum.",
    },
    {
      question: "Why would I use this instead of just searching '1 USD to EUR'?",
      answer:
        "This shows your amount converted across all 19 other currencies simultaneously rather than one pair at a time, which is faster when you need to compare several currencies at once — say, planning a multi-country trip or comparing prices across regions.",
    },
  ],
};

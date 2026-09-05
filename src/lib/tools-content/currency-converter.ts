import type { ToolContent } from "./types";

export const currencyConverterContent: ToolContent = {
  heroSubtitle: "Convert Between Currencies with Live Exchange Rates",
  overview: [
    "Converting an amount between currencies needs an actual live exchange rate — yesterday's rate, or a rough mental estimate, isn't accurate enough for anything involving real money, from planning travel spending to checking a price listed in a foreign currency.",
    "This tool converts an amount between any two of a dozen major currencies using live exchange rate data, updating instantly as you change the amount, source currency, or target currency, with a one-click swap button to flip the conversion direction.",
    "Exchange rates come from a live, regularly updated public rate-tracking service, queried directly from your browser — the exact rate and its last-updated time are shown below the conversion so you know exactly how current the numbers are.",
  ],
  howItWorks: [
    { title: "Enter an amount", description: "Type the amount you want to convert." },
    { title: "Pick the two currencies", description: "Choose the source and target currency from the dropdowns." },
    { title: "See the live result", description: "The converted amount updates instantly using current exchange rates." },
  ],
  examples: [
    {
      label: "Converting 100 USD to INR",
      input: "100 USD → INR",
      output: "≈ 8,340 INR (at the current live exchange rate)",
    },
  ],
  faqs: [
    {
      question: "How current are the exchange rates?",
      answer:
        "Rates come from a live, regularly updated public rate-tracking service — the exact last-updated time is shown below the conversion result so you can see how current the numbers are.",
    },
    {
      question: "Can I convert between any two currencies?",
      answer:
        "This tool covers a dozen major currencies (USD, EUR, GBP, JPY, INR, and others) — the most commonly needed ones for everyday conversion.",
    },
    {
      question: "Is this accurate enough for an actual financial transaction?",
      answer:
        "It's accurate for general reference, but actual transactions (bank transfers, currency exchange) typically apply their own rate with a margin or fee — always check your bank or exchange provider's actual rate for a real transaction.",
    },
    {
      question: "Is my conversion data sent to this site's own server?",
      answer:
        "No — your browser fetches exchange rate data directly from a public rate API. This site's own servers are never involved in the conversion.",
    },
  ],
};

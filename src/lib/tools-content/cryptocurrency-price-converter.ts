import type { ToolContent } from "./types";

export const cryptocurrencyPriceConverterContent: ToolContent = {
  heroSubtitle: "Convert Between Crypto and Fiat Currencies Live",
  overview: [
    "Cryptocurrency prices move fast enough that a rate looked up even an hour ago can be meaningfully stale — unlike converting between stable fiat currencies, where rates barely shift day to day, crypto conversions genuinely need a live, current rate to be useful.",
    "This tool fetches live exchange rates directly from Coinbase's public exchange rate API and converts between major cryptocurrencies (Bitcoin, Ethereum, Solana, Dogecoin, Tether) and major fiat currencies (USD, EUR, GBP, INR, JPY) in either direction — crypto to fiat, fiat to crypto, or even between two different cryptocurrencies.",
    "The conversion happens directly in your browser, fetching the current rate the moment you load the page or change currencies, so the number you see reflects genuinely current market pricing rather than a cached or delayed snapshot.",
    "This is useful for quickly checking what a crypto holding is worth in your local currency, converting a price quoted in one currency into another before a purchase or sale, understanding relative value between different cryptocurrencies, and any quick crypto math that would otherwise require checking multiple sources.",
  ],
  howItWorks: [
    {
      title: "Enter an amount",
      description: "The quantity you want to convert.",
    },
    {
      title: "Choose the from and to currencies",
      description: "Any combination of supported crypto and fiat currencies.",
    },
    {
      title: "See the live converted value",
      description: "Fetched fresh from Coinbase's public exchange rate data.",
    },
  ],
  examples: [
    {
      label: "Converting Bitcoin to US Dollars",
      input: "0.5 BTC to USD",
      output: "The current USD value of 0.5 BTC at live market rates",
    },
  ],
  faqs: [
    {
      question: "How current are the exchange rates shown?",
      answer:
        "They're fetched live from Coinbase's public API each time you load the page or change your currency selection — reflecting Coinbase's current market rate at that moment, not a cached or delayed value.",
    },
    {
      question: "Why might this rate differ slightly from another exchange's price?",
      answer:
        "Cryptocurrency prices vary slightly across different exchanges due to differences in trading volume, liquidity, and order book depth at each venue — this is normal and expected, and the differences are usually small for major, liquid coins like Bitcoin and Ethereum.",
    },
    {
      question: "Can I convert between two different cryptocurrencies directly?",
      answer:
        "Yes — select any two currencies from the list, including two cryptocurrencies (like BTC to ETH), and the conversion is computed directly from Coinbase's rate data for that pair.",
    },
    {
      question: "Is this suitable for actually executing a trade or transaction?",
      answer:
        "This tool is for quick reference and estimation only — for an actual trade, always check the live rate and any applicable fees directly on the exchange or platform where the transaction will happen, since rates can shift between checking here and executing elsewhere.",
    },
    {
      question: "Why does the rate update when I swap the from/to currencies?",
      answer:
        "Swapping fetches a fresh rate for the new base currency rather than simply inverting the previous number — this keeps the displayed rate accurate to Coinbase's live data for whichever currency is now the base, rather than relying on an approximation.",
    },
  ],
};

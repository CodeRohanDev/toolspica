import type { ToolContent } from "./types";

export const rentVsBuyCalculatorContent: ToolContent = {
  heroSubtitle: "Compare the True Cost of Renting vs. Buying a Home",
  overview: [
    "Deciding whether to rent or buy isn't as simple as comparing a monthly mortgage payment to monthly rent — buying involves property tax, maintenance, and a down payment that could otherwise be invested, while home value appreciation over time partially offsets the ownership costs, all of which need to be weighed together over a realistic time horizon.",
    "This calculator projects both scenarios forward over your chosen number of years: for buying, it accumulates mortgage payments, property tax, and maintenance costs while tracking home value appreciation; for renting, it accumulates rising rent payments while assuming the money you'd have spent on a down payment is invested instead and grows at your chosen return rate.",
    "At the end of the time horizon, it nets out home equity gained from buying against total costs paid, and nets out investment growth against total rent paid, then tells you which option comes out cheaper under your specific assumptions — numbers you can adjust to model different markets, rates, and time horizons.",
  ],
  howItWorks: [
    { title: "Enter buying details", description: "Input home price, down payment, mortgage rate, and ongoing ownership costs." },
    { title: "Enter renting details", description: "Input monthly rent, expected rent increases, and investment return rate." },
    { title: "Compare over your time horizon", description: "See net cost of each option and which is cheaper over your chosen years." },
  ],
  examples: [
    {
      label: "$400,000 home vs. $2,000/month rent, 7-year horizon",
      input: "Home: $400,000, 20% down, 6.5% mortgage; Rent: $2,000/mo",
      output: "Net cost of buying vs. renting compared over 7 years",
    },
  ],
  faqs: [
    {
      question: "What assumptions does this model ignore?",
      answer: "It doesn't account for closing costs, private mortgage insurance (PMI), mortgage interest tax deductions, or renter's insurance — all of which can shift the real-world comparison. Treat this as a simplified directional estimate.",
    },
    {
      question: "Why does the time horizon matter so much?",
      answer: "Buying typically has higher upfront costs but builds equity over time, so it tends to become more favorable the longer you stay — a short time horizon often favors renting due to the upfront costs of buying and selling.",
    },
    {
      question: "What return rate should I assume for the invested down payment?",
      answer: "A common assumption is a diversified investment portfolio's historical average return, but this is inherently uncertain — try a few different rates to see how sensitive the outcome is to this assumption.",
    },
    {
      question: "Is my financial information sent anywhere?",
      answer: "No — every projection is calculated locally in your browser using the numbers you enter, with nothing transmitted to a server.",
    },
  ],
};

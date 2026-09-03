import type { ToolContent } from "./types";

export const sipCalculatorContent: ToolContent = {
  heroSubtitle: "Project Your SIP Mutual Fund Investment Growth",
  overview: [
    "A SIP (Systematic Investment Plan) is a way of investing a fixed amount into a mutual fund at regular intervals — typically monthly — rather than investing a lump sum all at once. It's one of the most common ways retail investors in India build long-term wealth, since it enforces disciplined, regular investing and benefits from rupee-cost averaging (buying more units when prices are low and fewer when prices are high) rather than trying to time the market.",
    "This tool projects the future value of a SIP using the standard SIP future value formula, which accounts for the fact that each monthly contribution compounds for a different length of time — the first contribution compounds for nearly the entire investment period, while the last contribution barely compounds at all before the end date. Getting this calculation right requires summing the compounded value of every individual contribution, not just applying a single compound interest formula to the total invested amount.",
    "Enter your planned monthly investment, an expected annual rate of return, and your investment period in years, and the tool shows your total invested amount (simply monthly investment × number of months), the estimated returns (the growth beyond what you actually put in), and the projected total maturity value.",
    "The projected return rate is an assumption you provide, not a guarantee — mutual fund returns fluctuate with the market and are never fixed or assured, unlike a bank fixed deposit. This tool is meant for planning and goal-setting purposes, showing what a given return assumption would produce, not as a promise of actual future performance.",
  ],
  howItWorks: [
    {
      title: "Enter your planned monthly investment amount",
      description: "The fixed amount you'll invest each month.",
    },
    {
      title: "Enter an expected annual return and investment period",
      description: "Your assumed rate of growth and how many years you'll continue investing.",
    },
    {
      title: "View your projected maturity value",
      description: "See invested amount, estimated returns, and total projected value.",
    },
  ],
  examples: [
    {
      label: "10-year SIP projection",
      input: "₹5,000/month, 12% expected return, 10 years",
      output: "Invested: ₹6,00,000 — Estimated returns: ₹5,61,695.38 — Maturity value: ₹11,61,695.38",
    },
  ],
  faqs: [
    {
      question: "Is the projected return rate guaranteed?",
      answer:
        "No — the expected annual return you enter is an assumption for planning purposes, not a guarantee. Mutual fund SIP returns depend on actual market performance and fluctuate significantly year to year, unlike a fixed deposit's guaranteed rate.",
    },
    {
      question: "Why does the SIP formula differ from a simple compound interest calculation?",
      answer:
        "A SIP involves many separate contributions made at different times, each compounding for a different remaining duration — the first month's investment compounds for nearly the full period, while the last month's investment barely compounds at all. A single lump-sum compound interest formula wouldn't capture this correctly, which is why SIP uses its own future-value-of-a-series formula.",
    },
    {
      question: "What's the benefit of investing through a SIP instead of a lump sum?",
      answer:
        "A SIP enforces disciplined, regular investing and benefits from rupee-cost averaging — buying more fund units when prices are lower and fewer when prices are higher, which can smooth out the impact of market volatility compared to investing everything at a single point in time.",
    },
    {
      question: "Can I use this for a SIP in a currency other than rupees?",
      answer:
        "The underlying math is currency-agnostic and works the same way regardless of currency — SIP as a specific term and investment structure is most commonly associated with India's mutual fund industry, but the calculation itself applies to any regular, fixed-interval investment plan.",
    },
    {
      question: "Does this account for expense ratios or exit loads charged by the fund?",
      answer:
        "No — this calculates growth based purely on the return rate you enter. Actual mutual fund returns are typically reported after fees are already factored in, but if you're using a gross return assumption, real-world fund expense ratios and any applicable exit loads would reduce your actual net returns below this projection.",
    },
  ],
};

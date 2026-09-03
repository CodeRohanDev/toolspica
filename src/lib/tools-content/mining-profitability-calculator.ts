import type { ToolContent } from "./types";

export const miningProfitabilityCalculatorContent: ToolContent = {
  heroSubtitle: "Estimate Mining Profit from Hash Rate, Power & Difficulty",
  overview: [
    "Whether cryptocurrency mining is actually profitable depends on a handful of interacting numbers — your hardware's hash rate, its power draw, your electricity cost, the coin's current price, and the network's overall difficulty — and getting a realistic estimate means running the actual math rather than guessing.",
    "This calculator estimates your expected share of network-wide mining rewards using the same difficulty-to-network-hashrate relationship real mining calculators use: network hash rate is derived from the current difficulty and target block time, your hardware's share of that network hash rate determines your expected portion of newly mined coins, and your electricity cost is subtracted to arrive at estimated daily, monthly, and yearly profit.",
    "Because network difficulty and coin price both change constantly — difficulty adjusts roughly every two weeks for Bitcoin based on how fast blocks were actually found, and price can move significantly in a single day — this is necessarily a snapshot estimate based on whatever numbers you enter, not a guaranteed forecast. Entering current, accurate difficulty and price figures makes the estimate meaningfully more reliable.",
    "This is useful for evaluating whether a specific mining rig or hash rate is currently profitable, comparing profitability across different electricity rates or hardware options, understanding how a difficulty or price change would affect returns, and general due diligence before investing in mining hardware.",
  ],
  howItWorks: [
    {
      title: "Enter your hardware's hash rate and power draw",
      description: "In GH/s, TH/s, PH/s, or EH/s, plus wattage.",
    },
    {
      title: "Enter electricity cost and pool fee",
      description: "Your actual $/kWh rate and any mining pool's fee percentage.",
    },
    {
      title: "Enter current network stats and coin price",
      description: "Difficulty, block reward, block time, and current market price.",
    },
  ],
  examples: [
    {
      label: "Checking profitability of a mid-range ASIC miner",
      input: "100 TH/s, 3250W, $0.08/kWh electricity",
      output: "Daily revenue, daily power cost, and net daily/monthly/yearly profit",
    },
  ],
  faqs: [
    {
      question: "Why does this need the current network difficulty entered manually?",
      answer:
        "Difficulty changes constantly (roughly every two weeks for Bitcoin) based on how quickly recent blocks were actually found — rather than relying on a potentially stale built-in value, entering the current figure yourself keeps the estimate accurate to right now.",
    },
    {
      question: "How is network hash rate derived from difficulty?",
      answer:
        "Using the standard relationship: network hash rate equals difficulty times 2³² divided by the target block time in seconds. This is the same formula used across mining calculators and blockchain explorers to estimate total network computing power from the publicly known difficulty value.",
    },
    {
      question: "Why might my actual results differ from this estimate?",
      answer:
        "Difficulty and coin price both shift after you run the calculation, mining pool variance can cause your actual short-term rewards to differ from the statistical average, and hardware doesn't always run at its rated hash rate continuously — all of which are impossible to account for in a snapshot estimate.",
    },
    {
      question: "What does a negative profit result mean?",
      answer:
        "It means your electricity cost currently exceeds the value of coins your hardware would be expected to earn — a common and important result to know before investing in or continuing to run mining hardware, since it means mining is currently a net loss at your specific electricity rate.",
    },
    {
      question: "Does this account for hardware cost or depreciation?",
      answer:
        "No — this calculates ongoing operational profitability (revenue minus electricity cost) only, not the upfront hardware investment or its depreciation over time, which would need to be factored in separately when evaluating overall return on investment.",
    },
  ],
};

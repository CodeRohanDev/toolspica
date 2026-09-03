import type { ToolContent } from "./types";

export const retirementCalculatorContent: ToolContent = {
  heroSubtitle: "Project Your Retirement Savings Growth Over Time",
  overview: [
    "Projecting where retirement savings will actually land decades from now means combining three growing factors correctly: the current balance compounding on its own, regular monthly contributions each compounding from the point they're added, and the combined effect of both over potentially dozens of years. Getting this projection right by hand — or even in a simple spreadsheet formula — is easy to get subtly wrong.",
    "This tool uses the standard future value of an annuity formula, which correctly combines compound growth on your existing balance with compound growth on every future contribution, each starting to grow from the month it's actually added rather than assuming all contributions grow for the full remaining time period. This distinction matters significantly over long time horizons — a contribution made in year 30 has far less time to compound than one made in year 1.",
    "Enter your current age, target retirement age, current savings balance, planned monthly contribution, and an expected annual rate of return, and the tool projects your balance at retirement, along with a breakdown of how much of that total came from your own contributions versus investment growth — a useful way to see just how much compounding itself contributes to long-term growth compared to the money actually put in.",
    "The projection assumes a constant, unchanging rate of return every year, which real markets never actually deliver — real returns fluctuate year to year, sometimes significantly. This tool is meant for directional planning and understanding the mechanics of long-term compounding, not as a guaranteed prediction of an actual future balance, and doesn't account for inflation, taxes, fees, or changes to contribution amounts over time.",
  ],
  howItWorks: [
    {
      title: "Enter your current age and target retirement age",
      description: "Determines how many years (and months) your money has to grow.",
    },
    {
      title: "Enter your current savings and monthly contribution",
      description: "Both are projected forward using compound growth.",
    },
    {
      title: "Enter an expected annual rate of return",
      description: "See your projected balance at retirement, split into contributions vs. growth.",
    },
  ],
  examples: [
    {
      label: "Starting from scratch",
      input: "Age 30, retire at 65, $0 savings, $500/month, 7% return",
      output: "Projected balance: $900,527.30",
    },
    {
      label: "With existing savings",
      input: "Age 40, retire at 65, $50,000 savings, $800/month, 7% return",
      output: "Projected balance: $934,328.26",
    },
  ],
  faqs: [
    {
      question: "Why does the projection assume a constant rate of return every year?",
      answer:
        "Real investment returns vary significantly from year to year — some years are strongly positive, others negative. Using a constant average expected return is a standard simplification for long-term projections, useful for understanding the general trajectory and the mechanics of compounding, but it doesn't capture real market volatility.",
    },
    {
      question: "Does this account for inflation?",
      answer:
        "No — the projected balance is shown in today's-dollar terms without adjusting for inflation eroding purchasing power over the decades until retirement. A more conservative planning approach often uses an inflation-adjusted (\"real\") return rate instead of a nominal one to account for this.",
    },
    {
      question: "Why does a contribution made early on matter more than one made later?",
      answer:
        "A contribution made in year one of a 35-year timeline compounds for all 35 years, while a contribution made in year 34 only compounds for one year — the earlier money has vastly more time to benefit from compound growth, which is why starting to save earlier has an outsized long-term impact even at the same monthly amount.",
    },
    {
      question: "Does this account for employer matching contributions?",
      answer:
        "Not directly — if your employer matches contributions, add that matched amount into your monthly contribution figure to get an accurate combined projection, since the calculator treats whatever monthly figure you enter as the total amount being invested each month.",
    },
    {
      question: "Should I use this instead of talking to a financial advisor?",
      answer:
        "No — this tool is meant for a general, simplified projection to understand the mechanics of long-term saving and compounding. Actual retirement planning should account for your full financial picture, risk tolerance, taxes, and goals, which is best done with a qualified financial advisor.",
    },
  ],
};

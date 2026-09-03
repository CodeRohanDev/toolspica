import type { ToolContent } from "./types";

export const coinFlipContent: ToolContent = {
  heroSubtitle: "Flip a Virtual Coin Instantly",
  overview: [
    "Flipping a real coin is the classic way to make a fair, unbiased 50/50 decision — but a physical coin isn't always at hand, and repeated flips for a game or classroom demo get tedious fast.",
    "This tool simulates a coin flip with a genuinely random 50/50 outcome between heads and tails, complete with a short flip animation so it feels like an actual toss rather than an instant, unsatisfying result.",
    "It also tracks your session stats — running totals of heads and tails — so you can see the balance across many flips, which is a nice way to demonstrate that, over enough trials, results converge toward an even split even though any single flip is unpredictable.",
    "This is useful for quick decisions (who goes first, pick a side), classroom probability demonstrations, game mechanics that need a coin-toss element, and settling any either-or choice fairly.",
  ],
  howItWorks: [
    {
      title: "Click Flip",
      description: "The coin animates briefly, then lands on heads or tails.",
    },
    {
      title: "See the result",
      description: "The outcome is shown clearly, with the flip recorded in your stats.",
    },
    {
      title: "Flip again anytime",
      description: "Session totals for heads and tails update after every flip.",
    },
  ],
  examples: [
    {
      label: "Deciding who goes first",
      input: "Flip",
      output: "Heads — Player 1 goes first",
    },
  ],
  faqs: [
    {
      question: "Is each flip truly 50/50?",
      answer:
        "Yes — each flip is an independent random draw with an equal chance of heads or tails, just like an ideal fair coin, with no bias toward either side.",
    },
    {
      question: "Does a streak of heads make tails more likely next?",
      answer:
        "No — this is the classic gambler's fallacy. Each flip is completely independent of previous flips, so a run of heads has no effect whatsoever on the odds of the next flip.",
    },
    {
      question: "What do the running totals show?",
      answer:
        "They track how many heads and tails you've gotten so far this session, which is a good way to visually confirm that results balance out toward 50/50 as the number of flips grows.",
    },
    {
      question: "Can I use this to settle a real decision?",
      answer:
        "Yes — it works exactly like flipping a physical coin for any everyday decision, from picking who starts a game to choosing between two equally good options.",
    },
    {
      question: "Why is there a short animation instead of an instant result?",
      answer:
        "It mirrors the anticipation of a real coin toss, making the result feel earned rather than just an instant label swap — purely for a more satisfying feel, not because a delay is technically necessary.",
    },
  ],
};

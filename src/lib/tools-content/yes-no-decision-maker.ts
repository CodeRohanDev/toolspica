import type { ToolContent } from "./types";

export const yesNoDecisionMakerContent: ToolContent = {
  heroSubtitle: "Get an Instant Random Yes or No Answer",
  overview: [
    "Small, low-stakes decisions can eat up disproportionate mental energy — should I text them first, order the other menu item, take the other route home. Sometimes the fastest way through is a random nudge rather than more deliberation.",
    "This tool gives an instant random Yes or No answer (with an optional Maybe added into the mix), decided with a short animated reveal so it feels like an actual decision moment rather than text that was always going to say the same thing.",
    "This is deliberately for playful, low-stakes decisions — it works by pure chance, with no analysis of your actual situation, which is exactly the point: it's a way to short-circuit overthinking on choices that don't really have a wrong answer.",
    "This is useful for breaking decision paralysis on trivial choices, settling a lighthearted debate, party games and icebreakers, or just injecting a bit of randomness into a day full of decisions.",
  ],
  howItWorks: [
    {
      title: "Optionally include Maybe",
      description: "Toggle a three-way Yes/No/Maybe outcome instead of a straight coin-flip choice.",
    },
    {
      title: "Click Decide",
      description: "A brief animation builds anticipation before the answer reveals.",
    },
    {
      title: "Get your answer",
      description: "A clear Yes, No, or Maybe, color-coded for an instant read.",
    },
  ],
  examples: [
    {
      label: "Deciding on a coin-flip-worthy question",
      input: "Should I order the other dish? Decide.",
      output: "Yes",
    },
  ],
  faqs: [
    {
      question: "Is this actually random, or does it favor Yes or No?",
      answer:
        "It's genuinely random with no bias toward either outcome — Yes and No each have an equal chance, and if Maybe is included, all three options are equally likely.",
    },
    {
      question: "Should I use this for serious or important decisions?",
      answer:
        "No — this is meant for lighthearted, low-stakes choices where either outcome is genuinely fine. Important decisions deserve actual thought, not a random draw.",
    },
    {
      question: "What does turning on 'include Maybe' change?",
      answer:
        "It switches from a two-way Yes/No split to a three-way split with Maybe added as an equally likely third outcome — useful when a genuinely noncommittal answer feels more honest than a forced binary.",
    },
    {
      question: "Can I get a different answer if I click again right away?",
      answer:
        "Yes — every click is a fresh, independent random draw, so re-deciding can easily flip the result. That's expected behavior, not a bug.",
    },
    {
      question: "Is this the same as flipping a coin?",
      answer:
        "Functionally yes when Maybe is off — it's a 50/50 random choice, just framed as a direct answer to a yes-or-no question rather than heads or tails.",
    },
  ],
};

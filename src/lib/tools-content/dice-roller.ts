import type { ToolContent } from "./types";

export const diceRollerContent: ToolContent = {
  heroSubtitle: "Roll Virtual Dice — d4 to d100",
  overview: [
    "Tabletop games, board games, and probability lessons all lean on dice — but physical dice get lost, and some games (especially tabletop RPGs) call for die types most people don't own, like a d20 or d12.",
    "This tool rolls virtual dice of any common type — d4, d6, d8, d10, d12, d20, or d100 — with a genuinely random, uniform result across every face. Roll a single die or up to 20 at once, and when rolling multiple, the total sum is shown alongside the individual results.",
    "Every roll is independent and unbiased across the die's faces, exactly matching the probability behavior of a fair physical die, which matters for games where the odds are part of the rules (a d20 attack roll in a tabletop RPG, for instance, depends on genuinely even odds across all 20 faces).",
    "This is useful for tabletop RPGs (D&D and similar systems use d4 through d20 constantly), board games that need standard d6 dice, probability and statistics demonstrations, and any quick random number pick bounded to a familiar die range.",
  ],
  howItWorks: [
    {
      title: "Pick your die type",
      description: "d4, d6, d8, d10, d12, d20, or d100.",
    },
    {
      title: "Choose how many dice",
      description: "Roll 1 up to 20 dice at once.",
    },
    {
      title: "Click Roll",
      description: "See each individual result, plus the total sum for multiple dice.",
    },
  ],
  examples: [
    {
      label: "Rolling for a D&D attack",
      input: "1 x d20",
      output: "17",
    },
    {
      label: "Rolling damage with multiple dice",
      input: "3 x d6",
      output: "4, 6, 2 (total: 12)",
    },
  ],
  faqs: [
    {
      question: "Is each face of the die equally likely?",
      answer:
        "Yes — every face has an exactly equal probability of coming up, matching the behavior of an ideal fair physical die of that type.",
    },
    {
      question: "What does 'd20' or 'd6' mean?",
      answer:
        "The 'd' stands for die, and the number is how many sides it has — a d20 is a 20-sided die, a d6 is a standard 6-sided cube. This notation comes from tabletop RPGs and is now standard shorthand for any polyhedral die.",
    },
    {
      question: "Why does rolling multiple dice show a total?",
      answer:
        "Many games call for a combined result rather than individual dice — like rolling 2d6 for a board game move or 3d6 for RPG damage — so showing the sum alongside each individual roll saves you the manual addition.",
    },
    {
      question: "Can I use this to replace physical dice in an actual game session?",
      answer:
        "Yes — the roll behavior is statistically equivalent to a fair physical die, making it a fine substitute when dice aren't on hand or for playing remotely.",
    },
    {
      question: "What's a d100 used for?",
      answer:
        "A d100 (percentile die) generates a result from 1 to 100 and is used in some RPG systems for percentage-based checks, like a skill roll needing to beat a target percentage.",
    },
  ],
};

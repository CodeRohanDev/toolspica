import type { ToolContent } from "./types";

export const randomTeamGeneratorContent: ToolContent = {
  heroSubtitle: "Split a List of Names into Random Teams",
  overview: [
    "Splitting a group into fair teams — for a sports match, a classroom project, a work activity, or a game night — is a small task that reliably causes friction when done by hand, since whoever picks first (or last) usually feels the split wasn't fair.",
    "This tool takes a list of names and randomly shuffles them into however many teams you specify, distributing everyone as evenly as possible. The randomization removes any perception of bias, since no one — including whoever ran the generator — controls who ends up where.",
    "The shuffle uses a proper randomized algorithm (a Fisher-Yates shuffle) rather than a naive approach, which matters because naive shuffling methods can subtly favor certain orderings — a genuinely fair shuffle gives every possible team arrangement an equal chance.",
    "This is useful for splitting a class into project groups, forming teams for sports or games, dividing coworkers for a team-building activity, and any situation where an impartial, verifiably random split avoids the appearance of favoritism.",
  ],
  howItWorks: [
    {
      title: "Paste your list of names",
      description: "One name per line, any number of participants.",
    },
    {
      title: "Choose how many teams",
      description: "From 2 up to 20 teams.",
    },
    {
      title: "Click Generate",
      description: "Names are shuffled and distributed evenly across the teams.",
    },
  ],
  examples: [
    {
      label: "Splitting a group of 6 into 2 teams",
      input: "Alice, Bob, Carol, David, Eve, Frank — 2 teams",
      output: "Team 1: Carol, Frank, Alice — Team 2: Eve, Bob, David",
    },
  ],
  faqs: [
    {
      question: "How are the teams kept even in size?",
      answer:
        "Names are shuffled first, then distributed one at a time in round-robin order across the teams, so team sizes differ by at most one person even when the total doesn't divide evenly.",
    },
    {
      question: "Is the shuffle actually fair, or does it favor certain orders?",
      answer:
        "It uses a Fisher-Yates shuffle, a well-established algorithm that gives every possible ordering of the list an exactly equal probability — a genuinely unbiased shuffle, not an approximation.",
    },
    {
      question: "What happens if the number of people doesn't divide evenly into the number of teams?",
      answer:
        "The round-robin distribution means some teams simply get one extra person — for example, 7 people into 2 teams becomes a 4-3 split, still as even as the numbers allow.",
    },
    {
      question: "Can I regenerate if I don't like the result?",
      answer:
        "Yes — click Generate again for a completely fresh, independent shuffle. Just keep in mind that repeatedly regenerating until you get a preferred outcome defeats the purpose of a fair, impartial split.",
    },
    {
      question: "Is there a limit to how many names or teams I can use?",
      answer:
        "You can list as many names as you need and split into up to 20 teams, which comfortably covers classroom, sports, and workplace group sizes.",
    },
  ],
};

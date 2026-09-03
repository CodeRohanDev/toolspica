import type { ToolContent } from "./types";

export const randomCountryGeneratorContent: ToolContent = {
  heroSubtitle: "Generate a Random Country Instantly",
  overview: [
    "A random country is a fun, low-effort prompt for geography practice, travel daydreaming, trivia nights, or classroom games — but picking one \"at random\" off the top of your head tends to default to the same handful of well-known countries.",
    "This tool picks a genuinely random country from a curated list spanning every continent, along with its capital city and continent, so each result comes with useful context rather than just a bare name.",
    "Because the list spans all inhabited continents rather than skewing toward whichever countries are most famous, generating repeatedly surfaces places you might not think of unprompted — which is exactly what makes it useful for geography learning and travel-idea brainstorming.",
    "This is useful for geography trivia and classroom quizzes, picking a random travel destination to research, language-learning targets (pick a country, learn a few words of its language), and party game prompts.",
  ],
  howItWorks: [
    {
      title: "Click Generate",
      description: "A random country is selected instantly.",
    },
    {
      title: "See the details",
      description: "The country's name, capital city, and continent are shown together.",
    },
    {
      title: "Generate again anytime",
      description: "Each click is a fresh, independent random pick.",
    },
  ],
  examples: [
    {
      label: "Picking a random travel idea",
      input: "Generate",
      output: "Portugal — Capital: Lisbon — Continent: Europe",
    },
  ],
  faqs: [
    {
      question: "How many countries are in the list?",
      answer:
        "The list spans 50 countries across every inhabited continent, chosen to give a broad, genuinely global spread rather than concentrating on any single region.",
    },
    {
      question: "Can I get the same country twice in a row?",
      answer:
        "Yes — each generation is an independent random pick, so repeats across consecutive clicks are possible, just like rolling the same number twice on a die.",
    },
    {
      question: "Why does it show the capital and continent too?",
      answer:
        "A bare country name is a weaker prompt than one with context — knowing the capital and continent makes the result immediately useful for trivia, geography practice, or quickly picturing where the country actually is.",
    },
    {
      question: "Is this good for geography homework or trivia night?",
      answer:
        "Yes — it's a quick, unbiased way to generate quiz questions or practice prompts ('name this country's capital,' 'find this country on a map') without having to think one up yourself.",
    },
    {
      question: "Does the list include every country in the world?",
      answer:
        "No — it's a curated selection of 50 countries spanning all continents, not the complete list of roughly 195 sovereign states, chosen to keep results globally representative and broadly recognizable.",
    },
  ],
};

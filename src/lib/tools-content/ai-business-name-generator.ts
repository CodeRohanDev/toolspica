import type { ToolContent } from "./types";

export const aiBusinessNameGeneratorContent: ToolContent = {
  heroSubtitle: "Generate Business Name Ideas From a Single Keyword",
  overview: [
    "Naming a business is one of those tasks that feels simple until you actually sit down to do it — every obvious option is taken, and staring at a blank page rarely produces anything better. This tool takes one keyword describing your business (bakery, fitness, travel, whatever fits) and runs it through a set of proven naming patterns — prefixes, suffixes, and common startup-style constructions — to generate a batch of fresh candidates instantly.",
    "It's a combinatorial pattern generator, not a real AI model: it applies patterns like 'NovaBakery,' 'Bakeryify,' or 'GetBakery' that mirror how a huge share of real startups and small businesses actually get named. Because it's pure pattern-matching, results are instant and you can regenerate a fresh batch as many times as you want at zero cost, with no daily limit.",
    "Treat the output as a brainstorming starting point rather than a final answer — always check trademark databases and domain availability before committing to any name. But for breaking through naming paralysis and seeing a wide spread of options fast, running your keyword through a few times usually surfaces at least one name worth exploring further.",
  ],
  howItWorks: [
    { title: "Enter a keyword", description: "Something describing your business or industry." },
    { title: "Generate names", description: "20 name candidates built from proven naming patterns." },
    { title: "Copy your favorites", description: "One click copies any name to your clipboard." },
  ],
  examples: [
    { label: "Naming a bakery", input: "bakery", output: "NovaBakery, Bakeryify, GetBakery, TheBakeryCo, Bakeryio" },
  ],
  faqs: [
    { question: "Is this powered by a real AI model?", answer: "No — it's a combinatorial pattern generator using common real-world naming conventions, not a language model." },
    { question: "Are these names checked for trademark conflicts?", answer: "No — always search trademark databases and check domain/social handle availability before committing to any generated name." },
    { question: "Can I regenerate for more options?", answer: "Yes — click Generate again for a fresh batch; results include randomization so you'll see different combinations each time." },
    { question: "Does it work for any industry?", answer: "Yes — enter any keyword and the same naming patterns apply, though results read best for consumer-facing brands." },
    { question: "Is my keyword sent to a server?", answer: "No — generation happens entirely in your browser." },
  ],
};

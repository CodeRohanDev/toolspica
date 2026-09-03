import type { ToolContent } from "./types";

export const keywordDensityCheckerContent: ToolContent = {
  heroSubtitle: "See Which Words Dominate Your Content, and How Often",
  overview: [
    "Keyword density — how frequently a term appears relative to a page's total word count — used to be a heavily gamed SEO metric, but it's still a useful sanity check today: content that's wildly over-optimized for one phrase can read awkwardly to actual visitors, while content that never mentions its target topic clearly might be under-optimized. This tool breaks down your text's word frequency and density percentage so you can see exactly where you land.",
    "Paste in any block of text and get back a ranked table of the most frequent meaningful words (filtering out connectors like 'the' and 'and'), each with its raw count and density percentage relative to total word count. This makes it easy to spot unintentional overuse of a word, or confirm your target keyword actually appears often enough to signal relevance.",
    "There's no single 'correct' density percentage — search engines don't publish a target ratio, and chasing one can hurt readability more than it helps rankings. Use this as a diagnostic to catch obvious over- or under-optimization, not as a formula to hit exactly.",
  ],
  howItWorks: [
    { title: "Paste your content", description: "Any article, page copy, or product description." },
    { title: "Review the frequency table", description: "See every significant word ranked by count and density." },
    { title: "Adjust if needed", description: "Rewrite sections that are over- or under-using a term." },
  ],
  examples: [
    { label: "Checking a product page", input: "A 400-word product description", output: "\"wireless\" appears 8 times, 2.1% density" },
  ],
  faqs: [
    { question: "What's a good keyword density percentage?", answer: "There's no official target — modern search engines focus on relevance and readability over exact density ratios. Use this as a diagnostic, not a formula." },
    { question: "Does this tool understand keyword phrases (multi-word)?", answer: "No — it currently analyzes single-word frequency only, not multi-word phrase density." },
    { question: "Why are common words like \"the\" excluded?", answer: "They're filtered out as stop words since they appear frequently in all text and don't carry topical meaning." },
    { question: "Can over-optimizing density hurt my SEO?", answer: "Yes — search engines can flag unnaturally repetitive text as keyword stuffing, which can hurt rankings rather than help them." },
    { question: "Is my text uploaded anywhere?", answer: "No — analysis runs entirely in your browser." },
  ],
};

import type { ToolContent } from "./types";

export const aiKeywordExtractorContent: ToolContent = {
  heroSubtitle: "Pull the Most Frequent, Meaningful Keywords From Any Text",
  overview: [
    "Paste in an article, product description, or page of content and this tool surfaces the words that actually carry meaning — filtering out common connectors like 'the,' 'and,' or 'with' and ranking what's left by how often it appears. It's a fast way to sanity-check whether a piece of writing is actually about what you intended, or to see which terms a page is naturally leaning on before you optimize it further.",
    "Under the hood, it's a straightforward, transparent frequency-based algorithm — not a black-box AI model. Text is lowercased, stripped of punctuation, filtered against a stop-word list, and then counted. That means results are instant, fully explainable, and don't depend on any external service or API key. You can trust exactly why a word made the list: it showed up more than the others.",
    "This makes it genuinely useful for content audits, quick SEO keyword checks, or spotting repetition in your own writing — if a word you didn't intend to repeat keeps showing up at the top, that's worth noticing. Adjust the result count to see just the top handful or a broader spread, and copy the list straight into a spreadsheet or brief.",
  ],
  howItWorks: [
    { title: "Paste your text", description: "Any article, description, or block of writing." },
    { title: "Set how many keywords to show", description: "From 5 up to 50 results." },
    { title: "Review and copy", description: "Keywords are ranked by frequency, ready to copy." },
  ],
  examples: [
    { label: "Analyzing a blog draft", input: "A 600-word article about home coffee brewing", output: "Top terms: coffee, brew, grind, water, beans, ratio" },
  ],
  faqs: [
    { question: "Is this a real AI model?", answer: "No — it's a transparent, frequency-based algorithm. It's fast and fully explainable, but it doesn't understand meaning or context the way a language model would." },
    { question: "Does it work in languages other than English?", answer: "The stop-word filtering is tuned for English; other languages will still get frequency counts but without filtering out that language's common words." },
    { question: "Is my text uploaded anywhere?", answer: "No — extraction runs entirely in your browser. Nothing is sent to a server." },
    { question: "Why do some short common words still show up?", answer: "The stop-word list covers the most frequent connectors, but very short or unusual words outside that list will still be counted." },
    { question: "Can I use this for SEO keyword research?", answer: "It's a good quick check on your own content's natural keyword focus, but it doesn't include search volume or competition data — pair it with a dedicated SEO tool for that." },
  ],
};

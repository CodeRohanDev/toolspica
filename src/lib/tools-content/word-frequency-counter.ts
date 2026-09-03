import type { ToolContent } from "./types";

export const wordFrequencyCounterContent: ToolContent = {
  overview: [
    "A word frequency counter breaks a piece of text down into individual words and counts how many times each one appears, then ranks them from most to least common. It's a simple form of text analysis with genuinely useful applications: checking whether an article or product description repeats the same word too often (a common issue in SEO writing, where hitting a keyword naturally is good but overusing it reads as spammy and can trigger over-optimization concerns), spotting filler words and verbal tics in a draft before editing, analyzing survey responses or open-text feedback for recurring themes, or just satisfying curiosity about the vocabulary patterns in a speech, essay, or transcript.",
    "This tool extracts words using a straightforward definition — any run of letters, numbers, or apostrophes counts as one word — and is case-insensitive by default, so \"Product\" and \"product\" are counted together rather than as two separate entries, which is almost always what you want for a genuine frequency analysis rather than a literal string match. Results show the top 30 most frequent words as a ranked list with a bar showing relative frequency, so you can see at a glance not just which words are common but roughly how much more common the top word is compared to the tenth or twentieth.",
    "Two controls refine the analysis. \"Ignore common words\" filters out a standard list of English stopwords — \"the\", \"and\", \"is\", \"of\", and similar function words that appear extremely often in any English text but carry little topical meaning on their own. Without this filter, \"the\" is almost always the single most frequent word in any English passage, which drowns out the more meaningful, topic-specific words you're usually actually interested in. \"Minimum word length\" lets you exclude very short words entirely (like single letters or two-letter words) if they're cluttering results you're trying to focus on longer, more substantive vocabulary.",
    "All analysis happens instantly in your browser as you type or paste, with no length limit — you can run this on anything from a short paragraph to an entire essay or transcript, and the ranked list updates live as you adjust the filters.",
  ],
  howItWorks: [
    {
      title: "Paste your text",
      description: "Drop in an article, essay, transcript, or any block of writing.",
    },
    {
      title: "Adjust the filters",
      description:
        "Toggle common-word filtering and set a minimum word length if you want to focus on more substantial vocabulary.",
    },
    {
      title: "Review the ranked list",
      description:
        "The top 30 words appear instantly, ranked by frequency with a relative-size bar for each.",
    },
  ],
  examples: [
    {
      label: "Short repeated phrase",
      input: "The product is great. This product helps users. Great product, great results.",
      output:
        "With \"Ignore common words\" on — product: 3, great: 3, results: 1, users: 1, helps: 1",
    },
  ],
  faqs: [
    {
      question: "Why is \"the\" always at the top of my results?",
      answer:
        "\"The\" is the single most common word in English writing by a wide margin, so it dominates any raw frequency count. Turn on \"Ignore common words\" to filter out \"the\" and similar stopwords (and, is, of, a, to...) and see the more topically meaningful words instead.",
    },
    {
      question: "Does this count \"run\", \"runs\", and \"running\" as the same word?",
      answer:
        "No — this counter matches exact word forms, so \"run\", \"runs\", and \"running\" are counted as three separate words rather than being grouped under one root word. Grouping different grammatical forms together (called stemming or lemmatization) requires language-specific logic beyond a simple frequency count.",
    },
    {
      question: "Is this useful for checking keyword density for SEO?",
      answer:
        "Yes, as a rough signal — seeing that your target keyword appears far more often than any other meaningful word can indicate you're at risk of keyword stuffing, or conversely that it barely appears at all. It's a starting signal, not a replacement for a dedicated keyword density checker.",
    },
    {
      question: "Why does it only show the top 30 words?",
      answer:
        "For longer texts, the tail of the frequency distribution quickly becomes dozens or hundreds of words that each appear only once or twice, which adds noise without adding insight. The top 30 covers the genuinely meaningful, recurring vocabulary in almost any text.",
    },
    {
      question: "Does punctuation affect the word count?",
      answer:
        "No — punctuation attached to a word (like a period or comma) is stripped before counting, so \"product.\" and \"product,\" and \"product\" are all correctly counted as the same word.",
    },
  ],
};

import type { ToolContent } from "./types";

export const randomSentenceGeneratorContent: ToolContent = {
  heroSubtitle: "Generate Random English Sentences Instantly",
  overview: [
    "Random sentences serve a lot of quiet purposes: typing practice, testing how a UI handles variable-length text, writing prompts, or just a quick example sentence when you need one and don't want to write it yourself.",
    "This tool builds grammatically valid sentences by combining subjects, verbs, objects, and endings from curated word lists, so every result reads as an actual sentence rather than random word soup. Generate one at a time, or five at once for a quick batch.",
    "Because the sentences are assembled from independent word pools rather than pulled from a fixed list of pre-written sentences, the combinations are varied enough that you won't see the same sentence repeatedly, even across many generations.",
    "This is useful for typing tests and practice, filling UI mockups with realistic-looking sentence content, writing prompts to spark an idea, and testing text-processing code against varied, unpredictable input.",
  ],
  howItWorks: [
    {
      title: "Click Generate",
      description: "Produces one random, grammatically valid sentence.",
    },
    {
      title: "Or click Generate five",
      description: "Get a batch of five different sentences at once.",
    },
    {
      title: "Copy the results",
      description: "One click copies whichever sentences are showing.",
    },
  ],
  examples: [
    {
      label: "Generating a typing practice sentence",
      input: "Generate one",
      output: "The curious scientist carefully examined the ancient artifact before sunrise.",
    },
  ],
  faqs: [
    {
      question: "Are these sentences grammatically correct?",
      answer:
        "Yes — each sentence is built from a subject, verb, object, and ending combined in a fixed grammatical structure, so the result always reads as a valid English sentence, even though the specific content is random.",
    },
    {
      question: "Do the sentences make logical sense?",
      answer:
        "Usually, though the combinations are random enough that some pairings can be quirky or unexpected rather than strictly realistic — that's the same trade-off any lightweight sentence generator makes for variety.",
    },
    {
      question: "Can I use this for typing practice?",
      answer:
        "Yes — varied sentence structure and vocabulary make for more useful typing practice than repeating the same fixed paragraph over and over.",
    },
    {
      question: "Will I see the same sentence twice?",
      answer:
        "It's unlikely — sentences are assembled from several independent word pools, so the number of possible combinations is large, making exact repeats rare across normal use.",
    },
    {
      question: "Can I use these sentences as writing prompts?",
      answer:
        "Yes — a randomly generated sentence with an unexpected combination of subject and action can be a genuinely useful spark for freewriting or a short story exercise.",
    },
  ],
};

import type { ToolContent } from "./types";

export const duplicateWordRemoverContent: ToolContent = {
  overview: [
    "Accidentally typing the the same word twice in a row is one of the most common small proofreading errors in writing — it happens easily while editing (moving a sentence around and leaving a leftover duplicate word behind), while typing quickly, or when autocomplete and voice dictation occasionally repeat a word. It's also a surprisingly easy mistake to miss when proofreading your own writing, since your brain tends to read past a doubled word without consciously registering the repetition, the same way you likely read past \"the the\" at the start of this very paragraph.",
    "This tool specifically finds and removes adjacent, back-to-back duplicate words — not just any word that happens to repeat somewhere else in your text (which would be normal, expected repetition in any real writing, like using \"the\" many times throughout a paragraph), but specifically consecutive repeats like \"the the\", \"is is\", or \"very very\" sitting right next to each other, which is virtually always an accidental typo rather than intentional writing.",
    "The \"case-insensitive\" option (on by default) catches a specific pattern that's easy to otherwise miss: a duplicate where the first occurrence starts a sentence and is capitalized, while the accidental repeat isn't — like \"The the report is ready\" — which reads identically to a straightforward lowercase duplicate but wouldn't be caught by a simple exact-match comparison. With this option on, capitalization differences between the two repeated words don't prevent the duplicate from being detected and removed.",
    "When a duplicate is removed, the tool keeps the first occurrence (preserving whatever capitalization it had) and removes the second, and reports exactly how many repeated words were found and removed — useful confirmation when proofreading a longer document where you want to know something was actually caught, not just visually scan the result hoping you didn't miss anything.",
  ],
  howItWorks: [
    {
      title: "Paste your text",
      description: "Drop in a paragraph, essay, or document you want to proofread.",
    },
    {
      title: "Adjacent duplicates are found automatically",
      description: "Words repeated back-to-back, like \"the the\", are detected instantly.",
    },
    {
      title: "Copy the corrected text",
      description: "The cleaned version, with a count of removed duplicates, is ready to copy.",
    },
  ],
  examples: [
    {
      label: "Fixing an accidental double word",
      input: "I think that that is the the right answer.",
      output: "I think that is the right answer.",
    },
  ],
  faqs: [
    {
      question: "Will this remove a word that just naturally repeats elsewhere in my text?",
      answer:
        "No — it only removes words that appear immediately adjacent to each other, back-to-back. A word like \"the\" appearing many times throughout a normal paragraph, in different places, is completely untouched, since that's expected, normal writing rather than a typo.",
    },
    {
      question: "What happens to the capitalization of the remaining word?",
      answer:
        "The first occurrence of the duplicate pair is always kept exactly as typed (preserving its original capitalization), and the second, redundant copy is the one removed — so \"The the report\" correctly becomes \"The report\", not \"the report\".",
    },
    {
      question: "Will it catch \"is is\" but not intentional stutters in dialogue, like \"I I I can't believe it\"?",
      answer:
        "It removes every adjacent repeat it finds, including intentional ones written for stylistic effect (like dialogue depicting a stutter or hesitation) — this tool can't distinguish an intentional literary repetition from an accidental typo, so review the result if your text includes deliberate word repetition for effect.",
    },
    {
      question: "Does punctuation between two words prevent them from being detected as duplicates?",
      answer:
        "Yes — this tool checks for words separated only by whitespace. Two identical words separated by a comma or other punctuation (like \"quick, quick\") aren't treated as an adjacent duplicate, since the punctuation changes the reading and is often intentional (as in the deliberate repetition \"run, run, run\").",
    },
    {
      question: "Can this find duplicate phrases, not just single words?",
      answer:
        "No — it specifically checks for a single word immediately repeating itself. Detecting duplicated multi-word phrases would require different, more complex logic than this focused single-word tool provides.",
    },
  ],
};

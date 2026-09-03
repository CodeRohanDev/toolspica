import type { ToolContent } from "./types";

export const textReverserContent: ToolContent = {
  overview: [
    "A text reverser flips text around according to a rule you choose — reversing every character, shuffling word order back to front, flipping the order of lines, or reversing the letters inside each word while leaving word order intact. It's a niche tool, but it shows up in a handful of very specific, recurring situations: writing a palindrome, creating a mirror-text effect for a design or social post, generating a simple obfuscation for text you don't want casually skimmed, or just satisfying curiosity about what a sentence looks like backwards.",
    "The four modes here solve genuinely different problems. \"Reverse characters\" flips the entire string end to end — this is the classic \"backwards text\" effect, turning \"Hello World\" into \"dlroW olleH\", and it's what most people mean when they say they want to reverse text. \"Reverse word order\" keeps every word spelled normally but flips their sequence, turning \"Hello World\" into \"World Hello\" — useful for testing how a layout or script handles right-to-left word ordering, or just for wordplay. \"Reverse line order\" is aimed at lists and multi-line content: paste in a numbered list, log file, or set of instructions, and get the lines back in the opposite order without touching the text within each line. \"Reverse letters in each word\" is the odd one out and the most fun: it scrambles each individual word's letters (\"Hello World\" becomes \"olleH dlroW\") while keeping the words in their original positions and spaces intact — a common effect used for stylized text or simple visual puzzles.",
    "All four modes are pure string operations that run instantly in your browser as you type or switch modes — there's no server round-trip, so you can experiment freely and see the result update immediately. Because JavaScript strings are sequences of UTF-16 code units, reversing text containing complex emoji (like a family emoji built from several combined characters) can occasionally split those combined characters apart visually; for plain text, numbers, and standard punctuation, all four modes behave exactly as expected.",
  ],
  howItWorks: [
    {
      title: "Enter your text",
      description: "Type or paste the text you want to reverse.",
    },
    {
      title: "Pick a reversal mode",
      description:
        "Choose whether to reverse characters, word order, line order, or the letters inside each word.",
    },
    {
      title: "Copy the result",
      description: "The reversed text updates instantly below — copy it whenever you're ready.",
    },
  ],
  examples: [
    {
      label: "Reverse characters",
      input: "Hello World",
      output: "dlroW olleH",
    },
    {
      label: "Reverse word order",
      input: "The quick brown fox",
      output: "fox brown quick The",
    },
  ],
  faqs: [
    {
      question: "Which mode should I use to check if a phrase is a palindrome?",
      answer:
        "Use \"Reverse characters\" — if the reversed output (ignoring spaces and punctuation, if you're being lenient) matches the original text, it's a palindrome. For example, \"A man a plan a canal Panama\" reverses to essentially the same phrase once spacing is ignored.",
    },
    {
      question: "Does reversing characters also reverse the punctuation position?",
      answer:
        "Yes — character reversal treats punctuation as just another character in the string, so a period at the end of a sentence ends up at the very beginning after reversing, which is expected for a true character-by-character reversal.",
    },
    {
      question: "Why did an emoji look broken after reversing?",
      answer:
        "Some emoji (especially ones combining multiple people, skin tones, or a sequence joined with a zero-width joiner) are actually made of several underlying character codes. A raw character reversal can split those codes apart, since it doesn't know they're meant to be read together as one visual symbol — this affects any character-based text reversal, not just this tool.",
    },
    {
      question: "Can I reverse just one paragraph out of a longer document?",
      answer:
        "Yes — select and copy only the paragraph you want reversed, paste just that portion into the tool, reverse it, then paste the result back into your document in place of the original.",
    },
    {
      question: "Does \"Reverse line order\" also reverse the words within each line?",
      answer:
        "No — it only changes which line comes first, keeping every line's own text exactly as written. If you also want the words or characters within each line reversed, apply a second pass with a different mode.",
    },
  ],
};

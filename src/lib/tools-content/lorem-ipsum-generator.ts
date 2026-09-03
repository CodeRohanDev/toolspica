import type { ToolContent } from "./types";

export const loremIpsumGeneratorContent: ToolContent = {
  overview: [
    "Lorem Ipsum is placeholder text used by designers, developers, and typesetters to fill a layout with realistic-looking body copy before the real content is ready. It's derived (in scrambled, non-literal form) from a passage of Cicero's \"De Finibus Bonorum et Malorum\", written in 45 BC — a fact that surprises most people who've stared at \"lorem ipsum dolor sit amet\" for years without knowing it descends from actual classical Latin. Its value has nothing to do with meaning: because it doesn't read as recognizable, coherent language to most viewers, it doesn't distract from evaluating the actual visual design — font choice, spacing, line length, contrast — the way real, readable sentences inevitably do, since a reader's eye is drawn to the content instead of the layout.",
    "This generator produces Lorem Ipsum text in three units — words, sentences, or full paragraphs — with a count you control, so you can generate exactly \"87 words\" to test a character-limited field, or \"5 paragraphs\" to fill out a blog post mockup. Sentences are built by randomly sampling from the traditional Lorem Ipsum word list and vary in length (roughly 6 to 14 words) so the output doesn't look artificially uniform the way a fixed-length sentence generator would. Paragraphs bundle several sentences together (4 to 7 per paragraph), separated by blank lines, mimicking how real body copy is typically structured.",
    "There's also an option to start the output with the classic, universally recognized opening line — \"Lorem ipsum dolor sit amet, consectetur adipiscing elit.\" — which is useful when you want your placeholder text to be instantly recognizable as placeholder text to anyone reviewing the design (a subtle signal that says \"this copy isn't final\"), versus generating fully randomized filler that might occasionally get mistaken for real content that was pasted in by accident.",
    "Every generation happens instantly in your browser with no server call, so you can regenerate as many times as you like to get a different random sample, and there's no limit on how many words or paragraphs you request — from a single 5-word placeholder for a button label to a 50-paragraph mock article for testing a long-form blog layout.",
  ],
  howItWorks: [
    {
      title: "Choose your unit",
      description: "Pick words, sentences, or paragraphs depending on what you're filling.",
    },
    {
      title: "Set the count",
      description: "Enter how many words, sentences, or paragraphs you need.",
    },
    {
      title: "Generate and copy",
      description:
        "Click Generate for a fresh random sample, then copy it into your design or document.",
    },
  ],
  examples: [
    {
      label: "2 sentences",
      input: "Unit: sentences, Count: 2",
      output:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut labore et dolore magna aliqua enim ad minim veniam quis nostrud.",
    },
  ],
  faqs: [
    {
      question: "Is Lorem Ipsum actually real Latin?",
      answer:
        "It's derived from real classical Latin — a passage from Cicero's 1st-century BC text \"De Finibus Bonorum et Malorum\" — but the words have been altered, rearranged, and in some cases invented, so the result isn't grammatically correct or translatable Latin. It's best thought of as Latin-flavored gibberish rather than an actual passage of text.",
    },
    {
      question: "Why use Lorem Ipsum instead of just typing random letters?",
      answer:
        "Lorem Ipsum has a natural distribution of short and long words and roughly normal letter frequency for a Latin-derived language, which makes it look and behave like real body text when rendered in a design — random letters or repeated characters (\"aaaa bbbb\") don't mimic realistic word lengths and spacing the way Lorem Ipsum does.",
    },
    {
      question: "Will search engines penalize a live page that still has Lorem Ipsum text on it?",
      answer:
        "Yes, effectively — a page with meaningless placeholder text provides no real information to users or to Google, so it won't rank for anything meaningful and can hurt perceived content quality if indexed. Lorem Ipsum should always be replaced with real content before a page goes live and gets crawled.",
    },
    {
      question: "Can I generate a specific number of characters instead of words?",
      answer:
        "Not directly — this tool generates by word, sentence, or paragraph count rather than character count, since character-perfect placeholder text is rarely what layout testing actually needs. Generate slightly more than you need and trim manually if you need an exact character count.",
    },
    {
      question: "Does clicking Generate again give me the same text?",
      answer:
        "No — each click produces a fresh random sample from the Lorem Ipsum word bank, so you'll get different (though similarly structured) placeholder text every time, which is useful for testing how a layout handles varying content lengths.",
    },
  ],
};

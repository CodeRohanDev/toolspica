import type { ToolContent } from "./types";

export const wordCounterContent: ToolContent = {
  overview: [
    "A word counter does exactly what the name suggests: it counts the words in a piece of text, instantly, as you type or paste. It sounds simple, but it's one of the most-used writing tools on the internet, because so many everyday writing tasks come with a word limit attached — a college essay capped at 500 words, a scholarship application capped at 250, a LinkedIn post that reads better under 200, or a press release your editor wants trimmed to a specific length.",
    "This word counter goes beyond a single number. As you type, it tracks word count, total character count, character count with spaces removed, sentence count, paragraph count, and an estimated reading time based on an average adult reading speed of roughly 200 words per minute. That reading-time estimate is particularly useful for bloggers and content writers who want to signal \"a 4 minute read\" at the top of an article, and for speechwriters timing a talk without reading it aloud a dozen times.",
    "Because everything runs locally in your browser using plain JavaScript, there's no upload, no processing delay, and no limit on how much text you can paste — a 50-word tweet draft and a 50,000-word manuscript are counted the same way, instantly. Nothing you type is sent anywhere; the counting happens entirely on your device, which matters if you're working with an unpublished manuscript, a confidential business document, or anything else you'd rather not run through a third-party server.",
    "Word counting isn't as trivial as splitting text on spaces. This tool trims leading and trailing whitespace, treats sequences of whitespace (spaces, tabs, line breaks) as a single separator, and only counts a \"word\" as a contiguous run of non-whitespace characters — so extra spaces between words, blank lines, and trailing newlines don't inflate your count. Sentence counting looks for terminal punctuation (periods, exclamation points, question marks) followed by whitespace or the end of the text, which handles the vast majority of standard prose correctly.",
  ],
  howItWorks: [
    {
      title: "Paste or type your text",
      description:
        "Drop your draft into the text box above. There's no length limit and nothing leaves your browser.",
    },
    {
      title: "Watch the stats update live",
      description:
        "Word count, character count, sentence count, paragraph count, and reading time all recalculate on every keystroke.",
    },
    {
      title: "Copy or clear when you're done",
      description:
        "Use the Copy button to grab your exact text, or Clear to start fresh with a new draft.",
    },
  ],
  examples: [
    {
      label: "Short paragraph",
      input:
        "Toolspica is a free, privacy-first platform of browser-based tools. Paste your own text above to see live word, character, sentence, and paragraph counts, plus an estimated reading time.",
      output: "31 words · 189 characters · 2 sentences · 1 paragraph · 1 min read",
    },
  ],
  faqs: [
    {
      question: "Does this count hyphenated words as one word or two?",
      answer:
        "A hyphenated word like \"well-known\" is counted as a single word, since it's one contiguous run of non-whitespace characters. If you need it split into two words for a specific style guide, remove the hyphen before counting.",
    },
    {
      question: "Why does my sentence count seem off for a list or dialogue-heavy text?",
      answer:
        "Sentence detection looks for a period, exclamation point, or question mark followed by whitespace or the end of the text. Bulleted lists without ending punctuation, abbreviations like \"Dr.\" or \"e.g.\", and dialogue with unusual punctuation can throw off an automated count — this is a known limitation of any purely punctuation-based sentence counter, not just this one.",
    },
    {
      question: "How is reading time calculated?",
      answer:
        "We use 200 words per minute, a commonly cited average adult silent-reading speed for general, non-technical text. Dense technical writing or poetry will typically take longer to read than this estimate suggests.",
    },
    {
      question: "Is there a maximum text length I can paste in?",
      answer:
        "No hard limit — since counting happens in your browser rather than on a server, you can paste in anything from a tweet to an entire book manuscript.",
    },
    {
      question: "Does pasting from Word or Google Docs affect the count?",
      answer:
        "The count is based on the plain text content, so formatting (bold, italics, font) has no effect. If your source document has trailing blank lines or extra paragraph breaks, those can slightly affect the paragraph count, though word and character counts stay accurate.",
    },
  ],
  heroSubtitle: "Count Words, Characters, Sentences & Reading Time",
};

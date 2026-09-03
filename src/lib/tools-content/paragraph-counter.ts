import type { ToolContent } from "./types";

export const paragraphCounterContent: ToolContent = {
  overview: [
    "A paragraph counter measures a piece of writing at the paragraph level rather than the word or sentence level, which is exactly the unit that matters for a surprising number of writing tasks: an assignment that specifies \"write five paragraphs\", a five-paragraph essay structure being taught in a writing class, a blog post being checked for pacing (too few long paragraphs can feel dense; too many short ones can feel choppy), or simply confirming that a document's structure matches what an editor or instructor asked for.",
    "This tool defines a paragraph the way most word processors and writing guides do: a block of text separated from the next block by at least one fully blank line. That means paragraphs don't need to be a single unbroken line of text — a paragraph can wrap across several visual lines and still count as one paragraph, as long as there's no blank line breaking it apart from the next block. This matches how paragraphs actually work in real documents, where a single paragraph is often several lines long once it wraps at a normal page or screen width.",
    "Beyond the paragraph count itself, the tool reports the total word count across all paragraphs and the average number of words per paragraph — a genuinely useful pacing signal. A very high average can indicate paragraphs that have grown too dense and could benefit from being split for readability; a very low average across many short paragraphs can signal choppy, underdeveloped writing that might read better if some paragraphs were combined or expanded.",
    "All counting happens instantly in your browser as you type or paste, with no length limit, so it works equally well checking a short five-paragraph essay assignment or analyzing the paragraph structure of an entire article or chapter.",
  ],
  howItWorks: [
    {
      title: "Paste your writing",
      description: "Drop in an essay, article, or any text with paragraphs separated by blank lines.",
    },
    {
      title: "Read the breakdown",
      description: "Paragraph count, total words, and average words per paragraph update instantly.",
    },
  ],
  examples: [
    {
      label: "Two short paragraphs",
      input: "This is the first paragraph with six words.\n\nThis is the second one, also short.",
      output: "2 paragraphs · 15 total words · 8 avg words / paragraph",
    },
  ],
  faqs: [
    {
      question: "What exactly counts as a paragraph break?",
      answer:
        "A paragraph break is at least one completely blank line (no characters, or only whitespace) separating two blocks of text. A single line break within a block of text — like a line that wraps naturally — does not create a new paragraph on its own.",
    },
    {
      question: "Why does my count seem low when I have many separate lines?",
      answer:
        "If your text has line breaks but no blank lines between them, those lines are treated as a single paragraph, since there's no blank-line separator between them. Add a blank line between sections if you want them counted as separate paragraphs.",
    },
    {
      question: "Does a single-sentence paragraph still count as a full paragraph?",
      answer:
        "Yes — paragraph length isn't a factor in the count. Any block of text separated from its neighbors by a blank line counts as one paragraph, whether it's a single short sentence or several long, wrapped sentences.",
    },
    {
      question: "Is the average words-per-paragraph a good measure of readability on its own?",
      answer:
        "It's a useful rough signal, not a definitive measure — general writing advice often suggests keeping most paragraphs in a readable range (commonly cited as roughly 50-150 words for web content), but the right length always depends on context, audience, and the specific point being made.",
    },
    {
      question: "Does this work for essays copied from Google Docs or Word?",
      answer:
        "Yes — as long as the paragraph breaks (blank lines) are preserved when you paste the text in, which is normally the case when copying and pasting plain text from either program.",
    },
  ],
};

import type { ToolContent } from "./types";

export const whitespaceRemoverContent: ToolContent = {
  overview: [
    "Whitespace Remover strips out invisible spacing characters from text entirely, rather than just tidying them up — a different, more aggressive job than a spacing cleanup tool. \"Remove all whitespace\" deletes every space, tab, and line break in the text, collapsing it into one single unbroken string with no gaps at all. This is genuinely useful in specific, recurring situations: preparing text for a cipher or encoding scheme that shouldn't include spaces, checking whether two strings are identical except for spacing, generating a compact identifier or key from a phrase, or removing whitespace from something like a credit card number, phone number, or code that was pasted in with accidental spaces or line breaks mixed in.",
    "\"Remove line breaks only\" is a more targeted second mode: it strips out just the newline characters while leaving all the actual spaces between words intact, joining everything into a single continuous line without merging words together. This is the mode to use when you specifically need multi-line text collapsed into one paragraph or one long line — for example, preparing text for a system that only accepts single-line input, or joining a list of short phrases into one comma-or-space-separated line for a different format.",
    "It's worth being clear about what this tool intentionally does that a gentler cleanup tool wouldn't: removing all whitespace will run every word together with no separation at all (\"hello world\" becomes \"helloworld\"), which is rarely what you want for normal readable prose. If you're trying to fix messy or doubled-up spacing while keeping text readable, the Remove Extra Spaces or Text Cleaner tools are the better fit — this tool is specifically for the less common case where you want spacing gone entirely, not just tidied.",
    "The tool reports exactly how many whitespace characters were removed, so you have a clear, quantified view of the change even when the resulting compact string makes it hard to tell at a glance how much was actually stripped out.",
  ],
  howItWorks: [
    {
      title: "Paste your text",
      description: "Enter the text you want whitespace stripped from.",
    },
    {
      title: "Choose a mode",
      description:
        "\"Remove all whitespace\" strips everything; \"Remove line breaks only\" keeps spaces between words.",
    },
    {
      title: "Copy the result",
      description: "The stripped text and a count of removed characters appear instantly.",
    },
  ],
  examples: [
    {
      label: "Remove all whitespace",
      input: "Hello   World\nSecond Line",
      output: "HelloWorldSecondLine",
    },
    {
      label: "Remove line breaks only",
      input: "Hello World\nSecond Line",
      output: "Hello WorldSecond Line",
    },
  ],
  faqs: [
    {
      question: "Will \"Remove all whitespace\" merge my words together?",
      answer:
        "Yes, by design — this mode removes every space, tab, and line break, so \"hello world\" becomes \"helloworld\" with no separator at all. If you want to keep words separated by a single space while just cleaning up messy spacing, use Remove Extra Spaces instead.",
    },
    {
      question: "What's the difference between the two modes?",
      answer:
        "\"Remove all whitespace\" strips spaces, tabs, and line breaks — everything. \"Remove line breaks only\" strips just the newline characters, keeping the actual spaces between words intact, so words stay readable but multiple lines get joined into one.",
    },
    {
      question: "Can I use this to clean a pasted phone number or card number?",
      answer:
        "Yes — \"Remove all whitespace\" is well suited to this, stripping out stray spaces from a number that was formatted with visual grouping (like \"1234 5678 9012\") to leave a single continuous digit string.",
    },
    {
      question: "Does this remove whitespace from inside words, like a stray space typo?",
      answer:
        "It removes ALL whitespace characters wherever they appear in the text, including an accidental space in the middle of what should be one word — it doesn't distinguish between \"intentional\" and \"accidental\" spacing.",
    },
    {
      question: "Is this reversible?",
      answer:
        "No — once whitespace is removed, the original spacing and line structure can't be automatically restored, since there's no record of where the spaces used to be. Keep a copy of your original text if you might need it back in its original form.",
    },
  ],
};

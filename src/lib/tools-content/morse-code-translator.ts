import type { ToolContent } from "./types";

export const morseCodeTranslatorContent: ToolContent = {
  overview: [
    "Morse code represents letters, digits, and a handful of punctuation marks as sequences of short and long signals — traditionally called dots and dashes. Developed in the 1830s and 1840s alongside the electrical telegraph, it was, for the better part of a century, the primary way humans sent messages faster than a horse could carry them, and it remained the international standard for maritime distress signals (most famously SOS: three dots, three dashes, three dots) until 1999.",
    "This translator converts in both directions. \"Text → Morse\" takes ordinary text and outputs the corresponding dots and dashes, with a single space separating the Morse pattern for each letter and a forward slash ( / ) separating words — this slash convention is the standard way to represent word boundaries in written Morse code, since Morse itself has no letter for a literal space. \"Morse → Text\" reverses the process, reading dot-and-dash groups back into readable letters and numbers.",
    "The supported character set covers the full International Morse Code standard: all 26 letters, all 10 digits, and common punctuation including periods, commas, question marks, and a handful of other symbols. Each letter's code length roughly correlates with how often that letter appears in English — E (the most common letter) is just a single dot, while less common letters like Q and Z use longer four-symbol sequences — a design choice made deliberately by Samuel Morse to make the most frequently sent messages as fast as possible to transmit by hand.",
    "Morse code today is mostly a hobbyist and educational pursuit — amateur (ham) radio operators still use it because a Morse signal can be understood at extremely low signal strength where voice communication would be unintelligible, Scouting organizations teach it as a traditional skill, and it shows up regularly in movies, puzzles, and escape rooms as an accessible \"secret code\" that a curious person can look up and learn on their own.",
  ],
  howItWorks: [
    {
      title: "Choose a direction",
      description: "Pick Text → Morse or Morse → Text depending on what you're converting.",
    },
    {
      title: "Enter your input",
      description:
        "Type plain text, or Morse code using dots, dashes, spaces between letters, and / between words.",
    },
    {
      title: "Copy the translation",
      description: "The converted result updates instantly below.",
    },
  ],
  examples: [
    {
      label: "Text to Morse",
      input: "SOS HELP",
      output: "... --- ... / .... . .-.. .--.",
    },
    {
      label: "Morse to text",
      input: ".... . .-.. .-.. --- / .-- --- .-. .-.. -..",
      output: "HELLO WORLD",
    },
  ],
  faqs: [
    {
      question: "How do I represent a space between words in Morse code?",
      answer:
        "Use a forward slash ( / ) surrounded by spaces between words — this is the standard convention this tool uses both when generating Morse and when reading it back, since Morse code itself has no dedicated \"space\" signal.",
    },
    {
      question: "Does case matter when converting text to Morse?",
      answer:
        "No — Morse code doesn't distinguish between uppercase and lowercase letters, so \"Hello\" and \"HELLO\" both produce identical Morse output. When decoding Morse back to text, the result is always shown in uppercase.",
    },
    {
      question: "What happens if my Morse input has a typo, like an extra dot?",
      answer:
        "A dot-and-dash group that doesn't match any known letter or number in the standard code table won't be recognized, and that character will be silently dropped from the decoded output rather than guessed at — double-check your dots, dashes, and spacing against the standard Morse alphabet if a decoded word looks wrong or incomplete.",
    },
    {
      question: "Can I convert full sentences with punctuation?",
      answer:
        "Yes — this tool supports periods, commas, question marks, apostrophes, exclamation points, parentheses, and several other common punctuation marks defined in the International Morse Code standard, in addition to all letters and digits.",
    },
    {
      question: "Why is SOS three dots, three dashes, three dots?",
      answer:
        "SOS was chosen as the international distress signal in 1906 specifically because its pattern (... --- ...) is simple, unmistakable, and easy to send and recognize even under stress or poor signal conditions — not because it stands for any particular phrase (the popular \"Save Our Ship\" or \"Save Our Souls\" are backronyms invented after the fact).",
    },
  ],
};

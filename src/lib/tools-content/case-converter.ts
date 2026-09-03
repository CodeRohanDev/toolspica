import type { ToolContent } from "./types";

export const caseConverterContent: ToolContent = {
  overview: [
    "A case converter rewrites text into a different letter-casing style without changing the words themselves. It's a small utility that quietly saves a lot of manual retyping: fixing text that got stuck in CAPS LOCK, converting a headline into Title Case for a style guide, or turning a phrase into camelCase or snake_case for use as a variable name in code.",
    "This tool supports nine casing styles in one place. UPPERCASE and lowercase are the simplest — every letter forced one way or the other. Title Case capitalizes the first letter of each word, the convention used for headlines and book titles. Sentence case capitalizes only the first letter of each sentence, the normal casing for regular prose, which is useful for cleaning up text that was typed entirely in lowercase or entirely in caps.",
    "The remaining four are aimed squarely at developers naming things. camelCase (lowercase first word, capitalized subsequent words, no spaces) and PascalCase (every word capitalized, no spaces) are the two dominant conventions for variable, function, and class names across JavaScript, Java, C#, and most modern languages. snake_case (all lowercase, words joined by underscores) is the standard in Python, Ruby, and most database column names. kebab-case (all lowercase, words joined by hyphens) is everywhere in URLs, CSS class names, and command-line flags. Converting a plain-English phrase into any of these by hand means remembering the exact capitalization and separator rules each time — this tool applies them consistently in one click.",
    "There's also aLtErNaTiNg CaSe, alternating upper and lower case letter by letter, which is mostly used for sarcastic emphasis online (sometimes called \"mocking case\" or \"spongebob case\") rather than any formal writing convention — included here because it's genuinely one of the more commonly requested case conversions. Every conversion runs instantly in your browser as plain JavaScript string manipulation; nothing is sent anywhere, and you can convert as much text as you like.",
  ],
  howItWorks: [
    {
      title: "Enter your text",
      description: "Type or paste the text you want to convert into the box above.",
    },
    {
      title: "Pick a case style",
      description:
        "Click any of the nine case buttons — UPPERCASE, Title Case, camelCase, snake_case, and more.",
    },
    {
      title: "Copy the result",
      description:
        "The converted text appears below instantly. Use the Copy button to grab it, or pick a different case to try again.",
    },
  ],
  examples: [
    {
      label: "Converting a phrase",
      input: "the quick brown fox",
      output:
        "UPPERCASE: THE QUICK BROWN FOX\nTitle Case: The Quick Brown Fox\ncamelCase: theQuickBrownFox\nPascalCase: TheQuickBrownFox\nsnake_case: the_quick_brown_fox\nkebab-case: the-quick-brown-fox",
    },
  ],
  faqs: [
    {
      question: "What's the actual difference between camelCase and PascalCase?",
      answer:
        "Both remove spaces and capitalize the start of each word after the first. camelCase keeps the very first letter lowercase (theQuickFox), which is the convention for variable and function names in JavaScript and Java. PascalCase capitalizes the first letter too (TheQuickFox), which is the convention for class and component names.",
    },
    {
      question: "How does Sentence case handle abbreviations or multiple sentences?",
      answer:
        "It capitalizes the first letter of the text and the first letter following any period, exclamation point, or question mark. Like any automated sentence-case converter, it can occasionally mis-capitalize after an abbreviation (like \"Dr.\" or \"e.g.\") since it can't tell the difference between an abbreviation's period and a true sentence break — worth a quick manual check for text with a lot of abbreviations.",
    },
    {
      question: "Will Title Case correctly skip small words like \"a\" or \"the\"?",
      answer:
        "No — this converter capitalizes every word for simplicity and predictability, rather than trying to guess which short words a specific style guide (AP, Chicago, APA) would leave lowercase. If you need style-guide-accurate title casing, capitalize the exceptions manually after converting.",
    },
    {
      question: "Can I convert snake_case or kebab-case back into normal words?",
      answer:
        "Yes — paste text that already contains underscores or hyphens and pick any other case; the tool splits on underscores, hyphens, and capital-letter boundaries before reapplying the target case, so converting `user_first_name` to Title Case correctly produces \"User First Name\".",
    },
    {
      question: "Does this work on multiple lines or a whole paragraph at once?",
      answer:
        "Yes, all nine conversions apply to the entire contents of the text box, including line breaks, so you can convert a full paragraph or a multi-line list in one click rather than one word at a time.",
    },
  ],
};

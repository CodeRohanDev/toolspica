import type { ToolContent } from "./types";

export const passphraseGeneratorContent: ToolContent = {
  heroSubtitle: "Generate Memorable, Random Word-Based Passphrases",
  overview: [
    "A passphrase — several random words strung together — trades password complexity for length, and length is what actually matters most for resisting brute-force guessing. A passphrase of several unrelated random words is both easier to remember and mathematically harder to crack than a shorter string of random symbols, provided the words are genuinely randomly chosen rather than a memorable phrase you made up yourself.",
    "This tool generates passphrases by randomly selecting words from a curated list of nearly 2,000 common English words, giving each word roughly 11 bits of entropy. Choose how many words to include, the separator between them, whether to capitalize each word, and whether to append a random two-digit number — all of which affect the total entropy shown alongside the result.",
    "The entropy estimate is calculated honestly from this tool's actual wordlist size, not borrowed from a larger reference list like the well-known 7,776-word EFF Diceware list. A 5-word passphrase from this list carries roughly 55 bits of entropy — strong enough for most personal use, though a dedicated password manager with fully random character-based passwords remains the strongest option for high-value accounts.",
    "This is useful for creating a memorable master password for a password manager (one you'll actually need to type from memory), generating passphrases for encryption keys or Wi-Fi networks, and any situation where a random-but-memorable passphrase beats a random string of symbols nobody could ever recall.",
  ],
  howItWorks: [
    {
      title: "Choose the number of words",
      description: "3 to 10 words; more words means more entropy.",
    },
    {
      title: "Customize separator and formatting",
      description: "Set a separator, optionally capitalize words, and add a random number.",
    },
    {
      title: "Generate and copy",
      description: "A fresh random passphrase appears instantly, with its entropy shown.",
    },
  ],
  examples: [
    {
      label: "Generating a 5-word passphrase",
      input: "5 words, hyphen separator, number appended",
      output: "harbor-quartz-meadow-compass-lantern-47",
    },
  ],
  faqs: [
    {
      question: "Is a word-based passphrase actually as secure as a random password?",
      answer:
        "It depends on the word count and list size — a 5-word passphrase from this tool's ~2,000-word list carries about 55 bits of entropy, comparable to a solidly random 9-10 character password using all character types. Adding more words closes the gap further, and passphrases have the real advantage of being far easier to type and remember correctly.",
    },
    {
      question: "Why isn't this the official EFF Diceware wordlist?",
      answer:
        "The EFF Diceware list has exactly 7,776 words (mapped to 5 dice rolls) for a specific, well-documented entropy-per-word calculation. This tool uses its own curated list of common, easy-to-recognize words instead, and calculates entropy honestly based on this list's actual size — never overstating it by borrowing a different list's numbers.",
    },
    {
      question: "Should I make up my own memorable phrase instead of using random words?",
      answer:
        "No — a phrase you compose yourself (like a favorite quote or song lyric) is guessable through dictionary and pattern-based attacks, since human-generated 'random' choices aren't actually random. The security of a passphrase comes specifically from each word being an unpredictable, independent random selection, which only a proper random generator can guarantee.",
    },
    {
      question: "Does adding a number at the end meaningfully help?",
      answer:
        "Yes, a little — appending a random two-digit number adds a modest amount of extra entropy (about 6.6 bits) and also helps satisfy sites that require a password to contain a digit, without significantly hurting memorability.",
    },
    {
      question: "Why capitalize words instead of leaving everything lowercase?",
      answer:
        "It's purely for satisfying character-variety requirements some sites enforce (requiring at least one uppercase letter) — capitalizing every word doesn't meaningfully add entropy on its own, since the position of capitalization is predictable, but it does help the passphrase pass basic complexity rules.",
    },
  ],
};

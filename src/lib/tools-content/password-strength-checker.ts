import type { ToolContent } from "./types";

export const passwordStrengthCheckerContent: ToolContent = {
  heroSubtitle: "Check How Strong Your Password Really Is",
  overview: [
    "Password strength meters built into signup forms are often shallow, checking only for length and a mix of character types without catching the patterns real attackers actually exploit — common leaked passwords, keyboard sequences, and repeated characters that dramatically weaken a password even when it technically satisfies every complexity rule.",
    "This tool checks a password against several real weaknesses at once: raw entropy (based on length and character variety), whether it matches one of the most commonly leaked passwords ever recorded, whether it contains a keyboard or alphabetic sequence (like \"qwerty\" or \"abc\"), and whether it has three or more repeated characters in a row — all well-documented patterns that make a password meaningfully easier to guess.",
    "The entropy calculation estimates how many possible passwords could exist given the password's length and which character types it uses — a rough but genuinely informative measure of brute-force resistance. A password can have decent raw entropy and still score poorly here if it matches a known-leaked password or contains an obvious pattern, since real attackers try those first, long before resorting to true brute force.",
    "This is useful for checking a new password before committing to it, understanding specifically why a password is considered weak (not just that it is), improving password habits, and building intuition for what actually makes a password hard to crack versus what merely satisfies an arbitrary complexity rule.",
  ],
  howItWorks: [
    {
      title: "Type a password",
      description: "Checked entirely in your browser as you type — nothing is sent anywhere.",
    },
    {
      title: "See the strength meter and score",
      description: "From very weak to very strong, with the estimated entropy in bits.",
    },
    {
      title: "Review specific issues",
      description: "Concrete reasons the password is weaker than it could be.",
    },
  ],
  examples: [
    {
      label: "Checking a weak, common password",
      input: '"password1"',
      output: "Very weak — matches a commonly leaked password",
    },
  ],
  faqs: [
    {
      question: "Is my password sent anywhere when I check it here?",
      answer:
        "No — the entire check runs locally in your browser using client-side JavaScript. Your password is never transmitted to a server, logged, or stored anywhere, which matters given you're typing an actual password into the field.",
    },
    {
      question: "Why did a password with numbers, symbols, and mixed case still score poorly?",
      answer:
        "Meeting basic complexity rules doesn't protect against a password matching a known leaked password or containing an obvious sequence — attackers check leaked-password lists and common patterns before attempting true brute force, so those specific weaknesses matter more than raw character variety alone.",
    },
    {
      question: "What counts as a 'keyboard sequence'?",
      answer:
        "Consecutive characters that are either alphabetically sequential (like \"abc\" or \"xyz\") or adjacent on a standard keyboard layout (like \"qwerty\" or \"asdf\") — both are common patterns people fall back on that are far more guessable than they feel, since attackers specifically test for them.",
    },
    {
      question: "How is the entropy in bits actually calculated?",
      answer:
        "It's based on the password's length and which character categories it uses (lowercase, uppercase, numbers, symbols) — each additional bit of entropy doubles the number of possible passwords an attacker would need to try in a worst-case brute-force scenario, making it a useful, standardized strength comparison.",
    },
    {
      question: "What should I do if my password scores as weak?",
      answer:
        "Generate a new one rather than trying to patch the existing password with a tweak (adding a number at the end doesn't fix an underlying weak pattern) — this site's Password Generator tool creates genuinely random, high-entropy passwords instantly for exactly this situation.",
    },
  ],
};

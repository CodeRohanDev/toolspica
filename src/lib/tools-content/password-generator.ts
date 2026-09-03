import type { ToolContent } from "./types";

export const passwordGeneratorContent: ToolContent = {
  heroSubtitle: "Generate Strong, Random Passwords Instantly",
  overview: [
    "Reused or predictable passwords are the single biggest factor behind account takeovers — once one leaked password is tested against other sites, every account sharing it becomes vulnerable too. A strong, unique password per account is the simplest defense, but coming up with genuinely random ones by hand is exactly the kind of task humans are bad at, since our brains gravitate toward patterns.",
    "This tool generates cryptographically random passwords using your browser's built-in secure random number generator (`crypto.getRandomValues`), never `Math.random()`, which isn't suitable for security purposes. Adjust the length from 6 to 64 characters, and toggle uppercase letters, numbers, and symbols on or off to match whatever a specific site's password rules require.",
    "The entropy estimate shown alongside each password reflects the actual mathematical randomness of the result — how many possible passwords could have been generated with the same settings — which is a more meaningful strength measure than arbitrary rules like 'must contain a number.' Higher entropy means a password is harder to guess through brute force, regardless of what specific characters it happens to contain.",
    "This is useful for creating a new account password, replacing a weak or reused password flagged by a password manager's security check, generating a passphrase for sensitive systems, and general password hygiene — the strongest approach remains a unique, randomly generated password per account, stored in a password manager.",
  ],
  howItWorks: [
    {
      title: "Adjust length and character types",
      description: "Length from 6-64 characters; toggle uppercase, numbers, and symbols.",
    },
    {
      title: "A password generates automatically",
      description: "Using your browser's cryptographically secure random generator.",
    },
    {
      title: "Copy and use it",
      description: "Store it immediately in a password manager — nothing is saved here.",
    },
  ],
  examples: [
    {
      label: "Generating a 16-character password with all character types",
      input: "Length 16, uppercase + numbers + symbols on",
      output: "kX7#mQ2$pL9!vR4@",
    },
  ],
  faqs: [
    {
      question: "Why does this matter more than just using Math.random() in JavaScript?",
      answer:
        "Math.random() is a fast, general-purpose random number generator not designed to resist prediction — in principle, its internal state can potentially be inferred from enough outputs. This tool uses crypto.getRandomValues() instead, the Web Crypto API's cryptographically secure random source, which is the correct tool for anything security-sensitive like password generation.",
    },
    {
      question: "Should I exclude ambiguous characters like l, I, 1, O, and 0?",
      answer:
        "Only if you'll need to type the password manually somewhere — those characters look alike in many fonts and can cause typos. If you're storing it in a password manager and copy-pasting it, there's no downside to leaving them in, since you'll never need to read and retype them.",
    },
    {
      question: "Is a longer password always better than a more complex one?",
      answer:
        "Length generally matters more than complexity for resisting brute-force attacks — a 20-character password using only lowercase letters can have more possible combinations than a 10-character password using every character type. That said, most sites require a mix of character types, so this tool defaults to both length and variety.",
    },
    {
      question: "Does this tool store or transmit the passwords it generates?",
      answer:
        "No — every password is generated locally in your browser using client-side JavaScript and is never sent to any server. Closing or refreshing the page discards it completely, so save it somewhere (like a password manager) before navigating away.",
    },
    {
      question: "What does the entropy number actually mean?",
      answer:
        "It's the number of bits of randomness in the password — each additional bit doubles the number of possible passwords an attacker would need to try. Above roughly 60-70 bits, brute-forcing the password becomes computationally infeasible with current technology, which is why the tool flags passwords in that range as very strong.",
    },
  ],
};

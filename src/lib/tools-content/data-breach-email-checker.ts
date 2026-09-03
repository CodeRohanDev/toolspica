import type { ToolContent } from "./types";

export const dataBreachEmailCheckerContent: ToolContent = {
  heroSubtitle: "Check if a Password Has Appeared in a Known Data Breach",
  overview: [
    "This tool checks passwords, not email addresses, against Have I Been Pwned's Pwned Passwords database of over 800 million passwords found in real data breaches. Checking whether a specific email address has been breached requires HIBP's paid API, but their password-checking API remains genuinely free and open to everyone — and arguably more actionable anyway, since it tells you directly whether a password you're considering is already known to attackers.",
    "The check uses a clever privacy technique called k-anonymity: your password is hashed with SHA-1 entirely in your browser, and only the first 5 characters of that hash are sent to Have I Been Pwned's API. The service returns every breached password hash that starts with those same 5 characters (typically several hundred), and the actual matching happens locally in your browser — meaning your real password, and even its full hash, is never transmitted anywhere.",
    "A password appearing in this database means it has been exposed in at least one real, documented data breach and is now part of lists attackers actively use for credential-stuffing attacks (trying leaked passwords against other accounts). Even a password that feels unique to you may well be in this database, since many people independently choose the same common passwords.",
    "This is useful for checking a password before using it on a new account, auditing existing passwords for known exposure, understanding why a security team might flag a password as compromised even though it was never directly hacked from your own account, and general password hygiene.",
  ],
  howItWorks: [
    {
      title: "Type a password",
      description: "It's hashed locally in your browser — never sent in plain text.",
    },
    {
      title: "Only a hash prefix is checked",
      description: "The first 5 characters of the SHA-1 hash are sent; the rest stays local.",
    },
    {
      title: "See the result",
      description: "Whether the password appears in known breaches, and how many times.",
    },
  ],
  examples: [
    {
      label: "Checking a common weak password",
      input: '"password"',
      output: "Found in 52,372,427 known data breaches — do not use this password",
    },
  ],
  faqs: [
    {
      question: "Does this send my actual password to a server?",
      answer:
        "No — your password is hashed with SHA-1 entirely inside your browser, and only the first 5 characters of that resulting hash are sent to the API. That's not enough information to reconstruct your password or even identify which exact hash matched, which is the entire point of the k-anonymity technique.",
    },
    {
      question: "Why does this check a password instead of an email address?",
      answer:
        "Have I Been Pwned's breach-by-email lookup now requires a paid API key, while their Pwned Passwords database remains genuinely free with no key required. Checking a password is arguably more directly useful anyway — it tells you immediately whether that specific password is unsafe to use, regardless of which breach it came from.",
    },
    {
      question: "My password isn't in the database — does that mean it's strong?",
      answer:
        "Not necessarily — it only means this exact password hasn't appeared in a breach that's been added to this database yet. A never-breached password can still be weak if it's short, predictable, or easily guessed; pair this check with the Password Strength Checker tool for a fuller picture.",
    },
    {
      question: "What should I do if my password shows up as breached?",
      answer:
        "Stop using it immediately, especially anywhere you haven't already changed it, and generate a fresh, unique, randomly generated password instead (this site's Password Generator tool works well for that). If you've reused that same password anywhere else, change it there too.",
    },
    {
      question: "How does Have I Been Pwned get this data?",
      answer:
        "The Pwned Passwords database aggregates passwords found in publicly known data breaches that have already been exposed and are circulating among attackers — it's a defensive tool built specifically to help people avoid reusing passwords that are already compromised, not a database of anyone's private data.",
    },
  ],
};

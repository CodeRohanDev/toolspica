import type { ToolContent } from "./types";

export const twoFactorBackupCodeGeneratorContent: ToolContent = {
  heroSubtitle: "Generate Random 2FA Backup Codes",
  overview: [
    "Two-factor authentication protects an account well, but it introduces a new failure mode: what happens if you lose the phone running your authenticator app? Every major platform solves this the same way — a set of one-time backup codes generated when 2FA is set up, each usable exactly once to regain access if your normal second factor is unavailable.",
    "This tool generates a batch of random backup-style codes formatted the same way most platforms present them — groups of characters separated by a hyphen, drawn from an alphabet that deliberately excludes visually ambiguous characters (0, O, 1, I) so codes are easy to read and type correctly by hand if needed.",
    "These are demonstration-format codes for testing, learning, or building your own backup-code system — they are not actually linked to any real account's two-factor setup, since generating real functioning backup codes requires the actual service's own account settings page, where they're generated and stored server-side against your specific account.",
    "This is useful for developers building a two-factor authentication system who need realistic-looking sample codes for a UI, understanding what a typical backup code format looks like, testing how an application displays or validates backup codes, and general 2FA UX and security education.",
  ],
  howItWorks: [
    {
      title: "Choose how many codes",
      description: "From 1 up to 20 codes.",
    },
    {
      title: "Click Generate",
      description: "Random codes are drawn from a clear, unambiguous character set.",
    },
    {
      title: "Copy them all",
      description: "Store them exactly as you would real backup codes — safely and privately.",
    },
  ],
  examples: [
    {
      label: "Generating a set of 10 backup codes",
      input: "Count: 10",
      output: "M3XK-9DQP, T7RH-2NVZ, ... (8 more)",
    },
  ],
  faqs: [
    {
      question: "Can I use these codes to actually recover my real account?",
      answer:
        "No — these are demonstration codes generated locally in your browser, not linked to any real account's two-factor authentication setup. Real backup codes must be generated through the specific service's own account security settings, where the service stores them to validate against later.",
    },
    {
      question: "Why do backup codes exclude characters like 0, O, 1, and I?",
      answer:
        "Those characters are easy to visually confuse with each other in many fonts, especially if a code needs to be read from a printed sheet or typed manually during a stressful account-recovery moment. Excluding them reduces transcription errors exactly when accuracy matters most.",
    },
    {
      question: "How should real backup codes be stored?",
      answer:
        "Somewhere safe and separate from the device they're meant to back up — a password manager's secure notes feature, or a printed copy kept in a physical safe, are both standard recommendations. Storing them in an easily accessible plain text file defeats their security purpose.",
    },
    {
      question: "What happens after a backup code is used once?",
      answer:
        "On real systems, each backup code is invalidated immediately after first use, exactly like a one-time password — this is why services provide a batch of several codes rather than one reusable code, so you have more than one recovery attempt available.",
    },
    {
      question: "Why is the format hyphenated groups of characters?",
      answer:
        "Splitting a code into short groups (like XXXX-XXXX) makes it significantly easier to read accurately and type correctly than one long unbroken string — this is a standard formatting convention across most services that issue this kind of code.",
    },
  ],
};

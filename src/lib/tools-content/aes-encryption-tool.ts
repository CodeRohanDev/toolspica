import type { ToolContent } from "./types";

export const aesEncryptionToolContent: ToolContent = {
  heroSubtitle: "Encrypt Text with AES-256-GCM in Your Browser",
  overview: [
    "AES (Advanced Encryption Standard) is the industry-standard symmetric encryption algorithm — the same encryption used to protect classified government data, secure HTTPS connections, and encrypt files across virtually every major operating system. 'Symmetric' means the same passphrase used to encrypt is also used to decrypt, unlike public-key systems that use separate keys for each direction.",
    "This tool encrypts text using AES-256 in GCM mode (Galois/Counter Mode), a modern authenticated encryption mode that protects against tampering, not just eavesdropping — if the encrypted data is altered even slightly, decryption fails cleanly instead of silently returning corrupted garbage. Your passphrase is never used directly as the encryption key; it's run through PBKDF2 (250,000 iterations) first, which makes brute-forcing the passphrase itself dramatically slower for an attacker.",
    "Every encryption operation runs entirely in your browser using the Web Crypto API — the same standardized, browser-vendor-audited cryptographic implementation used across the web platform, not a custom reimplementation. Your plaintext and passphrase are never transmitted anywhere; only you control both.",
    "This is useful for encrypting sensitive text before storing it somewhere less trusted (a shared document, a notes app, a support ticket), sharing a secret with someone else via a separate secure channel for the passphrase, learning how authenticated encryption works hands-on, and any situation needing genuine client-side encryption without installing software.",
  ],
  howItWorks: [
    {
      title: "Enter the text to encrypt",
      description: "Any text — a message, a note, sensitive data.",
    },
    {
      title: "Choose a strong passphrase",
      description: "Run through PBKDF2 with 250,000 iterations to derive the actual encryption key.",
    },
    {
      title: "Encrypt and share the result",
      description: "Share the encrypted text and passphrase through separate channels.",
    },
  ],
  examples: [
    {
      label: "Encrypting a short message",
      input: 'Text: "meet at noon", Passphrase: "correct horse battery staple"',
      output: "A Base64-encoded encrypted string, different every time even with the same input",
    },
  ],
  faqs: [
    {
      question: "Why does encrypting the same text twice produce different results?",
      answer:
        "Each encryption generates a fresh random salt and initialization vector (IV), both packed into the output alongside the ciphertext. This is deliberate and important — reusing the same salt/IV across encryptions with GCM mode would weaken its security guarantees, so varying them every time is the correct, secure behavior, not a bug.",
    },
    {
      question: "What happens if I lose the passphrase?",
      answer:
        "The encrypted text becomes permanently unrecoverable — there is no backdoor, master key, or reset mechanism, by design. AES-GCM with a properly random passphrase is specifically meant to be infeasible to break without the correct passphrase, so losing it means losing the data.",
    },
    {
      question: "Is it safe to send the encrypted text and passphrase in the same message?",
      answer:
        "No — that defeats the entire purpose of encrypting in the first place. Send the encrypted text through one channel (email, a shared doc) and the passphrase through a separate channel (a phone call, a different messaging app) so intercepting one alone doesn't compromise the message.",
    },
    {
      question: "Why use PBKDF2 instead of using my passphrase directly as the key?",
      answer:
        "A human-chosen passphrase has far less randomness than a proper 256-bit encryption key, making it more vulnerable to guessing. PBKDF2 with a high iteration count (250,000 here) deliberately slows down each guess attempt, making brute-forcing the passphrase computationally expensive even if an attacker has the encrypted data.",
    },
    {
      question: "Does anything ever get sent to a server during encryption?",
      answer:
        "No — every step (key derivation, encryption) happens locally in your browser using the Web Crypto API. Your plaintext, passphrase, and even the encrypted result are never transmitted anywhere unless you choose to copy and share them yourself.",
    },
  ],
};

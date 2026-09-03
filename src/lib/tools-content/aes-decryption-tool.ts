import type { ToolContent } from "./types";

export const aesDecryptionToolContent: ToolContent = {
  heroSubtitle: "Decrypt AES-256-GCM Encrypted Text",
  overview: [
    "This is the companion tool to the AES Encryption Tool — paste the Base64-encoded encrypted text along with the exact passphrase used to encrypt it, and the original plaintext is recovered instantly, entirely inside your browser.",
    "Because the encryption uses AES-256 in GCM mode (authenticated encryption), decryption doesn't just reverse the cipher — it also verifies the data hasn't been tampered with or corrupted along the way. If the passphrase is wrong, or the encrypted text has been altered even slightly, decryption fails cleanly with a clear error rather than silently producing garbled or incorrect output.",
    "The passphrase is run through the same PBKDF2 key-derivation process used during encryption (250,000 iterations, using the salt embedded in the encrypted data) to reconstruct the exact same encryption key — this only works if the passphrase is character-for-character identical to the one originally used.",
    "This is useful for recovering text you encrypted earlier with the AES Encryption Tool, decrypting a message someone shared with you along with a separately-communicated passphrase, and verifying that an encrypted payload hasn't been corrupted or tampered with in transit.",
  ],
  howItWorks: [
    {
      title: "Paste the encrypted text",
      description: "The Base64-encoded output from the AES Encryption Tool.",
    },
    {
      title: "Enter the exact passphrase",
      description: "Must match the original encryption passphrase precisely.",
    },
    {
      title: "Decrypt",
      description: "The original plaintext is recovered instantly, or a clear error is shown.",
    },
  ],
  examples: [
    {
      label: "Decrypting a shared message",
      input: "Encrypted Base64 text + the correct passphrase",
      output: '"meet at noon"',
    },
  ],
  faqs: [
    {
      question: "Why does decryption fail even though I'm sure the passphrase is right?",
      answer:
        "Double-check for accidental whitespace, a missing character, or wrong capitalization — passphrase matching is exact, character-for-character. Also confirm the entire encrypted text was copied completely; even one missing or altered character in the Base64 string will cause decryption to fail.",
    },
    {
      question: "What does a decryption failure actually tell me?",
      answer:
        "AES-GCM's authentication check failed, meaning either the passphrase is wrong or the encrypted data has been altered or corrupted since it was created. This is a deliberate security feature — it's far better to get a clear failure than to silently decrypt into corrupted, incorrect plaintext without any warning.",
    },
    {
      question: "Can this decrypt text that wasn't encrypted with this site's AES Encryption Tool?",
      answer:
        "Only if it uses the exact same format — a salt, an initialization vector, and AES-256-GCM ciphertext packed together and Base64-encoded the same way. Encrypted text from a different tool or a different encryption scheme (even if it's also technically AES) generally won't decrypt here without matching that specific format.",
    },
    {
      question: "Is my passphrase or the decrypted text sent anywhere?",
      answer:
        "No — decryption happens entirely in your browser using the Web Crypto API. Neither the passphrase nor the recovered plaintext is ever transmitted to a server.",
    },
    {
      question: "Can I decrypt something if I only have part of the encrypted text?",
      answer:
        "No — the encrypted output must be complete and unmodified from what the AES Encryption Tool produced, since it packs the salt, initialization vector, and ciphertext together as one unit. A partial or truncated copy will fail to decrypt.",
    },
  ],
};

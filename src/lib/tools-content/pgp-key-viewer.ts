import type { ToolContent } from "./types";

export const pgpKeyViewerContent: ToolContent = {
  heroSubtitle: "Inspect a PGP Key's Details Without Any Software Install",
  overview: [
    "A PGP key's armored text block — the base64-looking content between -----BEGIN PGP ... KEY BLOCK----- markers — is unreadable at a glance, but its actual metadata (who it belongs to, when it was created, when it expires, its fingerprint) is often exactly what you need to confirm before trusting or using a key.",
    "This tool parses a pasted PGP public or private key and displays its real structural details: key type, algorithm, key ID, full fingerprint, creation date, expiration date, and every user ID (name and email) associated with the key — all extracted using the same parsing logic real PGP software relies on.",
    "For a private key, only structural metadata is shown — this never extracts, displays, or exposes the actual private key material, and nothing pasted here is ever used to sign, encrypt, or decrypt anything. It's purely a read-only inspection tool.",
  ],
  howItWorks: [
    { title: "Paste an armored PGP key", description: "Paste a public or private key block, including the BEGIN/END markers." },
    { title: "Review the key details", description: "See algorithm, key ID, fingerprint, dates, and user IDs." },
    { title: "Verify before trusting", description: "Confirm the fingerprint and user IDs match what you expect before using a key." },
  ],
  examples: [
    {
      label: "Public key",
      input: "-----BEGIN PGP PUBLIC KEY BLOCK-----\n...\n-----END PGP PUBLIC KEY BLOCK-----",
      output: "Public Key — RSA, Key ID: A1B2C3D4E5F6, Created: 2023-01-15, User IDs: Jane Doe <jane@example.com>",
    },
  ],
  faqs: [
    {
      question: "Is it safe to paste my private key here?",
      answer:
        "This tool only extracts structural metadata (algorithm, dates, key ID, fingerprint) — it never displays or exposes the actual private key material, and everything runs locally in your browser with nothing uploaded. That said, as a general precaution, avoid pasting private keys into any web tool unless you've verified exactly what it does.",
    },
    {
      question: "What's the difference between a Key ID and a fingerprint?",
      answer:
        "The fingerprint is the full, unique identifier for a key (a long hex string), while the Key ID is a shorter, less unique identifier derived from the fingerprint's last portion — the fingerprint is what you should actually verify when confirming a key's authenticity.",
    },
    {
      question: "What does \"Expires: Never\" mean?",
      answer:
        "It means the key was created without an expiration date, so it remains valid indefinitely unless explicitly revoked by its owner.",
    },
    {
      question: "Is my key data sent anywhere?",
      answer:
        "No — parsing happens entirely in your browser using a standard OpenPGP parsing library. Nothing you paste is uploaded or stored.",
    },
  ],
};

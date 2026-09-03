import type { ToolContent } from "./types";

export const pgpKeyPairGeneratorContent: ToolContent = {
  heroSubtitle: "Generate an RSA Public/Private Keypair in Your Browser",
  overview: [
    "Public-key cryptography uses two mathematically linked keys instead of one shared secret: a public key that can be freely shared and used by anyone to encrypt a message, and a private key kept secret that alone can decrypt it. This solves the key-distribution problem that plain symmetric encryption (like AES) can't — two people can securely exchange encrypted messages without ever having met to agree on a shared passphrase.",
    "This tool generates a real RSA keypair (2048-bit or 4096-bit) using your browser's native Web Crypto API, exported in standard PEM format — the same widely-supported text format used across TLS certificates, SSH, and countless other systems. Both keys are generated locally; the private key never leaves your browser.",
    "Important distinction: this generates standard PEM-format RSA keys, not the OpenPGP packet and ASCII-armor format used by tools like GnuPG or classic PGP software. Building a genuinely spec-compliant OpenPGP implementation from scratch is a substantial undertaking with real correctness risk — if you specifically need OpenPGP-format keys for email encryption or GPG-compatible signing, use a dedicated tool like GnuPG or the OpenPGP.js library instead.",
    "This is useful for learning how public-key cryptography works hands-on, generating a keypair for custom encryption experiments or development testing, and any project that specifically needs standard PEM-format RSA keys rather than the OpenPGP format.",
  ],
  howItWorks: [
    {
      title: "Choose a key size",
      description: "2048-bit (fast, standard) or 4096-bit (stronger, slower to generate).",
    },
    {
      title: "Click Generate keypair",
      description: "A real RSA keypair is generated using the Web Crypto API.",
    },
    {
      title: "Save both keys immediately",
      description: "Nothing is stored — copy them before leaving the page.",
    },
  ],
  examples: [
    {
      label: "Generating a 2048-bit keypair",
      input: "Key size: 2048-bit",
      output: "A PEM-formatted public key and a PEM-formatted private key",
    },
  ],
  faqs: [
    {
      question: "Can I use these keys with GnuPG or GPG-based email encryption?",
      answer:
        "No — GnuPG expects the OpenPGP packet format (RFC 4880) with ASCII armor, which is structurally different from the standard PEM format this tool produces, even though both ultimately use RSA. For GPG-compatible keys, use GnuPG itself or a dedicated OpenPGP library.",
    },
    {
      question: "Why doesn't this tool generate true OpenPGP-format keys?",
      answer:
        "A spec-compliant OpenPGP implementation is a large, correctness-critical undertaking — encoding packets, ASCII armor, and the specific key-derivation conventions the format requires. Rather than risk a subtly incorrect from-scratch implementation, this tool uses the browser's audited, standard Web Crypto API and is transparent about producing PEM format instead.",
    },
    {
      question: "Is the private key ever sent to a server?",
      answer:
        "No — key generation happens entirely in your browser using the Web Crypto API. Neither key is transmitted anywhere; you're the only one who ever sees them, and they exist only in your browser's memory until you copy or leave the page.",
    },
    {
      question: "Should I choose 2048-bit or 4096-bit?",
      answer:
        "2048-bit RSA is still considered secure for most purposes and is faster to generate and use. 4096-bit offers a larger security margin against future advances in factoring but is noticeably slower for both generation and cryptographic operations — most modern guidance still treats 2048-bit as adequate.",
    },
    {
      question: "What happens if I close the page after generating a keypair?",
      answer:
        "The keys are gone permanently — nothing is saved anywhere by this tool. Copy both the public and private key to a safe location (like a password manager for the private key) before navigating away, since they can't be regenerated identically afterward.",
    },
  ],
};

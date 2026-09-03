import type { ToolContent } from "./types";

export const fileEncryptorDecryptorContent: ToolContent = {
  heroSubtitle: "Encrypt or Decrypt Any File in Your Browser",
  overview: [
    "Sometimes it's a whole file that needs protecting, not just a block of text — a document with sensitive information, a backup archive, or anything you want to store somewhere less trusted without exposing its contents. This tool encrypts or decrypts any file type using AES-256-GCM with a passphrase, entirely inside your browser.",
    "Encrypting a file produces a downloadable `.enc` file containing the encrypted bytes plus the salt and initialization vector needed to decrypt it later — everything needed to reverse the process (except the passphrase itself) travels with the file. Decrypting takes that `.enc` file and the original passphrase and reconstructs the exact original file, byte for byte.",
    "Because this uses the same AES-256-GCM authenticated encryption as the text-based AES tools, any tampering or corruption of the encrypted file is detected immediately during decryption rather than silently producing a corrupted result — decryption either succeeds with the exact original file, or fails cleanly with an error.",
    "This is useful for encrypting a sensitive document before uploading it to cloud storage or sending it through email, protecting a backup file at rest, sharing a file securely with someone via a separate passphrase channel, and any situation needing real file encryption without installing dedicated software.",
  ],
  howItWorks: [
    {
      title: "Choose encrypt or decrypt mode",
      description: "Select a file to encrypt, or an existing .enc file to decrypt.",
    },
    {
      title: "Enter a passphrase",
      description: "Used to derive the encryption key via PBKDF2 (250,000 iterations).",
    },
    {
      title: "Download the result",
      description: "An encrypted .enc file, or the fully recovered original file.",
    },
  ],
  examples: [
    {
      label: "Encrypting a document before sharing it",
      input: "report.pdf + a strong passphrase",
      output: "report.pdf.enc, downloadable and safe to store or send",
    },
  ],
  faqs: [
    {
      question: "Is the file uploaded to a server to encrypt or decrypt it?",
      answer:
        "No — every step happens locally in your browser using the File and Web Crypto APIs. The file's contents and your passphrase never leave your device, which matters especially for a tool whose entire purpose is protecting sensitive files.",
    },
    {
      question: "What file types can this handle?",
      answer:
        "Any file type — documents, images, archives, videos, anything. Encryption works on the file's raw bytes regardless of format, so there's no restriction on what kind of file you can protect.",
    },
    {
      question: "Is there a file size limit?",
      answer:
        "Practically, it's limited by your browser's available memory rather than a hard cap this tool imposes, since the whole file is read into memory to encrypt or decrypt it. Very large files (multiple gigabytes) may be slow or hit browser memory limits, but typical documents, images, and archives work smoothly.",
    },
    {
      question: "What happens if I lose the passphrase for an encrypted file?",
      answer:
        "The file becomes permanently unrecoverable — there's no backdoor or recovery mechanism by design, since that's exactly what makes the encryption meaningful. Store the passphrase somewhere safe (a password manager) before you need it again.",
    },
    {
      question: "Why does the decrypted file need to end in .enc to work correctly?",
      answer:
        "The tool strips a trailing `.enc` extension when naming the recovered file during decryption, restoring the original filename. If your encrypted file doesn't have that extension, the decrypted output is still correct — it just gets a `.decrypted` suffix added instead of having `.enc` removed.",
    },
  ],
};

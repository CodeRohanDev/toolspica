import type { ToolContent } from "./types";

export const textEncryptorDecryptorContent: ToolContent = {
  heroSubtitle: "Encrypt or Decrypt Text with a Password, Locally",
  overview: [
    "Sometimes you need to share a password, a note, or a short message through a channel that isn't fully trusted — email, a shared document, a chat log — and want a layer of protection beyond just hoping nobody looks. Password-based encryption solves this: the text becomes unreadable gibberish to anyone without the password, and only someone who knows that password can turn it back into the original message.",
    "This tool uses AES-GCM, a modern, widely trusted encryption algorithm, combined with PBKDF2 (100,000 iterations) to turn your password into a proper encryption key rather than using the password directly — this makes brute-force password guessing significantly slower for an attacker. Both operations run through the Web Crypto API, a security-focused feature built directly into modern browsers, not a custom or unaudited encryption implementation.",
    "To encrypt, enter your text and a password; the output is a block of encrypted text (encoded in Base64 so it's safe to paste into email or a text field) that includes everything needed to decrypt it except the password itself. To decrypt, paste that exact encrypted text back in along with the same password. Losing the password means the encrypted text cannot be recovered — there is no backdoor or recovery mechanism, by design.",
  ],
  howItWorks: [
    { title: "Choose Encrypt or Decrypt", description: "Select which operation you want to perform." },
    { title: "Enter text and password", description: "Paste your text (or encrypted text) and choose a password." },
    { title: "Run the operation", description: "Get the encrypted (or decrypted) result, ready to copy." },
  ],
  examples: [
    {
      label: "Encrypting a message",
      input: "Text: \"Meet at 6pm\", Password: correcthorse",
      output: "A Base64-encoded encrypted block, e.g. Uy9tK3R5cGljYWxfZW5jcnlwdGVkX291dHB1dA==...",
    },
  ],
  faqs: [
    {
      question: "What encryption algorithm does this use?",
      answer:
        "AES-GCM with a 256-bit key, derived from your password via PBKDF2 with 100,000 iterations — both are standard, widely trusted cryptographic building blocks accessed through the browser's built-in Web Crypto API, not a custom implementation.",
    },
    {
      question: "What happens if I forget the password?",
      answer:
        "The encrypted text cannot be recovered without the original password — there's no backdoor, master key, or recovery option, by design, since that's exactly what makes the encryption meaningful.",
    },
    {
      question: "Can I decrypt text that was encrypted with a different tool?",
      answer:
        "Only if that tool uses the exact same format (AES-GCM with a matching key derivation and the same salt/IV encoding scheme). Text encrypted with a different algorithm or format won't decrypt correctly here.",
    },
    {
      question: "Is my text or password ever sent to a server?",
      answer:
        "No — both encryption and decryption run entirely in your browser using the Web Crypto API. Nothing you type, including the password, is ever transmitted or stored anywhere.",
    },
  ],
};

import type { ToolContent } from "./types";

export const zipPasswordProtectorContent: ToolContent = {
  heroSubtitle: "Create an AES-256 Encrypted ZIP Archive",
  overview: [
    "Sharing sensitive files sometimes calls for genuine encryption, not just an informal agreement not to peek. This tool bundles your files into a ZIP archive protected with AES-256 — ZIP's strongest standard encryption method — using a real 7-Zip build compiled to WebAssembly to perform the actual encryption.",
    "AES-256 is a modern, cryptographically strong encryption standard, meaningfully stronger than the older, legacy ZipCrypto method many casual ZIP tools default to (which has known weaknesses). Choosing AES-256 specifically is a deliberate security choice this tool makes on your behalf.",
    "The resulting ZIP requires the password you set to open in any ZIP-compatible software that supports AES encryption — most modern archive tools (7-Zip, WinRAR, macOS Archive Utility with the right settings) handle this correctly, though some very old or basic tools may only support the legacy method.",
    "Everything happens locally: your files and the password you choose are never transmitted anywhere — encryption happens entirely inside your browser's WebAssembly sandbox.",
  ],
  howItWorks: [
    { title: "Add your files", description: "Select the files to include in the protected archive." },
    { title: "Set a password", description: "Choose a password to encrypt the archive with." },
    { title: "Download the protected ZIP", description: "An AES-256 encrypted archive, ready to share securely." },
  ],
  examples: [
    { label: "Sharing sensitive files securely", input: "3 files + a chosen password", output: "protected.zip, requiring the password to open" },
  ],
  faqs: [
    { question: "Why AES-256 instead of a simpler password?", answer: "AES-256 is a modern, cryptographically strong encryption standard, meaningfully stronger than the legacy ZipCrypto method many basic ZIP tools default to, which has known weaknesses." },
    { question: "Will every ZIP tool be able to open this?", answer: "Most modern archive tools (7-Zip, WinRAR, and macOS's Archive Utility with the right handling) support AES-encrypted ZIPs correctly, though some very old or basic unzip tools may not." },
    { question: "What happens if I forget the password?", answer: "There's no way to recover it — AES-256 encryption is specifically designed to make that infeasible. Keep the password somewhere safe." },
    { question: "Is my file or password uploaded anywhere?", answer: "No — encryption happens entirely inside your browser using a real 7-Zip build compiled to WebAssembly." },
    { question: "Can I add more files to an already-protected ZIP later?", answer: "Not with this tool — create a new protected ZIP including all the files you need each time." },
  ],
};

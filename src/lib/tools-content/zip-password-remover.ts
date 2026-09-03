import type { ToolContent } from "./types";

export const zipPasswordRemoverContent: ToolContent = {
  heroSubtitle: "Remove a Known Password From a Protected ZIP File",
  overview: [
    "A password-protected ZIP is inconvenient the moment you need to browse its contents with a tool that doesn't support encrypted archives, or share it with someone who'd rather not manage the password separately. This tool removes password protection from a ZIP you already have legitimate access to, producing an unprotected copy.",
    "You'll need to know the ZIP's current password — this tool decrypts using the password you provide via a real 7-Zip build compiled to WebAssembly; it does not crack, guess, or brute-force an unknown password, which would be both impractical and not something a legitimate tool should attempt.",
    "Once decrypted, the contents are rebuilt into a fresh, standard, unencrypted ZIP file using this site's own ZIP writer — a genuinely password-free archive, not just one with the same encryption disabled in some partial way.",
    "Everything happens locally: decryption and rebuilding both run entirely in your browser, so neither your archive nor its password is ever transmitted anywhere.",
  ],
  howItWorks: [
    { title: "Upload the protected ZIP", description: "Select the encrypted file you have the password for." },
    { title: "Enter the current password", description: "Type the password needed to open the archive." },
    { title: "Download the unlocked ZIP", description: "A fresh, password-free ZIP is rebuilt from the decrypted contents." },
  ],
  examples: [
    { label: "Removing a known ZIP password", input: "encrypted archive.zip + correct password", output: "archive-unlocked.zip, opens without a password" },
  ],
  faqs: [
    { question: "Can this crack a password I don't know?", answer: "No — you must already know the ZIP's password. This tool only removes protection once the correct password is entered; it doesn't attempt to guess or brute-force unknown passwords." },
    { question: "Is my password or file uploaded anywhere?", answer: "No — decryption and rebuilding both happen locally in your browser; neither your ZIP nor its password is ever transmitted anywhere." },
    { question: "What if I enter the wrong password?", answer: "Extraction will fail and you'll see an error — double-check the password and try again." },
    { question: "Does this work on both classic ZipCrypto and AES-encrypted ZIPs?", answer: "Yes — the underlying 7-Zip engine supports both of ZIP's standard encryption methods." },
    { question: "Will the file quality or content change?", answer: "No — the actual file contents are extracted and repackaged exactly as they were; only the encryption is removed." },
  ],
};

import type { ToolContent } from "./types";

export const pdfUnlockContent: ToolContent = {
  heroSubtitle: "Remove a Known Password From a Protected PDF",
  overview: [
    "A password-protected PDF is inconvenient the moment you need to merge it with other files, extract pages from it, or run it through any other tool that doesn't support encrypted input — most PDF tools, including nearly every other tool in this category, require an unencrypted file to work with. This tool removes password protection from a PDF you already have legitimate access to, producing an unprotected copy you can then process freely.",
    "You'll need to know the PDF's current password — this tool decrypts using the password you provide, it does not crack, guess, or brute-force an unknown password, which would be both technically impractical for a real password and not something a legitimate tool should attempt. Enter the password, and if it's correct, the document opens and gets rebuilt without protection.",
    "The removal process works by opening the encrypted PDF with the password (using the same underlying engine that renders PDFs for viewing), rendering each page to an image, and assembling those images into a brand-new, unencrypted PDF. This render-and-rebuild approach exists because the PDF library used to build files in this project doesn't support writing PDF encryption or removing it directly at the object level — going through rendering instead is what allows password removal to work reliably without depending on lower-level encryption internals.",
    "The direct consequence of this approach is that the unlocked output's text is no longer selectable or searchable — each page is now a full-page image, not vector text. That's a real trade-off worth knowing about upfront: you get a genuinely password-free file, but you're trading away the original document's live text layer to get it.",
  ],
  howItWorks: [
    { title: "Upload your protected PDF", description: "Select the encrypted file you have the password for." },
    { title: "Enter the current password", description: "Type the password needed to open the document." },
    { title: "Unlock and download", description: "A new, password-free PDF is generated from the decrypted pages." },
  ],
  examples: [
    { label: "Removing a known password", input: "encrypted contract.pdf + correct password", output: "contract-unlocked.pdf, opens without a password" },
  ],
  faqs: [
    { question: "Can this tool crack or recover a password I don't know?", answer: "No — you must already know the PDF's password. This tool only removes protection once the correct password is entered; it doesn't attempt to guess or brute-force unknown passwords." },
    { question: "Will the unlocked PDF's text still be selectable?", answer: "No — the unlock process renders each page to an image and rebuilds the PDF from those images, since the underlying library can't remove PDF encryption directly. This means text becomes part of a picture rather than staying selectable, a necessary trade-off of this approach." },
    { question: "What happens if I enter the wrong password?", answer: "You'll see an \"Incorrect password\" message and no file will be generated — double-check the password and try again." },
    { question: "Is my password or file sent anywhere during this process?", answer: "No — decryption, rendering, and rebuilding all happen locally in your browser; neither your PDF nor its password is ever uploaded to a server." },
    { question: "Why can't this tool just remove the password while keeping selectable text?", answer: "The PDF-building library used in this project doesn't support writing or removing PDF encryption at the object level in this version — rendering and rebuilding via images is the reliable workaround, at the cost of the text layer." },
  ],
};

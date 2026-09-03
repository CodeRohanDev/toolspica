import type { ToolContent } from "./types";

export const selfDestructingSecureNoteGeneratorContent: ToolContent = {
  heroSubtitle: "Share a Secret Note via a Self-Destructing Link",
  overview: [
    "Sharing a password, API key, or other sensitive text over chat or email leaves a permanent copy sitting in that platform's message history indefinitely. A self-destructing note is meant to solve that — a link that shows the secret once and then behaves as if it's gone.",
    "This tool encrypts your note entirely in your browser using AES-256-GCM, then packs both the encrypted data and the decryption key into the link itself, after the # symbol (a URL fragment). Browsers never send URL fragments to a server — not even to this site's own server — so the encrypted note and its key travel only in the link you share, never touching any backend.",
    "Because there's no server-side storage involved, the 'self-destruct' behavior has an honest limitation worth understanding clearly: once someone opens the link and marks it read, that specific browser remembers not to show it again — but the link itself keeps working if opened from a different browser or device, since nothing was ever actually deleted from a server (there's no server involved at all). This is a genuinely different guarantee than a server-backed one-time-view system, and this tool is upfront about that trade-off rather than overpromising.",
    "This is useful for sharing a password or short-lived credential with a colleague without leaving a permanent copy in chat history, sending a sensitive note through a channel where you'd rather not have persistent plaintext sitting around, and any situation wanting client-side encryption without a backend service holding your data even temporarily.",
  ],
  howItWorks: [
    {
      title: "Type your secret note",
      description: "Encrypted with AES-256-GCM entirely in your browser.",
    },
    {
      title: "Get a shareable link",
      description: "The encrypted note and its key both live only in the link's URL fragment.",
    },
    {
      title: "Recipient opens it once",
      description: "They read the note, then mark it destroyed in their own browser.",
    },
  ],
  examples: [
    {
      label: "Sharing a temporary password with a colleague",
      input: "A one-time database password",
      output: "A link that decrypts and displays the password once when opened",
    },
  ],
  faqs: [
    {
      question: "Does this note ever touch a server?",
      answer:
        "No — encryption, the note itself, and its decryption key all live entirely within the link's URL fragment (the part after #), which browsers never send to any server, including this site's own. The entire note only ever exists in the sender's and recipient's browsers.",
    },
    {
      question: "Is the link truly one-time-use like a server-backed secret sharing service?",
      answer:
        "Not exactly, and this is worth understanding before relying on it — 'destroying' the note only sets a flag in the viewer's own browser storage, so it won't show again in that specific browser. But since there's no server tracking views, the same link would still decrypt correctly if opened from a different browser, device, or after clearing browser data.",
    },
    {
      question: "Why choose this over a dedicated one-time-secret service with real server enforcement?",
      answer:
        "This approach means absolutely nothing is stored anywhere, even temporarily, which some people prefer for sensitive data. A server-backed one-time-view service offers a stronger single-view guarantee at the cost of the data passing through (and briefly living on) that service's infrastructure — a real trade-off between two different privacy models.",
    },
    {
      question: "What happens if the recipient's browser clears its storage?",
      answer:
        "The 'already destroyed' flag is stored in that browser's localStorage, so clearing site data or using a different browser/device would reset that flag — the link would decrypt and display the note again, since nothing was ever deleted server-side to actually prevent that.",
    },
    {
      question: "Is the link itself safe to send through any channel?",
      answer:
        "The link contains everything needed to decrypt the note, so anyone who sees the full link can read it — treat sharing the link with the same care you'd give the secret itself. Its main advantage is avoiding a permanent plaintext copy sitting in a chat or email history, not protecting against the link being intercepted in transit.",
    },
  ],
};

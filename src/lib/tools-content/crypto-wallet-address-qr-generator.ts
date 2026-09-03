import type { ToolContent } from "./types";

export const cryptoWalletAddressQrGeneratorContent: ToolContent = {
  heroSubtitle: "Turn Any Crypto Wallet Address into a Scannable QR Code",
  overview: [
    "Crypto wallet addresses are long strings of random-looking characters, and manually typing one out — or even carefully copy-pasting it — carries real risk of an error that sends funds to the wrong place permanently. A QR code sidesteps that risk entirely: scan it with a phone wallet app and the exact address transfers over with zero manual transcription.",
    "This tool generates a QR code for any wallet address, optionally formatted as a proper payment URI (like bitcoin:1A1zP1... or ethereum:0x...) that many wallet apps recognize and can pre-fill directly into a send screen, including an optional payment amount. It also supports generating a plain QR code with just the raw address text, for wallets or contexts that don't expect a URI scheme.",
    "The QR code itself is generated using this site's own verified QR encoding engine, built from scratch following the ISO/IEC 18004 standard and checked cell-by-cell against an independent reference implementation for correctness — the same engine behind this site's general QR Code Generator tool.",
    "This is useful for sharing a wallet address for receiving payment, printing an address for a physical display or donation box, generating a payment request with a pre-filled amount, and any situation where scanning beats manually copying a long address string.",
  ],
  howItWorks: [
    {
      title: "Choose a coin",
      description: "Bitcoin, Ethereum, Litecoin, or plain text with no URI scheme.",
    },
    {
      title: "Paste your wallet address",
      description: "Optionally add a requested payment amount.",
    },
    {
      title: "Scan or download the QR code",
      description: "Ready to share, print, or display.",
    },
  ],
  examples: [
    {
      label: "Generating a Bitcoin payment QR code",
      input: "Coin: Bitcoin, Address: (your address), Amount: 0.01",
      output: "A QR code encoding bitcoin:(address)?amount=0.01",
    },
  ],
  faqs: [
    {
      question: "Why include a payment URI scheme instead of just the plain address?",
      answer:
        "Many wallet apps recognize schemes like bitcoin: or ethereum: and automatically fill the recipient field (and amount, if included) when scanning — a plain address QR code still works for most apps but skips that pre-fill convenience.",
    },
    {
      question: "Is it safe to include a specific amount in the QR code?",
      answer:
        "Yes — including an amount is a standard, widely supported feature of these payment URI schemes, and it doesn't create funds or authorize anything on its own; it simply pre-fills the amount field for whoever scans it, who still has to confirm and send the transaction themselves.",
    },
    {
      question: "Does this validate that the wallet address is correctly formatted?",
      answer:
        "No — this tool just encodes whatever text you enter into a QR code. For Bitcoin specifically, pair this with the Bitcoin Address Validator tool first to confirm the address's checksum is valid before generating and sharing the QR code.",
    },
    {
      question: "Can I use this for coins other than Bitcoin, Ethereum, and Litecoin?",
      answer:
        "Yes — choose 'Plain address' to encode any wallet address as-is without a URI scheme, which works for any cryptocurrency, since a plain address QR code is universally scannable even without wallet-specific URI recognition.",
    },
    {
      question: "Is the wallet address sent anywhere when generating the QR code?",
      answer:
        "No — the QR code is generated entirely in your browser using this site's own encoding engine. The address never leaves your device or gets transmitted to any server.",
    },
  ],
};

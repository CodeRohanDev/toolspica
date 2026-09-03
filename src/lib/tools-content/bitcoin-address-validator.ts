import type { ToolContent } from "./types";

export const bitcoinAddressValidatorContent: ToolContent = {
  heroSubtitle: "Validate Bitcoin Addresses (Legacy, P2SH & Bech32)",
  overview: [
    "Sending Bitcoin to a mistyped address doesn't bounce back — it's simply lost, since there's no central authority to reverse a transaction. This makes catching a typo before sending genuinely valuable, and fortunately Bitcoin addresses are specifically designed with a built-in checksum precisely so typos can be detected before funds ever leave a wallet.",
    "This tool validates all three current Bitcoin address formats: Legacy P2PKH addresses (starting with 1), P2SH addresses (starting with 3), and native SegWit Bech32 addresses (starting with bc1). Legacy and P2SH addresses use Base58Check encoding, where the last 4 bytes are a checksum computed by hashing the address twice with SHA-256 — this tool recomputes that checksum and confirms it matches. Bech32 addresses use a different, more robust checksum algorithm (defined in BIP173) specifically designed to catch far more error patterns than Base58Check, including several types of errors humans commonly make when reading characters aloud or typing them.",
    "This validator was built and verified against real, independently-sourced on-chain Bitcoin addresses spanning all three formats — including confirming that single-character mutations of valid addresses are correctly rejected, the exact failure mode this tool exists to catch.",
    "This is useful for double-checking a wallet address before sending funds, verifying an address a business or contact provided is properly formatted, catching copy-paste errors or transcription mistakes, and understanding which address format and network segment (Legacy, P2SH, or SegWit) a given address belongs to.",
  ],
  howItWorks: [
    {
      title: "Paste a Bitcoin address",
      description: "Legacy (1...), P2SH (3...), or Bech32 (bc1...).",
    },
    {
      title: "The checksum is verified automatically",
      description: "Base58Check double-SHA256 or Bech32 polynomial checksum, depending on format.",
    },
    {
      title: "See the result",
      description: "Valid with its specific format, or invalid with the reason why.",
    },
  ],
  examples: [
    {
      label: "Validating a real on-chain address",
      input: "1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa",
      output: "Valid address — P2PKH (Legacy, starts with 1)",
    },
  ],
  faqs: [
    {
      question: "Can this confirm an address actually belongs to someone I trust?",
      answer:
        "No — it only confirms the address is properly formatted and its checksum is valid, meaning it's structurally a real, well-formed Bitcoin address. It can't verify who controls that address or whether you should trust sending funds to it.",
    },
    {
      question: "What's the difference between the three address formats?",
      answer:
        "Legacy (P2PKH, starting with 1) is the original address format from Bitcoin's early years. P2SH (starting with 3) wraps a script, commonly used for multi-signature wallets. Bech32 (starting with bc1) is the newer native SegWit format, generally offering lower transaction fees and a more error-resistant checksum.",
    },
    {
      question: "If this says an address is valid, is it definitely safe to send funds to?",
      answer:
        "Structural validity just means the address is well-formed and hasn't been mistyped in a way the checksum would catch — it doesn't verify the recipient's identity or protect against a scam address that's still technically valid. Always confirm the source of an address separately from format validation.",
    },
    {
      question: "Can a single mistyped character produce another valid-looking address by accident?",
      answer:
        "It's astronomically unlikely — the whole point of the checksum is to make this virtually impossible. Both Base58Check and Bech32 checksums are specifically designed so that essentially any typo, character swap, or transposition breaks the checksum and gets caught, rather than silently producing a different valid address.",
    },
    {
      question: "Does this work for testnet addresses?",
      answer:
        "Bech32 testnet addresses (starting with tb1) are recognized and validated. Legacy and P2SH testnet addresses use different version bytes than mainnet and aren't currently covered by this validator, which is built primarily for mainnet address checking.",
    },
  ],
};

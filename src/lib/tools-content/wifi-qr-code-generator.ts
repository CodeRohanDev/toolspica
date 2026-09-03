import type { ToolContent } from "./types";

export const wifiQrCodeGeneratorContent: ToolContent = {
  heroSubtitle: "Generate a Scannable WiFi QR Code",
  overview: [
    "Typing out a long, complicated WiFi password for every guest is a small but recurring annoyance — a WiFi QR code solves this by letting a phone camera join the network automatically, no typing required. Scanning the code connects the device directly using credentials encoded right into the QR pattern.",
    "This tool builds the standard WiFi QR format — a specific text structure (WIFI:T:security-type;S:network-name;P:password;;) that modern phone camera apps recognize automatically and offer to connect to, without needing a separate app. Special characters in your network name or password are automatically escaped to match the format's exact requirements.",
    "Three security types are supported: WPA (covering both WPA and WPA2, the standard for virtually all modern networks), WEP (older, now largely obsolete but still occasionally encountered), and no password for an open network. A hidden network option is also available for networks that don't broadcast their name publicly.",
    "This is useful for a home network's guest QR code posted somewhere visible, a small business or café offering WiFi access, or simply saving yourself from reciting a complicated password out loud every time someone visits. The QR code is generated entirely in your browser — your actual WiFi password is never transmitted anywhere.",
  ],
  howItWorks: [
    {
      title: "Enter your network name and password",
      description: "Plus the security type and whether the network is hidden.",
    },
    {
      title: "The WiFi QR code generates instantly",
      description: "Built in the standard format phone cameras recognize automatically.",
    },
    {
      title: "Scan to connect, or download and print",
      description: "Any modern phone camera can scan and join directly.",
    },
  ],
  examples: [
    {
      label: "WPA network example",
      input: "SSID: MyHomeNetwork, Password: SecurePass123, Security: WPA",
      output: "A scannable code that connects a phone directly to that network",
    },
  ],
  faqs: [
    {
      question: "Does scanning this actually connect to my WiFi, or just show the password?",
      answer:
        "On most modern phones (recent iOS and Android), scanning a properly formatted WiFi QR code with the native camera app offers a direct \"Join Network\" prompt — connecting automatically without displaying or requiring manual entry of the password.",
    },
    {
      question: "Is my WiFi password sent anywhere when I use this tool?",
      answer:
        "No — the QR code is generated entirely in your browser using local JavaScript. Your network name and password are never transmitted to any server; they only exist as text encoded directly into the QR pattern on your own device.",
    },
    {
      question: "What if my network name or password contains special characters?",
      answer:
        "Characters that have special meaning in the WiFi QR format (like semicolons, colons, or backslashes) are automatically escaped with a backslash, exactly as the standard format requires — you don't need to do anything special when entering them.",
    },
    {
      question: "Should I choose WPA even if I'm not sure of my exact security type?",
      answer:
        "WPA is the correct choice for both WPA and WPA2 networks, which covers the vast majority of home and business networks set up in the last decade or more — only choose WEP if you specifically know your router is still using that older, now largely obsolete standard.",
    },
    {
      question: "Is it safe to post a WiFi QR code publicly?",
      answer:
        "Only for a network you're comfortable giving broad access to — anyone who scans the code gets full network access, the same as if you'd told them the password directly. For a home network, posting it somewhere only guests see (rather than publicly online) is the safer approach.",
    },
  ],
};

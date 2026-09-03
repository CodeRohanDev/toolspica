import type { ToolContent } from "./types";

export const userAgentParserContent: ToolContent = {
  heroSubtitle: "Decode a User-Agent String Into Browser, OS, and Device Info",
  overview: [
    "User-Agent strings are notoriously dense and hard to read at a glance — a single string can pack in browser name, version, rendering engine, operating system, and device type all crammed together with historical baggage from decades of browser one-upmanship. This tool parses any User-Agent string and breaks it down into clearly labeled fields: browser, version, operating system, and device type.",
    "By default it shows your own browser's User-Agent, pre-filled from `navigator.userAgent`, so you can immediately see how your current setup gets identified. Paste in any other User-Agent string — from a server log, a bug report, or an analytics export — to decode what browser and device that visitor was actually using.",
    "This is genuinely useful for debugging a browser-specific bug report, understanding what's showing up in your server access logs, or verifying what a specific browser/OS combination identifies itself as before writing browser-detection logic in your own code.",
  ],
  howItWorks: [
    { title: "Paste a User-Agent string", description: "Or use your own browser's, pre-filled automatically." },
    { title: "Parsing runs automatically", description: "Browser, version, OS, and device type extracted." },
    { title: "Review the breakdown", description: "Clearly labeled fields instead of one dense string." },
  ],
  examples: [
    { label: "Parsing a Chrome on Windows User-Agent", input: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) ... Chrome/128.0.0.0", output: "Browser: Chrome, OS: Windows 10/11, Device: Desktop" },
  ],
  faqs: [
    { question: "How accurate is this parsing?", answer: "It correctly identifies the most common browsers (Chrome, Firefox, Safari, Edge, Opera), operating systems, and device types using pattern matching, but very obscure or spoofed User-Agent strings may not parse perfectly." },
    { question: "Why do so many User-Agent strings still say \"Mozilla\"?", answer: "It's a historical artifact — nearly every modern browser starts with \"Mozilla/5.0\" for legacy compatibility reasons, even though most have nothing to do with the original Mozilla browser." },
    { question: "Can User-Agent strings be spoofed?", answer: "Yes — any client can send an arbitrary User-Agent string, so this parsing reflects what was claimed, not necessarily verified fact." },
    { question: "Is the User-Agent string uploaded anywhere?", answer: "No — parsing happens entirely in your browser using regular expression pattern matching." },
    { question: "Does this detect bot/crawler User-Agents?", answer: "Not specifically — this focuses on identifying real browser/OS/device combinations rather than classifying bot traffic." },
  ],
};

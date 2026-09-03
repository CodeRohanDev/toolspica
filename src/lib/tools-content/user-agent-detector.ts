import type { ToolContent } from "./types";

export const userAgentDetectorContent: ToolContent = {
  heroSubtitle: "Detect and Parse Any Browser User Agent String",
  overview: [
    "Every browser identifies itself to websites with a User-Agent string — a dense, often confusing line of text packed with browser name, version, rendering engine, and operating system information. Websites use it (imperfectly) to decide which features to serve or how to render a page, and it's a common source of confusion when debugging browser-specific bugs.",
    "This tool detects and clearly breaks down your own browser's user agent automatically, showing the browser name and version, rendering engine (Blink, Gecko, or WebKit), operating system, and device type in a readable format instead of the raw string. You can also paste in any arbitrary user agent string — from a bug report, a server log, or a different browser — to parse it the same way.",
    "User agent strings are famously messy for historical reasons: nearly every browser's user agent includes the word 'Mozilla' regardless of what browser it actually is, a legacy from the 1990s browser wars that stuck around for compatibility reasons. Parsing them reliably means checking for more specific tokens (like 'Edg/' for Microsoft Edge) before falling back to broader ones.",
    "This is useful for debugging browser-specific bugs reported by users, understanding what a mysterious user agent string in a server log actually represents, testing how your own site's user-agent detection logic behaves, and general curiosity about what your browser reveals about your setup.",
  ],
  howItWorks: [
    {
      title: "Your user agent is detected automatically",
      description: "No input needed — it reads directly from your browser.",
    },
    {
      title: "Or paste any user agent string",
      description: "Parse a UA string from a bug report, log file, or another browser.",
    },
    {
      title: "View the breakdown",
      description: "Browser, engine, OS, and device type are shown clearly.",
    },
  ],
  examples: [
    {
      label: "Parsing a Chrome on Windows user agent",
      input:
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
      output: "Browser: Chrome 120.0.0.0, Engine: Blink, OS: Windows 10/11, Device: Desktop",
    },
  ],
  faqs: [
    {
      question: "Why does every user agent string contain 'Mozilla'?",
      answer:
        "It's a historical artifact from the 1990s browser wars — Netscape (originally called Mozilla) was the dominant browser, and websites checked for that token to serve advanced features. When Internet Explorer and later browsers arrived, they included 'Mozilla' too just to avoid being treated as lesser browsers, and the convention stuck permanently.",
    },
    {
      question: "Can a website tell exactly which browser I'm using from the user agent?",
      answer:
        "Usually yes with reasonable accuracy, but user agent strings can be spoofed or customized by browser extensions and developer tools, and some privacy-focused browsers deliberately send a generic or randomized user agent to reduce fingerprinting — so it's a strong signal, not a guarantee.",
    },
    {
      question: "Why does my browser's user agent list an operating system I'm not using?",
      answer:
        "This shouldn't normally happen unless you've installed a browser extension that spoofs the user agent, or your browser has a compatibility mode enabled for a specific site — some browsers let you manually override the reported OS for testing or compatibility purposes.",
    },
    {
      question: "What's the difference between a browser and its rendering engine?",
      answer:
        "The rendering engine (Blink, Gecko, WebKit) is the underlying software that actually parses HTML/CSS and renders the page. Multiple browsers can share an engine — Chrome, Edge, and Opera all use Blink — while presenting completely different user interfaces and features on top of it.",
    },
    {
      question: "Is my user agent string sent to every website I visit?",
      answer:
        "Yes — it's included automatically with every request your browser makes, which is why it's such a commonly used (and sometimes controversial) piece of information for analytics, device-specific rendering, and unfortunately also browser fingerprinting for tracking.",
    },
  ],
};

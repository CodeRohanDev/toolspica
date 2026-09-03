import type { ToolContent } from "./types";

export const myIpAddressFinderContent: ToolContent = {
  heroSubtitle: "See Your Own Public IP Address Instantly",
  overview: [
    "Your public IP address is how the rest of the internet sees your connection — it's what a website, game server, or remote support technician sees when your device connects to them. It's different from the private IP address your router assigns to devices on your home network, which is never visible outside your own network.",
    "This tool detects your public IP address automatically the moment the page loads, along with the approximate location and internet service provider associated with it, pulled from public IP geolocation data — the same kind of information any website you visit can already see about your connection.",
    "Knowing your public IP is genuinely useful in several everyday situations: setting up port forwarding or remote access on a home router, troubleshooting a connection issue with an ISP's support team, verifying a VPN is actually routing your traffic (your public IP should change to the VPN server's when connected), or confirming which network you're currently on.",
    "This is useful for network troubleshooting, setting up remote access or gaming servers that need a specific IP allowed through a firewall, verifying VPN or proxy connections are actually active, and quickly answering the common question 'what's my IP?' without digging through router settings.",
  ],
  howItWorks: [
    {
      title: "Page loads",
      description: "Your public IP address is detected automatically — no input needed.",
    },
    {
      title: "View your details",
      description: "IP address, approximate location, and ISP are shown immediately.",
    },
    {
      title: "Refresh anytime",
      description: "Useful for checking whether a VPN or network change actually took effect.",
    },
  ],
  examples: [
    {
      label: "Checking your connection before setting up remote access",
      input: "Page load (no input required)",
      output: "Your public IP address, city, region, and ISP name",
    },
  ],
  faqs: [
    {
      question: "Is my public IP address the same as my computer's IP address?",
      answer:
        "No — your computer has a private IP address on your home network (usually something like 192.168.x.x), assigned by your router. Your public IP is the single address your entire home network shares when it connects to the wider internet, assigned by your ISP.",
    },
    {
      question: "Does my public IP address change?",
      answer:
        "For most home internet connections, yes — ISPs typically assign 'dynamic' IP addresses that can change periodically (on router restart, or on a schedule set by the ISP). Business connections sometimes have a fixed 'static' IP that doesn't change.",
    },
    {
      question: "Is it safe to share my public IP address with someone?",
      answer:
        "Generally yes for routine purposes like tech support or setting up remote access — an IP address alone doesn't reveal your identity or grant access to your devices. That said, avoid sharing it unnecessarily with people you don't trust, the same caution you'd apply to any piece of network information.",
    },
    {
      question: "Why does my IP show a different city than where I actually live?",
      answer:
        "ISPs often register IP address blocks to a regional hub city rather than each individual customer's exact town, so it's normal and expected for the shown location to be a nearby larger city rather than your precise location.",
    },
    {
      question: "How can I check if my VPN is actually working?",
      answer:
        "Check this tool once with your VPN off to note your real IP and ISP, then again with the VPN connected — if it's working correctly, you should see a different IP address and a different ISP (the VPN provider's) the second time.",
    },
  ],
};

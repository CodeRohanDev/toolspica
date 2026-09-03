import type { ToolContent } from "./types";

export const whoisLookupContent: ToolContent = {
  heroSubtitle: "Look Up Domain Registration Details",
  overview: [
    "WHOIS is the public protocol for looking up who registered a domain name, when it was registered, when it expires, and which registrar and name servers manage it. It's one of the oldest parts of internet infrastructure, predating the modern web, and remains the standard way to check a domain's registration status.",
    "This tool performs a real WHOIS lookup by first querying IANA (the internet's central registry authority) to find which registry is authoritative for the domain's top-level extension (.com, .org, .io, and so on), then querying that specific registry's WHOIS server directly — exactly how a proper WHOIS client is supposed to work, rather than just guessing a fixed server.",
    "Since privacy regulations like GDPR took effect, many registrars now redact personal registrant details (name, email, address) by default, showing the registrar's privacy proxy service instead. Registration dates, expiry dates, name servers, and registrar information typically remain visible even with privacy protection enabled.",
    "This is useful for checking when a domain expires (important before it lapses and becomes available for anyone to register), verifying who currently owns a domain before a purchase negotiation, confirming a domain transfer completed correctly, and general domain research.",
  ],
  howItWorks: [
    {
      title: "Enter a domain name",
      description: "Any registered domain, without http:// or www.",
    },
    {
      title: "Click Lookup",
      description: "Queries IANA for the authoritative registry, then that registry's WHOIS server.",
    },
    {
      title: "Review the raw record",
      description: "The full WHOIS response is shown exactly as the registry returns it.",
    },
  ],
  examples: [
    {
      label: "Checking domain expiry",
      input: "example.com",
      output: "Full WHOIS record including registrar, creation date, and expiration date",
    },
  ],
  faqs: [
    {
      question: "Why is the registrant's name and email hidden?",
      answer:
        "Most registrars now enable WHOIS privacy protection by default, replacing personal contact details with the registrar's own privacy proxy service — a response to privacy regulations like GDPR. This is normal and doesn't indicate anything unusual about the domain.",
    },
    {
      question: "Why does the lookup sometimes fail or time out?",
      answer:
        "Some domain registries run WHOIS servers with strict rate limits or occasional downtime, and a handful of newer top-level domains use RDAP (WHOIS's modern successor) instead of classic WHOIS with different availability characteristics. If a lookup fails, trying again after a moment often works.",
    },
    {
      question: "Can I find out who owns any domain with this?",
      answer:
        "You can see the registrar, registration dates, and name servers for essentially any domain, but privacy-protected registrations will show the registrar's proxy service rather than the actual owner's name — full owner identification usually requires a legal request through the registrar.",
    },
    {
      question: "What's the difference between the registrar and the registry?",
      answer:
        "The registry (like Verisign for .com) manages the entire top-level domain and its authoritative name servers. The registrar (like GoDaddy or Namecheap) is the company you actually buy the domain through, acting as the registry's retail intermediary — WHOIS data usually shows both.",
    },
    {
      question: "Why does the domain expiration date matter?",
      answer:
        "If a domain isn't renewed before its expiration date, it eventually becomes available for anyone else to register — a real risk for businesses that forget to renew. Checking this date periodically is a basic domain-hygiene habit worth keeping.",
    },
  ],
};

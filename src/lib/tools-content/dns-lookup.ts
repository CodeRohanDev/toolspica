import type { ToolContent } from "./types";

export const dnsLookupContent: ToolContent = {
  heroSubtitle: "Look Up A, AAAA, MX, TXT, NS, CNAME & SOA Records",
  overview: [
    "DNS (Domain Name System) is the internet's address book — it translates human-readable domain names into the IP addresses and configuration that servers actually use. When a domain isn't resolving correctly, email isn't delivering, or a DNS change isn't showing up yet, the fastest way to see what's actually published is to query the records directly.",
    "This tool looks up every common DNS record type for a domain in one pass: A records (IPv4 addresses), AAAA records (IPv6 addresses), MX records (mail servers), TXT records (often used for SPF, DKIM, and domain verification), NS records (authoritative name servers), CNAME records (aliases), and the SOA record (zone administration details like the primary name server and refresh timing).",
    "Results come straight from live DNS resolution at the moment you run the lookup, not a cached snapshot — though DNS itself is cached at many layers (your ISP, public resolvers, your own device), so a very recent change might not be visible everywhere immediately even though this tool queries fresh.",
    "This is useful for verifying a domain's mail setup (MX and TXT/SPF records), confirming a DNS change has actually propagated, debugging why a subdomain isn't resolving, checking who's authoritative for a domain, and general domain administration and troubleshooting.",
  ],
  howItWorks: [
    {
      title: "Enter a domain name",
      description: "Any registered domain, without http:// or www.",
    },
    {
      title: "Click Lookup",
      description: "Every common record type is queried at once.",
    },
    {
      title: "Review the results",
      description: "Only record types that actually exist for the domain are shown.",
    },
  ],
  examples: [
    {
      label: "Checking a domain's mail servers",
      input: "example.com",
      output: "MX records listing each mail server and its priority, plus A, NS, and TXT records",
    },
  ],
  faqs: [
    {
      question: "Why don't I see all seven record types for every domain?",
      answer:
        "Not every domain publishes every record type — a domain with no email set up won't have MX records, and one without IPv6 support won't have AAAA records. This tool only shows the record types that actually exist for the domain you looked up.",
    },
    {
      question: "How long does a DNS change take to show up here?",
      answer:
        "This tool queries live DNS at the moment you run it, so it reflects the current published records — but DNS is cached at many points along the way (resolvers, ISPs), so a very recent change can take anywhere from minutes to 48 hours to be visible everywhere, governed by each record's TTL (time to live).",
    },
    {
      question: "What is a CNAME record?",
      answer:
        "A CNAME (canonical name) record makes one domain name an alias for another — for example, pointing www.example.com to example.com so both resolve to the same place without duplicating the underlying A record.",
    },
    {
      question: "What does an SOA record tell me?",
      answer:
        "The SOA (Start of Authority) record identifies the primary name server for the domain's zone and the timing rules other name servers use to stay in sync — refresh interval, retry interval, expiry, and minimum TTL — mainly useful for DNS administrators diagnosing propagation behavior.",
    },
    {
      question: "Why would MX records show an empty exchange with priority 0?",
      answer:
        "That's a 'null MX' record (defined in RFC 7505) — a domain deliberately publishing it to declare that it accepts no email at all, which is a valid and increasingly common configuration for domains that are never meant to send or receive mail.",
    },
  ],
};

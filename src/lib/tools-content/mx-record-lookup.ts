import type { ToolContent } from "./types";

export const mxRecordLookupContent: ToolContent = {
  heroSubtitle: "Check a Domain's Mail Server Records",
  overview: [
    "MX (Mail Exchange) records tell the internet which mail servers are responsible for accepting email on behalf of a domain. When email to an address isn't arriving, or you're setting up a new domain with a mail provider, checking the published MX records directly is the fastest way to confirm what's actually configured versus what you think is configured.",
    "This tool queries a domain's MX records and returns each mail server's hostname along with its priority number. Lower priority numbers are tried first — a domain with multiple mail servers uses this to define a primary server and one or more fallback servers if the primary is unreachable.",
    "Results reflect the domain's live, currently published DNS records at the moment of lookup. If you've recently changed mail providers or added a new MX record, this shows exactly what's resolving right now, which is the first thing to check when troubleshooting email delivery issues.",
    "This is useful for confirming mail provider setup (Google Workspace, Microsoft 365, or a custom mail server) is correctly configured, diagnosing email delivery problems, verifying MX priority ordering, and checking a domain's mail configuration before making DNS changes.",
  ],
  howItWorks: [
    {
      title: "Enter a domain name",
      description: "Any registered domain, without http:// or www.",
    },
    {
      title: "Click Lookup",
      description: "The domain's MX records are queried live from DNS.",
    },
    {
      title: "Review priority order",
      description: "Servers are sorted by priority, lowest (tried first) at the top.",
    },
  ],
  examples: [
    {
      label: "Checking a Google Workspace domain",
      input: "gmail.com",
      output: "Multiple mail servers listed with priorities 5, 10, 20, 30, and 40",
    },
  ],
  faqs: [
    {
      question: "What does the priority number mean?",
      answer:
        "Lower numbers are tried first. If a domain has two MX records with priorities 10 and 20, mail servers will always attempt delivery to the priority-10 server first, falling back to priority-20 only if the first one is unreachable.",
    },
    {
      question: "What does it mean if a domain has no MX records at all?",
      answer:
        "It means the domain isn't configured to receive email — any mail sent to an address at that domain will bounce. This is common (and fine) for domains used purely for a website with no associated email service.",
    },
    {
      question: "I just changed my MX records — why do I still see the old ones?",
      answer:
        "DNS changes take time to propagate due to caching at various levels (your DNS provider's TTL setting, your ISP, public resolvers). This tool queries live DNS, so it will show the new records once they've actually propagated — check back after the TTL period has passed.",
    },
    {
      question: "Can a domain have multiple MX records?",
      answer:
        "Yes — that's standard practice for redundancy. Most business email setups publish at least two MX records at different priorities, so if the primary mail server is temporarily down, incoming mail can still be delivered to a backup.",
    },
    {
      question: "Does this tool send or receive any actual email?",
      answer:
        "No — it only queries DNS to see which mail servers are published for the domain. It doesn't connect to those mail servers or interact with email in any way.",
    },
  ],
};

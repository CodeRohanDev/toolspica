import type { ToolContent } from "./types";

export const ipBlacklistCheckerContent: ToolContent = {
  heroSubtitle: "Check if an IP Address is on a Spam Blacklist",
  overview: [
    "Email servers and spam filters widely rely on DNSBLs (DNS-based Blackhole Lists) — publicly maintained lists of IP addresses associated with spam, malware, or other abuse. If a mail server's IP ends up listed, legitimate email from it can start silently landing in spam folders or getting rejected outright, often without any obvious warning to the sender.",
    "This tool checks a given IPv4 address against several independently maintained, well-established DNSBL zones — SpamCop, the Barracuda Reputation Block List, and UCEPROTECT — by performing the same reverse-IP DNS lookup technique mail servers use internally to check a sender's reputation before accepting a message.",
    "One large blacklist provider, Spamhaus, is deliberately excluded here: its free zen.spamhaus.org zone blocks queries from shared or cloud-hosted resolvers and returns a fixed 'rejected' response to every single lookup, which would make every IP address look listed regardless of its actual reputation. Rather than ship a tool that always reports a false positive, this checker sticks to zones verified to correctly distinguish listed from clean addresses.",
    "This is useful for diagnosing why a server's outbound email is landing in spam or being rejected, checking a new server's IP reputation before putting it into production for mail sending, monitoring a mail server's blacklist status after a security incident, and general email deliverability troubleshooting.",
  ],
  howItWorks: [
    {
      title: "Enter an IPv4 address",
      description: "The address you want to check for blacklist status.",
    },
    {
      title: "Click Check",
      description: "The address is queried against several public DNSBL zones at once.",
    },
    {
      title: "Review the results",
      description: "See exactly which lists (if any) the address appears on.",
    },
  ],
  examples: [
    {
      label: "Checking a mail server's reputation",
      input: "192.0.2.1",
      output: "Clean on SpamCop, Barracuda, and UCEPROTECT",
    },
  ],
  faqs: [
    {
      question: "Why is my email landing in spam if my IP isn't listed here?",
      answer:
        "Blacklisting is just one factor among many in spam filtering — SPF/DKIM/DMARC configuration, sending reputation and volume history, content patterns, and recipient-specific filtering rules all play a role too. A clean blacklist check is a good sign but not a complete deliverability diagnosis on its own.",
    },
    {
      question: "How did my IP end up on a blacklist in the first place?",
      answer:
        "Common causes include a compromised server sending spam without the owner's knowledge, a shared hosting IP previously used by a different customer who was abusive, misconfigured mail relays, or an actual pattern of unsolicited email being reported by recipients as spam.",
    },
    {
      question: "How do I get an IP removed from a blacklist?",
      answer:
        "Each blacklist provider runs its own delisting process, usually a form on their own website confirming the underlying issue has been fixed — this tool can tell you which lists to pursue, but removal itself has to go through each list's own process, not through this checker.",
    },
    {
      question: "Why isn't Spamhaus (zen.spamhaus.org) included in this check?",
      answer:
        "Spamhaus blocks free-tier queries from shared or cloud-hosted resolvers and returns the same fixed 'rejected' response for every lookup from those sources — verified directly before this tool shipped. Including it would make every IP address falsely appear listed, so it's excluded in favor of zones that behave correctly.",
    },
    {
      question: "Does this work for IPv6 addresses?",
      answer:
        "No, currently only IPv4 — the DNSBL zones this tool checks use the IPv4 reverse-lookup convention. IPv6 has its own separate blacklist zones with a different lookup format not currently supported here.",
    },
  ],
};

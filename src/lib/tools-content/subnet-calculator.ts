import type { ToolContent } from "./types";

export const subnetCalculatorContent: ToolContent = {
  heroSubtitle: "Calculate Network, Broadcast, and Usable IP Ranges",
  overview: [
    "Subnetting — dividing a network into smaller segments — is a core skill in network administration, but the math behind it (converting a CIDR prefix into a subnet mask, then figuring out the resulting network address, broadcast address, and usable host range) is tedious to do by hand and easy to get wrong, especially with less common prefix lengths.",
    "This tool takes any IPv4 address and CIDR prefix (like /24 or /26) and instantly calculates the network address, broadcast address, subnet mask, wildcard mask, the first and last usable host addresses, the total number of usable hosts, and the address's legacy IP class (A, B, or C).",
    "Understanding subnet boundaries matters for real network configuration tasks: assigning IP ranges to VLANs without overlap, configuring firewall rules that need an exact network/broadcast pair, sizing a subnet correctly for how many devices it needs to support, and troubleshooting why a device can't reach others on what should be the same network.",
    "This is useful for network engineers and system administrators planning IP address allocation, students learning subnetting for networking certifications, configuring router and firewall rules that reference network ranges, and quickly sanity-checking subnet math without doing binary conversion by hand.",
  ],
  howItWorks: [
    {
      title: "Enter an IP address",
      description: "Any IPv4 address in the subnet you want to analyze.",
    },
    {
      title: "Enter the CIDR prefix",
      description: "The subnet size, from /0 to /32.",
    },
    {
      title: "Read the results",
      description: "Network, broadcast, usable range, and host count are calculated instantly.",
    },
  ],
  examples: [
    {
      label: "Calculating a standard /24 subnet",
      input: "192.168.1.100 / 24",
      output: "Network: 192.168.1.0, Broadcast: 192.168.1.255, Usable hosts: 254",
    },
    {
      label: "Calculating a smaller /26 subnet",
      input: "10.0.5.130 / 26",
      output: "Network: 10.0.5.128, Broadcast: 10.0.5.191, Usable hosts: 62",
    },
  ],
  faqs: [
    {
      question: "Why do usable hosts equal total addresses minus 2?",
      answer:
        "The first address in any subnet is reserved as the network address (identifying the subnet itself) and the last is reserved as the broadcast address (used to send a message to every device on the subnet) — neither can be assigned to an individual device, which is why usable hosts is always total addresses minus 2 (except for /31 and /32, which have special rules).",
    },
    {
      question: "What's different about /31 and /32 subnets?",
      answer:
        "A /31 subnet (2 addresses) is a special case defined in RFC 3021 used for point-to-point links, where both addresses are usable with no network/broadcast reservation. A /32 is a single host route with no usable range at all — it identifies exactly one address.",
    },
    {
      question: "What does the wildcard mask do?",
      answer:
        "It's the inverse of the subnet mask (0.0.0.255 instead of 255.255.255.0, for example) and is specifically used in Cisco access control lists and OSPF configuration, where the syntax calls for a wildcard mask rather than a standard subnet mask.",
    },
    {
      question: "Is the 'IP class' shown still relevant today?",
      answer:
        "Not for actual routing — classful addressing (Class A/B/C) was replaced by CIDR decades ago, and modern networks use CIDR prefixes exclusively regardless of an address's historical class. It's shown mainly as a reference point still commonly taught in networking fundamentals.",
    },
    {
      question: "Can I use this for IPv6 subnetting?",
      answer:
        "No — this calculator is built specifically for IPv4 addressing and CIDR notation. IPv6 subnetting follows different conventions (128-bit addresses, different prefix length norms) and would need a dedicated IPv6-specific calculator.",
    },
  ],
};

import type { ToolContent } from "./types";

export const macAddressLookupToolContent: ToolContent = {
  heroSubtitle: "Find the Manufacturer Behind Any MAC Address",
  overview: [
    "Every network device — a phone, laptop, router, smart TV, IoT gadget — has a MAC (Media Access Control) address burned into its network hardware, and the first half of that address isn't random: it's an OUI (Organizationally Unique Identifier) officially assigned by the IEEE to the specific manufacturer that made the hardware.",
    "This tool takes any MAC address, extracts its OUI (the first three octets), and looks it up against a curated set of well-known, verified manufacturer prefixes — covering common devices like Apple hardware, Raspberry Pi boards, Dell machines, VMware and virtualization platforms, and more. It also normalizes whatever format you paste in (with colons, hyphens, or no separators) into a standard colon-separated format.",
    "The full IEEE OUI registry contains tens of thousands of assigned prefixes across every hardware manufacturer worldwide — far more than any curated list can practically cover. Rather than guess at less certain entries, this tool sticks to a smaller set of prefixes it can verify with confidence, and points you to the official IEEE registry for exhaustive coverage when a prefix isn't recognized.",
    "This is useful for identifying unknown devices on your home or office network by their manufacturer, verifying a device's hardware vendor before troubleshooting, network inventory and security auditing, and general curiosity about what's actually behind an unfamiliar MAC address showing up in a router's client list.",
  ],
  howItWorks: [
    {
      title: "Enter a MAC address",
      description: "Any format — colons, hyphens, or no separators all work.",
    },
    {
      title: "The OUI is extracted automatically",
      description: "The first three octets, which identify the manufacturer.",
    },
    {
      title: "See the matched vendor",
      description: "If the prefix is in our curated list, the manufacturer name is shown.",
    },
  ],
  examples: [
    {
      label: "Identifying a Raspberry Pi on the network",
      input: "B8:27:EB:12:34:56",
      output: "Vendor: Raspberry Pi Foundation",
    },
  ],
  faqs: [
    {
      question: "Why doesn't this tool recognize every MAC address?",
      answer:
        "The full IEEE OUI registry has tens of thousands of entries, and this tool intentionally covers a smaller, verified set of well-known manufacturers rather than guessing at less certain prefixes. For exhaustive coverage, the official IEEE OUI registry (linked when a prefix isn't found) has the complete authoritative list.",
    },
    {
      question: "What is an OUI exactly?",
      answer:
        "An OUI (Organizationally Unique Identifier) is the first three octets (24 bits) of a MAC address, officially assigned by the IEEE to a specific hardware manufacturer. Every network device that manufacturer produces uses that same prefix, followed by a unique identifier for that specific device.",
    },
    {
      question: "Can a MAC address be changed or spoofed?",
      answer:
        "Yes — while every network device ships with a hardware-assigned MAC address, most operating systems allow it to be manually overridden ('spoofed') at the software level, which some privacy tools and network utilities do deliberately. A vendor lookup on a spoofed address will show whatever vendor the spoofed prefix belongs to, not the device's actual manufacturer.",
    },
    {
      question: "Why do some newer devices show a 'randomized' vendor or no match?",
      answer:
        "Many modern phones and laptops use MAC address randomization for Wi-Fi privacy — generating a random, locally-administered address instead of their real hardware address when scanning for or connecting to networks, specifically to prevent tracking by MAC address across locations.",
    },
    {
      question: "Where can I find every MAC address prefix, including obscure ones?",
      answer:
        "The official IEEE OUI registry (standards-oui.ieee.org) is the authoritative, complete source for every officially assigned prefix — this tool links directly to it whenever a prefix isn't in our curated common-vendor list.",
    },
  ],
};

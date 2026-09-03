import type { ToolContent } from "./types";

export const ipAddressLookupContent: ToolContent = {
  heroSubtitle: "Find the Location and ISP Behind Any IP Address",
  overview: [
    "Every device connected to the internet is reachable through an IP address, and that address carries some publicly available information — roughly which city or region it's registered to, which internet service provider or hosting company owns it, and what organization it's associated with. This is standard, publicly available network registration data, not anything private or hidden.",
    "This tool looks up any IPv4 or IPv6 address and returns its approximate geographic location (city, region, country), the internet service provider or hosting company it belongs to, the owning organization, and the local timezone — all pulled from public IP geolocation registries.",
    "IP-based geolocation is approximate, not precise — it typically identifies the correct city or metro region, but almost never the exact street address, since it's based on how ISPs and hosting providers register IP address blocks, not on any GPS or device-level tracking. Mobile connections and VPNs in particular can show a location quite far from the device's actual physical location.",
    "This is useful for investigating suspicious traffic in server logs, checking where a hosting server is physically located, verifying which ISP a connection is coming from, general network troubleshooting, and satisfying curiosity about where an IP address traces back to.",
  ],
  howItWorks: [
    {
      title: "Enter an IP address",
      description: "Any public IPv4 or IPv6 address.",
    },
    {
      title: "Click Lookup",
      description: "The address is checked against public IP geolocation data.",
    },
    {
      title: "Review location and network details",
      description: "City, region, country, ISP, organization, and timezone are shown.",
    },
  ],
  examples: [
    {
      label: "Looking up a public DNS server",
      input: "8.8.8.8",
      output: "Ashburn, Virginia, United States — ISP: Google LLC",
    },
  ],
  faqs: [
    {
      question: "How accurate is the location shown?",
      answer:
        "It's usually accurate down to the correct city or metro region, since IP geolocation is based on how address blocks are registered to ISPs and hosting providers — but it's not GPS-level precision and won't point to an exact street address or building.",
    },
    {
      question: "Why does a mobile IP show a location I've never been to?",
      answer:
        "Mobile carriers often route traffic through regional gateways that can be registered far from your actual physical location, so a mobile connection's IP geolocation is frequently less accurate than a home broadband connection's.",
    },
    {
      question: "Can this identify a specific person behind an IP address?",
      answer:
        "No — it only shows publicly registered network information (approximate location, ISP, organization). Identifying an actual individual behind an IP address requires a legal request to the ISP, which only law enforcement or courts can typically compel.",
    },
    {
      question: "Why does looking up my own IP show my ISP's city, not my actual city?",
      answer:
        "Home internet connections are usually geolocated to wherever the ISP's regional infrastructure is registered, which can be a nearby major city rather than your exact town — this is expected behavior, not an error.",
    },
    {
      question: "Does a VPN change what this tool shows?",
      answer:
        "Yes — looking up your IP while connected to a VPN shows the VPN server's location and provider, not your real location, which is exactly the privacy behavior a VPN is designed to provide.",
    },
  ],
};

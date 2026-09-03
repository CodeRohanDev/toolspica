import type { ToolContent } from "./types";

export const sslCertificateCheckerContent: ToolContent = {
  heroSubtitle: "Check Any Website's SSL/TLS Certificate Details",
  overview: [
    "SSL/TLS certificates are what make the padlock icon appear in a browser's address bar — they encrypt traffic between a visitor and a server and cryptographically prove the server is who it claims to be. An expired or misconfigured certificate triggers scary browser warnings that drive visitors away instantly, making certificate monitoring a genuinely important (if easy to forget) maintenance task.",
    "This tool connects directly to a domain's HTTPS port and reads its live certificate, showing who it was issued to, which certificate authority issued it, its validity period and days remaining before expiry, its serial number and SHA-256 fingerprint, and every additional domain name it covers (its Subject Alternative Names).",
    "The single most useful number here is days remaining until expiry — certificates typically run on 90-day (Let's Encrypt) or 1-year (many commercial CAs) cycles, and letting one lapse unexpectedly causes an immediate, visible outage for every visitor, since browsers refuse to load sites with expired certificates.",
    "This is useful for monitoring certificate expiry before it causes an outage, verifying a certificate renewal actually took effect, confirming which domains a wildcard or multi-domain certificate covers, checking which certificate authority issued a certificate, and general SSL/TLS troubleshooting.",
  ],
  howItWorks: [
    {
      title: "Enter a domain name",
      description: "Any HTTPS-enabled website, without http:// or a path.",
    },
    {
      title: "Click Check certificate",
      description: "A live TLS connection is made to read the current certificate.",
    },
    {
      title: "Review validity and details",
      description: "Expiry countdown, issuer, subject, and fingerprint are all shown.",
    },
  ],
  examples: [
    {
      label: "Checking a certificate close to renewal",
      input: "example.com",
      output: "Valid — expires in 56 days, issued by a recognized certificate authority",
    },
  ],
  faqs: [
    {
      question: "What happens when a certificate expires?",
      answer:
        "Every browser will refuse to load the site normally, instead showing a prominent security warning that most visitors won't click through — an expired certificate is effectively a full site outage for HTTPS traffic, which is why monitoring days-remaining matters.",
    },
    {
      question: "What's the difference between the 'issued to' and 'issued by' fields?",
      answer:
        "'Issued to' (the certificate's subject) is the domain the certificate secures. 'Issued by' (the issuer) is the certificate authority that verified the domain and signed the certificate — commonly Let's Encrypt, DigiCert, Sectigo, or similar trusted authorities.",
    },
    {
      question: "What are Subject Alternative Names (SANs)?",
      answer:
        "SANs list every additional domain or subdomain a single certificate covers beyond its primary subject — a certificate for example.com might also list www.example.com and *.example.com as SANs, letting one certificate secure multiple hostnames at once.",
    },
    {
      question: "Why would a certificate check fail even though the site loads fine in my browser?",
      answer:
        "This tool connects directly on port 443 to read the certificate — if the actual site runs on a non-standard port, sits behind certain reverse proxies, or requires SNI configuration this tool doesn't have visibility into, the direct check can fail even when normal browser access works.",
    },
    {
      question: "What's the SHA-256 fingerprint used for?",
      answer:
        "It's a unique cryptographic hash of the certificate, useful for verifying that two systems are seeing the exact same certificate (helpful when debugging certificate pinning or confirming a renewal actually propagated everywhere) rather than a stale cached version.",
    },
  ],
};

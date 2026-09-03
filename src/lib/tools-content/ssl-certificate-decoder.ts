import type { ToolContent } from "./types";

export const sslCertificateDecoderContent: ToolContent = {
  heroSubtitle: "Decode Any PEM SSL Certificate's Fields",
  overview: [
    "An SSL/TLS certificate is a structured binary document (encoded in a format called ASN.1 DER) that gets Base64-encoded and wrapped in `-----BEGIN CERTIFICATE-----` markers to make it text-safe — this is the PEM format most certificates are shared and stored in. Underneath that text wrapping is a precise, standardized structure defined by the X.509 specification (RFC 5280).",
    "This tool parses that structure directly — implementing an ASN.1 DER decoder from scratch and walking the X.509 certificate schema — to extract and display the fields in readable form: subject, issuer, validity dates with a days-remaining countdown, serial number, signature algorithm, and every domain covered by the certificate's Subject Alternative Names. The parser has been verified field-for-field against real certificates using `openssl x509 -text` as ground truth.",
    "This complements this site's SSL Certificate Checker tool, which fetches a certificate live from a domain over the network — this tool instead decodes a certificate you already have as PEM text, whether that's from a downloaded `.crt` file, a certificate signing request response, or text copied from another system, entirely client-side.",
    "This is useful for inspecting a certificate file before installing it on a server, verifying a certificate's Subject Alternative Names cover the domains you expect, checking a certificate's expiry date without connecting to the live server, and general certificate debugging and X.509 learning.",
  ],
  howItWorks: [
    {
      title: "Paste a PEM certificate",
      description: "Including the -----BEGIN CERTIFICATE----- and -----END CERTIFICATE----- lines.",
    },
    {
      title: "Click Decode certificate",
      description: "The certificate is parsed entirely in your browser.",
    },
    {
      title: "Review every field",
      description: "Subject, issuer, validity, serial number, and covered domains.",
    },
  ],
  examples: [
    {
      label: "Decoding a certificate file",
      input: "A PEM-formatted certificate pasted from a .crt file",
      output: "Subject, issuer, validity dates with days-remaining, and all covered domains",
    },
  ],
  faqs: [
    {
      question: "Is my certificate uploaded anywhere to decode it?",
      answer:
        "No — the entire ASN.1/X.509 parsing happens locally in your browser using JavaScript. The certificate text you paste is never sent to a server, which matters since certificate files can sometimes reveal internal server naming conventions worth keeping private.",
    },
    {
      question: "What's the difference between this and the SSL Certificate Checker tool?",
      answer:
        "The SSL Certificate Checker connects live to a domain over the network and reads whatever certificate that server currently presents. This decoder instead works from a PEM certificate you already have as text — useful when you have a certificate file but no live server to check, or want to inspect it before deployment.",
    },
    {
      question: "Can this decode a private key or a CSR file too?",
      answer:
        "No — it's specifically built to parse the X.509 certificate structure. Private keys and Certificate Signing Requests use related but structurally different ASN.1 schemas, which this tool doesn't currently handle.",
    },
    {
      question: "What does 'Subject Alternative Names' mean?",
      answer:
        "It's the list of every domain name a single certificate is valid for — many certificates cover multiple domains or a wildcard pattern (like *.example.com) under one certificate, and this field lists all of them, not just the primary subject.",
    },
    {
      question: "How accurate is this parser?",
      answer:
        "It's been verified field-by-field against real certificates using OpenSSL's own certificate parser as ground truth — subject, issuer, validity dates, serial number, signature algorithm, and Subject Alternative Names all matched exactly across multiple real-world test certificates before this tool shipped.",
    },
  ],
};

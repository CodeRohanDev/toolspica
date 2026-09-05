import type { ToolContent } from "./types";

export const certificateChainViewerContent: ToolContent = {
  heroSubtitle: "Inspect Every Certificate in an SSL Chain",
  overview: [
    "A real-world SSL certificate rarely stands alone — it's typically bundled with one or more intermediate certificates linking it back to a trusted root, and diagnosing a \"chain incomplete\" or trust error often requires looking at every certificate in that chain individually, not just the leaf certificate a server presents.",
    "This tool takes a full certificate chain — multiple PEM-encoded certificates pasted one after another, the way a server's full chain bundle is typically formatted — and parses each one individually, showing its subject, issuer, validity dates, and serial number, clearly labeled as the leaf, intermediate, or root certificate based on its position.",
    "This is especially useful for confirming a chain is actually complete and in the correct order — the leaf certificate's issuer should match the next certificate's subject, all the way up the chain, and a broken link in that sequence is often exactly what causes browsers or clients to report a trust error.",
  ],
  howItWorks: [
    { title: "Paste the full certificate chain", description: "Paste the server certificate followed by any intermediate certificates." },
    { title: "Review each certificate", description: "See subject, issuer, and validity dates for every link in the chain." },
    { title: "Check the chain order", description: "Confirm each certificate's issuer matches the next one's subject." },
  ],
  examples: [
    {
      label: "Two-certificate chain",
      input: "A leaf certificate followed by its intermediate CA certificate",
      output: "Two entries shown: \"Leaf certificate\" and \"Intermediate 1,\" each with subject and issuer detail.",
    },
  ],
  faqs: [
    {
      question: "How do I get a server's full certificate chain?",
      answer:
        "Most certificate authorities provide a \"full chain\" or \"CA bundle\" file alongside your issued certificate — or you can retrieve the chain directly from a live server using a tool like `openssl s_client -connect host:443 -showcerts`.",
    },
    {
      question: "What does it mean if the chain order looks wrong?",
      answer:
        "Each certificate's issuer should match the subject of the certificate immediately after it in the chain — if that doesn't line up, the chain is likely out of order or missing an intermediate certificate, a common cause of trust errors.",
    },
    {
      question: "Does this validate that the chain is trusted by browsers?",
      answer:
        "No — this parses and displays each certificate's fields for inspection, but doesn't perform full trust validation against a browser's or OS's root certificate store.",
    },
    {
      question: "Is my certificate data sent anywhere?",
      answer:
        "No — certificates are parsed entirely in your browser. Nothing you paste is uploaded or stored. Certificates are public data by design, but parsing still happens locally.",
    },
  ],
};

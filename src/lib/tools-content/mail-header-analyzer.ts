import type { ToolContent } from "./types";

export const mailHeaderAnalyzerContent: ToolContent = {
  heroSubtitle: "Analyze Raw Email Headers to Trace Delivery and Spot Spoofing",
  overview: [
    "Every email carries hidden technical headers alongside the visible subject and body — sender and recipient addresses, a unique message ID, and critically, a \"Received\" line added by every mail server the message passed through on its way to your inbox. These headers are normally hidden by your email client, but viewing them (via \"Show Original\" in Gmail or \"View Source\" in Outlook) reveals the full delivery path and can help spot spoofed or suspicious emails.",
    "This tool parses raw email headers pasted directly from your email client and extracts the key fields (From, To, Subject, Date, Return-Path, Message-ID) into a readable summary, then walks through every \"Received\" line to reconstruct the delivery path — which server the message came from, which server received it, and when — in order from most recent to oldest.",
    "A mismatch between the visible \"From\" address and the actual sending server in the earliest \"Received\" line is one of the classic signs of a spoofed phishing email, since legitimate senders' infrastructure is generally consistent with their claimed domain. This tool surfaces that delivery path clearly, but interpreting whether a specific hop looks suspicious still requires some judgment about what's normal for the sender in question.",
  ],
  howItWorks: [
    { title: "Get the raw headers", description: "In Gmail, use \"Show Original\"; in Outlook, use \"View Source\" or the message properties." },
    { title: "Paste the headers", description: "Paste the full raw header block into the text box." },
    { title: "Review the summary and delivery path", description: "See key fields and the full server-to-server hop sequence." },
  ],
  examples: [
    {
      label: "Sample header line",
      input: "Received: from mail.example.com by mx.google.com; Mon, 1 Jan 2026 10:00:00 -0500",
      output: "Hop: mail.example.com → mx.google.com at Mon, 1 Jan 2026 10:00:00 -0500",
    },
  ],
  faqs: [
    {
      question: "How do I get the raw headers from my email?",
      answer:
        "In Gmail, open the email, click the three-dot menu, and choose \"Show original.\" In Outlook, open the message, go to File > Properties, and look at the Internet headers box. Copy the full text from there.",
    },
    {
      question: "What does a mismatched delivery path suggest?",
      answer:
        "If the earliest \"Received\" hop shows a server that doesn't match the claimed sender's usual domain or infrastructure, that's a classic sign of a spoofed or phishing email — legitimate senders typically show consistent, recognizable sending infrastructure.",
    },
    {
      question: "Why do some emails have many more hops than others?",
      answer:
        "Every mail server the message passes through (sender's outgoing server, spam filters, forwarding services, the recipient's incoming server) adds its own Received line, so emails routed through more infrastructure naturally show more hops.",
    },
    {
      question: "Are the pasted headers sent anywhere?",
      answer:
        "No — headers are parsed entirely in your browser using JavaScript. Nothing you paste is uploaded or stored.",
    },
  ],
};

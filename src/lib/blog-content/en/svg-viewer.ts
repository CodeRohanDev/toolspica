import type { BlogPost } from "@/lib/blog/types";

export const post: BlogPost = {
  toolSlug: "svg-viewer",
  lang: "en",
  title: "Why You Shouldn't Open a Random SVG File Directly in Your Browser",
  description: "SVG can carry embedded scripts. Here's a safer way to preview SVG markup instantly without that risk, while hand-editing code.",
  sections: [
    {
      heading: "SVG is markup, not just a picture format",
      body: [
        "It's easy to treat an SVG file like any other image, but it's fundamentally different from a JPG or PNG: it's XML markup that a browser interprets and renders, similar to HTML. That means an SVG file can contain more than just shapes and paths — it can embed `<script>` tags and event handlers, same as a webpage can. Most SVGs you'll encounter are harmless graphics, but the format technically allows for active content, which matters the moment you're opening a file from somewhere you don't fully trust.",
        "This is exactly why directly opening an unfamiliar SVG file, or pasting its raw markup straight into a live page, isn't automatically as safe as it feels — you're not just displaying an image, you're potentially executing code.",
      ],
    },
    {
      heading: "The instant-preview problem when you're hand-editing SVG",
      body: [
        "SVG's other defining trait is that it's genuinely human-readable and hand-editable text — you can tweak a path coordinate or a fill color directly in the code without opening a design tool. The friction is confirming your edit actually looks right: the traditional loop is save the file, switch to a browser or image viewer, look, switch back, repeat — slow for something that should be immediate feedback.",
        "A live preview pane solves this directly: paste or type SVG markup and see it rendered instantly, side by side with the code, updating on every keystroke rather than requiring a save-and-reopen cycle.",
      ],
    },
    {
      heading: "What a sandboxed preview actually buys you",
      body: [
        "A properly sandboxed preview frame is what makes the previous point safe rather than theoretical: it renders the visual output of your SVG markup while specifically blocking any embedded scripts or event handlers from executing. This means you can paste SVG markup from an unfamiliar source — a file someone sent you, something copied from a random site — and see exactly what it looks like without any risk to your browser session, which isn't true if you just open the file directly or embed it in a live page without that isolation.",
        "This distinction matters more the more places you get SVG files from — icon libraries, design exports, files shared in a group chat — since you rarely know for certain how a given file was produced or whether it's been tampered with.",
      ],
    },
    {
      heading: "Checking your work without a design tool",
      body: [
        "Beyond safety, a live preview is genuinely useful just for checking your own hand-written or hand-edited SVG makes visual sense — confirming a viewBox is set correctly, that a path closes where you expect, or that a gradient definition is actually being referenced correctly by the shape using it. Small SVG bugs (a missing closing tag, a typo'd attribute) are often invisible just reading the code, but immediately obvious the moment you see it rendered.",
      ],
    },
  ],
  faqs: [
    {
      question: "Is it actually safe to preview SVG code from a source I don't fully trust?",
      answer: "Yes, when the preview renders inside a fully sandboxed frame that blocks embedded scripts and event handlers from executing — that isolation is exactly what makes previewing untrusted SVG markup safe, unlike opening it directly in a way that could let embedded code run.",
    },
    {
      question: "Why is my SVG showing as invalid in the preview?",
      answer: "The markup needs to be well-formed XML with an <svg> root element — a common cause is an unclosed tag or a missing root element, both worth checking first if the preview shows an error.",
    },
    {
      question: "Can this tell me my SVG's exact file size?",
      answer: "Not directly, but the element count gives a reasonable proxy for complexity — a much higher element count is typically correlated with a larger file size, even without an exact byte count.",
    },
  ],
};

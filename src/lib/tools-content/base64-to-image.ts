import type { ToolContent } from "./types";

export const base64ToImageContent: ToolContent = {
  overview: [
    "This tool reverses Base64 image encoding: paste in a Base64 string or a complete data URI, and it decodes and renders the actual image, ready to preview and download as a normal file again. You'll need this whenever you encounter an image embedded as Base64 text — inside a CSS file, a JSON API response, an email's HTML source, or a piece of code — and need to extract and view or save it as a standalone image file.",
    "The tool accepts input in either form: a full data URI starting with `data:image/png;base64,...` (which includes the MIME type, so the tool knows exactly what kind of image it is), or just the raw Base64 characters on their own, in which case it assumes PNG format as a reasonable default. If your raw Base64 string actually represents a different format (like JPEG), pasting it as a full data URI with the correct MIME type prefix will produce a more accurate result and filename extension.",
    "As soon as valid image data is detected, a live preview renders automatically — this is a genuinely useful sanity check, confirming the Base64 string is complete, correctly formatted, and actually represents a valid image before you commit to using it anywhere. If the string is truncated, corrupted, or simply isn't valid image data, the tool tells you clearly rather than showing a broken or blank result.",
    "Once decoded, the image can be downloaded as a standalone file, with the tool automatically detecting the correct file extension from the data URI's MIME type where available. This closes the loop with the Image to Base64 tool — encode an image to Base64 for embedding, and decode it back to a real file whenever you need the original image again.",
  ],
  howItWorks: [
    { title: "Paste your Base64 string or data URI", description: "Enter the encoded image text, with or without the data: prefix." },
    { title: "Preview renders automatically", description: "A valid image decodes and displays instantly as you paste." },
    { title: "Download the image", description: "Save the decoded result as a standalone image file." },
  ],
  examples: [
    { label: "Decoding a data URI", input: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA...", output: "A rendered PNG image, ready to download" },
  ],
  faqs: [
    { question: "Why does it say it can't decode my Base64 string?", answer: "This usually means the string is incomplete (truncated when copied), contains characters that aren't valid Base64, or simply isn't image data at all. Double-check that you copied the entire string without any missing characters." },
    { question: "Do I need to include the 'data:image/png;base64,' prefix?", answer: "It's recommended but not required — if you paste raw Base64 characters without a prefix, the tool assumes PNG format. Including the correct prefix (matching your image's actual format, like image/jpeg) ensures the decoded file gets the correct extension and is interpreted correctly." },
    { question: "What image formats does this support?", answer: "Any format your browser can natively decode — PNG, JPEG, WebP, GIF, and others — as long as the data URI's MIME type (or the assumed PNG default) matches what the underlying data actually represents." },
    { question: "Is it safe to paste Base64 data from an untrusted source?", answer: "The decoding and rendering happen entirely within your own browser using standard image-loading APIs, the same way any image on any webpage is rendered — no data is sent to a server, though as with any file from an untrusted source, exercise the same general caution you would with any downloaded content." },
    { question: "Can I decode a Base64 string representing something other than an image, like a PDF?", answer: "No — this tool specifically expects and validates image data. For decoding Base64 representing other file types, you'd need a more general-purpose Base64 decoder rather than one built specifically for image rendering." },
  ],
};

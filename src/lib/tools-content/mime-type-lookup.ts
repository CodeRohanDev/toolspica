import type { ToolContent } from "./types";

export const mimeTypeLookupContent: ToolContent = {
  overview: [
    "A MIME type (also called a media type or content type) is a standardized string that tells a browser, email client, or server exactly what kind of data a file contains — independent of the file's name or extension — so the receiving system knows how to handle it. When a server sends an image, it includes a `Content-Type: image/png` header; when a browser receives that header, it knows to render the bytes as an image rather than trying to display them as text, regardless of what the file happened to be named.",
    "This matters constantly in web development: setting the correct `Content-Type` header when serving a file from a custom server or API, configuring file upload validation to accept or reject specific MIME types rather than trusting a file's extension (which is trivial to fake), setting the `accept` attribute on an HTML file input to restrict what a user can select, or simply understanding what MIME type corresponds to a file extension you're working with.",
    "This reference covers the MIME types you'll encounter most often in everyday web and application development: common document formats (HTML, CSS, JavaScript, JSON, PDF), image formats (PNG, JPEG, SVG, WebP), audio and video formats (MP3, MP4, WebM), fonts (WOFF, WOFF2, TTF), and Microsoft Office formats (the modern XML-based `.docx`/`.xlsx` types alongside their older `.doc`/`.xls` equivalents), plus the two form-submission content types (`application/x-www-form-urlencoded` and `multipart/form-data`) that every web developer eventually needs to know the difference between.",
    "Search by either the file extension or a keyword from the MIME type itself — searching \"image\" surfaces every image format at once, which is useful when you're not sure of the exact extension but know the general category of file you're working with.",
  ],
  howItWorks: [
    {
      title: "Search by extension or type",
      description: "Type a file extension (like .png) or a keyword (like \"image\").",
    },
    {
      title: "Copy the MIME type",
      description: "Click the copy icon next to any result to grab the exact MIME type string.",
    },
  ],
  examples: [
    {
      label: "Looking up .svg",
      input: ".svg",
      output: "image/svg+xml",
    },
  ],
  faqs: [
    {
      question: "Why can't I just trust a file's extension to know its type?",
      answer:
        "A file's extension is just part of its name and can be changed or faked trivially — a malicious file could be renamed to `.jpg` while actually containing executable code. The MIME type sent in an HTTP header (or detected by inspecting the actual file content) is a more reliable, though still not foolproof, signal of what a file actually is.",
    },
    {
      question: "What's the difference between .jpg and .jpeg?",
      answer:
        "They're just two common extensions for the exact same file format and share the same MIME type, `image/jpeg` — the shorter `.jpg` exists mainly for historical compatibility with older systems that only supported 3-character file extensions.",
    },
    {
      question: "What's the difference between application/x-www-form-urlencoded and multipart/form-data?",
      answer:
        "`application/x-www-form-urlencoded` encodes form fields as URL-style key-value pairs in the request body — fine for simple text fields, but it can't handle file uploads. `multipart/form-data` splits the request into distinct parts, which is required whenever a form includes a file input.",
    },
    {
      question: "Why does .docx have such a long MIME type?",
      answer:
        "Modern Office formats (.docx, .xlsx, .pptx) are actually ZIP archives containing XML files internally, and their MIME types (following the OOXML/Open Packaging Conventions standard) explicitly reflect that structure — hence the long `application/vnd.openxmlformats-officedocument...` string, compared to the much shorter legacy `.doc` MIME type from before that format existed.",
    },
    {
      question: "How do I set the correct MIME type when serving files from my own server?",
      answer:
        "Most web servers and frameworks (Express, Nginx, Apache) automatically set the correct `Content-Type` header based on the file extension using a built-in MIME type mapping — you typically only need to set it manually for custom API responses or unusual file types not in the server's default mapping.",
    },
  ],
};

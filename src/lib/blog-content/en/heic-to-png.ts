import type { BlogPost } from "@/lib/blog/types";

export const post: BlogPost = {
  toolSlug: "heic-to-png",
  lang: "en",
  title: "HEIC to PNG: When You Actually Need Lossless Output",
  description:
    "Most HEIC conversions default to JPG, but PNG is the right call for editing or archiving. Here's when to pick it, and the file-size trade-off.",
  sections: [
    {
      heading: "Why JPG isn't always the right target",
      body: [
        "Most guides about converting iPhone HEIC photos jump straight to JPG, and for everyday sharing that's the right call. But JPG re-compresses your photo with lossy encoding — fine for posting online, not ideal if the image is headed into a photo editor, a design project, or anything where every pixel of the original decode matters and you don't want another layer of compression stacked on top.",
        "PNG is the format for exactly that case: it's lossless, meaning once the HEIC is decoded, nothing further is discarded when it's saved.",
      ],
    },
    {
      heading: "What \"lossless\" actually buys you here",
      body: [
        "The moment you convert a HEIC, you're already doing one lossy step in some sense — HEIC's own compression already happened at the moment the photo was taken. Converting to PNG doesn't undo that, but it guarantees no additional compression gets layered on top during the conversion itself. Convert the same photo to JPG instead, and you're adding a second round of lossy compression on top of the first.",
        "For a photo you're about to retouch, crop precisely, or use as a base layer in a design tool, avoiding that second compression pass matters — small JPEG artifacts can become more visible after further edits like sharpening or heavy color adjustment.",
      ],
    },
    {
      heading: "The file size you're trading for that",
      body: [
        "PNG's losslessness isn't free — a PNG of a decoded HEIC photo will typically be noticeably larger than the equivalent JPG, sometimes several times the size, since you're keeping all the pixel data HEIC's efficient compression originally discarded room for. For a single photo this rarely matters; for a batch of dozens of high-resolution images, the size difference adds up fast.",
        "If you're unsure which to pick: ask whether the image is a final deliverable for viewing (JPG is fine) or working material that's going through more editing steps (PNG protects that work).",
      ],
    },
    {
      heading: "The same primary-image detail applies here too",
      body: [
        "Like any HEIC conversion, it's worth knowing that an iPhone HEIC file often contains more than just your photo — a smaller embedded thumbnail typically rides along inside the same file for quick previews. A correct converter extracts the full-resolution primary image rather than that thumbnail, so the resulting PNG should match your camera's actual capture resolution.",
      ],
    },
  ],
  faqs: [
    {
      question: "Should I always use PNG instead of JPG when converting HEIC photos?",
      answer:
        "Not always — PNG is the better choice specifically when you need lossless output for further editing. For everyday sharing and viewing, JPG's much smaller file size with negligible visible quality loss is usually the more practical choice.",
    },
    {
      question: "Why is my converted PNG so much bigger than the original HEIC file?",
      answer:
        "HEIC uses highly efficient compression; PNG preserves every decoded pixel exactly without that level of compression, so a meaningfully larger file size is expected — it's not a sign anything went wrong.",
    },
    {
      question: "Does converting HEIC to PNG happen locally, or does my photo get uploaded?",
      answer:
        "With a browser-based converter using WebAssembly decoding, everything happens locally on your device — the photo doesn't need to be uploaded anywhere to be converted.",
    },
  ],
};

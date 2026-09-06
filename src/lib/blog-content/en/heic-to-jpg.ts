import type { BlogPost } from "@/lib/blog/types";

export const post: BlogPost = {
  toolSlug: "heic-to-jpg",
  lang: "en",
  title: "Why Your iPhone Photos Won't Open on Windows (And the Fix)",
  description:
    "iPhone photos save as HEIC by default, and most of Windows can't open them. Here's why, and how to convert them to JPG in seconds.",
  sections: [
    {
      heading: "The moment this problem shows up",
      body: [
        "It usually happens the same way: you AirDrop or email a photo from an iPhone to a Windows laptop, double-click it, and get an error or a broken thumbnail instead of your picture. Nothing is actually wrong with the photo — it's saved as HEIC, the format iPhones have used by default since iOS 11, and a large chunk of everyday software simply doesn't know how to open it.",
        "Websites are often worse than desktop apps here: try uploading a HEIC photo to an online form, a job application, or an e-commerce listing, and it frequently gets silently rejected or shows as a broken image, because neither Chrome nor Firefox can render HEIC natively no matter how modern the browser is.",
      ],
    },
    {
      heading: "Why HEIC exists if it causes this much friction",
      body: [
        "HEIC isn't a mistake Apple made — it genuinely compresses photos better than JPEG at the same visual quality, which is why Apple made it the default: it saves real storage space across millions of photos per user. The trade-off is compatibility, since HEIC uses HEVC-based compression that older software and most of the non-Apple world never adopted.",
        "Converting to JPG isn't a downgrade in any meaningful sense for sharing purposes — JPG is simply the format everything accepts, at the cost of a slightly larger file than the original HEIC.",
      ],
    },
    {
      heading: "What actually happens during conversion",
      body: [
        "A proper HEIC-to-JPG converter has to genuinely decode the HEIC's HEVC-based image data — there's no shortcut or approximation possible, since a browser can't fall back to any native support the way it might for an unusual video codec. That means the conversion tool needs an actual decoder built for the format, running the real decompression algorithm against your photo's pixel data.",
        "One detail worth knowing: a HEIC file from an iPhone often bundles more than one image internally — the full photo plus a smaller embedded thumbnail used for quick previews. A correct converter extracts the full-resolution primary image, not the low-quality thumbnail, so check the output dimensions match your camera's actual resolution if you're ever unsure.",
      ],
    },
    {
      heading: "When to convert, and what you lose doing it",
      body: [
        "If you're only ever viewing photos on your own iPhone, Mac, or recent iOS/macOS software, there's no need to convert anything — HEIC works fine natively across Apple's own ecosystem. Convert specifically when a photo needs to go somewhere HEIC isn't guaranteed to work: a Windows PC, an Android phone, most websites, or software that predates broad HEIC support.",
        "The main trade-off converting to JPG is file size — JPG at high quality is usually somewhat larger than the equivalent HEIC, since you're moving from a more efficient codec to a less efficient (but universally compatible) one. For a handful of photos this is irrelevant; for bulk photo library exports it can add up.",
      ],
    },
  ],
  faqs: [
    {
      question: "Is there a way to make my iPhone save photos as JPG instead of HEIC directly?",
      answer:
        "Yes — in iPhone Settings, under Camera > Formats, switching to \"Most Compatible\" saves new photos as JPG going forward. This doesn't affect photos already saved as HEIC, which still need converting individually.",
    },
    {
      question: "Does converting HEIC to JPG upload my photo anywhere?",
      answer:
        "Not with a browser-based converter that decodes locally using WebAssembly — the actual HEIC decompression happens on your device, and the photo never needs to leave it to become a JPG.",
    },
    {
      question: "Will the converted JPG look noticeably different from the original HEIC?",
      answer:
        "At a high JPEG quality setting, the difference is minimal and not visually noticeable for typical photos — some quality loss is inherent to converting between any two formats with different compression approaches, but it's not something you'd spot without pixel-level comparison.",
    },
  ],
};

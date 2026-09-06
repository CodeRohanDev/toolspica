import type { BlogPost } from "@/lib/blog/types";

export const post: BlogPost = {
  toolSlug: "tiff-to-jpg",
  lang: "en",
  title: "Why a TIFF File Won't Open in Your Browser (And What to Do About It)",
  description:
    "TIFF is common in scanning and print workflows, but no browser can display it natively. Here's why, and how to convert it to a JPG that opens anywhere.",
  sections: [
    {
      heading: "The scanned file that just won't open",
      body: [
        "You receive a scanned document or a professional photo file, double-click it or drag it into a browser tab expecting a preview, and nothing happens — or the browser tries to download it instead of showing it. Check the extension and it's usually .tiff or .tif, a format that's completely standard in scanning and print workflows but has one specific gap: no major browser has ever added native TIFF support, unlike JPEG, PNG, WebP, and even the newer AVIF format.",
        "This isn't a corrupted file or a bug on your end — it's simply a format the web was never built to display directly.",
      ],
    },
    {
      heading: "Where TIFF actually comes from",
      body: [
        "TIFF didn't disappear from professional workflows — it's still the default output for many document scanners, and it remains popular in professional photography and print production because it can store images losslessly at very high quality, without JPEG's compression artifacts. That makes it the right internal working format for a print shop or a professional photographer, but the wrong format to hand to someone who just needs to view or share the file normally.",
        "So the file you've received isn't wrong — it's just meant for a different stage of a workflow than \"open it and look at it in a browser.\"",
      ],
    },
    {
      heading: "What actually has to happen to convert it",
      body: [
        "Since browsers can't decode TIFF, converting it requires a dedicated TIFF parser that reads the format's internal structure directly rather than relying on any built-in browser image support. TIFF files can also use different internal compression schemes — some are stored uncompressed, others use PackBits or LZW compression — and a converter needs to specifically understand whichever scheme a given file actually uses.",
        "The two most common cases — uncompressed and PackBits-compressed TIFF, which cover the overwhelming majority of scanner and standard image-editing software output — convert cleanly. Less common schemes like LZW compression are a different, more complex case that not every browser-based converter handles.",
      ],
    },
    {
      heading: "What a clear error message actually means here",
      body: [
        "If a TIFF-to-JPG conversion fails with a message about unsupported compression, that's not a sign of a broken tool — it means the specific file uses an internal compression scheme the converter doesn't decode. A well-built converter reports this clearly rather than guessing and producing a corrupted or visually wrong image, which matters because a silently wrong image is worse than an honest failure you can act on (like re-exporting the TIFF with different settings from whatever produced it).",
      ],
    },
  ],
  faqs: [
    {
      question: "Why doesn't my browser just open TIFF files like it opens JPG or PNG?",
      answer:
        "No major browser has ever added native TIFF decoding — it simply was never included in the standard set of web image formats, unlike JPEG, PNG, WebP, and AVIF, all of which browsers support directly.",
    },
    {
      question: "What does an 'unsupported compression' error mean?",
      answer:
        "It means your specific TIFF file uses a compression scheme (such as LZW) the converter doesn't currently decode. This is reported clearly rather than risking a corrupted or wrong-looking output image.",
    },
    {
      question: "Will converting from TIFF to JPG lose quality?",
      answer:
        "TIFF is typically stored losslessly while JPG uses lossy compression, so there's some inherent trade-off — using a high quality setting (95% or above) keeps that loss minimal and generally invisible for normal viewing and sharing purposes.",
    },
  ],
};

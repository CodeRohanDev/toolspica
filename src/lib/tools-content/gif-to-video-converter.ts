import type { ToolContent } from "./types";

export const gifToVideoConverterContent: ToolContent = {
  heroSubtitle: "Convert an Animated GIF into an MP4 Video",
  overview: [
    "GIF is a genuinely inefficient format for anything beyond a few seconds of simple animation — the same visual content stored as a real video codec is often a fraction of the file size, and many platforms (Instagram, Twitter/X, most video players) actually convert uploaded GIFs to video internally anyway, since video compresses so much better.",
    "This tool converts an animated GIF into a standard MP4 video file, using efficient video compression instead of GIF's frame-by-frame storage — typically producing a dramatically smaller file with visually identical playback, especially for longer or higher-resolution GIFs.",
    "The output is a standard, widely-compatible MP4 that plays correctly in any video player, browser, or platform that accepts video uploads. Processing runs through FFmpeg compiled to WebAssembly directly in your browser, so the conversion happens locally with no upload wait.",
  ],
  howItWorks: [
    { title: "Upload your GIF", description: "Choose the animated GIF you want to convert." },
    { title: "Convert to MP4", description: "The GIF's frames are re-encoded using efficient video compression." },
    { title: "Download the MP4", description: "Get a much smaller video file with the same visual content." },
  ],
  examples: [
    {
      label: "Typical size reduction",
      input: "A 15 MB animated GIF",
      output: "A visually identical MP4, often under 2 MB depending on content and resolution.",
    },
  ],
  faqs: [
    {
      question: "Why is the MP4 so much smaller than the original GIF?",
      answer:
        "Video codecs like H.264 use much more sophisticated compression than GIF's simple frame-based format, especially for animations with gradual motion — GIF re-stores far more redundant data per frame.",
    },
    {
      question: "Does the video loop automatically like the GIF did?",
      answer:
        "The MP4 file itself doesn't loop automatically — that depends on the video player or platform it's uploaded to; many platforms (like Twitter/X) do loop short videos automatically the same way they loop GIFs.",
    },
    {
      question: "Does converting to MP4 lose any visual quality?",
      answer:
        "Any loss is generally imperceptible for typical GIF content — video compression is far more capable than GIF's own format, so the visual result looks the same or better at a fraction of the size.",
    },
    {
      question: "Is my GIF uploaded to a server?",
      answer:
        "No — the conversion happens entirely in your browser using WebAssembly. Nothing is uploaded anywhere.",
    },
  ],
};

import type { BlogPost } from "@/lib/blog/types";

export const post: BlogPost = {
  toolSlug: "photo-filters",
  lang: "en",
  title: "Sepia, Vintage, or Noir — Which Photo Filter Actually Fits Your Image?",
  description:
    "A quick guide to the nine one-click photo filters — what each one actually does, and when to reach for which.",
  sections: [
    {
      heading: "Why a preset beats manual color grading for most people",
      body: [
        "Professional photo editing software gives you individual sliders for hue, saturation, contrast, brightness, and a dozen other values — powerful, but genuinely overwhelming if you just want a photo to look warmer, or older, or more dramatic, without spending twenty minutes learning what each slider actually does to the image. A one-click filter preset bundles all of that into a single, already-tuned combination aimed at a specific, recognizable look.",
        "The trade-off is control: you're picking a finished look rather than building one from scratch. For casual photo sharing, that trade is almost always worth it — you get a good result in one click instead of a mediocre one after fifteen minutes of guessing.",
      ],
    },
    {
      heading: "The difference between the similar-sounding ones",
      body: [
        "Sepia and Vintage get confused constantly because they're both \"old photo\" looks, but they aim for different eras: Sepia applies a strong, full monochrome warm tone — closer to a 19th-century photograph — while Vintage keeps some color but mutes the saturation and lifts the warmth slightly, closer to a faded 1970s print. If you want the photo to look genuinely old and colorless, Sepia. If you want it to look like a real photo that's just aged, Vintage.",
        "Noir and a plain grayscale conversion also get confused. A flat desaturation just removes color. Noir removes color AND boosts contrast while pulling brightness down slightly, aiming for the deliberately moody, high-contrast look associated with film noir photography — not just \"the color version without color,\" but a specific dramatic treatment.",
      ],
    },
    {
      heading: "Warm, Cool, Vivid, and Fade — the everyday four",
      body: [
        "Beyond the dramatic ones, four filters exist for ordinary photo touch-ups. Warm and Cool shift the overall color temperature — Warm pushes toward orange/yellow tones (flattering for skin, good for golden-hour shots), Cool pushes toward blue (works well for winter scenes, water, or a cleaner, more clinical look). Vivid boosts saturation and contrast together for a punchier, more eye-catching version of the same photo, which is often what \"this photo needs to pop more\" actually means. Fade does close to the opposite — it lowers contrast and slightly lifts shadows for a soft, muted, editorial look that's become common in modern lifestyle photography.",
        "None of these four changes what's actually in the photo — they're closer to what a phone camera's built-in filters do than a dramatic style change, which makes them the safer default when you're not sure a stronger effect fits.",
      ],
    },
    {
      heading: "Comparing before you commit",
      body: [
        "Since every filter applies instantly using the browser's canvas pipeline, the fastest way to actually pick one is to click through several and compare, rather than guessing from the name alone — \"Cool\" and \"Fade\" can look surprisingly similar on some photos depending on the original lighting, and the only reliable way to tell which fits better is seeing them side by side on your specific image rather than a generic example.",
      ],
    },
  ],
  faqs: [
    {
      question: "Can I adjust how strong a filter is?",
      answer:
        "Not with this tool — each filter applies at a fixed intensity tuned for its specific look. If you need finer control over individual settings, that's a manual color-grading task better suited to full editing software.",
    },
    {
      question: "Which filter should I use for a professional-looking headshot?",
      answer:
        "For most professional contexts, Original (unfiltered) or a very subtle adjustment is safest — strong stylized filters like Sepia or Noir read as creative/casual rather than professional, so save those for personal or social content.",
    },
    {
      question: "Is my photo uploaded anywhere to apply a filter?",
      answer:
        "No — every filter runs entirely in your browser using the Canvas API's built-in filter pipeline. Nothing is ever uploaded to a server.",
    },
  ],
};

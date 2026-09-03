import type { ToolContent } from "./types";

export const grayscaleImageContent: ToolContent = {
  overview: [
    "Converting an image to grayscale removes all color information, leaving only the brightness (luminance) value at every pixel — the same visual effect as classic black-and-white photography, but applied digitally to any color image. It's one of the most timeless photo editing effects, often used specifically because removing color draws more attention to composition, contrast, texture, and light rather than color relationships.",
    "Beyond the stylistic photography use, grayscale conversion serves genuinely practical purposes: preparing an image for a context that will only display in black-and-white anyway (some printing, certain older display technologies, specific document formats), reducing a color image to a simpler, smaller-in-concept format for a design mockup where color hasn't been finalized yet, or creating a placeholder/disabled-state version of a UI image (grayed-out icons and thumbnails are a common interface pattern for indicating something is inactive or unavailable).",
    "This tool applies grayscale conversion using the browser's built-in canvas filter, which computes a proper weighted luminance value for each pixel rather than a naive simple average of red, green, and blue — a proper luminance calculation weights green most heavily (since human vision is most sensitive to green light), then red, then blue least, producing a result that matches how brightness is actually perceived rather than a flatter, less accurate approximation.",
    "The conversion is complete and irreversible in the sense that color data is genuinely discarded, not just hidden — there's no way to recover the original colors from a grayscale result, so keep your original color image if you might need it again later. The output preserves the image's transparency (alpha channel) correctly if the source had any, only affecting the color channels.",
  ],
  howItWorks: [
    { title: "Upload your image", description: "Drop in the color image you want converted." },
    { title: "Conversion happens automatically", description: "Grayscale is applied instantly using proper perceptual luminance weighting." },
    { title: "Download the result", description: "Your black-and-white image is ready to save." },
  ],
  examples: [
    { label: "Converting a color photo", input: "Full-color landscape photo", output: "Same photo in grayscale, preserving tonal contrast and detail" },
  ],
  faqs: [
    { question: "Is this the same as just removing color saturation?", answer: "It achieves a similar end visual result, but this tool uses proper weighted luminance conversion, which accounts for the fact that human eyes perceive green as brighter than red or blue at equal intensity — this generally produces a more natural-looking tonal result than a simple, unweighted color average." },
    { question: "Can I convert my grayscale image back to color afterward?", answer: "No — grayscale conversion genuinely discards the original color information; there's no algorithm that can accurately guess back the original colors from a black-and-white result. Keep your original color file if you might want it again." },
    { question: "Does grayscale reduce file size?", answer: "Often somewhat, especially for JPEG output, since removing color variation can make an image compress slightly more efficiently — though the effect is generally modest compared to other compression techniques." },
    { question: "Will this work on a PNG with transparency?", answer: "Yes — the grayscale effect is applied only to the color channels, while the alpha (transparency) channel is preserved exactly as it was in the original image." },
    { question: "Is grayscale the same as \"sepia\" or \"vintage\" photo filters?", answer: "No — grayscale removes color entirely, leaving pure black, white, and gray tones. Sepia and vintage effects typically apply a specific color tint on top of a desaturated or otherwise adjusted image, which is a different, more stylized effect than a pure grayscale conversion." },
  ],
};

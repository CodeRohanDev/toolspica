import type { ToolContent } from "./types";

export const pixelateImageContent: ToolContent = {
  overview: [
    "Pixelating an image deliberately reduces its visual detail into large, visible blocks of solid color — the classic \"censored\" look used for decades to obscure a face, a license plate, or other identifying detail in photos and video, and also a distinct retro visual style deliberately used in design for its nostalgic, 8-bit video game aesthetic.",
    "The effect works by a genuinely simple trick: the image is first shrunk down to a tiny version (where each remaining pixel represents an average of a large block of the original), then scaled back up to its original size without any smoothing — normally, scaling a small image up would blur it smoothly, but disabling that smoothing (image interpolation) forces each of those tiny pixels to render as a hard-edged, visibly large block instead, producing the characteristic blocky pixelation look.",
    "This tool's pixel size slider controls exactly how aggressive that effect is: a small value creates a subtle, barely-noticeable softening, while a large value produces the strong, chunky blocks typically associated with obscuring a face or detail for privacy — similar to blurring in intent, but with a visually distinct, harder-edged result that some prefer specifically because it looks more deliberately \"censored\" rather than merely out of focus.",
    "As with blurring, it's worth understanding pixelation's real privacy limits: a light pixelation can sometimes be partially reversed for simple, predictable content (this is a well-documented weakness of pixelation as a redaction technique, particularly for text), so for anything genuinely sensitive that must never be recoverable, use a strong, heavy pixelation setting or consider a solid opaque block instead.",
  ],
  howItWorks: [
    { title: "Upload your image", description: "Drop in the image you want to pixelate." },
    { title: "Adjust the pixel size", description: "Drag the slider to control how large and blocky the pixelation is." },
    { title: "Download the result", description: "The pixelated image is exported as a new file, ready to save." },
  ],
  examples: [
    { label: "Obscuring a detail", input: "Sharp photo with a visible detail to hide", output: "Same photo with that area rendered in large, blocky pixels" },
  ],
  faqs: [
    { question: "Is pixelation a reliable way to hide sensitive information?", answer: "Light pixelation can sometimes be partially reversed for predictable content, particularly text — a well-documented weakness of this technique. For genuinely sensitive information that must stay permanently hidden, use a strong, heavy pixelation setting or a solid opaque block instead of a light effect." },
    { question: "What's the difference between pixelating and blurring an image?", answer: "Both obscure detail, but pixelation creates hard-edged, visible rectangular blocks, giving the classic \"censored\" look, while blurring creates smooth, gradual softening with no hard edges — the choice is largely down to which visual style fits your purpose." },
    { question: "Can I pixelate just part of an image, like only a face?", answer: "No — this tool applies pixelation uniformly across the entire image. For selectively pixelating only a specific region while keeping the rest sharp, you'd need a tool that supports targeted, region-based effects." },
    { question: "Why does a small pixel size setting barely seem to do anything?", answer: "At small pixel sizes, each block only averages a tiny cluster of original pixels, producing a subtle softening effect rather than the strong, obviously blocky look most people associate with pixelation — increase the setting for a more pronounced effect." },
    { question: "Does pixelating reduce the image's file size?", answer: "Often yes, particularly for JPEG output — large uniform color blocks compress much more efficiently than fine, varied detail, so a heavily pixelated image can end up noticeably smaller than the original." },
  ],
};

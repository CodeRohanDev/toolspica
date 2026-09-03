import type { ToolContent } from "./types";

export const imageColorPickerContent: ToolContent = {
  overview: [
    "Sometimes you see a color in an image — a brand's exact blue, a perfect shade of green in a photo, an accent color from a design you're referencing — and you need to know its precise value to use it yourself. An image color picker lets you click directly on any pixel in an uploaded image and get back its exact color code, rather than guessing at a hex value or trying to eyeball a match.",
    "This tool reads the actual pixel data from your uploaded image using the canvas API's `getImageData` method — the same underlying technique browsers and image editors use internally — so the color you get is the exact, precise value stored in that pixel, not an approximation or a value read from a screen that could be affected by monitor calibration or compression artifacts introduced by a screenshot.",
    "Once you click a pixel, the picked color is shown as a live swatch alongside its HEX code (like `#4f46e5`) and RGB values (like `rgb(79, 70, 229)`), both with one-click copy buttons — ready to paste directly into CSS, a design tool, or anywhere else that color format is needed. This is genuinely useful for matching a brand color from a logo image, extracting a dominant color from a photo for a design palette, or simply identifying what color something in an image actually is.",
    "Because this reads the image's actual stored pixel values, keep in mind that a color picked from a heavily compressed JPEG may differ very slightly from the \"true\" original color due to compression artifacts introduced during encoding — for pixel-perfect color extraction, a losslessly-saved PNG source will always give the most reliable result.",
  ],
  howItWorks: [
    { title: "Upload your image", description: "Drop in the image containing the color you want to identify." },
    { title: "Click anywhere on it", description: "Click the exact pixel whose color you want to sample." },
    { title: "Copy the color code", description: "The HEX and RGB values for that pixel appear instantly, ready to copy." },
  ],
  examples: [
    { label: "Picking a brand blue from a logo", input: "Click on the blue area of an uploaded logo", output: "#4f46e5 · rgb(79, 70, 229)" },
  ],
  faqs: [
    { question: "Why does the color I picked look slightly different from what I expected?", answer: "If your source image is a JPEG, lossy compression can slightly shift individual pixel colors from the original, especially near sharp edges between colors. For the most accurate color extraction, use a losslessly-saved PNG source image when possible." },
    { question: "Can I pick multiple colors from the same image?", answer: "Yes — click anywhere else on the image at any time to sample a new pixel, and the displayed color updates immediately to the new location." },
    { question: "Does this work on a photo, or only flat-color graphics?", answer: "It works on any image, including photos — you're sampling the exact color of whichever single pixel you click, whether that's a flat design color or a specific point within a photo's naturally varying colors." },
    { question: "Why is the color at the very edge of an object sometimes an odd blend?", answer: "Edges between two colors are often anti-aliased (blended) by whatever created the image, meaning pixels right at a boundary can be an intermediate mix of both colors rather than a pure sample of either one — click slightly further into the solid area you're targeting for a cleaner sample." },
    { question: "Is my image uploaded to a server when I use this tool?", answer: "No — the image is loaded and read entirely within your browser using the canvas API. Nothing is uploaded anywhere." },
  ],
};

import type { ToolContent } from "./types";

export const bmpToJpgContent: ToolContent = {
  overview: [
    "BMP (Bitmap) is one of the oldest image formats still in common use, dating back to early Windows systems, and it stores images with little to no compression — every pixel's color data is saved essentially as-is, which means BMP files are typically enormous compared to a JPEG or PNG of the same image. A BMP screenshot or scan that would be a few hundred kilobytes as a JPG can easily be tens of megabytes in its original BMP form.",
    "BMP files still turn up regularly from specific sources: older Windows applications and utilities that default to BMP for screenshots or exports, legacy scanning software, some industrial or specialized hardware that outputs BMP by default, and older documentation or archives. Their large, uncompressed size makes them impractical for sharing, emailing, or uploading anywhere with a file size limit — converting to JPG is usually the fastest fix.",
    "This tool draws your BMP file onto a canvas and re-exports it as a compressed JPEG at a quality level you control, typically shrinking the file dramatically — often by 80-95% or more, depending on the image content and the quality setting chosen, since BMP's near-zero compression leaves enormous room for JPEG's much more efficient (if lossy) encoding to reduce the size.",
    "Because BMP files don't have transparency in the vast majority of real-world files (the format technically has limited alpha support in some variants, but it's rarely used in practice), converting to JPG is usually a clean, straightforward operation without needing to worry about transparent areas turning into an unexpected background color — a concern that does apply when converting from PNG or WebP instead.",
  ],
  howItWorks: [
    { title: "Upload your BMP file", description: "Drop in the .bmp image you want converted." },
    { title: "Choose a quality level", description: "Set your preferred JPEG quality to balance size and detail." },
    { title: "Download your JPG", description: "A dramatically smaller JPG file, with a size comparison, is ready to save." },
  ],
  examples: [
    { label: "Shrinking an old BMP screenshot", input: "14.2 MB BMP file", output: "780 KB JPG at 90% quality — same visual content, ~95% smaller" },
  ],
  faqs: [
    { question: "Why is my BMP file so much larger than a JPG of the same image?", answer: "BMP stores image data with little to no compression, saving nearly every pixel's exact color value, while JPEG uses sophisticated lossy compression specifically designed to discard visually less-important detail. That fundamental difference in approach is why BMP files are routinely 10-20 times larger than an equivalent-quality JPEG." },
    { question: "Will I lose image quality converting from BMP to JPG?", answer: "Some quality loss is inherent to JPEG's lossy compression, but at a high quality setting (85% or above), the difference from the essentially lossless BMP original is usually imperceptible to the eye, while the file size drops dramatically." },
    { question: "Does BMP support transparency like PNG does?", answer: "Technically some BMP variants support a limited alpha channel, but it's rarely used in practice — the vast majority of real-world BMP files are fully opaque, so converting to JPG (which also has no transparency) is typically a clean, straightforward conversion." },
    { question: "Where do BMP files usually come from today?", answer: "Most commonly from older Windows applications, legacy scanning or imaging software, some specialized hardware exports, and older archives — modern software rarely defaults to BMP given how much more efficient other formats are." },
    { question: "Is there any reason to keep a file as BMP instead of converting it?", answer: "BMP's lack of compression means zero generational quality loss from repeated saves, which matters in some narrow technical or legacy-software contexts — but for sharing, storage, or web use, converting to JPG or PNG is almost always the better choice." },
  ],
};

import type { ToolContent } from "./types";

export const jpgToPngContent: ToolContent = {
  overview: [
    "Converting a JPG to PNG is usually about what you need to do with the image next, rather than improving its visual quality — PNG's lossless compression and support for transparency make it the format most design tools, editors, and platforms expect when you need to layer an image over other content, add a transparent background, or avoid compounding compression artifacts through multiple rounds of editing and re-saving.",
    "It's important to set expectations correctly here: converting a JPG to PNG cannot recover detail that JPEG's lossy compression already discarded. If your source JPG has visible compression artifacts (blockiness, especially around sharp edges), those artifacts get preserved exactly as-is in the resulting PNG — you end up with a losslessly-compressed copy of an already-lossy image, not a magically restored, higher-quality version. The value of converting is in what happens after this step, not in improving the image itself.",
    "Common legitimate reasons to convert JPG to PNG include preparing an image for an editing tool or workflow that specifically requires or works better with PNG, needing to add transparency to parts of an image that didn't have any (using a separate background removal or editing step afterward), avoiding further JPEG generational quality loss during a multi-step editing pipeline (since PNG doesn't re-compress lossily on each save), or simply meeting a specific file format requirement from a platform, template, or system that only accepts PNG uploads.",
    "This conversion is a straightforward, lossless re-encoding: your JPG is drawn onto a canvas and exported as PNG with no quality settings to configure, since PNG compression is always lossless — there's no quality-versus-size tradeoff to make here, unlike the JPG-to-PNG direction's opposite.",
  ],
  howItWorks: [
    { title: "Upload your JPG", description: "Drop in the JPEG image you want converted." },
    { title: "Conversion happens automatically", description: "No settings needed — PNG is always a lossless export." },
    { title: "Download your PNG", description: "The converted file is ready to save immediately." },
  ],
  examples: [
    { label: "Converting a JPG for a design tool", input: "photo.jpg", output: "photo.png (same visual content, PNG format)" },
  ],
  faqs: [
    { question: "Will converting to PNG improve my JPG's quality?", answer: "No — any compression artifacts already present in your JPG are baked into its pixels and get carried over exactly as-is into the PNG. Converting to PNG prevents further quality loss from additional editing, but it can't restore detail the original JPEG compression already discarded." },
    { question: "Why is the resulting PNG file larger than my original JPG?", answer: "This is expected and normal — PNG's lossless compression generally produces larger files than JPEG's lossy compression for photographic content, since PNG is preserving every pixel exactly rather than approximating and discarding some detail to save space." },
    { question: "Does my JPG need transparency to convert to PNG?", answer: "No — a standard JPG (which never has transparency) converts to a fully opaque PNG just fine. If you need to add actual transparency to parts of the image, that requires a separate background removal or editing step; simply converting the format doesn't add transparency where none existed." },
    { question: "Is there a quality setting for this conversion?", answer: "No — PNG compression is always lossless, so there's no quality-versus-file-size tradeoff to configure, unlike converting to a lossy format like JPG or WebP." },
    { question: "Can I batch convert multiple JPGs at once?", answer: "Not with this tool — it processes one image at a time. For converting many files at once, you'd need a batch-processing tool or script." },
  ],
};

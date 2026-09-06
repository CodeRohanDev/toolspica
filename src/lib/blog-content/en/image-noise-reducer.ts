import type { BlogPost } from "@/lib/blog/types";

export const post: BlogPost = {
  toolSlug: "image-noise-reducer",
  lang: "en",
  title: "Why a Simple Blur Is the Wrong Way to Fix a Grainy Photo",
  description: "A median filter removes speckle noise from low-light photos without the mushy softness a normal blur causes.",
  sections: [
    {
      heading: "That grainy night photo isn't beyond saving",
      body: [
        "Shoot anything in low light without a tripod and a flash, and your camera compensates by cranking up ISO sensitivity — which amplifies the signal, but amplifies random sensor noise right along with it. The result is that speckled, grainy look: random bright and dark pixels scattered across what should be smooth surfaces like skin, sky, or a plain wall. It's one of the most common photo complaints, and also one of the most fixable with the right technique.",
        "The instinct is to reach for a blur tool. That instinct is usually wrong.",
      ],
    },
    {
      heading: "Why averaging pixels makes noise worse, not better",
      body: [
        "A standard blur works by averaging each pixel with its neighbors. The problem: averaging a noise spike into its surroundings doesn't remove it, it just smears it — you trade sharp noise for soft, mushy noise, and you lose real detail (skin texture, hair, fine lines) in the process, since blur can't tell the difference between \"noise\" and \"detail that happens to vary pixel to pixel.\"",
        "A median filter takes a completely different approach: instead of averaging a neighborhood of pixels, it sorts them and picks the middle value. A single noise spike — an isolated pixel wildly brighter or darker than everything around it — almost never wins the middle position in a sorted list, so it gets replaced entirely rather than blended in. Genuine edges and detail, which tend to persist consistently across a neighborhood rather than appearing as a single random outlier, survive far better.",
      ],
    },
    {
      heading: "Picking the right filter size instead of maxing it out",
      body: [
        "It's tempting to assume bigger is always better, but a larger neighborhood (say 7×7 instead of 3×3) considers more surrounding pixels when computing the median — which removes noise more aggressively, but also starts blending genuinely fine detail that resembles noise at that scale, like individual hair strands or fabric texture. The right move is to start with a small filter and only increase it if noise is still clearly visible, rather than defaulting to maximum strength.",
        "This is a real trade-off, not a limitation to work around — every noise-reduction technique costs some detail; the goal is spending as little of that budget as the photo actually needs.",
      ],
    },
    {
      heading: "What this won't fix, and when to reach for something else",
      body: [
        "A median filter is built for speckle or \"salt-and-pepper\" style noise — the isolated random pixel variety common in high-ISO shots. It's not the right tool for smooth, gradient-style noise banding, color noise in shadows that shifts hue rather than brightness, or motion blur, which is a completely different problem with a different fix. Matching the tool to the actual noise pattern in front of you matters more than just cranking up any one filter's strength.",
      ],
    },
  ],
  faqs: [
    {
      question: "Should I always use the largest filter size for the cleanest result?",
      answer: "No — a bigger neighborhood removes more noise but also starts softening genuinely fine detail like hair or texture that resembles noise at that scale. Start small (3×3) and only go larger if noise is still clearly visible.",
    },
    {
      question: "Is this the same technology as AI photo denoising apps?",
      answer: "No — this is a classical median filter, a well-established signal-processing technique, not a machine-learning model. AI denoisers can sometimes do more on complex noise patterns, but a median filter is fast, predictable, and genuinely effective on typical speckle noise.",
    },
    {
      question: "Will this work on any kind of noise?",
      answer: "It's specifically effective on speckle-style noise (isolated random bright/dark pixels), which is what high-ISO and low-light photography typically produces. Smooth gradient-style noise responds better to other techniques.",
    },
  ],
};

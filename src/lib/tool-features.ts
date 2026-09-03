// Universal, honest feature checklist shown on every tool page. Kept
// generic-but-true rather than fabricating tool-specific claims — every
// live tool on Toolspica genuinely satisfies all of these.
export function getToolFeatures(tier: number): string[] {
  const base = [
    "Real-time, instant results",
    "100% free, no sign-up required",
    "Works on desktop, tablet, and mobile",
    "No installation needed",
  ];

  if (tier <= 4) {
    return [
      "Runs entirely in your browser",
      "Privacy-first — your data is never uploaded",
      ...base,
    ];
  }

  return [
    "Privacy-first processing with automatic deletion",
    ...base,
  ];
}

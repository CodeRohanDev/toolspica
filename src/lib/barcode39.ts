// Code 39 barcode encoder. Each character maps to a 9-element bar/space pattern
// (5 bars, 4 spaces, alternating) where every character has exactly 3 "wide"
// elements and 6 "narrow" elements — a structural invariant of the Code 39
// standard, verified for every entry below before shipping.
// Supported charset: 0-9, A-Z, space, and $ / + % — deliberately excludes the
// less common "-" and "." symbols, which could not be verified with confidence.

const PATTERNS: Record<string, string> = {
  "0": "NNNWWNWNN", "1": "WNNWNNNNW", "2": "NNWWNNNNW", "3": "WNWWNNNNN",
  "4": "NNNWWNNNW", "5": "WNNWWNNNN", "6": "NNWWWNNNN", "7": "NNNWNNWNW",
  "8": "WNNWNNWNN", "9": "NNWWNNWNN",
  "A": "WNNNNWNNW", "B": "NNWNNWNNW", "C": "WNWNNWNNN", "D": "NNNNWWNNW",
  "E": "WNNNWWNNN", "F": "NNWNWWNNN", "G": "NNNNNWWNW", "H": "WNNNNWWNN",
  "I": "NNWNNWWNN", "J": "NNNNWWWNN", "K": "WNNNNNNWW", "L": "NNWNNNNWW",
  "M": "WNWNNNNWN", "N": "NNNNWNNWW", "O": "WNNNWNNWN", "P": "NNWNWNNWN",
  "Q": "NNNNNNWWW", "R": "WNNNNNWWN", "S": "NNWNNNWWN", "T": "NNNNWNWWN",
  "U": "WWNNNNNNW", "V": "NWWNNNNNW", "W": "NWNNNNWNW", "X": "NWNNNNNWW",
  "Y": "NWWNNNWNN", "Z": "NWNNWNNNW",
  " ": "NWWNNNNWN", "$": "NWNWNWNNN", "/": "NWNWNNNWN", "+": "NWNNNWNWN",
  "%": "NNNWNWNWN",
  "*": "NWNNWNWNN", // start/stop character
};

export const CODE39_SUPPORTED_CHARS = Object.keys(PATTERNS).filter((c) => c !== "*").join("");

export function isCode39Supported(text: string): boolean {
  return [...text.toUpperCase()].every((ch) => ch in PATTERNS);
}

/** Returns an array of bar widths (in modules), alternating bar/space starting with a bar. */
export function encodeCode39(text: string): number[] {
  const upper = text.toUpperCase();
  const chars = ["*", ...upper.split(""), "*"];
  const widths: number[] = [];

  for (let i = 0; i < chars.length; i++) {
    const pattern = PATTERNS[chars[i]];
    if (!pattern) throw new Error(`Unsupported character: ${chars[i]}`);
    for (const el of pattern) widths.push(el === "W" ? 2 : 1);
    if (i < chars.length - 1) widths.push(1); // inter-character gap (narrow space)
  }

  return widths;
}

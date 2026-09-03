// Shared color conversion and analysis utilities used across the Color Tools.

export interface Rgb {
  r: number;
  g: number;
  b: number;
}

export interface Hsl {
  h: number;
  s: number;
  l: number;
}

export function normalizeHex(hex: string): string {
  let h = hex.trim().replace(/^#/, "");
  if (h.length === 3) {
    h = h
      .split("")
      .map((c) => c + c)
      .join("");
  }
  return h.toLowerCase();
}

export function isValidHex(hex: string): boolean {
  const h = normalizeHex(hex);
  return /^[0-9a-f]{6}$/.test(h);
}

export function hexToRgb(hex: string): Rgb | null {
  if (!isValidHex(hex)) return null;
  const h = normalizeHex(hex);
  return {
    r: parseInt(h.slice(0, 2), 16),
    g: parseInt(h.slice(2, 4), 16),
    b: parseInt(h.slice(4, 6), 16),
  };
}

export function rgbToHex({ r, g, b }: Rgb): string {
  const clamp = (n: number) => Math.max(0, Math.min(255, Math.round(n)));
  return (
    "#" +
    [clamp(r), clamp(g), clamp(b)]
      .map((v) => v.toString(16).padStart(2, "0"))
      .join("")
  );
}

export function rgbToHsl({ r, g, b }: Rgb): Hsl {
  const rn = r / 255;
  const gn = g / 255;
  const bn = b / 255;
  const max = Math.max(rn, gn, bn);
  const min = Math.min(rn, gn, bn);
  const l = (max + min) / 2;

  if (max === min) return { h: 0, s: 0, l: Math.round(l * 100) };

  const d = max - min;
  const s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
  let h: number;
  switch (max) {
    case rn:
      h = ((gn - bn) / d + (gn < bn ? 6 : 0)) * 60;
      break;
    case gn:
      h = ((bn - rn) / d + 2) * 60;
      break;
    default:
      h = ((rn - gn) / d + 4) * 60;
  }

  return { h: Math.round(h), s: Math.round(s * 100), l: Math.round(l * 100) };
}

export function hslToRgb({ h, s, l }: Hsl): Rgb {
  const sn = s / 100;
  const ln = l / 100;
  const c = (1 - Math.abs(2 * ln - 1)) * sn;
  const hp = h / 60;
  const x = c * (1 - Math.abs((hp % 2) - 1));
  let r = 0;
  let g = 0;
  let b = 0;

  if (hp >= 0 && hp < 1) [r, g, b] = [c, x, 0];
  else if (hp >= 1 && hp < 2) [r, g, b] = [x, c, 0];
  else if (hp >= 2 && hp < 3) [r, g, b] = [0, c, x];
  else if (hp >= 3 && hp < 4) [r, g, b] = [0, x, c];
  else if (hp >= 4 && hp < 5) [r, g, b] = [x, 0, c];
  else if (hp >= 5 && hp < 6) [r, g, b] = [c, 0, x];

  const m = ln - c / 2;
  return {
    r: Math.round((r + m) * 255),
    g: Math.round((g + m) * 255),
    b: Math.round((b + m) * 255),
  };
}

/** Relative luminance per WCAG 2.x definition. */
export function relativeLuminance({ r, g, b }: Rgb): number {
  const toLinear = (channel: number) => {
    const c = channel / 255;
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  };
  const rl = toLinear(r);
  const gl = toLinear(g);
  const bl = toLinear(b);
  return 0.2126 * rl + 0.7152 * gl + 0.0722 * bl;
}

/** WCAG contrast ratio between two colors, from 1 (no contrast) to 21 (max contrast). */
export function contrastRatio(rgbA: Rgb, rgbB: Rgb): number {
  const lA = relativeLuminance(rgbA);
  const lB = relativeLuminance(rgbB);
  const lighter = Math.max(lA, lB);
  const darker = Math.min(lA, lB);
  return (lighter + 0.05) / (darker + 0.05);
}

export function randomHexColor(): string {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  return rgbToHex({ r, g, b });
}

// A curated set of well-known named colors (CSS/X11 basic set) for nearest-name matching.
export const NAMED_COLORS: { name: string; hex: string }[] = [
  { name: "Black", hex: "#000000" }, { name: "White", hex: "#ffffff" },
  { name: "Red", hex: "#ff0000" }, { name: "Green", hex: "#008000" },
  { name: "Blue", hex: "#0000ff" }, { name: "Yellow", hex: "#ffff00" },
  { name: "Cyan", hex: "#00ffff" }, { name: "Magenta", hex: "#ff00ff" },
  { name: "Gray", hex: "#808080" }, { name: "Silver", hex: "#c0c0c0" },
  { name: "Maroon", hex: "#800000" }, { name: "Olive", hex: "#808000" },
  { name: "Lime", hex: "#00ff00" }, { name: "Teal", hex: "#008080" },
  { name: "Navy", hex: "#000080" }, { name: "Purple", hex: "#800080" },
  { name: "Orange", hex: "#ffa500" }, { name: "Pink", hex: "#ffc0cb" },
  { name: "Hot Pink", hex: "#ff69b4" }, { name: "Deep Pink", hex: "#ff1493" },
  { name: "Salmon", hex: "#fa8072" }, { name: "Coral", hex: "#ff7f50" },
  { name: "Tomato", hex: "#ff6347" }, { name: "Crimson", hex: "#dc143c" },
  { name: "Firebrick", hex: "#b22222" }, { name: "Dark Red", hex: "#8b0000" },
  { name: "Indian Red", hex: "#cd5c5c" }, { name: "Gold", hex: "#ffd700" },
  { name: "Khaki", hex: "#f0e68c" }, { name: "Beige", hex: "#f5f5dc" },
  { name: "Ivory", hex: "#fffff0" }, { name: "Lavender", hex: "#e6e6fa" },
  { name: "Plum", hex: "#dda0dd" }, { name: "Orchid", hex: "#da70d6" },
  { name: "Violet", hex: "#ee82ee" }, { name: "Indigo", hex: "#4b0082" },
  { name: "Turquoise", hex: "#40e0d0" }, { name: "Aquamarine", hex: "#7fffd4" },
  { name: "Sky Blue", hex: "#87ceeb" }, { name: "Steel Blue", hex: "#4682b4" },
  { name: "Royal Blue", hex: "#4169e1" }, { name: "Dodger Blue", hex: "#1e90ff" },
  { name: "Slate Blue", hex: "#6a5acd" }, { name: "Forest Green", hex: "#228b22" },
  { name: "Sea Green", hex: "#2e8b57" }, { name: "Spring Green", hex: "#00ff7f" },
  { name: "Olive Drab", hex: "#6b8e23" }, { name: "Dark Green", hex: "#006400" },
  { name: "Chartreuse", hex: "#7fff00" }, { name: "Chocolate", hex: "#d2691e" },
  { name: "Sienna", hex: "#a0522d" }, { name: "Peru", hex: "#cd853f" },
  { name: "Tan", hex: "#d2b48c" }, { name: "Brown", hex: "#a52a2a" },
  { name: "Saddle Brown", hex: "#8b4513" }, { name: "Slate Gray", hex: "#708090" },
  { name: "Dim Gray", hex: "#696969" }, { name: "Light Gray", hex: "#d3d3d3" },
  { name: "Gainsboro", hex: "#dcdcdc" }, { name: "Charcoal", hex: "#36454f" },
  { name: "Mint", hex: "#98ff98" }, { name: "Peach", hex: "#ffe5b4" },
  { name: "Mustard", hex: "#ffdb58" }, { name: "Rose", hex: "#ff007f" },
  { name: "Amber", hex: "#ffbf00" }, { name: "Cornflower Blue", hex: "#6495ed" },
];

export function findNearestColorName(hex: string): { name: string; hex: string; distance: number } | null {
  const rgb = hexToRgb(hex);
  if (!rgb) return null;
  let best = NAMED_COLORS[0];
  let bestDistance = Infinity;
  for (const candidate of NAMED_COLORS) {
    const candidateRgb = hexToRgb(candidate.hex)!;
    const distance = Math.sqrt(
      (rgb.r - candidateRgb.r) ** 2 + (rgb.g - candidateRgb.g) ** 2 + (rgb.b - candidateRgb.b) ** 2
    );
    if (distance < bestDistance) {
      bestDistance = distance;
      best = candidate;
    }
  }
  return { ...best, distance: Math.round(bestDistance) };
}

export interface TextLine {
  text: string;
  fontSize: number;
}

interface RawItem {
  str: string;
  x: number;
  y: number;
  fontSize: number;
}

/** Groups positioned text items into reading-order lines with an average font size. */
export function extractLines(items: RawItem[], yTolerance = 3): TextLine[] {
  const nonEmpty = items.filter((it) => it.str.trim().length > 0);
  if (nonEmpty.length === 0) return [];

  const sorted = [...nonEmpty].sort((a, b) => b.y - a.y || a.x - b.x);
  const lines: RawItem[][] = [];
  for (const item of sorted) {
    const line = lines.find((l) => Math.abs(l[0].y - item.y) <= yTolerance);
    if (line) line.push(item);
    else lines.push([item]);
  }

  return lines.map((line) => {
    const sortedLine = [...line].sort((a, b) => a.x - b.x);
    const text = sortedLine.map((it) => it.str).join("").replace(/\s+/g, " ").trim();
    const fontSize = sortedLine.reduce((s, it) => s + it.fontSize, 0) / sortedLine.length;
    return { text, fontSize };
  });
}

export function linesToMarkdown(lines: TextLine[]): string {
  if (lines.length === 0) return "";
  const sizes = lines.map((l) => l.fontSize);
  const median = [...sizes].sort((a, b) => a - b)[Math.floor(sizes.length / 2)];

  const out: string[] = [];
  for (const line of lines) {
    if (!line.text) continue;
    if (line.fontSize > median * 1.4) out.push(`## ${line.text}`);
    else if (line.fontSize > median * 1.15) out.push(`### ${line.text}`);
    else out.push(line.text);
  }
  return out.join("\n\n");
}

export function linesToHtml(lines: TextLine[]): string {
  if (lines.length === 0) return "";
  const sizes = lines.map((l) => l.fontSize);
  const median = [...sizes].sort((a, b) => a - b)[Math.floor(sizes.length / 2)];

  const out: string[] = [];
  for (const line of lines) {
    if (!line.text) continue;
    const escaped = line.text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    if (line.fontSize > median * 1.4) out.push(`<h2>${escaped}</h2>`);
    else if (line.fontSize > median * 1.15) out.push(`<h3>${escaped}</h3>`);
    else out.push(`<p>${escaped}</p>`);
  }
  return out.join("\n");
}

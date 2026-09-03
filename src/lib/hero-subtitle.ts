const MAX_LENGTH = 140;

/** Falls back to a trimmed first sentence of the overview when no
 * hand-written heroSubtitle is set on a tool's content. */
export function getHeroSubtitle(heroSubtitle: string | undefined, overview: string[]): string {
  if (heroSubtitle) return heroSubtitle;

  const firstParagraph = overview[0] ?? "";
  const firstSentenceMatch = firstParagraph.match(/^.*?[.!?](?=\s|$)/);
  let sentence = (firstSentenceMatch?.[0] ?? firstParagraph).trim();

  if (sentence.length > MAX_LENGTH) {
    const truncated = sentence.slice(0, MAX_LENGTH);
    const lastSpace = truncated.lastIndexOf(" ");
    sentence = `${truncated.slice(0, lastSpace)}…`;
  }

  return sentence;
}

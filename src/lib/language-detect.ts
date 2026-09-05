// Lightweight heuristic language detector using stopword-frequency matching.
// Not ML-based — compares common function words per language against the input.
const STOPWORDS: Record<string, string[]> = {
  English: ["the", "and", "is", "in", "to", "of", "a", "that", "it", "for", "with", "was", "on"],
  Spanish: ["el", "la", "de", "que", "y", "en", "un", "es", "se", "no", "los", "por", "con"],
  French: ["le", "la", "de", "et", "un", "est", "que", "les", "des", "en", "pour", "avec", "sur"],
  German: ["der", "die", "und", "ist", "das", "in", "zu", "den", "ein", "nicht", "mit", "für", "auf"],
  Portuguese: ["o", "a", "de", "que", "e", "em", "um", "é", "com", "não", "para", "os", "se"],
  Italian: ["il", "di", "che", "e", "la", "un", "è", "per", "in", "con", "non", "una", "sono"],
  Dutch: ["de", "het", "een", "en", "van", "is", "dat", "op", "voor", "met", "niet", "zijn", "aan"],
  Hindi: ["है", "और", "की", "के", "में", "का", "यह", "को", "से", "पर", "एक", "हैं", "था"],
};

export function detectLanguage(text: string): { language: string; confidence: number }[] {
  const words = text
    .toLowerCase()
    .replace(/[.,!?;:"'()]/g, "")
    .split(/\s+/)
    .filter(Boolean);

  if (words.length === 0) return [];

  const scores: Record<string, number> = {};
  for (const [lang, stopwords] of Object.entries(STOPWORDS)) {
    const stopwordSet = new Set(stopwords);
    const hits = words.filter((w) => stopwordSet.has(w)).length;
    scores[lang] = hits / words.length;
  }

  return Object.entries(scores)
    .map(([language, score]) => ({ language, confidence: Math.round(score * 100) }))
    .sort((a, b) => b.confidence - a.confidence)
    .filter((r) => r.confidence > 0)
    .slice(0, 5);
}

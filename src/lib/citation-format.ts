export interface CitationFields {
  author: string;
  title: string;
  year: string;
  source: string;
  url: string;
}

export function formatApa(f: CitationFields): string {
  const author = f.author || "[Author]";
  const year = f.year || "n.d.";
  const title = f.title || "[Title]";
  const source = f.source ? ` ${f.source}.` : "";
  const url = f.url ? ` ${f.url}` : "";
  return `${author} (${year}). ${title}.${source}${url}`.trim();
}

export function formatMla(f: CitationFields): string {
  const author = f.author || "[Author]";
  const title = f.title || "[Title]";
  const source = f.source || "[Source]";
  const year = f.year || "n.d.";
  const url = f.url ? `, ${f.url}` : "";
  return `${author}. "${title}." ${source}, ${year}${url}.`;
}

export function formatChicago(f: CitationFields): string {
  const author = f.author || "[Author]";
  const title = f.title || "[Title]";
  const source = f.source ? ` ${f.source}.` : "";
  const year = f.year || "n.d.";
  const url = f.url ? ` ${f.url}.` : "";
  return `${author}. "${title}."${source} ${year}.${url}`.trim();
}

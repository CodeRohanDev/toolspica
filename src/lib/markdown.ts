function escapeHtml(s: string) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function inline(text: string) {
  return escapeHtml(text)
    .replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img alt="$1" src="$2" />')
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>')
    .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
    .replace(/__([^_]+)__/g, "<strong>$1</strong>")
    .replace(/\*([^*]+)\*/g, "<em>$1</em>")
    .replace(/_([^_]+)_/g, "<em>$1</em>")
    .replace(/`([^`]+)`/g, "<code>$1</code>");
}

export function markdownToHtml(md: string): string {
  const lines = md.replace(/\r\n/g, "\n").split("\n");
  const out: string[] = [];
  let inCode = false;
  let listType: "ul" | "ol" | null = null;
  let paragraph: string[] = [];

  function flushParagraph() {
    if (paragraph.length) {
      out.push(`<p>${inline(paragraph.join(" "))}</p>`);
      paragraph = [];
    }
  }
  function closeList() {
    if (listType) { out.push(`</${listType}>`); listType = null; }
  }

  for (const line of lines) {
    if (line.startsWith("```")) {
      flushParagraph(); closeList();
      if (!inCode) { out.push("<pre><code>"); inCode = true; }
      else { out.push("</code></pre>"); inCode = false; }
      continue;
    }
    if (inCode) { out.push(escapeHtml(line)); continue; }

    if (!line.trim()) { flushParagraph(); closeList(); continue; }

    const h = line.match(/^(#{1,6})\s+(.*)/);
    if (h) { flushParagraph(); closeList(); out.push(`<h${h[1].length}>${inline(h[2])}</h${h[1].length}>`); continue; }

    if (/^>\s?/.test(line)) { flushParagraph(); closeList(); out.push(`<blockquote>${inline(line.replace(/^>\s?/, ""))}</blockquote>`); continue; }

    if (/^(-{3,}|\*{3,})$/.test(line.trim())) { flushParagraph(); closeList(); out.push("<hr />"); continue; }

    const ul = line.match(/^[-*]\s+(.*)/);
    const ol = line.match(/^\d+\.\s+(.*)/);
    if (ul) {
      flushParagraph();
      if (listType !== "ul") { closeList(); out.push("<ul>"); listType = "ul"; }
      out.push(`<li>${inline(ul[1])}</li>`);
      continue;
    }
    if (ol) {
      flushParagraph();
      if (listType !== "ol") { closeList(); out.push("<ol>"); listType = "ol"; }
      out.push(`<li>${inline(ol[1])}</li>`);
      continue;
    }
    closeList();
    paragraph.push(line.trim());
  }
  flushParagraph();
  closeList();
  return out.join("\n");
}

function walk(node: ChildNode): string {
  if (node.nodeType === Node.TEXT_NODE) return node.textContent ?? "";
  if (node.nodeType !== Node.ELEMENT_NODE) return "";
  const el = node as Element;
  const children = Array.from(el.childNodes).map(walk).join("");
  switch (el.tagName.toLowerCase()) {
    case "h1": return `# ${children}\n\n`;
    case "h2": return `## ${children}\n\n`;
    case "h3": return `### ${children}\n\n`;
    case "h4": return `#### ${children}\n\n`;
    case "h5": return `##### ${children}\n\n`;
    case "h6": return `###### ${children}\n\n`;
    case "p": return `${children}\n\n`;
    case "strong": case "b": return `**${children}**`;
    case "em": case "i": return `*${children}*`;
    case "code": return el.parentElement?.tagName.toLowerCase() === "pre" ? children : `\`${children}\``;
    case "pre": return `\`\`\`\n${children}\n\`\`\`\n\n`;
    case "a": return `[${children}](${el.getAttribute("href") ?? ""})`;
    case "img": return `![${el.getAttribute("alt") ?? ""}](${el.getAttribute("src") ?? ""})`;
    case "blockquote": return `> ${children}\n\n`;
    case "hr": return `---\n\n`;
    case "br": return "\n";
    case "li": {
      const isOrdered = el.parentElement?.tagName.toLowerCase() === "ol";
      const marker = isOrdered ? "1." : "-";
      return `${marker} ${children}\n`;
    }
    case "ul": case "ol": return `${children}\n`;
    default: return children;
  }
}

export function htmlToMarkdown(html: string): string {
  const doc = new DOMParser().parseFromString(html, "text/html");
  return Array.from(doc.body.childNodes)
    .map(walk)
    .join("")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

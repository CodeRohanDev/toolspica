"use client";

import * as React from "react";
import { Textarea } from "@/components/ui/textarea";
import { CheckCircle2, XCircle, AlertTriangle } from "lucide-react";

interface ValidationIssue {
  level: "error" | "warning";
  message: string;
}

function validateSitemap(xml: string): { issues: ValidationIssue[]; urlCount: number } {
  const issues: ValidationIssue[] = [];

  let doc: Document;
  try {
    const parser = new DOMParser();
    doc = parser.parseFromString(xml, "application/xml");
    const parserError = doc.querySelector("parsererror");
    if (parserError) {
      issues.push({ level: "error", message: "Invalid XML — the document is not well-formed." });
      return { issues, urlCount: 0 };
    }
  } catch {
    issues.push({ level: "error", message: "Could not parse the document as XML." });
    return { issues, urlCount: 0 };
  }

  const urlset = doc.querySelector("urlset");
  if (!urlset) {
    issues.push({ level: "error", message: "Missing root <urlset> element." });
    return { issues, urlCount: 0 };
  }

  const xmlns = urlset.getAttribute("xmlns");
  if (xmlns !== "http://www.sitemaps.org/schemas/sitemap/0.9") {
    issues.push({ level: "warning", message: "The <urlset> xmlns attribute doesn't match the standard sitemap namespace." });
  }

  const urls = Array.from(doc.querySelectorAll("url"));
  if (urls.length === 0) {
    issues.push({ level: "error", message: "No <url> entries found." });
  }
  if (urls.length > 50000) {
    issues.push({ level: "error", message: `Sitemap contains ${urls.length} URLs — the protocol limit is 50,000 per file.` });
  }

  urls.forEach((url, i) => {
    const loc = url.querySelector("loc");
    if (!loc || !loc.textContent?.trim()) {
      issues.push({ level: "error", message: `Entry ${i + 1}: missing required <loc> element.` });
      return;
    }
    const locText = loc.textContent.trim();
    if (!/^https?:\/\//.test(locText)) {
      issues.push({ level: "error", message: `Entry ${i + 1}: <loc> "${locText}" is not an absolute URL.` });
    }
    if (locText.length > 2048) {
      issues.push({ level: "warning", message: `Entry ${i + 1}: URL exceeds 2048 characters.` });
    }
    const priority = url.querySelector("priority")?.textContent;
    if (priority) {
      const p = Number(priority);
      if (Number.isNaN(p) || p < 0 || p > 1) {
        issues.push({ level: "warning", message: `Entry ${i + 1}: priority "${priority}" should be between 0.0 and 1.0.` });
      }
    }
    const changefreq = url.querySelector("changefreq")?.textContent;
    const validFreqs = ["always", "hourly", "daily", "weekly", "monthly", "yearly", "never"];
    if (changefreq && !validFreqs.includes(changefreq)) {
      issues.push({ level: "warning", message: `Entry ${i + 1}: changefreq "${changefreq}" is not a standard value.` });
    }
  });

  return { issues, urlCount: urls.length };
}

export function XmlSitemapValidator() {
  const [xml, setXml] = React.useState("");
  const { issues, urlCount } = React.useMemo(() => (xml.trim() ? validateSitemap(xml) : { issues: [], urlCount: 0 }), [xml]);
  const errors = issues.filter((i) => i.level === "error");
  const warnings = issues.filter((i) => i.level === "warning");

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <Textarea
        value={xml}
        onChange={(e) => setXml(e.target.value)}
        placeholder="Paste your sitemap.xml contents here..."
        rows={10}
        className="resize-y font-mono text-xs"
      />

      {xml.trim() && (
        <div className="mt-5 border-t pt-4">
          {issues.length === 0 ? (
            <p className="flex items-center gap-2 text-sm text-emerald-600">
              <CheckCircle2 className="size-4" /> Valid — {urlCount} URL{urlCount === 1 ? "" : "s"} found, no issues detected.
            </p>
          ) : (
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">
                {urlCount} URL{urlCount === 1 ? "" : "s"} found — {errors.length} error{errors.length === 1 ? "" : "s"}, {warnings.length} warning{warnings.length === 1 ? "" : "s"}
              </p>
              {issues.map((issue, i) => (
                <p key={i} className={`flex items-start gap-2 text-sm ${issue.level === "error" ? "text-destructive" : "text-amber-600"}`}>
                  {issue.level === "error" ? <XCircle className="mt-0.5 size-4 shrink-0" /> : <AlertTriangle className="mt-0.5 size-4 shrink-0" />}
                  {issue.message}
                </p>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

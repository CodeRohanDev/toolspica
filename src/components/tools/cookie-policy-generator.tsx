"use client";

import { LegalDocGenerator } from "@/components/tools/legal-doc-generator";
import { generateCookiePolicy } from "@/lib/legal-templates";

export function CookiePolicyGenerator() {
  return <LegalDocGenerator generate={generateCookiePolicy} />;
}

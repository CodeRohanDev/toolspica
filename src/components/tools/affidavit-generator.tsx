"use client";

import { LegalDocGenerator } from "@/components/tools/legal-doc-generator";
import { generateAffidavit } from "@/lib/legal-templates";

export function AffidavitGenerator() {
  return <LegalDocGenerator generate={generateAffidavit} />;
}

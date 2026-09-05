"use client";

import { LegalDocGenerator } from "@/components/tools/legal-doc-generator";
import { generateTermsAndConditions } from "@/lib/legal-templates";

export function TermsAndConditionsGenerator() {
  return <LegalDocGenerator generate={generateTermsAndConditions} />;
}

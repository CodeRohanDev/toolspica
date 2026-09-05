"use client";

import { LegalDocGenerator } from "@/components/tools/legal-doc-generator";
import { generatePrivacyPolicy } from "@/lib/legal-templates";

export function PrivacyPolicyGenerator() {
  return <LegalDocGenerator generate={generatePrivacyPolicy} />;
}

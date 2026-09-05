"use client";

import { LegalDocGenerator } from "@/components/tools/legal-doc-generator";
import { generateDisclaimer } from "@/lib/legal-templates";

export function DisclaimerGenerator() {
  return <LegalDocGenerator generate={generateDisclaimer} />;
}

"use client";

import { LegalDocGenerator } from "@/components/tools/legal-doc-generator";
import { generateRefundPolicy } from "@/lib/legal-templates";

export function RefundPolicyGenerator() {
  return <LegalDocGenerator generate={generateRefundPolicy} />;
}

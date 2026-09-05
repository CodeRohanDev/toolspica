"use client";

import { LegalDocGenerator } from "@/components/tools/legal-doc-generator";
import { generateEmploymentContract } from "@/lib/legal-templates";

export function EmploymentContractGenerator() {
  return <LegalDocGenerator generate={generateEmploymentContract} />;
}

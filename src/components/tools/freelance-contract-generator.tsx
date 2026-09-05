"use client";

import { LegalDocGenerator } from "@/components/tools/legal-doc-generator";
import { generateFreelanceContract } from "@/lib/legal-templates";

export function FreelanceContractGenerator() {
  return <LegalDocGenerator generate={generateFreelanceContract} />;
}

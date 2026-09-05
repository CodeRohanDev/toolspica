"use client";

import { LegalDocGenerator } from "@/components/tools/legal-doc-generator";
import { generateRentalAgreement } from "@/lib/legal-templates";

export function RentalAgreementGenerator() {
  return <LegalDocGenerator generate={generateRentalAgreement} />;
}

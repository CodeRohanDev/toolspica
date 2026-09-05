"use client";

import { LegalDocGenerator } from "@/components/tools/legal-doc-generator";
import { generateNda } from "@/lib/legal-templates";

export function NdaGenerator() {
  return <LegalDocGenerator generate={generateNda} />;
}

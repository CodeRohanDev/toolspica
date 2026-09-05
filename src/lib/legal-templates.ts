export interface LegalDocFields {
  companyName: string;
  website: string;
  email: string;
  effectiveDate: string;
}

const NOTICE =
  "This document is a general-purpose template generated for informational convenience. It is not legal advice, and does not account for the specific laws of your jurisdiction or industry. Have it reviewed by a qualified lawyer before relying on it.";

function fmt(fields: LegalDocFields) {
  return {
    company: fields.companyName || "[Your Company]",
    site: fields.website || "[yourwebsite.com]",
    email: fields.email || "[contact@yourwebsite.com]",
    date: fields.effectiveDate || "[Effective Date]",
  };
}

export function generatePrivacyPolicy(fields: LegalDocFields): string {
  const { company, site, email, date } = fmt(fields);
  return `PRIVACY POLICY
Effective Date: ${date}

${company} ("we", "us", or "our") operates ${site}. This Privacy Policy explains what information we collect, how we use it, and the choices you have.

1. INFORMATION WE COLLECT
We may collect information you provide directly (such as your name and email when you contact us), and information collected automatically (such as IP address, browser type, and pages visited) via cookies or similar technology.

2. HOW WE USE INFORMATION
We use collected information to operate and improve ${site}, respond to inquiries, and comply with legal obligations. We do not sell your personal information to third parties.

3. COOKIES
${site} may use cookies to remember preferences and understand usage. You can disable cookies in your browser settings, though some features may not work correctly without them.

4. THIRD-PARTY SERVICES
We may use third-party services (such as analytics or advertising providers) that collect information under their own privacy policies.

5. DATA SECURITY
We take reasonable measures to protect information we hold, but no method of transmission or storage is 100% secure.

6. YOUR RIGHTS
You may request access to, correction of, or deletion of your personal information by contacting us at ${email}.

7. CHANGES TO THIS POLICY
We may update this Privacy Policy from time to time. Continued use of ${site} after changes constitutes acceptance of the revised policy.

8. CONTACT US
Questions about this Privacy Policy can be sent to ${email}.

---
${NOTICE}`;
}

export function generateTermsAndConditions(fields: LegalDocFields): string {
  const { company, site, email, date } = fmt(fields);
  return `TERMS AND CONDITIONS
Effective Date: ${date}

Welcome to ${site}, operated by ${company}. By accessing or using this website, you agree to be bound by these Terms and Conditions.

1. USE OF THE SITE
You agree to use ${site} only for lawful purposes and in a way that does not infringe the rights of, or restrict or inhibit the use of, this site by any third party.

2. INTELLECTUAL PROPERTY
All content on ${site}, unless otherwise stated, is the property of ${company} and is protected by copyright and trademark law.

3. USER CONDUCT
You agree not to misuse ${site}, including attempting unauthorized access, distributing malware, or scraping content without permission.

4. LIMITATION OF LIABILITY
${company} shall not be liable for any indirect, incidental, or consequential damages arising from your use of ${site}.

5. THIRD-PARTY LINKS
${site} may contain links to third-party websites. We are not responsible for the content or practices of any linked site.

6. TERMINATION
We reserve the right to suspend or terminate access to ${site} for any user who violates these Terms.

7. GOVERNING LAW
These Terms are governed by the laws applicable to ${company}'s place of business, without regard to conflict-of-law provisions.

8. CHANGES TO TERMS
We may revise these Terms at any time. Continued use of ${site} after changes constitutes acceptance.

9. CONTACT US
Questions about these Terms can be sent to ${email}.

---
${NOTICE}`;
}

export function generateNda(fields: LegalDocFields): string {
  const { company, email, date } = fmt(fields);
  return `MUTUAL NON-DISCLOSURE AGREEMENT

This Non-Disclosure Agreement ("Agreement") is entered into as of ${date}, between ${company} ("Disclosing Party") and the undersigned recipient ("Receiving Party").

1. PURPOSE
The parties wish to discuss a potential business relationship, during which each may disclose confidential information to the other.

2. DEFINITION OF CONFIDENTIAL INFORMATION
"Confidential Information" means any non-public information disclosed by one party to the other, whether oral, written, or in any other form, that is designated as confidential or that reasonably should be understood to be confidential.

3. OBLIGATIONS OF RECEIVING PARTY
The Receiving Party agrees to: (a) hold the Confidential Information in strict confidence; (b) not disclose it to any third party without prior written consent; (c) use it solely for the purpose of evaluating the potential business relationship.

4. EXCLUSIONS
Confidential Information does not include information that: is or becomes publicly available through no fault of the Receiving Party; was already known to the Receiving Party prior to disclosure; or is independently developed without use of the Confidential Information.

5. TERM
This Agreement remains in effect for two (2) years from the date first written above, unless terminated earlier by mutual written consent.

6. NO LICENSE
Nothing in this Agreement grants either party any license or rights to the other's intellectual property.

7. GOVERNING LAW
This Agreement is governed by the laws applicable to ${company}'s place of business.

Disclosing Party: ${company} (${email})
Receiving Party: _______________________

Signature: _______________________  Date: _______________

---
${NOTICE}`;
}

export function generateDisclaimer(fields: LegalDocFields): string {
  const { company, site, email, date } = fmt(fields);
  return `DISCLAIMER
Effective Date: ${date}

The information provided by ${company} on ${site} is for general informational purposes only. All information is provided in good faith; however, we make no representation or warranty of any kind, express or implied, regarding the accuracy, adequacy, validity, reliability, or completeness of any information on the site.

1. NO PROFESSIONAL ADVICE
The content on ${site} is not intended to be a substitute for professional advice (legal, financial, medical, or otherwise). Always seek the guidance of a qualified professional with any questions you may have.

2. EXTERNAL LINKS DISCLAIMER
${site} may contain links to other websites. We do not warrant, endorse, or assume responsibility for the accuracy or reliability of any information offered by third-party sites.

3. LIMITATION OF LIABILITY
Under no circumstance shall ${company} have any liability for any loss or damage incurred as a result of the use of ${site} or reliance on any information provided.

4. CONTACT US
Questions about this Disclaimer can be sent to ${email}.

---
${NOTICE}`;
}

export function generateRefundPolicy(fields: LegalDocFields): string {
  const { company, site, email, date } = fmt(fields);
  return `REFUND POLICY
Effective Date: ${date}

Thank you for purchasing from ${company} via ${site}. This Refund Policy outlines the terms under which refunds are provided.

1. ELIGIBILITY
Refund requests must be submitted within 30 days of purchase. To be eligible, the request must include proof of purchase and a reason for the request.

2. NON-REFUNDABLE ITEMS
Certain items or services may be marked as non-refundable at the time of purchase, including digital goods that have already been downloaded or accessed.

3. HOW TO REQUEST A REFUND
Send a refund request to ${email} with your order details. We will review the request and respond within 5-7 business days.

4. REFUND PROCESSING
Approved refunds are issued to the original payment method within 5-10 business days, depending on your payment provider.

5. LATE OR MISSING REFUNDS
If you haven't received a refund within the expected timeframe, first check with your bank or card provider, then contact us at ${email} if the issue persists.

6. CHANGES TO THIS POLICY
${company} reserves the right to modify this Refund Policy at any time. Changes take effect immediately upon posting to ${site}.

7. CONTACT US
Questions about this Refund Policy can be sent to ${email}.

---
${NOTICE}`;
}

export function generateEmploymentContract(fields: LegalDocFields): string {
  const { company, email, date } = fmt(fields);
  return `EMPLOYMENT AGREEMENT

This Employment Agreement ("Agreement") is entered into as of ${date}, between ${company} ("Employer") and the undersigned employee ("Employee").

1. POSITION AND DUTIES
Employee agrees to serve in the position agreed upon with Employer, performing duties as reasonably assigned and consistent with that role.

2. COMPENSATION
Employer agrees to pay Employee the salary or wage agreed upon, payable on Employer's standard payroll schedule, subject to applicable withholdings.

3. EMPLOYMENT TYPE
This Agreement does not guarantee employment for any specific duration. Employment is at-will unless a fixed term is separately agreed in writing, meaning either party may terminate the relationship as permitted by applicable law.

4. CONFIDENTIALITY
Employee agrees not to disclose Employer's confidential business information, trade secrets, or proprietary data, during or after the term of employment.

5. BENEFITS
Employee will be eligible for benefits in accordance with Employer's standard policies then in effect, as separately documented.

6. TERMINATION
Either party may terminate this Agreement by providing written notice, subject to any statutory notice period required by applicable law.

7. GOVERNING LAW
This Agreement is governed by the laws applicable to ${company}'s place of business.

Employer: ${company} (${email})
Employee: _______________________

Signature: _______________________  Date: _______________

---
${NOTICE}`;
}

export function generateRentalAgreement(fields: LegalDocFields): string {
  const { company, email, date } = fmt(fields);
  return `RESIDENTIAL LEASE AGREEMENT

This Lease Agreement ("Agreement") is entered into as of ${date}, between ${company} ("Landlord") and the undersigned tenant ("Tenant").

1. PROPERTY
Landlord agrees to rent to Tenant the residential property described and agreed upon between the parties (the "Property").

2. TERM
This lease begins on the date above and continues for the term agreed upon by both parties, unless earlier terminated as provided herein.

3. RENT
Tenant agrees to pay the agreed monthly rent on or before the due date specified, by the payment method agreed with Landlord.

4. SECURITY DEPOSIT
Tenant shall pay a security deposit, refundable at the end of the tenancy less any deductions for damage beyond normal wear and tear, as permitted by applicable law.

5. USE OF PROPERTY
Tenant agrees to use the Property solely as a private residence and not for any illegal purpose, and to comply with all applicable laws and building rules.

6. MAINTENANCE
Tenant agrees to maintain the Property in good condition and promptly notify Landlord of any needed repairs. Landlord is responsible for major structural and system repairs unless caused by Tenant's negligence.

7. TERMINATION
Either party may terminate this Agreement in accordance with the notice period required by applicable local law.

8. GOVERNING LAW
This Agreement is governed by the laws applicable to the location of the Property.

Landlord: ${company} (${email})
Tenant: _______________________

Signature: _______________________  Date: _______________

---
${NOTICE}`;
}

export function generateFreelanceContract(fields: LegalDocFields): string {
  const { company, email, date } = fmt(fields);
  return `FREELANCE SERVICES AGREEMENT

This Freelance Services Agreement ("Agreement") is entered into as of ${date}, between ${company} ("Client") and the undersigned freelancer ("Contractor").

1. SCOPE OF WORK
Contractor agrees to perform the services described and agreed upon between the parties (the "Services") to a professional standard.

2. PAYMENT
Client agrees to pay Contractor the agreed fee according to the payment schedule and method agreed upon before work begins.

3. INDEPENDENT CONTRACTOR STATUS
Contractor is an independent contractor, not an employee of Client. Contractor is responsible for their own taxes, insurance, and benefits.

4. OWNERSHIP OF WORK
Upon full payment, ownership of the completed deliverables transfers to Client, except for any pre-existing tools, templates, or intellectual property Contractor used to produce the work, which Contractor retains.

5. CONFIDENTIALITY
Contractor agrees not to disclose Client's confidential information shared in connection with the Services.

6. REVISIONS
The number of revisions included, if any, should be agreed upon separately; additional revisions beyond that scope may incur additional fees.

7. TERMINATION
Either party may terminate this Agreement with written notice; Contractor is entitled to payment for work completed up to the termination date.

8. GOVERNING LAW
This Agreement is governed by the laws applicable to ${company}'s place of business.

Client: ${company} (${email})
Contractor: _______________________

Signature: _______________________  Date: _______________

---
${NOTICE}`;
}

export function generateAffidavit(fields: LegalDocFields): string {
  const { company, date } = fmt(fields);
  return `AFFIDAVIT

State of: _______________________
County of: _______________________

I, the undersigned, being duly sworn, depose and state as follows, in connection with ${company}, as of ${date}:

1. I am over the age of 18 and competent to make this affidavit.

2. The facts stated in this affidavit are true and correct to the best of my personal knowledge, unless otherwise stated to be based on information and belief.

3. [State the specific facts being affirmed here — replace this line with the actual statement(s) relevant to your situation.]

4. I make this affidavit for the purpose stated above and for no other purpose.

I declare under penalty of perjury that the foregoing is true and correct.

Signature: _______________________  Date: _______________
Printed Name: _______________________

Subscribed and sworn to before me this _____ day of ______________, 20____.

Notary Public: _______________________
My commission expires: _______________________

---
${NOTICE} Affidavits in particular are jurisdiction-specific sworn legal documents — have this reviewed by a notary or lawyer before signing.`;
}

export function generateCookiePolicy(fields: LegalDocFields): string {
  const { company, site, email, date } = fmt(fields);
  return `COOKIE POLICY
Effective Date: ${date}

This Cookie Policy explains how ${company} uses cookies and similar technologies on ${site}.

1. WHAT ARE COOKIES
Cookies are small text files stored on your device when you visit a website. They help the site remember information about your visit.

2. TYPES OF COOKIES WE USE
- Essential cookies: required for the site to function correctly.
- Analytics cookies: help us understand how visitors use ${site}.
- Advertising cookies: used to deliver relevant ads and measure their performance.

3. THIRD-PARTY COOKIES
Some cookies are placed by third-party services that appear on ${site}, such as analytics or advertising providers. These are governed by the respective third party's own privacy policy.

4. MANAGING COOKIES
Most browsers let you refuse or delete cookies through their settings. Disabling cookies may affect the functionality of ${site}.

5. CHANGES TO THIS POLICY
We may update this Cookie Policy periodically. Continued use of ${site} after changes constitutes acceptance of the revised policy.

6. CONTACT US
Questions about this Cookie Policy can be sent to ${email}.

---
${NOTICE}`;
}

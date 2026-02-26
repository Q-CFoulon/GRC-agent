/**
 * GLBA - Gramm-Leach-Bliley Act
 * Financial Services Modernization Act of 1999
 */

import { FrameworkInfo, ControlRequirement, ComplianceFramework } from '../types/framework.js';

export const glbaFramework: FrameworkInfo = {
  id: ComplianceFramework.GLBA,
  name: 'Gramm-Leach-Bliley Act (Financial Privacy Rule & Safeguards Rule)',
  version: '1999 (2023 FTC Safeguards Rule Amendment)',
  description: 'GLBA requires financial institutions to explain their information-sharing practices to customers and to safeguard sensitive data. The Safeguards Rule requires implementation of a comprehensive information security program.',
  organization: 'Federal Trade Commission (FTC) / Federal Banking Regulators',
  total_controls: 42,
  categories: ['Financial Privacy Rule', 'Safeguards Rule', 'Pretexting Provisions', 'Information Security Program'],
  url: 'https://www.ftc.gov/business-guidance/privacy-security/gramm-leach-bliley-act'
};

export const glbaControls: Record<string, ControlRequirement> = {
  // Privacy Rule Requirements
  'GLBA.Privacy.Notice': {
    id: 'GLBA.Privacy.Notice',
    title: 'Privacy Notice to Consumers',
    description: 'Financial institutions must provide clear and conspicuous privacy notices to consumers describing information-sharing practices.',
    implementation: 'Develop privacy notice with required disclosures, deliver at customer relationship establishment and annually.',
    assessment: 'Review privacy notice content and delivery procedures.',
    relatedControls: ['GLBA.Privacy.OptOut', 'GLBA.Privacy.Content']
  },
  'GLBA.Privacy.Content': {
    id: 'GLBA.Privacy.Content',
    title: 'Privacy Notice Content Requirements',
    description: 'Privacy notices must describe categories of NPI collected, categories of affiliates/nonaffiliates with whom info is shared, and consumer opt-out rights.',
    implementation: 'Include all required content categories in privacy notice.',
    assessment: 'Review privacy notice for completeness of required content.',
    relatedControls: ['GLBA.Privacy.Notice']
  },
  'GLBA.Privacy.OptOut': {
    id: 'GLBA.Privacy.OptOut',
    title: 'Opt-Out Rights for Nonaffiliate Sharing',
    description: 'Consumers must be given the opportunity to opt out of having their NPI shared with nonaffiliated third parties.',
    implementation: 'Provide opt-out mechanism, honor opt-out requests, maintain opt-out records.',
    assessment: 'Review opt-out mechanisms and enforcement.',
    relatedControls: ['GLBA.Privacy.Notice']
  },
  'GLBA.Privacy.Exception': {
    id: 'GLBA.Privacy.Exception',
    title: 'Exceptions to Opt-Out',
    description: 'Certain information sharing does not require opt-out rights (e.g., service providers, joint marketing agreements).',
    implementation: 'Identify sharing that falls under exceptions, maintain contracts for service providers.',
    assessment: 'Review exception applicability and contractual safeguards.',
    relatedControls: ['GLBA.Privacy.OptOut']
  },

  // Safeguards Rule Requirements (16 CFR Part 314)
  'GLBA.Safeguards.314.3': {
    id: 'GLBA.Safeguards.314.3',
    title: 'Information Security Program',
    description: 'Implement a comprehensive information security program that is written and appropriate to size and complexity of operations.',
    implementation: 'Develop written information security program, tailor to organizational risks.',
    assessment: 'Review information security program documentation and appropriateness.',
    relatedControls: ['GLBA.Safeguards.314.4', 'GLBA.Safeguards.314.5']
  },
  'GLBA.Safeguards.314.4(a)': {
    id: 'GLBA.Safeguards.314.4(a)',
    title: 'Qualified Individual Designation',
    description: 'Designate a qualified individual responsible for overseeing and implementing the information security program.',
    implementation: 'Designate qualified individual (CISO or equivalent), define responsibilities, ensure adequate authority.',
    assessment: 'Review qualified individual designation and responsibilities.',
    relatedControls: ['GLBA.Safeguards.314.4(i)']
  },
  'GLBA.Safeguards.314.4(b)': {
    id: 'GLBA.Safeguards.314.4(b)',
    title: 'Risk Assessment',
    description: 'Base the information security program on a written risk assessment that identifies reasonably foreseeable internal and external risks.',
    implementation: 'Conduct written risk assessment, identify threats and vulnerabilities, assess likelihood and impact.',
    assessment: 'Review risk assessment methodology and documentation.',
    relatedControls: ['GLBA.Safeguards.314.4(c)']
  },
  'GLBA.Safeguards.314.4(c)': {
    id: 'GLBA.Safeguards.314.4(c)',
    title: 'Safeguard Design and Implementation',
    description: 'Design and implement safeguards to control the risks identified through risk assessment.',
    implementation: 'Design controls based on risk assessment, implement access controls, encryption, secure development, and change management.',
    assessment: 'Review control design and implementation against identified risks.',
    relatedControls: ['GLBA.Safeguards.314.4(b)', 'GLBA.Safeguards.314.4(d)']
  },
  'GLBA.Safeguards.314.4(c)(1)': {
    id: 'GLBA.Safeguards.314.4(c)(1)',
    title: 'Access Controls',
    description: 'Implement and periodically review access controls, including technical and, as appropriate, physical controls.',
    implementation: 'Implement role-based access, least privilege, periodic access reviews, authentication controls.',
    assessment: 'Review access control configurations and periodic review records.',
    relatedControls: ['GLBA.Safeguards.314.4(c)(3)']
  },
  'GLBA.Safeguards.314.4(c)(2)': {
    id: 'GLBA.Safeguards.314.4(c)(2)',
    title: 'Data Inventory and Classification',
    description: 'Identify and manage the data, personnel, devices, systems, and facilities that enable you to achieve business purposes.',
    implementation: 'Maintain data inventory, classify customer information, track information assets.',
    assessment: 'Review data inventory and classification scheme.',
    relatedControls: ['GLBA.Safeguards.314.4(c)(1)']
  },
  'GLBA.Safeguards.314.4(c)(3)': {
    id: 'GLBA.Safeguards.314.4(c)(3)',
    title: 'Encryption',
    description: 'Encrypt all customer information held or transmitted both in transit and at rest.',
    implementation: 'Implement encryption for data in transit and at rest, manage encryption keys.',
    assessment: 'Review encryption implementation and key management.',
    relatedControls: ['GLBA.Safeguards.314.4(c)(1)']
  },
  'GLBA.Safeguards.314.4(c)(4)': {
    id: 'GLBA.Safeguards.314.4(c)(4)',
    title: 'Secure Development Practices',
    description: 'Adopt secure development practices for in-house developed applications and evaluate security of externally developed applications.',
    implementation: 'Implement SDLC security requirements, conduct security testing, assess third-party applications.',
    assessment: 'Review secure development practices and application security assessments.',
    relatedControls: ['GLBA.Safeguards.314.4(c)(5)']
  },
  'GLBA.Safeguards.314.4(c)(5)': {
    id: 'GLBA.Safeguards.314.4(c)(5)',
    title: 'Multi-Factor Authentication',
    description: 'Implement multi-factor authentication for any individual accessing any information system.',
    implementation: 'Implement MFA for all information system access, manage authentication methods.',
    assessment: 'Review MFA implementation and coverage.',
    relatedControls: ['GLBA.Safeguards.314.4(c)(1)']
  },
  'GLBA.Safeguards.314.4(c)(6)': {
    id: 'GLBA.Safeguards.314.4(c)(6)',
    title: 'Information Disposal',
    description: 'Develop, implement, and maintain procedures for the secure disposal of customer information no later than two years after last use.',
    implementation: 'Define retention periods, implement secure disposal procedures, document destruction.',
    assessment: 'Review disposal procedures and destruction records.',
    relatedControls: ['GLBA.Safeguards.314.4(c)(2)']
  },
  'GLBA.Safeguards.314.4(c)(7)': {
    id: 'GLBA.Safeguards.314.4(c)(7)',
    title: 'Change Management',
    description: 'Adopt procedures for change management.',
    implementation: 'Implement change management process, document changes, test before deployment.',
    assessment: 'Review change management procedures and change records.',
    relatedControls: ['GLBA.Safeguards.314.4(c)(4)']
  },
  'GLBA.Safeguards.314.4(c)(8)': {
    id: 'GLBA.Safeguards.314.4(c)(8)',
    title: 'Activity Monitoring',
    description: 'Implement policies, procedures, and controls to monitor and log the activity of authorized users and detect unauthorized access.',
    implementation: 'Implement logging, SIEM, user activity monitoring, anomaly detection.',
    assessment: 'Review monitoring capabilities and log review procedures.',
    relatedControls: ['GLBA.Safeguards.314.4(d)']
  },
  'GLBA.Safeguards.314.4(d)': {
    id: 'GLBA.Safeguards.314.4(d)',
    title: 'Regular Testing and Monitoring',
    description: 'Regularly test or otherwise monitor the effectiveness of the safeguards\' key controls, systems, and procedures.',
    implementation: 'Conduct continuous monitoring or annual penetration testing and vulnerability assessments.',
    assessment: 'Review testing schedule and results.',
    relatedControls: ['GLBA.Safeguards.314.4(c)']
  },
  'GLBA.Safeguards.314.4(d)(1)': {
    id: 'GLBA.Safeguards.314.4(d)(1)',
    title: 'Continuous Monitoring or Annual Penetration Testing',
    description: 'Either conduct continuous monitoring or annual penetration testing and biannual vulnerability assessments.',
    implementation: 'Implement continuous monitoring program or conduct annual pen tests and biannual vulnerability scans.',
    assessment: 'Review monitoring or testing documentation and findings.',
    relatedControls: ['GLBA.Safeguards.314.4(d)(2)']
  },
  'GLBA.Safeguards.314.4(d)(2)': {
    id: 'GLBA.Safeguards.314.4(d)(2)',
    title: 'System-Wide Scans Every Six Months',
    description: 'If not conducting continuous monitoring, conduct system-wide vulnerability assessments at least every six months.',
    implementation: 'Schedule and conduct vulnerability assessments, remediate findings.',
    assessment: 'Review vulnerability assessment reports and remediation tracking.',
    relatedControls: ['GLBA.Safeguards.314.4(d)(1)']
  },
  'GLBA.Safeguards.314.4(e)': {
    id: 'GLBA.Safeguards.314.4(e)',
    title: 'Security Awareness Training',
    description: 'Implement policies and procedures to ensure personnel are able to enact the information security program.',
    implementation: 'Provide security awareness training, verify understanding, conduct periodic refreshers.',
    assessment: 'Review training program and completion records.',
    relatedControls: ['GLBA.Safeguards.314.4(e)(1)']
  },
  'GLBA.Safeguards.314.4(e)(1)': {
    id: 'GLBA.Safeguards.314.4(e)(1)',
    title: 'Specialized Training for Security Personnel',
    description: 'Provide specialized training for security personnel.',
    implementation: 'Identify security personnel, provide role-specific training, maintain certifications.',
    assessment: 'Review specialized training program and certifications.',
    relatedControls: ['GLBA.Safeguards.314.4(e)']
  },
  'GLBA.Safeguards.314.4(f)': {
    id: 'GLBA.Safeguards.314.4(f)',
    title: 'Service Provider Oversight',
    description: 'Oversee service providers by taking steps to select and retain service providers capable of maintaining appropriate safeguards.',
    implementation: 'Conduct due diligence, require contractual safeguards, periodically assess provider compliance.',
    assessment: 'Review service provider selection, contracts, and assessments.',
    relatedControls: ['GLBA.Safeguards.314.4(f)(3)']
  },
  'GLBA.Safeguards.314.4(f)(3)': {
    id: 'GLBA.Safeguards.314.4(f)(3)',
    title: 'Service Provider Contract Requirements',
    description: 'Require service providers by contract to implement and maintain appropriate safeguards.',
    implementation: 'Include required security provisions in contracts, review annually.',
    assessment: 'Review service provider contract terms.',
    relatedControls: ['GLBA.Safeguards.314.4(f)']
  },
  'GLBA.Safeguards.314.4(g)': {
    id: 'GLBA.Safeguards.314.4(g)',
    title: 'Program Evaluation and Adjustment',
    description: 'Evaluate and adjust the information security program in light of testing results, changes to operations, and other circumstances.',
    implementation: 'Review program effectiveness, update based on changes, document adjustments.',
    assessment: 'Review program evaluation records and updates.',
    relatedControls: ['GLBA.Safeguards.314.4(d)']
  },
  'GLBA.Safeguards.314.4(h)': {
    id: 'GLBA.Safeguards.314.4(h)',
    title: 'Incident Response Plan',
    description: 'Establish a written incident response plan addressing how to respond to security events materially affecting the confidentiality, integrity, or availability of customer information.',
    implementation: 'Develop written incident response plan, define roles, test annually.',
    assessment: 'Review incident response plan and testing records.',
    relatedControls: ['GLBA.Safeguards.314.4(h)(2)']
  },
  'GLBA.Safeguards.314.4(h)(2)': {
    id: 'GLBA.Safeguards.314.4(h)(2)',
    title: 'Annual Incident Response Plan Review',
    description: 'Review and revise the incident response plan at least annually.',
    implementation: 'Conduct annual review, update based on lessons learned and changes.',
    assessment: 'Review plan revision history and update documentation.',
    relatedControls: ['GLBA.Safeguards.314.4(h)']
  },
  'GLBA.Safeguards.314.4(i)': {
    id: 'GLBA.Safeguards.314.4(i)',
    title: 'Board Reporting',
    description: 'The qualified individual shall report in writing, at least annually, to the board of directors or equivalent governing body.',
    implementation: 'Prepare annual written report on security program status, present to board.',
    assessment: 'Review board reports and presentation records.',
    relatedControls: ['GLBA.Safeguards.314.4(a)']
  },
  'GLBA.Safeguards.314.5': {
    id: 'GLBA.Safeguards.314.5',
    title: 'Exemptions for Small Financial Institutions',
    description: 'Financial institutions maintaining customer information of fewer than 5,000 consumers are exempt from certain requirements.',
    implementation: 'Determine applicability of exemptions, document consumer count.',
    assessment: 'Review exemption determination and consumer count documentation.',
    relatedControls: ['GLBA.Safeguards.314.3']
  }
};

export default { glbaFramework, glbaControls };

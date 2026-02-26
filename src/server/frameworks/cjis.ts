/**
 * CJIS - Criminal Justice Information Services Security Policy
 * Version 5.9.2 Framework
 */

import { FrameworkInfo, ControlRequirement, ComplianceFramework } from '../types/framework.js';

export const cjisFramework: FrameworkInfo = {
  id: ComplianceFramework.CJIS,
  name: 'Criminal Justice Information Services Security Policy',
  version: '5.9.2',
  description: 'The CJIS Security Policy provides the minimum security requirements for access to FBI Criminal Justice Information Services (CJIS) Division data. It covers data protection requirements for law enforcement and criminal justice agencies.',
  organization: 'FBI Criminal Justice Information Services',
  total_controls: 78,
  categories: [
    'Policy Area 1: Information Exchange Agreements',
    'Policy Area 2: Security Awareness Training',
    'Policy Area 3: Incident Response',
    'Policy Area 4: Auditing and Accountability',
    'Policy Area 5: Access Control',
    'Policy Area 6: Identification and Authentication',
    'Policy Area 7: Configuration Management',
    'Policy Area 8: Media Protection',
    'Policy Area 9: Physical Protection',
    'Policy Area 10: Systems and Communications Protection',
    'Policy Area 11: Formal Audits',
    'Policy Area 12: Personnel Security',
    'Policy Area 13: Mobile Devices'
  ],
  url: 'https://www.fbi.gov/services/cjis/cjis-security-policy-resource-center'
};

export const cjisControls: Record<string, ControlRequirement> = {
  // Policy Area 1: Information Exchange Agreements
  'CJIS-1.1': {
    id: 'CJIS-1.1',
    title: 'Information Exchange Agreements',
    description: 'Agencies must have a signed, approved CJIS Security Addendum (CSA) or Management Control Agreement (MCA) with FBI CJIS for access to CJI.',
    implementation: 'Execute appropriate agreements with FBI CJIS Division. Maintain signed copies of all agreements.',
    assessment: 'Verify current signed agreements are on file with FBI CJIS.',
    relatedControls: ['CJIS-1.2', 'CJIS-12.1']
  },
  'CJIS-1.2': {
    id: 'CJIS-1.2',
    title: 'Outsourcing Standards',
    description: 'Agencies contracting for services involving CJI must ensure contractors comply with CJIS Security Policy.',
    implementation: 'Include CJIS Security Policy requirements in contracts. Require contractors to sign the CJIS Security Addendum.',
    assessment: 'Review contracts for CJIS compliance language and signed addendums.',
    relatedControls: ['CJIS-1.1', 'CJIS-12.2']
  },
  'CJIS-1.3': {
    id: 'CJIS-1.3',
    title: 'Secondary Dissemination',
    description: 'Agencies must control secondary dissemination of CJI to other authorized agencies.',
    implementation: 'Document procedures for CJI sharing. Track all secondary dissemination activities.',
    assessment: 'Review dissemination logs and procedures.',
    relatedControls: ['CJIS-1.1', 'CJIS-5.1']
  },

  // Policy Area 2: Security Awareness Training
  'CJIS-2.1': {
    id: 'CJIS-2.1',
    title: 'Security Awareness Training',
    description: 'All personnel with access to CJI must complete security awareness training within six months of assignment and biennially thereafter.',
    implementation: 'Implement security awareness training program covering CJIS requirements. Track training completion dates.',
    assessment: 'Review training records for currency and completion.',
    relatedControls: ['CJIS-2.2', 'CJIS-12.1']
  },
  'CJIS-2.2': {
    id: 'CJIS-2.2',
    title: 'Security Training Records',
    description: 'Maintain records of security awareness training for audit purposes.',
    implementation: 'Establish training record management system. Document training dates, content, and attendees.',
    assessment: 'Verify training records are complete and retained appropriately.',
    relatedControls: ['CJIS-2.1', 'CJIS-4.1']
  },
  'CJIS-2.3': {
    id: 'CJIS-2.3',
    title: 'Local Agency Security Officer Training',
    description: 'Local Agency Security Officers (LASO) must receive specialized training on their responsibilities.',
    implementation: 'Provide LASO-specific training. Document role-based training requirements.',
    assessment: 'Verify LASO training completion and currency.',
    relatedControls: ['CJIS-2.1', 'CJIS-11.1']
  },

  // Policy Area 3: Incident Response
  'CJIS-3.1': {
    id: 'CJIS-3.1',
    title: 'Incident Response',
    description: 'Agencies must have an incident response plan for responding to information security incidents involving CJI.',
    implementation: 'Develop and maintain incident response procedures specific to CJI. Define roles and responsibilities.',
    assessment: 'Review incident response plan for completeness and currency.',
    relatedControls: ['CJIS-3.2', 'CJIS-3.3']
  },
  'CJIS-3.2': {
    id: 'CJIS-3.2',
    title: 'Incident Reporting',
    description: 'Security incidents involving CJI must be reported to the FBI CJIS ISO within 24 hours.',
    implementation: 'Establish incident reporting procedures. Define escalation paths.',
    assessment: 'Review incident logs and reporting timeliness.',
    relatedControls: ['CJIS-3.1', 'CJIS-4.1']
  },
  'CJIS-3.3': {
    id: 'CJIS-3.3',
    title: 'Incident Handling',
    description: 'Implement incident handling capability including preparation, detection, containment, eradication, and recovery.',
    implementation: 'Train personnel on incident handling procedures. Conduct periodic exercises.',
    assessment: 'Evaluate incident handling capabilities through exercises and actual incidents.',
    relatedControls: ['CJIS-3.1', 'CJIS-3.2']
  },

  // Policy Area 4: Auditing and Accountability
  'CJIS-4.1': {
    id: 'CJIS-4.1',
    title: 'Auditable Events',
    description: 'Information systems must generate audit records for specified events including logon, logoff, and access to CJI.',
    implementation: 'Configure systems to capture required audit events. Define audit requirements.',
    assessment: 'Verify audit logging is enabled and capturing required events.',
    relatedControls: ['CJIS-4.2', 'CJIS-4.3']
  },
  'CJIS-4.2': {
    id: 'CJIS-4.2',
    title: 'Content of Audit Records',
    description: 'Audit records must contain sufficient information to establish what events occurred, when, where, sources, outcomes, and identity of individuals.',
    implementation: 'Configure audit logs to capture date/time, event type, user identity, success/failure, and affected data.',
    assessment: 'Review audit log content for completeness.',
    relatedControls: ['CJIS-4.1', 'CJIS-4.4']
  },
  'CJIS-4.3': {
    id: 'CJIS-4.3',
    title: 'Audit Record Retention',
    description: 'Agencies must retain audit records for at least one year online and three years offline.',
    implementation: 'Implement audit log retention policies. Archive logs according to retention schedule.',
    assessment: 'Verify audit retention meets minimum requirements.',
    relatedControls: ['CJIS-4.1', 'CJIS-4.2']
  },
  'CJIS-4.4': {
    id: 'CJIS-4.4',
    title: 'Audit Monitoring and Analysis',
    description: 'Agencies must review and analyze audit records for indications of inappropriate or unusual activity.',
    implementation: 'Establish audit review procedures. Implement automated analysis tools where appropriate.',
    assessment: 'Review audit monitoring procedures and sample reviews.',
    relatedControls: ['CJIS-4.1', 'CJIS-3.1']
  },
  'CJIS-4.5': {
    id: 'CJIS-4.5',
    title: 'Protection of Audit Information',
    description: 'Protect audit information and tools from unauthorized access, modification, and deletion.',
    implementation: 'Restrict access to audit logs and tools. Implement integrity protection.',
    assessment: 'Verify access controls on audit logs and tools.',
    relatedControls: ['CJIS-4.1', 'CJIS-5.1']
  },
  'CJIS-4.6': {
    id: 'CJIS-4.6',
    title: 'Audit Record Generation',
    description: 'Ensure audit record generation capability and allocate sufficient storage capacity.',
    implementation: 'Monitor audit storage capacity. Implement alerts for capacity thresholds.',
    assessment: 'Review audit system capacity and availability.',
    relatedControls: ['CJIS-4.1', 'CJIS-7.1']
  },

  // Policy Area 5: Access Control
  'CJIS-5.1': {
    id: 'CJIS-5.1',
    title: 'Access Control Policy',
    description: 'Agencies must develop and implement policies to restrict access to CJI to authorized personnel only.',
    implementation: 'Document access control policies. Define authorized user categories and access levels.',
    assessment: 'Review access control policies for completeness.',
    relatedControls: ['CJIS-5.2', 'CJIS-6.1']
  },
  'CJIS-5.2': {
    id: 'CJIS-5.2',
    title: 'Account Management',
    description: 'Agencies must identify authorized users, assign unique identifiers, and manage user accounts throughout their lifecycle.',
    implementation: 'Implement account management procedures. Assign unique user IDs. Remove accounts promptly upon termination.',
    assessment: 'Review account management procedures and sample accounts.',
    relatedControls: ['CJIS-5.1', 'CJIS-6.2']
  },
  'CJIS-5.3': {
    id: 'CJIS-5.3',
    title: 'Access Enforcement',
    description: 'Information systems must enforce approved authorizations for logical access.',
    implementation: 'Configure systems to enforce access controls. Implement role-based access.',
    assessment: 'Test access control enforcement.',
    relatedControls: ['CJIS-5.1', 'CJIS-5.2']
  },
  'CJIS-5.4': {
    id: 'CJIS-5.4',
    title: 'Information Flow Enforcement',
    description: 'Control the flow of CJI within the system and between interconnected systems.',
    implementation: 'Implement boundary controls. Document authorized data flows.',
    assessment: 'Review data flow documentation and controls.',
    relatedControls: ['CJIS-5.1', 'CJIS-10.1']
  },
  'CJIS-5.5': {
    id: 'CJIS-5.5',
    title: 'Separation of Duties',
    description: 'Separate duties of individuals as necessary to prevent malicious activity.',
    implementation: 'Define incompatible roles. Implement technical controls where possible.',
    assessment: 'Review role definitions and separation controls.',
    relatedControls: ['CJIS-5.1', 'CJIS-12.1']
  },
  'CJIS-5.6': {
    id: 'CJIS-5.6',
    title: 'Least Privilege',
    description: 'Employ the principle of least privilege, allowing only authorized access necessary for job functions.',
    implementation: 'Review and minimize access rights. Conduct periodic access reviews.',
    assessment: 'Review access assignments against job requirements.',
    relatedControls: ['CJIS-5.1', 'CJIS-5.2']
  },
  'CJIS-5.7': {
    id: 'CJIS-5.7',
    title: 'Unsuccessful Logon Attempts',
    description: 'Enforce a limit on consecutive invalid access attempts and automatically lock accounts.',
    implementation: 'Configure account lockout after specified failed attempts. Define lockout duration.',
    assessment: 'Verify lockout policies are enforced.',
    relatedControls: ['CJIS-5.2', 'CJIS-6.1']
  },
  'CJIS-5.8': {
    id: 'CJIS-5.8',
    title: 'Session Lock',
    description: 'Prevent access to the system by initiating a session lock after a period of inactivity.',
    implementation: 'Configure automatic session lock after specified inactivity period.',
    assessment: 'Verify session lock is enforced.',
    relatedControls: ['CJIS-5.1', 'CJIS-6.1']
  },
  'CJIS-5.9': {
    id: 'CJIS-5.9',
    title: 'Remote Access',
    description: 'Authorize, monitor, and control remote access methods.',
    implementation: 'Document approved remote access methods. Implement monitoring and controls.',
    assessment: 'Review remote access authorizations and controls.',
    relatedControls: ['CJIS-5.1', 'CJIS-10.1']
  },
  'CJIS-5.10': {
    id: 'CJIS-5.10',
    title: 'Wireless Access',
    description: 'Establish usage restrictions and configuration requirements for wireless access.',
    implementation: 'Document wireless policies. Implement wireless security controls.',
    assessment: 'Review wireless configurations and policies.',
    relatedControls: ['CJIS-5.9', 'CJIS-10.1']
  },
  'CJIS-5.11': {
    id: 'CJIS-5.11',
    title: 'Publicly Accessible Content',
    description: 'Designate individuals authorized to post CJI on publicly accessible systems and review content.',
    implementation: 'Restrict posting authority. Implement review processes.',
    assessment: 'Review posting procedures and authorizations.',
    relatedControls: ['CJIS-5.1', 'CJIS-1.3']
  },

  // Policy Area 6: Identification and Authentication
  'CJIS-6.1': {
    id: 'CJIS-6.1',
    title: 'Identification and Authentication Policy',
    description: 'Agencies must uniquely identify and authenticate all users accessing CJI.',
    implementation: 'Assign unique user identifiers. Implement authentication mechanisms.',
    assessment: 'Verify unique identification and authentication requirements.',
    relatedControls: ['CJIS-6.2', 'CJIS-5.2']
  },
  'CJIS-6.2': {
    id: 'CJIS-6.2',
    title: 'Identifier Management',
    description: 'Manage user identifiers throughout their lifecycle, preventing reuse for specified periods.',
    implementation: 'Establish identifier management procedures. Prevent identifier reuse.',
    assessment: 'Review identifier management practices.',
    relatedControls: ['CJIS-6.1', 'CJIS-5.2']
  },
  'CJIS-6.3': {
    id: 'CJIS-6.3',
    title: 'Authenticator Management',
    description: 'Manage information system authenticators including password complexity and change requirements.',
    implementation: 'Implement password policies with minimum 8-character complexity. Enforce password change procedures.',
    assessment: 'Review password policies and enforcement.',
    relatedControls: ['CJIS-6.1', 'CJIS-6.4']
  },
  'CJIS-6.4': {
    id: 'CJIS-6.4',
    title: 'Advanced Authentication',
    description: 'Implement advanced authentication (multi-factor) for accessing CJI from outside the agency location.',
    implementation: 'Deploy MFA for all remote CJI access. Use credential plus biometric, token, or smartcard.',
    assessment: 'Verify MFA implementation for remote access.',
    relatedControls: ['CJIS-6.3', 'CJIS-5.9']
  },
  'CJIS-6.5': {
    id: 'CJIS-6.5',
    title: 'Authenticator Feedback',
    description: 'Obscure feedback of authentication information during authentication.',
    implementation: 'Mask password entry. Obscure authentication feedback.',
    assessment: 'Verify authentication feedback is obscured.',
    relatedControls: ['CJIS-6.3', 'CJIS-6.1']
  },
  'CJIS-6.6': {
    id: 'CJIS-6.6',
    title: 'Cryptographic Module Authentication',
    description: 'Authenticate cryptographic modules when used for accessing CJI.',
    implementation: 'Implement module authentication for cryptographic components.',
    assessment: 'Verify cryptographic module authentication.',
    relatedControls: ['CJIS-6.1', 'CJIS-10.3']
  },

  // Policy Area 7: Configuration Management
  'CJIS-7.1': {
    id: 'CJIS-7.1',
    title: 'Baseline Configuration',
    description: 'Develop, document, and maintain baseline configurations for information systems.',
    implementation: 'Document baseline configurations. Maintain configuration documentation.',
    assessment: 'Review baseline documentation for currency and completeness.',
    relatedControls: ['CJIS-7.2', 'CJIS-7.3']
  },
  'CJIS-7.2': {
    id: 'CJIS-7.2',
    title: 'Configuration Change Control',
    description: 'Analyze changes to information systems for security impact and manage changes through change control processes.',
    implementation: 'Implement change management process. Analyze security impact of changes.',
    assessment: 'Review change control processes and security analysis.',
    relatedControls: ['CJIS-7.1', 'CJIS-7.4']
  },
  'CJIS-7.3': {
    id: 'CJIS-7.3',
    title: 'Security Configuration Settings',
    description: 'Establish and document configuration settings for security features.',
    implementation: 'Define security configuration standards. Document settings.',
    assessment: 'Review security configuration documentation.',
    relatedControls: ['CJIS-7.1', 'CJIS-7.2']
  },
  'CJIS-7.4': {
    id: 'CJIS-7.4',
    title: 'Access Restrictions for Change',
    description: 'Define, document, and enforce access restrictions for changing system configurations.',
    implementation: 'Restrict change authority. Implement role-based change controls.',
    assessment: 'Review change access restrictions.',
    relatedControls: ['CJIS-7.2', 'CJIS-5.1']
  },
  'CJIS-7.5': {
    id: 'CJIS-7.5',
    title: 'Least Functionality',
    description: 'Configure systems to provide only essential capabilities and prohibit or restrict unused functions.',
    implementation: 'Disable unnecessary services. Remove unused software.',
    assessment: 'Review system configurations for unnecessary components.',
    relatedControls: ['CJIS-7.1', 'CJIS-7.3']
  },

  // Policy Area 8: Media Protection
  'CJIS-8.1': {
    id: 'CJIS-8.1',
    title: 'Media Protection Policy',
    description: 'Develop and implement policies for protecting system media containing CJI.',
    implementation: 'Document media protection policies. Define handling requirements.',
    assessment: 'Review media protection policies.',
    relatedControls: ['CJIS-8.2', 'CJIS-8.3']
  },
  'CJIS-8.2': {
    id: 'CJIS-8.2',
    title: 'Media Access',
    description: 'Restrict access to CJI-containing media to authorized individuals.',
    implementation: 'Control physical access to media. Maintain access logs.',
    assessment: 'Review media access controls and logs.',
    relatedControls: ['CJIS-8.1', 'CJIS-9.1']
  },
  'CJIS-8.3': {
    id: 'CJIS-8.3',
    title: 'Media Storage',
    description: 'Store media containing CJI in a secure location.',
    implementation: 'Secure media storage areas. Implement physical security controls.',
    assessment: 'Inspect media storage locations.',
    relatedControls: ['CJIS-8.1', 'CJIS-9.1']
  },
  'CJIS-8.4': {
    id: 'CJIS-8.4',
    title: 'Media Transport',
    description: 'Protect and control media during transport outside controlled areas.',
    implementation: 'Implement transport procedures. Use encryption for transported media.',
    assessment: 'Review transport procedures and controls.',
    relatedControls: ['CJIS-8.1', 'CJIS-10.3']
  },
  'CJIS-8.5': {
    id: 'CJIS-8.5',
    title: 'Media Sanitization and Disposal',
    description: 'Sanitize or destroy media containing CJI before disposal or reuse.',
    implementation: 'Implement sanitization procedures. Document disposal activities.',
    assessment: 'Review sanitization procedures and disposal records.',
    relatedControls: ['CJIS-8.1', 'CJIS-8.3']
  },
  'CJIS-8.6': {
    id: 'CJIS-8.6',
    title: 'Digital Media Disposal',
    description: 'Use approved techniques for clearing, purging, and destroying digital media.',
    implementation: 'Use NIST-approved sanitization methods. Document destruction.',
    assessment: 'Verify sanitization methods meet standards.',
    relatedControls: ['CJIS-8.5', 'CJIS-8.1']
  },

  // Policy Area 9: Physical Protection
  'CJIS-9.1': {
    id: 'CJIS-9.1',
    title: 'Physical Access Authorizations',
    description: 'Maintain lists of authorized individuals with physical access to secure areas.',
    implementation: 'Maintain access lists. Review and update regularly.',
    assessment: 'Review access authorization lists.',
    relatedControls: ['CJIS-9.2', 'CJIS-5.1']
  },
  'CJIS-9.2': {
    id: 'CJIS-9.2',
    title: 'Physical Access Control',
    description: 'Control physical access to areas containing CJI-processing systems.',
    implementation: 'Implement physical access controls. Use badges, locks, or biometrics.',
    assessment: 'Inspect physical access control mechanisms.',
    relatedControls: ['CJIS-9.1', 'CJIS-9.3']
  },
  'CJIS-9.3': {
    id: 'CJIS-9.3',
    title: 'Monitoring Physical Access',
    description: 'Monitor physical access to detect and respond to physical security incidents.',
    implementation: 'Implement monitoring systems. Define response procedures.',
    assessment: 'Review monitoring capabilities and response procedures.',
    relatedControls: ['CJIS-9.2', 'CJIS-3.1']
  },
  'CJIS-9.4': {
    id: 'CJIS-9.4',
    title: 'Visitor Control',
    description: 'Control and escort visitors and monitor visitor activity in secure areas.',
    implementation: 'Implement visitor procedures. Maintain visitor logs.',
    assessment: 'Review visitor procedures and logs.',
    relatedControls: ['CJIS-9.1', 'CJIS-9.3']
  },
  'CJIS-9.5': {
    id: 'CJIS-9.5',
    title: 'Delivery and Removal',
    description: 'Control delivery and removal of information system components.',
    implementation: 'Document delivery/removal procedures. Maintain records.',
    assessment: 'Review delivery/removal records.',
    relatedControls: ['CJIS-9.2', 'CJIS-8.4']
  },
  'CJIS-9.6': {
    id: 'CJIS-9.6',
    title: 'Position and Screen Content',
    description: 'Position information system displays and devices to prevent unauthorized viewing.',
    implementation: 'Position screens away from public view. Use privacy screens where needed.',
    assessment: 'Inspect display positioning.',
    relatedControls: ['CJIS-9.2', 'CJIS-5.8']
  },

  // Policy Area 10: Systems and Communications Protection
  'CJIS-10.1': {
    id: 'CJIS-10.1',
    title: 'Boundary Protection',
    description: 'Monitor and control communications at external and key internal network boundaries.',
    implementation: 'Deploy firewalls at network boundaries. Monitor traffic.',
    assessment: 'Review boundary protection mechanisms.',
    relatedControls: ['CJIS-10.2', 'CJIS-10.4']
  },
  'CJIS-10.2': {
    id: 'CJIS-10.2',
    title: 'Transmission Confidentiality',
    description: 'Protect the confidentiality of CJI during transmission.',
    implementation: 'Encrypt CJI in transit. Use TLS or VPN for network transmission.',
    assessment: 'Verify encryption is used for CJI transmission.',
    relatedControls: ['CJIS-10.1', 'CJIS-10.3']
  },
  'CJIS-10.3': {
    id: 'CJIS-10.3',
    title: 'Encryption Requirements',
    description: 'Use FIPS 140-2 validated cryptographic modules for encryption of CJI.',
    implementation: 'Deploy FIPS 140-2 validated encryption. Document encryption implementations.',
    assessment: 'Verify FIPS validation of cryptographic modules.',
    relatedControls: ['CJIS-10.2', 'CJIS-10.4']
  },
  'CJIS-10.4': {
    id: 'CJIS-10.4',
    title: 'System Monitoring',
    description: 'Monitor information systems to detect attacks and unauthorized access.',
    implementation: 'Deploy IDS/IPS. Implement log monitoring.',
    assessment: 'Review monitoring capabilities and alert handling.',
    relatedControls: ['CJIS-10.1', 'CJIS-4.4']
  },
  'CJIS-10.5': {
    id: 'CJIS-10.5',
    title: 'Information Input Restrictions',
    description: 'Restrict information inputs to authorized personnel.',
    implementation: 'Control data entry access. Validate input authority.',
    assessment: 'Review input access controls.',
    relatedControls: ['CJIS-5.1', 'CJIS-10.6']
  },
  'CJIS-10.6': {
    id: 'CJIS-10.6',
    title: 'Information Input Validation',
    description: 'Check information for accuracy, completeness, validity, and authenticity.',
    implementation: 'Implement input validation. Check data integrity.',
    assessment: 'Review validation mechanisms.',
    relatedControls: ['CJIS-10.5', 'CJIS-10.7']
  },
  'CJIS-10.7': {
    id: 'CJIS-10.7',
    title: 'Flaw Remediation',
    description: 'Identify, report, and correct information system flaws timely.',
    implementation: 'Implement patch management. Track vulnerabilities.',
    assessment: 'Review patching procedures and currency.',
    relatedControls: ['CJIS-10.8', 'CJIS-7.2']
  },
  'CJIS-10.8': {
    id: 'CJIS-10.8',
    title: 'Malicious Code Protection',
    description: 'Implement and maintain malicious code protection mechanisms.',
    implementation: 'Deploy anti-malware solutions. Keep signatures current.',
    assessment: 'Review anti-malware deployment and updates.',
    relatedControls: ['CJIS-10.7', 'CJIS-10.4']
  },
  'CJIS-10.9': {
    id: 'CJIS-10.9',
    title: 'Software and Information Integrity',
    description: 'Detect and protect against unauthorized changes to software and information.',
    implementation: 'Implement integrity monitoring. Detect unauthorized changes.',
    assessment: 'Review integrity monitoring capabilities.',
    relatedControls: ['CJIS-10.7', 'CJIS-10.8']
  },
  'CJIS-10.10': {
    id: 'CJIS-10.10',
    title: 'Denial of Service Protection',
    description: 'Protect against denial of service attacks.',
    implementation: 'Implement DoS protection measures. Plan for service continuity.',
    assessment: 'Review DoS protection measures.',
    relatedControls: ['CJIS-10.1', 'CJIS-10.4']
  },

  // Policy Area 11: Formal Audits
  'CJIS-11.1': {
    id: 'CJIS-11.1',
    title: 'Formal Audit Processes',
    description: 'Subject agency to triennial audit of compliance with CJIS Security Policy.',
    implementation: 'Prepare for and participate in CJIS audits. Address audit findings.',
    assessment: 'Review most recent audit results and corrective actions.',
    relatedControls: ['CJIS-11.2', 'CJIS-4.1']
  },
  'CJIS-11.2': {
    id: 'CJIS-11.2',
    title: 'Audit Compliance',
    description: 'Maintain compliance documentation and evidence for audit purposes.',
    implementation: 'Document compliance activities. Maintain evidence repository.',
    assessment: 'Review compliance documentation.',
    relatedControls: ['CJIS-11.1', 'CJIS-4.3']
  },
  'CJIS-11.3': {
    id: 'CJIS-11.3',
    title: 'Corrective Action Plans',
    description: 'Develop and implement corrective action plans for audit findings.',
    implementation: 'Document remediation plans. Track completion.',
    assessment: 'Review corrective action plans and status.',
    relatedControls: ['CJIS-11.1', 'CJIS-11.2']
  },

  // Policy Area 12: Personnel Security
  'CJIS-12.1': {
    id: 'CJIS-12.1',
    title: 'Personnel Screening',
    description: 'Screen individuals with access to CJI through state and national fingerprint-based background checks.',
    implementation: 'Conduct fingerprint-based checks for all personnel with CJI access.',
    assessment: 'Verify background check completion for personnel.',
    relatedControls: ['CJIS-12.2', 'CJIS-5.1']
  },
  'CJIS-12.2': {
    id: 'CJIS-12.2',
    title: 'Personnel Termination',
    description: 'Revoke access to CJI upon termination of employment or contract.',
    implementation: 'Implement termination procedures. Revoke access immediately.',
    assessment: 'Review termination procedures and timeliness.',
    relatedControls: ['CJIS-12.1', 'CJIS-5.2']
  },
  'CJIS-12.3': {
    id: 'CJIS-12.3',
    title: 'Personnel Transfer',
    description: 'Review and adjust access rights when personnel transfer to different roles.',
    implementation: 'Review access upon transfer. Adjust as needed.',
    assessment: 'Review transfer access adjustment procedures.',
    relatedControls: ['CJIS-12.2', 'CJIS-5.6']
  },
  'CJIS-12.4': {
    id: 'CJIS-12.4',
    title: 'Personnel Sanctions',
    description: 'Employ a formal sanctions process for personnel violating security policies.',
    implementation: 'Document sanctions process. Apply consistently.',
    assessment: 'Review sanctions policy and application.',
    relatedControls: ['CJIS-12.1', 'CJIS-5.1']
  },

  // Policy Area 13: Mobile Devices
  'CJIS-13.1': {
    id: 'CJIS-13.1',
    title: 'Mobile Device Policy',
    description: 'Develop and implement policies for use of mobile devices accessing CJI.',
    implementation: 'Document mobile device policies. Define acceptable use.',
    assessment: 'Review mobile device policies.',
    relatedControls: ['CJIS-13.2', 'CJIS-5.10']
  },
  'CJIS-13.2': {
    id: 'CJIS-13.2',
    title: 'Mobile Device Security',
    description: 'Implement security controls for mobile devices including authentication and encryption.',
    implementation: 'Deploy MDM solutions. Require device encryption and authentication.',
    assessment: 'Review mobile device configuration requirements.',
    relatedControls: ['CJIS-13.1', 'CJIS-10.3']
  },
  'CJIS-13.3': {
    id: 'CJIS-13.3',
    title: 'Mobile Device Loss',
    description: 'Plan for and respond to lost or stolen mobile devices.',
    implementation: 'Implement remote wipe capability. Define response procedures.',
    assessment: 'Review lost device procedures and capabilities.',
    relatedControls: ['CJIS-13.2', 'CJIS-3.1']
  },
  'CJIS-13.4': {
    id: 'CJIS-13.4',
    title: 'Mobile Application Security',
    description: 'Control and secure mobile applications used to access CJI.',
    implementation: 'Approve and control mobile applications. Implement application security.',
    assessment: 'Review mobile application controls.',
    relatedControls: ['CJIS-13.1', 'CJIS-7.5']
  }
};

export function getCJISControl(controlId: string): ControlRequirement | undefined {
  return cjisControls[controlId];
}

export function getCJISControlsByCategory(category: string): ControlRequirement[] {
  return Object.values(cjisControls).filter(control => 
    control.id.startsWith(category.split('-')[0] + '-')
  );
}

export function getCJISControlsByPolicyArea(policyArea: number): ControlRequirement[] {
  const prefix = `CJIS-${policyArea}.`;
  return Object.values(cjisControls).filter(control => 
    control.id.startsWith(prefix)
  );
}

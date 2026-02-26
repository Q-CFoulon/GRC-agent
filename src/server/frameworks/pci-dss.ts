/**
 * PCI DSS - Payment Card Industry Data Security Standard
 * Version 4.0 Framework
 */

import { FrameworkInfo, ControlRequirement, ComplianceFramework } from '../types/framework.js';

export const pciDSSFramework: FrameworkInfo = {
  id: ComplianceFramework.PCI_DSS,
  name: 'Payment Card Industry Data Security Standard',
  version: '4.0',
  description: 'PCI DSS 4.0 is a set of security standards designed to ensure that all companies that accept, process, store or transmit credit card information maintain a secure environment. It protects cardholder data and reduces credit card fraud.',
  organization: 'PCI Security Standards Council',
  total_controls: 64,
  categories: [
    'Requirement 1: Network Security Controls',
    'Requirement 2: Secure Configurations',
    'Requirement 3: Protect Stored Account Data',
    'Requirement 4: Protect Cardholder Data in Transit',
    'Requirement 5: Malicious Software Protection',
    'Requirement 6: Secure Systems and Software',
    'Requirement 7: Access Control',
    'Requirement 8: User Identification and Authentication',
    'Requirement 9: Physical Access Restriction',
    'Requirement 10: Logging and Monitoring',
    'Requirement 11: Security Testing',
    'Requirement 12: Security Policies and Programs'
  ],
  url: 'https://www.pcisecuritystandards.org/document_library/'
};

export const pciDSSControls: Record<string, ControlRequirement> = {
  // Requirement 1: Install and Maintain Network Security Controls
  'PCI-1.1': {
    id: 'PCI-1.1',
    title: 'Network Security Control Processes',
    description: 'Processes and mechanisms for installing and maintaining network security controls are defined and understood.',
    implementation: 'Document network security policies and procedures. Define responsibility for maintaining controls.',
    assessment: 'Review network security documentation and assigned responsibilities.',
    relatedControls: ['PCI-1.2', 'PCI-12.3']
  },
  'PCI-1.2': {
    id: 'PCI-1.2',
    title: 'Network Security Control Configuration',
    description: 'Network security controls (NSCs) are configured and maintained.',
    implementation: 'Configure firewalls and routers with security rules. Document all configurations.',
    assessment: 'Review NSC configurations against standards.',
    relatedControls: ['PCI-1.1', 'PCI-1.3']
  },
  'PCI-1.3': {
    id: 'PCI-1.3',
    title: 'Network Access Restriction',
    description: 'Network access to and from the cardholder data environment is restricted.',
    implementation: 'Implement network segmentation. Restrict inbound and outbound traffic to necessary flows.',
    assessment: 'Verify network segmentation and traffic restrictions.',
    relatedControls: ['PCI-1.2', 'PCI-1.4']
  },
  'PCI-1.4': {
    id: 'PCI-1.4',
    title: 'Network Connections Between Trusted and Untrusted Networks',
    description: 'Network connections between trusted and untrusted networks are controlled.',
    implementation: 'Deploy DMZ for public-facing systems. Control all traffic between network zones.',
    assessment: 'Review network architecture and zone controls.',
    relatedControls: ['PCI-1.3', 'PCI-1.5']
  },
  'PCI-1.5': {
    id: 'PCI-1.5',
    title: 'Risks to CDE from Computing Devices',
    description: 'Risks to the CDE from computing devices that are able to connect to both untrusted networks and the CDE are mitigated.',
    implementation: 'Implement personal firewall on devices. Control device connections.',
    assessment: 'Verify personal firewall configuration on endpoints.',
    relatedControls: ['PCI-1.4', 'PCI-5.2']
  },

  // Requirement 2: Apply Secure Configurations to All System Components
  'PCI-2.1': {
    id: 'PCI-2.1',
    title: 'Secure Configuration Processes',
    description: 'Processes and mechanisms for applying secure configurations are defined and understood.',
    implementation: 'Document configuration standards. Define change control processes.',
    assessment: 'Review configuration management documentation.',
    relatedControls: ['PCI-2.2', 'PCI-12.3']
  },
  'PCI-2.2': {
    id: 'PCI-2.2',
    title: 'System Components Securely Configured',
    description: 'System components are configured and managed securely.',
    implementation: 'Apply hardening standards. Remove unnecessary services. Change default passwords.',
    assessment: 'Verify secure configuration against baselines.',
    relatedControls: ['PCI-2.1', 'PCI-2.3']
  },
  'PCI-2.3': {
    id: 'PCI-2.3',
    title: 'Wireless Environments Secured',
    description: 'Wireless environments are configured and managed securely.',
    implementation: 'Change wireless defaults. Use strong encryption (WPA3 or WPA2-Enterprise).',
    assessment: 'Review wireless configurations and encryption.',
    relatedControls: ['PCI-2.2', 'PCI-4.2']
  },

  // Requirement 3: Protect Stored Account Data
  'PCI-3.1': {
    id: 'PCI-3.1',
    title: 'Account Data Protection Processes',
    description: 'Processes and mechanisms for protecting stored account data are defined and understood.',
    implementation: 'Document data retention and disposal policies. Define data protection procedures.',
    assessment: 'Review data protection documentation.',
    relatedControls: ['PCI-3.2', 'PCI-12.3']
  },
  'PCI-3.2': {
    id: 'PCI-3.2',
    title: 'Sensitive Authentication Data Storage',
    description: 'Sensitive authentication data (SAD) is not stored after authorization.',
    implementation: 'Do not store full track, CVV, or PIN. Implement secure deletion after authorization.',
    assessment: 'Verify SAD is not stored post-authorization.',
    relatedControls: ['PCI-3.1', 'PCI-3.3']
  },
  'PCI-3.3': {
    id: 'PCI-3.3',
    title: 'PAN Display Masking',
    description: 'Primary Account Number (PAN) is masked when displayed.',
    implementation: 'Display only first six and last four digits. Mask middle digits.',
    assessment: 'Verify PAN masking in all display locations.',
    relatedControls: ['PCI-3.2', 'PCI-3.4']
  },
  'PCI-3.4': {
    id: 'PCI-3.4',
    title: 'PAN Rendered Unreadable',
    description: 'PAN is rendered unreadable anywhere it is stored.',
    implementation: 'Use strong encryption, truncation, tokenization, or hashing for stored PAN.',
    assessment: 'Verify PAN protection methods.',
    relatedControls: ['PCI-3.3', 'PCI-3.5']
  },
  'PCI-3.5': {
    id: 'PCI-3.5',
    title: 'Cryptographic Keys Protected',
    description: 'Cryptographic keys used to protect stored account data are secured.',
    implementation: 'Implement key management procedures. Restrict key access. Store keys securely.',
    assessment: 'Review key management procedures and access controls.',
    relatedControls: ['PCI-3.4', 'PCI-3.6']
  },
  'PCI-3.6': {
    id: 'PCI-3.6',
    title: 'Cryptographic Key Management',
    description: 'Cryptographic keys are managed properly throughout their lifecycle.',
    implementation: 'Document key generation, distribution, storage, rotation, and destruction procedures.',
    assessment: 'Review key lifecycle management.',
    relatedControls: ['PCI-3.5', 'PCI-3.7']
  },
  'PCI-3.7': {
    id: 'PCI-3.7',
    title: 'Where Cryptography is Used',
    description: 'Where cryptography is used to protect stored account data, policies and procedures are documented.',
    implementation: 'Document cryptographic implementations and key management.',
    assessment: 'Review cryptography documentation.',
    relatedControls: ['PCI-3.6', 'PCI-4.1']
  },

  // Requirement 4: Protect Cardholder Data with Strong Cryptography During Transmission
  'PCI-4.1': {
    id: 'PCI-4.1',
    title: 'Data Transmission Protection Processes',
    description: 'Processes and mechanisms for protecting cardholder data in transit are defined and understood.',
    implementation: 'Document encryption requirements for data in transit. Define approved protocols.',
    assessment: 'Review transmission protection policies.',
    relatedControls: ['PCI-4.2', 'PCI-12.3']
  },
  'PCI-4.2': {
    id: 'PCI-4.2',
    title: 'PAN Protected During Transmission',
    description: 'PAN is protected with strong cryptography during transmission over open, public networks.',
    implementation: 'Use TLS 1.2 or higher. Verify certificates. Disable weak protocols.',
    assessment: 'Test encryption strength during transmission.',
    relatedControls: ['PCI-4.1', 'PCI-4.3']
  },
  'PCI-4.3': {
    id: 'PCI-4.3',
    title: 'PAN Protection via End-User Technologies',
    description: 'PAN is protected with strong cryptography when transmitted over end-user messaging technologies.',
    implementation: 'Do not send unencrypted PAN via email, SMS, or chat. Use encryption if needed.',
    assessment: 'Review messaging policies and encryption.',
    relatedControls: ['PCI-4.2', 'PCI-3.4']
  },

  // Requirement 5: Protect All Systems and Networks from Malicious Software
  'PCI-5.1': {
    id: 'PCI-5.1',
    title: 'Malware Protection Processes',
    description: 'Processes and mechanisms for protecting systems from malware are defined and understood.',
    implementation: 'Document anti-malware policies. Define malware response procedures.',
    assessment: 'Review malware protection documentation.',
    relatedControls: ['PCI-5.2', 'PCI-12.3']
  },
  'PCI-5.2': {
    id: 'PCI-5.2',
    title: 'Malware Detection and Prevention',
    description: 'Malware is prevented, detected, and addressed.',
    implementation: 'Deploy anti-malware on all systems. Enable real-time protection.',
    assessment: 'Verify anti-malware deployment and configuration.',
    relatedControls: ['PCI-5.1', 'PCI-5.3']
  },
  'PCI-5.3': {
    id: 'PCI-5.3',
    title: 'Anti-Malware Mechanisms Active',
    description: 'Anti-malware mechanisms and processes are active, maintained, and monitored.',
    implementation: 'Ensure automatic updates. Generate logs. Prevent user disabling.',
    assessment: 'Verify update status and monitoring.',
    relatedControls: ['PCI-5.2', 'PCI-5.4']
  },
  'PCI-5.4': {
    id: 'PCI-5.4',
    title: 'Anti-Phishing Mechanisms',
    description: 'Anti-phishing mechanisms protect users against phishing attacks.',
    implementation: 'Deploy email filtering. Implement user awareness training.',
    assessment: 'Review anti-phishing controls and training.',
    relatedControls: ['PCI-5.3', 'PCI-12.6']
  },

  // Requirement 6: Develop and Maintain Secure Systems and Software
  'PCI-6.1': {
    id: 'PCI-6.1',
    title: 'Secure Development Processes',
    description: 'Processes and mechanisms for developing and maintaining secure systems and software are defined and understood.',
    implementation: 'Document secure development lifecycle. Define security requirements.',
    assessment: 'Review SDLC documentation.',
    relatedControls: ['PCI-6.2', 'PCI-12.3']
  },
  'PCI-6.2': {
    id: 'PCI-6.2',
    title: 'Bespoke and Custom Software Security',
    description: 'Bespoke and custom software is developed securely.',
    implementation: 'Train developers. Implement code review. Follow secure coding standards.',
    assessment: 'Review development practices and training records.',
    relatedControls: ['PCI-6.1', 'PCI-6.3']
  },
  'PCI-6.3': {
    id: 'PCI-6.3',
    title: 'Security Vulnerabilities Identified and Addressed',
    description: 'Security vulnerabilities are identified and addressed.',
    implementation: 'Implement vulnerability management. Apply patches within defined timeframes.',
    assessment: 'Review vulnerability management process and patching status.',
    relatedControls: ['PCI-6.2', 'PCI-6.4']
  },
  'PCI-6.4': {
    id: 'PCI-6.4',
    title: 'Public-Facing Web Application Protection',
    description: 'Public-facing web applications are protected against attacks.',
    implementation: 'Deploy WAF or conduct application security testing. Address vulnerabilities.',
    assessment: 'Verify WAF deployment or testing results.',
    relatedControls: ['PCI-6.3', 'PCI-6.5']
  },
  'PCI-6.5': {
    id: 'PCI-6.5',
    title: 'Change Management Processes',
    description: 'Changes to all system components are managed securely.',
    implementation: 'Implement change control. Test changes. Document approvals.',
    assessment: 'Review change management process and records.',
    relatedControls: ['PCI-6.4', 'PCI-2.2']
  },

  // Requirement 7: Restrict Access to System Components and Cardholder Data
  'PCI-7.1': {
    id: 'PCI-7.1',
    title: 'Access Control Processes',
    description: 'Processes and mechanisms for restricting access are defined and understood.',
    implementation: 'Document access control policies. Define role-based access requirements.',
    assessment: 'Review access control documentation.',
    relatedControls: ['PCI-7.2', 'PCI-12.3']
  },
  'PCI-7.2': {
    id: 'PCI-7.2',
    title: 'Access Appropriately Defined and Assigned',
    description: 'Access to system components and data is appropriately defined and assigned.',
    implementation: 'Implement role-based access. Grant minimum necessary access.',
    assessment: 'Review access assignments against job requirements.',
    relatedControls: ['PCI-7.1', 'PCI-7.3']
  },
  'PCI-7.3': {
    id: 'PCI-7.3',
    title: 'Access Control System Configured',
    description: 'Access to system components and data is managed via an access control system.',
    implementation: 'Deploy centralized access control. Enforce access policies technically.',
    assessment: 'Review access control system configuration.',
    relatedControls: ['PCI-7.2', 'PCI-8.3']
  },

  // Requirement 8: Identify Users and Authenticate Access to System Components
  'PCI-8.1': {
    id: 'PCI-8.1',
    title: 'Identification and Authentication Processes',
    description: 'Processes and mechanisms for identifying users and authenticating access are defined and understood.',
    implementation: 'Document authentication policies. Define identification requirements.',
    assessment: 'Review authentication documentation.',
    relatedControls: ['PCI-8.2', 'PCI-12.3']
  },
  'PCI-8.2': {
    id: 'PCI-8.2',
    title: 'User Identification and Authentication',
    description: 'User identification and related accounts are strictly managed.',
    implementation: 'Assign unique IDs. Manage shared accounts. Remove inactive accounts.',
    assessment: 'Review user account management.',
    relatedControls: ['PCI-8.1', 'PCI-8.3']
  },
  'PCI-8.3': {
    id: 'PCI-8.3',
    title: 'Strong Authentication Established',
    description: 'Strong authentication for users and administrators is established and managed.',
    implementation: 'Implement MFA for CDE access. Enforce password complexity.',
    assessment: 'Verify MFA implementation and password policies.',
    relatedControls: ['PCI-8.2', 'PCI-8.4']
  },
  'PCI-8.4': {
    id: 'PCI-8.4',
    title: 'MFA Implementation',
    description: 'Multi-factor authentication is implemented for all access into the CDE.',
    implementation: 'Deploy MFA for administrative access. Require MFA for all CDE access.',
    assessment: 'Test MFA enforcement.',
    relatedControls: ['PCI-8.3', 'PCI-8.5']
  },
  'PCI-8.5': {
    id: 'PCI-8.5',
    title: 'MFA Systems Configured Properly',
    description: 'Multi-factor authentication systems are configured properly.',
    implementation: 'Use independent authentication factors. Prevent replay attacks.',
    assessment: 'Review MFA configuration.',
    relatedControls: ['PCI-8.4', 'PCI-8.6']
  },
  'PCI-8.6': {
    id: 'PCI-8.6',
    title: 'Application and System Account Management',
    description: 'Use of application and system accounts is strictly managed.',
    implementation: 'Control service accounts. Document application account usage.',
    assessment: 'Review application and system account management.',
    relatedControls: ['PCI-8.5', 'PCI-7.2']
  },

  // Requirement 9: Restrict Physical Access to Cardholder Data
  'PCI-9.1': {
    id: 'PCI-9.1',
    title: 'Physical Access Control Processes',
    description: 'Processes and mechanisms for restricting physical access are defined and understood.',
    implementation: 'Document physical security policies. Define access levels.',
    assessment: 'Review physical access documentation.',
    relatedControls: ['PCI-9.2', 'PCI-12.3']
  },
  'PCI-9.2': {
    id: 'PCI-9.2',
    title: 'Physical Access Controls',
    description: 'Physical access controls manage entry into facilities and systems containing cardholder data.',
    implementation: 'Implement badge readers, locks, or biometrics. Control CDE access.',
    assessment: 'Inspect physical access mechanisms.',
    relatedControls: ['PCI-9.1', 'PCI-9.3']
  },
  'PCI-9.3': {
    id: 'PCI-9.3',
    title: 'Physical Access Authorization',
    description: 'Physical access for personnel and visitors is authorized and managed.',
    implementation: 'Maintain authorized access lists. Issue badges to visitors.',
    assessment: 'Review access authorization lists and visitor logs.',
    relatedControls: ['PCI-9.2', 'PCI-9.4']
  },
  'PCI-9.4': {
    id: 'PCI-9.4',
    title: 'Visitor Identification and Authorization',
    description: 'Visitors are authenticated and authorized before entering CDE.',
    implementation: 'Identify visitors. Escort in sensitive areas. Collect badges on exit.',
    assessment: 'Review visitor procedures and logs.',
    relatedControls: ['PCI-9.3', 'PCI-9.5']
  },
  'PCI-9.5': {
    id: 'PCI-9.5',
    title: 'POI Device Protection',
    description: 'Point of interaction devices are protected from tampering and unauthorized substitution.',
    implementation: 'Maintain device inventory. Inspect devices regularly. Train personnel.',
    assessment: 'Review POI device inventory and inspection records.',
    relatedControls: ['PCI-9.4', 'PCI-12.6']
  },

  // Requirement 10: Log and Monitor All Access to System Components and Cardholder Data
  'PCI-10.1': {
    id: 'PCI-10.1',
    title: 'Logging and Monitoring Processes',
    description: 'Processes and mechanisms for logging and monitoring are defined and understood.',
    implementation: 'Document logging policies. Define audit requirements.',
    assessment: 'Review logging documentation.',
    relatedControls: ['PCI-10.2', 'PCI-12.3']
  },
  'PCI-10.2': {
    id: 'PCI-10.2',
    title: 'Audit Logs Implemented',
    description: 'Audit logs are implemented to support detection of anomalies and suspicious activity.',
    implementation: 'Enable logging on all systems. Capture required events.',
    assessment: 'Verify logging is enabled and configured correctly.',
    relatedControls: ['PCI-10.1', 'PCI-10.3']
  },
  'PCI-10.3': {
    id: 'PCI-10.3',
    title: 'Audit Logs Protected',
    description: 'Audit logs are protected from destruction and unauthorized modifications.',
    implementation: 'Restrict log access. Implement log integrity protection.',
    assessment: 'Verify log protection mechanisms.',
    relatedControls: ['PCI-10.2', 'PCI-10.4']
  },
  'PCI-10.4': {
    id: 'PCI-10.4',
    title: 'Audit Logs Reviewed',
    description: 'Audit logs are reviewed to identify anomalies or suspicious activity.',
    implementation: 'Implement daily log review. Use automated analysis tools.',
    assessment: 'Review log analysis procedures and records.',
    relatedControls: ['PCI-10.3', 'PCI-10.5']
  },
  'PCI-10.5': {
    id: 'PCI-10.5',
    title: 'Audit Log History',
    description: 'Audit log history is retained and available for analysis.',
    implementation: 'Retain logs for at least 12 months. Keep 3 months immediately available.',
    assessment: 'Verify log retention meets requirements.',
    relatedControls: ['PCI-10.4', 'PCI-10.6']
  },
  'PCI-10.6': {
    id: 'PCI-10.6',
    title: 'Time Synchronization',
    description: 'Time synchronization mechanisms support consistent time across all systems.',
    implementation: 'Implement NTP or similar. Synchronize all systems to central time source.',
    assessment: 'Verify time synchronization configuration.',
    relatedControls: ['PCI-10.5', 'PCI-10.7']
  },
  'PCI-10.7': {
    id: 'PCI-10.7',
    title: 'Critical Security Control System Failures',
    description: 'Failures of critical security control systems are detected, alerted, and addressed.',
    implementation: 'Monitor security control status. Alert on failures. Respond promptly.',
    assessment: 'Review alerting configuration and response procedures.',
    relatedControls: ['PCI-10.6', 'PCI-12.10']
  },

  // Requirement 11: Test Security of Systems and Networks Regularly
  'PCI-11.1': {
    id: 'PCI-11.1',
    title: 'Security Testing Processes',
    description: 'Processes and mechanisms for regularly testing security are defined and understood.',
    implementation: 'Document testing policies. Define testing schedules and requirements.',
    assessment: 'Review security testing documentation.',
    relatedControls: ['PCI-11.2', 'PCI-12.3']
  },
  'PCI-11.2': {
    id: 'PCI-11.2',
    title: 'Wireless Access Points Identified and Monitored',
    description: 'Authorized and unauthorized wireless access points are managed.',
    implementation: 'Conduct quarterly wireless scans. Detect rogue access points.',
    assessment: 'Review wireless scanning results.',
    relatedControls: ['PCI-11.1', 'PCI-11.3']
  },
  'PCI-11.3': {
    id: 'PCI-11.3',
    title: 'Vulnerability Scanning',
    description: 'Internal and external vulnerabilities are regularly identified, prioritized, and addressed.',
    implementation: 'Conduct quarterly vulnerability scans. Remediate by severity.',
    assessment: 'Review scan results and remediation status.',
    relatedControls: ['PCI-11.2', 'PCI-11.4']
  },
  'PCI-11.4': {
    id: 'PCI-11.4',
    title: 'Penetration Testing',
    description: 'Penetration testing is performed regularly and security weaknesses are corrected.',
    implementation: 'Conduct annual penetration testing. Test after significant changes.',
    assessment: 'Review penetration test results and remediation.',
    relatedControls: ['PCI-11.3', 'PCI-11.5']
  },
  'PCI-11.5': {
    id: 'PCI-11.5',
    title: 'Network Intrusion Detection',
    description: 'Network intrusions and suspicious activity are detected and responded to.',
    implementation: 'Deploy IDS/IPS. Monitor alerts. Respond to incidents.',
    assessment: 'Review IDS/IPS configuration and incident response.',
    relatedControls: ['PCI-11.4', 'PCI-11.6']
  },
  'PCI-11.6': {
    id: 'PCI-11.6',
    title: 'Change Detection Mechanism',
    description: 'Unauthorized changes on payment pages are detected and responded to.',
    implementation: 'Implement change detection on payment pages. Alert on changes.',
    assessment: 'Review change detection mechanisms.',
    relatedControls: ['PCI-11.5', 'PCI-6.5']
  },

  // Requirement 12: Support Information Security with Organizational Policies and Programs
  'PCI-12.1': {
    id: 'PCI-12.1',
    title: 'Information Security Policy',
    description: 'A comprehensive information security policy is known and maintained.',
    implementation: 'Document and publish security policy. Review annually.',
    assessment: 'Review security policy for completeness and currency.',
    relatedControls: ['PCI-12.2', 'PCI-12.3']
  },
  'PCI-12.2': {
    id: 'PCI-12.2',
    title: 'Acceptable Use Policies',
    description: 'Acceptable use policies for end-user technologies are defined and implemented.',
    implementation: 'Document acceptable use. Define approved technologies.',
    assessment: 'Review acceptable use policies.',
    relatedControls: ['PCI-12.1', 'PCI-12.3']
  },
  'PCI-12.3': {
    id: 'PCI-12.3',
    title: 'Policies and Procedures Reviewed',
    description: 'Policies, procedures, and processes are reviewed and updated.',
    implementation: 'Review all documentation annually. Update as needed.',
    assessment: 'Verify review and update activities.',
    relatedControls: ['PCI-12.2', 'PCI-12.4']
  },
  'PCI-12.4': {
    id: 'PCI-12.4',
    title: 'Security Responsibility Defined',
    description: 'PCI DSS compliance responsibilities are clearly defined.',
    implementation: 'Document compliance roles. Assign executive responsibility.',
    assessment: 'Review responsibility assignments.',
    relatedControls: ['PCI-12.3', 'PCI-12.5']
  },
  'PCI-12.5': {
    id: 'PCI-12.5',
    title: 'PCI DSS Scope Documented',
    description: 'PCI DSS scope is documented, confirmed, and maintained.',
    implementation: 'Document CDE scope. Review quarterly. Confirm annually.',
    assessment: 'Review scope documentation and review records.',
    relatedControls: ['PCI-12.4', 'PCI-12.6']
  },
  'PCI-12.6': {
    id: 'PCI-12.6',
    title: 'Security Awareness Program',
    description: 'Security awareness education is an ongoing activity.',
    implementation: 'Implement security awareness program. Train upon hire and annually.',
    assessment: 'Review awareness program and training records.',
    relatedControls: ['PCI-12.5', 'PCI-12.7']
  },
  'PCI-12.7': {
    id: 'PCI-12.7',
    title: 'Personnel Screening',
    description: 'Personnel are screened to reduce risks of attacks from internal sources.',
    implementation: 'Screen personnel with CDE access. Conduct background checks.',
    assessment: 'Review screening records.',
    relatedControls: ['PCI-12.6', 'PCI-12.8']
  },
  'PCI-12.8': {
    id: 'PCI-12.8',
    title: 'Third-Party Service Provider Management',
    description: 'Risk to information assets from TPSP relationships is managed.',
    implementation: 'Maintain TPSP inventory. Obtain compliance evidence. Monitor TPSP status.',
    assessment: 'Review TPSP management program.',
    relatedControls: ['PCI-12.7', 'PCI-12.9']
  },
  'PCI-12.9': {
    id: 'PCI-12.9',
    title: 'TPSP Compliance Acknowledgment',
    description: 'TPSPs acknowledge their responsibility for protecting account data.',
    implementation: 'Obtain written acknowledgment from TPSPs.',
    assessment: 'Review TPSP acknowledgments.',
    relatedControls: ['PCI-12.8', 'PCI-12.10']
  },
  'PCI-12.10': {
    id: 'PCI-12.10',
    title: 'Incident Response Plan',
    description: 'Suspected and confirmed security incidents are responded to immediately.',
    implementation: 'Develop incident response plan. Train team. Test plan annually.',
    assessment: 'Review incident response plan and test results.',
    relatedControls: ['PCI-12.9', 'PCI-10.7']
  }
};

export function getPCIDSSControl(controlId: string): ControlRequirement | undefined {
  return pciDSSControls[controlId];
}

export function getPCIDSSControlsByRequirement(requirementNumber: number): ControlRequirement[] {
  const prefix = `PCI-${requirementNumber}.`;
  return Object.values(pciDSSControls).filter(control => 
    control.id.startsWith(prefix)
  );
}

export function getPCIDSSControlsByCategory(category: string): ControlRequirement[] {
  const requirementMatch = category.match(/Requirement (\d+)/);
  if (requirementMatch) {
    return getPCIDSSControlsByRequirement(parseInt(requirementMatch[1]));
  }
  return [];
}

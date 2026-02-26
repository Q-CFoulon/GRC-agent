/**
 * CMMC - Cybersecurity Maturity Model Certification
 * Version 2.0 Framework
 */

import { FrameworkInfo, ControlRequirement, ComplianceFramework } from '../types/framework.js';

export const cmmcFramework: FrameworkInfo = {
  id: ComplianceFramework.NIST_CMMC,
  name: 'Cybersecurity Maturity Model Certification',
  version: '2.0',
  description: 'CMMC 2.0 is a framework required for defense contractors to protect Federal Contract Information (FCI) and Controlled Unclassified Information (CUI). It is based on NIST SP 800-171 and organized into three maturity levels.',
  organization: 'U.S. Department of Defense (DoD)',
  total_controls: 110,
  categories: ['Access Control (AC)', 'Awareness and Training (AT)', 'Audit and Accountability (AU)', 'Configuration Management (CM)', 'Identification and Authentication (IA)', 'Incident Response (IR)', 'Maintenance (MA)', 'Media Protection (MP)', 'Personnel Security (PS)', 'Physical Protection (PE)', 'Risk Assessment (RA)', 'Security Assessment (CA)', 'System and Communications Protection (SC)', 'System and Information Integrity (SI)'],
  url: 'https://dodcio.defense.gov/CMMC/'
};

export const cmmcControls: Record<string, ControlRequirement> = {
  // Access Control (AC)
  'AC.L1-3.1.1': {
    id: 'AC.L1-3.1.1',
    title: 'Authorized Access Control',
    description: 'Limit information system access to authorized users, processes acting on behalf of authorized users, or devices (including other information systems).',
    implementation: 'Implement access control mechanisms, define authorized users, authenticate all access.',
    assessment: 'Review access control policies and mechanisms.',
    relatedControls: ['AC.L1-3.1.2', 'IA.L1-3.5.1']
  },
  'AC.L1-3.1.2': {
    id: 'AC.L1-3.1.2',
    title: 'Transaction & Function Control',
    description: 'Limit information system access to the types of transactions and functions that authorized users are permitted to execute.',
    implementation: 'Implement role-based access control, limit functions based on job role.',
    assessment: 'Review RBAC implementation and function restrictions.',
    relatedControls: ['AC.L1-3.1.1', 'AC.L2-3.1.5']
  },
  'AC.L1-3.1.20': {
    id: 'AC.L1-3.1.20',
    title: 'External Connections',
    description: 'Verify and control/limit connections to and use of external information systems.',
    implementation: 'Control external connections, implement boundary controls, document authorized connections.',
    assessment: 'Review external connection controls and inventory.',
    relatedControls: ['SC.L1-3.13.1']
  },
  'AC.L1-3.1.22': {
    id: 'AC.L1-3.1.22',
    title: 'Control Public Information',
    description: 'Control information posted or processed on publicly accessible information systems.',
    implementation: 'Review content before public posting, designate authorized individuals.',
    assessment: 'Review public information control procedures.',
    relatedControls: ['AC.L1-3.1.1']
  },
  'AC.L2-3.1.3': {
    id: 'AC.L2-3.1.3',
    title: 'Control CUI Flow',
    description: 'Control the flow of CUI in accordance with approved authorizations.',
    implementation: 'Implement information flow controls, classify data, enforce flow policies.',
    assessment: 'Review information flow controls and CUI handling.',
    relatedControls: ['AC.L2-3.1.4', 'SC.L2-3.13.4']
  },
  'AC.L2-3.1.4': {
    id: 'AC.L2-3.1.4',
    title: 'Separation of Duties',
    description: 'Separate the duties of individuals to reduce the risk of malevolent activity without collusion.',
    implementation: 'Define separation of duties, implement preventive controls.',
    assessment: 'Review SOD implementation and enforcement.',
    relatedControls: ['AC.L2-3.1.3', 'AC.L2-3.1.5']
  },
  'AC.L2-3.1.5': {
    id: 'AC.L2-3.1.5',
    title: 'Least Privilege',
    description: 'Employ the principle of least privilege, including for specific security functions and privileged accounts.',
    implementation: 'Implement least privilege, restrict privileged access.',
    assessment: 'Review least privilege implementation.',
    relatedControls: ['AC.L2-3.1.4', 'AC.L2-3.1.6']
  },
  'AC.L2-3.1.6': {
    id: 'AC.L2-3.1.6',
    title: 'Non-Privileged Account Use',
    description: 'Use non-privileged accounts or roles when accessing nonsecurity functions.',
    implementation: 'Separate admin and user accounts, use standard accounts for daily tasks.',
    assessment: 'Review privileged account usage patterns.',
    relatedControls: ['AC.L2-3.1.5', 'AC.L2-3.1.7']
  },
  'AC.L2-3.1.7': {
    id: 'AC.L2-3.1.7',
    title: 'Privileged Functions',
    description: 'Prevent non-privileged users from executing privileged functions and audit the execution of such functions.',
    implementation: 'Restrict privileged functions, log privileged activities.',
    assessment: 'Review privileged function controls and audit logs.',
    relatedControls: ['AC.L2-3.1.6', 'AU.L2-3.3.1']
  },
  'AC.L2-3.1.8': {
    id: 'AC.L2-3.1.8',
    title: 'Unsuccessful Logon Attempts',
    description: 'Limit unsuccessful logon attempts.',
    implementation: 'Configure account lockout, implement failed attempt limits.',
    assessment: 'Review logon attempt restrictions.',
    relatedControls: ['IA.L2-3.5.3']
  },
  'AC.L2-3.1.9': {
    id: 'AC.L2-3.1.9',
    title: 'Privacy & Security Notices',
    description: 'Provide privacy and security notices consistent with applicable CUI rules.',
    implementation: 'Display warning banners, provide privacy notices.',
    assessment: 'Review banner and notice implementation.',
    relatedControls: ['AC.L2-3.1.10']
  },
  'AC.L2-3.1.10': {
    id: 'AC.L2-3.1.10',
    title: 'Session Lock',
    description: 'Use session lock with pattern-hiding displays to prevent access and viewing of data after a period of inactivity.',
    implementation: 'Configure screen locks, enable pattern-hiding.',
    assessment: 'Review session lock configuration.',
    relatedControls: ['AC.L2-3.1.11']
  },
  'AC.L2-3.1.11': {
    id: 'AC.L2-3.1.11',
    title: 'Session Termination',
    description: 'Terminate (automatically) a user session after a defined condition.',
    implementation: 'Configure session timeouts, automatic logoff.',
    assessment: 'Review session termination settings.',
    relatedControls: ['AC.L2-3.1.10']
  },
  'AC.L2-3.1.12': {
    id: 'AC.L2-3.1.12',
    title: 'Control Remote Access',
    description: 'Monitor and control remote access sessions.',
    implementation: 'Implement remote access monitoring, control VPN sessions.',
    assessment: 'Review remote access controls and monitoring.',
    relatedControls: ['AC.L2-3.1.13', 'AC.L2-3.1.14']
  },
  'AC.L2-3.1.13': {
    id: 'AC.L2-3.1.13',
    title: 'Remote Access Confidentiality',
    description: 'Employ cryptographic mechanisms to protect the confidentiality of remote access sessions.',
    implementation: 'Encrypt remote access, use TLS/VPN.',
    assessment: 'Review remote access encryption.',
    relatedControls: ['AC.L2-3.1.12', 'SC.L2-3.13.8']
  },
  'AC.L2-3.1.14': {
    id: 'AC.L2-3.1.14',
    title: 'Remote Access Routing',
    description: 'Route remote access via managed access control points.',
    implementation: 'Route through VPN concentrators, control access points.',
    assessment: 'Review remote access routing configuration.',
    relatedControls: ['AC.L2-3.1.12', 'SC.L2-3.13.7']
  },
  'AC.L2-3.1.15': {
    id: 'AC.L2-3.1.15',
    title: 'Privileged Remote Access',
    description: 'Authorize remote execution of privileged commands and remote access to security-relevant information.',
    implementation: 'Control privileged remote access, require authorization.',
    assessment: 'Review privileged remote access controls.',
    relatedControls: ['AC.L2-3.1.12', 'AC.L2-3.1.5']
  },
  'AC.L2-3.1.16': {
    id: 'AC.L2-3.1.16',
    title: 'Wireless Access Authorization',
    description: 'Authorize wireless access prior to allowing such connections.',
    implementation: 'Control wireless access, require authorization.',
    assessment: 'Review wireless access authorization.',
    relatedControls: ['AC.L2-3.1.17', 'AC.L2-3.1.18']
  },
  'AC.L2-3.1.17': {
    id: 'AC.L2-3.1.17',
    title: 'Wireless Access Protection',
    description: 'Protect wireless access using authentication and encryption.',
    implementation: 'Implement WPA2/WPA3, strong authentication.',
    assessment: 'Review wireless security configuration.',
    relatedControls: ['AC.L2-3.1.16', 'IA.L2-3.5.3']
  },
  'AC.L2-3.1.18': {
    id: 'AC.L2-3.1.18',
    title: 'Mobile Device Connection',
    description: 'Control connection of mobile devices.',
    implementation: 'Implement MDM, control mobile device connections.',
    assessment: 'Review mobile device controls.',
    relatedControls: ['AC.L2-3.1.16', 'AC.L2-3.1.19']
  },
  'AC.L2-3.1.19': {
    id: 'AC.L2-3.1.19',
    title: 'Encrypt CUI on Mobile',
    description: 'Encrypt CUI on mobile devices and mobile computing platforms.',
    implementation: 'Implement mobile encryption, enforce device encryption.',
    assessment: 'Review mobile device encryption.',
    relatedControls: ['AC.L2-3.1.18', 'SC.L2-3.13.16']
  },
  'AC.L2-3.1.21': {
    id: 'AC.L2-3.1.21',
    title: 'Portable Storage Use',
    description: 'Limit use of portable storage devices on external systems.',
    implementation: 'Control USB storage, implement DLP.',
    assessment: 'Review portable storage controls.',
    relatedControls: ['MP.L2-3.8.7']
  },

  // Awareness and Training (AT)
  'AT.L2-3.2.1': {
    id: 'AT.L2-3.2.1',
    title: 'Role-Based Risk Awareness',
    description: 'Ensure that managers, systems administrators, and users of organizational systems are made aware of the security risks.',
    implementation: 'Provide tailored security awareness training by role.',
    assessment: 'Review training content and completion by role.',
    relatedControls: ['AT.L2-3.2.2', 'AT.L2-3.2.3']
  },
  'AT.L2-3.2.2': {
    id: 'AT.L2-3.2.2',
    title: 'Role-Based Training',
    description: 'Ensure that personnel are trained to carry out their assigned information security-related duties and responsibilities.',
    implementation: 'Develop role-based training program, track completion.',
    assessment: 'Review role-based training and records.',
    relatedControls: ['AT.L2-3.2.1', 'AT.L2-3.2.3']
  },
  'AT.L2-3.2.3': {
    id: 'AT.L2-3.2.3',
    title: 'Insider Threat Awareness',
    description: 'Provide security awareness training on recognizing and reporting potential indicators of insider threat.',
    implementation: 'Include insider threat content in awareness training.',
    assessment: 'Review insider threat training content.',
    relatedControls: ['AT.L2-3.2.1', 'AT.L2-3.2.2']
  },

  // Audit and Accountability (AU)
  'AU.L2-3.3.1': {
    id: 'AU.L2-3.3.1',
    title: 'System Auditing',
    description: 'Create and retain system audit logs and records to the extent needed to enable the monitoring, analysis, investigation, and reporting of unlawful or unauthorized system activity.',
    implementation: 'Enable comprehensive logging, retain logs per policy.',
    assessment: 'Review audit logging configuration and retention.',
    relatedControls: ['AU.L2-3.3.2', 'AU.L2-3.3.3']
  },
  'AU.L2-3.3.2': {
    id: 'AU.L2-3.3.2',
    title: 'Audit Review',
    description: 'Ensure that the actions of individual system users can be uniquely traced to those users so they can be held accountable for their actions.',
    implementation: 'Implement user attribution in logs, unique user IDs.',
    assessment: 'Review user accountability in audit logs.',
    relatedControls: ['AU.L2-3.3.1', 'IA.L2-3.5.1']
  },
  'AU.L2-3.3.3': {
    id: 'AU.L2-3.3.3',
    title: 'Event Review',
    description: 'Review and update logged events.',
    implementation: 'Establish log review procedures, update logging as needed.',
    assessment: 'Review log review procedures and event coverage.',
    relatedControls: ['AU.L2-3.3.1', 'AU.L2-3.3.4']
  },
  'AU.L2-3.3.4': {
    id: 'AU.L2-3.3.4',
    title: 'Audit Failure Alerting',
    description: 'Alert in the event of an audit logging process failure.',
    implementation: 'Configure alerts for logging failures.',
    assessment: 'Review audit failure alerting.',
    relatedControls: ['AU.L2-3.3.3', 'AU.L2-3.3.5']
  },
  'AU.L2-3.3.5': {
    id: 'AU.L2-3.3.5',
    title: 'Audit Correlation',
    description: 'Correlate audit record review, analysis, and reporting processes.',
    implementation: 'Implement SIEM, correlate audit records.',
    assessment: 'Review audit correlation capabilities.',
    relatedControls: ['AU.L2-3.3.4', 'AU.L2-3.3.6']
  },
  'AU.L2-3.3.6': {
    id: 'AU.L2-3.3.6',
    title: 'Audit Reduction and Reporting',
    description: 'Provide audit record reduction and report generation.',
    implementation: 'Implement log aggregation, reporting, and analysis.',
    assessment: 'Review audit reduction and reporting capabilities.',
    relatedControls: ['AU.L2-3.3.5', 'AU.L2-3.3.7']
  },
  'AU.L2-3.3.7': {
    id: 'AU.L2-3.3.7',
    title: 'Authoritative Time Source',
    description: 'Provide a system capability that compares and synchronizes internal system clocks.',
    implementation: 'Implement NTP synchronization across all systems.',
    assessment: 'Review time synchronization configuration.',
    relatedControls: ['AU.L2-3.3.1']
  },
  'AU.L2-3.3.8': {
    id: 'AU.L2-3.3.8',
    title: 'Audit Protection',
    description: 'Protect audit information and audit logging tools from unauthorized access, modification, and deletion.',
    implementation: 'Protect logs from modification, restrict access.',
    assessment: 'Review audit protection controls.',
    relatedControls: ['AU.L2-3.3.1', 'AU.L2-3.3.9']
  },
  'AU.L2-3.3.9': {
    id: 'AU.L2-3.3.9',
    title: 'Audit Management',
    description: 'Limit management of audit logging functionality to a subset of privileged users.',
    implementation: 'Restrict audit administration, separate duties.',
    assessment: 'Review audit management access controls.',
    relatedControls: ['AU.L2-3.3.8']
  },

  // Configuration Management (CM)
  'CM.L2-3.4.1': {
    id: 'CM.L2-3.4.1',
    title: 'System Baselining',
    description: 'Establish and maintain baseline configurations and inventories of organizational systems.',
    implementation: 'Define secure baselines, maintain configuration inventory.',
    assessment: 'Review baseline documentation and inventory.',
    relatedControls: ['CM.L2-3.4.2', 'CM.L2-3.4.3']
  },
  'CM.L2-3.4.2': {
    id: 'CM.L2-3.4.2',
    title: 'Security Configuration Enforcement',
    description: 'Establish and enforce security configuration settings for information technology products.',
    implementation: 'Implement configuration management, enforce settings.',
    assessment: 'Review configuration enforcement.',
    relatedControls: ['CM.L2-3.4.1', 'CM.L2-3.4.3']
  },
  'CM.L2-3.4.3': {
    id: 'CM.L2-3.4.3',
    title: 'System Change Management',
    description: 'Track, review, approve or disapprove, and log changes to organizational systems.',
    implementation: 'Implement change management process, track all changes.',
    assessment: 'Review change management process and records.',
    relatedControls: ['CM.L2-3.4.1', 'CM.L2-3.4.4']
  },
  'CM.L2-3.4.4': {
    id: 'CM.L2-3.4.4',
    title: 'Security Impact Analysis',
    description: 'Analyze the security impact of changes prior to implementation.',
    implementation: 'Conduct security impact analysis for changes.',
    assessment: 'Review security impact analysis documentation.',
    relatedControls: ['CM.L2-3.4.3', 'CM.L2-3.4.5']
  },
  'CM.L2-3.4.5': {
    id: 'CM.L2-3.4.5',
    title: 'Access Restrictions for Change',
    description: 'Define, document, approve, and enforce physical and logical access restrictions.',
    implementation: 'Implement change access controls, require authorization.',
    assessment: 'Review change access restrictions.',
    relatedControls: ['CM.L2-3.4.3', 'CM.L2-3.4.4']
  },
  'CM.L2-3.4.6': {
    id: 'CM.L2-3.4.6',
    title: 'Least Functionality',
    description: 'Employ the principle of least functionality by configuring organizational systems to provide only essential capabilities.',
    implementation: 'Disable unnecessary functions, remove unused software.',
    assessment: 'Review least functionality implementation.',
    relatedControls: ['CM.L2-3.4.7', 'CM.L2-3.4.8']
  },
  'CM.L2-3.4.7': {
    id: 'CM.L2-3.4.7',
    title: 'Nonessential Functionality',
    description: 'Restrict, disable, or prevent the use of nonessential programs, functions, ports, protocols, and services.',
    implementation: 'Disable unnecessary services, restrict ports and protocols.',
    assessment: 'Review service and port restrictions.',
    relatedControls: ['CM.L2-3.4.6', 'SC.L2-3.13.6']
  },
  'CM.L2-3.4.8': {
    id: 'CM.L2-3.4.8',
    title: 'Application Execution Policy',
    description: 'Apply deny-by-exception (blacklisting) policy to prevent the use of unauthorized software.',
    implementation: 'Implement application control, whitelist/blacklist software.',
    assessment: 'Review application control configuration.',
    relatedControls: ['CM.L2-3.4.6', 'SI.L1-3.14.2']
  },
  'CM.L2-3.4.9': {
    id: 'CM.L2-3.4.9',
    title: 'User-Installed Software',
    description: 'Control and monitor user-installed software.',
    implementation: 'Restrict user software installation, monitor for unauthorized software.',
    assessment: 'Review user software installation controls.',
    relatedControls: ['CM.L2-3.4.8']
  },

  // Identification and Authentication (IA)
  'IA.L1-3.5.1': {
    id: 'IA.L1-3.5.1',
    title: 'Identification',
    description: 'Identify information system users, processes acting on behalf of users, or devices.',
    implementation: 'Assign unique identifiers, identify all entities.',
    assessment: 'Review identification mechanisms.',
    relatedControls: ['IA.L1-3.5.2', 'AC.L1-3.1.1']
  },
  'IA.L1-3.5.2': {
    id: 'IA.L1-3.5.2',
    title: 'Authentication',
    description: 'Authenticate (or verify) the identities of those users, processes, or devices.',
    implementation: 'Implement authentication mechanisms.',
    assessment: 'Review authentication implementation.',
    relatedControls: ['IA.L1-3.5.1', 'IA.L2-3.5.3']
  },
  'IA.L2-3.5.3': {
    id: 'IA.L2-3.5.3',
    title: 'Multi-Factor Authentication',
    description: 'Use multifactor authentication for local and network access.',
    implementation: 'Implement MFA for all access types.',
    assessment: 'Review MFA deployment and coverage.',
    relatedControls: ['IA.L1-3.5.2', 'IA.L2-3.5.4']
  },
  'IA.L2-3.5.4': {
    id: 'IA.L2-3.5.4',
    title: 'Replay-Resistant Authentication',
    description: 'Employ replay-resistant authentication mechanisms for network access to privileged and non-privileged accounts.',
    implementation: 'Use replay-resistant protocols, nonces, timestamps.',
    assessment: 'Review authentication protocol security.',
    relatedControls: ['IA.L2-3.5.3', 'IA.L2-3.5.7']
  },
  'IA.L2-3.5.7': {
    id: 'IA.L2-3.5.7',
    title: 'Password Complexity',
    description: 'Enforce a minimum password complexity and change of characters when new passwords are created.',
    implementation: 'Configure password complexity requirements.',
    assessment: 'Review password complexity settings.',
    relatedControls: ['IA.L2-3.5.8', 'IA.L2-3.5.9']
  },
  'IA.L2-3.5.8': {
    id: 'IA.L2-3.5.8',
    title: 'Password Reuse',
    description: 'Prohibit password reuse for a specified number of generations.',
    implementation: 'Configure password history requirements.',
    assessment: 'Review password history settings.',
    relatedControls: ['IA.L2-3.5.7', 'IA.L2-3.5.9']
  },
  'IA.L2-3.5.9': {
    id: 'IA.L2-3.5.9',
    title: 'Temporary Passwords',
    description: 'Allow temporary password use for system logons with an immediate change to a permanent password.',
    implementation: 'Require password change after temporary password use.',
    assessment: 'Review temporary password procedures.',
    relatedControls: ['IA.L2-3.5.7', 'IA.L2-3.5.10']
  },
  'IA.L2-3.5.10': {
    id: 'IA.L2-3.5.10',
    title: 'Cryptographic Password Protection',
    description: 'Store and transmit only cryptographically-protected passwords.',
    implementation: 'Hash stored passwords, encrypt transmitted passwords.',
    assessment: 'Review password storage and transmission.',
    relatedControls: ['IA.L2-3.5.9', 'SC.L2-3.13.11']
  },
  'IA.L2-3.5.11': {
    id: 'IA.L2-3.5.11',
    title: 'Obscure Feedback',
    description: 'Obscure feedback of authentication information.',
    implementation: 'Mask password entry, obscure feedback.',
    assessment: 'Review authentication feedback.',
    relatedControls: ['IA.L2-3.5.3']
  },

  // Incident Response (IR)
  'IR.L2-3.6.1': {
    id: 'IR.L2-3.6.1',
    title: 'Incident Handling',
    description: 'Establish an operational incident-handling capability.',
    implementation: 'Develop incident response capability, define procedures.',
    assessment: 'Review incident handling capability.',
    relatedControls: ['IR.L2-3.6.2', 'IR.L2-3.6.3']
  },
  'IR.L2-3.6.2': {
    id: 'IR.L2-3.6.2',
    title: 'Incident Reporting',
    description: 'Track, document, and report incidents to designated officials and/or authorities.',
    implementation: 'Implement incident tracking, define reporting requirements.',
    assessment: 'Review incident reporting procedures.',
    relatedControls: ['IR.L2-3.6.1', 'IR.L2-3.6.3']
  },
  'IR.L2-3.6.3': {
    id: 'IR.L2-3.6.3',
    title: 'Incident Response Testing',
    description: 'Test the organizational incident response capability.',
    implementation: 'Conduct incident response exercises, tabletop tests.',
    assessment: 'Review incident response testing records.',
    relatedControls: ['IR.L2-3.6.1', 'IR.L2-3.6.2']
  },

  // Media Protection (MP)
  'MP.L1-3.8.3': {
    id: 'MP.L1-3.8.3',
    title: 'Media Disposal',
    description: 'Sanitize or destroy information system media containing FCI before disposal or release for reuse.',
    implementation: 'Implement media sanitization procedures.',
    assessment: 'Review media disposal procedures.',
    relatedControls: ['MP.L2-3.8.7', 'MP.L2-3.8.8']
  },
  'MP.L2-3.8.1': {
    id: 'MP.L2-3.8.1',
    title: 'Media Protection',
    description: 'Protect (i.e., physically control and securely store) system media containing CUI.',
    implementation: 'Implement physical media protection, secure storage.',
    assessment: 'Review media protection controls.',
    relatedControls: ['MP.L2-3.8.2', 'MP.L2-3.8.4']
  },
  'MP.L2-3.8.2': {
    id: 'MP.L2-3.8.2',
    title: 'Media Access',
    description: 'Limit access to CUI on system media to authorized users.',
    implementation: 'Control media access, implement authorization.',
    assessment: 'Review media access controls.',
    relatedControls: ['MP.L2-3.8.1', 'MP.L2-3.8.4']
  },
  'MP.L2-3.8.4': {
    id: 'MP.L2-3.8.4',
    title: 'Media Marking',
    description: 'Mark media with necessary CUI markings and distribution limitations.',
    implementation: 'Label media with CUI markings.',
    assessment: 'Review media marking practices.',
    relatedControls: ['MP.L2-3.8.1', 'MP.L2-3.8.5']
  },
  'MP.L2-3.8.5': {
    id: 'MP.L2-3.8.5',
    title: 'Media Accountability',
    description: 'Control access to media containing CUI and maintain accountability for media during transport.',
    implementation: 'Track media, maintain chain of custody.',
    assessment: 'Review media accountability procedures.',
    relatedControls: ['MP.L2-3.8.4', 'MP.L2-3.8.6']
  },
  'MP.L2-3.8.6': {
    id: 'MP.L2-3.8.6',
    title: 'Portable Storage Encryption',
    description: 'Implement cryptographic mechanisms to protect the confidentiality of CUI stored on digital media during transport.',
    implementation: 'Encrypt portable storage containing CUI.',
    assessment: 'Review portable storage encryption.',
    relatedControls: ['MP.L2-3.8.5', 'MP.L2-3.8.7']
  },
  'MP.L2-3.8.7': {
    id: 'MP.L2-3.8.7',
    title: 'Removable Media',
    description: 'Control the use of removable media on system components.',
    implementation: 'Control USB and removable media use.',
    assessment: 'Review removable media controls.',
    relatedControls: ['MP.L2-3.8.6', 'AC.L2-3.1.21']
  },
  'MP.L2-3.8.8': {
    id: 'MP.L2-3.8.8',
    title: 'Shared Media',
    description: 'Prohibit the use of portable storage devices when such devices have no identifiable owner.',
    implementation: 'Prohibit unidentified storage devices.',
    assessment: 'Review shared media policies.',
    relatedControls: ['MP.L2-3.8.7']
  },
  'MP.L2-3.8.9': {
    id: 'MP.L2-3.8.9',
    title: 'Backup Media Protection',
    description: 'Protect the confidentiality of backup CUI at storage locations.',
    implementation: 'Encrypt and secure backup media.',
    assessment: 'Review backup media protection.',
    relatedControls: ['MP.L2-3.8.1', 'SC.L2-3.13.10']
  },

  // System and Communications Protection (SC)
  'SC.L1-3.13.1': {
    id: 'SC.L1-3.13.1',
    title: 'Boundary Protection',
    description: 'Monitor, control, and protect organizational communications at the external boundaries.',
    implementation: 'Deploy boundary protection (firewalls, IDS/IPS).',
    assessment: 'Review boundary protection controls.',
    relatedControls: ['SC.L2-3.13.5', 'SC.L2-3.13.6']
  },
  'SC.L1-3.13.5': {
    id: 'SC.L1-3.13.5',
    title: 'Public Access System Separation',
    description: 'Implement subnetworks for publicly accessible system components that are physically or logically separated.',
    implementation: 'Segment public-facing systems, use DMZ architecture.',
    assessment: 'Review network segmentation.',
    relatedControls: ['SC.L1-3.13.1', 'SC.L2-3.13.6']
  },
  'SC.L2-3.13.4': {
    id: 'SC.L2-3.13.4',
    title: 'Shared Resource Control',
    description: 'Prevent unauthorized and unintended information transfer via shared system resources.',
    implementation: 'Control shared resources, clear residual data.',
    assessment: 'Review shared resource controls.',
    relatedControls: ['AC.L2-3.1.3']
  },
  'SC.L2-3.13.6': {
    id: 'SC.L2-3.13.6',
    title: 'Network Communication by Exception',
    description: 'Deny network communications traffic by default and allow network communications traffic by exception.',
    implementation: 'Implement default-deny firewall rules.',
    assessment: 'Review firewall configuration.',
    relatedControls: ['SC.L1-3.13.1', 'CM.L2-3.4.7']
  },
  'SC.L2-3.13.8': {
    id: 'SC.L2-3.13.8',
    title: 'Transmission Confidentiality',
    description: 'Implement cryptographic mechanisms to prevent unauthorized disclosure of CUI during transmission.',
    implementation: 'Encrypt CUI in transit using TLS.',
    assessment: 'Review transmission encryption.',
    relatedControls: ['AC.L2-3.1.13', 'SC.L2-3.13.11']
  },
  'SC.L2-3.13.10': {
    id: 'SC.L2-3.13.10',
    title: 'Key Management',
    description: 'Establish and manage cryptographic keys for cryptography employed in organizational systems.',
    implementation: 'Implement key management system.',
    assessment: 'Review key management procedures.',
    relatedControls: ['SC.L2-3.13.8', 'SC.L2-3.13.11']
  },
  'SC.L2-3.13.11': {
    id: 'SC.L2-3.13.11',
    title: 'CUI Encryption',
    description: 'Employ FIPS-validated cryptography when used to protect the confidentiality of CUI.',
    implementation: 'Use FIPS-validated crypto modules.',
    assessment: 'Review FIPS validation of cryptographic modules.',
    relatedControls: ['SC.L2-3.13.8', 'SC.L2-3.13.10']
  },
  'SC.L2-3.13.16': {
    id: 'SC.L2-3.13.16',
    title: 'Data at Rest',
    description: 'Protect the confidentiality of CUI at rest.',
    implementation: 'Encrypt CUI at rest.',
    assessment: 'Review data at rest encryption.',
    relatedControls: ['AC.L2-3.1.19', 'SC.L2-3.13.11']
  },

  // System and Information Integrity (SI)
  'SI.L1-3.14.1': {
    id: 'SI.L1-3.14.1',
    title: 'Flaw Remediation',
    description: 'Identify, report, and correct information and information system flaws in a timely manner.',
    implementation: 'Implement vulnerability management, timely patching.',
    assessment: 'Review flaw remediation process.',
    relatedControls: ['SI.L1-3.14.2', 'SI.L2-3.14.3']
  },
  'SI.L1-3.14.2': {
    id: 'SI.L1-3.14.2',
    title: 'Malicious Code Protection',
    description: 'Provide protection from malicious code at appropriate locations.',
    implementation: 'Deploy anti-malware, keep definitions updated.',
    assessment: 'Review malware protection deployment.',
    relatedControls: ['SI.L1-3.14.1', 'SI.L1-3.14.4']
  },
  'SI.L2-3.14.3': {
    id: 'SI.L2-3.14.3',
    title: 'Security Alerts',
    description: 'Monitor system security alerts and advisories and take action in response.',
    implementation: 'Subscribe to security alerts, respond to advisories.',
    assessment: 'Review alert monitoring and response.',
    relatedControls: ['SI.L1-3.14.1', 'SI.L2-3.14.6']
  },
  'SI.L1-3.14.4': {
    id: 'SI.L1-3.14.4',
    title: 'Update Malicious Code Protection',
    description: 'Update malicious code protection mechanisms when new releases are available.',
    implementation: 'Configure automatic anti-malware updates.',
    assessment: 'Review anti-malware update configuration.',
    relatedControls: ['SI.L1-3.14.2', 'SI.L1-3.14.5']
  },
  'SI.L1-3.14.5': {
    id: 'SI.L1-3.14.5',
    title: 'System & File Scanning',
    description: 'Perform periodic scans of the information system and real-time scans of files.',
    implementation: 'Configure scheduled and real-time scanning.',
    assessment: 'Review scan configuration and results.',
    relatedControls: ['SI.L1-3.14.4', 'SI.L2-3.14.6']
  },
  'SI.L2-3.14.6': {
    id: 'SI.L2-3.14.6',
    title: 'Monitor Communications',
    description: 'Monitor organizational systems, including inbound and outbound communications traffic.',
    implementation: 'Implement network monitoring, traffic analysis.',
    assessment: 'Review communications monitoring.',
    relatedControls: ['SI.L2-3.14.7', 'AU.L2-3.3.1']
  },
  'SI.L2-3.14.7': {
    id: 'SI.L2-3.14.7',
    title: 'Identify Unauthorized Use',
    description: 'Identify unauthorized use of organizational systems.',
    implementation: 'Monitor for unauthorized activity, anomaly detection.',
    assessment: 'Review unauthorized use detection.',
    relatedControls: ['SI.L2-3.14.6', 'AC.L1-3.1.1']
  }
};

export default { cmmcFramework, cmmcControls };

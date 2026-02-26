/**
 * HITRUST CSF - Health Information Trust Alliance Common Security Framework
 * HITRUST CSF v11 Framework
 */

import { FrameworkInfo, ControlRequirement, ComplianceFramework } from '../types/framework.js';

export const hitrustFramework: FrameworkInfo = {
  id: ComplianceFramework.HITRUST,
  name: 'HITRUST Common Security Framework',
  version: 'CSF v11',
  description: 'HITRUST CSF is a certifiable security framework that provides organizations with a comprehensive, flexible, and efficient approach to regulatory compliance and risk management. It harmonizes multiple regulations and standards including HIPAA, NIST, ISO 27001, and PCI DSS.',
  organization: 'HITRUST Alliance',
  total_controls: 156,
  categories: ['Information Protection Program', 'Endpoint Protection', 'Portable Media Security', 'Mobile Device Security', 'Wireless Protection', 'Configuration Management', 'Vulnerability Management', 'Network Protection', 'Transmission Protection', 'Password Management', 'Access Control', 'Audit Logging & Monitoring', 'Education, Training & Awareness', 'Third Party Assurance', 'Incident Management', 'Business Continuity & Disaster Recovery', 'Risk Management', 'Physical & Environmental Security', 'Data Protection & Privacy'],
  url: 'https://hitrustalliance.net/product-tool/hitrust-csf/'
};

export const hitrustControls: Record<string, ControlRequirement> = {
  // 00 - Information Protection Program
  '00.a': {
    id: '00.a',
    title: 'Information Security Management Program',
    description: 'An information security management program shall be established, implemented, and maintained.',
    implementation: 'Develop comprehensive information security program with policies, procedures, and governance structure.',
    assessment: 'Review information security program documentation and governance.',
    relatedControls: ['00.b', '01.a']
  },
  '00.b': {
    id: '00.b',
    title: 'Information Security Roles and Responsibilities',
    description: 'Information security roles and responsibilities shall be defined and assigned.',
    implementation: 'Define security roles, assign responsibilities, document in job descriptions.',
    assessment: 'Review role definitions and assignment documentation.',
    relatedControls: ['00.a', '02.a']
  },

  // 01 - Access Control
  '01.a': {
    id: '01.a',
    title: 'Access Control Policy',
    description: 'An access control policy shall be established, documented, and reviewed.',
    implementation: 'Develop access control policy addressing access principles, provisioning, and review.',
    assessment: 'Review access control policy documentation and review records.',
    relatedControls: ['01.b', '01.c']
  },
  '01.b': {
    id: '01.b',
    title: 'User Registration',
    description: 'A formal user registration and de-registration procedure shall be implemented.',
    implementation: 'Implement user provisioning workflow with approval and documentation.',
    assessment: 'Review user registration procedures and records.',
    relatedControls: ['01.a', '01.d']
  },
  '01.c': {
    id: '01.c',
    title: 'Privilege Management',
    description: 'The allocation and use of privileges shall be restricted and controlled.',
    implementation: 'Implement privileged access management, require justification, review privileges.',
    assessment: 'Review privilege management procedures and access records.',
    relatedControls: ['01.a', '01.b']
  },
  '01.d': {
    id: '01.d',
    title: 'User Password Management',
    description: 'The allocation of passwords shall be controlled through a formal management process.',
    implementation: 'Implement password policy, secure password delivery, enforce complexity.',
    assessment: 'Review password management procedures and policy enforcement.',
    relatedControls: ['01.b', '01.e']
  },
  '01.e': {
    id: '01.e',
    title: 'Review of User Access Rights',
    description: 'Management shall review user access rights at planned intervals.',
    implementation: 'Conduct periodic access reviews, document findings, remediate issues.',
    assessment: 'Review access review documentation and remediation records.',
    relatedControls: ['01.a', '01.f']
  },
  '01.f': {
    id: '01.f',
    title: 'Clear Desk and Clear Screen Policy',
    description: 'A clear desk policy for papers and removable storage media and a clear screen policy shall be adopted.',
    implementation: 'Implement clear desk and screen policy, configure automatic screen locks.',
    assessment: 'Review policy implementation and compliance.',
    relatedControls: ['01.a']
  },
  '01.g': {
    id: '01.g',
    title: 'Unattended User Equipment',
    description: 'Users shall ensure that unattended equipment has appropriate protection.',
    implementation: 'Train users on equipment protection, enforce screen locks and logoff.',
    assessment: 'Review training and technical controls for unattended equipment.',
    relatedControls: ['01.f']
  },
  '01.h': {
    id: '01.h',
    title: 'Policy on Use of Network Services',
    description: 'Users shall only be provided with access to services that they have been specifically authorized to use.',
    implementation: 'Implement network access controls, document authorized services, restrict access.',
    assessment: 'Review network access controls and authorization documentation.',
    relatedControls: ['01.a', '09.a']
  },
  '01.i': {
    id: '01.i',
    title: 'User Authentication for External Connections',
    description: 'Appropriate authentication methods shall be used to control access by remote users.',
    implementation: 'Implement MFA for remote access, certificate authentication, VPN.',
    assessment: 'Review remote authentication methods and controls.',
    relatedControls: ['01.h', '01.j']
  },
  '01.j': {
    id: '01.j',
    title: 'User Identification and Authentication',
    description: 'All users shall have a unique identifier for their personal use only.',
    implementation: 'Assign unique user IDs, prohibit shared accounts, implement authentication.',
    assessment: 'Review unique identifier assignment and authentication controls.',
    relatedControls: ['01.b', '01.k']
  },
  '01.k': {
    id: '01.k',
    title: 'Equipment Identification in Networks',
    description: 'Automatic equipment identification shall be considered as a means to authenticate connections.',
    implementation: 'Implement device authentication, network access control, certificate-based auth.',
    assessment: 'Review equipment authentication mechanisms.',
    relatedControls: ['01.j', '09.a']
  },
  '01.l': {
    id: '01.l',
    title: 'Remote Diagnostic and Configuration Port Protection',
    description: 'Physical and logical access to diagnostic and configuration ports shall be controlled.',
    implementation: 'Secure management ports, implement jump servers, restrict access.',
    assessment: 'Review diagnostic port access controls.',
    relatedControls: ['01.h', '09.a']
  },
  '01.m': {
    id: '01.m',
    title: 'Segregation in Networks',
    description: 'Groups of information services, users and information systems shall be segregated on networks.',
    implementation: 'Implement network segmentation, VLANs, firewall rules.',
    assessment: 'Review network segmentation implementation.',
    relatedControls: ['09.a', '09.b']
  },
  '01.n': {
    id: '01.n',
    title: 'Network Connection Control',
    description: 'For shared networks, the capability of users to connect to the network shall be restricted.',
    implementation: 'Implement NAC, restrict network connections, authenticate devices.',
    assessment: 'Review network connection control mechanisms.',
    relatedControls: ['01.m', '09.a']
  },
  '01.o': {
    id: '01.o',
    title: 'Network Routing Control',
    description: 'Routing controls shall be implemented for networks.',
    implementation: 'Implement routing access controls, secure routing protocols.',
    assessment: 'Review routing control configuration.',
    relatedControls: ['01.m', '01.n']
  },
  '01.p': {
    id: '01.p',
    title: 'Secure Log-on Procedures',
    description: 'Access to operating systems shall be controlled by a secure log-on procedure.',
    implementation: 'Implement secure logon procedures, warning banners, failed attempt lockout.',
    assessment: 'Review secure logon configurations.',
    relatedControls: ['01.j', '01.q']
  },
  '01.q': {
    id: '01.q',
    title: 'Password Management System',
    description: 'Systems for managing passwords shall be interactive and ensure quality passwords.',
    implementation: 'Implement password management system, enforce complexity and history.',
    assessment: 'Review password system configuration.',
    relatedControls: ['01.d', '01.p']
  },
  '01.r': {
    id: '01.r',
    title: 'Use of System Utilities',
    description: 'The use of utility programs that might be capable of overriding system and application controls shall be restricted.',
    implementation: 'Restrict access to system utilities, log usage, require authorization.',
    assessment: 'Review utility access controls and usage logs.',
    relatedControls: ['01.c', '01.s']
  },
  '01.s': {
    id: '01.s',
    title: 'Session Time-out',
    description: 'Inactive sessions shall shut down after a defined period of inactivity.',
    implementation: 'Configure session timeouts, automatic logoff for inactive sessions.',
    assessment: 'Review session timeout configurations.',
    relatedControls: ['01.f', '01.g']
  },
  '01.t': {
    id: '01.t',
    title: 'Limitation of Connection Time',
    description: 'Restrictions on connection times shall be used to provide additional security.',
    implementation: 'Implement connection time restrictions for sensitive applications.',
    assessment: 'Review connection time limitation controls.',
    relatedControls: ['01.s']
  },
  '01.u': {
    id: '01.u',
    title: 'Sensitive System Isolation',
    description: 'Sensitive systems shall have a dedicated computing environment.',
    implementation: 'Isolate sensitive systems, implement dedicated infrastructure.',
    assessment: 'Review sensitive system isolation implementation.',
    relatedControls: ['01.m', '09.a']
  },
  '01.v': {
    id: '01.v',
    title: 'Information Access Restriction',
    description: 'Access to information and application system functions shall be restricted.',
    implementation: 'Implement application-level access controls, restrict functions based on role.',
    assessment: 'Review application access restrictions.',
    relatedControls: ['01.a', '01.c']
  },

  // 02 - Human Resources Security
  '02.a': {
    id: '02.a',
    title: 'Roles and Responsibilities',
    description: 'Security roles and responsibilities of employees, contractors and third party users shall be defined and documented.',
    implementation: 'Define security responsibilities in job descriptions and contracts.',
    assessment: 'Review role definitions and documentation.',
    relatedControls: ['00.b', '02.b']
  },
  '02.b': {
    id: '02.b',
    title: 'Screening',
    description: 'Background verification checks on all candidates for employment shall be carried out.',
    implementation: 'Conduct background checks, verify credentials, document results.',
    assessment: 'Review screening procedures and documentation.',
    relatedControls: ['02.a', '02.c']
  },
  '02.c': {
    id: '02.c',
    title: 'Terms and Conditions of Employment',
    description: 'Employees, contractors and third party users shall agree to terms and conditions of their employment contract regarding information security.',
    implementation: 'Include security responsibilities in employment agreements.',
    assessment: 'Review employment agreements for security terms.',
    relatedControls: ['02.a', '02.d']
  },
  '02.d': {
    id: '02.d',
    title: 'Management Responsibilities',
    description: 'Management shall require employees, contractors and third party users to apply security in accordance with policies.',
    implementation: 'Communicate security expectations, enforce compliance, lead by example.',
    assessment: 'Review management enforcement of security requirements.',
    relatedControls: ['02.c', '02.e']
  },
  '02.e': {
    id: '02.e',
    title: 'Information Security Awareness, Education, and Training',
    description: 'All employees and contractors shall receive appropriate awareness education and training.',
    implementation: 'Develop and deliver security awareness training, track completion.',
    assessment: 'Review training program and completion records.',
    relatedControls: ['02.d', '02.f']
  },
  '02.f': {
    id: '02.f',
    title: 'Disciplinary Process',
    description: 'A formal disciplinary process shall exist for employees who have committed a security breach.',
    implementation: 'Establish disciplinary procedures for security violations.',
    assessment: 'Review disciplinary process documentation.',
    relatedControls: ['02.e']
  },
  '02.g': {
    id: '02.g',
    title: 'Termination or Change of Employment',
    description: 'Responsibilities for performing employment termination or change of employment shall be clearly defined.',
    implementation: 'Define termination procedures, revoke access, recover assets.',
    assessment: 'Review termination procedures and execution.',
    relatedControls: ['01.b', '02.a']
  },
  '02.h': {
    id: '02.h',
    title: 'Return of Assets',
    description: 'All employees shall return all of the organization\'s assets in their possession.',
    implementation: 'Track asset assignments, implement return procedures.',
    assessment: 'Review asset return procedures and tracking.',
    relatedControls: ['02.g', '08.a']
  },
  '02.i': {
    id: '02.i',
    title: 'Removal of Access Rights',
    description: 'The access rights of all employees shall be removed upon termination.',
    implementation: 'Revoke access upon termination, integrate with HR processes.',
    assessment: 'Review access revocation procedures and timeliness.',
    relatedControls: ['01.b', '02.g']
  },

  // 06 - Configuration Management
  '06.a': {
    id: '06.a',
    title: 'Configuration Standards',
    description: 'Configuration standards shall be established and maintained for information systems.',
    implementation: 'Develop secure baselines, implement configuration management.',
    assessment: 'Review configuration standards and compliance.',
    relatedControls: ['06.b', '06.c']
  },
  '06.b': {
    id: '06.b',
    title: 'Least Functionality',
    description: 'Systems shall be configured to provide only essential capabilities.',
    implementation: 'Disable unnecessary services, remove unused software, harden systems.',
    assessment: 'Review system configuration for least functionality.',
    relatedControls: ['06.a', '06.d']
  },
  '06.c': {
    id: '06.c',
    title: 'Control of Operational Software',
    description: 'Procedures shall be in place to control the installation of software.',
    implementation: 'Implement software installation controls, authorized software list.',
    assessment: 'Review software installation controls.',
    relatedControls: ['06.a', '06.d']
  },
  '06.d': {
    id: '06.d',
    title: 'Protection of System Test Data',
    description: 'Test data shall be selected carefully, protected, and controlled.',
    implementation: 'Mask sensitive data for testing, control test environment access.',
    assessment: 'Review test data protection procedures.',
    relatedControls: ['06.c', '07.a']
  },

  // 09 - Network Protection
  '09.a': {
    id: '09.a',
    title: 'Network Security Management',
    description: 'Networks shall be managed and controlled to protect information in systems and applications.',
    implementation: 'Implement network security controls, segment networks, monitor traffic.',
    assessment: 'Review network security management.',
    relatedControls: ['01.m', '09.b']
  },
  '09.b': {
    id: '09.b',
    title: 'Security of Network Services',
    description: 'Security features, service levels and management requirements shall be identified and included in agreements.',
    implementation: 'Define network service requirements, include in contracts.',
    assessment: 'Review network service agreements.',
    relatedControls: ['09.a', '09.c']
  },
  '09.c': {
    id: '09.c',
    title: 'Boundary Protection',
    description: 'The organization shall monitor and control communications at the external boundary.',
    implementation: 'Deploy firewalls, IDS/IPS, monitor boundary traffic.',
    assessment: 'Review boundary protection controls.',
    relatedControls: ['09.a', '09.b']
  },

  // 10 - Transmission Protection
  '10.a': {
    id: '10.a',
    title: 'Policy on the Use of Cryptographic Controls',
    description: 'A policy on the use of cryptographic controls for protection of information shall be developed.',
    implementation: 'Develop cryptographic policy, define approved algorithms.',
    assessment: 'Review cryptographic policy.',
    relatedControls: ['10.b', '10.c']
  },
  '10.b': {
    id: '10.b',
    title: 'Key Management',
    description: 'Key management shall be in place to support the organization\'s use of cryptographic techniques.',
    implementation: 'Implement key management system, define key lifecycle.',
    assessment: 'Review key management procedures.',
    relatedControls: ['10.a', '10.c']
  },
  '10.c': {
    id: '10.c',
    title: 'Protection of Information in Transit',
    description: 'Information shall be protected during transit over networks.',
    implementation: 'Implement TLS, encrypt sensitive data in transit.',
    assessment: 'Review encryption in transit implementation.',
    relatedControls: ['10.a', '10.b']
  },

  // 11 - Password Management
  '11.a': {
    id: '11.a',
    title: 'Password Policy',
    description: 'A password policy shall be established and enforced.',
    implementation: 'Define password requirements, implement technical enforcement.',
    assessment: 'Review password policy and enforcement.',
    relatedControls: ['01.d', '01.q']
  },

  // 12 - Audit Logging and Monitoring
  '12.a': {
    id: '12.a',
    title: 'Audit Logging',
    description: 'Audit logs recording user activities, exceptions and information security events shall be produced.',
    implementation: 'Enable audit logging, capture required events, retain logs.',
    assessment: 'Review audit logging configuration.',
    relatedControls: ['12.b', '12.c']
  },
  '12.b': {
    id: '12.b',
    title: 'Monitoring System Use',
    description: 'Procedures for monitoring use of information processing facilities shall be established.',
    implementation: 'Establish monitoring procedures, review logs, alert on anomalies.',
    assessment: 'Review monitoring procedures and activities.',
    relatedControls: ['12.a', '12.c']
  },
  '12.c': {
    id: '12.c',
    title: 'Protection of Log Information',
    description: 'Logging facilities and log information shall be protected against tampering and unauthorized access.',
    implementation: 'Protect logs from modification, restrict access, implement integrity controls.',
    assessment: 'Review log protection controls.',
    relatedControls: ['12.a', '12.b']
  },
  '12.d': {
    id: '12.d',
    title: 'Administrator and Operator Logs',
    description: 'System administrator and system operator activities shall be logged.',
    implementation: 'Log privileged user activities, protect privileged action logs.',
    assessment: 'Review privileged user logging.',
    relatedControls: ['12.a', '01.c']
  },
  '12.e': {
    id: '12.e',
    title: 'Fault Logging',
    description: 'Faults shall be logged, analyzed and appropriate action taken.',
    implementation: 'Configure fault logging, establish review procedures.',
    assessment: 'Review fault logging and response.',
    relatedControls: ['12.a', '12.b']
  },
  '12.f': {
    id: '12.f',
    title: 'Clock Synchronization',
    description: 'The clocks of all relevant information processing systems shall be synchronized.',
    implementation: 'Implement NTP, synchronize all systems, monitor time drift.',
    assessment: 'Review time synchronization configuration.',
    relatedControls: ['12.a']
  },

  // 13 - Incident Management
  '13.a': {
    id: '13.a',
    title: 'Incident Response Plan',
    description: 'An incident response plan shall be established, implemented, and maintained.',
    implementation: 'Develop incident response plan, define roles, establish procedures.',
    assessment: 'Review incident response plan documentation.',
    relatedControls: ['13.b', '13.c']
  },
  '13.b': {
    id: '13.b',
    title: 'Incident Response Testing',
    description: 'The incident response capabilities shall be tested periodically.',
    implementation: 'Conduct tabletop exercises, test response procedures.',
    assessment: 'Review incident response testing records.',
    relatedControls: ['13.a', '13.c']
  },
  '13.c': {
    id: '13.c',
    title: 'Incident Response Training',
    description: 'Incident response training shall be provided to personnel.',
    implementation: 'Train incident response team, provide role-specific training.',
    assessment: 'Review incident response training records.',
    relatedControls: ['13.a', '13.b']
  },
  '13.d': {
    id: '13.d',
    title: 'Event Reporting',
    description: 'Information security events shall be reported through appropriate management channels.',
    implementation: 'Establish reporting procedures, define escalation paths.',
    assessment: 'Review event reporting procedures.',
    relatedControls: ['13.a', '13.e']
  },
  '13.e': {
    id: '13.e',
    title: 'Weakness Reporting',
    description: 'Employees and contractors shall be required to note and report observed or suspected security weaknesses.',
    implementation: 'Train users on weakness reporting, establish reporting channels.',
    assessment: 'Review weakness reporting procedures.',
    relatedControls: ['13.d', '02.e']
  },
  '13.f': {
    id: '13.f',
    title: 'Responsibilities and Procedures',
    description: 'Management responsibilities and procedures shall be established for incident response.',
    implementation: 'Define incident management roles, document procedures.',
    assessment: 'Review incident management responsibilities.',
    relatedControls: ['13.a', '00.b']
  },
  '13.g': {
    id: '13.g',
    title: 'Learning from Information Security Incidents',
    description: 'Information gained from the evaluation of information security incidents shall be used to reduce the likelihood or impact of future incidents.',
    implementation: 'Conduct post-incident reviews, identify lessons learned, update controls.',
    assessment: 'Review post-incident analysis and improvements.',
    relatedControls: ['13.a', '13.h']
  },
  '13.h': {
    id: '13.h',
    title: 'Collection of Evidence',
    description: 'Procedures shall be in place for the identification, collection, acquisition and preservation of information which can serve as evidence.',
    implementation: 'Establish evidence collection procedures, maintain chain of custody.',
    assessment: 'Review evidence collection procedures.',
    relatedControls: ['13.g']
  },

  // 14 - Business Continuity
  '14.a': {
    id: '14.a',
    title: 'Business Continuity Plan',
    description: 'A business continuity plan shall be developed and maintained.',
    implementation: 'Develop BCP, document recovery procedures, maintain contact lists.',
    assessment: 'Review business continuity plan.',
    relatedControls: ['14.b', '14.c']
  },
  '14.b': {
    id: '14.b',
    title: 'Business Continuity Testing',
    description: 'Business continuity plans shall be tested and updated regularly.',
    implementation: 'Conduct BCP testing, document results, update plans.',
    assessment: 'Review BCP testing records.',
    relatedControls: ['14.a', '14.c']
  },
  '14.c': {
    id: '14.c',
    title: 'Disaster Recovery Plan',
    description: 'A disaster recovery plan shall be developed and maintained.',
    implementation: 'Develop DRP, define RTOs/RPOs, document recovery procedures.',
    assessment: 'Review disaster recovery plan.',
    relatedControls: ['14.a', '14.b']
  },
  '14.d': {
    id: '14.d',
    title: 'Backup',
    description: 'Backup copies of information and software shall be taken and tested regularly.',
    implementation: 'Implement backup procedures, test restoration, store offsite.',
    assessment: 'Review backup procedures and testing records.',
    relatedControls: ['14.c']
  }
};

export default { hitrustFramework, hitrustControls };

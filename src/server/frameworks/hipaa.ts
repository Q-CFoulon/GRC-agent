/**
 * HIPAA - Health Insurance Portability and Accountability Act
 * Security Rule and Privacy Rule controls
 */

import { FrameworkInfo, ControlRequirement, ComplianceFramework } from '../types/framework.js';

export const hipaaFramework: FrameworkInfo = {
  id: ComplianceFramework.HIPAA,
  name: 'Health Insurance Portability and Accountability Act',
  version: '2024',
  description: 'HIPAA Security Rule establishes national standards to protect individuals\' electronic personal health information (ePHI) that is created, received, used, or maintained by a covered entity.',
  organization: 'U.S. Department of Health and Human Services (HHS)',
  total_controls: 54,
  categories: ['Administrative Safeguards', 'Physical Safeguards', 'Technical Safeguards', 'Organizational Requirements', 'Policies and Procedures'],
  url: 'https://www.hhs.gov/hipaa/for-professionals/security/index.html'
};

export const hipaaControls: Record<string, ControlRequirement> = {
  // Administrative Safeguards (§164.308)
  '164.308(a)(1)': {
    id: '164.308(a)(1)',
    title: 'Security Management Process',
    description: 'Implement policies and procedures to prevent, detect, contain, and correct security violations.',
    implementation: 'Conduct risk analysis, implement risk management, apply sanctions policy, and perform information system activity review.',
    assessment: 'Review security management documentation, risk assessments, and sanction application records.',
    relatedControls: ['164.308(a)(8)', '164.316(a)']
  },
  '164.308(a)(1)(ii)(A)': {
    id: '164.308(a)(1)(ii)(A)',
    title: 'Risk Analysis',
    description: 'Conduct an accurate and thorough assessment of the potential risks and vulnerabilities to the confidentiality, integrity, and availability of ePHI.',
    implementation: 'Identify ePHI, assess threats and vulnerabilities, determine likelihood and impact, document findings.',
    assessment: 'Review risk analysis methodology, scope, and documentation.',
    relatedControls: ['164.308(a)(1)(ii)(B)']
  },
  '164.308(a)(1)(ii)(B)': {
    id: '164.308(a)(1)(ii)(B)',
    title: 'Risk Management',
    description: 'Implement security measures sufficient to reduce risks and vulnerabilities to a reasonable and appropriate level.',
    implementation: 'Prioritize risks, select and implement controls, document risk treatment decisions.',
    assessment: 'Review risk management plan and control implementation status.',
    relatedControls: ['164.308(a)(1)(ii)(A)']
  },
  '164.308(a)(1)(ii)(C)': {
    id: '164.308(a)(1)(ii)(C)',
    title: 'Sanction Policy',
    description: 'Apply appropriate sanctions against workforce members who fail to comply with security policies and procedures.',
    implementation: 'Document sanction policy, communicate to workforce, track violations and sanctions applied.',
    assessment: 'Review sanction policy documentation and application records.',
    relatedControls: ['164.308(a)(5)']
  },
  '164.308(a)(1)(ii)(D)': {
    id: '164.308(a)(1)(ii)(D)',
    title: 'Information System Activity Review',
    description: 'Implement procedures to regularly review records of information system activity, such as audit logs, access reports, and security incident tracking reports.',
    implementation: 'Establish log review procedures, define review frequency, document findings and actions.',
    assessment: 'Review audit log review procedures and documented review activities.',
    relatedControls: ['164.312(b)']
  },
  '164.308(a)(2)': {
    id: '164.308(a)(2)',
    title: 'Assigned Security Responsibility',
    description: 'Identify the security official who is responsible for the development and implementation of the policies and procedures.',
    implementation: 'Designate a Security Officer, document responsibilities, ensure adequate authority and resources.',
    assessment: 'Verify Security Officer designation and documented responsibilities.',
    relatedControls: ['164.308(a)(3)']
  },
  '164.308(a)(3)': {
    id: '164.308(a)(3)',
    title: 'Workforce Security',
    description: 'Implement policies and procedures to ensure that all members of its workforce have appropriate access to ePHI and to prevent those workforce members who do not have access from obtaining access.',
    implementation: 'Implement authorization procedures, workforce clearance, and termination procedures.',
    assessment: 'Review access authorization and termination procedures.',
    relatedControls: ['164.308(a)(4)', '164.312(a)(1)']
  },
  '164.308(a)(3)(ii)(A)': {
    id: '164.308(a)(3)(ii)(A)',
    title: 'Authorization and/or Supervision',
    description: 'Implement procedures for the authorization and/or supervision of workforce members who work with ePHI.',
    implementation: 'Define authorization procedures, implement supervision requirements, document approvals.',
    assessment: 'Review authorization documentation and supervision records.',
    relatedControls: ['164.308(a)(3)(ii)(B)']
  },
  '164.308(a)(3)(ii)(B)': {
    id: '164.308(a)(3)(ii)(B)',
    title: 'Workforce Clearance Procedure',
    description: 'Implement procedures to determine that the access of a workforce member to ePHI is appropriate.',
    implementation: 'Define clearance criteria, perform background checks where appropriate, document clearance decisions.',
    assessment: 'Review workforce clearance procedures and records.',
    relatedControls: ['164.308(a)(3)(ii)(C)']
  },
  '164.308(a)(3)(ii)(C)': {
    id: '164.308(a)(3)(ii)(C)',
    title: 'Termination Procedures',
    description: 'Implement procedures for terminating access to ePHI when employment ends or access is no longer required.',
    implementation: 'Define termination procedures, revoke access promptly, recover devices and credentials.',
    assessment: 'Review termination procedures and access removal records.',
    relatedControls: ['164.308(a)(3)(ii)(A)']
  },
  '164.308(a)(4)': {
    id: '164.308(a)(4)',
    title: 'Information Access Management',
    description: 'Implement policies and procedures for authorizing access to ePHI.',
    implementation: 'Establish access authorization policies, implement role-based access, document authorization decisions.',
    assessment: 'Review access management policies and authorization records.',
    relatedControls: ['164.308(a)(3)', '164.312(a)(1)']
  },
  '164.308(a)(5)': {
    id: '164.308(a)(5)',
    title: 'Security Awareness and Training',
    description: 'Implement a security awareness and training program for all members of the workforce.',
    implementation: 'Develop training content, deliver initial and periodic training, track completion.',
    assessment: 'Review training program content and completion records.',
    relatedControls: ['164.308(a)(1)(ii)(C)']
  },
  '164.308(a)(5)(ii)(A)': {
    id: '164.308(a)(5)(ii)(A)',
    title: 'Security Reminders',
    description: 'Periodic security updates.',
    implementation: 'Send regular security awareness communications, updates on threats and policies.',
    assessment: 'Review security reminder communications.',
    relatedControls: ['164.308(a)(5)(ii)(B)']
  },
  '164.308(a)(5)(ii)(B)': {
    id: '164.308(a)(5)(ii)(B)',
    title: 'Protection from Malicious Software',
    description: 'Procedures for guarding against, detecting, and reporting malicious software.',
    implementation: 'Deploy anti-malware solutions, update definitions, train users on malware risks.',
    assessment: 'Review anti-malware deployment and training records.',
    relatedControls: ['164.308(a)(5)(ii)(A)']
  },
  '164.308(a)(5)(ii)(C)': {
    id: '164.308(a)(5)(ii)(C)',
    title: 'Log-in Monitoring',
    description: 'Procedures for monitoring log-in attempts and reporting discrepancies.',
    implementation: 'Configure login monitoring, set thresholds for alerts, investigate anomalies.',
    assessment: 'Review login monitoring configuration and investigation records.',
    relatedControls: ['164.312(b)', '164.312(d)']
  },
  '164.308(a)(5)(ii)(D)': {
    id: '164.308(a)(5)(ii)(D)',
    title: 'Password Management',
    description: 'Procedures for creating, changing, and safeguarding passwords.',
    implementation: 'Establish password policy, implement complexity requirements, train users.',
    assessment: 'Review password policies and enforcement mechanisms.',
    relatedControls: ['164.312(d)']
  },
  '164.308(a)(6)': {
    id: '164.308(a)(6)',
    title: 'Security Incident Procedures',
    description: 'Implement policies and procedures to address security incidents.',
    implementation: 'Define incident response procedures, establish response team, document incident handling.',
    assessment: 'Review incident response procedures and incident documentation.',
    relatedControls: ['164.308(a)(1)(ii)(D)']
  },
  '164.308(a)(6)(ii)': {
    id: '164.308(a)(6)(ii)',
    title: 'Response and Reporting',
    description: 'Identify and respond to suspected or known security incidents; mitigate harmful effects; document incidents and outcomes.',
    implementation: 'Implement incident detection, containment, eradication, and recovery procedures.',
    assessment: 'Review incident response records and post-incident documentation.',
    relatedControls: ['164.308(a)(6)']
  },
  '164.308(a)(7)': {
    id: '164.308(a)(7)',
    title: 'Contingency Plan',
    description: 'Establish policies and procedures for responding to an emergency or other occurrence that damages systems containing ePHI.',
    implementation: 'Develop data backup, disaster recovery, and emergency operations plans.',
    assessment: 'Review contingency plan documentation and testing records.',
    relatedControls: ['164.308(a)(7)(ii)(A)', '164.308(a)(7)(ii)(B)', '164.308(a)(7)(ii)(C)']
  },
  '164.308(a)(7)(ii)(A)': {
    id: '164.308(a)(7)(ii)(A)',
    title: 'Data Backup Plan',
    description: 'Establish and implement procedures to create and maintain retrievable exact copies of ePHI.',
    implementation: 'Define backup procedures, frequency, storage, and verification.',
    assessment: 'Review backup procedures, logs, and restoration testing records.',
    relatedControls: ['164.308(a)(7)(ii)(B)']
  },
  '164.308(a)(7)(ii)(B)': {
    id: '164.308(a)(7)(ii)(B)',
    title: 'Disaster Recovery Plan',
    description: 'Establish procedures to restore any loss of data.',
    implementation: 'Document recovery procedures, define RTOs and RPOs, test recovery capabilities.',
    assessment: 'Review disaster recovery plan and testing results.',
    relatedControls: ['164.308(a)(7)(ii)(A)', '164.308(a)(7)(ii)(D)']
  },
  '164.308(a)(7)(ii)(C)': {
    id: '164.308(a)(7)(ii)(C)',
    title: 'Emergency Mode Operation Plan',
    description: 'Establish procedures to enable continuation of critical business processes for protection of ePHI during emergency.',
    implementation: 'Identify critical processes, document emergency procedures, establish communication plans.',
    assessment: 'Review emergency mode procedures and testing records.',
    relatedControls: ['164.308(a)(7)(ii)(D)']
  },
  '164.308(a)(7)(ii)(D)': {
    id: '164.308(a)(7)(ii)(D)',
    title: 'Testing and Revision Procedures',
    description: 'Implement procedures for periodic testing and revision of contingency plans.',
    implementation: 'Schedule regular testing, document results, update plans based on findings.',
    assessment: 'Review contingency plan testing schedule and results.',
    relatedControls: ['164.308(a)(7)(ii)(E)']
  },
  '164.308(a)(7)(ii)(E)': {
    id: '164.308(a)(7)(ii)(E)',
    title: 'Applications and Data Criticality Analysis',
    description: 'Assess the relative criticality of specific applications and data in support of contingency plan components.',
    implementation: 'Identify critical applications and data, prioritize for recovery.',
    assessment: 'Review criticality analysis documentation.',
    relatedControls: ['164.308(a)(7)(ii)(A)']
  },
  '164.308(a)(8)': {
    id: '164.308(a)(8)',
    title: 'Evaluation',
    description: 'Perform periodic technical and nontechnical evaluation to establish extent to which security policies and procedures meet requirements.',
    implementation: 'Conduct periodic security evaluations, internal audits, gap assessments.',
    assessment: 'Review evaluation schedules, reports, and remediation tracking.',
    relatedControls: ['164.308(a)(1)']
  },
  '164.308(b)(1)': {
    id: '164.308(b)(1)',
    title: 'Business Associate Contracts',
    description: 'Obtain satisfactory assurances from business associates regarding ePHI protection.',
    implementation: 'Execute BAAs with all business associates, review agreements periodically.',
    assessment: 'Review BAA inventory and contract terms.',
    relatedControls: ['164.308(b)(4)']
  },
  
  // Physical Safeguards (§164.310)
  '164.310(a)(1)': {
    id: '164.310(a)(1)',
    title: 'Facility Access Controls',
    description: 'Implement policies and procedures to limit physical access to electronic information systems and the facilities in which they are housed.',
    implementation: 'Implement physical access controls, visitor management, access logs.',
    assessment: 'Review physical security policies and access records.',
    relatedControls: ['164.310(a)(2)(i)', '164.310(a)(2)(ii)']
  },
  '164.310(a)(2)(i)': {
    id: '164.310(a)(2)(i)',
    title: 'Contingency Operations',
    description: 'Establish procedures for facility access in support of restoration of data under disaster recovery and emergency operations plans.',
    implementation: 'Document emergency access procedures, maintain emergency contact lists.',
    assessment: 'Review emergency facility access procedures.',
    relatedControls: ['164.308(a)(7)']
  },
  '164.310(a)(2)(ii)': {
    id: '164.310(a)(2)(ii)',
    title: 'Facility Security Plan',
    description: 'Implement policies and procedures to safeguard the facility and equipment from unauthorized physical access, tampering, and theft.',
    implementation: 'Develop facility security plan, implement physical controls, conduct assessments.',
    assessment: 'Review facility security plan and physical control effectiveness.',
    relatedControls: ['164.310(a)(2)(iii)']
  },
  '164.310(a)(2)(iii)': {
    id: '164.310(a)(2)(iii)',
    title: 'Access Control and Validation Procedures',
    description: 'Implement procedures to control and validate a person\'s access to facilities based on role or function.',
    implementation: 'Implement badge systems, access levels, visitor procedures.',
    assessment: 'Review access control systems and validation procedures.',
    relatedControls: ['164.310(a)(2)(iv)']
  },
  '164.310(a)(2)(iv)': {
    id: '164.310(a)(2)(iv)',
    title: 'Maintenance Records',
    description: 'Implement policies and procedures to document repairs and modifications to the physical components of a facility related to security.',
    implementation: 'Maintain maintenance logs, document security-related modifications.',
    assessment: 'Review maintenance records and modification documentation.',
    relatedControls: ['164.310(d)(1)']
  },
  '164.310(b)': {
    id: '164.310(b)',
    title: 'Workstation Use',
    description: 'Implement policies and procedures that specify the proper functions to be performed and the manner in which those functions are to be performed.',
    implementation: 'Define acceptable use policies for workstations accessing ePHI.',
    assessment: 'Review workstation use policies and enforcement.',
    relatedControls: ['164.310(c)']
  },
  '164.310(c)': {
    id: '164.310(c)',
    title: 'Workstation Security',
    description: 'Implement physical safeguards for all workstations that access ePHI, to restrict access to authorized users.',
    implementation: 'Implement screen locks, physical placement, cable locks, privacy screens.',
    assessment: 'Review workstation security controls.',
    relatedControls: ['164.310(b)']
  },
  '164.310(d)(1)': {
    id: '164.310(d)(1)',
    title: 'Device and Media Controls',
    description: 'Implement policies and procedures governing receipt and removal of hardware and electronic media containing ePHI.',
    implementation: 'Implement media handling procedures, tracking, and sanitization.',
    assessment: 'Review media control policies and tracking records.',
    relatedControls: ['164.310(d)(2)(i)', '164.310(d)(2)(ii)']
  },
  '164.310(d)(2)(i)': {
    id: '164.310(d)(2)(i)',
    title: 'Disposal',
    description: 'Implement policies and procedures for final disposition of ePHI and the hardware or electronic media on which it is stored.',
    implementation: 'Define disposal procedures, use certified destruction methods, maintain disposal records.',
    assessment: 'Review disposal policies and certificates of destruction.',
    relatedControls: ['164.310(d)(2)(ii)']
  },
  '164.310(d)(2)(ii)': {
    id: '164.310(d)(2)(ii)',
    title: 'Media Re-use',
    description: 'Implement procedures for removal of ePHI from electronic media before the media are made available for re-use.',
    implementation: 'Define media sanitization procedures, verify sanitization before re-use.',
    assessment: 'Review media sanitization procedures and verification records.',
    relatedControls: ['164.310(d)(2)(i)']
  },
  '164.310(d)(2)(iii)': {
    id: '164.310(d)(2)(iii)',
    title: 'Accountability',
    description: 'Maintain a record of movements of hardware and electronic media and the person responsible.',
    implementation: 'Implement asset tracking, maintain chain of custody records.',
    assessment: 'Review asset tracking system and movement records.',
    relatedControls: ['164.310(d)(2)(iv)']
  },
  '164.310(d)(2)(iv)': {
    id: '164.310(d)(2)(iv)',
    title: 'Data Backup and Storage',
    description: 'Create a retrievable, exact copy of ePHI when needed, before movement of equipment.',
    implementation: 'Backup data before equipment moves, verify backup integrity.',
    assessment: 'Review backup procedures for equipment movement.',
    relatedControls: ['164.308(a)(7)(ii)(A)']
  },

  // Technical Safeguards (§164.312)
  '164.312(a)(1)': {
    id: '164.312(a)(1)',
    title: 'Access Control',
    description: 'Implement technical policies and procedures for electronic information systems that maintain ePHI to allow access only to authorized persons or software programs.',
    implementation: 'Implement user authentication, role-based access control, access provisioning.',
    assessment: 'Review access control configurations and user access rights.',
    relatedControls: ['164.312(a)(2)(i)', '164.312(a)(2)(ii)']
  },
  '164.312(a)(2)(i)': {
    id: '164.312(a)(2)(i)',
    title: 'Unique User Identification',
    description: 'Assign a unique name and/or number for identifying and tracking user identity.',
    implementation: 'Assign unique user IDs, prohibit shared accounts, track user activity.',
    assessment: 'Review user ID assignment and account management procedures.',
    relatedControls: ['164.312(d)']
  },
  '164.312(a)(2)(ii)': {
    id: '164.312(a)(2)(ii)',
    title: 'Emergency Access Procedure',
    description: 'Establish procedures for obtaining necessary ePHI during an emergency.',
    implementation: 'Document emergency access procedures, define authorization requirements.',
    assessment: 'Review emergency access procedures and usage records.',
    relatedControls: ['164.308(a)(7)(ii)(C)']
  },
  '164.312(a)(2)(iii)': {
    id: '164.312(a)(2)(iii)',
    title: 'Automatic Logoff',
    description: 'Implement electronic procedures that terminate an electronic session after a predetermined time of inactivity.',
    implementation: 'Configure session timeouts, screen locks, automatic logoff.',
    assessment: 'Review automatic logoff configurations.',
    relatedControls: ['164.310(b)']
  },
  '164.312(a)(2)(iv)': {
    id: '164.312(a)(2)(iv)',
    title: 'Encryption and Decryption',
    description: 'Implement a mechanism to encrypt and decrypt ePHI.',
    implementation: 'Implement encryption for data at rest and in transit, manage encryption keys.',
    assessment: 'Review encryption implementation and key management.',
    relatedControls: ['164.312(e)(2)(ii)']
  },
  '164.312(b)': {
    id: '164.312(b)',
    title: 'Audit Controls',
    description: 'Implement hardware, software, and/or procedural mechanisms that record and examine activity in systems containing ePHI.',
    implementation: 'Configure audit logging, centralize logs, establish review procedures.',
    assessment: 'Review audit control configurations and log review records.',
    relatedControls: ['164.308(a)(1)(ii)(D)', '164.308(a)(5)(ii)(C)']
  },
  '164.312(c)(1)': {
    id: '164.312(c)(1)',
    title: 'Integrity',
    description: 'Implement policies and procedures to protect ePHI from improper alteration or destruction.',
    implementation: 'Implement integrity controls, checksums, digital signatures.',
    assessment: 'Review integrity control mechanisms.',
    relatedControls: ['164.312(c)(2)']
  },
  '164.312(c)(2)': {
    id: '164.312(c)(2)',
    title: 'Mechanism to Authenticate ePHI',
    description: 'Implement electronic mechanisms to corroborate that ePHI has not been altered or destroyed in an unauthorized manner.',
    implementation: 'Implement hashing, digital signatures, or other authentication mechanisms.',
    assessment: 'Review data integrity authentication mechanisms.',
    relatedControls: ['164.312(c)(1)']
  },
  '164.312(d)': {
    id: '164.312(d)',
    title: 'Person or Entity Authentication',
    description: 'Implement procedures to verify that a person or entity seeking access to ePHI is the one claimed.',
    implementation: 'Implement multi-factor authentication, identity verification procedures.',
    assessment: 'Review authentication mechanisms and procedures.',
    relatedControls: ['164.312(a)(2)(i)', '164.308(a)(5)(ii)(D)']
  },
  '164.312(e)(1)': {
    id: '164.312(e)(1)',
    title: 'Transmission Security',
    description: 'Implement technical security measures to guard against unauthorized access to ePHI being transmitted over an electronic communications network.',
    implementation: 'Implement TLS/SSL, VPNs, encryption for data in transit.',
    assessment: 'Review transmission security configurations.',
    relatedControls: ['164.312(e)(2)(i)', '164.312(e)(2)(ii)']
  },
  '164.312(e)(2)(i)': {
    id: '164.312(e)(2)(i)',
    title: 'Integrity Controls',
    description: 'Implement security measures to ensure that electronically transmitted ePHI is not improperly modified without detection.',
    implementation: 'Implement message authentication, checksums for transmitted data.',
    assessment: 'Review transmission integrity controls.',
    relatedControls: ['164.312(c)(2)']
  },
  '164.312(e)(2)(ii)': {
    id: '164.312(e)(2)(ii)',
    title: 'Encryption',
    description: 'Implement a mechanism to encrypt ePHI whenever deemed appropriate.',
    implementation: 'Encrypt ePHI in transit using TLS 1.2+, implement end-to-end encryption where needed.',
    assessment: 'Review encryption configurations for transmitted data.',
    relatedControls: ['164.312(a)(2)(iv)']
  }
};

export default { hipaaFramework, hipaaControls };

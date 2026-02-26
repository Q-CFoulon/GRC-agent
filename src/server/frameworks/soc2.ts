/**
 * SOC 2 - System and Organization Controls 2
 * Trust Services Criteria based on AICPA standards
 */

import { FrameworkInfo, ControlRequirement, ComplianceFramework } from '../types/framework.js';

export const soc2Framework: FrameworkInfo = {
  id: ComplianceFramework.SOC2,
  name: 'SOC 2 Trust Services Criteria',
  version: '2017 (with 2022 Points of Focus)',
  description: 'SOC 2 is a voluntary compliance standard developed by the AICPA that specifies how organizations should manage customer data based on five Trust Services Criteria.',
  organization: 'American Institute of Certified Public Accountants (AICPA)',
  total_controls: 64,
  categories: ['Security', 'Availability', 'Processing Integrity', 'Confidentiality', 'Privacy'],
  url: 'https://www.aicpa.org/interestareas/frc/assuranceadvisoryservices/sorhome'
};

export const soc2Controls: Record<string, ControlRequirement> = {
  // Common Criteria (Security - Required for all SOC 2)
  'CC1.1': {
    id: 'CC1.1',
    title: 'COSO Principle 1: Demonstrates Commitment to Integrity and Ethical Values',
    description: 'The entity demonstrates a commitment to integrity and ethical values.',
    implementation: 'Establish code of conduct, ethics policies, and tone at the top communications.',
    assessment: 'Review code of conduct, ethics training records, and leadership communications.',
    relatedControls: ['CC1.2', 'CC1.3']
  },
  'CC1.2': {
    id: 'CC1.2',
    title: 'COSO Principle 2: Board Independence and Oversight',
    description: 'The board of directors demonstrates independence from management and exercises oversight.',
    implementation: 'Establish board charter, independence requirements, and oversight responsibilities.',
    assessment: 'Review board composition, meeting minutes, and oversight activities.',
    relatedControls: ['CC1.1', 'CC1.3']
  },
  'CC1.3': {
    id: 'CC1.3',
    title: 'COSO Principle 3: Management Establishes Structures and Reporting Lines',
    description: 'Management establishes structures, reporting lines, and appropriate authorities and responsibilities.',
    implementation: 'Define organizational structure, job descriptions, and reporting relationships.',
    assessment: 'Review org charts, job descriptions, and delegation of authority.',
    relatedControls: ['CC1.4', 'CC1.5']
  },
  'CC1.4': {
    id: 'CC1.4',
    title: 'COSO Principle 4: Commitment to Competence',
    description: 'The entity demonstrates a commitment to attract, develop, and retain competent individuals.',
    implementation: 'Establish HR policies for recruitment, training, performance management.',
    assessment: 'Review HR policies, training programs, and competency assessments.',
    relatedControls: ['CC1.3', 'CC1.5']
  },
  'CC1.5': {
    id: 'CC1.5',
    title: 'COSO Principle 5: Enforces Accountability',
    description: 'The entity holds individuals accountable for their internal control responsibilities.',
    implementation: 'Establish performance metrics, accountability mechanisms, and consequence management.',
    assessment: 'Review performance management process and accountability documentation.',
    relatedControls: ['CC1.1', 'CC1.4']
  },
  'CC2.1': {
    id: 'CC2.1',
    title: 'COSO Principle 13: Uses Relevant Information',
    description: 'The entity obtains or generates and uses relevant, quality information.',
    implementation: 'Establish information quality standards, data governance, and validation procedures.',
    assessment: 'Review information management policies and quality controls.',
    relatedControls: ['CC2.2', 'CC2.3']
  },
  'CC2.2': {
    id: 'CC2.2',
    title: 'COSO Principle 14: Communicates Internally',
    description: 'The entity internally communicates information necessary for internal control.',
    implementation: 'Establish internal communication channels, policies, and escalation procedures.',
    assessment: 'Review internal communication policies and channels.',
    relatedControls: ['CC2.1', 'CC2.3']
  },
  'CC2.3': {
    id: 'CC2.3',
    title: 'COSO Principle 15: Communicates Externally',
    description: 'The entity communicates with external parties regarding matters affecting control.',
    implementation: 'Establish external communication policies, customer communications, regulatory reporting.',
    assessment: 'Review external communication policies and stakeholder engagement.',
    relatedControls: ['CC2.1', 'CC2.2']
  },
  'CC3.1': {
    id: 'CC3.1',
    title: 'COSO Principle 6: Specifies Suitable Objectives',
    description: 'The entity specifies objectives with sufficient clarity to enable identification of risks.',
    implementation: 'Define business objectives, service commitments, and system requirements.',
    assessment: 'Review documented objectives and service level agreements.',
    relatedControls: ['CC3.2', 'CC3.3']
  },
  'CC3.2': {
    id: 'CC3.2',
    title: 'COSO Principle 7: Identifies and Analyzes Risk',
    description: 'The entity identifies risks to the achievement of objectives and analyzes them.',
    implementation: 'Conduct risk assessments, threat modeling, and vulnerability analysis.',
    assessment: 'Review risk assessment methodology, documentation, and results.',
    relatedControls: ['CC3.1', 'CC3.3', 'CC3.4']
  },
  'CC3.3': {
    id: 'CC3.3',
    title: 'COSO Principle 8: Assesses Fraud Risk',
    description: 'The entity considers the potential for fraud in assessing risks.',
    implementation: 'Include fraud risk in risk assessments, establish fraud detection controls.',
    assessment: 'Review fraud risk assessment and anti-fraud controls.',
    relatedControls: ['CC3.2', 'CC3.4']
  },
  'CC3.4': {
    id: 'CC3.4',
    title: 'COSO Principle 9: Identifies and Analyzes Significant Change',
    description: 'The entity identifies and assesses changes that could significantly affect internal control.',
    implementation: 'Establish change management process, assess control impact of changes.',
    assessment: 'Review change management process and control impact assessments.',
    relatedControls: ['CC3.2', 'CC8.1']
  },
  'CC4.1': {
    id: 'CC4.1',
    title: 'COSO Principle 16: Conducts Ongoing and/or Separate Evaluations',
    description: 'The entity selects, develops, and performs evaluations to ascertain whether internal control components are present and functioning.',
    implementation: 'Establish internal audit function, control testing program, continuous monitoring.',
    assessment: 'Review evaluation procedures, audit reports, and monitoring activities.',
    relatedControls: ['CC4.2']
  },
  'CC4.2': {
    id: 'CC4.2',
    title: 'COSO Principle 17: Evaluates and Communicates Deficiencies',
    description: 'The entity evaluates and communicates internal control deficiencies to responsible parties.',
    implementation: 'Document deficiencies, track remediation, report to management and board.',
    assessment: 'Review deficiency tracking, remediation plans, and management reporting.',
    relatedControls: ['CC4.1']
  },
  'CC5.1': {
    id: 'CC5.1',
    title: 'COSO Principle 10: Selects and Develops Control Activities',
    description: 'The entity selects and develops control activities that contribute to mitigation of risks.',
    implementation: 'Design and implement controls based on risk assessment, document control objectives.',
    assessment: 'Review control design documentation and risk-control mapping.',
    relatedControls: ['CC5.2', 'CC5.3']
  },
  'CC5.2': {
    id: 'CC5.2',
    title: 'COSO Principle 11: Selects and Develops General Controls over Technology',
    description: 'The entity selects and develops general IT controls to support the achievement of objectives.',
    implementation: 'Implement ITGC: access controls, change management, operations, SDLC.',
    assessment: 'Review ITGC documentation and operating effectiveness.',
    relatedControls: ['CC5.1', 'CC6.1']
  },
  'CC5.3': {
    id: 'CC5.3',
    title: 'COSO Principle 12: Deploys Through Policies and Procedures',
    description: 'The entity deploys control activities through policies and procedures.',
    implementation: 'Document policies and procedures, communicate to personnel, monitor compliance.',
    assessment: 'Review policy documentation and deployment evidence.',
    relatedControls: ['CC5.1', 'CC5.2']
  },
  // Logical and Physical Access Controls
  'CC6.1': {
    id: 'CC6.1',
    title: 'Logical Access Security Software',
    description: 'The entity implements logical access security software, infrastructure, and architectures.',
    implementation: 'Implement IAM systems, firewalls, network segmentation, security architecture.',
    assessment: 'Review access control systems, network architecture, and security configurations.',
    relatedControls: ['CC6.2', 'CC6.3']
  },
  'CC6.2': {
    id: 'CC6.2',
    title: 'Prior to Issuing System Credentials',
    description: 'Prior to issuing system credentials, the entity registers and authorizes new users.',
    implementation: 'Establish user registration, authorization workflow, approval documentation.',
    assessment: 'Review user provisioning process and authorization records.',
    relatedControls: ['CC6.1', 'CC6.3']
  },
  'CC6.3': {
    id: 'CC6.3',
    title: 'Removes Access to Protected Information Assets',
    description: 'The entity removes access to protected information assets when appropriate.',
    implementation: 'Implement access revocation procedures, termination process, periodic access reviews.',
    assessment: 'Review access removal procedures and periodic review documentation.',
    relatedControls: ['CC6.2', 'CC6.5']
  },
  'CC6.4': {
    id: 'CC6.4',
    title: 'Restricts Physical Access',
    description: 'The entity restricts physical access to facilities and protected information assets.',
    implementation: 'Implement physical access controls, visitor management, environmental controls.',
    assessment: 'Review physical security controls and access logs.',
    relatedControls: ['CC6.5']
  },
  'CC6.5': {
    id: 'CC6.5',
    title: 'Disposes of Protected Information Assets',
    description: 'The entity disposes of protected information assets to prevent unauthorized access.',
    implementation: 'Implement secure disposal procedures, media sanitization, destruction certificates.',
    assessment: 'Review disposal policies and destruction records.',
    relatedControls: ['CC6.3', 'CC6.4']
  },
  'CC6.6': {
    id: 'CC6.6',
    title: 'Logical Access Security Measures Against Threats',
    description: 'The entity implements security measures to protect against malicious activity.',
    implementation: 'Deploy anti-malware, IDS/IPS, vulnerability management, security monitoring.',
    assessment: 'Review security tools deployment and monitoring capabilities.',
    relatedControls: ['CC6.7', 'CC6.8']
  },
  'CC6.7': {
    id: 'CC6.7',
    title: 'Transmission, Movement, and Removal',
    description: 'The entity restricts transmission, movement, and removal of information.',
    implementation: 'Implement DLP, encryption in transit, media transfer controls.',
    assessment: 'Review data protection controls for transmission and movement.',
    relatedControls: ['CC6.6', 'CC6.8']
  },
  'CC6.8': {
    id: 'CC6.8',
    title: 'Controls to Prevent or Detect Unauthorized Software',
    description: 'The entity implements controls to prevent or detect unauthorized software installation.',
    implementation: 'Implement application whitelisting, endpoint protection, software installation policies.',
    assessment: 'Review software installation controls and monitoring.',
    relatedControls: ['CC6.6', 'CC7.2']
  },
  // System Operations
  'CC7.1': {
    id: 'CC7.1',
    title: 'Detection and Monitoring Procedures',
    description: 'The entity uses detection and monitoring procedures for security events.',
    implementation: 'Implement SIEM, log monitoring, alerting, security operations procedures.',
    assessment: 'Review monitoring capabilities and incident detection procedures.',
    relatedControls: ['CC7.2', 'CC7.3']
  },
  'CC7.2': {
    id: 'CC7.2',
    title: 'Monitoring for Malicious Behavior and System Anomalies',
    description: 'The entity monitors for security events and anomalies that indicate potential incidents.',
    implementation: 'Configure security monitoring, establish baselines, implement anomaly detection.',
    assessment: 'Review security monitoring coverage and alert configurations.',
    relatedControls: ['CC7.1', 'CC7.3', 'CC7.4']
  },
  'CC7.3': {
    id: 'CC7.3',
    title: 'Evaluates Security Events',
    description: 'The entity evaluates security events to determine whether they could impact the ability to achieve objectives.',
    implementation: 'Establish event triage procedures, severity classification, escalation criteria.',
    assessment: 'Review event evaluation process and documentation.',
    relatedControls: ['CC7.2', 'CC7.4']
  },
  'CC7.4': {
    id: 'CC7.4',
    title: 'Responds to Security Incidents',
    description: 'The entity responds to security incidents by executing defined incident response program.',
    implementation: 'Develop incident response plan, establish IR team, conduct tabletop exercises.',
    assessment: 'Review incident response procedures and incident handling records.',
    relatedControls: ['CC7.3', 'CC7.5']
  },
  'CC7.5': {
    id: 'CC7.5',
    title: 'Identifies and Reports Failures and Incidents',
    description: 'The entity identifies and reports failures and incidents to appropriate parties.',
    implementation: 'Establish incident reporting procedures, notification requirements, communication plans.',
    assessment: 'Review incident reporting and notification records.',
    relatedControls: ['CC7.4']
  },
  // Change Management
  'CC8.1': {
    id: 'CC8.1',
    title: 'Documents and Manages Changes',
    description: 'The entity authorizes, designs, develops, configures, documents, tests and implements changes.',
    implementation: 'Implement change management process, CAB, testing requirements, documentation standards.',
    assessment: 'Review change management process and change records.',
    relatedControls: ['CC3.4']
  },
  // Risk Mitigation
  'CC9.1': {
    id: 'CC9.1',
    title: 'Identifies and Mitigates Risks from Business Partners',
    description: 'The entity identifies, selects, and develops risk mitigation activities for vendor risks.',
    implementation: 'Establish vendor management program, due diligence, ongoing monitoring.',
    assessment: 'Review vendor management program and assessment documentation.',
    relatedControls: ['CC9.2']
  },
  'CC9.2': {
    id: 'CC9.2',
    title: 'Assesses and Manages Risks from Vendors',
    description: 'The entity assesses and manages risks from vendors and business partners.',
    implementation: 'Conduct vendor assessments, review SOC reports, monitor vendor performance.',
    assessment: 'Review vendor assessments and ongoing monitoring activities.',
    relatedControls: ['CC9.1']
  },
  
  // Availability Criteria
  'A1.1': {
    id: 'A1.1',
    title: 'Current Processing Capacity and Usage',
    description: 'The entity maintains, monitors, and evaluates current processing capacity and usage.',
    implementation: 'Implement capacity monitoring, performance management, capacity planning.',
    assessment: 'Review capacity monitoring and planning documentation.',
    relatedControls: ['A1.2', 'A1.3']
  },
  'A1.2': {
    id: 'A1.2',
    title: 'Environmental Protections, Software, Data Backup',
    description: 'The entity protects against environmental threats and maintains backup procedures.',
    implementation: 'Implement environmental controls, backup systems, disaster recovery procedures.',
    assessment: 'Review environmental controls, backup procedures, and DR plans.',
    relatedControls: ['A1.1', 'A1.3']
  },
  'A1.3': {
    id: 'A1.3',
    title: 'Recovery Plan Testing',
    description: 'The entity tests recovery procedures supporting system recovery.',
    implementation: 'Conduct recovery testing, document results, update procedures based on findings.',
    assessment: 'Review recovery test plans and results.',
    relatedControls: ['A1.2']
  },

  // Processing Integrity Criteria
  'PI1.1': {
    id: 'PI1.1',
    title: 'System Processing Complete, Accurate, Timely, Authorized',
    description: 'The entity obtains information about system processing requirements.',
    implementation: 'Document processing requirements, implement input validation, processing controls.',
    assessment: 'Review processing requirements and control documentation.',
    relatedControls: ['PI1.2', 'PI1.3']
  },
  'PI1.2': {
    id: 'PI1.2',
    title: 'System Inputs Complete, Accurate, Timely',
    description: 'The entity implements policies to validate completeness and accuracy of inputs.',
    implementation: 'Implement input validation, edit checks, authorization controls.',
    assessment: 'Review input validation controls and error handling.',
    relatedControls: ['PI1.1', 'PI1.3']
  },
  'PI1.3': {
    id: 'PI1.3',
    title: 'Processing Complete, Accurate, Timely',
    description: 'The entity implements policies to ensure processing is complete, accurate, and timely.',
    implementation: 'Implement processing controls, reconciliations, exception handling.',
    assessment: 'Review processing controls and reconciliation procedures.',
    relatedControls: ['PI1.2', 'PI1.4']
  },
  'PI1.4': {
    id: 'PI1.4',
    title: 'System Outputs Complete, Accurate, Timely, Authorized',
    description: 'The entity ensures outputs are protected and distributed only to authorized parties.',
    implementation: 'Implement output controls, distribution lists, access restrictions.',
    assessment: 'Review output control procedures.',
    relatedControls: ['PI1.3', 'PI1.5']
  },
  'PI1.5': {
    id: 'PI1.5',
    title: 'Store Inputs and Outputs',
    description: 'The entity stores inputs and outputs completely set accurately, and protects them.',
    implementation: 'Implement data storage controls, retention policies, integrity verification.',
    assessment: 'Review data storage and retention controls.',
    relatedControls: ['PI1.4']
  },

  // Confidentiality Criteria
  'C1.1': {
    id: 'C1.1',
    title: 'Identifies and Maintains Confidential Information',
    description: 'The entity identifies and maintains confidential information.',
    implementation: 'Classify confidential information, implement data inventory, labeling procedures.',
    assessment: 'Review data classification and confidential data inventory.',
    relatedControls: ['C1.2']
  },
  'C1.2': {
    id: 'C1.2',
    title: 'Disposes of Confidential Information',
    description: 'The entity disposes of confidential information according to policy.',
    implementation: 'Implement secure disposal procedures, retention schedules, destruction verification.',
    assessment: 'Review disposal procedures and records.',
    relatedControls: ['C1.1']
  },

  // Privacy Criteria (when applicable)
  'P1.1': {
    id: 'P1.1',
    title: 'Privacy Notice',
    description: 'The entity provides notice to data subjects about its privacy practices.',
    implementation: 'Publish privacy notice, document practices, update as needed.',
    assessment: 'Review privacy notice and communication to data subjects.',
    relatedControls: ['P2.1', 'P3.1']
  },
  'P2.1': {
    id: 'P2.1',
    title: 'Choice and Consent',
    description: 'The entity provides choice and obtains consent for collection, use, and disclosure of personal information.',
    implementation: 'Implement consent mechanisms, preference management, opt-out capabilities.',
    assessment: 'Review consent processes and records.',
    relatedControls: ['P1.1', 'P3.1']
  },
  'P3.1': {
    id: 'P3.1',
    title: 'Collection',
    description: 'The entity collects personal information consistent with its privacy notice.',
    implementation: 'Document collection purposes, limit collection to stated purposes, data minimization.',
    assessment: 'Review collection practices and data minimization.',
    relatedControls: ['P1.1', 'P4.1']
  },
  'P4.1': {
    id: 'P4.1',
    title: 'Use, Retention, and Disposal',
    description: 'The entity limits use, retains, and disposes of personal information consistent with notice.',
    implementation: 'Document use cases, implement retention schedules, secure disposal.',
    assessment: 'Review use, retention, and disposal practices.',
    relatedControls: ['P3.1', 'P5.1']
  },
  'P5.1': {
    id: 'P5.1',
    title: 'Access',
    description: 'The entity provides individuals with access to their personal information.',
    implementation: 'Implement data subject access request process, verification, response tracking.',
    assessment: 'Review DSAR processes and response records.',
    relatedControls: ['P6.1']
  },
  'P6.1': {
    id: 'P6.1',
    title: 'Disclosure and Notification',
    description: 'The entity discloses personal information only as authorized and notifies about breaches.',
    implementation: 'Document authorized disclosures, implement breach notification procedures.',
    assessment: 'Review disclosure controls and breach notification procedures.',
    relatedControls: ['P5.1', 'P7.1']
  },
  'P7.1': {
    id: 'P7.1',
    title: 'Quality',
    description: 'The entity maintains accurate, complete, and relevant personal information.',
    implementation: 'Implement data quality controls, correction mechanisms, accuracy verification.',
    assessment: 'Review data quality controls and correction processes.',
    relatedControls: ['P6.1', 'P8.1']
  },
  'P8.1': {
    id: 'P8.1',
    title: 'Monitoring and Enforcement',
    description: 'The entity monitors compliance with its privacy commitments and resolves inquiries and complaints.',
    implementation: 'Implement privacy monitoring, complaint handling, enforcement mechanisms.',
    assessment: 'Review monitoring activities and complaint resolution records.',
    relatedControls: ['P7.1']
  }
};

export default { soc2Framework, soc2Controls };

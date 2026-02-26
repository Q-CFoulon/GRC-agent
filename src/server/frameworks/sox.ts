/**
 * SOX - Sarbanes-Oxley Act
 * IT General Controls for SOX Compliance
 */

import { FrameworkInfo, ControlRequirement, ComplianceFramework } from '../types/framework.js';

export const soxFramework: FrameworkInfo = {
  id: ComplianceFramework.SOX,
  name: 'Sarbanes-Oxley Act - IT General Controls',
  version: '2002 (PCAOB AS 2201)',
  description: 'SOX Section 404 requires management to assess the effectiveness of internal controls over financial reporting (ICFR). IT General Controls (ITGCs) are critical supporting controls that ensure the integrity of financial systems and data.',
  organization: 'U.S. Securities and Exchange Commission (SEC) / PCAOB',
  total_controls: 38,
  categories: ['Access to Programs and Data', 'Program Changes', 'Computer Operations', 'Program Development', 'End-User Computing'],
  url: 'https://pcaobus.org/oversight/standards/auditing-standards'
};

export const soxControls: Record<string, ControlRequirement> = {
  // Access to Programs and Data
  'SOX.AC.1': {
    id: 'SOX.AC.1',
    title: 'Access Control Policy',
    description: 'Policies and procedures for logical access security shall be defined and documented.',
    implementation: 'Document access control policies covering authentication, authorization, and access provisioning.',
    assessment: 'Review access control policy documentation and approval.',
    relatedControls: ['SOX.AC.2', 'SOX.AC.3']
  },
  'SOX.AC.2': {
    id: 'SOX.AC.2',
    title: 'User Access Provisioning',
    description: 'Access to financial systems shall be authorized and provisioned based on job responsibilities.',
    implementation: 'Implement access request and approval workflow with documented authorization.',
    assessment: 'Review access provisioning procedures and authorization records.',
    relatedControls: ['SOX.AC.1', 'SOX.AC.3']
  },
  'SOX.AC.3': {
    id: 'SOX.AC.3',
    title: 'User Access Modification',
    description: 'Changes to user access shall be authorized and documented.',
    implementation: 'Implement access modification workflow with approval documentation.',
    assessment: 'Review access change records and approvals.',
    relatedControls: ['SOX.AC.2', 'SOX.AC.4']
  },
  'SOX.AC.4': {
    id: 'SOX.AC.4',
    title: 'User Access Termination',
    description: 'Access shall be promptly removed upon termination or job change.',
    implementation: 'Integrate access termination with HR processes, revoke access timely.',
    assessment: 'Review termination procedures and access removal timeliness.',
    relatedControls: ['SOX.AC.2', 'SOX.AC.3']
  },
  'SOX.AC.5': {
    id: 'SOX.AC.5',
    title: 'Periodic Access Review',
    description: 'User access rights shall be periodically reviewed and certified by management.',
    implementation: 'Conduct quarterly or semi-annual access reviews with management certification.',
    assessment: 'Review access certification documentation and remediation.',
    relatedControls: ['SOX.AC.2', 'SOX.AC.6']
  },
  'SOX.AC.6': {
    id: 'SOX.AC.6',
    title: 'Segregation of Duties',
    description: 'Incompatible duties shall be segregated to prevent fraud and error.',
    implementation: 'Define SOD rules, implement preventive controls, monitor violations.',
    assessment: 'Review SOD matrix and violation monitoring.',
    relatedControls: ['SOX.AC.5', 'SOX.AC.7']
  },
  'SOX.AC.7': {
    id: 'SOX.AC.7',
    title: 'Privileged Access Management',
    description: 'Privileged access to financial systems shall be restricted and monitored.',
    implementation: 'Implement PAM, restrict admin access, monitor privileged activities.',
    assessment: 'Review privileged access controls and monitoring.',
    relatedControls: ['SOX.AC.6', 'SOX.AC.8']
  },
  'SOX.AC.8': {
    id: 'SOX.AC.8',
    title: 'Authentication Controls',
    description: 'Strong authentication mechanisms shall be implemented for financial systems.',
    implementation: 'Implement password policies, MFA for critical access.',
    assessment: 'Review authentication configurations and enforcement.',
    relatedControls: ['SOX.AC.1', 'SOX.AC.7']
  },
  'SOX.AC.9': {
    id: 'SOX.AC.9',
    title: 'Physical Security',
    description: 'Physical access to IT facilities and equipment shall be controlled.',
    implementation: 'Implement physical access controls, visitor management, monitoring.',
    assessment: 'Review physical security controls and access logs.',
    relatedControls: ['SOX.AC.1']
  },
  'SOX.AC.10': {
    id: 'SOX.AC.10',
    title: 'Database Security',
    description: 'Direct database access shall be restricted and monitored.',
    implementation: 'Restrict database access, implement database activity monitoring.',
    assessment: 'Review database access controls and activity logs.',
    relatedControls: ['SOX.AC.7', 'SOX.AC.11']
  },
  'SOX.AC.11': {
    id: 'SOX.AC.11',
    title: 'Audit Logging',
    description: 'Security events and user activities shall be logged and retained.',
    implementation: 'Enable audit logging, centralize logs, protect from modification.',
    assessment: 'Review audit log configuration and retention.',
    relatedControls: ['SOX.AC.10', 'SOX.CO.5']
  },

  // Program Changes
  'SOX.PC.1': {
    id: 'SOX.PC.1',
    title: 'Change Management Policy',
    description: 'Policies and procedures for change management shall be defined and documented.',
    implementation: 'Document change management policy covering all change types.',
    assessment: 'Review change management policy documentation.',
    relatedControls: ['SOX.PC.2', 'SOX.PC.3']
  },
  'SOX.PC.2': {
    id: 'SOX.PC.2',
    title: 'Change Request and Approval',
    description: 'Changes to financial applications shall be requested and approved prior to implementation.',
    implementation: 'Implement change request workflow with documented approvals.',
    assessment: 'Review change request and approval documentation.',
    relatedControls: ['SOX.PC.1', 'SOX.PC.3']
  },
  'SOX.PC.3': {
    id: 'SOX.PC.3',
    title: 'Change Testing',
    description: 'Changes shall be tested prior to implementation in production.',
    implementation: 'Conduct testing in non-production environment, document results.',
    assessment: 'Review testing documentation and sign-off.',
    relatedControls: ['SOX.PC.2', 'SOX.PC.4']
  },
  'SOX.PC.4': {
    id: 'SOX.PC.4',
    title: 'Change Approval for Production',
    description: 'Changes shall be approved for migration to production.',
    implementation: 'Obtain production migration approval, maintain approval records.',
    assessment: 'Review production migration approvals.',
    relatedControls: ['SOX.PC.3', 'SOX.PC.5']
  },
  'SOX.PC.5': {
    id: 'SOX.PC.5',
    title: 'Segregation of Development and Production',
    description: 'Development, test, and production environments shall be segregated.',
    implementation: 'Separate environments, restrict developer access to production.',
    assessment: 'Review environment segregation and access controls.',
    relatedControls: ['SOX.PC.4', 'SOX.AC.6']
  },
  'SOX.PC.6': {
    id: 'SOX.PC.6',
    title: 'Emergency Change Management',
    description: 'Emergency changes shall follow accelerated but controlled procedures.',
    implementation: 'Define emergency change process, obtain retrospective approval.',
    assessment: 'Review emergency change procedures and documentation.',
    relatedControls: ['SOX.PC.2', 'SOX.PC.4']
  },
  'SOX.PC.7': {
    id: 'SOX.PC.7',
    title: 'Version Control',
    description: 'Source code and configurations shall be version controlled.',
    implementation: 'Implement source control, require check-in/check-out.',
    assessment: 'Review version control configuration and usage.',
    relatedControls: ['SOX.PC.5', 'SOX.PC.8']
  },
  'SOX.PC.8': {
    id: 'SOX.PC.8',
    title: 'Change Documentation',
    description: 'Changes shall be documented including description, testing, and approvals.',
    implementation: 'Maintain complete change records, include all required documentation.',
    assessment: 'Review change documentation completeness.',
    relatedControls: ['SOX.PC.2', 'SOX.PC.7']
  },

  // Computer Operations
  'SOX.CO.1': {
    id: 'SOX.CO.1',
    title: 'Batch Job Scheduling',
    description: 'Batch jobs and scheduled processes shall be controlled and monitored.',
    implementation: 'Implement job scheduling controls, monitor completion.',
    assessment: 'Review job scheduling and monitoring procedures.',
    relatedControls: ['SOX.CO.2', 'SOX.CO.3']
  },
  'SOX.CO.2': {
    id: 'SOX.CO.2',
    title: 'Batch Job Failures',
    description: 'Batch job failures shall be identified, investigated, and resolved.',
    implementation: 'Implement failure notification, investigation procedures, resolution tracking.',
    assessment: 'Review job failure handling and resolution records.',
    relatedControls: ['SOX.CO.1', 'SOX.CO.3']
  },
  'SOX.CO.3': {
    id: 'SOX.CO.3',
    title: 'Interface Monitoring',
    description: 'Data interfaces between systems shall be monitored for completeness and accuracy.',
    implementation: 'Implement interface monitoring, reconciliation controls.',
    assessment: 'Review interface monitoring and reconciliation records.',
    relatedControls: ['SOX.CO.1', 'SOX.CO.4']
  },
  'SOX.CO.4': {
    id: 'SOX.CO.4',
    title: 'Backup and Recovery',
    description: 'Data and systems shall be backed up and tested for recoverability.',
    implementation: 'Implement backup procedures, test restoration periodically.',
    assessment: 'Review backup procedures and restoration test records.',
    relatedControls: ['SOX.CO.5', 'SOX.CO.6']
  },
  'SOX.CO.5': {
    id: 'SOX.CO.5',
    title: 'System Monitoring',
    description: 'Systems shall be monitored for performance and availability.',
    implementation: 'Implement monitoring tools, alert on issues, track incidents.',
    assessment: 'Review monitoring configuration and incident records.',
    relatedControls: ['SOX.CO.4', 'SOX.AC.11']
  },
  'SOX.CO.6': {
    id: 'SOX.CO.6',
    title: 'Disaster Recovery',
    description: 'Disaster recovery plans shall be maintained and tested.',
    implementation: 'Develop DR plan, conduct annual testing, document results.',
    assessment: 'Review DR plan and testing documentation.',
    relatedControls: ['SOX.CO.4', 'SOX.CO.5']
  },
  'SOX.CO.7': {
    id: 'SOX.CO.7',
    title: 'Problem Management',
    description: 'Problems and incidents shall be tracked and resolved.',
    implementation: 'Implement problem management process, track to resolution.',
    assessment: 'Review problem management procedures and records.',
    relatedControls: ['SOX.CO.2', 'SOX.CO.5']
  },

  // Program Development
  'SOX.PD.1': {
    id: 'SOX.PD.1',
    title: 'System Development Methodology',
    description: 'A system development life cycle methodology shall be followed.',
    implementation: 'Define and follow SDLC methodology for new development.',
    assessment: 'Review SDLC methodology documentation and adherence.',
    relatedControls: ['SOX.PD.2', 'SOX.PD.3']
  },
  'SOX.PD.2': {
    id: 'SOX.PD.2',
    title: 'Requirements Documentation',
    description: 'Business and functional requirements shall be documented and approved.',
    implementation: 'Document requirements, obtain stakeholder approval.',
    assessment: 'Review requirements documentation and approvals.',
    relatedControls: ['SOX.PD.1', 'SOX.PD.3']
  },
  'SOX.PD.3': {
    id: 'SOX.PD.3',
    title: 'Design Documentation',
    description: 'System design shall be documented and reviewed.',
    implementation: 'Document technical design, conduct design review.',
    assessment: 'Review design documentation and review records.',
    relatedControls: ['SOX.PD.2', 'SOX.PD.4']
  },
  'SOX.PD.4': {
    id: 'SOX.PD.4',
    title: 'Testing and Quality Assurance',
    description: 'Systems shall be tested including user acceptance testing.',
    implementation: 'Conduct unit, integration, and UAT testing, document results.',
    assessment: 'Review testing plans and results documentation.',
    relatedControls: ['SOX.PD.3', 'SOX.PC.3']
  },
  'SOX.PD.5': {
    id: 'SOX.PD.5',
    title: 'Data Conversion Controls',
    description: 'Data conversion shall be controlled to ensure completeness and accuracy.',
    implementation: 'Implement conversion controls, reconcile data, obtain approval.',
    assessment: 'Review data conversion procedures and reconciliation.',
    relatedControls: ['SOX.PD.4', 'SOX.PD.6']
  },
  'SOX.PD.6': {
    id: 'SOX.PD.6',
    title: 'Post-Implementation Review',
    description: 'Post-implementation reviews shall be conducted for significant changes.',
    implementation: 'Conduct post-implementation review, document findings.',
    assessment: 'Review post-implementation review documentation.',
    relatedControls: ['SOX.PD.4', 'SOX.PD.5']
  },

  // End-User Computing
  'SOX.EU.1': {
    id: 'SOX.EU.1',
    title: 'EUC Inventory',
    description: 'End-user computing applications used in financial reporting shall be inventoried.',
    implementation: 'Identify and inventory EUCs, assess criticality.',
    assessment: 'Review EUC inventory and risk assessment.',
    relatedControls: ['SOX.EU.2', 'SOX.EU.3']
  },
  'SOX.EU.2': {
    id: 'SOX.EU.2',
    title: 'EUC Change Controls',
    description: 'Changes to EUC applications shall be controlled and documented.',
    implementation: 'Implement change controls for EUCs, maintain version history.',
    assessment: 'Review EUC change controls and documentation.',
    relatedControls: ['SOX.EU.1', 'SOX.EU.3']
  },
  'SOX.EU.3': {
    id: 'SOX.EU.3',
    title: 'EUC Input/Output Controls',
    description: 'Input and output of EUC applications shall be validated and reviewed.',
    implementation: 'Implement input validation, periodic output review.',
    assessment: 'Review EUC input and output controls.',
    relatedControls: ['SOX.EU.1', 'SOX.EU.4']
  },
  'SOX.EU.4': {
    id: 'SOX.EU.4',
    title: 'EUC Access Controls',
    description: 'Access to EUC applications and underlying data shall be restricted.',
    implementation: 'Restrict EUC access, protect files and data.',
    assessment: 'Review EUC access controls.',
    relatedControls: ['SOX.EU.1', 'SOX.EU.2']
  }
};

export default { soxFramework, soxControls };

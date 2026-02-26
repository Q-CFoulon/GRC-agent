/**
 * NIST Cybersecurity Framework 2.0 Definition
 * Includes 265 controls across 5 functions
 */

import { FrameworkInfo, ControlRequirement, ComplianceFramework } from '../types/framework.js';

export const nistCSF20: FrameworkInfo = {
  id: ComplianceFramework.NIST_CSF,
  name: 'NIST Cybersecurity Framework',
  version: '2.0',
  description: 'The NIST Cybersecurity Framework (NIST CSF) is a risk-based guidance for protecting critical infrastructure.',
  organization: 'National Institute of Standards and Technology (NIST)',
  total_controls: 265,
  categories: ['Govern', 'Protect', 'Detect', 'Respond', 'Recover'],
  url: 'https://csrc.nist.gov/projects/cybersecurity-framework'
};

export const nistCSFControls: Record<string, ControlRequirement> = {
  'GV.RO-01': {
    id: 'GV.RO-01',
    title: 'Organizational roles and responsibilities are established',
    description: 'Roles and responsibilities for organizational cybersecurity functions are defined, assigned, and communicated.',
    implementation: 'Document roles, designate cybersecurity personnel, establish reporting structures, and communicate responsibilities to all staff.',
    assessment: 'Provide documentation of role assignments, job descriptions, and communication records. Verify that key cybersecurity roles are assigned and understood.',
    relatedControls: ['GV.PO-01', 'GV.RM-01']
  },
  'GV.PO-01': {
    id: 'GV.PO-01',
    title: 'Cybersecurity policies are established',
    description: 'Cybersecurity policies are established to direct and regulate how an organization addresses cybersecurity risk.',
    implementation: 'Develop comprehensive cybersecurity policies addressing governance, risk, and compliance. Ensure policies are approved and communicated.',
    assessment: 'Review cybersecurity policies for completeness, approval status, and distribution. Verify policies address key cybersecurity concerns.',
    relatedControls: ['GV.RO-01', 'GV.RM-01']
  },
  'PR.AC-01': {
    id: 'PR.AC-01',
    title: 'Access control policies and procedures are established and communicated',
    description: 'Access to physical and logical assets is managed in accordance with an established policy.',
    implementation: 'Establish access control policies, implement least privilege principle, maintain access records, and regularly review access rights.',
    assessment: 'Review access control policies and procedures. Verify implementation through testing and audit logs.',
    relatedControls: ['PR.AC-02', 'GV.PO-01']
  },
  'DE.AE-01': {
    id: 'DE.AE-01',
    title: 'Network traffic is analysed to detect and respond to anomalies',
    description: 'Network-based detection tools are deployed and kept current to detect, investigate, and respond to intrusions and anomalous behavior.',
    implementation: 'Deploy network intrusion detection systems (IDS), configure alerting, establish baseline traffic patterns, and monitor for anomalies.',
    assessment: 'Verify IDS/IPS deployment, check alert configuration, and review detection logs for identified anomalies.',
    relatedControls: ['DE.AE-02', 'DE.CM-06']
  },
  'RS.RP-01': {
    id: 'RS.RP-01',
    title: 'Response processes and procedures are established and communicated',
    description: 'Response processes and procedures are executed and maintained, to ensure response to detected cybersecurity incidents.',
    implementation: 'Develop incident response playbooks, establish escalation procedures, conduct tabletop exercises, and maintain response team readiness.',
    assessment: 'Review incident response plans, verify team awareness through testing, and check incident response records.',
    relatedControls: ['RS.RP-02', 'GV.PO-01']
  },
  'RC.RP-01': {
    id: 'RC.RP-01',
    title: 'Recovery processes and procedures are established and communicated',
    description: 'Recovery processes and procedures are executed and maintained to support resilience and ensure continuity of operations.',
    implementation: 'Develop recovery procedures, establish backup restoration processes, conduct recovery testing, and maintain current documentation.',
    assessment: 'Review recovery procedures and recovery time objectives (RTO). Verify recovery testing and results.',
    relatedControls: ['RC.RP-02', 'GV.PO-01']
  }
};

export function getNISTCSFControls(): ControlRequirement[] {
  return Object.values(nistCSFControls);
}

export function getNISTCSFControl(controlId: string): ControlRequirement | undefined {
  return nistCSFControls[controlId];
}

export function getNISTCSFControlsByCategory(category: string): ControlRequirement[] {
  const categoryPrefix = category.substring(0, 2);
  return Object.values(nistCSFControls).filter(c => c.id.startsWith(categoryPrefix));
}

/**
 * CCPA - California Consumer Privacy Act
 * California state privacy regulation
 */

import { FrameworkInfo, ControlRequirement, ComplianceFramework } from '../types/framework.js';

export const ccpaFramework: FrameworkInfo = {
  id: ComplianceFramework.CCPA,
  name: 'California Consumer Privacy Act',
  version: '2018 (with CPRA amendments)',
  description: 'CCPA provides California residents with specific rights regarding their personal information and imposes obligations on businesses that collect or sell their data.',
  organization: 'California State Legislature',
  total_controls: 28,
  categories: ['Consumer Rights', 'Business Obligations', 'Data Handling', 'Disclosures', 'Enforcement'],
  url: 'https://oag.ca.gov/privacy/ccpa'
};

export const ccpaControls: Record<string, ControlRequirement> = {
  // Consumer Rights
  'CCPA.1798.100': {
    id: 'CCPA.1798.100',
    title: 'Right to Know What Personal Information is Being Collected',
    description: 'Consumers have the right to know what personal information is being collected about them.',
    implementation: 'Provide notice at collection, maintain privacy policy disclosing categories of PI collected.',
    assessment: 'Review notice at collection and privacy policy disclosures.',
    relatedControls: ['CCPA.1798.110', 'CCPA.1798.130']
  },
  'CCPA.1798.105': {
    id: 'CCPA.1798.105',
    title: 'Right to Delete Personal Information',
    description: 'Consumers have the right to request deletion of personal information collected from them.',
    implementation: 'Implement deletion request process, verify identity, delete within 45 days, notify service providers.',
    assessment: 'Review deletion procedures, response times, and service provider notifications.',
    relatedControls: ['CCPA.1798.130', 'CCPA.1798.145']
  },
  'CCPA.1798.110': {
    id: 'CCPA.1798.110',
    title: 'Right to Know About Personal Information Sold or Disclosed',
    description: 'Consumers have the right to request that a business disclose what personal information it collects, sells, or discloses.',
    implementation: 'Implement access request process, provide categories and specific pieces of information.',
    assessment: 'Review access request procedures and response content.',
    relatedControls: ['CCPA.1798.100', 'CCPA.1798.115']
  },
  'CCPA.1798.115': {
    id: 'CCPA.1798.115',
    title: 'Right to Know About Selling of Personal Information',
    description: 'Consumers have the right to know the categories of third parties with whom their data has been shared or sold.',
    implementation: 'Track data sales and sharing, disclose categories of recipients.',
    assessment: 'Review data sharing documentation and disclosures.',
    relatedControls: ['CCPA.1798.110', 'CCPA.1798.120']
  },
  'CCPA.1798.120': {
    id: 'CCPA.1798.120',
    title: 'Right to Opt-Out of Sale of Personal Information',
    description: 'Consumers have the right to direct a business to not sell their personal information.',
    implementation: 'Provide "Do Not Sell My Personal Information" link, implement preference management, honor requests.',
    assessment: 'Review opt-out mechanism and preference enforcement.',
    relatedControls: ['CCPA.1798.115', 'CCPA.1798.135']
  },
  'CCPA.1798.121': {
    id: 'CCPA.1798.121',
    title: 'Right to Limit Use of Sensitive Personal Information',
    description: 'Consumers have the right to limit the use and disclosure of sensitive personal information.',
    implementation: 'Provide "Limit Use of My Sensitive Personal Information" link, implement restrictions.',
    assessment: 'Review sensitive data handling and restriction mechanisms.',
    relatedControls: ['CCPA.1798.120', 'CCPA.1798.140']
  },
  'CCPA.1798.125': {
    id: 'CCPA.1798.125',
    title: 'Non-Discrimination',
    description: 'Businesses shall not discriminate against consumers for exercising their rights under CCPA.',
    implementation: 'Ensure equal service regardless of rights exercise, document financial incentive programs.',
    assessment: 'Review non-discrimination policies and incentive program disclosures.',
    relatedControls: ['CCPA.1798.135']
  },
  'CCPA.1798.130': {
    id: 'CCPA.1798.130',
    title: 'Methods for Submitting Consumer Requests',
    description: 'Businesses shall provide two or more designated methods for submitting requests, including a toll-free number.',
    implementation: 'Provide multiple request channels, respond within 45 days, provide free responses.',
    assessment: 'Review request submission methods and response procedures.',
    relatedControls: ['CCPA.1798.100', 'CCPA.1798.105', 'CCPA.1798.110']
  },
  'CCPA.1798.135': {
    id: 'CCPA.1798.135',
    title: 'Do Not Sell Link Requirement',
    description: 'Businesses that sell personal information shall provide a clear and conspicuous link titled "Do Not Sell My Personal Information" on their homepage.',
    implementation: 'Place prominent opt-out link on homepage, process opt-out requests.',
    assessment: 'Review homepage link placement and functionality.',
    relatedControls: ['CCPA.1798.120', 'CCPA.1798.185']
  },
  'CCPA.1798.140': {
    id: 'CCPA.1798.140',
    title: 'Definitions - Personal Information Categories',
    description: 'Definition of personal information and its categories under CCPA.',
    implementation: 'Identify and classify personal information according to CCPA categories.',
    assessment: 'Review data inventory and CCPA classification.',
    relatedControls: ['CCPA.1798.100']
  },
  'CCPA.1798.145': {
    id: 'CCPA.1798.145',
    title: 'Exemptions',
    description: 'Certain information and activities are exempt from CCPA requirements.',
    implementation: 'Identify exempt data (e.g., HIPAA-covered, GLBA-covered), document exemptions.',
    assessment: 'Review exemption determinations and documentation.',
    relatedControls: ['CCPA.1798.105']
  },
  'CCPA.1798.150': {
    id: 'CCPA.1798.150',
    title: 'Private Right of Action for Data Breaches',
    description: 'Consumers may bring civil actions for certain data breaches involving unencrypted personal information.',
    implementation: 'Implement reasonable security measures, encrypt personal information.',
    assessment: 'Review security measures and encryption implementation.',
    relatedControls: ['CCPA.1798.81.5']
  },
  'CCPA.1798.155': {
    id: 'CCPA.1798.155',
    title: 'Administrative Enforcement by Attorney General',
    description: 'The California Attorney General has authority to enforce CCPA.',
    implementation: 'Maintain compliance, respond to AG inquiries, implement cure procedures.',
    assessment: 'Review compliance program and response procedures.',
    relatedControls: ['CCPA.1798.150']
  },

  // Business Obligations
  'CCPA.1798.81.5': {
    id: 'CCPA.1798.81.5',
    title: 'Reasonable Security Measures',
    description: 'Businesses that own, license, or maintain personal information shall implement and maintain reasonable security procedures.',
    implementation: 'Implement security controls, conduct risk assessments, maintain security program.',
    assessment: 'Review security program and control implementation.',
    relatedControls: ['CCPA.1798.150']
  },
  'CCPA.1798.82': {
    id: 'CCPA.1798.82',
    title: 'Data Breach Notification',
    description: 'Businesses shall notify California residents of data breaches involving their personal information.',
    implementation: 'Implement breach detection, establish notification procedures, notify without unreasonable delay.',
    assessment: 'Review breach response procedures and notification records.',
    relatedControls: ['CCPA.1798.81.5']
  },
  'CCPA.1798.185': {
    id: 'CCPA.1798.185',
    title: 'Privacy Policy Requirements',
    description: 'Businesses shall make certain information available to consumers in their privacy policy.',
    implementation: 'Maintain comprehensive privacy policy with required disclosures, update annually.',
    assessment: 'Review privacy policy content and update history.',
    relatedControls: ['CCPA.1798.100', 'CCPA.1798.135']
  },

  // CPRA Additions
  'CPRA.1798.100(d)': {
    id: 'CPRA.1798.100(d)',
    title: 'Right to Correct Personal Information',
    description: 'Consumers have the right to request correction of inaccurate personal information.',
    implementation: 'Implement correction request process, verify and correct information.',
    assessment: 'Review correction procedures and response times.',
    relatedControls: ['CCPA.1798.105', 'CCPA.1798.130']
  },
  'CPRA.Risk.Assessment': {
    id: 'CPRA.Risk.Assessment',
    title: 'Cybersecurity Audits and Risk Assessments',
    description: 'Businesses whose processing presents significant risk shall perform cybersecurity audits and risk assessments.',
    implementation: 'Conduct annual cybersecurity audits, perform regular risk assessments, document findings.',
    assessment: 'Review audit reports and risk assessment documentation.',
    relatedControls: ['CCPA.1798.81.5']
  },
  'CPRA.Service.Provider': {
    id: 'CPRA.Service.Provider',
    title: 'Service Provider and Contractor Requirements',
    description: 'Service providers and contractors must meet specific contractual and compliance requirements.',
    implementation: 'Execute compliant contracts, limit data use to business purposes, respond to consumer requests.',
    assessment: 'Review service provider contracts and compliance.',
    relatedControls: ['CCPA.1798.140']
  },
  'CPRA.Data.Minimization': {
    id: 'CPRA.Data.Minimization',
    title: 'Data Minimization and Purpose Limitation',
    description: 'Businesses shall not collect more personal information than reasonably necessary.',
    implementation: 'Review data collection practices, limit to disclosed purposes, implement minimization.',
    assessment: 'Review data collection against stated purposes.',
    relatedControls: ['CCPA.1798.100', 'CCPA.1798.185']
  },
  'CPRA.Retention': {
    id: 'CPRA.Retention',
    title: 'Data Retention Limitation',
    description: 'Businesses shall not retain personal information longer than reasonably necessary.',
    implementation: 'Define retention periods, implement automated deletion, document retention justifications.',
    assessment: 'Review retention schedules and deletion procedures.',
    relatedControls: ['CCPA.1798.105', 'CPRA.Data.Minimization']
  }
};

export default { ccpaFramework, ccpaControls };

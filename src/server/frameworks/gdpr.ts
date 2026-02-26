/**
 * GDPR - General Data Protection Regulation
 * EU data protection framework
 */

import { FrameworkInfo, ControlRequirement, ComplianceFramework } from '../types/framework.js';

export const gdprFramework: FrameworkInfo = {
  id: ComplianceFramework.GDPR,
  name: 'General Data Protection Regulation',
  version: '2016/679',
  description: 'GDPR is a comprehensive data protection regulation that governs the processing of personal data of individuals within the European Union. It establishes principles for data processing, rights for data subjects, and obligations for data controllers and processors.',
  organization: 'European Union',
  total_controls: 72,
  categories: ['Principles of Processing', 'Rights of Data Subject', 'Controller and Processor', 'Transfers of Personal Data', 'Supervisory Authorities', 'Remedies and Penalties'],
  url: 'https://gdpr.eu/'
};

export const gdprControls: Record<string, ControlRequirement> = {
  // Chapter II - Principles
  'Art.5(1)(a)': {
    id: 'Art.5(1)(a)',
    title: 'Lawfulness, Fairness, and Transparency',
    description: 'Personal data shall be processed lawfully, fairly and in a transparent manner in relation to the data subject.',
    implementation: 'Document lawful basis for processing, maintain transparency through privacy notices, ensure fair processing practices.',
    assessment: 'Review lawful basis documentation, privacy notices, and fairness assessments.',
    relatedControls: ['Art.6', 'Art.7', 'Art.12']
  },
  'Art.5(1)(b)': {
    id: 'Art.5(1)(b)',
    title: 'Purpose Limitation',
    description: 'Personal data shall be collected for specified, explicit and legitimate purposes and not further processed in a manner incompatible with those purposes.',
    implementation: 'Define and document processing purposes, conduct compatibility assessments for new uses.',
    assessment: 'Review purpose documentation and compatibility assessments.',
    relatedControls: ['Art.5(1)(a)', 'Art.6(4)']
  },
  'Art.5(1)(c)': {
    id: 'Art.5(1)(c)',
    title: 'Data Minimization',
    description: 'Personal data shall be adequate, relevant and limited to what is necessary in relation to the purposes for which they are processed.',
    implementation: 'Assess data collection against purposes, eliminate unnecessary data collection, periodic data reviews.',
    assessment: 'Review data inventory against stated purposes, evidence of minimization practices.',
    relatedControls: ['Art.5(1)(b)', 'Art.25']
  },
  'Art.5(1)(d)': {
    id: 'Art.5(1)(d)',
    title: 'Accuracy',
    description: 'Personal data shall be accurate and, where necessary, kept up to date.',
    implementation: 'Implement data quality controls, provide mechanisms for data subjects to update data, regular accuracy reviews.',
    assessment: 'Review data quality procedures and correction mechanisms.',
    relatedControls: ['Art.16', 'Art.5(1)(c)']
  },
  'Art.5(1)(e)': {
    id: 'Art.5(1)(e)',
    title: 'Storage Limitation',
    description: 'Personal data shall be kept in a form which permits identification of data subjects for no longer than is necessary.',
    implementation: 'Define retention periods, implement automated deletion, document retention justifications.',
    assessment: 'Review retention schedules and deletion procedures.',
    relatedControls: ['Art.17', 'Art.5(1)(c)']
  },
  'Art.5(1)(f)': {
    id: 'Art.5(1)(f)',
    title: 'Integrity and Confidentiality',
    description: 'Personal data shall be processed in a manner that ensures appropriate security, including protection against unauthorized or unlawful processing and against accidental loss, destruction or damage.',
    implementation: 'Implement technical and organizational security measures, access controls, encryption.',
    assessment: 'Review security measures and control effectiveness.',
    relatedControls: ['Art.32', 'Art.33', 'Art.34']
  },
  'Art.5(2)': {
    id: 'Art.5(2)',
    title: 'Accountability',
    description: 'The controller shall be responsible for, and be able to demonstrate compliance with the principles.',
    implementation: 'Maintain records of processing activities, conduct DPIAs, document compliance measures.',
    assessment: 'Review compliance documentation and accountability evidence.',
    relatedControls: ['Art.24', 'Art.30', 'Art.35']
  },
  'Art.6': {
    id: 'Art.6',
    title: 'Lawfulness of Processing',
    description: 'Processing shall be lawful only if at least one of six conditions applies: consent, contract, legal obligation, vital interests, public task, or legitimate interests.',
    implementation: 'Identify and document lawful basis for each processing activity, conduct LIA for legitimate interests.',
    assessment: 'Review lawful basis documentation for all processing activities.',
    relatedControls: ['Art.5(1)(a)', 'Art.7', 'Art.9']
  },
  'Art.7': {
    id: 'Art.7',
    title: 'Conditions for Consent',
    description: 'Where processing is based on consent, the controller shall be able to demonstrate that the data subject has consented. Consent must be freely given, specific, informed, and unambiguous.',
    implementation: 'Implement consent management, maintain consent records, enable easy withdrawal.',
    assessment: 'Review consent mechanisms, records, and withdrawal processes.',
    relatedControls: ['Art.6', 'Art.8']
  },
  'Art.8': {
    id: 'Art.8',
    title: 'Conditions for Child\'s Consent',
    description: 'For information society services offered directly to a child, processing is lawful where the child is at least 16 years old (or lower age set by Member State).',
    implementation: 'Implement age verification, obtain parental consent where required.',
    assessment: 'Review age verification mechanisms and parental consent processes.',
    relatedControls: ['Art.7']
  },
  'Art.9': {
    id: 'Art.9',
    title: 'Processing of Special Categories of Data',
    description: 'Processing of special category data (racial origin, political opinions, religious beliefs, health data, etc.) is prohibited unless specific conditions are met.',
    implementation: 'Identify special category data, document specific lawful basis, implement additional safeguards.',
    assessment: 'Review special category data processing and safeguards.',
    relatedControls: ['Art.6', 'Art.10']
  },
  'Art.10': {
    id: 'Art.10',
    title: 'Processing of Criminal Conviction Data',
    description: 'Processing of personal data relating to criminal convictions shall only be carried out under the control of official authority or when authorized.',
    implementation: 'Identify criminal data processing, ensure authorized processing, implement safeguards.',
    assessment: 'Review criminal conviction data handling and authorization.',
    relatedControls: ['Art.9']
  },
  
  // Chapter III - Rights of the Data Subject
  'Art.12': {
    id: 'Art.12',
    title: 'Transparent Information and Communication',
    description: 'The controller shall take appropriate measures to provide information in a concise, transparent, intelligible and easily accessible form.',
    implementation: 'Develop clear privacy notices, ensure accessibility, establish communication procedures.',
    assessment: 'Review privacy notices and communication accessibility.',
    relatedControls: ['Art.13', 'Art.14', 'Art.15']
  },
  'Art.13': {
    id: 'Art.13',
    title: 'Information to be Provided When Data Collected from Data Subject',
    description: 'When collecting personal data from the data subject, the controller shall provide specific information at the time of collection.',
    implementation: 'Provide required information at collection points, maintain comprehensive privacy notices.',
    assessment: 'Review collection point information and privacy notices.',
    relatedControls: ['Art.12', 'Art.14']
  },
  'Art.14': {
    id: 'Art.14',
    title: 'Information to be Provided When Data Not Obtained from Data Subject',
    description: 'Where personal data has not been obtained from the data subject, the controller shall provide required information within a reasonable period.',
    implementation: 'Track data sources, provide information within prescribed timeframes.',
    assessment: 'Review indirect collection notices and timing.',
    relatedControls: ['Art.12', 'Art.13']
  },
  'Art.15': {
    id: 'Art.15',
    title: 'Right of Access by the Data Subject',
    description: 'The data subject shall have the right to obtain confirmation and access to their personal data and related information.',
    implementation: 'Implement DSAR process, verify identity, provide data within one month.',
    assessment: 'Review access request procedures and response times.',
    relatedControls: ['Art.12', 'Art.20']
  },
  'Art.16': {
    id: 'Art.16',
    title: 'Right to Rectification',
    description: 'The data subject shall have the right to obtain rectification of inaccurate personal data without undue delay.',
    implementation: 'Implement rectification procedures, update downstream systems, notify recipients.',
    assessment: 'Review rectification procedures and records.',
    relatedControls: ['Art.5(1)(d)', 'Art.19']
  },
  'Art.17': {
    id: 'Art.17',
    title: 'Right to Erasure (Right to be Forgotten)',
    description: 'The data subject shall have the right to obtain erasure of personal data without undue delay in specified circumstances.',
    implementation: 'Implement erasure procedures, assess legal grounds, document erasure actions.',
    assessment: 'Review erasure procedures and documentation.',
    relatedControls: ['Art.5(1)(e)', 'Art.19']
  },
  'Art.18': {
    id: 'Art.18',
    title: 'Right to Restriction of Processing',
    description: 'The data subject shall have the right to obtain restriction of processing in certain circumstances.',
    implementation: 'Implement restriction mechanisms, flag restricted data, limit processing.',
    assessment: 'Review restriction procedures and technical implementation.',
    relatedControls: ['Art.17', 'Art.19']
  },
  'Art.19': {
    id: 'Art.19',
    title: 'Notification Regarding Rectification, Erasure, or Restriction',
    description: 'The controller shall communicate any rectification, erasure, or restriction to each recipient to whom data has been disclosed.',
    implementation: 'Track data recipients, implement notification procedures.',
    assessment: 'Review recipient tracking and notification records.',
    relatedControls: ['Art.16', 'Art.17', 'Art.18']
  },
  'Art.20': {
    id: 'Art.20',
    title: 'Right to Data Portability',
    description: 'The data subject shall have the right to receive their personal data in a structured, commonly used, machine-readable format.',
    implementation: 'Implement data export functionality, provide common format options.',
    assessment: 'Review portability mechanisms and format support.',
    relatedControls: ['Art.15']
  },
  'Art.21': {
    id: 'Art.21',
    title: 'Right to Object',
    description: 'The data subject shall have the right to object to processing based on public interest or legitimate interests, and to direct marketing.',
    implementation: 'Implement objection mechanisms, cease processing where required, document decisions.',
    assessment: 'Review objection procedures and decision records.',
    relatedControls: ['Art.6', 'Art.22']
  },
  'Art.22': {
    id: 'Art.22',
    title: 'Automated Individual Decision-Making, Including Profiling',
    description: 'The data subject shall have the right not to be subject to a decision based solely on automated processing, including profiling.',
    implementation: 'Identify automated decisions, implement human review, provide safeguards and information.',
    assessment: 'Review automated decision processes and safeguards.',
    relatedControls: ['Art.21']
  },

  // Chapter IV - Controller and Processor
  'Art.24': {
    id: 'Art.24',
    title: 'Responsibility of the Controller',
    description: 'The controller shall implement appropriate technical and organizational measures to ensure and demonstrate compliance.',
    implementation: 'Establish data protection framework, implement policies, conduct regular reviews.',
    assessment: 'Review governance framework and compliance evidence.',
    relatedControls: ['Art.5(2)', 'Art.25', 'Art.32']
  },
  'Art.25': {
    id: 'Art.25',
    title: 'Data Protection by Design and by Default',
    description: 'The controller shall implement data protection principles by design and by default in processing operations.',
    implementation: 'Integrate privacy into development, default to privacy-protective settings, minimize data.',
    assessment: 'Review design processes and default configurations.',
    relatedControls: ['Art.24', 'Art.35']
  },
  'Art.26': {
    id: 'Art.26',
    title: 'Joint Controllers',
    description: 'Where two or more controllers jointly determine purposes and means, they shall determine their respective responsibilities.',
    implementation: 'Identify joint controller relationships, document responsibilities, inform data subjects.',
    assessment: 'Review joint controller arrangements and agreements.',
    relatedControls: ['Art.24']
  },
  'Art.27': {
    id: 'Art.27',
    title: 'Representatives of Controllers Not Established in the Union',
    description: 'Controllers not established in the Union shall designate a representative in the Union.',
    implementation: 'Designate EU representative where required, document appointment.',
    assessment: 'Review representative appointment and communication.',
    relatedControls: ['Art.3']
  },
  'Art.28': {
    id: 'Art.28',
    title: 'Processor',
    description: 'Processing by a processor shall be governed by a contract that stipulates the processor\'s obligations.',
    implementation: 'Execute DPAs with all processors, ensure required terms, monitor compliance.',
    assessment: 'Review processor contracts and compliance monitoring.',
    relatedControls: ['Art.29', 'Art.32']
  },
  'Art.29': {
    id: 'Art.29',
    title: 'Processing Under the Authority of Controller or Processor',
    description: 'Processors and their employees shall only process on documented instructions from the controller.',
    implementation: 'Provide documented instructions, ensure processor understanding and compliance.',
    assessment: 'Review processing instructions and adherence.',
    relatedControls: ['Art.28']
  },
  'Art.30': {
    id: 'Art.30',
    title: 'Records of Processing Activities',
    description: 'Controllers and processors shall maintain records of processing activities under their responsibility.',
    implementation: 'Maintain comprehensive ROPA, update regularly, make available to supervisory authority.',
    assessment: 'Review ROPA completeness and currency.',
    relatedControls: ['Art.5(2)', 'Art.24']
  },
  'Art.31': {
    id: 'Art.31',
    title: 'Cooperation with the Supervisory Authority',
    description: 'Controllers, processors, and their representatives shall cooperate with supervisory authority.',
    implementation: 'Establish cooperation procedures, respond to authority requests.',
    assessment: 'Review cooperation procedures and response records.',
    relatedControls: ['Art.30', 'Art.33']
  },
  'Art.32': {
    id: 'Art.32',
    title: 'Security of Processing',
    description: 'The controller and processor shall implement appropriate technical and organizational measures to ensure security.',
    implementation: 'Conduct risk assessments, implement security controls, regular testing, ensure confidentiality, integrity, availability, resilience.',
    assessment: 'Review security measures and risk management.',
    relatedControls: ['Art.5(1)(f)', 'Art.33', 'Art.34']
  },
  'Art.33': {
    id: 'Art.33',
    title: 'Notification of Personal Data Breach to Supervisory Authority',
    description: 'In case of a personal data breach, the controller shall notify the supervisory authority within 72 hours.',
    implementation: 'Implement breach detection, establish notification procedures, document breaches.',
    assessment: 'Review breach procedures and notification records.',
    relatedControls: ['Art.32', 'Art.34']
  },
  'Art.34': {
    id: 'Art.34',
    title: 'Communication of Personal Data Breach to Data Subject',
    description: 'When a breach is likely to result in high risk to rights and freedoms, the controller shall communicate to the data subject.',
    implementation: 'Assess risk levels, develop communication templates, maintain contact information.',
    assessment: 'Review breach communication procedures and records.',
    relatedControls: ['Art.33']
  },
  'Art.35': {
    id: 'Art.35',
    title: 'Data Protection Impact Assessment',
    description: 'Where processing is likely to result in high risk, the controller shall carry out a DPIA prior to processing.',
    implementation: 'Identify high-risk processing, conduct DPIAs, implement mitigating measures.',
    assessment: 'Review DPIA procedures and completed assessments.',
    relatedControls: ['Art.25', 'Art.36']
  },
  'Art.36': {
    id: 'Art.36',
    title: 'Prior Consultation',
    description: 'The controller shall consult the supervisory authority prior to processing if DPIA indicates high risk.',
    implementation: 'Trigger consultation when required, document interactions with authority.',
    assessment: 'Review consultation procedures and records.',
    relatedControls: ['Art.35']
  },
  'Art.37': {
    id: 'Art.37',
    title: 'Designation of Data Protection Officer',
    description: 'The controller and processor shall designate a DPO in specified circumstances.',
    implementation: 'Assess DPO requirement, designate qualified individual, ensure independence.',
    assessment: 'Review DPO designation and qualifications.',
    relatedControls: ['Art.38', 'Art.39']
  },
  'Art.38': {
    id: 'Art.38',
    title: 'Position of the Data Protection Officer',
    description: 'The controller and processor shall ensure the DPO is involved in all data protection matters and has appropriate independence.',
    implementation: 'Involve DPO in relevant matters, provide resources, ensure reporting to highest management.',
    assessment: 'Review DPO involvement and independence.',
    relatedControls: ['Art.37', 'Art.39']
  },
  'Art.39': {
    id: 'Art.39',
    title: 'Tasks of the Data Protection Officer',
    description: 'The DPO shall inform and advise, monitor compliance, provide advice on DPIAs, and cooperate with the supervisory authority.',
    implementation: 'Define DPO responsibilities, document activities, establish reporting.',
    assessment: 'Review DPO task fulfillment and reporting.',
    relatedControls: ['Art.37', 'Art.38']
  },

  // Chapter V - Transfers of Personal Data
  'Art.44': {
    id: 'Art.44',
    title: 'General Principle for Transfers',
    description: 'Any transfer of personal data to a third country shall only take place if conditions are complied with.',
    implementation: 'Identify international transfers, assess transfer mechanisms, implement appropriate safeguards.',
    assessment: 'Review transfer inventory and mechanisms.',
    relatedControls: ['Art.45', 'Art.46', 'Art.49']
  },
  'Art.45': {
    id: 'Art.45',
    title: 'Transfers on the Basis of an Adequacy Decision',
    description: 'Transfer may take place to a third country with an Commission adequacy decision.',
    implementation: 'Identify adequacy decisions, document reliance on adequacy.',
    assessment: 'Review adequacy-based transfers.',
    relatedControls: ['Art.44', 'Art.46']
  },
  'Art.46': {
    id: 'Art.46',
    title: 'Transfers Subject to Appropriate Safeguards',
    description: 'In the absence of an adequacy decision, transfers may occur subject to appropriate safeguards.',
    implementation: 'Implement SCCs, BCRs, or other approved safeguards; conduct transfer impact assessments.',
    assessment: 'Review safeguards and supplementary measures.',
    relatedControls: ['Art.44', 'Art.45', 'Art.47']
  },
  'Art.47': {
    id: 'Art.47',
    title: 'Binding Corporate Rules',
    description: 'BCRs may be approved for transfers within a corporate group.',
    implementation: 'Develop and obtain approval for BCRs, implement across group.',
    assessment: 'Review BCR approval and implementation.',
    relatedControls: ['Art.46']
  },
  'Art.49': {
    id: 'Art.49',
    title: 'Derogations for Specific Situations',
    description: 'In absence of adequacy decision or appropriate safeguards, transfers may occur under specific derogations.',
    implementation: 'Document reliance on derogations, ensure conditions are met, limit scope.',
    assessment: 'Review derogation-based transfers and justification.',
    relatedControls: ['Art.44', 'Art.46']
  }
};

export default { gdprFramework, gdprControls };

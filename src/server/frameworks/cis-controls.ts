/**
 * CIS Controls - Center for Internet Security Critical Security Controls
 * Version 8 Framework
 */

import { FrameworkInfo, ControlRequirement, ComplianceFramework } from '../types/framework.js';

export const cisControlsFramework: FrameworkInfo = {
  id: ComplianceFramework.CIS_CONTROLS,
  name: 'CIS Critical Security Controls',
  version: 'Version 8',
  description: 'The CIS Controls are a prioritized set of actions that form a defense-in-depth set of best practices to mitigate the most common attacks against systems and networks. They are organized into 18 control families with Implementation Groups (IGs) for different organizational capabilities.',
  organization: 'Center for Internet Security (CIS)',
  total_controls: 153,
  categories: ['Basic Hygiene (IG1)', 'Foundational (IG2)', 'Organizational (IG3)'],
  url: 'https://www.cisecurity.org/controls'
};

export const cisControlsControls: Record<string, ControlRequirement> = {
  // Control 1: Inventory and Control of Enterprise Assets
  'CIS.1': {
    id: 'CIS.1',
    title: 'Inventory and Control of Enterprise Assets',
    description: 'Actively manage (inventory, track, and correct) all enterprise assets connected to the infrastructure physically, virtually, remotely, and those within cloud environments.',
    implementation: 'Establish asset inventory process, deploy discovery tools, maintain accurate asset database.',
    assessment: 'Review asset inventory completeness and accuracy.',
    relatedControls: ['CIS.2', 'CIS.12']
  },
  'CIS.1.1': {
    id: 'CIS.1.1',
    title: 'Establish and Maintain Detailed Enterprise Asset Inventory',
    description: 'Establish and maintain an accurate, detailed, and up-to-date inventory of all enterprise assets with the potential to store or process data.',
    implementation: 'Deploy asset management system, scan network weekly, include cloud and remote assets.',
    assessment: 'Review asset inventory system and update frequency.',
    relatedControls: ['CIS.1.2', 'CIS.1.3']
  },
  'CIS.1.2': {
    id: 'CIS.1.2',
    title: 'Address Unauthorized Assets',
    description: 'Ensure that a process exists to address unauthorized assets on a weekly basis.',
    implementation: 'Define unauthorized asset handling process, quarantine or remove unauthorized devices.',
    assessment: 'Review unauthorized asset detection and remediation records.',
    relatedControls: ['CIS.1.1']
  },
  'CIS.1.3': {
    id: 'CIS.1.3',
    title: 'Utilize an Active Discovery Tool',
    description: 'Utilize an active discovery tool to identify assets connected to the enterprise\'s network.',
    implementation: 'Deploy network scanning tools, schedule regular discovery scans.',
    assessment: 'Review discovery tool configuration and scan results.',
    relatedControls: ['CIS.1.1', 'CIS.12.1']
  },
  'CIS.1.4': {
    id: 'CIS.1.4',
    title: 'Use Dynamic Host Configuration Protocol (DHCP) Logging',
    description: 'Use DHCP logging on all DHCP servers or Internet Protocol (IP) address management tools to update the enterprise\'s asset inventory.',
    implementation: 'Enable DHCP logging, integrate with asset inventory.',
    assessment: 'Review DHCP logging configuration and integration.',
    relatedControls: ['CIS.1.1']
  },
  'CIS.1.5': {
    id: 'CIS.1.5',
    title: 'Use a Passive Asset Discovery Tool',
    description: 'Use a passive discovery tool to identify assets connected to the enterprise\'s network.',
    implementation: 'Deploy passive network monitoring, analyze traffic for asset identification.',
    assessment: 'Review passive discovery tool deployment and effectiveness.',
    relatedControls: ['CIS.1.3', 'CIS.13.1']
  },

  // Control 2: Inventory and Control of Software Assets
  'CIS.2': {
    id: 'CIS.2',
    title: 'Inventory and Control of Software Assets',
    description: 'Actively manage (inventory, track, and correct) all software on the network so that only authorized software is installed and can execute.',
    implementation: 'Maintain software inventory, implement application whitelisting, remove unauthorized software.',
    assessment: 'Review software inventory and authorization controls.',
    relatedControls: ['CIS.1', 'CIS.7']
  },
  'CIS.2.1': {
    id: 'CIS.2.1',
    title: 'Establish and Maintain a Software Inventory',
    description: 'Establish and maintain a detailed inventory of all licensed software installed on enterprise assets.',
    implementation: 'Deploy software inventory tools, track license compliance, update regularly.',
    assessment: 'Review software inventory completeness and accuracy.',
    relatedControls: ['CIS.2.2', 'CIS.2.3']
  },
  'CIS.2.2': {
    id: 'CIS.2.2',
    title: 'Ensure Authorized Software is Currently Supported',
    description: 'Ensure that only currently supported software is designated as authorized in the software inventory.',
    implementation: 'Track software support status, plan for upgrades, remove unsupported software.',
    assessment: 'Review software support status and upgrade planning.',
    relatedControls: ['CIS.2.1', 'CIS.7.1']
  },
  'CIS.2.3': {
    id: 'CIS.2.3',
    title: 'Address Unauthorized Software',
    description: 'Ensure that unauthorized software is either removed or the inventory is updated in a timely manner.',
    implementation: 'Define process for unauthorized software, remove or authorize within timeframe.',
    assessment: 'Review unauthorized software handling and remediation.',
    relatedControls: ['CIS.2.1']
  },
  'CIS.2.4': {
    id: 'CIS.2.4',
    title: 'Utilize Automated Software Inventory Tools',
    description: 'Utilize automated software inventory tools to detect and inventory all software.',
    implementation: 'Deploy automated software discovery, integrate with CMDB.',
    assessment: 'Review automated inventory tool deployment and coverage.',
    relatedControls: ['CIS.2.1']
  },
  'CIS.2.5': {
    id: 'CIS.2.5',
    title: 'Allowlist Authorized Software',
    description: 'Use application allowlisting to ensure that only authorized software can execute.',
    implementation: 'Implement application whitelisting, maintain authorized software list.',
    assessment: 'Review application control configuration and effectiveness.',
    relatedControls: ['CIS.2.6', 'CIS.2.7']
  },
  'CIS.2.6': {
    id: 'CIS.2.6',
    title: 'Allowlist Authorized Libraries',
    description: 'Use application allowlisting controls to ensure only authorized software libraries can load.',
    implementation: 'Configure library whitelisting, monitor for unauthorized libraries.',
    assessment: 'Review library control configuration.',
    relatedControls: ['CIS.2.5']
  },
  'CIS.2.7': {
    id: 'CIS.2.7',
    title: 'Allowlist Authorized Scripts',
    description: 'Use application allowlisting controls to ensure only authorized scripts can execute.',
    implementation: 'Configure script execution policies, whitelist authorized scripts.',
    assessment: 'Review script execution controls.',
    relatedControls: ['CIS.2.5']
  },

  // Control 3: Data Protection
  'CIS.3': {
    id: 'CIS.3',
    title: 'Data Protection',
    description: 'Develop processes and technical controls to identify, classify, securely handle, retain, and dispose of data.',
    implementation: 'Implement data classification, encryption, DLP, and secure data handling procedures.',
    assessment: 'Review data protection controls and effectiveness.',
    relatedControls: ['CIS.11', 'CIS.14']
  },
  'CIS.3.1': {
    id: 'CIS.3.1',
    title: 'Establish and Maintain a Data Management Process',
    description: 'Establish and maintain a data management process that addresses data sensitivity, data owner, handling, retention, and disposal.',
    implementation: 'Define data management policies, assign data owners, implement handling procedures.',
    assessment: 'Review data management process documentation.',
    relatedControls: ['CIS.3.2', 'CIS.3.3']
  },
  'CIS.3.2': {
    id: 'CIS.3.2',
    title: 'Establish and Maintain a Data Inventory',
    description: 'Establish and maintain a data inventory, at a minimum, for sensitive data.',
    implementation: 'Identify and document sensitive data locations, maintain data inventory.',
    assessment: 'Review data inventory completeness.',
    relatedControls: ['CIS.3.1']
  },
  'CIS.3.3': {
    id: 'CIS.3.3',
    title: 'Configure Data Access Control Lists',
    description: 'Configure data access control lists based on a user\'s need to know.',
    implementation: 'Implement role-based access, restrict data access to authorized users.',
    assessment: 'Review data access configurations.',
    relatedControls: ['CIS.3.1', 'CIS.6']
  },
  'CIS.3.4': {
    id: 'CIS.3.4',
    title: 'Enforce Data Retention',
    description: 'Retain data according to the enterprise\'s data management process.',
    implementation: 'Implement retention schedules, automate retention enforcement.',
    assessment: 'Review retention schedule implementation.',
    relatedControls: ['CIS.3.1']
  },
  'CIS.3.5': {
    id: 'CIS.3.5',
    title: 'Securely Dispose of Data',
    description: 'Securely dispose of data as outlined in the enterprise\'s data management process.',
    implementation: 'Implement secure disposal procedures, verify destruction.',
    assessment: 'Review disposal procedures and verification records.',
    relatedControls: ['CIS.3.1']
  },
  'CIS.3.6': {
    id: 'CIS.3.6',
    title: 'Encrypt Data on End-User Devices',
    description: 'Encrypt data on end-user devices containing sensitive data.',
    implementation: 'Deploy full disk encryption, manage encryption keys.',
    assessment: 'Review endpoint encryption deployment.',
    relatedControls: ['CIS.3.9']
  },
  'CIS.3.9': {
    id: 'CIS.3.9',
    title: 'Encrypt Data on USB Storage Devices',
    description: 'Enforce encryption on all USB storage devices.',
    implementation: 'Configure endpoint protection to enforce USB encryption.',
    assessment: 'Review USB encryption enforcement.',
    relatedControls: ['CIS.3.6']
  },
  'CIS.3.10': {
    id: 'CIS.3.10',
    title: 'Encrypt Sensitive Data in Transit',
    description: 'Encrypt sensitive data in transit.',
    implementation: 'Implement TLS for all sensitive data transmission.',
    assessment: 'Review encryption in transit configurations.',
    relatedControls: ['CIS.3.11']
  },
  'CIS.3.11': {
    id: 'CIS.3.11',
    title: 'Encrypt Sensitive Data at Rest',
    description: 'Encrypt sensitive data at rest on servers, applications, and databases.',
    implementation: 'Implement database encryption, file-level encryption for sensitive data.',
    assessment: 'Review encryption at rest implementations.',
    relatedControls: ['CIS.3.10']
  },
  'CIS.3.12': {
    id: 'CIS.3.12',
    title: 'Segment Data Processing and Storage Based on Sensitivity',
    description: 'Segment data processing and storage based on the sensitivity of the data.',
    implementation: 'Implement network segmentation, isolate sensitive data environments.',
    assessment: 'Review data segmentation implementation.',
    relatedControls: ['CIS.12.2']
  },
  'CIS.3.13': {
    id: 'CIS.3.13',
    title: 'Deploy a Data Loss Prevention Solution',
    description: 'Implement an automated tool, such as a host-based DLP tool to identify all sensitive data.',
    implementation: 'Deploy DLP solution, configure policies for sensitive data detection.',
    assessment: 'Review DLP deployment and policy configuration.',
    relatedControls: ['CIS.3.14']
  },
  'CIS.3.14': {
    id: 'CIS.3.14',
    title: 'Log Sensitive Data Access',
    description: 'Log sensitive data access, including modification and disposal.',
    implementation: 'Configure audit logging for sensitive data access.',
    assessment: 'Review sensitive data access logging.',
    relatedControls: ['CIS.8']
  },

  // Control 4: Secure Configuration of Enterprise Assets and Software
  'CIS.4': {
    id: 'CIS.4',
    title: 'Secure Configuration of Enterprise Assets and Software',
    description: 'Establish and maintain the secure configuration of enterprise assets and software.',
    implementation: 'Develop secure baselines, implement configuration management, audit compliance.',
    assessment: 'Review secure configuration standards and compliance.',
    relatedControls: ['CIS.1', 'CIS.2']
  },
  'CIS.4.1': {
    id: 'CIS.4.1',
    title: 'Establish and Maintain a Secure Configuration Process',
    description: 'Establish and maintain a secure configuration process for enterprise assets and software.',
    implementation: 'Define secure configuration standards, implement change control.',
    assessment: 'Review secure configuration process documentation.',
    relatedControls: ['CIS.4.2']
  },
  'CIS.4.2': {
    id: 'CIS.4.2',
    title: 'Establish and Maintain a Secure Configuration Process for Network Infrastructure',
    description: 'Establish and maintain a secure configuration process for network devices.',
    implementation: 'Define network device baselines, implement configuration templates.',
    assessment: 'Review network configuration standards.',
    relatedControls: ['CIS.4.1', 'CIS.12']
  },
  'CIS.4.3': {
    id: 'CIS.4.3',
    title: 'Configure Automatic Session Locking',
    description: 'Configure automatic session locking on enterprise assets after a defined period of inactivity.',
    implementation: 'Configure screensaver locks, session timeouts.',
    assessment: 'Review session lock configurations.',
    relatedControls: ['CIS.4.1']
  },
  'CIS.4.4': {
    id: 'CIS.4.4',
    title: 'Implement and Manage a Firewall on Servers',
    description: 'Implement and manage a host-based firewall or port-filtering tool on servers.',
    implementation: 'Deploy host-based firewalls, configure allow rules.',
    assessment: 'Review server firewall configurations.',
    relatedControls: ['CIS.4.5', 'CIS.13']
  },
  'CIS.4.5': {
    id: 'CIS.4.5',
    title: 'Implement and Manage a Firewall on End-User Devices',
    description: 'Implement and manage a host-based firewall on end-user devices.',
    implementation: 'Enable endpoint firewalls, configure policies.',
    assessment: 'Review endpoint firewall configurations.',
    relatedControls: ['CIS.4.4']
  },
  'CIS.4.6': {
    id: 'CIS.4.6',
    title: 'Securely Manage Enterprise Assets and Software',
    description: 'Securely manage enterprise assets and software through a secure network infrastructure.',
    implementation: 'Use secure management protocols, encrypt management traffic.',
    assessment: 'Review management infrastructure security.',
    relatedControls: ['CIS.4.7']
  },
  'CIS.4.7': {
    id: 'CIS.4.7',
    title: 'Manage Default Accounts on Enterprise Assets and Software',
    description: 'Manage default accounts on enterprise assets and software.',
    implementation: 'Change default credentials, disable unnecessary default accounts.',
    assessment: 'Review default account management.',
    relatedControls: ['CIS.5', 'CIS.6']
  },

  // Control 5: Account Management
  'CIS.5': {
    id: 'CIS.5',
    title: 'Account Management',
    description: 'Use processes and tools to assign and manage authorization to credentials for user accounts, privileged accounts, service accounts, etc.',
    implementation: 'Implement identity management, account lifecycle, privileged access management.',
    assessment: 'Review account management processes and controls.',
    relatedControls: ['CIS.6', 'CIS.4.7']
  },
  'CIS.5.1': {
    id: 'CIS.5.1',
    title: 'Establish and Maintain an Inventory of Accounts',
    description: 'Establish and maintain an inventory of all accounts managed in the enterprise.',
    implementation: 'Maintain account inventory, track account types, review regularly.',
    assessment: 'Review account inventory completeness.',
    relatedControls: ['CIS.5.2', 'CIS.5.3']
  },
  'CIS.5.2': {
    id: 'CIS.5.2',
    title: 'Use Unique Passwords',
    description: 'Use unique passwords for all enterprise assets.',
    implementation: 'Enforce unique password policy, implement password manager.',
    assessment: 'Review password uniqueness enforcement.',
    relatedControls: ['CIS.5.1']
  },
  'CIS.5.3': {
    id: 'CIS.5.3',
    title: 'Disable Dormant Accounts',
    description: 'Delete or disable any dormant accounts after a period of 45 days of inactivity.',
    implementation: 'Implement dormant account detection, automate disabling.',
    assessment: 'Review dormant account handling.',
    relatedControls: ['CIS.5.1']
  },
  'CIS.5.4': {
    id: 'CIS.5.4',
    title: 'Restrict Administrator Privileges to Dedicated Administrator Accounts',
    description: 'Restrict administrator privileges to dedicated administrator accounts on enterprise assets.',
    implementation: 'Separate admin and user accounts, implement PAM.',
    assessment: 'Review admin account separation.',
    relatedControls: ['CIS.5.5', 'CIS.5.6']
  },
  'CIS.5.5': {
    id: 'CIS.5.5',
    title: 'Establish and Maintain an Inventory of Service Accounts',
    description: 'Establish and maintain an inventory of service accounts.',
    implementation: 'Document service accounts, track usage, review permissions.',
    assessment: 'Review service account inventory.',
    relatedControls: ['CIS.5.4']
  },
  'CIS.5.6': {
    id: 'CIS.5.6',
    title: 'Centralize Account Management',
    description: 'Centralize account management through a directory or identity service.',
    implementation: 'Implement centralized identity provider, integrate systems.',
    assessment: 'Review centralized identity management.',
    relatedControls: ['CIS.5.4']
  },

  // Control 6: Access Control Management
  'CIS.6': {
    id: 'CIS.6',
    title: 'Access Control Management',
    description: 'Use processes and tools to create, assign, manage, and revoke access credentials and privileges.',
    implementation: 'Implement RBAC, least privilege, access reviews, MFA.',
    assessment: 'Review access control processes and implementations.',
    relatedControls: ['CIS.5', 'CIS.3.3']
  },
  'CIS.6.1': {
    id: 'CIS.6.1',
    title: 'Establish an Access Granting Process',
    description: 'Establish and follow a process to grant access to enterprise assets and software.',
    implementation: 'Define access request and approval workflow.',
    assessment: 'Review access granting process.',
    relatedControls: ['CIS.6.2']
  },
  'CIS.6.2': {
    id: 'CIS.6.2',
    title: 'Establish an Access Revoking Process',
    description: 'Establish and follow a process to revoke access to enterprise assets.',
    implementation: 'Define access revocation workflow, integrate with HR processes.',
    assessment: 'Review access revocation process.',
    relatedControls: ['CIS.6.1']
  },
  'CIS.6.3': {
    id: 'CIS.6.3',
    title: 'Require MFA for Externally-Exposed Applications',
    description: 'Require MFA for all externally-exposed enterprise or third-party applications.',
    implementation: 'Deploy MFA for external-facing applications.',
    assessment: 'Review MFA deployment for external applications.',
    relatedControls: ['CIS.6.4', 'CIS.6.5']
  },
  'CIS.6.4': {
    id: 'CIS.6.4',
    title: 'Require MFA for Remote Network Access',
    description: 'Require MFA for remote network access.',
    implementation: 'Implement MFA for VPN and remote access.',
    assessment: 'Review MFA for remote access.',
    relatedControls: ['CIS.6.3']
  },
  'CIS.6.5': {
    id: 'CIS.6.5',
    title: 'Require MFA for Administrative Access',
    description: 'Require MFA for all administrative access accounts.',
    implementation: 'Enforce MFA for all privileged accounts.',
    assessment: 'Review MFA for administrative access.',
    relatedControls: ['CIS.6.3', 'CIS.5.4']
  },
  'CIS.6.6': {
    id: 'CIS.6.6',
    title: 'Establish and Maintain an Inventory of Authentication and Authorization Systems',
    description: 'Establish and maintain an inventory of the enterprise\'s authentication and authorization systems.',
    implementation: 'Document all authentication systems, track configurations.',
    assessment: 'Review authentication system inventory.',
    relatedControls: ['CIS.5.6']
  },
  'CIS.6.7': {
    id: 'CIS.6.7',
    title: 'Centralize Access Control',
    description: 'Centralize access control for all enterprise assets through a directory service or SSO provider.',
    implementation: 'Implement SSO, integrate with identity provider.',
    assessment: 'Review centralized access control.',
    relatedControls: ['CIS.5.6', 'CIS.6.6']
  },
  'CIS.6.8': {
    id: 'CIS.6.8',
    title: 'Define and Maintain Role-Based Access Control',
    description: 'Define and maintain role-based access control to determine and document asset access.',
    implementation: 'Define roles and permissions, implement RBAC.',
    assessment: 'Review RBAC implementation.',
    relatedControls: ['CIS.6.1']
  },

  // Control 7: Continuous Vulnerability Management
  'CIS.7': {
    id: 'CIS.7',
    title: 'Continuous Vulnerability Management',
    description: 'Continuously acquire, assess, and take action on new information to identify vulnerabilities, remediate, and minimize the window of opportunity for attackers.',
    implementation: 'Implement vulnerability scanning, prioritize remediation, track metrics.',
    assessment: 'Review vulnerability management program.',
    relatedControls: ['CIS.2', 'CIS.4']
  },
  'CIS.7.1': {
    id: 'CIS.7.1',
    title: 'Establish and Maintain a Vulnerability Management Process',
    description: 'Establish and maintain a documented vulnerability management process for enterprise assets.',
    implementation: 'Define vulnerability management process, assign responsibilities.',
    assessment: 'Review vulnerability management documentation.',
    relatedControls: ['CIS.7.2', 'CIS.7.3']
  },
  'CIS.7.2': {
    id: 'CIS.7.2',
    title: 'Establish and Maintain a Remediation Process',
    description: 'Establish and maintain a risk-based remediation strategy documented in a remediation process.',
    implementation: 'Define remediation SLAs, prioritization criteria, tracking process.',
    assessment: 'Review remediation process and SLAs.',
    relatedControls: ['CIS.7.1']
  },
  'CIS.7.3': {
    id: 'CIS.7.3',
    title: 'Perform Automated Operating System Patch Management',
    description: 'Perform operating system updates on enterprise assets through automated patch management.',
    implementation: 'Deploy automated patching, schedule updates.',
    assessment: 'Review patch management automation.',
    relatedControls: ['CIS.7.4']
  },
  'CIS.7.4': {
    id: 'CIS.7.4',
    title: 'Perform Automated Application Patch Management',
    description: 'Perform application updates on enterprise assets through automated patch management.',
    implementation: 'Automate application updates, manage third-party patches.',
    assessment: 'Review application patch management.',
    relatedControls: ['CIS.7.3']
  },
  'CIS.7.5': {
    id: 'CIS.7.5',
    title: 'Perform Automated Vulnerability Scans of Internal Enterprise Assets',
    description: 'Perform automated vulnerability scans of internal enterprise assets on a quarterly basis.',
    implementation: 'Deploy vulnerability scanner, schedule internal scans.',
    assessment: 'Review internal scan schedule and coverage.',
    relatedControls: ['CIS.7.6', 'CIS.7.7']
  },
  'CIS.7.6': {
    id: 'CIS.7.6',
    title: 'Perform Automated Vulnerability Scans of Externally-Exposed Enterprise Assets',
    description: 'Perform automated vulnerability scans of externally-exposed enterprise assets using a SCAP-compliant tool.',
    implementation: 'Schedule external vulnerability scans, use authenticated scanning.',
    assessment: 'Review external scan results and schedule.',
    relatedControls: ['CIS.7.5']
  },
  'CIS.7.7': {
    id: 'CIS.7.7',
    title: 'Remediate Detected Vulnerabilities',
    description: 'Remediate detected vulnerabilities in software through processes and tooling on a monthly, or more frequent, basis.',
    implementation: 'Track remediation, meet SLAs, document exceptions.',
    assessment: 'Review remediation metrics and exceptions.',
    relatedControls: ['CIS.7.2']
  },

  // Control 8: Audit Log Management
  'CIS.8': {
    id: 'CIS.8',
    title: 'Audit Log Management',
    description: 'Collect, alert, review, and retain audit logs of events that could help detect, understand, or recover from an attack.',
    implementation: 'Implement centralized logging, SIEM, log retention, alerting.',
    assessment: 'Review audit logging program.',
    relatedControls: ['CIS.13', 'CIS.17']
  },
  'CIS.8.1': {
    id: 'CIS.8.1',
    title: 'Establish and Maintain an Audit Log Management Process',
    description: 'Establish and maintain an audit log management process that defines the enterprise\'s logging requirements.',
    implementation: 'Define logging standards, retention requirements, review procedures.',
    assessment: 'Review audit log management documentation.',
    relatedControls: ['CIS.8.2', 'CIS.8.3']
  },
  'CIS.8.2': {
    id: 'CIS.8.2',
    title: 'Collect Audit Logs',
    description: 'Collect audit logs from enterprise assets.',
    implementation: 'Configure logging on all assets, forward to central repository.',
    assessment: 'Review log collection coverage.',
    relatedControls: ['CIS.8.1', 'CIS.8.3']
  },
  'CIS.8.3': {
    id: 'CIS.8.3',
    title: 'Ensure Adequate Audit Log Storage',
    description: 'Ensure that logging destinations maintain adequate storage to comply with the enterprise\'s audit log management process.',
    implementation: 'Size log storage appropriately, monitor capacity, archive as needed.',
    assessment: 'Review log storage capacity and retention.',
    relatedControls: ['CIS.8.1']
  },
  'CIS.8.5': {
    id: 'CIS.8.5',
    title: 'Collect Detailed Audit Logs',
    description: 'Configure detailed audit logging for enterprise assets containing sensitive data.',
    implementation: 'Enable detailed logging for sensitive systems, capture user activity.',
    assessment: 'Review detailed logging configuration.',
    relatedControls: ['CIS.8.2', 'CIS.3.14']
  },
  'CIS.8.9': {
    id: 'CIS.8.9',
    title: 'Centralize Audit Logs',
    description: 'Centralize, to the extent possible, audit log collection and retention across enterprise assets.',
    implementation: 'Deploy SIEM, configure log forwarding, ensure secure transport.',
    assessment: 'Review centralized logging infrastructure.',
    relatedControls: ['CIS.8.2', 'CIS.8.11']
  },
  'CIS.8.11': {
    id: 'CIS.8.11',
    title: 'Conduct Audit Log Reviews',
    description: 'Conduct reviews of audit logs to detect anomalies or abnormal events.',
    implementation: 'Establish log review procedures, use automated analysis.',
    assessment: 'Review log analysis processes and findings.',
    relatedControls: ['CIS.8.9', 'CIS.17']
  },

  // Control 9: Email and Web Browser Protections (abbreviated)
  'CIS.9': {
    id: 'CIS.9',
    title: 'Email and Web Browser Protections',
    description: 'Improve protections and detections of threats from email and web vectors.',
    implementation: 'Implement email security, web filtering, browser hardening.',
    assessment: 'Review email and web protection controls.',
    relatedControls: ['CIS.10', 'CIS.13']
  },

  // Control 10: Malware Defenses (abbreviated)
  'CIS.10': {
    id: 'CIS.10',
    title: 'Malware Defenses',
    description: 'Prevent or control the installation, spread, and execution of malicious applications, code, or scripts.',
    implementation: 'Deploy anti-malware, endpoint detection and response (EDR).',
    assessment: 'Review malware defense deployment and effectiveness.',
    relatedControls: ['CIS.9', 'CIS.13']
  },

  // Control 11: Data Recovery (abbreviated)
  'CIS.11': {
    id: 'CIS.11',
    title: 'Data Recovery',
    description: 'Establish and maintain data recovery practices sufficient to restore in-scope enterprise assets to a pre-incident and trusted state.',
    implementation: 'Implement backup solutions, test recovery, maintain offline backups.',
    assessment: 'Review backup and recovery program.',
    relatedControls: ['CIS.3', 'CIS.17']
  },

  // Control 12: Network Infrastructure Management (abbreviated)
  'CIS.12': {
    id: 'CIS.12',
    title: 'Network Infrastructure Management',
    description: 'Establish and maintain the secure configuration and management of network infrastructure.',
    implementation: 'Implement network segmentation, secure management, configuration standards.',
    assessment: 'Review network infrastructure security.',
    relatedControls: ['CIS.1', 'CIS.4', 'CIS.13']
  },

  // Control 13: Network Monitoring and Defense (abbreviated)
  'CIS.13': {
    id: 'CIS.13',
    title: 'Network Monitoring and Defense',
    description: 'Operate processes and tooling to establish and maintain comprehensive network monitoring and defense.',
    implementation: 'Deploy IDS/IPS, network monitoring, traffic analysis.',
    assessment: 'Review network monitoring and defense capabilities.',
    relatedControls: ['CIS.8', 'CIS.12', 'CIS.17']
  },

  // Control 14: Security Awareness and Skills Training (abbreviated)
  'CIS.14': {
    id: 'CIS.14',
    title: 'Security Awareness and Skills Training',
    description: 'Establish and maintain a security awareness program to influence behavior among the workforce to be security conscious.',
    implementation: 'Develop training program, deliver regular training, conduct phishing simulations.',
    assessment: 'Review security awareness program effectiveness.',
    relatedControls: ['CIS.3', 'CIS.9']
  },

  // Control 15: Service Provider Management (abbreviated)
  'CIS.15': {
    id: 'CIS.15',
    title: 'Service Provider Management',
    description: 'Develop a process to evaluate service providers who hold sensitive data or are responsible for platform or service.',
    implementation: 'Implement vendor management program, conduct assessments, maintain contracts.',
    assessment: 'Review service provider management program.',
    relatedControls: ['CIS.3', 'CIS.17']
  },

  // Control 16: Application Software Security (abbreviated)
  'CIS.16': {
    id: 'CIS.16',
    title: 'Application Software Security',
    description: 'Manage the security life cycle of in-house developed, hosted, or acquired software.',
    implementation: 'Implement secure SDLC, conduct security testing, manage vulnerabilities.',
    assessment: 'Review application security program.',
    relatedControls: ['CIS.7', 'CIS.2']
  },

  // Control 17: Incident Response Management (abbreviated)
  'CIS.17': {
    id: 'CIS.17',
    title: 'Incident Response Management',
    description: 'Establish a program to prepare for, detect, and quickly respond to an attack.',
    implementation: 'Develop incident response plan, establish team, conduct exercises.',
    assessment: 'Review incident response program.',
    relatedControls: ['CIS.8', 'CIS.13', 'CIS.11']
  },

  // Control 18: Penetration Testing (abbreviated)
  'CIS.18': {
    id: 'CIS.18',
    title: 'Penetration Testing',
    description: 'Test the effectiveness and resiliency of enterprise assets through identifying and exploiting weaknesses.',
    implementation: 'Conduct regular penetration testing, remediate findings.',
    assessment: 'Review penetration testing program and results.',
    relatedControls: ['CIS.7', 'CIS.16']
  }
};

export default { cisControlsFramework, cisControlsControls };

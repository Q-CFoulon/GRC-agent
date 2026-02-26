/**
 * Framework Registry - Centralized management of all compliance frameworks
 */

import { FrameworkInfo, ControlRequirement, ComplianceFramework, SearchResult } from '../types/framework.js';
import { nistCSF20, nistCSFControls } from './nist-csf.js';
import { nist80053, nist80053Controls } from './nist-800-53.js';

export class FrameworkRegistry {
  private static frameworks: Map<string, FrameworkInfo> = new Map();
  private static controls: Map<string, Map<string, ControlRequirement>> = new Map();

  static {
    // Initialize frameworks
    this.frameworks.set(ComplianceFramework.NIST_CSF, nistCSF20);
    this.frameworks.set(ComplianceFramework.NIST_800_53, nist80053);
    
    // Placeholder frameworks
    this.frameworks.set(ComplianceFramework.NIST_CMMC, {
      id: ComplianceFramework.NIST_CMMC,
      name: 'NIST Cybersecurity Maturity Model Certification',
      version: '2.0',
      description: 'CMMC 2.0 is a comprehensive maturity model for assessing and improving cybersecurity capabilities.',
      organization: 'Department of Defense',
      total_controls: 200,
      categories: ['Foundational', 'Advanced', 'Expert'],
      url: 'https://www.acq.osd.mil/cmmc/'
    });
    
    this.frameworks.set(ComplianceFramework.HIPAA, {
      id: ComplianceFramework.HIPAA,
      name: 'Health Insurance Portability and Accountability Act',
      version: '2024',
      description: 'HIPAA protects individuals\' private health information.',
      organization: 'Department of Health and Human Services',
      total_controls: 164,
      categories: ['Administrative', 'Physical', 'Technical', 'Organizational'],
      url: 'https://www.hhs.gov/hipaa/'
    });
    
    this.frameworks.set(ComplianceFramework.HITRUST, {
      id: ComplianceFramework.HITRUST,
      name: 'HITRUST Common Security Framework',
      version: '9.4.1',
      description: 'HITRUST CSF combines HIPAA, HITECH, and ISO standards for healthcare security.',
      organization: 'HITRUST',
      total_controls: 49,
      categories: ['Administrative', 'Operational', 'Technical'],
      url: 'https://hitrustalliance.net/'
    });
    
    this.frameworks.set(ComplianceFramework.SOX, {
      id: ComplianceFramework.SOX,
      name: 'Sarbanes-Oxley Act',
      version: '2002',
      description: 'SOX established financial reporting standards and internal control requirements for public companies.',
      organization: 'U.S. Congress',
      total_controls: 95,
      categories: ['Financial Reporting', 'Internal Controls', 'Audit', 'IT General Controls'],
      url: 'https://www.sec.gov/cgi-bin/browse-edgar?action=getcompany'
    });
    
    this.frameworks.set(ComplianceFramework.SOC2, {
      id: ComplianceFramework.SOC2,
      name: 'Service Organization Control 2',
      version: '2022',
      description: 'SOC 2 Type II defines criteria for managing customer data and security controls.',
      organization: 'American Institute of CPAs (AICPA)',
      total_controls: 64,
      categories: ['Security', 'Availability', 'Processing Integrity', 'Confidentiality', 'Privacy'],
      url: 'https://www.aicpa.org/soc2review'
    });
    
    this.frameworks.set(ComplianceFramework.GDPR, {
      id: ComplianceFramework.GDPR,
      name: 'General Data Protection Regulation',
      version: '2018',
      description: 'GDPR regulates data protection and privacy for personal data of people in the EU.',
      organization: 'European Union',
      total_controls: 99,
      categories: ['Data Protection', 'Individual Rights', 'Data Processing', 'Governance'],
      url: 'https://gdpr-info.eu/'
    });
    
    this.frameworks.set(ComplianceFramework.CCPA, {
      id: ComplianceFramework.CCPA,
      name: 'California Consumer Privacy Act',
      version: '2020',
      description: 'CCPA provides California residents with rights regarding personal data collection and use.',
      organization: 'State of California',
      total_controls: 28,
      categories: ['Consumer Rights', 'Business Obligations', 'Data Collection', 'Opt-Out'],
      url: 'https://oag.ca.gov/privacy/ccpa'
    });
    
    // Initialize controls
    this.controls.set(ComplianceFramework.NIST_CSF, new Map(Object.entries(nistCSFControls)));
    this.controls.set(ComplianceFramework.NIST_800_53, new Map(Object.entries(nist80053Controls)));
    
    // Add empty maps for placeholder frameworks
    [ComplianceFramework.NIST_CMMC, ComplianceFramework.HIPAA, ComplianceFramework.HITRUST, 
     ComplianceFramework.SOX, ComplianceFramework.SOC2, ComplianceFramework.GDPR, ComplianceFramework.CCPA]
      .forEach(fw => this.controls.set(fw, new Map()));
  }

  static getFramework(id: ComplianceFramework): FrameworkInfo | undefined {
    return this.frameworks.get(id);
  }

  static getAllFrameworks(): FrameworkInfo[] {
    return Array.from(this.frameworks.values());
  }

  static getFrameworksByIds(ids: ComplianceFramework[]): FrameworkInfo[] {
    return ids
      .map(id => this.frameworks.get(id))
      .filter((fw): fw is FrameworkInfo => fw !== undefined);
  }

  static getFrameworksSummary(): { id: string; name: string; version: string }[] {
    return Array.from(this.frameworks.values()).map(fw => ({
      id: fw.id,
      name: fw.name,
      version: fw.version
    }));
  }

  static searchFrameworks(keyword: string): FrameworkInfo[] {
    const lowerKeyword = keyword.toLowerCase();
    return Array.from(this.frameworks.values()).filter(fw =>
      fw.name.toLowerCase().includes(lowerKeyword) ||
      fw.description.toLowerCase().includes(lowerKeyword) ||
      fw.organization.toLowerCase().includes(lowerKeyword)
    );
  }

  static getFrameworkControls(framework: ComplianceFramework): ControlRequirement[] {
    const controls = this.controls.get(framework);
    return controls ? Array.from(controls.values()) : [];
  }

  static getControlRequirements(framework: ComplianceFramework, controlId: string): ControlRequirement | undefined {
    return this.controls.get(framework)?.get(controlId);
  }

  static searchControls(framework: ComplianceFramework, keyword: string): ControlRequirement[] {
    const controls = this.controls.get(framework);
    if (!controls) return [];

    const lowerKeyword = keyword.toLowerCase();
    return Array.from(controls.values()).filter(control =>
      control.title.toLowerCase().includes(lowerKeyword) ||
      control.description.toLowerCase().includes(lowerKeyword) ||
      control.implementation.toLowerCase().includes(lowerKeyword)
    );
  }

  static globalSearch(keyword: string): SearchResult[] {
    const results: SearchResult[] = [];
    const lowerKeyword = keyword.toLowerCase();

    this.frameworks.forEach((framework, frameworkId) => {
      const controlMap = this.controls.get(frameworkId as ComplianceFramework);
      if (controlMap) {
        controlMap.forEach((control, controlId) => {
          let relevance = 0;

          if (control.id.toLowerCase().includes(lowerKeyword)) relevance += 3;
          if (control.title.toLowerCase().includes(lowerKeyword)) relevance += 2;
          if (control.description.toLowerCase().includes(lowerKeyword)) relevance += 1;
          if (control.implementation.toLowerCase().includes(lowerKeyword)) relevance += 0.5;

          if (relevance > 0) {
            results.push({
              framework: frameworkId as ComplianceFramework,
              controlId: control.id,
              controlTitle: control.title,
              relevance,
              description: control.description
            });
          }
        });
      }
    });

    return results.sort((a, b) => b.relevance - a.relevance);
  }

  static compareFrameworks(framework1: ComplianceFramework, framework2: ComplianceFramework): {
    overlapping: string[];
    unique_to_first: string[];
    unique_to_second: string[];
  } {
    const controls1 = new Set(this.controls.get(framework1)?.keys() ?? []);
    const controls2 = new Set(this.controls.get(framework2)?.keys() ?? []);

    const overlapping = Array.from(controls1).filter(c => controls2.has(c));
    const unique_to_first = Array.from(controls1).filter(c => !controls2.has(c));
    const unique_to_second = Array.from(controls2).filter(c => !controls1.has(c));

    return { overlapping, unique_to_first, unique_to_second };
  }

  static getFrameworkSummary(framework: ComplianceFramework): string {
    const fw = this.frameworks.get(framework);
    if (!fw) return '';

    return `
${fw.name} v${fw.version}
Organization: ${fw.organization}
Total Controls: ${fw.total_controls}
Categories: ${fw.categories.join(', ')}
Description: ${fw.description}
More info: ${fw.url || 'N/A'}
    `.trim();
  }
}

export default FrameworkRegistry;

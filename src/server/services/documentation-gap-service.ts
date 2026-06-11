/**
 * Documentation Gap Service
 * Scans local documentation and estimates control coverage for selected frameworks.
 */

import fs from 'fs';
import path from 'path';
import FrameworkRegistry from '../frameworks/index.js';
import {
  ComplianceFramework,
  ControlGap,
  ControlStatusEntry,
  DocumentationGapAnalysisRequest,
  FrameworkDocumentationGapResult
} from '../types/framework.js';

interface DocumentationGapAnalysisResponse {
  generatedAt: Date;
  filesAnalyzed: string[];
  results: FrameworkDocumentationGapResult[];
  overallCoverage: number;
  recommendations: string[];
}

export class DocumentationGapService {
  analyzeDocumentation(request: DocumentationGapAnalysisRequest): DocumentationGapAnalysisResponse {
    const docsRoot = path.join(process.cwd(), 'docs');
    const files = this.getDocumentationFiles(docsRoot, request.includeFiles);
    const corpus = files.map(file => this.readLower(file)).join('\n\n');

    const results: FrameworkDocumentationGapResult[] = request.frameworks.map(framework => {
      const controls = FrameworkRegistry.getFrameworkControls(framework);

      let coveredControls = 0;
      const uncovered: ControlGap[] = [];
      const allControls: ControlStatusEntry[] = [];

      controls.forEach(control => {
        const isCovered = this.controlIsCovered(control, corpus);
        const category = control.category || this.inferCategory(framework, control.id);

        if (isCovered) {
          coveredControls += 1;
          allControls.push({
            controlId: control.id,
            controlTitle: control.title,
            category,
            covered: true
          });
          return;
        }

        const severity = this.assessControlSeverity(control.title, control.description);
        uncovered.push({
          controlId: control.id,
          controlTitle: control.title,
          description: control.description,
          severity,
          effort: this.assessImplementationEffort(control.title, control.description),
          implementationSteps: [
            `Map ${control.id} to an explicit policy/procedure section.`,
            'Document implementation ownership and operational evidence.',
            'Add review cadence and validation approach to documentation.'
          ]
        });
        allControls.push({
          controlId: control.id,
          controlTitle: control.title,
          category,
          covered: false,
          severity
        });
      });

      const coverage = controls.length === 0
        ? 100
        : Math.round((coveredControls / controls.length) * 100);

      return {
        framework,
        totalControls: controls.length,
        coveredControls,
        coverage,
        uncoveredControls: uncovered.slice(0, 150),
        allControls
      };
    });

    const overallCoverage = results.length === 0
      ? 0
      : Math.round(results.reduce((sum, result) => sum + result.coverage, 0) / results.length);

    return {
      generatedAt: new Date(),
      filesAnalyzed: files.map(file => path.relative(process.cwd(), file).replace(/\\/g, '/')),
      results,
      overallCoverage,
      recommendations: this.buildRecommendations(results)
    };
  }

  private getDocumentationFiles(rootPath: string, includeFiles?: string[]): string[] {
    if (!fs.existsSync(rootPath)) {
      return [];
    }

    if (includeFiles && includeFiles.length > 0) {
      return includeFiles
        .map(file => path.join(process.cwd(), file))
        .filter(file => fs.existsSync(file) && fs.statSync(file).isFile());
    }

    const files: string[] = [];

    const walk = (currentPath: string): void => {
      const entries = fs.readdirSync(currentPath, { withFileTypes: true });
      entries.forEach(entry => {
        const fullPath = path.join(currentPath, entry.name);
        if (entry.isDirectory()) {
          walk(fullPath);
          return;
        }

        if (entry.isFile() && /\.(md|txt|rtf)$/i.test(entry.name)) {
          files.push(fullPath);
        }
      });
    };

    walk(rootPath);
    return files;
  }

  private readLower(filePath: string): string {
    try {
      return fs.readFileSync(filePath, 'utf-8').toLowerCase();
    } catch {
      return '';
    }
  }

  private controlIsCovered(control: { id: string; title: string; description: string }, corpus: string): boolean {
    const keywordCandidates = [
      control.id.toLowerCase(),
      ...this.extractKeywords(control.title),
      ...this.extractKeywords(control.description)
    ];

    const keywords = Array.from(new Set(keywordCandidates)).slice(0, 10);

    // Require at least one strong indicator (ID) or two keyword indicators.
    if (corpus.includes(control.id.toLowerCase())) {
      return true;
    }

    let matches = 0;
    for (const keyword of keywords) {
      if (keyword.length < 5) {
        continue;
      }
      if (corpus.includes(keyword)) {
        matches += 1;
      }
      if (matches >= 2) {
        return true;
      }
    }

    return false;
  }

  private extractKeywords(text: string): string[] {
    const stopWords = new Set([
      'the', 'and', 'for', 'with', 'from', 'that', 'this', 'shall', 'must', 'into',
      'your', 'their', 'have', 'has', 'are', 'was', 'were', 'will', 'can', 'may',
      'organization', 'system', 'policy', 'process', 'control', 'controls'
    ]);

    return text
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, ' ')
      .split(/\s+/)
      .filter(word => word && !stopWords.has(word) && word.length >= 5)
      .slice(0, 8);
  }

  private assessControlSeverity(title: string, description: string): 'critical' | 'high' | 'medium' | 'low' {
    const text = `${title} ${description}`.toLowerCase();

    if (/auth|identity|encryption|incident|boundary|monitor|logging|audit/.test(text)) {
      return 'critical';
    }

    if (/vulnerability|detection|response|backup|recovery|network/.test(text)) {
      return 'high';
    }

    if (/training|awareness|procedure|review/.test(text)) {
      return 'medium';
    }

    return 'low';
  }

  private assessImplementationEffort(title: string, description: string): 'low' | 'medium' | 'high' | 'very-high' {
    const text = `${title} ${description}`.toLowerCase();

    if (/infrastructure|continuous|automated|architecture/.test(text)) {
      return 'high';
    }

    if (/cross|integration|enterprise|program/.test(text)) {
      return 'very-high';
    }

    if (/procedure|policy|documentation|review/.test(text)) {
      return 'low';
    }

    return 'medium';
  }

  private buildRecommendations(results: FrameworkDocumentationGapResult[]): string[] {
    const recommendations: string[] = [];

    results.forEach(result => {
      if (result.coverage < 50) {
        recommendations.push(
          `${result.framework}: Coverage below 50%. Prioritize a control-to-document traceability matrix and required evidence sections.`
        );
      } else if (result.coverage < 80) {
        recommendations.push(
          `${result.framework}: Coverage between 50% and 80%. Add targeted control references and strengthen implementation evidence language.`
        );
      } else {
        recommendations.push(
          `${result.framework}: Coverage above 80%. Maintain quarterly documentation verification to prevent drift.`
        );
      }
    });

    return recommendations;
  }

  private inferCategory(framework: ComplianceFramework, controlId: string): string {
    const id = controlId.toLowerCase();
    switch (framework) {
      case ComplianceFramework.HIPAA:
        if (id.startsWith('164.308')) return 'Administrative Safeguards';
        if (id.startsWith('164.310')) return 'Physical Safeguards';
        if (id.startsWith('164.312')) return 'Technical Safeguards';
        if (id.startsWith('164.314')) return 'Organizational Requirements';
        if (id.startsWith('164.316')) return 'Policies and Procedures';
        if (id.startsWith('164.5')) return 'Privacy Rule';
        return 'General';
      case ComplianceFramework.SOC2:
        if (id.startsWith('cc1')) return 'Control Environment';
        if (id.startsWith('cc2')) return 'Communication & Information';
        if (id.startsWith('cc3')) return 'Risk Assessment';
        if (id.startsWith('cc4')) return 'Monitoring Activities';
        if (id.startsWith('cc5')) return 'Control Activities';
        if (id.startsWith('cc6')) return 'Logical & Physical Access';
        if (id.startsWith('cc7')) return 'System Operations';
        if (id.startsWith('cc8')) return 'Change Management';
        if (id.startsWith('cc9')) return 'Risk Mitigation';
        if (id.startsWith('a1')) return 'Availability';
        if (id.startsWith('pi1')) return 'Processing Integrity';
        if (id.startsWith('c1')) return 'Confidentiality';
        if (id.startsWith('p1') || id.startsWith('p2') || id.startsWith('p3') || id.startsWith('p4') || id.startsWith('p5') || id.startsWith('p6') || id.startsWith('p7') || id.startsWith('p8')) return 'Privacy';
        return 'Common Criteria';
      case ComplianceFramework.PCI_DSS:
        if (id.startsWith('1')) return 'Network Security Controls';
        if (id.startsWith('2')) return 'Secure Configurations';
        if (id.startsWith('3')) return 'Protect Account Data';
        if (id.startsWith('4')) return 'Strong Cryptography';
        if (id.startsWith('5')) return 'Malware Protection';
        if (id.startsWith('6')) return 'Secure Systems & Software';
        if (id.startsWith('7')) return 'Restrict Access';
        if (id.startsWith('8')) return 'Identify Users & Auth';
        if (id.startsWith('9')) return 'Restrict Physical Access';
        if (id.startsWith('10')) return 'Log & Monitor';
        if (id.startsWith('11')) return 'Test Security';
        if (id.startsWith('12')) return 'Organizational Policies';
        return 'General';
      case ComplianceFramework.NIST_800_53: {
        const family = controlId.split('-')[0]?.toUpperCase() || '';
        const families: Record<string, string> = {
          'AC': 'Access Control', 'AT': 'Awareness & Training', 'AU': 'Audit & Accountability',
          'CA': 'Assessment & Authorization', 'CM': 'Configuration Management', 'CP': 'Contingency Planning',
          'IA': 'Identification & Authentication', 'IR': 'Incident Response', 'MA': 'Maintenance',
          'MP': 'Media Protection', 'PE': 'Physical & Environmental', 'PL': 'Planning',
          'PM': 'Program Management', 'PS': 'Personnel Security', 'PT': 'PII Processing',
          'RA': 'Risk Assessment', 'SA': 'System Acquisition', 'SC': 'System & Communications',
          'SI': 'System & Information Integrity', 'SR': 'Supply Chain Risk'
        };
        return families[family] || 'General';
      }
      case ComplianceFramework.NIST_CMMC:
        if (id.startsWith('ac')) return 'Access Control';
        if (id.startsWith('at')) return 'Awareness & Training';
        if (id.startsWith('au')) return 'Audit & Accountability';
        if (id.startsWith('cm')) return 'Configuration Management';
        if (id.startsWith('ia')) return 'Identification & Authentication';
        if (id.startsWith('ir')) return 'Incident Response';
        if (id.startsWith('ma')) return 'Maintenance';
        if (id.startsWith('mp')) return 'Media Protection';
        if (id.startsWith('pe')) return 'Physical Protection';
        if (id.startsWith('ps')) return 'Personnel Security';
        if (id.startsWith('re')) return 'Recovery';
        if (id.startsWith('rm')) return 'Risk Management';
        if (id.startsWith('ca')) return 'Security Assessment';
        if (id.startsWith('sc')) return 'System & Communications';
        if (id.startsWith('si')) return 'System & Information Integrity';
        return 'General';
      default:
        return 'General';
    }
  }
}

export default DocumentationGapService;

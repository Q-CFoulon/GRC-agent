/**
 * Framework Service - Gap analysis and framework management
 */

import {
  GapAnalysisResult,
  ControlGap,
  RemediationRecommendation,
  AnalysisRequest,
  ComplianceFramework
} from '../types/framework.js';
import FrameworkRegistry from '../frameworks/index.js';

export class FrameworkService {
  async analyzePolicy(request: AnalysisRequest, policyContent: string): Promise<GapAnalysisResult> {
    const results: GapAnalysisResult[] = [];

    for (const framework of request.frameworks) {
      const result = await this.performAnalysis(request.policyId, framework, policyContent);
      results.push(result);
    }

    // Return combined result from first framework (for now)
    return results[0] || this.createEmptyAnalysis(request.policyId, request.frameworks[0]);
  }

  private async performAnalysis(
    policyId: string,
    framework: ComplianceFramework,
    policyContent: string
  ): Promise<GapAnalysisResult> {
    const controls = FrameworkRegistry.getFrameworkControls(framework);
    const gaps = this.identifyGaps(policyContent, controls);
    const coverage = this.calculateCoverage(controls, gaps);
    const severity = this.determineSeverity(gaps);
    const recommendations = this.generateRecommendations(gaps);

    return {
      policyId,
      framework,
      totalControls: controls.length,
      coveredControls: controls.length - gaps.length,
      coverage,
      gaps,
      recommendations,
      complianceScore: coverage * severity,
      generatedAt: new Date()
    };
  }

  private identifyGaps(policyContent: string, controls: any[]): ControlGap[] {
    const gaps: ControlGap[] = [];
    const lowerContent = policyContent.toLowerCase();

    controls.forEach(control => {
      const keywords = [control.id, control.title, control.description].map(s => s?.toLowerCase()).filter(Boolean);
      const mentioned = keywords.some(keyword => lowerContent.includes(keyword as string));

      if (!mentioned) {
        gaps.push({
          controlId: control.id,
          controlTitle: control.title,
          description: control.description,
          severity: this.assessControlSeverity(control),
          effort: this.assessImplementationEffort(control),
          implementationSteps: this.generateImplementationSteps(control)
        });
      }
    });

    return gaps;
  }

  private calculateCoverage(totalControls: any[], gaps: ControlGap[]): number {
    if (totalControls.length === 0) return 100;
    return Math.round(((totalControls.length - gaps.length) / totalControls.length) * 100);
  }

  private determineSeverity(gaps: ControlGap[]): number {
    if (gaps.length === 0) return 1;

    const criticalCount = gaps.filter(g => g.severity === 'critical').length;
    const highCount = gaps.filter(g => g.severity === 'high').length;
    const mediumCount = gaps.filter(g => g.severity === 'medium').length;

    return 1 - (criticalCount * 0.3 + highCount * 0.2 + mediumCount * 0.1) / gaps.length;
  }

  private generateRecommendations(gaps: ControlGap[]): RemediationRecommendation[] {
    return gaps
      .filter(g => g.severity === 'critical' || g.severity === 'high')
      .map((gap, index) => ({
        priority: index + 1,
        controlId: gap.controlId,
        recommendation: `Implement ${gap.controlTitle}`,
        steps: gap.implementationSteps || [],
        estimatedDays: gap.effort === 'very-high' ? 60 : gap.effort === 'high' ? 30 : gap.effort === 'medium' ? 14 : 7,
        resources: ['Security Team', 'IT Operations', 'Compliance']
      }))
      .slice(0, 10); // Top 10 recommendations
  }

  private assessControlSeverity(control: any): 'critical' | 'high' | 'medium' | 'low' {
    const keywords = {
      critical: ['authentication', 'access control', 'encryption', 'incident response'],
      high: ['monitoring', 'backup', 'network'],
      medium: ['awareness', 'policy', 'testing']
    };

    const text = `${control.title} ${control.description}`.toLowerCase();

    for (const [severity, words] of Object.entries(keywords)) {
      if ((words as string[]).some(word => text.includes(word))) {
        return severity as 'critical' | 'high' | 'medium' | 'low';
      }
    }

    return 'low';
  }

  private assessImplementationEffort(control: any): 'low' | 'medium' | 'high' | 'very-high' {
    const text = `${control.title} ${control.description}`.toLowerCase();

    if (text.includes('policy') || text.includes('procedure')) return 'low';
    if (text.includes('implement') || text.includes('configure')) return 'medium';
    if (text.includes('automation') || text.includes('infrastructure')) return 'high';

    return 'medium';
  }

  private generateImplementationSteps(control: any): string[] {
    return [
      `1. Review ${control.title} requirements`,
      `2. Assessment current state against requirements`,
      `3. Document gaps and required changes`,
      `4. Develop implementation plan`,
      `5. Execute implementation`,
      `6. Verify compliance through testing`,
      `7. Document and communicate completion`
    ];
  }

  compareFrameworks(framework1: ComplianceFramework, framework2: ComplianceFramework): {
    overlapping: number;
    unique_to_first: number;
    unique_to_second: number;
  } {
    const comparison = FrameworkRegistry.compareFrameworks(framework1, framework2);
    return {
      overlapping: comparison.overlapping.length,
      unique_to_first: comparison.unique_to_first.length,
      unique_to_second: comparison.unique_to_second.length
    };
  }

  getFrameworkSummary(framework: ComplianceFramework): string {
    return FrameworkRegistry.getFrameworkSummary(framework);
  }

  private createEmptyAnalysis(
    policyId: string,
    framework: ComplianceFramework
  ): GapAnalysisResult {
    return {
      policyId,
      framework,
      totalControls: 0,
      coveredControls: 0,
      coverage: 0,
      gaps: [],
      recommendations: [],
      complianceScore: 0,
      generatedAt: new Date()
    };
  }
}

export default FrameworkService;

/**
 * Risk Assessment Service
 * Comprehensive risk assessment, scoring, and management functionality
 */

import {
  RiskAssessment,
  RiskCategory,
  RiskLikelihood,
  RiskImpact,
  RiskTreatment,
  RiskStatus,
  RiskControl,
  RiskTreatmentPlan,
  QuantitativeRiskAssessment,
  RiskRegister,
  RiskAppetite,
  RiskHeatmapData
} from '../types/framework.js';

export class RiskAssessmentService {
  private risks: Map<string, RiskAssessment> = new Map();
  private riskRegister: RiskRegister | null = null;

  /**
   * Initialize a new risk register
   */
  initializeRiskRegister(
    organizationName: string,
    riskAppetite: RiskAppetite
  ): RiskRegister {
    this.riskRegister = {
      id: this.generateId('REG'),
      organizationName,
      createdDate: new Date().toISOString(),
      lastUpdated: new Date().toISOString(),
      version: '1.0',
      risks: [],
      riskAppetite
    };
    return this.riskRegister;
  }

  /**
   * Create a new risk assessment
   */
  createRisk(params: {
    name: string;
    description: string;
    category: RiskCategory;
    likelihood: RiskLikelihood;
    impact: RiskImpact;
    assetId?: string;
    assetName?: string;
    threatSource?: string;
    vulnerabilities?: string[];
    existingControls?: RiskControl[];
    owner?: string;
    notes?: string;
  }): RiskAssessment {
    const id = this.generateId('RISK');
    
    const inherentRiskScore = this.calculateRiskScore(params.likelihood, params.impact);
    
    const risk: RiskAssessment = {
      id,
      name: params.name,
      description: params.description,
      category: params.category,
      assetId: params.assetId,
      assetName: params.assetName,
      threatSource: params.threatSource,
      vulnerabilities: params.vulnerabilities || [],
      likelihood: params.likelihood,
      impact: params.impact,
      inherentRiskScore,
      existingControls: params.existingControls || [],
      residualLikelihood: params.likelihood,
      residualImpact: params.impact,
      residualRiskScore: inherentRiskScore,
      treatment: RiskTreatment.ACCEPT,
      status: RiskStatus.IDENTIFIED,
      owner: params.owner || 'Unassigned',
      createdDate: new Date().toISOString(),
      lastReviewDate: new Date().toISOString(),
      nextReviewDate: this.calculateNextReviewDate(inherentRiskScore),
      notes: params.notes
    };

    this.risks.set(id, risk);
    
    if (this.riskRegister) {
      this.riskRegister.risks.push(risk);
      this.riskRegister.lastUpdated = new Date().toISOString();
    }

    return risk;
  }

  /**
   * Calculate qualitative risk score (likelihood × impact)
   */
  calculateRiskScore(likelihood: RiskLikelihood, impact: RiskImpact): number {
    return likelihood * impact;
  }

  /**
   * Get risk level description based on score
   */
  getRiskLevel(score: number): { level: string; color: string; description: string } {
    if (score <= 4) {
      return { 
        level: 'Low', 
        color: 'green',
        description: 'Risk is acceptable with normal monitoring'
      };
    } else if (score <= 9) {
      return { 
        level: 'Medium', 
        color: 'yellow',
        description: 'Risk requires attention and mitigation planning'
      };
    } else if (score <= 16) {
      return { 
        level: 'High', 
        color: 'orange',
        description: 'Risk requires prompt action and management attention'
      };
    } else {
      return { 
        level: 'Critical', 
        color: 'red',
        description: 'Risk requires immediate action and executive attention'
      };
    }
  }

  /**
   * Calculate quantitative risk using SLE/ALE methodology
   */
  calculateQuantitativeRisk(params: {
    riskId: string;
    assetValue: number;
    exposureFactor: number;
    annualRateOfOccurrence: number;
    controlCost?: number;
    controlEffectiveness?: number;
  }): QuantitativeRiskAssessment {
    // Single Loss Expectancy = Asset Value × Exposure Factor
    const singleLossExpectancy = params.assetValue * params.exposureFactor;
    
    // Annual Loss Expectancy = SLE × ARO
    const annualLossExpectancy = singleLossExpectancy * params.annualRateOfOccurrence;
    
    let returnOnInvestment: number | undefined;
    
    if (params.controlCost && params.controlEffectiveness) {
      // New ALE after control = ALE × (1 - Control Effectiveness)
      const newALE = annualLossExpectancy * (1 - params.controlEffectiveness);
      // Risk Reduction = Original ALE - New ALE
      const riskReduction = annualLossExpectancy - newALE;
      // ROI = (Risk Reduction - Control Cost) / Control Cost
      returnOnInvestment = (riskReduction - params.controlCost) / params.controlCost;
    }

    const quantAssessment: QuantitativeRiskAssessment = {
      riskId: params.riskId,
      assetValue: params.assetValue,
      exposureFactor: params.exposureFactor,
      singleLossExpectancy,
      annualRateOfOccurrence: params.annualRateOfOccurrence,
      annualLossExpectancy,
      returnOnInvestment
    };

    // Update the risk with quantitative data if it exists
    const risk = this.risks.get(params.riskId);
    if (risk) {
      risk.quantitativeAssessment = quantAssessment;
    }

    return quantAssessment;
  }

  /**
   * Apply controls and recalculate residual risk
   */
  applyControls(
    riskId: string, 
    controls: RiskControl[]
  ): RiskAssessment | undefined {
    const risk = this.risks.get(riskId);
    if (!risk) return undefined;

    // Add controls
    risk.existingControls = [...risk.existingControls, ...controls];

    // Calculate control effectiveness
    const totalEffectiveness = controls.reduce((sum, ctrl) => {
      return sum + (ctrl.effectiveness || 0);
    }, 0) / controls.length || 0;

    // Reduce risk based on control effectiveness
    // Effectiveness of 0.2 (20%) reduces likelihood/impact by ~1 level each
    const reductionFactor = Math.floor(totalEffectiveness * 5);
    
    risk.residualLikelihood = Math.max(1, risk.likelihood - reductionFactor) as RiskLikelihood;
    risk.residualImpact = Math.max(1, risk.impact - Math.floor(reductionFactor / 2)) as RiskImpact;
    risk.residualRiskScore = this.calculateRiskScore(risk.residualLikelihood, risk.residualImpact);

    risk.lastReviewDate = new Date().toISOString();
    
    return risk;
  }

  /**
   * Create a treatment plan for a risk
   */
  createTreatmentPlan(params: {
    riskId: string;
    treatment: RiskTreatment;
    description: string;
    proposedControls?: RiskControl[];
    responsibleParty: string;
    targetDate: string;
    budget?: number;
  }): RiskTreatmentPlan | undefined {
    const risk = this.risks.get(params.riskId);
    if (!risk) return undefined;

    const plan: RiskTreatmentPlan = {
      riskId: params.riskId,
      treatment: params.treatment,
      description: params.description,
      proposedControls: params.proposedControls || [],
      responsibleParty: params.responsibleParty,
      targetDate: params.targetDate,
      status: 'Planned',
      budget: params.budget
    };

    risk.treatment = params.treatment;
    risk.treatmentPlan = plan;
    risk.status = RiskStatus.MITIGATING;

    return plan;
  }

  /**
   * Update risk status
   */
  updateRiskStatus(riskId: string, status: RiskStatus): RiskAssessment | undefined {
    const risk = this.risks.get(riskId);
    if (!risk) return undefined;

    risk.status = status;
    risk.lastReviewDate = new Date().toISOString();

    if (status === RiskStatus.MITIGATED) {
      risk.nextReviewDate = this.calculateNextReviewDate(risk.residualRiskScore, true);
    }

    return risk;
  }

  /**
   * Generate risk heatmap data
   */
  generateHeatmap(): RiskHeatmapData {
    const cells: Array<{
      likelihood: RiskLikelihood;
      impact: RiskImpact;
      riskIds: string[];
      count: number;
      color: string;
    }> = [];

    // Create 5x5 matrix
    for (let l = 1; l <= 5; l++) {
      for (let i = 1; i <= 5; i++) {
        const likelihood = l as RiskLikelihood;
        const impact = i as RiskImpact;
        const score = this.calculateRiskScore(likelihood, impact);
        const { color } = this.getRiskLevel(score);
        
        const matchingRisks = Array.from(this.risks.values()).filter(
          r => r.likelihood === likelihood && r.impact === impact
        );

        cells.push({
          likelihood,
          impact,
          riskIds: matchingRisks.map(r => r.id),
          count: matchingRisks.length,
          color
        });
      }
    }

    // Count by category
    const categoryBreakdown = Object.values(RiskCategory).reduce((acc, cat) => {
      acc[cat] = Array.from(this.risks.values()).filter(r => r.category === cat).length;
      return acc;
    }, {} as Record<RiskCategory, number>);

    // Count by status
    const statusBreakdown = Object.values(RiskStatus).reduce((acc, status) => {
      acc[status] = Array.from(this.risks.values()).filter(r => r.status === status).length;
      return acc;
    }, {} as Record<RiskStatus, number>);

    return {
      cells,
      totalRisks: this.risks.size,
      criticalCount: Array.from(this.risks.values()).filter(r => r.inherentRiskScore >= 20).length,
      highCount: Array.from(this.risks.values()).filter(r => r.inherentRiskScore >= 12 && r.inherentRiskScore < 20).length,
      mediumCount: Array.from(this.risks.values()).filter(r => r.inherentRiskScore >= 5 && r.inherentRiskScore < 12).length,
      lowCount: Array.from(this.risks.values()).filter(r => r.inherentRiskScore < 5).length,
      categoryBreakdown,
      statusBreakdown
    };
  }

  /**
   * Get risk by ID
   */
  getRisk(id: string): RiskAssessment | undefined {
    return this.risks.get(id);
  }

  /**
   * Get all risks
   */
  getAllRisks(): RiskAssessment[] {
    return Array.from(this.risks.values());
  }

  /**
   * Get risks by category
   */
  getRisksByCategory(category: RiskCategory): RiskAssessment[] {
    return Array.from(this.risks.values()).filter(r => r.category === category);
  }

  /**
   * Get risks by status
   */
  getRisksByStatus(status: RiskStatus): RiskAssessment[] {
    return Array.from(this.risks.values()).filter(r => r.status === status);
  }

  /**
   * Get high and critical risks that need attention
   */
  getRisksNeedingAttention(): RiskAssessment[] {
    return Array.from(this.risks.values()).filter(r => 
      (r.inherentRiskScore >= 12 && r.status !== RiskStatus.MITIGATED && r.status !== RiskStatus.CLOSED) ||
      new Date(r.nextReviewDate) <= new Date()
    ).sort((a, b) => b.inherentRiskScore - a.inherentRiskScore);
  }

  /**
   * Get the current risk register
   */
  getRiskRegister(): RiskRegister | null {
    if (this.riskRegister) {
      this.riskRegister.risks = Array.from(this.risks.values());
    }
    return this.riskRegister;
  }

  /**
   * Generate risk register report
   */
  generateRiskReport(): string {
    const risks = Array.from(this.risks.values());
    const heatmap = this.generateHeatmap();

    let report = `# Risk Assessment Report\n\n`;
    report += `**Generated:** ${new Date().toISOString()}\n`;
    report += `**Total Risks:** ${risks.length}\n\n`;

    report += `## Risk Summary\n\n`;
    report += `| Level | Count |\n|-------|-------|\n`;
    report += `| Critical | ${heatmap.criticalCount} |\n`;
    report += `| High | ${heatmap.highCount} |\n`;
    report += `| Medium | ${heatmap.mediumCount} |\n`;
    report += `| Low | ${heatmap.lowCount} |\n\n`;

    report += `## Category Breakdown\n\n`;
    Object.entries(heatmap.categoryBreakdown).forEach(([cat, count]) => {
      if (count > 0) {
        report += `- **${cat}:** ${count}\n`;
      }
    });

    report += `\n## Status Breakdown\n\n`;
    Object.entries(heatmap.statusBreakdown).forEach(([status, count]) => {
      if (count > 0) {
        report += `- **${status}:** ${count}\n`;
      }
    });

    report += `\n## Detailed Risk List\n\n`;
    
    // Group by risk level
    const criticalRisks = risks.filter(r => r.inherentRiskScore >= 20);
    const highRisks = risks.filter(r => r.inherentRiskScore >= 12 && r.inherentRiskScore < 20);
    const mediumRisks = risks.filter(r => r.inherentRiskScore >= 5 && r.inherentRiskScore < 12);
    const lowRisks = risks.filter(r => r.inherentRiskScore < 5);

    const formatRiskSection = (title: string, riskList: RiskAssessment[]) => {
      if (riskList.length === 0) return '';
      let section = `### ${title} (${riskList.length})\n\n`;
      riskList.forEach(risk => {
        const level = this.getRiskLevel(risk.inherentRiskScore);
        section += `#### ${risk.id}: ${risk.name}\n`;
        section += `- **Category:** ${risk.category}\n`;
        section += `- **Status:** ${risk.status}\n`;
        section += `- **Inherent Risk Score:** ${risk.inherentRiskScore} (${level.level})\n`;
        section += `- **Residual Risk Score:** ${risk.residualRiskScore}\n`;
        section += `- **Likelihood:** ${risk.likelihood}/5 | **Impact:** ${risk.impact}/5\n`;
        section += `- **Treatment:** ${risk.treatment}\n`;
        section += `- **Owner:** ${risk.owner}\n`;
        section += `- **Description:** ${risk.description}\n`;
        if (risk.threatSource) section += `- **Threat Source:** ${risk.threatSource}\n`;
        if (risk.vulnerabilities?.length) section += `- **Vulnerabilities:** ${risk.vulnerabilities.join(', ')}\n`;
        if (risk.existingControls?.length) {
          section += `- **Controls:**\n`;
          risk.existingControls.forEach(ctrl => {
            section += `  - ${ctrl.name} (${ctrl.type}, ${((ctrl.effectiveness || 0) * 100).toFixed(0)}% effective)\n`;
          });
        }
        if (risk.treatmentPlan) {
          section += `- **Treatment Plan:** ${risk.treatmentPlan.description}\n`;
          section += `  - Target Date: ${risk.treatmentPlan.targetDate}\n`;
          section += `  - Responsible: ${risk.treatmentPlan.responsibleParty}\n`;
        }
        if (risk.quantitativeAssessment) {
          section += `- **Quantitative Assessment:**\n`;
          section += `  - Asset Value: $${risk.quantitativeAssessment.assetValue.toLocaleString()}\n`;
          section += `  - SLE: $${risk.quantitativeAssessment.singleLossExpectancy.toLocaleString()}\n`;
          section += `  - ALE: $${risk.quantitativeAssessment.annualLossExpectancy.toLocaleString()}\n`;
          if (risk.quantitativeAssessment.returnOnInvestment !== undefined) {
            section += `  - Control ROI: ${(risk.quantitativeAssessment.returnOnInvestment * 100).toFixed(1)}%\n`;
          }
        }
        section += `- **Next Review:** ${risk.nextReviewDate}\n\n`;
      });
      return section;
    };

    report += formatRiskSection('🔴 Critical Risks', criticalRisks);
    report += formatRiskSection('🟠 High Risks', highRisks);
    report += formatRiskSection('🟡 Medium Risks', mediumRisks);
    report += formatRiskSection('🟢 Low Risks', lowRisks);

    return report;
  }

  /**
   * Get likelihood description
   */
  getLikelihoodDescription(likelihood: RiskLikelihood): { name: string; description: string } {
    const descriptions: Record<RiskLikelihood, { name: string; description: string }> = {
      1: { name: 'Rare', description: 'Event may occur only in exceptional circumstances (< 10% chance annually)' },
      2: { name: 'Unlikely', description: 'Event could occur but is not expected (10-25% chance annually)' },
      3: { name: 'Possible', description: 'Event might occur at some time (25-50% chance annually)' },
      4: { name: 'Likely', description: 'Event will probably occur (50-75% chance annually)' },
      5: { name: 'Almost Certain', description: 'Event is expected to occur (> 75% chance annually)' }
    };
    return descriptions[likelihood];
  }

  /**
   * Get impact description
   */
  getImpactDescription(impact: RiskImpact): { name: string; description: string; financial: string } {
    const descriptions: Record<RiskImpact, { name: string; description: string; financial: string }> = {
      1: { 
        name: 'Negligible', 
        description: 'Minor impact with no lasting effect',
        financial: '< $10,000'
      },
      2: { 
        name: 'Minor', 
        description: 'Some impact requiring management attention',
        financial: '$10,000 - $100,000'
      },
      3: { 
        name: 'Moderate', 
        description: 'Significant impact requiring senior management attention',
        financial: '$100,000 - $1,000,000'
      },
      4: { 
        name: 'Major', 
        description: 'Serious impact with potential regulatory or reputational damage',
        financial: '$1,000,000 - $10,000,000'
      },
      5: { 
        name: 'Severe', 
        description: 'Critical impact threatening business viability',
        financial: '> $10,000,000'
      }
    };
    return descriptions[impact];
  }

  /**
   * Get treatment recommendation based on risk score
   */
  getTreatmentRecommendation(score: number): { treatment: RiskTreatment; rationale: string }[] {
    const recommendations: { treatment: RiskTreatment; rationale: string }[] = [];

    if (score >= 20) {
      recommendations.push({
        treatment: RiskTreatment.MITIGATE,
        rationale: 'Critical risk requires immediate control implementation'
      });
      recommendations.push({
        treatment: RiskTreatment.AVOID,
        rationale: 'Consider eliminating the activity that creates this risk'
      });
    } else if (score >= 12) {
      recommendations.push({
        treatment: RiskTreatment.MITIGATE,
        rationale: 'High risk should be reduced through additional controls'
      });
      recommendations.push({
        treatment: RiskTreatment.TRANSFER,
        rationale: 'Consider transferring risk through insurance or contracts'
      });
    } else if (score >= 5) {
      recommendations.push({
        treatment: RiskTreatment.MITIGATE,
        rationale: 'Moderate risk may benefit from control improvements'
      });
      recommendations.push({
        treatment: RiskTreatment.ACCEPT,
        rationale: 'Risk may be acceptable if within risk appetite'
      });
    } else {
      recommendations.push({
        treatment: RiskTreatment.ACCEPT,
        rationale: 'Low risk is generally acceptable with monitoring'
      });
    }

    return recommendations;
  }

  /**
   * Delete a risk
   */
  deleteRisk(id: string): boolean {
    return this.risks.delete(id);
  }

  /**
   * Clear all risks
   */
  clearAllRisks(): void {
    this.risks.clear();
    if (this.riskRegister) {
      this.riskRegister.risks = [];
    }
  }

  // Private helper methods

  private generateId(prefix: string): string {
    return `${prefix}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }

  private calculateNextReviewDate(riskScore: number, mitigated: boolean = false): string {
    const today = new Date();
    let daysToAdd: number;

    if (mitigated) {
      daysToAdd = 365; // Annual review for mitigated risks
    } else if (riskScore >= 20) {
      daysToAdd = 30; // Monthly for critical
    } else if (riskScore >= 12) {
      daysToAdd = 90; // Quarterly for high
    } else if (riskScore >= 5) {
      daysToAdd = 180; // Semi-annual for medium
    } else {
      daysToAdd = 365; // Annual for low
    }

    today.setDate(today.getDate() + daysToAdd);
    return today.toISOString();
  }
}

// Export singleton instance
export const riskAssessmentService = new RiskAssessmentService();

export default RiskAssessmentService;

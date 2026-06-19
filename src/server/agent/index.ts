/**
 * GRC Agent Core - Main AI agent for routing and processing
 */

import {
  GRCAgentRequest,
  GRCAgentResponse,
  AgentIntentResult,
  ComplianceFramework,
  PlanType,
  PolicyGenerationRequest,
  PlanGenerationRequest,
  AnalysisRequest
} from '../types/framework.js';
import PolicyService from '../services/policy-service.js';
import FrameworkService from '../services/framework-service.js';
import PlanningService from '../services/planning-service.js';
import FrameworkRegistry from '../frameworks/index.js';

export class GRCAgent {
  private policyService: PolicyService;
  private frameworkService: FrameworkService;
  private planningService: PlanningService;
  private conversationHistory: string[] = [];

  constructor() {
    this.policyService = new PolicyService();
    this.frameworkService = new FrameworkService();
    this.planningService = new PlanningService();
  }

  async processMessage(request: GRCAgentRequest): Promise<GRCAgentResponse> {
    const intent = this.determineIntent(request.message);
    this.conversationHistory.push(request.message);

    let response: GRCAgentResponse;

    switch (intent.intent) {
      case 'generate-policy':
        response = await this.handlePolicyGeneration(request, intent);
        break;
      case 'analyze-policy':
        response = await this.handlePolicyAnalysis(request, intent);
        break;
      case 'generate-plan':
        response = await this.handlePlanGeneration(request, intent);
        break;
      case 'framework-info':
        response = await this.handleFrameworkInfo(request, intent);
        break;
      case 'list-frameworks':
        response = await this.handleListFrameworks(request);
        break;
      default:
        response = await this.handleGeneralQuery(request);
    }

    return response;
  }

  private determineIntent(message: string): AgentIntentResult {
    const lowerMessage = message.toLowerCase();
    let intent = 'general-query';
    let confidence = 0;

    // Policy generation
    if (/generate|create|write|draft/.test(lowerMessage) && /policy|policy|policies|procedure/.test(lowerMessage)) {
      intent = 'generate-policy';
      confidence = 0.9;
    }
    // Policy analysis / gap analysis
    else if (/analyze|assessment|audit|gap|comply|compliance|coverage/.test(lowerMessage) && /policy|policies|compliance/.test(lowerMessage)) {
      intent = 'analyze-policy';
      confidence = 0.9;
    }
    // Plan generation
    else if (/generate|create|draft|develop/.test(lowerMessage) && /plan|ssp|security plan|incident response|disaster recovery|breach/.test(lowerMessage)) {
      intent = 'generate-plan';
      confidence = 0.9;
    }
    // Framework information
    else if (/framework|control|requirement|requirement/i.test(lowerMessage) && /detail|explain|tell|info|information/.test(lowerMessage)) {
      intent = 'framework-info';
      confidence = 0.85;
    }
    // List frameworks
    else if (/show|list|all|available/.test(lowerMessage) && /framework|compliance|standard/.test(lowerMessage)) {
      intent = 'list-frameworks';
      confidence = 0.85;
    }

    const entities = {
      frameworks: this.extractFrameworks(message),
      organization: this.extractOrganization(message),
      policyTitle: this.extractPolicyTitle(message),
      planType: this.extractPlanType(message),
      context: this.extractContext(message)
    };

    return { intent, confidence, entities };
  }

  private extractFrameworks(message: string): ComplianceFramework[] {
    const frameworks: ComplianceFramework[] = [];
    const frameworkMap: Record<string, ComplianceFramework> = {
      'nist csf': ComplianceFramework.NIST_CSF,
      'nist-csf': ComplianceFramework.NIST_CSF,
      'nist 800-53': ComplianceFramework.NIST_800_53,
      'nist800-53': ComplianceFramework.NIST_800_53,
      'cmmc': ComplianceFramework.NIST_CMMC,
      'hipaa': ComplianceFramework.HIPAA,
      'hitrust': ComplianceFramework.HITRUST,
      'soc 2': ComplianceFramework.SOC2,
      'soc2': ComplianceFramework.SOC2,
      'sox': ComplianceFramework.SOX,
      'gdpr': ComplianceFramework.GDPR,
      'ccpa': ComplianceFramework.CCPA
    };

    const lowerMessage = message.toLowerCase();
    for (const [key, framework] of Object.entries(frameworkMap)) {
      if (lowerMessage.includes(key)) {
        frameworks.push(framework);
      }
    }

    return frameworks.length > 0 ? frameworks : [ComplianceFramework.NIST_CSF];
  }

  private extractOrganization(message: string): string | undefined {
    const match = message.match(/(?:for|at|within|company|organization|organization.*?)\s+(\w+(?:\s+\w+)?)/i);
    return match ? match[1] : undefined;
  }

  private extractPolicyTitle(message: string): string | undefined {
    const match = message.match(/(?:generate|create|draft|write)\s+(?:a|an|the)?\s*([\w\s]+?)\s+(?:policy|policy)/i);
    return match ? match[1]?.trim() : undefined;
  }

  private extractPlanType(message: string): PlanType | undefined {
    const lowerMessage = message.toLowerCase();
    const planMap: Record<string, PlanType> = {
      'ssp': PlanType.SSP,
      'system security plan': PlanType.SSP,
      'irp': PlanType.IRP,
      'incident response': PlanType.IRP,
      'brp': PlanType.BRP,
      'breach': PlanType.BRP,
      'bc/dr': PlanType.BCDR,
      'disaster recovery': PlanType.BCDR,
      'business continuity': PlanType.BCDR,
      'test': PlanType.TEST_FAILOVER,
      'failover': PlanType.TEST_FAILOVER
    };

    for (const [key, type] of Object.entries(planMap)) {
      if (lowerMessage.includes(key)) {
        return type;
      }
    }

    return undefined;
  }

  private extractContext(message: string): string {
    return message; // Return the message itself as context
  }

  private async handlePolicyGeneration(request: GRCAgentRequest, intent: AgentIntentResult): Promise<GRCAgentResponse> {
    const frameworks = intent.entities.frameworks || [ComplianceFramework.NIST_CSF];
    const title = intent.entities.policyTitle || 'Security Policy';
    const organization = intent.entities.organization || 'Organization';

    const policyRequest: PolicyGenerationRequest = {
      title,
      organization,
      frameworks,
      scope: 'Entire organization',
      audience: 'All employees and contractors'
    };

    try {
      const policy = await this.policyService.generatePolicy(policyRequest);
      return {
        response: `Generated policy "${policy.title}" (ID: ${policy.id}))\n\nFrameworks: ${frameworks.map(f => FrameworkRegistry.getFramework(f)?.name).join(', ')}\n\nPolicy content has been created and is ready for review.`,
        intent: 'generate-policy',
        data: policy,
        conversationId: request.conversationId || 'default',
        timestamp: new Date()
      };
    } catch (error) {
      return {
        response: 'Error generating policy. Please try again with a clearer request.',
        intent: 'error',
        conversationId: request.conversationId || 'default',
        timestamp: new Date()
      };
    }
  }

  private async handlePolicyAnalysis(request: GRCAgentRequest, intent: AgentIntentResult): Promise<GRCAgentResponse> {
    const frameworks = intent.entities.frameworks || [ComplianceFramework.NIST_CSF];

    // For demonstration, analyze a default policy
    const policies = this.policyService.listPolicies();
    if (policies.length === 0) {
      return {
        response: 'No policies found to analyze. Generate a policy first using the "generate policy" command.',
        intent: 'error',
        conversationId: request.conversationId || 'default',
        timestamp: new Date()
      };
    }

    const policy = policies[0];
    const analysisRequest: AnalysisRequest = {
      policyId: policy.id,
      frameworks,
      organization: policy.organization,
      context: request.message
    };

    try {
      const analysis = await this.frameworkService.analyzePolicy(analysisRequest, policy.content);
      return {
        response: `Analysis of "${policy.title}":\n\nFramework: ${FrameworkRegistry.getFramework(analysis.framework)?.name}\nCoverage: ${analysis.coverage}%\nCompliance Score: ${Math.round(analysis.complianceScore * 100)}%\n\nGaps Found: ${analysis.gaps.length}\n\nTop Recommendations:\n${analysis.recommendations.slice(0, 3).map((r, i) => `${i + 1}. ${r.recommendation} (Priority: ${r.priority})`).join('\n')}`,
        intent: 'analyze-policy',
        data: analysis,
        conversationId: request.conversationId || 'default',
        timestamp: new Date()
      };
    } catch (error) {
      return {
        response: 'Error analyzing policy. Please try again.',
        intent: 'error',
        conversationId: request.conversationId || 'default',
        timestamp: new Date()
      };
    }
  }

  private async handlePlanGeneration(request: GRCAgentRequest, intent: AgentIntentResult): Promise<GRCAgentResponse> {
    const planType = intent.entities.planType || PlanType.SSP;
    const frameworks = intent.entities.frameworks || [ComplianceFramework.NIST_CSF];
    const organization = intent.entities.organization || 'Organization';
    const title = intent.entities.policyTitle || 'Security Initiative';

    const planRequest: PlanGenerationRequest = {
      type: planType,
      organization,
      frameworks,
      title,
      context: request.message
    };

    try {
      const plan = await this.planningService.generatePlan(planRequest);
      return {
        response: `Generated ${planRequest.type} plan: "${plan.title}"\n\nPlan ID: ${plan.id}\nStatus: Draft\nSections: ${plan.sections.length}\n\nPlan is ready for review and customization.`,
        intent: 'generate-plan',
        data: plan,
        conversationId: request.conversationId || 'default',
        timestamp: new Date()
      };
    } catch (error) {
      return {
        response: 'Error generating plan. Please try again with a clearer request.',
        intent: 'error',
        conversationId: request.conversationId || 'default',
        timestamp: new Date()
      };
    }
  }

  private async handleFrameworkInfo(request: GRCAgentRequest, intent: AgentIntentResult): Promise<GRCAgentResponse> {
    const frameworks = intent.entities.frameworks || [ComplianceFramework.NIST_CSF];

    const responses = frameworks.map(fw => {
      const framework = FrameworkRegistry.getFramework(fw);
      if (!framework) return null;
      return FrameworkRegistry.getFrameworkSummary(fw);
    }).filter(Boolean);

    return {
      response: responses.join('\n\n---\n\n'),
      intent: 'framework-info',
      conversationId: request.conversationId || 'default',
      timestamp: new Date()
    };
  }

  private async handleListFrameworks(request: GRCAgentRequest): Promise<GRCAgentResponse> {
    const frameworks = FrameworkRegistry.getAllFrameworks();
    const frameworkList = frameworks
      .map(fw => `- **${fw.name}** v${fw.version} (${fw.total_controls} controls)`)
      .join('\n');

    return {
      response: `Available Compliance Frameworks:\n\n${frameworkList}`,
      intent: 'list-frameworks',
      conversationId: request.conversationId || 'default',
      timestamp: new Date()
    };
  }

  private async handleGeneralQuery(request: GRCAgentRequest): Promise<GRCAgentResponse> {
    const response = `I can help you with:\n\n1. **Generate Policies** - "Generate an access control policy for NIST CSF"\n2. **Analyze Policies** - "Analyze our policy against HIPAA requirements"\n3. **Create Plans** - "Create a System Security Plan for our organization"\n4. **Framework Information** - "Tell me about NIST 800-53 requirements"\n5. **List Frameworks** - "Show me available compliance frameworks"\n\nHow can I assist you with your GRC needs?`;

    return {
      response,
      intent: 'general-query',
      conversationId: request.conversationId || 'default',
      timestamp: new Date()
    };
  }

  getConversationHistory(): string[] {
    return [...this.conversationHistory];
  }

  clearHistory(): void {
    this.conversationHistory = [];
  }

  // Policy management methods
  listPolicies() {
    return this.policyService.listPolicies();
  }

  getPolicy(id: string) {
    return this.policyService.getPolicy(id);
  }

  exportPolicyAsMarkdown(id: string) {
    return this.policyService.exportPolicyAsMarkdown(id);
  }

  // Plan management methods
  listPlans() {
    return this.planningService.listPlans();
  }

  getPlan(id: string) {
    return this.planningService.getPlan(id);
  }

  exportPlanAsMarkdown(id: string) {
    return this.planningService.exportPlanAsMarkdown(id);
  }
}

export default GRCAgent;

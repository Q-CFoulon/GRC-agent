/**
 * Type definitions for GRC Agent system
 * Central location for all TypeScript interfaces and enums
 */

export enum ComplianceFramework {
  NIST_CSF = 'nist-csf',
  NIST_800_53 = 'nist-800-53',
  NIST_CMMC = 'nist-cmmc',
  HIPAA = 'hipaa',
  HITRUST = 'hitrust',
  SOX = 'sox',
  SOC2 = 'soc2',
  GDPR = 'gdpr',
  CCPA = 'ccpa'
}

export enum PlanType {
  SSP = 'ssp', // System Security Plan
  IRP = 'irp', // Incident Response Plan
  BRP = 'brp', // Breach Response Plan
  BCDR = 'bcdr', // Business Continuity & Disaster Recovery
  TEST_FAILOVER = 'test-failover' // Test & Failover Plan
}

export interface ControlRequirement {
  id: string;
  title: string;
  description: string;
  implementation: string;
  assessment: string;
  relatedControls?: string[];
}

export interface FrameworkMapping {
  control_id: string;
  framework: ComplianceFramework;
  requirement: ControlRequirement;
  severity?: 'critical' | 'high' | 'medium' | 'low';
  effort?: 'low' | 'medium' | 'high' | 'very-high';
}

export interface PolicyDocument {
  id: string;
  title: string;
  organization: string;
  framework: ComplianceFramework;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  status: 'draft' | 'review' | 'approved' | 'published';
  version: string;
  author?: string;
  reviewers?: string[];
  approvedBy?: string;
}

export interface SecurityPlan {
  id: string;
  type: PlanType;
  title: string;
  organization: string;
  framework?: ComplianceFramework;
  sections: PlanSection[];
  createdAt: Date;
  updatedAt: Date;
  status: 'draft' | 'review' | 'approved' | 'implementation';
  owner?: string;
}

export interface PlanSection {
  title: string;
  content: string;
  subsections?: { title: string; content: string }[];
  responsibilities?: string[];
  timeline?: string;
}

export interface GapAnalysisResult {
  policyId: string;
  framework: ComplianceFramework;
  totalControls: number;
  coveredControls: number;
  coverage: number; // Percentage
  gaps: ControlGap[];
  recommendations: RemediationRecommendation[];
  complianceScore: number;
  generatedAt: Date;
}

export interface ControlGap {
  controlId: string;
  controlTitle: string;
  description: string;
  severity: 'critical' | 'high' | 'medium' | 'low';
  effort: 'low' | 'medium' | 'high' | 'very-high';
  implementationSteps?: string[];
}

export interface RemediationRecommendation {
  priority: number;
  controlId: string;
  recommendation: string;
  steps: string[];
  estimatedDays: number;
  resources?: string[];
}

export interface AnalysisRequest {
  policyId: string;
  frameworks: ComplianceFramework[];
  organization?: string;
  context?: string;
}

export interface PolicyGenerationRequest {
  title: string;
  organization: string;
  frameworks: ComplianceFramework[];
  context?: string;
  scope?: string;
  audience?: string;
}

export interface PlanGenerationRequest {
  type: PlanType;
  organization: string;
  frameworks: ComplianceFramework[];
  title: string;
  context?: string;
  scope?: string;
}

export interface GRCAgentRequest {
  message: string;
  userId?: string;
  conversationId?: string;
  context?: Record<string, unknown>;
}

export interface GRCAgentResponse {
  response: string;
  intent: string;
  data?: PolicyDocument | SecurityPlan | GapAnalysisResult | unknown;
  conversationId: string;
  timestamp: Date;
}

export interface FrameworkInfo {
  id: ComplianceFramework;
  name: string;
  version: string;
  description: string;
  organization: string;
  total_controls: number;
  categories: string[];
  url?: string;
}

export interface SearchResult {
  framework: ComplianceFramework;
  controlId: string;
  controlTitle: string;
  relevance: number;
  description: string;
}

export interface AgentIntentResult {
  intent: string;
  confidence: number;
  entities: {
    frameworks?: ComplianceFramework[];
    organization?: string;
    policyTitle?: string;
    planType?: PlanType;
    context?: string;
  };
}

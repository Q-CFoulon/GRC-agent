#!/usr/bin/env node
/**
 * GRC Agent MCP Server
 * 
 * Exposes GRC (Governance, Risk, Compliance) tools via the Model Context Protocol
 * for use with AI assistants like Claude.
 */

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
  ListResourcesRequestSchema,
  ReadResourceRequestSchema,
  ListPromptsRequestSchema,
  GetPromptRequestSchema
} from '@modelcontextprotocol/sdk/types.js';

import { PolicyService } from '../services/policy-service.js';
import { FrameworkService } from '../services/framework-service.js';
import { PlanningService } from '../services/planning-service.js';
import { riskAssessmentService } from '../services/risk-assessment-service.js';
import FrameworkRegistry from '../frameworks/index.js';
import { ComplianceFramework, PlanType, RiskCategory, RiskLikelihood, RiskImpact, RiskTreatment, RiskStatus } from '../types/framework.js';

// Initialize services
const policyService = new PolicyService();
const frameworkService = new FrameworkService();
const planningService = new PlanningService();

// Create MCP server
const server = new Server(
  {
    name: 'grc-agent',
    version: '1.0.0',
  },
  {
    capabilities: {
      tools: {},
      resources: {},
      prompts: {}
    }
  }
);

// ============================================================================
// TOOLS
// ============================================================================

server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      {
        name: 'generate_policy',
        description: 'Generate a security policy document aligned with compliance frameworks like NIST CSF, NIST 800-53, HIPAA, SOC 2, GDPR, etc.',
        inputSchema: {
          type: 'object',
          properties: {
            title: {
              type: 'string',
              description: 'Policy title (e.g., "Access Control Policy", "Data Protection Policy")'
            },
            organization: {
              type: 'string',
              description: 'Organization name'
            },
            frameworks: {
              type: 'array',
              items: {
                type: 'string',
                enum: ['NIST_CSF', 'NIST_800_53', 'NIST_CMMC', 'HIPAA', 'HITRUST', 'SOC2', 'SOX', 'GDPR', 'CCPA', 'GLBA', 'CIS_CONTROLS']
              },
              description: 'Compliance frameworks to align with'
            },
            scope: {
              type: 'string',
              description: 'Scope of the policy (optional)'
            },
            audience: {
              type: 'string',
              description: 'Target audience for the policy (optional)'
            }
          },
          required: ['title', 'organization', 'frameworks']
        }
      },
      {
        name: 'analyze_policy',
        description: 'Perform gap analysis on a policy against compliance frameworks. Returns coverage percentage, gaps, and remediation recommendations.',
        inputSchema: {
          type: 'object',
          properties: {
            policy_id: {
              type: 'string',
              description: 'ID of an existing policy to analyze'
            },
            policy_content: {
              type: 'string',
              description: 'Policy content text to analyze (if no policy_id provided)'
            },
            frameworks: {
              type: 'array',
              items: {
                type: 'string',
                enum: ['NIST_CSF', 'NIST_800_53', 'NIST_CMMC', 'HIPAA', 'HITRUST', 'SOC2', 'SOX', 'GDPR', 'CCPA', 'GLBA', 'CIS_CONTROLS']
              },
              description: 'Frameworks to analyze against'
            }
          },
          required: ['frameworks']
        }
      },
      {
        name: 'generate_plan',
        description: 'Generate a security or compliance plan (SSP, Incident Response, Breach Response, BC/DR, Test/Failover)',
        inputSchema: {
          type: 'object',
          properties: {
            type: {
              type: 'string',
              enum: ['SSP', 'IRP', 'BRP', 'BCDR', 'TEST_FAILOVER'],
              description: 'Plan type: SSP (System Security Plan), IRP (Incident Response), BRP (Breach Response), BCDR (Business Continuity/Disaster Recovery), TEST_FAILOVER'
            },
            title: {
              type: 'string',
              description: 'Plan title or system name'
            },
            organization: {
              type: 'string',
              description: 'Organization name'
            },
            frameworks: {
              type: 'array',
              items: {
                type: 'string',
                enum: ['NIST_CSF', 'NIST_800_53', 'NIST_CMMC', 'HIPAA', 'HITRUST', 'SOC2', 'SOX', 'GDPR', 'CCPA', 'GLBA', 'CIS_CONTROLS']
              },
              description: 'Frameworks to align with'
            }
          },
          required: ['type', 'title', 'organization']
        }
      },
      {
        name: 'list_frameworks',
        description: 'List all available compliance frameworks with their details',
        inputSchema: {
          type: 'object',
          properties: {}
        }
      },
      {
        name: 'get_framework_info',
        description: 'Get detailed information about a specific compliance framework including its controls',
        inputSchema: {
          type: 'object',
          properties: {
            framework: {
              type: 'string',
              enum: ['NIST_CSF', 'NIST_800_53', 'NIST_CMMC', 'HIPAA', 'HITRUST', 'SOC2', 'SOX', 'GDPR', 'CCPA', 'GLBA', 'CIS_CONTROLS'],
              description: 'Framework identifier'
            }
          },
          required: ['framework']
        }
      },
      {
        name: 'get_framework_controls',
        description: 'Get the list of controls for a specific framework',
        inputSchema: {
          type: 'object',
          properties: {
            framework: {
              type: 'string',
              enum: ['NIST_CSF', 'NIST_800_53', 'NIST_CMMC', 'HIPAA', 'HITRUST', 'SOC2', 'SOX', 'GDPR', 'CCPA', 'GLBA', 'CIS_CONTROLS'],
              description: 'Framework identifier'
            },
            category: {
              type: 'string',
              description: 'Filter by control category/family (optional)'
            }
          },
          required: ['framework']
        }
      },
      {
        name: 'compare_frameworks',
        description: 'Compare two compliance frameworks to identify overlapping and unique controls',
        inputSchema: {
          type: 'object',
          properties: {
            framework1: {
              type: 'string',
              enum: ['NIST_CSF', 'NIST_800_53', 'NIST_CMMC', 'HIPAA', 'HITRUST', 'SOC2', 'SOX', 'GDPR', 'CCPA', 'GLBA', 'CIS_CONTROLS'],
              description: 'First framework'
            },
            framework2: {
              type: 'string',
              enum: ['NIST_CSF', 'NIST_800_53', 'NIST_CMMC', 'HIPAA', 'HITRUST', 'SOC2', 'SOX', 'GDPR', 'CCPA', 'GLBA', 'CIS_CONTROLS'],
              description: 'Second framework'
            }
          },
          required: ['framework1', 'framework2']
        }
      },
      {
        name: 'list_policies',
        description: 'List all generated policies',
        inputSchema: {
          type: 'object',
          properties: {
            framework: {
              type: 'string',
              enum: ['NIST_CSF', 'NIST_800_53', 'NIST_CMMC', 'HIPAA', 'HITRUST', 'SOC2', 'SOX', 'GDPR', 'CCPA', 'GLBA', 'CIS_CONTROLS'],
              description: 'Filter by framework (optional)'
            }
          }
        }
      },
      {
        name: 'get_policy',
        description: 'Get a specific policy by ID',
        inputSchema: {
          type: 'object',
          properties: {
            policy_id: {
              type: 'string',
              description: 'Policy ID'
            }
          },
          required: ['policy_id']
        }
      },
      {
        name: 'list_plans',
        description: 'List all generated security plans',
        inputSchema: {
          type: 'object',
          properties: {
            type: {
              type: 'string',
              enum: ['SSP', 'IRP', 'BRP', 'BCDR', 'TEST_FAILOVER'],
              description: 'Filter by plan type (optional)'
            }
          }
        }
      },
      {
        name: 'get_plan',
        description: 'Get a specific plan by ID',
        inputSchema: {
          type: 'object',
          properties: {
            plan_id: {
              type: 'string',
              description: 'Plan ID'
            }
          },
          required: ['plan_id']
        }
      },
      {
        name: 'export_policy_markdown',
        description: 'Export a policy as Markdown document',
        inputSchema: {
          type: 'object',
          properties: {
            policy_id: {
              type: 'string',
              description: 'Policy ID to export'
            }
          },
          required: ['policy_id']
        }
      },
      {
        name: 'export_plan_markdown',
        description: 'Export a security plan as Markdown document',
        inputSchema: {
          type: 'object',
          properties: {
            plan_id: {
              type: 'string',
              description: 'Plan ID to export'
            }
          },
          required: ['plan_id']
        }
      },
      // Risk Assessment Tools
      {
        name: 'create_risk',
        description: 'Create a new risk assessment entry. Walk through identifying and documenting a risk with likelihood and impact ratings.',
        inputSchema: {
          type: 'object',
          properties: {
            name: {
              type: 'string',
              description: 'Risk name/title'
            },
            description: {
              type: 'string',
              description: 'Detailed description of the risk'
            },
            category: {
              type: 'string',
              enum: ['STRATEGIC', 'OPERATIONAL', 'FINANCIAL', 'COMPLIANCE', 'REPUTATIONAL', 'TECHNOLOGY', 'SECURITY', 'THIRD_PARTY', 'LEGAL', 'ENVIRONMENTAL'],
              description: 'Risk category'
            },
            likelihood: {
              type: 'number',
              minimum: 1,
              maximum: 5,
              description: 'Likelihood rating (1=Rare, 2=Unlikely, 3=Possible, 4=Likely, 5=Almost Certain)'
            },
            impact: {
              type: 'number',
              minimum: 1,
              maximum: 5,
              description: 'Impact rating (1=Negligible, 2=Minor, 3=Moderate, 4=Major, 5=Severe)'
            },
            asset_name: {
              type: 'string',
              description: 'Name of the affected asset (optional)'
            },
            threat_source: {
              type: 'string',
              description: 'Source of the threat (optional)'
            },
            vulnerabilities: {
              type: 'array',
              items: { type: 'string' },
              description: 'List of vulnerabilities (optional)'
            },
            owner: {
              type: 'string',
              description: 'Risk owner (optional)'
            }
          },
          required: ['name', 'description', 'category', 'likelihood', 'impact']
        }
      },
      {
        name: 'get_risk',
        description: 'Get details of a specific risk by ID',
        inputSchema: {
          type: 'object',
          properties: {
            risk_id: {
              type: 'string',
              description: 'Risk ID'
            }
          },
          required: ['risk_id']
        }
      },
      {
        name: 'list_risks',
        description: 'List all risks in the risk register, optionally filtered by category or status',
        inputSchema: {
          type: 'object',
          properties: {
            category: {
              type: 'string',
              enum: ['STRATEGIC', 'OPERATIONAL', 'FINANCIAL', 'COMPLIANCE', 'REPUTATIONAL', 'TECHNOLOGY', 'SECURITY', 'THIRD_PARTY', 'LEGAL', 'ENVIRONMENTAL'],
              description: 'Filter by category (optional)'
            },
            status: {
              type: 'string',
              enum: ['IDENTIFIED', 'ANALYZING', 'MITIGATING', 'MONITORING', 'MITIGATED', 'ACCEPTED', 'CLOSED'],
              description: 'Filter by status (optional)'
            }
          }
        }
      },
      {
        name: 'calculate_risk_score',
        description: 'Calculate and explain risk score based on likelihood and impact ratings',
        inputSchema: {
          type: 'object',
          properties: {
            likelihood: {
              type: 'number',
              minimum: 1,
              maximum: 5,
              description: 'Likelihood rating (1-5)'
            },
            impact: {
              type: 'number',
              minimum: 1,
              maximum: 5,
              description: 'Impact rating (1-5)'
            }
          },
          required: ['likelihood', 'impact']
        }
      },
      {
        name: 'calculate_quantitative_risk',
        description: 'Perform quantitative risk analysis using SLE/ALE methodology to calculate financial impact',
        inputSchema: {
          type: 'object',
          properties: {
            risk_id: {
              type: 'string',
              description: 'Risk ID to associate with (optional)'
            },
            asset_value: {
              type: 'number',
              description: 'Total value of the asset in dollars'
            },
            exposure_factor: {
              type: 'number',
              minimum: 0,
              maximum: 1,
              description: 'Percentage of asset value lost if risk occurs (0.0-1.0)'
            },
            annual_rate_of_occurrence: {
              type: 'number',
              minimum: 0,
              description: 'Expected number of occurrences per year (ARO)'
            },
            control_cost: {
              type: 'number',
              description: 'Annual cost of implementing control (optional)'
            },
            control_effectiveness: {
              type: 'number',
              minimum: 0,
              maximum: 1,
              description: 'Expected effectiveness of control (0.0-1.0) (optional)'
            }
          },
          required: ['asset_value', 'exposure_factor', 'annual_rate_of_occurrence']
        }
      },
      {
        name: 'create_treatment_plan',
        description: 'Create a risk treatment plan specifying how to handle a risk',
        inputSchema: {
          type: 'object',
          properties: {
            risk_id: {
              type: 'string',
              description: 'Risk ID to create treatment for'
            },
            treatment: {
              type: 'string',
              enum: ['ACCEPT', 'MITIGATE', 'TRANSFER', 'AVOID'],
              description: 'Treatment strategy'
            },
            description: {
              type: 'string',
              description: 'Description of the treatment approach'
            },
            responsible_party: {
              type: 'string',
              description: 'Person/team responsible for implementation'
            },
            target_date: {
              type: 'string',
              description: 'Target completion date (ISO format)'
            },
            budget: {
              type: 'number',
              description: 'Allocated budget (optional)'
            }
          },
          required: ['risk_id', 'treatment', 'description', 'responsible_party', 'target_date']
        }
      },
      {
        name: 'add_risk_control',
        description: 'Add a control to an existing risk to reduce its impact',
        inputSchema: {
          type: 'object',
          properties: {
            risk_id: {
              type: 'string',
              description: 'Risk ID to add control to'
            },
            control_name: {
              type: 'string',
              description: 'Name of the control'
            },
            control_type: {
              type: 'string',
              enum: ['PREVENTIVE', 'DETECTIVE', 'CORRECTIVE', 'DETERRENT', 'COMPENSATING'],
              description: 'Type of control'
            },
            description: {
              type: 'string',
              description: 'Control description'
            },
            effectiveness: {
              type: 'number',
              minimum: 0,
              maximum: 1,
              description: 'Estimated effectiveness (0.0-1.0)'
            },
            status: {
              type: 'string',
              enum: ['PLANNED', 'IMPLEMENTING', 'IMPLEMENTED', 'EFFECTIVE', 'INEFFECTIVE'],
              description: 'Implementation status'
            }
          },
          required: ['risk_id', 'control_name', 'control_type', 'description', 'effectiveness']
        }
      },
      {
        name: 'update_risk_status',
        description: 'Update the status of a risk',
        inputSchema: {
          type: 'object',
          properties: {
            risk_id: {
              type: 'string',
              description: 'Risk ID'
            },
            status: {
              type: 'string',
              enum: ['IDENTIFIED', 'ANALYZING', 'MITIGATING', 'MONITORING', 'MITIGATED', 'ACCEPTED', 'CLOSED'],
              description: 'New status'
            }
          },
          required: ['risk_id', 'status']
        }
      },
      {
        name: 'generate_risk_heatmap',
        description: 'Generate risk heatmap data showing distribution of risks by likelihood and impact',
        inputSchema: {
          type: 'object',
          properties: {}
        }
      },
      {
        name: 'generate_risk_report',
        description: 'Generate a comprehensive risk assessment report in Markdown format',
        inputSchema: {
          type: 'object',
          properties: {}
        }
      },
      {
        name: 'get_risk_guidance',
        description: 'Get guidance on risk assessment including likelihood/impact definitions and treatment recommendations',
        inputSchema: {
          type: 'object',
          properties: {
            guidance_type: {
              type: 'string',
              enum: ['likelihood', 'impact', 'treatment', 'all'],
              description: 'Type of guidance to retrieve'
            },
            risk_score: {
              type: 'number',
              description: 'Risk score for treatment recommendations (optional)'
            }
          },
          required: ['guidance_type']
        }
      },
      {
        name: 'initialize_risk_register',
        description: 'Initialize or reset the organization risk register',
        inputSchema: {
          type: 'object',
          properties: {
            organization_name: {
              type: 'string',
              description: 'Organization name'
            },
            risk_appetite: {
              type: 'object',
              properties: {
                low_threshold: { type: 'number', description: 'Max score for low risk (default: 4)' },
                medium_threshold: { type: 'number', description: 'Max score for medium risk (default: 9)' },
                high_threshold: { type: 'number', description: 'Max score for high risk (default: 16)' },
                acceptable_categories: { 
                  type: 'array', 
                  items: { type: 'string' },
                  description: 'Categories with higher tolerance'
                }
              }
            }
          },
          required: ['organization_name']
        }
      }
    ]
  };
});

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  try {
    switch (name) {
      case 'generate_policy': {
        const frameworks = (args?.frameworks as string[])?.map(f => f as ComplianceFramework) || [ComplianceFramework.NIST_CSF];
        const policy = await policyService.generatePolicy({
          title: args?.title as string,
          organization: args?.organization as string,
          frameworks,
          scope: args?.scope as string,
          audience: args?.audience as string
        });
        return {
          content: [{
            type: 'text',
            text: JSON.stringify({
              success: true,
              policy: {
                id: policy.id,
                title: policy.title,
                status: policy.status,
                version: policy.version,
                framework: policy.framework,
                createdAt: policy.createdAt
              },
              content: policy.content
            }, null, 2)
          }]
        };
      }

      case 'analyze_policy': {
        const frameworks = (args?.frameworks as string[])?.map(f => f as ComplianceFramework) || [ComplianceFramework.NIST_CSF];
        let policyContent = args?.policy_content as string;
        
        if (args?.policy_id) {
          const policy = policyService.getPolicy(args.policy_id as string);
          if (!policy) {
            return {
              content: [{ type: 'text', text: JSON.stringify({ error: 'Policy not found' }) }],
              isError: true
            };
          }
          policyContent = policy.content;
        }

        if (!policyContent) {
          return {
            content: [{ type: 'text', text: JSON.stringify({ error: 'Either policy_id or policy_content is required' }) }],
            isError: true
          };
        }

        const analysis = await frameworkService.analyzePolicy({
          policyId: args?.policy_id as string || 'adhoc',
          frameworks,
          organization: 'Analysis',
          context: ''
        }, policyContent);

        return {
          content: [{
            type: 'text',
            text: JSON.stringify({
              success: true,
              analysis: {
                framework: analysis.framework,
                totalControls: analysis.totalControls,
                coveredControls: analysis.coveredControls,
                coverage: `${analysis.coverage}%`,
                complianceScore: `${Math.round(analysis.complianceScore * 100)}%`,
                gapsCount: analysis.gaps.length,
                gaps: analysis.gaps.slice(0, 10),
                recommendations: analysis.recommendations.slice(0, 5)
              }
            }, null, 2)
          }]
        };
      }

      case 'generate_plan': {
        const planType = args?.type as PlanType;
        const frameworks = (args?.frameworks as string[])?.map(f => f as ComplianceFramework) || [ComplianceFramework.NIST_CSF];
        
        const plan = await planningService.generatePlan({
          type: planType,
          title: args?.title as string,
          organization: args?.organization as string,
          frameworks,
          context: ''
        });

        const markdown = planningService.exportPlanAsMarkdown(plan.id);

        return {
          content: [{
            type: 'text',
            text: JSON.stringify({
              success: true,
              plan: {
                id: plan.id,
                title: plan.title,
                type: plan.type,
                status: plan.status,
                sectionsCount: plan.sections.length,
                createdAt: plan.createdAt
              },
              content: markdown
            }, null, 2)
          }]
        };
      }

      case 'list_frameworks': {
        const frameworks = FrameworkRegistry.getAllFrameworks();
        return {
          content: [{
            type: 'text',
            text: JSON.stringify({
              frameworks: frameworks.map(fw => ({
                id: fw.id,
                name: fw.name,
                version: fw.version,
                description: fw.description,
                totalControls: fw.total_controls,
                categories: fw.categories?.length || 0
              }))
            }, null, 2)
          }]
        };
      }

      case 'get_framework_info': {
        const framework = args?.framework as ComplianceFramework;
        const summary = FrameworkRegistry.getFrameworkSummary(framework);
        const fw = FrameworkRegistry.getFramework(framework);
        
        return {
          content: [{
            type: 'text',
            text: JSON.stringify({
              framework: {
                id: fw?.id,
                name: fw?.name,
                version: fw?.version,
                description: fw?.description,
                totalControls: fw?.total_controls,
                categories: fw?.categories
              },
              summary
            }, null, 2)
          }]
        };
      }

      case 'get_framework_controls': {
        const framework = args?.framework as ComplianceFramework;
        const controls = FrameworkRegistry.getFrameworkControls(framework);
        const category = args?.category as string;

        const filteredControls = category
          ? controls.filter(c => c.category?.toLowerCase().includes(category.toLowerCase()))
          : controls;

        return {
          content: [{
            type: 'text',
            text: JSON.stringify({
              framework,
              totalControls: filteredControls.length,
              controls: filteredControls.slice(0, 50).map(c => ({
                id: c.id,
                title: c.title,
                category: c.category,
                description: c.description?.substring(0, 200)
              }))
            }, null, 2)
          }]
        };
      }

      case 'compare_frameworks': {
        const comparison = frameworkService.compareFrameworks(
          args?.framework1 as ComplianceFramework,
          args?.framework2 as ComplianceFramework
        );

        return {
          content: [{
            type: 'text',
            text: JSON.stringify({
              framework1: args?.framework1,
              framework2: args?.framework2,
              comparison: {
                overlappingControls: comparison.overlapping,
                uniqueToFirst: comparison.unique_to_first,
                uniqueToSecond: comparison.unique_to_second
              }
            }, null, 2)
          }]
        };
      }

      case 'list_policies': {
        const framework = args?.framework as ComplianceFramework;
        const policies = framework
          ? policyService.listPoliciesByFramework(framework)
          : policyService.listPolicies();

        return {
          content: [{
            type: 'text',
            text: JSON.stringify({
              count: policies.length,
              policies: policies.map(p => ({
                id: p.id,
                title: p.title,
                framework: p.framework,
                status: p.status,
                version: p.version,
                createdAt: p.createdAt
              }))
            }, null, 2)
          }]
        };
      }

      case 'get_policy': {
        const policy = policyService.getPolicy(args?.policy_id as string);
        if (!policy) {
          return {
            content: [{ type: 'text', text: JSON.stringify({ error: 'Policy not found' }) }],
            isError: true
          };
        }
        return {
          content: [{
            type: 'text',
            text: JSON.stringify({ policy }, null, 2)
          }]
        };
      }

      case 'list_plans': {
        const planType = args?.type as PlanType;
        const plans = planType
          ? planningService.listPlansByType(planType)
          : planningService.listPlans();

        return {
          content: [{
            type: 'text',
            text: JSON.stringify({
              count: plans.length,
              plans: plans.map(p => ({
                id: p.id,
                title: p.title,
                type: p.type,
                status: p.status,
                createdAt: p.createdAt
              }))
            }, null, 2)
          }]
        };
      }

      case 'get_plan': {
        const plan = planningService.getPlan(args?.plan_id as string);
        if (!plan) {
          return {
            content: [{ type: 'text', text: JSON.stringify({ error: 'Plan not found' }) }],
            isError: true
          };
        }
        return {
          content: [{
            type: 'text',
            text: JSON.stringify({ plan }, null, 2)
          }]
        };
      }

      case 'export_policy_markdown': {
        const markdown = policyService.exportPolicyAsMarkdown(args?.policy_id as string);
        if (!markdown) {
          return {
            content: [{ type: 'text', text: JSON.stringify({ error: 'Policy not found' }) }],
            isError: true
          };
        }
        return {
          content: [{ type: 'text', text: markdown }]
        };
      }

      case 'export_plan_markdown': {
        const markdown = planningService.exportPlanAsMarkdown(args?.plan_id as string);
        if (!markdown) {
          return {
            content: [{ type: 'text', text: JSON.stringify({ error: 'Plan not found' }) }],
            isError: true
          };
        }
        return {
          content: [{ type: 'text', text: markdown }]
        };
      }

      // Risk Assessment Tool Handlers
      case 'create_risk': {
        const risk = riskAssessmentService.createRisk({
          name: args?.name as string,
          description: args?.description as string,
          category: args?.category as RiskCategory,
          likelihood: args?.likelihood as RiskLikelihood,
          impact: args?.impact as RiskImpact,
          assetName: args?.asset_name as string,
          threatSource: args?.threat_source as string,
          vulnerabilities: args?.vulnerabilities as string[],
          owner: args?.owner as string
        });
        
        const riskLevel = riskAssessmentService.getRiskLevel(risk.inherentRiskScore);
        
        return {
          content: [{
            type: 'text',
            text: JSON.stringify({
              success: true,
              risk: {
                id: risk.id,
                name: risk.name,
                category: risk.category,
                inherentRiskScore: risk.inherentRiskScore,
                riskLevel: riskLevel.level,
                levelDescription: riskLevel.description,
                likelihood: risk.likelihood,
                impact: risk.impact,
                status: risk.status,
                owner: risk.owner,
                nextReviewDate: risk.nextReviewDate
              },
              message: `Risk "${risk.name}" created with score ${risk.inherentRiskScore} (${riskLevel.level})`
            }, null, 2)
          }]
        };
      }

      case 'get_risk': {
        const risk = riskAssessmentService.getRisk(args?.risk_id as string);
        if (!risk) {
          return {
            content: [{ type: 'text', text: JSON.stringify({ error: 'Risk not found' }) }],
            isError: true
          };
        }
        const riskLevel = riskAssessmentService.getRiskLevel(risk.inherentRiskScore);
        return {
          content: [{
            type: 'text',
            text: JSON.stringify({ 
              risk,
              riskLevel: riskLevel.level,
              levelDescription: riskLevel.description
            }, null, 2)
          }]
        };
      }

      case 'list_risks': {
        let risks;
        if (args?.category) {
          risks = riskAssessmentService.getRisksByCategory(args.category as RiskCategory);
        } else if (args?.status) {
          risks = riskAssessmentService.getRisksByStatus(args.status as RiskStatus);
        } else {
          risks = riskAssessmentService.getAllRisks();
        }
        
        return {
          content: [{
            type: 'text',
            text: JSON.stringify({
              count: risks.length,
              risks: risks.map(r => ({
                id: r.id,
                name: r.name,
                category: r.category,
                inherentRiskScore: r.inherentRiskScore,
                residualRiskScore: r.residualRiskScore,
                riskLevel: riskAssessmentService.getRiskLevel(r.inherentRiskScore).level,
                status: r.status,
                treatment: r.treatment,
                owner: r.owner
              }))
            }, null, 2)
          }]
        };
      }

      case 'calculate_risk_score': {
        const likelihood = args?.likelihood as RiskLikelihood;
        const impact = args?.impact as RiskImpact;
        const score = riskAssessmentService.calculateRiskScore(likelihood, impact);
        const level = riskAssessmentService.getRiskLevel(score);
        const likelihoodDesc = riskAssessmentService.getLikelihoodDescription(likelihood);
        const impactDesc = riskAssessmentService.getImpactDescription(impact);
        
        return {
          content: [{
            type: 'text',
            text: JSON.stringify({
              calculation: {
                likelihood: { rating: likelihood, name: likelihoodDesc.name, description: likelihoodDesc.description },
                impact: { rating: impact, name: impactDesc.name, description: impactDesc.description, financialRange: impactDesc.financial },
                formula: `${likelihood} × ${impact} = ${score}`,
                score,
                level: level.level,
                color: level.color,
                description: level.description
              }
            }, null, 2)
          }]
        };
      }

      case 'calculate_quantitative_risk': {
        const result = riskAssessmentService.calculateQuantitativeRisk({
          riskId: args?.risk_id as string || 'adhoc',
          assetValue: args?.asset_value as number,
          exposureFactor: args?.exposure_factor as number,
          annualRateOfOccurrence: args?.annual_rate_of_occurrence as number,
          controlCost: args?.control_cost as number,
          controlEffectiveness: args?.control_effectiveness as number
        });
        
        return {
          content: [{
            type: 'text',
            text: JSON.stringify({
              quantitativeAnalysis: {
                assetValue: `$${result.assetValue.toLocaleString()}`,
                exposureFactor: `${(result.exposureFactor * 100).toFixed(1)}%`,
                singleLossExpectancy: `$${result.singleLossExpectancy.toLocaleString()}`,
                annualRateOfOccurrence: result.annualRateOfOccurrence,
                annualLossExpectancy: `$${result.annualLossExpectancy.toLocaleString()}`,
                returnOnInvestment: result.returnOnInvestment !== undefined 
                  ? `${(result.returnOnInvestment * 100).toFixed(1)}%` 
                  : 'Not calculated (provide control_cost and control_effectiveness)',
                formulas: {
                  SLE: 'Asset Value × Exposure Factor',
                  ALE: 'SLE × Annual Rate of Occurrence',
                  ROI: '(Risk Reduction - Control Cost) / Control Cost'
                }
              }
            }, null, 2)
          }]
        };
      }

      case 'create_treatment_plan': {
        const plan = riskAssessmentService.createTreatmentPlan({
          riskId: args?.risk_id as string,
          treatment: args?.treatment as RiskTreatment,
          description: args?.description as string,
          responsibleParty: args?.responsible_party as string,
          targetDate: args?.target_date as string,
          budget: args?.budget as number
        });
        
        if (!plan) {
          return {
            content: [{ type: 'text', text: JSON.stringify({ error: 'Risk not found' }) }],
            isError: true
          };
        }
        
        return {
          content: [{
            type: 'text',
            text: JSON.stringify({
              success: true,
              treatmentPlan: plan,
              message: `Treatment plan created for risk ${args?.risk_id}`
            }, null, 2)
          }]
        };
      }

      case 'add_risk_control': {
        const risk = riskAssessmentService.applyControls(args?.risk_id as string, [{
          id: `CTRL-${Date.now()}`,
          name: args?.control_name as string,
          type: args?.control_type as 'PREVENTIVE' | 'DETECTIVE' | 'CORRECTIVE' | 'DETERRENT' | 'COMPENSATING',
          description: args?.description as string,
          effectiveness: args?.effectiveness as number,
          status: (args?.status as string) || 'IMPLEMENTED'
        }]);
        
        if (!risk) {
          return {
            content: [{ type: 'text', text: JSON.stringify({ error: 'Risk not found' }) }],
            isError: true
          };
        }
        
        const newLevel = riskAssessmentService.getRiskLevel(risk.residualRiskScore);
        
        return {
          content: [{
            type: 'text',
            text: JSON.stringify({
              success: true,
              riskId: risk.id,
              controlAdded: args?.control_name,
              inherentRiskScore: risk.inherentRiskScore,
              residualRiskScore: risk.residualRiskScore,
              residualRiskLevel: newLevel.level,
              totalControls: risk.existingControls.length,
              message: `Control added. Residual risk: ${risk.residualRiskScore} (${newLevel.level})`
            }, null, 2)
          }]
        };
      }

      case 'update_risk_status': {
        const risk = riskAssessmentService.updateRiskStatus(
          args?.risk_id as string,
          args?.status as RiskStatus
        );
        
        if (!risk) {
          return {
            content: [{ type: 'text', text: JSON.stringify({ error: 'Risk not found' }) }],
            isError: true
          };
        }
        
        return {
          content: [{
            type: 'text',
            text: JSON.stringify({
              success: true,
              riskId: risk.id,
              newStatus: risk.status,
              nextReviewDate: risk.nextReviewDate
            }, null, 2)
          }]
        };
      }

      case 'generate_risk_heatmap': {
        const heatmap = riskAssessmentService.generateHeatmap();
        return {
          content: [{
            type: 'text',
            text: JSON.stringify({
              heatmap: {
                totalRisks: heatmap.totalRisks,
                summary: {
                  critical: heatmap.criticalCount,
                  high: heatmap.highCount,
                  medium: heatmap.mediumCount,
                  low: heatmap.lowCount
                },
                categoryBreakdown: heatmap.categoryBreakdown,
                statusBreakdown: heatmap.statusBreakdown,
                matrix: heatmap.cells.filter(c => c.count > 0).map(c => ({
                  likelihood: c.likelihood,
                  impact: c.impact,
                  count: c.count,
                  color: c.color,
                  risks: c.riskIds
                }))
              }
            }, null, 2)
          }]
        };
      }

      case 'generate_risk_report': {
        const report = riskAssessmentService.generateRiskReport();
        return {
          content: [{ type: 'text', text: report }]
        };
      }

      case 'get_risk_guidance': {
        const guidanceType = args?.guidance_type as string;
        const guidance: Record<string, unknown> = {};
        
        if (guidanceType === 'likelihood' || guidanceType === 'all') {
          guidance.likelihood = {
            1: riskAssessmentService.getLikelihoodDescription(1),
            2: riskAssessmentService.getLikelihoodDescription(2),
            3: riskAssessmentService.getLikelihoodDescription(3),
            4: riskAssessmentService.getLikelihoodDescription(4),
            5: riskAssessmentService.getLikelihoodDescription(5)
          };
        }
        
        if (guidanceType === 'impact' || guidanceType === 'all') {
          guidance.impact = {
            1: riskAssessmentService.getImpactDescription(1),
            2: riskAssessmentService.getImpactDescription(2),
            3: riskAssessmentService.getImpactDescription(3),
            4: riskAssessmentService.getImpactDescription(4),
            5: riskAssessmentService.getImpactDescription(5)
          };
        }
        
        if (guidanceType === 'treatment' || guidanceType === 'all') {
          const score = args?.risk_score as number || 12;
          guidance.treatmentRecommendations = riskAssessmentService.getTreatmentRecommendation(score);
          guidance.riskLevels = {
            low: { range: '1-4', description: 'Accept with monitoring' },
            medium: { range: '5-9', description: 'Plan mitigation' },
            high: { range: '10-16', description: 'Prioritize treatment' },
            critical: { range: '17-25', description: 'Immediate action required' }
          };
        }
        
        return {
          content: [{
            type: 'text',
            text: JSON.stringify({ guidance }, null, 2)
          }]
        };
      }

      case 'initialize_risk_register': {
        const riskAppetite = args?.risk_appetite as { 
          low_threshold?: number; 
          medium_threshold?: number; 
          high_threshold?: number;
          acceptable_categories?: string[];
        } || {};
        
        const register = riskAssessmentService.initializeRiskRegister(
          args?.organization_name as string,
          {
            lowThreshold: riskAppetite.low_threshold || 4,
            mediumThreshold: riskAppetite.medium_threshold || 9,
            highThreshold: riskAppetite.high_threshold || 16,
            acceptableCategories: (riskAppetite.acceptable_categories || []) as RiskCategory[]
          }
        );
        
        return {
          content: [{
            type: 'text',
            text: JSON.stringify({
              success: true,
              register: {
                id: register.id,
                organizationName: register.organizationName,
                createdDate: register.createdDate,
                version: register.version,
                riskAppetite: register.riskAppetite
              },
              message: `Risk register initialized for ${register.organizationName}`
            }, null, 2)
          }]
        };
      }

      default:
        return {
          content: [{ type: 'text', text: JSON.stringify({ error: `Unknown tool: ${name}` }) }],
          isError: true
        };
    }
  } catch (error) {
    return {
      content: [{
        type: 'text',
        text: JSON.stringify({ error: error instanceof Error ? error.message : String(error) })
      }],
      isError: true
    };
  }
});

// ============================================================================
// RESOURCES
// ============================================================================

server.setRequestHandler(ListResourcesRequestSchema, async () => {
  const frameworks = FrameworkRegistry.getAllFrameworks();
  
  return {
    resources: [
      ...frameworks.map(fw => ({
        uri: `grc://frameworks/${fw.id}`,
        name: fw.name,
        description: `${fw.name} v${fw.version} - ${fw.total_controls} controls`,
        mimeType: 'application/json'
      })),
      {
        uri: 'grc://frameworks/comparison-matrix',
        name: 'Framework Comparison Matrix',
        description: 'Cross-reference matrix of all compliance frameworks',
        mimeType: 'application/json'
      }
    ]
  };
});

server.setRequestHandler(ReadResourceRequestSchema, async (request) => {
  const { uri } = request.params;

  if (uri === 'grc://frameworks/comparison-matrix') {
    const frameworks = FrameworkRegistry.getAllFrameworks();
    const matrix: Record<string, Record<string, number>> = {};

    for (const fw1 of frameworks) {
      matrix[fw1.id] = {};
      for (const fw2 of frameworks) {
        if (fw1.id === fw2.id) {
          matrix[fw1.id][fw2.id] = fw1.total_controls;
        } else {
          const comparison = frameworkService.compareFrameworks(
            fw1.id as ComplianceFramework,
            fw2.id as ComplianceFramework
          );
          matrix[fw1.id][fw2.id] = comparison.overlapping;
        }
      }
    }

    return {
      contents: [{
        uri,
        mimeType: 'application/json',
        text: JSON.stringify({ comparisonMatrix: matrix }, null, 2)
      }]
    };
  }

  const match = uri.match(/^grc:\/\/frameworks\/(.+)$/);
  if (match) {
    const frameworkId = match[1] as ComplianceFramework;
    const framework = FrameworkRegistry.getFramework(frameworkId);
    
    if (framework) {
      return {
        contents: [{
          uri,
          mimeType: 'application/json',
          text: JSON.stringify(framework, null, 2)
        }]
      };
    }
  }

  throw new Error(`Resource not found: ${uri}`);
});

// ============================================================================
// PROMPTS
// ============================================================================

server.setRequestHandler(ListPromptsRequestSchema, async () => {
  return {
    prompts: [
      {
        name: 'policy_review',
        description: 'Review a policy document for compliance gaps and provide recommendations',
        arguments: [
          {
            name: 'policy_content',
            description: 'The policy document text to review',
            required: true
          },
          {
            name: 'frameworks',
            description: 'Comma-separated list of frameworks (e.g., NIST_CSF,HIPAA)',
            required: false
          }
        ]
      },
      {
        name: 'compliance_roadmap',
        description: 'Generate a compliance implementation roadmap for an organization',
        arguments: [
          {
            name: 'organization',
            description: 'Organization name',
            required: true
          },
          {
            name: 'frameworks',
            description: 'Target compliance frameworks',
            required: true
          },
          {
            name: 'current_state',
            description: 'Description of current security posture',
            required: false
          }
        ]
      },
      {
        name: 'incident_response_guide',
        description: 'Generate an incident response guide based on incident type',
        arguments: [
          {
            name: 'incident_type',
            description: 'Type of incident (e.g., ransomware, data breach, phishing)',
            required: true
          },
          {
            name: 'organization',
            description: 'Organization name',
            required: true
          }
        ]
      }
    ]
  };
});

server.setRequestHandler(GetPromptRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  switch (name) {
    case 'policy_review': {
      const frameworks = (args?.frameworks as string)?.split(',') || ['NIST_CSF'];
      return {
        messages: [
          {
            role: 'user',
            content: {
              type: 'text',
              text: `Please review the following policy document for compliance with ${frameworks.join(', ')}:

---
${args?.policy_content}
---

Analyze this policy for:
1. Compliance coverage with the specified frameworks
2. Missing controls or requirements
3. Areas that need strengthening
4. Specific recommendations for improvement

Use the analyze_policy tool to perform a detailed gap analysis, then provide a comprehensive review with actionable recommendations.`
            }
          }
        ]
      };
    }

    case 'compliance_roadmap': {
      return {
        messages: [
          {
            role: 'user',
            content: {
              type: 'text',
              text: `Create a compliance implementation roadmap for ${args?.organization} targeting the following frameworks: ${args?.frameworks}

${args?.current_state ? `Current security posture: ${args.current_state}` : ''}

Please:
1. Use get_framework_info to understand the requirements of each framework
2. Use compare_frameworks to identify overlapping controls
3. Generate policies for key areas using generate_policy
4. Create a phased implementation plan with:
   - Quick wins (0-30 days)
   - Short-term goals (30-90 days)
   - Medium-term objectives (90-180 days)
   - Long-term compliance (180+ days)
5. Include resource requirements and success metrics`
            }
          }
        ]
      };
    }

    case 'incident_response_guide': {
      return {
        messages: [
          {
            role: 'user',
            content: {
              type: 'text',
              text: `Generate an incident response guide for ${args?.organization} for handling a ${args?.incident_type} incident.

Please:
1. Use generate_plan with type IRP to create a formal incident response plan
2. Provide specific step-by-step procedures for:
   - Detection and identification
   - Containment strategies
   - Eradication steps
   - Recovery procedures
   - Post-incident activities
3. Include communication templates
4. Reference relevant compliance requirements from frameworks like NIST CSF and NIST 800-53
5. Include a checklist format for incident handlers`
            }
          }
        ]
      };
    }

    default:
      throw new Error(`Unknown prompt: ${name}`);
  }
});

// ============================================================================
// START SERVER
// ============================================================================

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error('GRC Agent MCP Server running on stdio');
}

main().catch((error) => {
  console.error('Fatal error:', error);
  process.exit(1);
});

/**
 * Main API Server - REST API for GRC Agent
 * Vite handles the frontend serving in development
 */

import express, { Request, Response, NextFunction } from 'express';
import { fileURLToPath } from 'url';
import path from 'path';
import 'dotenv/config';
import GRCAgent from './agent/index.js';
import FrameworkRegistry from './frameworks/index.js';
import {
  GRCAgentRequest,
  ComplianceFramework,
  ControlImplementationRequest,
  ProcedureRequest,
  ClientDocumentIngestionRequest,
  DocumentationGapAnalysisRequest,
  GapExemptionRequest,
  ImprovementInsightRequest,
  ImprovementOutcomeUpdateRequest
} from './types/framework.js';
import { ControlImplementationService } from './services/control-implementation-service.js';
import { localStoreService } from './services/local-store-service.js';
import { DocumentIngestionService } from './services/document-ingestion-service.js';
import { ExemptionService } from './services/exemption-service.js';
import { DocumentationGapService } from './services/documentation-gap-service.js';
import { ImprovementPlaybookService } from './services/improvement-playbook-service.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS for Vite dev server
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

// Create agent instance
const agent = new GRCAgent();

// Create control implementation service
const controlService = new ControlImplementationService();
const documentIngestionService = new DocumentIngestionService();
const exemptionService = new ExemptionService();
const documentationGapService = new DocumentationGapService();
const improvementPlaybookService = new ImprovementPlaybookService();

// ====================
// Routes
// ====================

// Health check
app.get('/health', (req: Request, res: Response) => {
  res.json({
    status: 'ok',
    service: 'grc-agent-api',
    timestamp: new Date().toISOString()
  });
});

// API Documentation
app.get('/api', (req: Request, res: Response) => {
  res.json({
    name: 'GRC Agent API',
    version: '1.0.0',
    description: 'Governance, Risk, Compliance AI Assistant API',
    endpoints: {
      'POST /api/grc/process': 'Process user message through agent',
      'GET /api/grc/frameworks': 'List all available frameworks',
      'GET /api/grc/frameworks/:id': 'Get framework details',
      'GET /api/grc/frameworks/:id/controls': 'List framework controls',
      'GET /api/grc/search': 'Search frameworks and controls',
      'GET /api/grc/agent': 'Get agent info and conversation history',
      'POST /api/grc/agent/clear': 'Clear conversation history',
      'GET /api/grc/offline/package': 'Get full local offline package snapshot',
      'POST /api/grc/documents/ingest': 'Ingest client artifacts (policy/procedure/plan)',
      'POST /api/grc/documentation/gap-analysis': 'Run documentation coverage gap analysis',
      'POST /api/grc/exemptions': 'Create a risk acceptance exemption record',
      'GET /api/grc/improvement/insights': 'List lessons learned and improvement insights',
      'GET /api/grc/improvement/outcomes': 'List tracked improvement-injection outcomes',
      'PUT /api/grc/improvement/outcomes/:id': 'Update improvement outcome status and metrics'
    }
  });
});

// Process message through agent
app.post('/api/grc/process', async (req: Request, res: Response) => {
  try {
    const { message, userId, conversationId } = req.body;

    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    const agentRequest: GRCAgentRequest = {
      message,
      userId: userId || 'anonymous',
      conversationId: conversationId || 'default',
      context: req.body.context
    };

    const response = await agent.processMessage(agentRequest);

    res.json({
      success: true,
      ...response
    });
  } catch (error) {
    console.error('Agent error:', error);
    improvementPlaybookService.recordRuntimeError(
      error instanceof Error ? error.message : String(error),
      '/api/grc/process'
    );
    res.status(500).json({
      success: false,
      error: 'Failed to process message'
    });
  }
});

// List all frameworks
app.get('/api/grc/frameworks', (req: Request, res: Response) => {
  try {
    const frameworks = FrameworkRegistry.getAllFrameworks();
    res.json({
      success: true,
      count: frameworks.length,
      frameworks
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve frameworks' });
  }
});

// Get framework details
app.get('/api/grc/frameworks/:id', (req: Request, res: Response) => {
  try {
    const framework = FrameworkRegistry.getFramework(req.params.id as any);

    if (!framework) {
      return res.status(404).json({ error: 'Framework not found' });
    }

    res.json({
      success: true,
      framework,
      summary: FrameworkRegistry.getFrameworkSummary(req.params.id as any)
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve framework' });
  }
});

// Get framework controls
app.get('/api/grc/frameworks/:id/controls', (req: Request, res: Response) => {
  try {
    const controls = FrameworkRegistry.getFrameworkControls(req.params.id as any);

    if (!controls) {
      return res.status(404).json({ error: 'Framework not found' });
    }

    res.json({
      success: true,
      frameworkId: req.params.id,
      count: controls.length,
      controls
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve controls' });
  }
});

// Search frameworks and controls
app.get('/api/grc/search', (req: Request, res: Response) => {
  try {
    const query = req.query.q as string;

    if (!query || query.length < 2) {
      return res.status(400).json({ error: 'Search query must be at least 2 characters' });
    }

    const results = FrameworkRegistry.globalSearch(query);

    res.json({
      success: true,
      query,
      resultCount: results.length,
      results: results.slice(0, 20) // Limit to 20 results
    });
  } catch (error) {
    res.status(500).json({ error: 'Search failed' });
  }
});

// ====================
// Policy Management
// ====================

// List all policies
app.get('/api/grc/policies', (req: Request, res: Response) => {
  try {
    const policies = agent.listPolicies();
    res.json({
      success: true,
      count: policies.length,
      policies
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to list policies' });
  }
});

// Get specific policy
app.get('/api/grc/policies/:id', (req: Request, res: Response) => {
  try {
    const policy = agent.getPolicy(req.params.id);
    if (!policy) {
      return res.status(404).json({ error: 'Policy not found' });
    }
    res.json({
      success: true,
      policy
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve policy' });
  }
});

// Export policy as markdown
app.get('/api/grc/policies/:id/export', (req: Request, res: Response) => {
  try {
    const markdown = agent.exportPolicyAsMarkdown(req.params.id);
    if (!markdown) {
      return res.status(404).json({ error: 'Policy not found' });
    }
    res.setHeader('Content-Type', 'text/markdown');
    res.setHeader('Content-Disposition', `attachment; filename="policy-${req.params.id}.md"`);
    res.send(markdown);
  } catch (error) {
    res.status(500).json({ error: 'Failed to export policy' });
  }
});

// ====================
// Plan Management
// ====================

// List all plans
app.get('/api/grc/plans', (req: Request, res: Response) => {
  try {
    const plans = agent.listPlans();
    res.json({
      success: true,
      count: plans.length,
      plans
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to list plans' });
  }
});

// Get specific plan
app.get('/api/grc/plans/:id', (req: Request, res: Response) => {
  try {
    const plan = agent.getPlan(req.params.id);
    if (!plan) {
      return res.status(404).json({ error: 'Plan not found' });
    }
    res.json({
      success: true,
      plan
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve plan' });
  }
});

// Export plan as markdown
app.get('/api/grc/plans/:id/export', (req: Request, res: Response) => {
  try {
    const markdown = agent.exportPlanAsMarkdown(req.params.id);
    if (!markdown) {
      return res.status(404).json({ error: 'Plan not found' });
    }
    res.setHeader('Content-Type', 'text/markdown');
    res.setHeader('Content-Disposition', `attachment; filename="plan-${req.params.id}.md"`);
    res.send(markdown);
  } catch (error) {
    res.status(500).json({ error: 'Failed to export plan' });
  }
});

// Get agent info
app.get('/api/grc/agent', (req: Request, res: Response) => {
  try {
    res.json({
      success: true,
      agent: {
        name: 'GRC Agent',
        version: '1.0.0',
        status: 'ready',
        capabilities: [
          'Policy Generation',
          'Gap Analysis',
          'Plan Generation',
          'Framework Information'
        ]
      },
      conversationHistory: agent.getConversationHistory()
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve agent info' });
  }
});

// Clear conversation history
app.post('/api/grc/agent/clear', (req: Request, res: Response) => {
  try {
    agent.clearHistory();
    res.json({
      success: true,
      message: 'Conversation history cleared'
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to clear history' });
  }
});

// ====================
// Control Implementations
// ====================

// List all implemented controls
app.get('/api/grc/controls', (req: Request, res: Response) => {
  try {
    const { framework, organization } = req.query;
    
    let controls;
    if (framework) {
      controls = controlService.getControlsByFramework(framework as ComplianceFramework);
    } else if (organization) {
      controls = controlService.getControlsByOrganization(organization as string);
    } else {
      controls = controlService.getAllControls();
    }
    
    res.json({
      success: true,
      count: controls.length,
      controls
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve controls' });
  }
});

// Get controls for a specific framework control requirement
app.get('/api/grc/frameworks/:frameworkId/controls/:controlId/implementations', (req: Request, res: Response) => {
  try {
    const { frameworkId, controlId } = req.params;
    const controls = controlService.getControlsForFrameworkControl(
      frameworkId as ComplianceFramework,
      controlId
    );
    
    const summary = controlService.getImplementationSummary(
      frameworkId as ComplianceFramework,
      controlId
    );
    
    res.json({
      success: true,
      frameworkControlId: controlId,
      framework: frameworkId,
      summary,
      implementedControls: controls
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve control implementations' });
  }
});

// Create a new implemented control
app.post('/api/grc/controls', (req: Request, res: Response) => {
  try {
    const controlRequest: ControlImplementationRequest = req.body;
    
    if (!controlRequest.frameworkControlId || !controlRequest.framework || !controlRequest.organization) {
      return res.status(400).json({ error: 'frameworkControlId, framework, and organization are required' });
    }
    
    const control = controlService.createControl(controlRequest);
    res.status(201).json({
      success: true,
      control
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create control' });
  }
});

// Get a specific implemented control
app.get('/api/grc/controls/:id', (req: Request, res: Response) => {
  try {
    const control = controlService.getControl(req.params.id);
    if (!control) {
      return res.status(404).json({ error: 'Control not found' });
    }
    res.json({
      success: true,
      control
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve control' });
  }
});

// Update an implemented control
app.put('/api/grc/controls/:id', (req: Request, res: Response) => {
  try {
    const updates: Partial<ControlImplementationRequest> = req.body;
    const control = controlService.updateControl(req.params.id, updates);
    
    if (!control) {
      return res.status(404).json({ error: 'Control not found' });
    }
    
    res.json({
      success: true,
      control
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update control' });
  }
});

// Delete an implemented control
app.delete('/api/grc/controls/:id', (req: Request, res: Response) => {
  try {
    const deleted = controlService.deleteControl(req.params.id);
    if (!deleted) {
      return res.status(404).json({ error: 'Control not found' });
    }
    res.json({
      success: true,
      message: 'Control deleted'
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete control' });
  }
});

// ====================
// Procedures
// ====================

// Get procedures for a control
app.get('/api/grc/controls/:controlId/procedures', (req: Request, res: Response) => {
  try {
    const procedures = controlService.getProceduresForControl(req.params.controlId);
    res.json({
      success: true,
      count: procedures.length,
      procedures
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve procedures' });
  }
});

// Create a procedure for a control
app.post('/api/grc/controls/:controlId/procedures', (req: Request, res: Response) => {
  try {
    const procedureRequest: ProcedureRequest = {
      ...req.body,
      controlId: req.params.controlId
    };
    
    if (!procedureRequest.procedureName || !procedureRequest.frequency) {
      return res.status(400).json({ error: 'procedureName and frequency are required' });
    }
    
    const procedure = controlService.createProcedure(procedureRequest);
    if (!procedure) {
      return res.status(404).json({ error: 'Control not found' });
    }
    
    res.status(201).json({
      success: true,
      procedure
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create procedure' });
  }
});

// Get a specific procedure
app.get('/api/grc/procedures/:id', (req: Request, res: Response) => {
  try {
    const procedure = controlService.getProcedure(req.params.id);
    if (!procedure) {
      return res.status(404).json({ error: 'Procedure not found' });
    }
    res.json({
      success: true,
      procedure
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve procedure' });
  }
});

// Update a procedure
app.put('/api/grc/procedures/:id', (req: Request, res: Response) => {
  try {
    const updates: Partial<ProcedureRequest> = req.body;
    const procedure = controlService.updateProcedure(req.params.id, updates);
    
    if (!procedure) {
      return res.status(404).json({ error: 'Procedure not found' });
    }
    
    res.json({
      success: true,
      procedure
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update procedure' });
  }
});

// Delete a procedure
app.delete('/api/grc/procedures/:id', (req: Request, res: Response) => {
  try {
    const deleted = controlService.deleteProcedure(req.params.id);
    if (!deleted) {
      return res.status(404).json({ error: 'Procedure not found' });
    }
    res.json({
      success: true,
      message: 'Procedure deleted'
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete procedure' });
  }
});

// ====================
// Compliance Stats
// ====================

// Get compliance stats for an organization
app.get('/api/grc/stats/:organization', (req: Request, res: Response) => {
  try {
    const stats = controlService.getComplianceStats(req.params.organization);
    res.json({
      success: true,
      organization: req.params.organization,
      stats
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve compliance stats' });
  }
});

// Get framework implementation summary
app.get('/api/grc/frameworks/:id/implementation-summary', (req: Request, res: Response) => {
  try {
    const summary = controlService.getFrameworkImplementationSummary(req.params.id as ComplianceFramework);
    res.json({
      success: true,
      framework: req.params.id,
      controlCount: summary.size,
      implementations: Object.fromEntries(summary)
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve implementation summary' });
  }
});

// Search controls and procedures
app.get('/api/grc/controls/search', (req: Request, res: Response) => {
  try {
    const query = req.query.q as string;
    if (!query || query.length < 2) {
      return res.status(400).json({ error: 'Search query must be at least 2 characters' });
    }
    
    const controls = controlService.searchControls(query);
    const procedures = controlService.searchProcedures(query);
    
    res.json({
      success: true,
      query,
      results: {
        controls: controls.slice(0, 20),
        procedures: procedures.slice(0, 20)
      }
    });
  } catch (error) {
    res.status(500).json({ error: 'Search failed' });
  }
});

// ====================
// Offline Continuity
// ====================

app.get('/api/grc/offline/status', (req: Request, res: Response) => {
  try {
    const pkg = localStoreService.getOfflinePackage();
    const totalControls = pkg.frameworks.reduce((sum, item) => sum + item.controls.length, 0);

    res.json({
      success: true,
      status: {
        generatedAt: pkg.generatedAt,
        schemaVersion: pkg.schemaVersion,
        frameworkCount: pkg.frameworks.length,
        frameworkControlCount: totalControls,
        policyCount: pkg.policies.length,
        planCount: pkg.plans.length,
        implementedControlCount: pkg.controls.length,
        procedureCount: pkg.procedures.length,
        documentCount: pkg.clientDocuments.length,
        exemptionCount: pkg.gapExemptions.length,
        insightCount: pkg.improvementInsights.length,
        outcomeCount: pkg.improvementOutcomes.length,
        connections: pkg.connections
      }
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve offline status' });
  }
});

app.get('/api/grc/offline/package', (req: Request, res: Response) => {
  try {
    const pkg = localStoreService.getOfflinePackage();
    res.json({
      success: true,
      package: pkg
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve offline package' });
  }
});

app.put('/api/grc/offline/connections/:id', (req: Request, res: Response) => {
  try {
    const { name, endpoint, status, notes } = req.body;

    if (!name) {
      return res.status(400).json({ error: 'name is required' });
    }

    const connection = localStoreService.upsertConnection({
      id: req.params.id,
      name,
      endpoint,
      status,
      notes,
      lastCheckedAt: new Date()
    });

    res.json({
      success: true,
      connection
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update connection status' });
  }
});

// ====================
// Client Document Ingestion
// ====================

app.post('/api/grc/documents/ingest', (req: Request, res: Response) => {
  try {
    const request: ClientDocumentIngestionRequest = req.body;

    if (!request.organization || !request.title || !request.content) {
      return res.status(400).json({
        error: 'organization, title, and content are required'
      });
    }

    const artifact = documentIngestionService.ingestDocument(request);

    res.status(201).json({
      success: true,
      artifact
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to ingest document' });
  }
});

app.get('/api/grc/documents', (req: Request, res: Response) => {
  try {
    const documents = documentIngestionService.listDocuments({
      organization: req.query.organization as string | undefined,
      type: req.query.type as any,
      framework: req.query.framework as ComplianceFramework | undefined
    });

    res.json({
      success: true,
      count: documents.length,
      documents
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve documents' });
  }
});

app.get('/api/grc/documents/:id', (req: Request, res: Response) => {
  try {
    const document = documentIngestionService.getDocument(req.params.id);

    if (!document) {
      return res.status(404).json({ error: 'Document not found' });
    }

    res.json({
      success: true,
      document
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve document' });
  }
});

app.put('/api/grc/documents/:id', (req: Request, res: Response) => {
  try {
    const document = documentIngestionService.updateDocument(req.params.id, req.body);

    if (!document) {
      return res.status(404).json({ error: 'Document not found' });
    }

    res.json({
      success: true,
      document
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update document' });
  }
});

// ====================
// Documentation Gap Analysis
// ====================

app.post('/api/grc/documentation/gap-analysis', (req: Request, res: Response) => {
  try {
    const payload: DocumentationGapAnalysisRequest = req.body;
    const frameworks = payload.frameworks && payload.frameworks.length > 0
      ? payload.frameworks
      : [
          ComplianceFramework.NIST_CSF,
          ComplianceFramework.NIST_800_53,
          ComplianceFramework.HIPAA
        ];

    const analysis = documentationGapService.analyzeDocumentation({
      frameworks,
      includeFiles: payload.includeFiles
    });

    const insights = improvementPlaybookService.captureDocumentationGapInsights(analysis.results);

    res.json({
      success: true,
      ...analysis,
      insightsCaptured: insights.length
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to run documentation gap analysis' });
  }
});

// ====================
// Gap Exemptions / Risk Acceptance
// ====================

app.post('/api/grc/exemptions', (req: Request, res: Response) => {
  try {
    const request: GapExemptionRequest = req.body;
    const requiredFields = [
      'organization',
      'gapDescription',
      'acceptanceJustification',
      'riskIdentified',
      'mitigationsInPlace',
      'residualRisk',
      'riskOwner',
      'nextReviewDate'
    ];

    const missing = requiredFields.filter(field => !(request as any)[field]);
    if (missing.length > 0) {
      return res.status(400).json({
        error: `Missing required fields: ${missing.join(', ')}`
      });
    }

    const exemption = exemptionService.createExemption({
      ...request,
      nextReviewDate: new Date(request.nextReviewDate)
    });

    res.status(201).json({
      success: true,
      exemption
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create exemption' });
  }
});

app.get('/api/grc/exemptions', (req: Request, res: Response) => {
  try {
    const exemptions = exemptionService.listExemptions({
      organization: req.query.organization as string | undefined,
      framework: req.query.framework as ComplianceFramework | undefined,
      status: req.query.status as any
    });

    res.json({
      success: true,
      count: exemptions.length,
      exemptions
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to list exemptions' });
  }
});

app.get('/api/grc/exemptions/:id', (req: Request, res: Response) => {
  try {
    const exemption = exemptionService.getExemption(req.params.id);

    if (!exemption) {
      return res.status(404).json({ error: 'Exemption not found' });
    }

    res.json({
      success: true,
      exemption
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve exemption' });
  }
});

app.put('/api/grc/exemptions/:id', (req: Request, res: Response) => {
  try {
    const updates = { ...req.body };
    if (updates.nextReviewDate) {
      updates.nextReviewDate = new Date(updates.nextReviewDate);
    }

    const exemption = exemptionService.updateExemption(req.params.id, updates);

    if (!exemption) {
      return res.status(404).json({ error: 'Exemption not found' });
    }

    res.json({
      success: true,
      exemption
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update exemption' });
  }
});

// ====================
// Continuous Improvement Insights
// ====================

app.post('/api/grc/improvement/insights', (req: Request, res: Response) => {
  try {
    const request: ImprovementInsightRequest = req.body;

    if (!request.title || !request.source || !request.observation || !request.recommendation) {
      return res.status(400).json({
        error: 'title, source, observation, and recommendation are required'
      });
    }

    const insight = improvementPlaybookService.recordInsight(request);
    res.status(201).json({
      success: true,
      insight
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create insight' });
  }
});

app.post('/api/grc/improvement/runtime-errors', (req: Request, res: Response) => {
  try {
    const { errorMessage, context } = req.body;

    if (!errorMessage) {
      return res.status(400).json({ error: 'errorMessage is required' });
    }

    const insight = improvementPlaybookService.recordRuntimeError(errorMessage, context);
    res.status(201).json({
      success: true,
      insight
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to capture runtime error insight' });
  }
});

app.get('/api/grc/improvement/insights', (req: Request, res: Response) => {
  try {
    const limit = req.query.limit ? parseInt(req.query.limit as string, 10) : undefined;
    const insights = improvementPlaybookService.listInsights({
      source: req.query.source as any,
      limit: Number.isNaN(limit as number) ? undefined : limit
    });

    res.json({
      success: true,
      count: insights.length,
      insights
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve improvement insights' });
  }
});

app.post('/api/grc/improvement/insights/:id/feedback', (req: Request, res: Response) => {
  try {
    const { feedback } = req.body;
    if (feedback !== 'helpful' && feedback !== 'harmful') {
      return res.status(400).json({ error: "feedback must be 'helpful' or 'harmful'" });
    }

    const insight = improvementPlaybookService.updateFeedback(req.params.id, feedback);
    if (!insight) {
      return res.status(404).json({ error: 'Insight not found' });
    }

    res.json({
      success: true,
      insight
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update insight feedback' });
  }
});

app.get('/api/grc/improvement/outcomes', (req: Request, res: Response) => {
  try {
    const limit = req.query.limit ? parseInt(req.query.limit as string, 10) : undefined;
    const outcomes = improvementPlaybookService.listOutcomes({
      artifactType: req.query.artifactType as any,
      status: req.query.status as any,
      limit: Number.isNaN(limit as number) ? undefined : limit
    });

    const summary = outcomes.reduce((acc, outcome) => {
      acc.byStatus[outcome.status] = (acc.byStatus[outcome.status] || 0) + 1;
      acc.byArtifactType[outcome.artifactType] = (acc.byArtifactType[outcome.artifactType] || 0) + 1;
      return acc;
    }, {
      byStatus: {} as Record<string, number>,
      byArtifactType: {} as Record<string, number>
    });

    res.json({
      success: true,
      count: outcomes.length,
      outcomes,
      summary
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve improvement outcomes' });
  }
});

app.put('/api/grc/improvement/outcomes/:id', (req: Request, res: Response) => {
  try {
    const updates: ImprovementOutcomeUpdateRequest = req.body;

    if (updates.qualityRating !== undefined) {
      const rating = Number(updates.qualityRating);
      if (!Number.isFinite(rating) || rating < 1 || rating > 5) {
        return res.status(400).json({ error: 'qualityRating must be between 1 and 5' });
      }
      updates.qualityRating = rating;
    }

    const outcome = improvementPlaybookService.updateOutcome(req.params.id, updates);
    if (!outcome) {
      return res.status(404).json({ error: 'Improvement outcome not found' });
    }

    res.json({
      success: true,
      outcome
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update improvement outcome' });
  }
});

// In production, serve the built frontend
if (process.env.NODE_ENV === 'production') {
  const clientPath = path.join(__dirname, '../../dist/client');
  app.use(express.static(clientPath));
  
  // SPA fallback
  app.get('*', (req: Request, res: Response) => {
    if (!req.path.startsWith('/api')) {
      res.sendFile(path.join(clientPath, 'index.html'));
    }
  });
}

// Error handling middleware
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error('Unhandled error:', err);
  improvementPlaybookService.recordRuntimeError(
    err?.message || String(err),
    `${req.method} ${req.path}`
  );
  res.status(500).json({
    error: 'Internal server error',
    message: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// 404 handler
app.use((req: Request, res: Response) => {
  res.status(404).json({
    error: 'Not found',
    path: req.path
  });
});

// Start server
const port = parseInt(process.env.PORT || '3000', 10);
const host = '0.0.0.0';
const server = app.listen(port, host, () => {
  console.log(`GRC Agent API server listening on ${host}:${port}`);
  console.log(`API: http://localhost:${port}/api`);
  console.log(`Health: http://localhost:${port}/health`);
  if (process.env.NODE_ENV !== 'production') {
    console.log(`Frontend dev server: http://localhost:5173`);
  }
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received, shutting down gracefully');
  server.close(() => {
    console.log('Server closed');
    process.exit(0);
  });
});

process.on('SIGINT', () => {
  console.log('SIGINT received, shutting down gracefully');
  server.close(() => {
    console.log('Server closed');
    process.exit(0);
  });
});

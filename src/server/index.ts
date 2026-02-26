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
import { GRCAgentRequest, ComplianceFramework, ControlImplementationRequest, ProcedureRequest } from './types/framework.js';
import { ControlImplementationService } from './services/control-implementation-service.js';

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
      'POST /api/grc/agent/clear': 'Clear conversation history'
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

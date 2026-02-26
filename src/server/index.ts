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
import { GRCAgentRequest } from './types/framework.js';

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
const server = app.listen(port, () => {
  console.log(`GRC Agent API server listening on port ${port}`);
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

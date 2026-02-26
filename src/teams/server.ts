/**
 * Teams Bot Server - Express server for Teams bot
 */

import express, { Request, Response } from 'express';
import { BotFrameworkAdapter, MemoryStorage, ConversationState, UserState } from 'botbuilder';
import GRCAgentBot from './bot.js';
import 'dotenv/config.js';

const app = express();
app.use(express.json());

// Bot Framework configuration
const adapter = new BotFrameworkAdapter({
  appId: process.env.BOT_ID,
  appPassword: process.env.BOT_PASSWORD
});

// Storage and state management
const storage = new MemoryStorage();
const conversationState = new ConversationState(storage);
const userState = new UserState(storage);

// Create bot
const bot = new GRCAgentBot();

// Set up state management
adapter.use(conversationState);
adapter.use(userState);

// Error handler
adapter.onTurnError = async (context, error) => {
  console.error('[onTurnError] unhandled error:', error);

  await context.sendActivity({
    type: 'message',
    text: 'The bot encountered an error or unexpected condition.'
  });

  await conversationState.delete(context);
};

// Bot message handler
app.post('/api/messages', async (req: Request, res: Response) => {
  await adapter.processActivity(req, res, async (context) => {
    await bot.run(context);
  });
});

// Health check
app.get('/health', (req: Request, res: Response) => {
  res.json({
    status: 'ok',
    service: 'grc-agent-teams-bot',
    timestamp: new Date().toISOString()
  });
});

// Bot info
app.get('/api/bot/info', (req: Request, res: Response) => {
  res.json({
    name: 'GRC Agent',
    description: 'Governance, Risk, Compliance AI Assistant',
    endpoints: {
      messages: '/api/messages',
      health: '/health'
    }
  });
});

// Start server
const port = parseInt(process.env.TEAMS_BOT_PORT || '3978', 10);
app.listen(port, () => {
  console.log(`GRC Agent Teams Bot server listening on port ${port}`);
  console.log(`Message endpoint: http://localhost:${port}/api/messages`);
});

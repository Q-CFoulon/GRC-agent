/**
 * Microsoft Teams Server Integration
 */

import {
  CloudAdapter,
  ConfigurationServiceClientCredentialFactory,
  ConfigurationBotFrameworkAuthentication,
  TurnContext
} from 'botbuilder';
import express, { Router } from 'express';
import { GRCTeamsBot } from './bot.js';

export function createTeamsServer(): Router {
  const router = Router();

  // Configuration for Bot Framework
  const credentialsFactory = new ConfigurationServiceClientCredentialFactory({
    MicrosoftAppId: process.env.MICROSOFT_APP_ID || '',
    MicrosoftAppPassword: process.env.MICROSOFT_APP_PASSWORD || '',
    MicrosoftAppType: 'MultiTenant'
  });

  const botFrameworkAuthentication = new ConfigurationBotFrameworkAuthentication(
    {},
    credentialsFactory
  );

  const adapter = new CloudAdapter(botFrameworkAuthentication);

  // Error handler
  adapter.onTurnError = async (context: TurnContext, error: Error): Promise<void> => {
    console.error(`\n [onTurnError] unhandled error: ${error}`);
    console.error(error.stack);

    await context.sendActivity('The bot encountered an error or bug.');
    await context.sendActivity('To continue using this bot, please try your request again.');
  };

  const bot = new GRCTeamsBot();

  // Teams messaging endpoint
  router.post('/messages', async (req, res) => {
    await adapter.process(req, res, async (context) => {
      await bot.run(context);
    });
  });

  // Health check endpoint
  router.get('/health', (req, res) => {
    res.json({ status: 'ok', service: 'teams-bot' });
  });

  return router;
}

export { GRCTeamsBot } from './bot.js';

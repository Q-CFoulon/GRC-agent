/**
 * Microsoft Teams Bot Integration
 */

import {
  TeamsActivityHandler,
  TurnContext,
  MessageFactory,
  CardFactory
} from 'botbuilder';
import { GRCAgent } from '../agent/index.js';

export class GRCTeamsBot extends TeamsActivityHandler {
  private agent: GRCAgent;

  constructor() {
    super();
    this.agent = new GRCAgent();

    this.onMessage(async (context: TurnContext, next: () => Promise<void>) => {
      await this.handleMessage(context);
      await next();
    });

    this.onMembersAdded(async (context: TurnContext, next: () => Promise<void>) => {
      const welcomeText = `Welcome to GRC Agent! I can help you with:
- Generating security policies
- Analyzing compliance gaps
- Creating security plans (SSP, IRP, BRP, BC/DR)
- Framework information (NIST CSF, NIST 800-53, HIPAA, etc.)

Type "help" to see available commands.`;

      for (const member of context.activity.membersAdded || []) {
        if (member.id !== context.activity.recipient.id) {
          await context.sendActivity(MessageFactory.text(welcomeText, welcomeText));
        }
      }

      await next();
    });
  }

  private async handleMessage(context: TurnContext): Promise<void> {
    const userMessage = context.activity.text?.trim() || '';
    const conversationId = context.activity.conversation?.id || 'teams-default';

    if (!userMessage) {
      await context.sendActivity(
        MessageFactory.text('Please provide a message for me to process.')
      );
      return;
    }

    try {
      const response = await this.agent.processMessage({
        message: userMessage,
        conversationId,
        userId: context.activity.from?.id
      });

      // Determine if we should use a card or plain text
      if (response.data) {
        await this.sendRichResponse(context, response);
      } else {
        await context.sendActivity(MessageFactory.text(response.response));
      }
    } catch (error) {
      console.error('Error processing message:', error);
      await context.sendActivity(
        MessageFactory.text('An error occurred processing your request. Please try again.')
      );
    }
  }

  private async sendRichResponse(context: TurnContext, response: any): Promise<void> {
    const card = this.createResponseCard(response);
    await context.sendActivity(MessageFactory.attachment(card));
  }

  private createResponseCard(response: any): any {
    const facts: Array<{ title: string; value: string }> = [];
    
    if (response.data) {
      if (response.data.id) {
        facts.push({ title: 'ID', value: response.data.id });
      }
      if (response.data.status) {
        facts.push({ title: 'Status', value: response.data.status });
      }
      if (response.data.framework) {
        facts.push({ title: 'Framework', value: response.data.framework });
      }
      if (response.data.coverage !== undefined) {
        facts.push({ title: 'Coverage', value: `${response.data.coverage}%` });
      }
    }

    return CardFactory.adaptiveCard({
      type: 'AdaptiveCard',
      version: '1.4',
      body: [
        {
          type: 'TextBlock',
          text: 'GRC Agent Response',
          weight: 'Bolder',
          size: 'Medium'
        },
        {
          type: 'TextBlock',
          text: response.response,
          wrap: true
        },
        ...(facts.length > 0 ? [{
          type: 'FactSet',
          facts: facts
        }] : [])
      ],
      actions: [
        {
          type: 'Action.OpenUrl',
          title: 'View Full Details',
          url: 'https://grc-agent.example.com'
        }
      ]
    });
  }
}

export default GRCTeamsBot;

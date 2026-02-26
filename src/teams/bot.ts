/**
 * Teams Bot Integration - Microsoft Teams bot handler
 */

import {
  ActivityHandler,
  BotFrameworkAdapterSettings,
  BotAdapter,
  TurnContext,
  MessageFactory,
  CardFactory
} from 'botbuilder';
import GRCAgent from '../agent/index.js';

export class GRCAgentBot extends ActivityHandler {
  private userAgents: Map<string, GRCAgent> = new Map();

  async onMessage(context: TurnContext): Promise<void> {
    const userId = context.activity.from.id;
    let agent = this.userAgents.get(userId);

    if (!agent) {
      agent = new GRCAgent();
      this.userAgents.set(userId, agent);
    }

    const userMessage = context.activity.text;
    if (!userMessage) {
      await context.sendActivity('I didn\'t receive your message. Please try again.');
      return;
    }

    try {
      const response = await agent.processMessage({
        message: userMessage,
        userId,
        conversationId: context.activity.conversation.id
      });

      const formattedResponse = this.formatResponse(response.response);
      await this.sendMessageWithFallback(context, formattedResponse);
    } catch (error) {
      await context.sendActivity('An error occurred while processing your request. Please try again.');
      console.error('Bot error:', error);
    }
  }

  async onConversationUpdate(context: TurnContext): Promise<void> {
    const membersAdded = context.activity.membersAdded ?? [];
    for (const member of membersAdded) {
      if (member.id !== context.activity.recipient.id) {
        await this.sendWelcomeMessage(context);
      }
    }
  }

  private async sendWelcomeMessage(context: TurnContext): Promise<void> {
    const welcomeMessage = `Welcome to the GRC Agent! 🔒

I'm here to help you with:
- **Policy Generation** - Create policies aligned with compliance frameworks
- **Gap Analysis** - Analyze policies and identify compliance gaps
- **Plan Creation** - Generate security and compliance plans
- **Framework Information** - Learn about compliance requirements

Supported Frameworks:
- NIST CSF 2.0, NIST 800-53, NIST CMMC
- HIPAA, HITRUST, SOX, SOC 2, GDPR, CCPA

Try: "Generate an access control policy for HIPAA"`;

    await context.sendActivity(welcomeMessage);
  }

  private formatResponse(text: string): string {
    // Format for Teams markdown
    return text
      .replace(/\*\*(.*?)\*\*/g, '**$1**')
      .replace(/\*(.*?)\*/g, '_$1_')
      .replace(/\n\n/g, '\n\n');
  }

  private async sendMessageWithFallback(context: TurnContext, message: string): Promise<void> {
    if (message.length <= 4000) {
      await context.sendActivity(message);
    } else {
      await this.sendLongMessage(context, message);
    }
  }

  private async sendLongMessage(context: TurnContext, message: string, chunkSize: number = 3500): Promise<void> {
    const chunks: string[] = [];
    let currentChunk = '';

    const paragraphs = message.split('\n\n');

    for (const paragraph of paragraphs) {
      if ((currentChunk + paragraph + '\n\n').length > chunkSize) {
        if (currentChunk) chunks.push(currentChunk.trim());
        currentChunk = paragraph + '\n\n';
      } else {
        currentChunk += paragraph + '\n\n';
      }
    }

    if (currentChunk) chunks.push(currentChunk.trim());

    for (let i = 0; i < chunks.length; i++) {
      const chunk = chunks[i];
      const prefix = i === 0 ? '' : `**(Part ${i + 1} of ${chunks.length})**\n\n`;
      await context.sendActivity(prefix + chunk);

      // Add delay between long messages to avoid throttling
      if (i < chunks.length - 1) {
        await new Promise(resolve => setTimeout(resolve, 500));
      }
    }
  }
}

export function createTeamsBot(): GRCAgentBot {
  return new GRCAgentBot();
}

export default GRCAgentBot;

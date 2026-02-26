/**
 * GRC Agent Web Application
 * Client-side logic for the web interface - Vite + TypeScript
 */

import './style.css';

interface Framework {
  id: string;
  name: string;
  version: string;
  organization: string;
  total_controls: number;
  categories: string[];
  description: string;
  url?: string;
}

interface Policy {
  id: string;
  title: string;
  framework: string;
  organization: string;
}

interface Plan {
  id: string;
  title: string;
  type: string;
  status: string;
}

interface Message {
  content: string;
  sender: 'user' | 'assistant';
  timestamp: Date;
}

interface Stats {
  policies: number;
  plans: number;
  messages: number;
}

class GRCWebApp {
  private apiEndpoint: string;
  private currentPage: string = 'chat';
  private messages: Message[] = [];
  private policies: Policy[] = [];
  private plans: Plan[] = [];
  private frameworks: Framework[] = [];
  private stats: Stats = { policies: 0, plans: 0, messages: 0 };
  private activity: string[] = [];

  constructor() {
    this.apiEndpoint = localStorage.getItem('apiEndpoint') || '/api';
  }

  async init(): Promise<void> {
    this.setupEventListeners();
    await this.loadFrameworks();
    await this.loadPolicies();
    await this.loadPlans();
    this.loadSettings();
    this.addActivity('App initialized');
  }

  private setupEventListeners(): void {
    // Navigation
    const navButtons = document.querySelectorAll<HTMLButtonElement>('.nav-item');
    console.log(`Found ${navButtons.length} nav buttons, attaching listeners...`);
    
    navButtons.forEach((btn) => {
      const page = btn.dataset.page;
      btn.addEventListener('click', () => {
        console.log(`Clicked nav button: ${page}`);
        if (page) this.navigateTo(page);
      });
    });
    console.log(`Nav event listeners attached!\n`);

    // Chat
    document.getElementById('messageInput')?.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') this.sendMessage();
    });

    document.getElementById('sendBtn')?.addEventListener('click', () => {
      this.sendMessage();
    });

    // Quick Actions
    document.querySelectorAll<HTMLButtonElement>('#quickActions .btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        const action = btn.dataset.action;
        if (action) this.handleQuickAction(action);
      });
    });

    // Settings and Help
    document.getElementById('settingsBtn')?.addEventListener('click', () => {
      this.toggleElement('settingsModal');
    });

    document.getElementById('helpBtn')?.addEventListener('click', () => {
      this.toggleElement('helpModal');
    });

    // Forms
    document.getElementById('policyForm')?.addEventListener('submit', (e) => {
      e.preventDefault();
      this.generatePolicy();
    });

    document.getElementById('planForm')?.addEventListener('submit', (e) => {
      e.preventDefault();
      this.generatePlan();
    });

    // Framework search
    document.getElementById('frameworkSearch')?.addEventListener('input', (e) => {
      const target = e.target as HTMLInputElement;
      this.searchFrameworks(target.value);
    });

    // Dark mode toggle
    document.getElementById('darkModeToggle')?.addEventListener('change', (e) => {
      const target = e.target as HTMLInputElement;
      if (target.checked) {
        document.body.classList.add('dark-mode');
        localStorage.setItem('darkMode', 'true');
      } else {
        document.body.classList.remove('dark-mode');
        localStorage.setItem('darkMode', 'false');
      }
    });

    // Modal close buttons
    document.getElementById('settingsModalClose')?.addEventListener('click', () => {
      this.toggleElement('settingsModal');
    });

    document.getElementById('helpModalClose')?.addEventListener('click', () => {
      this.toggleElement('helpModal');
    });

    document.getElementById('frameworkModalClose')?.addEventListener('click', () => {
      this.toggleElement('frameworkModal');
    });

    // Clear history
    document.getElementById('clearHistoryBtn')?.addEventListener('click', () => {
      this.clearHistory();
    });

    // Save settings
    document.getElementById('saveSettingsBtn')?.addEventListener('click', () => {
      this.saveSettings();
    });
  }

  async sendMessage(): Promise<void> {
    const input = document.getElementById('messageInput') as HTMLInputElement | null;
    const message = input?.value.trim();

    if (!message) return;

    // Add user message
    this.addChatMessage(message, 'user');
    if (input) input.value = '';

    try {
      const response = await fetch(`${this.apiEndpoint}/grc/process`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message }),
      });

      const data = await response.json();

      if (data.success) {
        this.addChatMessage(data.response, 'assistant');
        this.addActivity(`Processed: ${message.substring(0, 50)}...`);
        this.stats.messages++;
        this.updateAnalytics();
      }
    } catch (error) {
      console.error('Error sending message:', error);
      this.addChatMessage('Sorry, I encountered an error. Please try again.', 'assistant');
    }
  }

  handleQuickAction(action: string): void {
    const input = document.getElementById('messageInput') as HTMLInputElement | null;
    if (input) {
      input.value = action;
      this.sendMessage();
    }
  }

  private addChatMessage(content: string, sender: 'user' | 'assistant'): void {
    const messagesDiv = document.getElementById('messages');
    if (!messagesDiv) return;

    const messageEl = document.createElement('div');
    messageEl.className = `message message-${sender}`;
    messageEl.innerHTML = `<div class="message-content">${this.escapeHtml(content)}</div>`;

    messagesDiv.appendChild(messageEl);
    messagesDiv.scrollTop = messagesDiv.scrollHeight;

    this.messages.push({ content, sender, timestamp: new Date() });
  }

  private async generatePolicy(): Promise<void> {
    const title = (document.getElementById('policyTitle') as HTMLInputElement)?.value;
    const organization = (document.getElementById('organization') as HTMLInputElement)?.value;
    const frameworkSelect = document.getElementById('policyFrameworks') as HTMLSelectElement;
    const frameworks = Array.from(frameworkSelect?.selectedOptions || []).map((opt) => opt.value);

    if (!title || !organization) {
      alert('Please fill in all required fields');
      return;
    }

    try {
      const response = await fetch(`${this.apiEndpoint}/grc/process`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: `Generate a ${frameworks.join(', ')} policy titled "${title}" for ${organization}`,
        }),
      });

      const data = await response.json();
      if (data.success) {
        await this.loadPolicies(); // Reload policies from backend
        alert('Policy generated successfully!');
        this.addActivity(`Generated policy: ${title}`);
      }
    } catch (error) {
      console.error('Error generating policy:', error);
      alert('Failed to generate policy');
    }
  }

  private async generatePlan(): Promise<void> {
    const type = (document.getElementById('planType') as HTMLSelectElement)?.value;
    const title = (document.getElementById('planTitle') as HTMLInputElement)?.value;
    const organization = (document.getElementById('planOrganization') as HTMLInputElement)?.value;
    const frameworkSelect = document.getElementById('planFrameworks') as HTMLSelectElement;
    const frameworks = Array.from(frameworkSelect?.selectedOptions || []).map((opt) => opt.value);

    if (!type || !title || !organization) {
      alert('Please fill in all required fields');
      return;
    }

    try {
      const response = await fetch(`${this.apiEndpoint}/grc/process`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: `Generate a ${type} plan titled "${title}" for ${organization} aligned with ${frameworks.join(', ')}`,
        }),
      });

      const data = await response.json();
      if (data.success) {
        await this.loadPlans(); // Reload plans from backend
        alert('Plan generated successfully!');
        this.addActivity(`Generated plan: ${title}`);
      }
    } catch (error) {
      console.error('Error generating plan:', error);
      alert('Failed to generate plan');
    }
  }

  private async loadFrameworks(): Promise<void> {
    try {
      const response = await fetch(`${this.apiEndpoint}/grc/frameworks`);
      const data = await response.json();

      if (data.success) {
        this.frameworks = data.frameworks;
        this.displayFrameworks();
      }
    } catch (error) {
      console.error('Error loading frameworks:', error);
    }
  }

  private async loadPolicies(): Promise<void> {
    try {
      const response = await fetch(`${this.apiEndpoint}/grc/policies`);
      const data = await response.json();

      if (data.success) {
        this.policies = data.policies;
        this.stats.policies = this.policies.length;
        this.updatePoliciesList();
        this.updateStats();
      }
    } catch (error) {
      console.error('Error loading policies:', error);
    }
  }

  private async loadPlans(): Promise<void> {
    try {
      const response = await fetch(`${this.apiEndpoint}/grc/plans`);
      const data = await response.json();

      if (data.success) {
        this.plans = data.plans;
        this.stats.plans = this.plans.length;
        this.updatePlansList();
        this.updateStats();
      }
    } catch (error) {
      console.error('Error loading plans:', error);
    }
  }

  private displayFrameworks(filter: string = ''): void {
    const container = document.getElementById('frameworksList');
    if (!container) return;

    const filtered = filter
      ? this.frameworks.filter(
          (f) =>
            f.name.toLowerCase().includes(filter.toLowerCase()) ||
            f.organization.toLowerCase().includes(filter.toLowerCase())
        )
      : this.frameworks;

    container.innerHTML = filtered
      .map(
        (fw) => `
            <div class="framework-card" data-framework-id="${fw.id}">
                <div class="card-title">${fw.name}</div>
                <div style="font-size: 12px; color: var(--gray);">v${fw.version}</div>
                <div style="font-size: 12px; margin-top: 8px;">${fw.total_controls} controls</div>
            </div>
        `
      )
      .join('');

    // Add click handlers
    container.querySelectorAll<HTMLElement>('.framework-card').forEach((card) => {
      card.addEventListener('click', () => {
        const id = card.dataset.frameworkId;
        if (id) this.showFrameworkDetail(id);
      });
    });
  }

  private searchFrameworks(query: string): void {
    this.displayFrameworks(query);
  }

  private async showFrameworkDetail(frameworkId: string): Promise<void> {
    try {
      const response = await fetch(`${this.apiEndpoint}/grc/frameworks/${frameworkId}`);
      const data = await response.json();

      if (data.success) {
        const detail = document.getElementById('frameworkDetail');
        if (detail) {
          detail.innerHTML = `
                        <h2>${data.framework.name}</h2>
                        <p><strong>Version:</strong> ${data.framework.version}</p>
                        <p><strong>Organization:</strong> ${data.framework.organization}</p>
                        <p><strong>Total Controls:</strong> ${data.framework.total_controls}</p>
                        <p><strong>Categories:</strong> ${data.framework.categories.join(', ')}</p>
                        <p><strong>Description:</strong> ${data.framework.description}</p>
                        ${data.framework.url ? `<p><a href="${data.framework.url}" target="_blank">More Info →</a></p>` : ''}
                    `;
          this.toggleElement('frameworkModal');
        }
      }
    } catch (error) {
      console.error('Error loading framework detail:', error);
    }
  }

  private updatePoliciesList(): void {
    const list = document.getElementById('policiesList');
    if (!list) return;

    if (this.policies.length === 0) {
      list.innerHTML = '<p class="empty-state">No policies yet. Generate one above!</p>';
    } else {
      list.innerHTML = this.policies
        .map(
          (p) => `
                <div class="policy-card">
                    <div class="card-title">${p.title}</div>
                    <div class="card-meta">
                        <span>📋 ${p.framework}</span>
                        <span>🏢 ${p.organization}</span>
                    </div>
                    <div class="card-actions">
                        <button class="btn btn-small" data-export-policy="${p.id}">Export</button>
                        <button class="btn btn-small btn-danger" data-delete-policy="${p.id}">Delete</button>
                    </div>
                </div>
            `
        )
        .join('');

      // Add event listeners
      list.querySelectorAll<HTMLButtonElement>('[data-export-policy]').forEach((btn) => {
        btn.addEventListener('click', () => {
          const id = btn.dataset.exportPolicy;
          if (id) this.exportPolicy(id);
        });
      });

      list.querySelectorAll<HTMLButtonElement>('[data-delete-policy]').forEach((btn) => {
        btn.addEventListener('click', () => {
          const id = btn.dataset.deletePolicy;
          if (id) this.deletePolicy(id);
        });
      });
    }
  }

  private updatePlansList(): void {
    const list = document.getElementById('plansList');
    if (!list) return;

    if (this.plans.length === 0) {
      list.innerHTML = '<p class="empty-state">No plans yet. Generate one above!</p>';
    } else {
      list.innerHTML = this.plans
        .map(
          (p) => `
                <div class="plan-card">
                    <div class="card-title">${p.title}</div>
                    <div class="card-meta">
                        <span>📊 ${p.type}</span>
                        <span>📋 ${p.status}</span>
                    </div>
                    <div class="card-actions">
                        <button class="btn btn-small" data-export-plan="${p.id}">Export</button>
                        <button class="btn btn-small btn-danger" data-delete-plan="${p.id}">Delete</button>
                    </div>
                </div>
            `
        )
        .join('');

      // Add event listeners
      list.querySelectorAll<HTMLButtonElement>('[data-export-plan]').forEach((btn) => {
        btn.addEventListener('click', () => {
          const id = btn.dataset.exportPlan;
          if (id) this.exportPlan(id);
        });
      });

      list.querySelectorAll<HTMLButtonElement>('[data-delete-plan]').forEach((btn) => {
        btn.addEventListener('click', () => {
          const id = btn.dataset.deletePlan;
          if (id) this.deletePlan(id);
        });
      });
    }
  }

  private navigateTo(page: string): void {
    console.log(`Navigating to page: ${page}`);
    
    // Remove active from all pages
    document.querySelectorAll<HTMLElement>('.page').forEach((p) => p.classList.remove('active'));

    // Remove active from nav items
    document.querySelectorAll('.nav-item').forEach((btn) => btn.classList.remove('active'));

    // Show selected page
    const pageEl = document.getElementById(`${page}-page`);
    if (pageEl) {
      pageEl.classList.add('active');
      console.log(`Successfully switched to ${page} page`);
    } else {
      console.error(`Could not find page element: ${page}-page`);
    }

    // Mark nav item as active
    document.querySelector(`[data-page="${page}"]`)?.classList.add('active');
    this.currentPage = page;
  }

  private updateAnalytics(): void {
    const policiesEl = document.getElementById('policiesCount');
    const plansEl = document.getElementById('plansCount');
    const messagesEl = document.getElementById('messagesCount');

    if (policiesEl) policiesEl.textContent = String(this.stats.policies);
    if (plansEl) plansEl.textContent = String(this.stats.plans);
    if (messagesEl) messagesEl.textContent = String(this.stats.messages);
  }

  private updateActivityLog(): void {
    const log = document.getElementById('activityLog');
    if (!log) return;

    if (this.activity.length === 0) {
      log.innerHTML = '<p class="empty-state">No activity yet</p>';
    } else {
      log.innerHTML = this.activity
        .slice(-10)
        .reverse()
        .map((a) => `<div class="activity-item">📌 ${a}</div>`)
        .join('');
    }
  }

  private addActivity(action: string): void {
    const time = new Date().toLocaleTimeString();
    this.activity.push(`[${time}] ${action}`);
    this.updateActivityLog();
  }

  private exportPolicy(policyId: string): void {
    alert(`Exporting policy ${policyId}`);
    this.addActivity(`Exported policy: ${policyId}`);
  }

  private exportPlan(planId: string): void {
    alert(`Exporting plan ${planId}`);
    this.addActivity(`Exported plan: ${planId}`);
  }

  private deletePolicy(policyId: string): void {
    if (confirm('Are you sure you want to delete this policy?')) {
      this.policies = this.policies.filter((p) => p.id !== policyId);
      this.updatePoliciesList();
      this.addActivity(`Deleted policy: ${policyId}`);
    }
  }

  private deletePlan(planId: string): void {
    if (confirm('Are you sure you want to delete this plan?')) {
      this.plans = this.plans.filter((p) => p.id !== planId);
      this.updatePlansList();
      this.addActivity(`Deleted plan: ${planId}`);
    }
  }

  private clearHistory(): void {
    if (confirm('Clear all chat history?')) {
      const messagesEl = document.getElementById('messages');
      if (messagesEl) messagesEl.innerHTML = '';
      this.messages = [];
      this.addActivity('Cleared chat history');
    }
  }

  private saveSettings(): void {
    const endpointInput = document.getElementById('apiEndpoint') as HTMLInputElement | null;
    const endpoint = endpointInput?.value;
    if (endpoint) {
      localStorage.setItem('apiEndpoint', endpoint);
      this.apiEndpoint = endpoint;
      alert('Settings saved!');
    }
  }

  private loadSettings(): void {
    const endpoint = localStorage.getItem('apiEndpoint');
    const darkMode = localStorage.getItem('darkMode') === 'true';

    if (endpoint) {
      const input = document.getElementById('apiEndpoint') as HTMLInputElement | null;
      if (input) input.value = endpoint;
    }

    if (darkMode) {
      document.body.classList.add('dark-mode');
      const toggle = document.getElementById('darkModeToggle') as HTMLInputElement | null;
      if (toggle) toggle.checked = true;
    }
  }

  private toggleElement(elementId: string): void {
    const el = document.getElementById(elementId);
    if (el) {
      el.style.display = el.style.display === 'none' ? 'flex' : 'none';
    }
  }

  private escapeHtml(text: string): string {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }
}

// Initialize app
const app = new GRCWebApp();
document.addEventListener('DOMContentLoaded', () => {
  app.init();
});

// Export for global access if needed
declare global {
  interface Window {
    app: GRCWebApp;
  }
}
window.app = app;

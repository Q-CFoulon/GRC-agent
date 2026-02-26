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

interface ImplementedControl {
  id: string;
  frameworkControlId: string;
  framework: string;
  controlName: string;
  description: string;
  organization: string;
  owner?: string;
  controlType: string;
  status: string;
  effectiveness: string;
  lastReviewed?: string;
  evidenceLinks: string[];
  notes?: string;
  procedures: ImplementedProcedure[];
  createdAt: string;
  updatedAt: string;
}

interface ImplementedProcedure {
  id: string;
  procedureName: string;
  description: string;
  steps: ProcedureStep[];
  frequency: string;
  lastExecuted?: string;
}

interface ProcedureStep {
  stepNumber: number;
  description: string;
  responsible?: string;
  expectedOutput?: string;
}

interface ControlStats {
  total: number;
  implemented: number;
  inProgress: number;
  notImplemented: number;
  planned: number;
  partiallyImplemented: number;
  notApplicable: number;
}

class GRCWebApp {
  private apiEndpoint: string;
  private currentPage: string = 'chat';
  private messages: Message[] = [];
  private policies: Policy[] = [];
  private plans: Plan[] = [];
  private frameworks: Framework[] = [];
  private controls: ImplementedControl[] = [];
  private stats: Stats = { policies: 0, plans: 0, messages: 0 };
  private controlStats: ControlStats = { total: 0, implemented: 0, inProgress: 0, notImplemented: 0, planned: 0, partiallyImplemented: 0, notApplicable: 0 };
  private activity: string[] = [];
  private editingControlId: string | null = null;

  constructor() {
    this.apiEndpoint = localStorage.getItem('apiEndpoint') || '/api';
  }

  async init(): Promise<void> {
    this.setupEventListeners();
    await this.loadFrameworks();
    await this.loadPolicies();
    await this.loadPlans();
    await this.loadControls();
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

    // Controls page
    document.getElementById('addControlBtn')?.addEventListener('click', () => {
      this.openControlModal();
    });

    document.getElementById('controlModalClose')?.addEventListener('click', () => {
      this.closeControlModal();
    });

    document.getElementById('cancelControlBtn')?.addEventListener('click', () => {
      this.closeControlModal();
    });

    document.getElementById('controlDetailModalClose')?.addEventListener('click', () => {
      this.toggleElement('controlDetailModal');
    });

    document.getElementById('controlForm')?.addEventListener('submit', (e) => {
      e.preventDefault();
      this.saveControl();
    });

    document.getElementById('controlFrameworkFilter')?.addEventListener('change', () => {
      this.filterControls();
    });

    document.getElementById('controlStatusFilter')?.addEventListener('change', () => {
      this.filterControls();
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

  private updateStats(): void {
    this.updateAnalytics();
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

  // Control Management Methods
  private async loadControls(): Promise<void> {
    try {
      const response = await fetch(`${this.apiEndpoint}/grc/controls`);
      const data = await response.json();

      if (data.success) {
        this.controls = data.controls;
        this.updateControlStats();
        this.displayControls();
      }
    } catch (error) {
      console.error('Error loading controls:', error);
    }
  }

  private updateControlStats(): void {
    this.controlStats = {
      total: this.controls.length,
      implemented: this.controls.filter(c => c.status === 'implemented').length,
      inProgress: this.controls.filter(c => c.status === 'in-progress').length,
      notImplemented: this.controls.filter(c => c.status === 'not-implemented').length,
      planned: this.controls.filter(c => c.status === 'planned').length,
      partiallyImplemented: this.controls.filter(c => c.status === 'partially-implemented').length,
      notApplicable: this.controls.filter(c => c.status === 'not-applicable').length
    };

    const totalEl = document.getElementById('totalControls');
    const implEl = document.getElementById('implementedControls');
    const progEl = document.getElementById('inProgressControls');
    const notImplEl = document.getElementById('notImplementedControls');

    if (totalEl) totalEl.textContent = String(this.controlStats.total);
    if (implEl) implEl.textContent = String(this.controlStats.implemented);
    if (progEl) progEl.textContent = String(this.controlStats.inProgress + this.controlStats.planned);
    if (notImplEl) notImplEl.textContent = String(this.controlStats.notImplemented);
  }

  private displayControls(filter?: { framework?: string; status?: string }): void {
    const container = document.getElementById('controlsList');
    if (!container) return;

    let filtered = this.controls;
    if (filter?.framework) {
      filtered = filtered.filter(c => c.framework === filter.framework);
    }
    if (filter?.status) {
      filtered = filtered.filter(c => c.status === filter.status);
    }

    if (filtered.length === 0) {
      container.innerHTML = '<p class="empty-state">No controls documented yet. Add one above!</p>';
      return;
    }

    container.innerHTML = filtered.map(control => `
      <div class="control-card" data-control-id="${control.id}">
        <div class="control-header">
          <div class="control-title">
            <span class="control-id">${control.frameworkControlId}</span>
            <span class="control-name">${this.escapeHtml(control.controlName)}</span>
          </div>
          <span class="status-badge status-${control.status}">${this.formatStatus(control.status)}</span>
        </div>
        <div class="control-meta">
          <span>🔗 ${control.framework.toUpperCase()}</span>
          <span>🏢 ${this.escapeHtml(control.organization)}</span>
          <span>📋 ${control.controlType}</span>
          ${control.owner ? `<span>👤 ${this.escapeHtml(control.owner)}</span>` : ''}
        </div>
        ${control.description ? `<p class="control-description">${this.escapeHtml(control.description.substring(0, 150))}${control.description.length > 150 ? '...' : ''}</p>` : ''}
        <div class="control-footer">
          <span class="effectiveness-badge eff-${control.effectiveness}">${this.formatEffectiveness(control.effectiveness)}</span>
          <span class="procedures-count">${control.procedures?.length || 0} procedures</span>
        </div>
        <div class="card-actions">
          <button class="btn btn-small" data-view-control="${control.id}">View</button>
          <button class="btn btn-small" data-edit-control="${control.id}">Edit</button>
          <button class="btn btn-small btn-danger" data-delete-control="${control.id}">Delete</button>
        </div>
      </div>
    `).join('');

    // Add event listeners
    container.querySelectorAll<HTMLButtonElement>('[data-view-control]').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.dataset.viewControl;
        if (id) this.viewControlDetail(id);
      });
    });

    container.querySelectorAll<HTMLButtonElement>('[data-edit-control]').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.dataset.editControl;
        if (id) this.editControl(id);
      });
    });

    container.querySelectorAll<HTMLButtonElement>('[data-delete-control]').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.dataset.deleteControl;
        if (id) this.deleteControl(id);
      });
    });
  }

  private filterControls(): void {
    const frameworkFilter = (document.getElementById('controlFrameworkFilter') as HTMLSelectElement)?.value;
    const statusFilter = (document.getElementById('controlStatusFilter') as HTMLSelectElement)?.value;
    
    this.displayControls({
      framework: frameworkFilter || undefined,
      status: statusFilter || undefined
    });
  }

  private formatStatus(status: string): string {
    const statusMap: Record<string, string> = {
      'not-implemented': 'Not Implemented',
      'planned': 'Planned',
      'in-progress': 'In Progress',
      'implemented': 'Implemented',
      'partially-implemented': 'Partial',
      'not-applicable': 'N/A'
    };
    return statusMap[status] || status;
  }

  private formatEffectiveness(effectiveness: string): string {
    const effMap: Record<string, string> = {
      'not-tested': 'Not Tested',
      'ineffective': 'Ineffective',
      'partially-effective': 'Partial',
      'effective': 'Effective',
      'highly-effective': 'Highly Effective'
    };
    return effMap[effectiveness] || effectiveness;
  }

  private openControlModal(controlId?: string): void {
    this.editingControlId = controlId || null;
    const title = document.getElementById('controlModalTitle');
    
    if (controlId) {
      const control = this.controls.find(c => c.id === controlId);
      if (control) {
        if (title) title.textContent = 'Edit Control';
        this.populateControlForm(control);
      }
    } else {
      if (title) title.textContent = 'Add New Control';
      this.resetControlForm();
    }
    
    this.toggleElement('controlModal');
  }

  private closeControlModal(): void {
    this.editingControlId = null;
    this.resetControlForm();
    const modal = document.getElementById('controlModal');
    if (modal) modal.style.display = 'none';
  }

  private resetControlForm(): void {
    (document.getElementById('controlId') as HTMLInputElement).value = '';
    (document.getElementById('controlFramework') as HTMLSelectElement).value = '';
    (document.getElementById('frameworkControlId') as HTMLInputElement).value = '';
    (document.getElementById('controlName') as HTMLInputElement).value = '';
    (document.getElementById('controlDescription') as HTMLTextAreaElement).value = '';
    (document.getElementById('controlOrganization') as HTMLInputElement).value = '';
    (document.getElementById('controlOwner') as HTMLInputElement).value = '';
    (document.getElementById('controlType') as HTMLSelectElement).value = 'technical';
    (document.getElementById('controlStatus') as HTMLSelectElement).value = 'not-implemented';
    (document.getElementById('controlEffectiveness') as HTMLSelectElement).value = 'not-tested';
    (document.getElementById('controlLastReviewed') as HTMLInputElement).value = '';
    (document.getElementById('controlEvidence') as HTMLTextAreaElement).value = '';
    (document.getElementById('controlNotes') as HTMLTextAreaElement).value = '';
  }

  private populateControlForm(control: ImplementedControl): void {
    (document.getElementById('controlId') as HTMLInputElement).value = control.id;
    (document.getElementById('controlFramework') as HTMLSelectElement).value = control.framework;
    (document.getElementById('frameworkControlId') as HTMLInputElement).value = control.frameworkControlId;
    (document.getElementById('controlName') as HTMLInputElement).value = control.controlName;
    (document.getElementById('controlDescription') as HTMLTextAreaElement).value = control.description || '';
    (document.getElementById('controlOrganization') as HTMLInputElement).value = control.organization;
    (document.getElementById('controlOwner') as HTMLInputElement).value = control.owner || '';
    (document.getElementById('controlType') as HTMLSelectElement).value = control.controlType;
    (document.getElementById('controlStatus') as HTMLSelectElement).value = control.status;
    (document.getElementById('controlEffectiveness') as HTMLSelectElement).value = control.effectiveness;
    (document.getElementById('controlLastReviewed') as HTMLInputElement).value = control.lastReviewed || '';
    (document.getElementById('controlEvidence') as HTMLTextAreaElement).value = control.evidenceLinks?.join('\n') || '';
    (document.getElementById('controlNotes') as HTMLTextAreaElement).value = control.notes || '';
  }

  private async saveControl(): Promise<void> {
    const controlData = {
      framework: (document.getElementById('controlFramework') as HTMLSelectElement).value,
      frameworkControlId: (document.getElementById('frameworkControlId') as HTMLInputElement).value,
      controlName: (document.getElementById('controlName') as HTMLInputElement).value,
      description: (document.getElementById('controlDescription') as HTMLTextAreaElement).value,
      organization: (document.getElementById('controlOrganization') as HTMLInputElement).value,
      owner: (document.getElementById('controlOwner') as HTMLInputElement).value || undefined,
      controlType: (document.getElementById('controlType') as HTMLSelectElement).value,
      status: (document.getElementById('controlStatus') as HTMLSelectElement).value,
      effectiveness: (document.getElementById('controlEffectiveness') as HTMLSelectElement).value,
      lastReviewed: (document.getElementById('controlLastReviewed') as HTMLInputElement).value || undefined,
      evidenceLinks: (document.getElementById('controlEvidence') as HTMLTextAreaElement).value.split('\n').filter(l => l.trim()),
      notes: (document.getElementById('controlNotes') as HTMLTextAreaElement).value || undefined
    };

    try {
      let response;
      if (this.editingControlId) {
        response = await fetch(`${this.apiEndpoint}/grc/controls/${this.editingControlId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(controlData)
        });
      } else {
        response = await fetch(`${this.apiEndpoint}/grc/controls`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(controlData)
        });
      }

      const data = await response.json();
      if (data.success) {
        await this.loadControls();
        this.closeControlModal();
        this.addActivity(`${this.editingControlId ? 'Updated' : 'Created'} control: ${controlData.controlName}`);
        alert(`Control ${this.editingControlId ? 'updated' : 'created'} successfully!`);
      } else {
        alert('Failed to save control: ' + (data.error || 'Unknown error'));
      }
    } catch (error) {
      console.error('Error saving control:', error);
      alert('Failed to save control');
    }
  }

  private editControl(controlId: string): void {
    this.openControlModal(controlId);
  }

  private async deleteControl(controlId: string): Promise<void> {
    if (!confirm('Are you sure you want to delete this control?')) return;

    try {
      const response = await fetch(`${this.apiEndpoint}/grc/controls/${controlId}`, {
        method: 'DELETE'
      });

      const data = await response.json();
      if (data.success) {
        await this.loadControls();
        this.addActivity(`Deleted control: ${controlId}`);
      } else {
        alert('Failed to delete control');
      }
    } catch (error) {
      console.error('Error deleting control:', error);
      alert('Failed to delete control');
    }
  }

  private viewControlDetail(controlId: string): void {
    const control = this.controls.find(c => c.id === controlId);
    if (!control) return;

    const detail = document.getElementById('controlDetail');
    if (detail) {
      detail.innerHTML = `
        <h2>${this.escapeHtml(control.controlName)}</h2>
        <div class="control-detail-header">
          <span class="control-id">${control.frameworkControlId}</span>
          <span class="status-badge status-${control.status}">${this.formatStatus(control.status)}</span>
        </div>
        
        <div class="control-detail-section">
          <h3>General Information</h3>
          <table class="detail-table">
            <tr><td><strong>Framework:</strong></td><td>${control.framework.toUpperCase()}</td></tr>
            <tr><td><strong>Organization:</strong></td><td>${this.escapeHtml(control.organization)}</td></tr>
            <tr><td><strong>Owner:</strong></td><td>${control.owner ? this.escapeHtml(control.owner) : 'Not assigned'}</td></tr>
            <tr><td><strong>Control Type:</strong></td><td>${control.controlType}</td></tr>
            <tr><td><strong>Effectiveness:</strong></td><td>${this.formatEffectiveness(control.effectiveness)}</td></tr>
            <tr><td><strong>Last Reviewed:</strong></td><td>${control.lastReviewed || 'Never'}</td></tr>
          </table>
        </div>

        ${control.description ? `
        <div class="control-detail-section">
          <h3>Description</h3>
          <p>${this.escapeHtml(control.description)}</p>
        </div>
        ` : ''}

        ${control.evidenceLinks?.length > 0 ? `
        <div class="control-detail-section">
          <h3>Evidence</h3>
          <ul>
            ${control.evidenceLinks.map(link => `<li><a href="${this.escapeHtml(link)}" target="_blank">${this.escapeHtml(link)}</a></li>`).join('')}
          </ul>
        </div>
        ` : ''}

        ${control.procedures?.length > 0 ? `
        <div class="control-detail-section">
          <h3>Procedures (${control.procedures.length})</h3>
          ${control.procedures.map(proc => `
            <div class="procedure-card">
              <h4>${this.escapeHtml(proc.procedureName)}</h4>
              <p><strong>Frequency:</strong> ${proc.frequency}</p>
              ${proc.lastExecuted ? `<p><strong>Last Executed:</strong> ${proc.lastExecuted}</p>` : ''}
              ${proc.description ? `<p>${this.escapeHtml(proc.description)}</p>` : ''}
              ${proc.steps?.length > 0 ? `
                <ol class="procedure-steps">
                  ${proc.steps.map(step => `
                    <li>
                      ${this.escapeHtml(step.description)}
                      ${step.responsible ? `<br><small>Responsible: ${this.escapeHtml(step.responsible)}</small>` : ''}
                    </li>
                  `).join('')}
                </ol>
              ` : ''}
            </div>
          `).join('')}
        </div>
        ` : ''}

        ${control.notes ? `
        <div class="control-detail-section">
          <h3>Notes</h3>
          <p>${this.escapeHtml(control.notes)}</p>
        </div>
        ` : ''}

        <div class="control-detail-footer">
          <small>Created: ${new Date(control.createdAt).toLocaleString()}</small>
          <small>Updated: ${new Date(control.updatedAt).toLocaleString()}</small>
        </div>
      `;
      this.toggleElement('controlDetailModal');
    }
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

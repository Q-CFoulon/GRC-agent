/**
 * GRC Agent Web Application
 * Client-side logic for the web interface
 */

class GRCWebApp {
    constructor() {
        this.apiEndpoint = localStorage.getItem('apiEndpoint') || 'http://localhost:3000';
        this.currentPage = 'chat';
        this.messages = [];
        this.policies = [];
        this.plans = [];
        this.frameworks = [];
        this.stats = { policies: 0, plans: 0, messages: 0 };
        this.activity = [];
    }

    async init() {
        this.setupEventListeners();
        await this.loadFrameworks();
        this.loadSettings();
        this.addActivity('App initialized');
    }

    setupEventListeners() {
        // Navigation
        document.querySelectorAll('.nav-item').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const page = btn.dataset.page;
                this.navigateTo(page);
            });
        });

        // Chat
        document.getElementById('messageInput')?.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.sendMessage();
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
            this.searchFrameworks(e.target.value);
        });

        // Dark mode toggle
        document.getElementById('darkModeToggle')?.addEventListener('change', (e) => {
            if (e.target.checked) {
                document.body.classList.add('dark-mode');
                localStorage.setItem('darkMode', 'true');
            } else {
                document.body.classList.remove('dark-mode');
                localStorage.setItem('darkMode', 'false');
            }
        });

        // Modal close
        document.querySelectorAll('.modal-close').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const modal = e.target.closest('.modal');
                if (modal) {
                    modal.style.display = 'none';
                }
            });
        });
    }

    async sendMessage() {
        const input = document.getElementById('messageInput');
        const message = input?.value.trim();

        if (!message) return;

        // Add user message
        this.addChatMessage(message, 'user');
        input.value = '';

        try {
            const response = await fetch(`${this.apiEndpoint}/api/grc/process`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message })
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

    handleQuickAction(action) {
        const input = document.getElementById('messageInput');
        if (input) {
            input.value = action;
            this.sendMessage();
        }
    }

    addChatMessage(content, sender) {
        const messagesDiv = document.getElementById('messages');
        if (!messagesDiv) return;

        const messageEl = document.createElement('div');
        messageEl.className = `message message-${sender}`;
        messageEl.innerHTML = `<div class="message-content">${this.escapeHtml(content)}</div>`;

        messagesDiv.appendChild(messageEl);
        messagesDiv.scrollTop = messagesDiv.scrollHeight;

        this.messages.push({ content, sender, timestamp: new Date() });
    }

    async generatePolicy() {
        const title = document.getElementById('policyTitle')?.value;
        const organization = document.getElementById('organization')?.value;
        const frameworks = Array.from(document.getElementById('policyFrameworks')?.selectedOptions || [])
            .map(opt => opt.value);

        if (!title || !organization) {
            alert('Please fill in all required fields');
            return;
        }

        try {
            const response = await fetch(`${this.apiEndpoint}/api/grc/process`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    message: `Generate a ${frameworks.join(', ')} policy titled "${title}" for ${organization}`
                })
            });

            const data = await response.json();
            if (data.success) {
                this.stats.policies++;
                this.updatePoliciesList();
                alert('Policy generated successfully!');
                this.addActivity(`Generated policy: ${title}`);
            }
        } catch (error) {
            console.error('Error generating policy:', error);
            alert('Failed to generate policy');
        }
    }

    async generatePlan() {
        const type = document.getElementById('planType')?.value;
        const title = document.getElementById('planTitle')?.value;
        const organization = document.getElementById('planOrganization')?.value;
        const frameworks = Array.from(document.getElementById('planFrameworks')?.selectedOptions || [])
            .map(opt => opt.value);

        if (!type || !title || !organization) {
            alert('Please fill in all required fields');
            return;
        }

        try {
            const response = await fetch(`${this.apiEndpoint}/api/grc/process`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    message: `Generate a ${type} plan titled "${title}" for ${organization} aligned with ${frameworks.join(', ')}`
                })
            });

            const data = await response.json();
            if (data.success) {
                this.stats.plans++;
                this.updatePlansList();
                alert('Plan generated successfully!');
                this.addActivity(`Generated plan: ${title}`);
            }
        } catch (error) {
            console.error('Error generating plan:', error);
            alert('Failed to generate plan');
        }
    }

    async loadFrameworks() {
        try {
            const response = await fetch(`${this.apiEndpoint}/api/grc/frameworks`);
            const data = await response.json();

            if (data.success) {
                this.frameworks = data.frameworks;
                this.displayFrameworks();
            }
        } catch (error) {
            console.error('Error loading frameworks:', error);
        }
    }

    displayFrameworks(filter = '') {
        const container = document.getElementById('frameworksList');
        if (!container) return;

        const filtered = filter
            ? this.frameworks.filter(f => 
                f.name.toLowerCase().includes(filter.toLowerCase()) ||
                f.organization.toLowerCase().includes(filter.toLowerCase())
            )
            : this.frameworks;

        container.innerHTML = filtered.map(fw => `
            <div class="framework-card" onclick="app.showFrameworkDetail('${fw.id}')">
                <div class="card-title">${fw.name}</div>
                <div style="font-size: 12px; color: var(--gray);">v${fw.version}</div>
                <div style="font-size: 12px; margin-top: 8px;">${fw.total_controls} controls</div>
            </div>
        `).join('');
    }

    searchFrameworks(query) {
        this.displayFrameworks(query);
    }

    async showFrameworkDetail(frameworkId) {
        try {
            const response = await fetch(`${this.apiEndpoint}/api/grc/frameworks/${frameworkId}`);
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

    updatePoliciesList() {
        const list = document.getElementById('policiesList');
        if (!list) return;

        if (this.policies.length === 0) {
            list.innerHTML = '<p class="empty-state">No policies yet. Generate one above!</p>';
        } else {
            list.innerHTML = this.policies.map(p => `
                <div class="policy-card">
                    <div class="card-title">${p.title}</div>
                    <div class="card-meta">
                        <span>📋 ${p.framework}</span>
                        <span>🏢 ${p.organization}</span>
                    </div>
                    <div class="card-actions">
                        <button class="btn btn-small" onclick="app.exportPolicy('${p.id}')">Export</button>
                        <button class="btn btn-small btn-danger" onclick="app.deletePolicy('${p.id}')">Delete</button>
                    </div>
                </div>
            `).join('');
        }
    }

    updatePlansList() {
        const list = document.getElementById('plansList');
        if (!list) return;

        if (this.plans.length === 0) {
            list.innerHTML = '<p class="empty-state">No plans yet. Generate one above!</p>';
        } else {
            list.innerHTML = this.plans.map(p => `
                <div class="plan-card">
                    <div class="card-title">${p.title}</div>
                    <div class="card-meta">
                        <span>📊 ${p.type}</span>
                        <span>📋 ${p.status}</span>
                    </div>
                    <div class="card-actions">
                        <button class="btn btn-small" onclick="app.exportPlan('${p.id}')">Export</button>
                        <button class="btn btn-small btn-danger" onclick="app.deletePlan('${p.id}')">Delete</button>
                    </div>
                </div>
            `).join('');
        }
    }

    navigateTo(page) {
        // Hide all pages
        document.querySelectorAll('.page').forEach(p => p.style.display = 'none');

        // Remove active from nav items
        document.querySelectorAll('.nav-item').forEach(btn => {
            btn.classList.remove('active');
        });

        // Show selected page
        const pageEl = document.getElementById(`${page}-page`);
        if (pageEl) {
            pageEl.style.display = 'flex';
        }

        // Mark nav item as active
        document.querySelector(`[data-page="${page}"]`)?.classList.add('active');

        this.currentPage = page;
    }

    updateAnalytics() {
        document.getElementById('policiesCount').textContent = this.stats.policies;
        document.getElementById('plansCount').textContent = this.stats.plans;
        document.getElementById('messagesCount').textContent = this.stats.messages;
    }

    updateActivityLog() {
        const log = document.getElementById('activityLog');
        if (!log) return;

        if (this.activity.length === 0) {
            log.innerHTML = '<p class="empty-state">No activity yet</p>';
        } else {
            log.innerHTML = this.activity.slice(-10).reverse().map(a => 
                `<div class="activity-item">📌 ${a}</div>`
            ).join('');
        }
    }

    addActivity(action) {
        const time = new Date().toLocaleTimeString();
        this.activity.push(`[${time}] ${action}`);
        this.updateActivityLog();
    }

    exportPolicy(policyId) {
        // Placeholder
        alert(`Exporting policy ${policyId}`);
        this.addActivity(`Exported policy: ${policyId}`);
    }

    exportPlan(planId) {
        // Placeholder
        alert(`Exporting plan ${planId}`);
        this.addActivity(`Exported plan: ${planId}`);
    }

    deletePolicy(policyId) {
        if (confirm('Are you sure you want to delete this policy?')) {
            this.policies = this.policies.filter(p => p.id !== policyId);
            this.updatePoliciesList();
            this.addActivity(`Deleted policy: ${policyId}`);
        }
    }

    deletePlan(planId) {
        if (confirm('Are you sure you want to delete this plan?')) {
            this.plans = this.plans.filter(p => p.id !== planId);
            this.updatePlansList();
            this.addActivity(`Deleted plan: ${planId}`);
        }
    }

    clearHistory() {
        if (confirm('Clear all chat history?')) {
            document.getElementById('messages').innerHTML = '';
            this.messages = [];
            this.addActivity('Cleared chat history');
        }
    }

    saveSettings() {
        const endpoint = document.getElementById('apiEndpoint')?.value;
        if (endpoint) {
            localStorage.setItem('apiEndpoint', endpoint);
            this.apiEndpoint = endpoint;
            alert('Settings saved!');
        }
    }

    loadSettings() {
        const endpoint = localStorage.getItem('apiEndpoint');
        const darkMode = localStorage.getItem('darkMode') === 'true';

        if (endpoint) {
            const input = document.getElementById('apiEndpoint');
            if (input) input.value = endpoint;
        }

        if (darkMode) {
            document.body.classList.add('dark-mode');
            const toggle = document.getElementById('darkModeToggle');
            if (toggle) toggle.checked = true;
        }
    }

    toggleElement(elementId) {
        const el = document.getElementById(elementId);
        if (el) {
            el.style.display = el.style.display === 'none' ? 'flex' : 'none';
        }
    }

    escapeHtml(text) {
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

// Expose functions for HTML onclick handlers
function sendMessage() {
    app.sendMessage();
}

function handleQuickAction(action) {
    app.handleQuickAction(action);
}

function clearHistory() {
    app.clearHistory();
}

function saveSettings() {
    app.saveSettings();
}

function toggleElement(id) {
    app.toggleElement(id);
}

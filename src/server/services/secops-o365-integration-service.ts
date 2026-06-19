/**
 * SecOps O365 Command Dashboard integration service.
 * Proxies approved dashboard endpoints with optional bearer auth.
 */

export interface SecOpsApprovalDecision {
  approved: boolean;
  approvedBy: string;
  notes?: string;
}

export interface SecOpsIncidentUpdate {
  assignedTo?: string;
  status?: string;
  classification?: string;
  determination?: string;
  comment?: string;
  tags?: string[];
}

interface RequestOptions {
  method?: 'GET' | 'POST' | 'PATCH';
  query?: Record<string, string | number | boolean | undefined>;
  body?: unknown;
}

export class SecOpsIntegrationError extends Error {
  constructor(
    message: string,
    public readonly statusCode: number,
    public readonly responseBody?: string
  ) {
    super(message);
    this.name = 'SecOpsIntegrationError';
  }
}

export class SecOpsO365IntegrationService {
  private readonly baseUrl: string;
  private readonly apiToken?: string;
  private readonly timeoutMs: number;

  constructor() {
    this.baseUrl = (process.env.SECOPS_DASHBOARD_BASE_URL || 'http://localhost:7071').replace(/\/$/, '');
    this.apiToken = process.env.SECOPS_DASHBOARD_API_TOKEN;
    this.timeoutMs = Number(process.env.SECOPS_DASHBOARD_TIMEOUT_MS || 15000);
  }

  getConfigSummary(): { baseUrl: string; hasApiToken: boolean; timeoutMs: number } {
    return {
      baseUrl: this.baseUrl,
      hasApiToken: Boolean(this.apiToken),
      timeoutMs: this.timeoutMs
    };
  }

  async getHealth(): Promise<unknown> {
    return this.request('/api/health');
  }

  async listTenants(): Promise<unknown> {
    return this.request('/api/tenants');
  }

  async listIncidents(tenantAlias: string, top?: number, filter?: string): Promise<unknown> {
    return this.request(`/api/tenants/${encodeURIComponent(tenantAlias)}/incidents`, {
      query: {
        top,
        filter
      }
    });
  }

  async listCases(tenantAlias: string, limit?: number): Promise<unknown> {
    return this.request(`/api/tenants/${encodeURIComponent(tenantAlias)}/cases`, {
      query: { limit }
    });
  }

  async updateIncident(tenantAlias: string, incidentId: string, payload: SecOpsIncidentUpdate): Promise<unknown> {
    return this.request(`/api/tenants/${encodeURIComponent(tenantAlias)}/incidents/${encodeURIComponent(incidentId)}`, {
      method: 'PATCH',
      body: payload
    });
  }

  async getEvidenceLinks(tenantAlias: string, incidentId: string): Promise<unknown> {
    return this.request(
      `/api/tenants/${encodeURIComponent(tenantAlias)}/incidents/${encodeURIComponent(incidentId)}/evidence-links`
    );
  }

  async generateRemediationPlan(tenantAlias: string, incidentId: string): Promise<unknown> {
    return this.request(
      `/api/tenants/${encodeURIComponent(tenantAlias)}/incidents/${encodeURIComponent(incidentId)}/remediation/plan`,
      { method: 'POST' }
    );
  }

  async getRemediationProposal(proposalId: string): Promise<unknown> {
    return this.request(`/api/remediation/${encodeURIComponent(proposalId)}`);
  }

  async approveRemediationProposal(proposalId: string, decision: SecOpsApprovalDecision): Promise<unknown> {
    return this.request(`/api/remediation/${encodeURIComponent(proposalId)}/approve`, {
      method: 'POST',
      body: decision
    });
  }

  async getOpenAlertsReview(): Promise<unknown> {
    return this.request('/api/review/open-alerts');
  }

  private async request(path: string, options: RequestOptions = {}): Promise<unknown> {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), this.timeoutMs);

    try {
      const url = new URL(`${this.baseUrl}${path}`);
      if (options.query) {
        for (const [key, value] of Object.entries(options.query)) {
          if (value !== undefined && value !== null && value !== '') {
            url.searchParams.set(key, String(value));
          }
        }
      }

      const headers: Record<string, string> = {
        'Content-Type': 'application/json'
      };
      if (this.apiToken) {
        headers.Authorization = `Bearer ${this.apiToken}`;
      }

      const response = await fetch(url, {
        method: options.method || 'GET',
        headers,
        body: options.body ? JSON.stringify(options.body) : undefined,
        signal: controller.signal
      });

      if (!response.ok) {
        const text = await response.text();
        throw new SecOpsIntegrationError(
          `SecOps dashboard request failed (${response.status})`,
          response.status,
          text
        );
      }

      if (response.status === 204) {
        return { success: true };
      }

      const text = await response.text();
      if (!text) {
        return { success: true };
      }

      try {
        return JSON.parse(text);
      } catch {
        return { value: text };
      }
    } catch (error) {
      if (error instanceof SecOpsIntegrationError) {
        throw error;
      }
      if (error instanceof Error && error.name === 'AbortError') {
        throw new SecOpsIntegrationError('SecOps dashboard request timed out', 504);
      }
      throw new SecOpsIntegrationError(
        error instanceof Error ? error.message : 'SecOps dashboard request failed',
        502
      );
    } finally {
      clearTimeout(timer);
    }
  }
}

/**
 * Policy Service - Policy generation and lifecycle management
 */

import { v4 as uuidv4 } from 'uuid';
import {
  PolicyDocument,
  PolicyGenerationRequest,
  ComplianceFramework
} from '../types/framework.js';
import FrameworkRegistry from '../frameworks/index.js';

export class PolicyService {
  private policies: Map<string, PolicyDocument> = new Map();

  async generatePolicy(request: PolicyGenerationRequest): Promise<PolicyDocument> {
    const id = uuidv4();
    const now = new Date();

    const content = await this.generatePolicyContent(request);

    const policy: PolicyDocument = {
      id,
      title: request.title,
      organization: request.organization,
      framework: request.frameworks[0] || ComplianceFramework.NIST_CSF,
      content,
      createdAt: now,
      updatedAt: now,
      status: 'draft',
      version: '1.0.0'
    };

    this.policies.set(id, policy);
    return policy;
  }

  private async generatePolicyContent(request: PolicyGenerationRequest): Promise<string> {
    const frameworks = request.frameworks.map(f => {
      const fw = FrameworkRegistry.getFramework(f);
      return fw?.name || f;
    }).join(', ');

    const content = `# ${request.title}

## Policy Document
**Organization:** ${request.organization}
**Frameworks:** ${frameworks}
**Created:** ${new Date().toISOString()}

## 1. Purpose and Scope

This policy establishes requirements for ${request.title.toLowerCase()} within ${request.organization}.

### Scope
${request.scope || 'This policy applies to all organizational units and personnel.'}

### Audience
${request.audience || 'All employees, contractors, and partners'}

## 2. Policy Objectives

Align cybersecurity practices with the following frameworks:
${request.frameworks.map(f => `- ${FrameworkRegistry.getFramework(f)?.name}`).join('\n')}

## 3. Policy Requirements

${request.frameworks.map(f => `### ${FrameworkRegistry.getFramework(f)?.name}

The organization shall comply with all applicable requirements from this framework.`).join('\n\n')}

## 4. Roles and Responsibilities

- **Policy Owner:** Designated executive sponsor
- **Policy Administrator:** Day-to-day management and updates
- **Policy Reviewers:** Compliance and security professionals
- **Policy Audiences:** All covered personnel

## 5. Compliance and Enforcement

Violations of this policy may result in disciplinary action up to and including termination of employment.

## 6. Policy Review

This policy shall be reviewed annually or when regulatory requirements change.

---
**Status:** Draft
**Version:** 1.0.0
**Last Updated:** ${new Date().toISOString()}
`;

    return content;
  }

  getPolicy(id: string): PolicyDocument | undefined {
    return this.policies.get(id);
  }

  listPolicies(): PolicyDocument[] {
    return Array.from(this.policies.values());
  }

  listPoliciesByFramework(framework: ComplianceFramework): PolicyDocument[] {
    return Array.from(this.policies.values()).filter(p => p.framework === framework);
  }

  updatePolicy(id: string, updates: Partial<PolicyDocument>): PolicyDocument | undefined {
    const policy = this.policies.get(id);
    if (!policy) return undefined;

    const updated: PolicyDocument = {
      ...policy,
      ...updates,
      updatedAt: new Date()
    };

    this.policies.set(id, updated);
    return updated;
  }

  deletePolicy(id: string): boolean {
    return this.policies.delete(id);
  }

  exportPolicyAsMarkdown(id: string): string | undefined {
    const policy = this.policies.get(id);
    if (!policy) return undefined;
    return policy.content;
  }

  exportPolicyAsJSON(id: string): string | undefined {
    const policy = this.policies.get(id);
    if (!policy) return undefined;
    return JSON.stringify(policy, null, 2);
  }

  approvePolicy(id: string, approver: string): PolicyDocument | undefined {
    const policy = this.policies.get(id);
    if (!policy) return undefined;

    return this.updatePolicy(id, {
      status: 'approved',
      approvedBy: approver
    });
  }

  publishPolicy(id: string): PolicyDocument | undefined {
    const policy = this.policies.get(id);
    if (!policy) return undefined;

    return this.updatePolicy(id, {
      status: 'published'
    });
  }
}

export default PolicyService;

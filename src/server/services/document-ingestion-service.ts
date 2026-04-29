/**
 * Document Ingestion Service
 * Ingests and classifies client artifacts (policies, procedures, plans) for reuse.
 */

import crypto from 'crypto';
import { v4 as uuidv4 } from 'uuid';
import FrameworkRegistry from '../frameworks/index.js';
import {
  ClientArtifactType,
  ClientDocumentArtifact,
  ClientDocumentIngestionRequest,
  ComplianceFramework
} from '../types/framework.js';
import { localStoreService } from './local-store-service.js';

export class DocumentIngestionService {
  private documents: Map<string, ClientDocumentArtifact> = new Map();

  constructor() {
    localStoreService.getClientDocuments().forEach(document => {
      this.documents.set(document.id, document);
    });
  }

  ingestDocument(request: ClientDocumentIngestionRequest): ClientDocumentArtifact {
    const now = new Date();
    const type = request.type || this.detectArtifactType(request.title, request.content);
    const mappedFrameworks = this.detectFrameworks(request.title, request.content);
    const extractedControlIds = this.extractControlIds(request.content);

    const artifact: ClientDocumentArtifact = {
      id: uuidv4(),
      organization: request.organization,
      title: request.title,
      type,
      source: request.source || 'manual',
      content: request.content,
      mappedFrameworks,
      extractedControlIds,
      tags: request.tags || [],
      ingestedBy: request.ingestedBy,
      ingestedAt: now,
      updatedAt: now,
      checksum: this.generateChecksum(request.content)
    };

    this.documents.set(artifact.id, artifact);
    this.persist();

    return artifact;
  }

  listDocuments(filters?: {
    organization?: string;
    type?: ClientArtifactType;
    framework?: ComplianceFramework;
  }): ClientDocumentArtifact[] {
    let documents = Array.from(this.documents.values());

    if (filters?.organization) {
      const organization = filters.organization.toLowerCase();
      documents = documents.filter(document => document.organization.toLowerCase() === organization);
    }

    if (filters?.type) {
      documents = documents.filter(document => document.type === filters.type);
    }

    if (filters?.framework) {
      documents = documents.filter(document => document.mappedFrameworks.includes(filters.framework as ComplianceFramework));
    }

    return documents.sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime());
  }

  getDocument(id: string): ClientDocumentArtifact | undefined {
    return this.documents.get(id);
  }

  updateDocument(id: string, updates: Partial<ClientDocumentIngestionRequest>): ClientDocumentArtifact | undefined {
    const current = this.documents.get(id);
    if (!current) {
      return undefined;
    }

    const content = updates.content ?? current.content;
    const title = updates.title ?? current.title;

    const updated: ClientDocumentArtifact = {
      ...current,
      ...updates,
      title,
      content,
      type: updates.type || this.detectArtifactType(title, content),
      mappedFrameworks: this.detectFrameworks(title, content),
      extractedControlIds: this.extractControlIds(content),
      checksum: this.generateChecksum(content),
      updatedAt: new Date()
    };

    this.documents.set(id, updated);
    this.persist();
    return updated;
  }

  private persist(): void {
    localStoreService.setClientDocuments(Array.from(this.documents.values()));
  }

  private detectArtifactType(title: string, content: string): ClientArtifactType {
    const text = `${title} ${content}`.toLowerCase();

    if (text.includes('procedure') || text.includes('runbook') || text.includes('workflow')) {
      return 'procedure';
    }

    if (text.includes('system security plan') || text.includes('ssp')) {
      return 'ssp';
    }

    if (text.includes('incident response plan') || text.includes('irp')) {
      return 'irp';
    }

    if (text.includes('security plan')) {
      return 'security-plan';
    }

    if (text.includes('system plan') || text.includes('architecture plan')) {
      return 'system-plan';
    }

    if (text.includes('policy') || text.includes('standard')) {
      return 'policy';
    }

    return 'other';
  }

  private detectFrameworks(title: string, content: string): ComplianceFramework[] {
    const text = `${title} ${content}`.toLowerCase();
    const matches: ComplianceFramework[] = [];

    const aliases: Array<[string, ComplianceFramework]> = [
      ['nist csf', ComplianceFramework.NIST_CSF],
      ['nist-csf', ComplianceFramework.NIST_CSF],
      ['nist 800-53', ComplianceFramework.NIST_800_53],
      ['cmmc', ComplianceFramework.NIST_CMMC],
      ['hipaa', ComplianceFramework.HIPAA],
      ['hitrust', ComplianceFramework.HITRUST],
      ['soc 2', ComplianceFramework.SOC2],
      ['soc2', ComplianceFramework.SOC2],
      ['sox', ComplianceFramework.SOX],
      ['gdpr', ComplianceFramework.GDPR],
      ['ccpa', ComplianceFramework.CCPA],
      ['glba', ComplianceFramework.GLBA],
      ['cis controls', ComplianceFramework.CIS_CONTROLS],
      ['cjis', ComplianceFramework.CJIS],
      ['pci dss', ComplianceFramework.PCI_DSS],
      ['pci-dss', ComplianceFramework.PCI_DSS]
    ];

    aliases.forEach(([alias, framework]) => {
      if (text.includes(alias) && !matches.includes(framework)) {
        matches.push(framework);
      }
    });

    // Check against framework display names as a fallback.
    FrameworkRegistry.getAllFrameworks().forEach(framework => {
      const normalizedName = framework.name.toLowerCase();
      if (text.includes(normalizedName) && !matches.includes(framework.id)) {
        matches.push(framework.id);
      }
    });

    return matches;
  }

  private extractControlIds(content: string): string[] {
    const regex = /\b([A-Z]{2,6}(?:[.-][A-Z0-9]{1,8}){1,3})\b/g;
    const matches = content.toUpperCase().match(regex) || [];

    return Array.from(new Set(matches)).slice(0, 200);
  }

  private generateChecksum(content: string): string {
    return crypto.createHash('sha256').update(content).digest('hex');
  }
}

export default DocumentIngestionService;

# API Reference - GRC Agent

Complete REST API documentation for the GRC Agent.

## Base URL
```
http://localhost:3000/api
```

## Authentication
Currently, the API uses no authentication. In production, implement OAuth2 or API key authentication.

## Endpoints

### 1. Process Message

**Endpoint:** `POST /grc/process`

Process a user message through the GRC Agent.

**Request:**
```json
{
  "message": "Generate an access control policy for HIPAA",
  "userId": "user123",
  "conversationId": "conv456"
}
```

**Response:**
```json
{
  "success": true,
  "response": "Generated policy...",
  "intent": "generate-policy",
  "data": { },
  "conversationId": "conv456",
  "timestamp": "2024-02-26T10:30:00Z"
}
```

**Intents Recognized:**
- `generate-policy` - Create a new policy
- `analyze-policy` - Analyze policy for gaps
- `generate-plan` - Create a security/compliance plan
- `framework-info` - Get framework information
- `list-frameworks` - List available frameworks
- `general-query` - General question or help

---

### 2. List Frameworks

**Endpoint:** `GET /grc/frameworks`

Get all available compliance frameworks.

**Response:**
```json
{
  "success": true,
  "count": 9,
  "frameworks": [
    {
      "id": "nist-csf",
      "name": "NIST Cybersecurity Framework",
      "version": "2.0",
      "description": "...",
      "organization": "NIST",
      "total_controls": 265,
      "categories": ["Govern", "Protect", "Detect", "Respond", "Recover"],
      "url": "https://..."
    }
  ]
}
```

---

### 3. Get Framework Details

**Endpoint:** `GET /grc/frameworks/:id`

Get detailed information about a specific framework.

**Parameters:**
- `id` (string) - Framework ID (e.g., `nist-csf`, `hipaa`)

**Response:**
```json
{
  "success": true,
  "framework": { },
  "summary": "NIST Cybersecurity Framework v2.0..."
}
```

---

### 4. List Framework Controls

**Endpoint:** `GET /grc/frameworks/:id/controls`

Get all controls/requirements for a framework.

**Response:**
```json
{
  "success": true,
  "frameworkId": "nist-csf",
  "count": 265,
  "controls": [
    {
      "id": "GV.RO-01",
      "title": "Organizational roles and responsibilities...",
      "description": "...",
      "implementation": "...",
      "assessment": "..."
    }
  ]
}
```

---

### 5. Search Frameworks

**Endpoint:** `GET /grc/search?q=keyword`

Global search across all frameworks and controls.

**Parameters:**
- `q` (string, required) - Search query (minimum 2 characters)

**Response:**
```json
{
  "success": true,
  "query": "authentication",
  "resultCount": 42,
  "results": [
    {
      "framework": "nist-csf",
      "controlId": "GV.RO-01",
      "controlTitle": "...",
      "relevance": 2.5,
      "description": "..."
    }
  ]
}
```

---

### 6. Get Agent Info

**Endpoint:** `GET /grc/agent`

Get agent status and conversation history.

**Response:**
```json
{
  "success": true,
  "agent": {
    "name": "GRC Agent",
    "version": "1.0.0",
    "status": "ready",
    "capabilities": [
      "Policy Generation",
      "Gap Analysis",
      "Plan Generation",
      "Framework Information"
    ]
  },
  "conversationHistory": [ ]
}
```

---

### 7. Clear Conversation

**Endpoint:** `POST /grc/agent/clear`

Clear the conversation history.

**Response:**
```json
{
  "success": true,
  "message": "Conversation history cleared"
}
```

---

### 8. Health Check

**Endpoint:** `GET /health`

Check if the API is running.

**Response:**
```json
{
  "status": "ok",
  "service": "grc-agent-api",
  "timestamp": "2024-02-26T10:30:00Z"
}
```

---

### 9. Offline Package Status

**Endpoint:** `GET /grc/offline/status`

Returns local-offline continuity status, including local package counts and connection health.

**Response:**
```json
{
  "success": true,
  "status": {
    "frameworkCount": 13,
    "frameworkControlCount": 1400,
    "policyCount": 8,
    "procedureCount": 14,
    "connections": [
      {
        "id": "mcp-servers",
        "name": "External MCP Servers",
        "status": "degraded",
        "lastCheckedAt": "2026-04-29T12:30:00Z"
      }
    ]
  }
}
```

---

### 10. Export Offline Package

**Endpoint:** `GET /grc/offline/package`

Returns local snapshot of framework structures/controls, policies, plans, controls, procedures, ingested documents, exemptions, and improvement insights.

---

### 11. Ingest Client Documents

**Endpoint:** `POST /grc/documents/ingest`

Ingest existing client artifacts such as policies, procedures, security plans, and system plans.

**Request:**
```json
{
  "organization": "Contoso Health",
  "title": "Access Control Procedure",
  "content": "...document text...",
  "type": "procedure",
  "source": "upload",
  "ingestedBy": "consultant@contoso.com"
}
```

**Response:**
```json
{
  "success": true,
  "artifact": {
    "id": "...",
    "mappedFrameworks": ["hipaa", "nist-csf"],
    "extractedControlIds": ["AC-2", "IA-5"]
  }
}
```

Related endpoints:
- `GET /grc/documents`
- `GET /grc/documents/:id`
- `PUT /grc/documents/:id`

---

### 12. Documentation Gap Analysis

**Endpoint:** `POST /grc/documentation/gap-analysis`

Scans local documentation (`docs/`) and estimates control coverage for selected frameworks.

**Request:**
```json
{
  "frameworks": ["nist-csf", "nist-800-53", "hipaa"]
}
```

**Response:**
```json
{
  "success": true,
  "overallCoverage": 61,
  "results": [
    {
      "framework": "nist-csf",
      "coverage": 68,
      "uncoveredControls": [
        {
          "controlId": "GV.OC-01",
          "severity": "high"
        }
      ]
    }
  ],
  "insightsCaptured": 2
}
```

---

### 13. Gap Exemptions (Risk Acceptance)

**Endpoint:** `POST /grc/exemptions`

Record why a gap is accepted, risk/mitigation context, residual risk, owner, and next review date.

**Request:**
```json
{
  "organization": "Contoso Health",
  "framework": "hipaa",
  "controlId": "164.308(a)(4)",
  "gapDescription": "Legacy system does not support automated role recertification",
  "acceptanceJustification": "System replacement is scheduled in next fiscal cycle",
  "riskIdentified": "Excess privileged access persistence",
  "mitigationsInPlace": "Quarterly manual review and manager attestation",
  "residualRisk": "Medium",
  "riskOwner": "Director of Infrastructure",
  "nextReviewDate": "2026-09-30T00:00:00.000Z"
}
```

Related endpoints:
- `GET /grc/exemptions`
- `GET /grc/exemptions/:id`
- `PUT /grc/exemptions/:id`

---

### 14. Continuous Improvement Insights

Capture and retrieve lessons learned for recommendation quality and runtime reliability.

Endpoints:
- `POST /grc/improvement/insights`
- `POST /grc/improvement/runtime-errors`
- `GET /grc/improvement/insights`
- `POST /grc/improvement/insights/:id/feedback`

---

## Error Handling

### Common Error Responses

**400 Bad Request:**
```json
{
  "error": "Message is required"
}
```

**404 Not Found:**
```json
{
  "error": "Framework not found"
}
```

**500 Internal Server Error:**
```json
{
  "error": "Internal server error",
  "message": "..."
}
```

## Examples

### JavaScript (Fetch API)

**Generate Policy:**
```javascript
const response = await fetch('http://localhost:3000/api/grc/process', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    message: 'Generate access control policy for NIST CSF'
  })
});

const data = await response.json();
console.log('Policy:', data.response);
```

**Get Framework:**
```javascript
const response = await fetch('http://localhost:3000/api/grc/frameworks/nist-csf');
const data = await response.json();
console.log('Framework:', data.framework);
```

### Python

**Process Message:**
```python
import requests
import json

response = requests.post(
    'http://localhost:3000/api/grc/process',
    headers={'Content-Type': 'application/json'},
    json={'message': 'Create incident response plan'}
)

data = response.json()
print('Response:', data['response'])
```

### cURL

**Search Frameworks:**
```bash
curl "http://localhost:3000/api/grc/search?q=encryption" \
  -H "Accept: application/json"
```

**List Frameworks:**
```bash
curl http://localhost:3000/api/grc/frameworks \
  -H "Accept: application/json" | jq .
```

## Rate Limiting

Currently, there is no rate limiting. In production, implement:
- Rate limiting per user/IP
- Request throttling
- API key quota management

## Versioning

Current API version: v1.0.0
- Endpoint prefix: `/api`
- No version in URL (implicit v1)

Future versions may support: `/api/v2/...`

## Deprecation Policy

- Deprecated features will be announced in release notes
- Minimum 3 months notice before removal
- Subscribe to releases for updates

---

**Need help?** See [quickstart.md](quickstart.md) or [examples.md](examples.md).

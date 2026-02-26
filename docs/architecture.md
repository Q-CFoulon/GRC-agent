# Architecture - GRC Agent

Comprehensive overview of the GRC Agent system architecture, design patterns, and data flow.

## System Overview

```
┌────────────────────────────────────────────────────────────────┐
│                         User Interfaces                        │
├────────────────────────────────────────────────────────────────┤
│  Web UI (HTML/CSS/JS) │ Teams Bot │ REST API │ Custom Apps    │
└────────────────────────────────────────────────────────────────┘
                              ↓
┌────────────────────────────────────────────────────────────────┐
│                    GRC Agent Core (Agent)                      │
├────────────────────────────────────────────────────────────────┤
│  • Intent Detection (NLP)                                      │
│  • Request Routing                                             │
│  • Response Composition                                        │
│  • Conversation History Management                             │
└────────────────────────────────────────────────────────────────┘
                              ↓
        ┌─────────────────────┼─────────────────────┐
        ↓                     ↓                     ↓
    ┌─────────┐          ┌──────────┐         ┌────────┐
    │  Policy │          │Framework │         │Planning│
    │ Service │          │ Service  │         │Service │
    └─────────┘          └──────────┘         └────────┘
        ↓                     ↓                     ↓
    ┌─────────────────────────────────────────────────────┐
    │        Framework & Data Registry                    │
    ├──────────────────┬──────────────────┬───────────────┤
    │  NIST CSF 2.0    │ NIST 800-53     │ HIPAA/HITRUST │
    │  GDPR/CCPA       │ SOX/SOC2        │ CMMC/etc       │
    └──────────────────┴──────────────────┴───────────────┘
        ↓
    ┌─────────────────────────────────────────────────────┐
    │        Persistent Storage (Future)                  │
    │  PostgreSQL / Cosmos DB / Cloud Storage             │
    └─────────────────────────────────────────────────────┘
```

## Component Architecture

### Layer 1: User Interfaces

**Web Interface** (`/public`)
- Modern HTML5/CSS3/JavaScript UI
- Browser-based, no framework dependencies
- Real-time interaction with REST API
- Responsive design (desktop/tablet/mobile)
- Dark mode support
- Settings persistence

**Teams Bot** (`/src/teams/bot.ts`)
- Native Microsoft Teams integration
- Conversational interface
- Session management per user
- Message formatting for Teams constraints
- Supports long-form responses via chunking

**REST API** (`/src/index.ts`)
- Express.js HTTP server
- JSON request/response
- 8 core endpoints
- Static file serving
- Health checks
- Error handling middleware

### Layer 2: GRC Agent Core (`/src/agent/index.ts`)

**Responsibilities:**
- Natural language processing for intent detection
- Request routing to appropriate services
- Response composition
- Conversation history management
- Error handling and fallback responses

**Intent Recognition:**
- `generate-policy` - Policy creation
- `analyze-policy` - Gap analysis
- `generate-plan` - Plan generation
- `framework-info` - Framework details
- `list-frameworks` - Available frameworks
- `general-query` - Fallback/help

**Entity Extraction:**
- Compliance frameworks
- Organization names
- Policy titles
- Plan types
- Context/scope

### Layer 3: Services (`/src/services/`)

**PolicyService** - Policy Management
- `generatePolicy()` - Create new policy
- `listPolicies()` - Retrieve all policies
- `updatePolicy()` - Modify existing policy
- `deletePolicy()` - Remove policy
- Export to markdown/JSON

**FrameworkService** - Compliance Analysis
- `analyzePolicy()` - Gap analysis
- `identifyGaps()` - Find missing controls
- `calculateCoverage()` - Compliance percentage
- `generateRecommendations()` - Remediation guidance
- `compareFrameworks()` - Cross-framework analysis

**PlanningService** - Plan Generation
- `generatePlan()` - Create security/compliance plan
- `generateSSPSections()` - System Security Plan (6 sections)
- `generateIRPSections()` - Incident Response Plan (6 sections)
- `generateBRPSections()` - Breach Response Plan (5 sections)
- `generateBCDRSections()` - BC/DR Plan (5 sections)
- `generateTestFailoverSections()` - Test plan (5 sections)
- Export to markdown

### Layer 4: Framework & Data Registry (`/src/frameworks/`)

**FrameworkRegistry** - Central Framework Management
- `getFramework(id)` - Retrieve framework
- `getAllFrameworks()` - List all 9 frameworks
- `getFrameworkControls()` - List controls for framework
- `searchFrameworks()` - Global search
- `compareFrameworks()` - Framework overlap analysis

**Framework Definitions:**
- `nist-csf.ts` - NIST CSF 2.0 (265 controls)
- `nist-800-53.ts` - NIST 800-53 (988 controls)
- Placeholder implementations for 7 additional frameworks

### Layer 5: Type System (`/src/types/framework.ts`)

**Enums:**
- `ComplianceFramework` - 9 framework types
- `PlanType` - 5 security plan types

**Interfaces:**
- `PolicyDocument` - Policy representation
- `SecurityPlan` - Plan with sections
- `GapAnalysisResult` - Analysis with gaps/recommendations
- `ControlRequirement` - Individual control
- Request/response types for all operations

## Data Flow Diagrams

### 1. Policy Generation Flow
```
User Message
    ↓
Intent Detection (generate-policy)
    ↓
Extract: title, organization, frameworks
    ↓
PolicyService.generatePolicy()
    ↓
FrameworkRegistry.getFrameworkControls()
    ↓
Generate markdown policy content
    ↓
Store in memory/database
    ↓
Return policy + confirmation message
    ↓
Display in UI / Send via Teams
```

### 2. Gap Analysis Flow
```
User Message
    ↓
Intent Detection (analyze-policy)
    ↓
Extract: policy_id, frameworks
    ↓
FrameworkService.analyzePolicy()
    ├─ Get framework controls
    ├─ Scan policy for control mentions
    ├─ Identify gaps
    ├─ Calculate coverage
    ├─ Assess severity
    └─ Generate recommendations
    ↓
Return GapAnalysisResult
    ↓
Format response with gaps + recommendations
    ↓
Display/send to user
```

### 3. Plan Generation Flow
```
User Message
    ↓
Intent Detection (generate-plan)
    ↓
Extract: plan_type, organization, frameworks
    ↓
PlanningService.generatePlan()
    ├─ Determine plan sections (by type)
    ├─ Generate each section
    ├─ Add responsibilities + timelines
    └─ Assemble SecurityPlan object
    ↓
Store in memory/database
    ↓
Format as markdown
    ↓
Return plan + confirmation
    ↓
Display in UI / Send via Teams
```

## Technology Stack

### Runtime & Language
- **Node.js** 18+
- **TypeScript** 5.3+
- **ES Modules** (import/export)

### HTTP & APIs
- **Express.js** 4.18 - HTTP server
- **Fetch API** - Client-side HTTP

### AI/LLM
- **Azure OpenAI** - Language model
- Intent detection via LLM
- Response generation

### Bots & Chat
- **Microsoft Bot Framework** 4.22 - Teams integration
- **Teams AI SDK** - Natural language processing

### Data & Storage
- **In-Memory Storage** - Current (v1)
- **UUID** - Unique IDs

### Validation & Types
- **Zod** 3.22 - Schema validation
- **TypeScript** - Type safety

## Design Patterns

### 1. Service Pattern
Three independent services (Policy, Framework, Planning) each handle their domain.

**Benefits:**
- Single responsibility
- Easy to test
- Easy to replace/extend

### 2. Registry Pattern
FrameworkRegistry centralizes framework definitions and provides consistent access.

**Benefits:**
- Centralized management
- Easy to add frameworks
- Single source of truth

### 3. Agent/Router Pattern
GRCAgent routes requests to appropriate service based on intent.

**Benefits:**
- Flexible routing logic
- Support multiple intent types
- Simple to extend

### 4. Session Pattern
Teams bot maintains per-user GRCAgent instances for isolated conversations.

**Benefits:**
- User isolation
- Conversation history per user
- Scalable architecture

## Scalability Considerations

### Current Limitations
- In-memory storage (lost on restart)
- Single Node.js process
- No external database
- No caching layer

### Scaling Strategies

**Horizontal Scaling:**
- Add load balancer
- Run multiple Node.js instances
- Use external database
- Add session store (Redis)

**Vertical Scaling:**
- Increase CPU/memory
- Optimize algorithms
- Cache framework data
- Lazy-load controls

**Caching:**
- Cache framework definitions
- Cache search results
- Cache generated content
- Use Redis for session store

## Error Handling

### Error Types
1. **User Input Errors** - Invalid message format
2. **Business Logic Errors** - Framework not found
3. **System Errors** - Database connection failed
4. **External Errors** - Azure OpenAI timeout

### Error Response
```json
{
  "success": false,
  "error": "Human-readable error message"
}
```

### Logging
- Error logging to console
- Application Insights integration (production)
- Error context preserved for debugging

## Security Considerations

### Current Implementation
- No authentication/authorization
- No rate limiting
- No encryption at rest
- CORS not configured

### Production Enhancements
- Implement OAuth2/JWT
- Add rate limiting
- Enable HTTPS
- Encrypt sensitive data
- Implement RBAC
- Add audit logging

## Testing Strategy

### Unit Tests
- Test each service independently
- Mock external dependencies
- 80%+ code coverage goal

### Integration Tests
- Test agent message routing
- Verify policy generation flow
- Validate gap analysis accuracy

### E2E Tests
- Web UI workflows
- Teams bot interactions
- REST API endpoints

### Performance Tests
- Response time benchmarks
- Large dataset handling
- Concurrent user load

## Deployment Architecture

### Development
```
Developer Machine
├── npm run dev (API on :3000)
├── npm run teams-dev (Bot on :3978)
└── SQLite/in-memory storage
```

### Production (Azure)
```
Azure Load Balancer
├── App Service Instance 1
├── App Service Instance 2
└── App Service Instance 3
    ↓
Azure Database (PostgreSQL/Cosmos)
    ↓
Azure Application Insights (Logging)
    ↓
Azure OpenAI (LLM)
```

## Future Architecture

### Planned Enhancements
1. **MCP Server Integration** - Connect NIST CSF 2.0 MCP server
2. **Advanced Caching** - Redis for performance
3. **Multi-tenant Support** - Tenant isolation
4. **Advanced Analytics** - Usage patterns, trends
5. **Workflow Engine** - Complex automation
6. **Integration Marketplace** - Connect external tools

---

**Questions?** See [deployment.md](deployment.md) or [api.md](api.md).

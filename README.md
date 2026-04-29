# GRC-agent

AI-powered Governance, Risk, and Compliance (GRC) agent for Microsoft Teams, Web interfaces, and MCP (Model Context Protocol).

## Features

- **Policy Generation** - Generate security policies aligned with compliance frameworks
- **Gap Analysis** - Analyze policies against NIST CSF, NIST 800-53, HIPAA, and other frameworks
- **Security Plans** - Create SSP, IRP, BRP, BC/DR, and Test/Failover plans
- **Offline Continuity Package** - Maintain a local package of frameworks, controls, policies, plans, procedures, and connection health
- **Client Artifact Ingestion** - Ingest existing client policies, procedures, and plans for reuse and analysis
- **Gap Exemption Tracking** - Record risk acceptance, mitigation details, residual risk, risk owner, and review dates
- **Continuous Improvement Insights** - Capture runtime errors and gap-analysis lessons learned to reinforce recommendations
- **Multi-Framework Support** - NIST CSF 2.0, NIST 800-53 Rev 5, CMMC, HIPAA, HITRUST, SOC 2, SOX, GDPR, CCPA
- **Microsoft Teams Integration** - Bot interface for team-wide GRC assistance
- **MCP Server** - Expose GRC tools to AI assistants like Claude via Model Context Protocol

## Project Structure

```
├── src/
│   ├── client/              # Vite frontend (TypeScript)
│   │   ├── main.ts          # Main application entry
│   │   └── style.css        # Styles
│   └── server/              # Express backend (TypeScript)
│       ├── index.ts         # Server entry point
│       ├── mcp/             # MCP server for AI assistants
│       ├── agent/           # GRC AI agent core
│       ├── frameworks/      # Compliance framework definitions
│       ├── services/        # Policy, framework, planning services
│       ├── teams/           # Microsoft Teams bot integration
│       └── types/           # TypeScript type definitions
├── index.html               # Vite entry HTML
├── vite.config.ts           # Vite configuration
├── tsconfig.json            # TypeScript config (client)
├── tsconfig.server.json     # TypeScript config (server)
├── mcp-config.example.json  # MCP configuration example
└── package.json
```

## Quick Start

### Prerequisites

- Node.js 18+ 
- npm 9+

### Installation

```bash
npm install
```

### Development

Run both frontend (Vite) and backend (Express) development servers:

```bash
npm run dev
```

- **Frontend**: http://localhost:5173 (Vite dev server with HMR)
- **Backend API**: http://localhost:3000/api (Express server)

The Vite dev server proxies `/api/*` requests to the Express backend.

### Individual Development Servers

```bash
# Frontend only
npm run dev:client

# Backend only
npm run dev:server
```

### Production Build

```bash
npm run build
```

This builds:
- Client → `dist/client/` (static assets)
- Server → `dist/server/` (Node.js bundle)

### Production Start

```bash
npm start
```

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/chat` | Send message to GRC agent |
| GET | `/api/policies` | List all policies |
| GET | `/api/policies/:id` | Get specific policy |
| GET | `/api/plans` | List all plans |
| GET | `/api/plans/:id` | Get specific plan |
| GET | `/api/frameworks` | List available frameworks |
| GET | `/api/frameworks/:id/controls` | Get framework controls |
| GET | `/api/grc/offline/status` | Offline package status and connection state |
| GET | `/api/grc/offline/package` | Full local offline package export |
| POST | `/api/grc/documents/ingest` | Ingest client policy/procedure/plan artifacts |
| POST | `/api/grc/documentation/gap-analysis` | Analyze documentation against framework controls |
| POST | `/api/grc/exemptions` | Create risk-acceptance gap exemption |
| GET | `/api/grc/improvement/insights` | List continuous-improvement lessons learned |
| GET | `/api/health` | Health check |

## Environment Variables

```bash
# Server
PORT=3000

# Microsoft Teams Bot (optional)
MICROSOFT_APP_ID=your-app-id
MICROSOFT_APP_PASSWORD=your-app-password

# Azure OpenAI (optional - for enhanced AI)
AZURE_OPENAI_ENDPOINT=https://your-resource.openai.azure.com
AZURE_OPENAI_KEY=your-key
AZURE_OPENAI_DEPLOYMENT=gpt-4
```

## Supported Frameworks

| Framework | Version | Controls |
|-----------|---------|----------|
| NIST CSF | 2.0 | 265 |
| NIST 800-53 | Rev 5 | 988 |
| CMMC | 2.0 | 110 |
| HIPAA | 2013 | 75 |
| HITRUST | 11 | 156 |
| SOC 2 | 2022 | 64 |
| SOX | 2002 | 42 |
| GDPR | 2018 | 99 |
| CCPA | 2020 | 45 |

## Example Usage

```typescript
// Generate a policy
await fetch('/api/chat', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    message: 'Generate an access control policy for NIST CSF'
  })
});

// Analyze compliance
await fetch('/api/chat', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    message: 'Analyze our policy against HIPAA requirements'
  })
});
```

## Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start both dev servers |
| `npm run dev:client` | Start Vite dev server |
| `npm run dev:server` | Start Express dev server (tsx watch) |
| `npm run dev:mcp` | Start MCP server in dev mode |
| `npm run build` | Build client and server |
| `npm run build:client` | Build Vite client |
| `npm run build:server` | Compile server TypeScript |
| `npm start` | Start production server |
| `npm run start:mcp` | Start MCP server |
| `npm run preview` | Preview production build |
| `npm test` | Run tests |
| `npm run lint` | Run ESLint |
| `npm run clean` | Remove dist folder |

## MCP Server (Model Context Protocol)

The GRC Agent includes an MCP server that exposes GRC tools to AI assistants like Claude.

### MCP Tools

| Tool | Description |
|------|-------------|
| `generate_policy` | Generate security policies aligned with compliance frameworks |
| `analyze_policy` | Perform gap analysis on policies against frameworks |
| `generate_plan` | Create security plans (SSP, IRP, BRP, BC/DR, Test/Failover) |
| `list_frameworks` | List all available compliance frameworks |
| `get_framework_info` | Get detailed framework information |
| `get_framework_controls` | Get controls for a specific framework |
| `compare_frameworks` | Compare two frameworks for overlapping controls |
| `list_policies` | List all generated policies |
| `get_policy` | Get a specific policy by ID |
| `list_plans` | List all generated security plans |
| `get_plan` | Get a specific plan by ID |
| `export_policy_markdown` | Export policy as Markdown |
| `export_plan_markdown` | Export plan as Markdown |

### MCP Resources

- `grc://frameworks/{framework_id}` - Framework definitions
- `grc://frameworks/comparison-matrix` - Cross-reference matrix of all frameworks

### MCP Prompts

| Prompt | Description |
|--------|-------------|
| `policy_review` | Review a policy for compliance gaps |
| `compliance_roadmap` | Generate a compliance implementation roadmap |
| `incident_response_guide` | Generate incident response guidance |

### Configure MCP with Claude Desktop

Add to your Claude Desktop config (`~/Library/Application Support/Claude/claude_desktop_config.json` on macOS or `%APPDATA%\Claude\claude_desktop_config.json` on Windows):

```json
{
  "mcpServers": {
    "grc-agent": {
      "command": "node",
      "args": ["dist/server/mcp/index.js"],
      "cwd": "/path/to/grc-agent"
    }
  }
}
```

Or for development:

```json
{
  "mcpServers": {
    "grc-agent": {
      "command": "npx",
      "args": ["tsx", "src/server/mcp/index.ts"],
      "cwd": "/path/to/grc-agent"
    }
  }
}
```

### Example MCP Usage with Claude

Once configured, you can ask Claude:

- "Generate an access control policy for NIST CSF and HIPAA"
- "Analyze this policy against SOC 2 requirements: [paste policy]"
- "Create an incident response plan for my organization"
- "Compare NIST CSF with NIST 800-53 frameworks"
- "What are the HIPAA security controls?"

## License

MIT

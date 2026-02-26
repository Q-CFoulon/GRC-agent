# GRC-agent

AI-powered Governance, Risk, and Compliance (GRC) agent for Microsoft Teams and Web interfaces.

## Features

- **Policy Generation** - Generate security policies aligned with compliance frameworks
- **Gap Analysis** - Analyze policies against NIST CSF, NIST 800-53, HIPAA, and other frameworks
- **Security Plans** - Create SSP, IRP, BRP, BC/DR, and Test/Failover plans
- **Multi-Framework Support** - NIST CSF 2.0, NIST 800-53 Rev 5, CMMC, HIPAA, HITRUST, SOC 2, SOX, GDPR, CCPA
- **Microsoft Teams Integration** - Bot interface for team-wide GRC assistance

## Project Structure

```
├── src/
│   ├── client/              # Vite frontend (TypeScript)
│   │   ├── main.ts          # Main application entry
│   │   └── style.css        # Styles
│   └── server/              # Express backend (TypeScript)
│       ├── index.ts         # Server entry point
│       ├── agent/           # GRC AI agent core
│       ├── frameworks/      # Compliance framework definitions
│       ├── services/        # Policy, framework, planning services
│       ├── teams/           # Microsoft Teams bot integration
│       └── types/           # TypeScript type definitions
├── index.html               # Vite entry HTML
├── vite.config.ts           # Vite configuration
├── tsconfig.json            # TypeScript config (client)
├── tsconfig.server.json     # TypeScript config (server)
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
| `npm run build` | Build client and server |
| `npm run build:client` | Build Vite client |
| `npm run build:server` | Compile server TypeScript |
| `npm start` | Start production server |
| `npm run preview` | Preview production build |
| `npm test` | Run tests |
| `npm run lint` | Run ESLint |
| `npm run clean` | Remove dist folder |

## License

MIT

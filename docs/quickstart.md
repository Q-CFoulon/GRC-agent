# Quick Start Guide - GRC Agent

Get up and running with the GRC Agent in 5 minutes.

## Prerequisites

- **Node.js** 18+
- **npm** or **yarn**
- **Git** (optional)
- **Azure OpenAI API access** or compatible LLM

## 1-Minute Setup

### Step 1: Install Dependencies
```bash
npm install
```

### Step 2: Configure Environment
```bash
cp .env.example .env
# Edit .env and set your Azure OpenAI credentials
```

### Step 3: Start the Server
```bash
npm run dev
```

### Step 4: Open Web Interface
```
http://localhost:3000
```

That's it! You're ready to start.

## Testing the Agent

### Via Web Interface
1. Open http://localhost:3000
2. Go to "Chat" tab
3. Try: *"Generate an access control policy for NIST CSF"*
4. Or use quick action buttons

### Via REST API
```bash
curl -X POST http://localhost:3000/api/grc/process \
  -H "Content-Type: application/json" \
  -d '{"message": "Generate HIPAA policy"}'
```

### Via JavaScript
```javascript
const response = await fetch('http://localhost:3000/api/grc/process', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ message: 'Create a System Security Plan' })
});
const data = await response.json();
console.log(data.response);
```

## Common Workflows

### 1. Generate a Policy
**Input:** "Generate an access control policy for HIPAA"
**Output:** Complete policy document aligned with HIPAA requirements

### 2. Analyze for Gaps
**Input:** "Analyze our incident response policy against NIST 800-53"
**Output:** Gap analysis with identified missing controls and recommendations

### 3. Create a Security Plan
**Input:** "Create a System Security Plan for our organization"
**Output:** Comprehensive SSP with all required sections

### 4. Get Framework Info
**Input:** "Tell me about GDPR requirements"
**Output:** Framework overview with key controls and implementation guidance

## Configuration

### Key Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `AZURE_OPENAI_API_KEY` | Azure OpenAI API key | Required |
| `AZURE_OPENAI_ENDPOINT` | Azure OpenAI endpoint | Required |
| `AZURE_OPENAI_DEPLOYMENT_NAME` | Deployment name | `gpt-4` |
| `PORT` | API server port | `3000` |
| `TEAMS_BOT_PORT` | Teams bot port | `3978` |
| `NODE_ENV` | Environment | `development` |

See `.env.example` for all options.

## Troubleshooting

### Port Already in Use
```bash
# Use a different port
PORT=3001 npm run dev
```

### Azure OpenAI Connection Error
- Verify API key is correct
- Check endpoint URL format
- Ensure deployment name matches Azure configuration
- Verify network access to Azure endpoints

### Module Not Found Errors
```bash
# Reinstall dependencies
rm -rf node_modules
npm install
npm run build
```

### Web Interface Not Loading
- Check browser console (F12) for errors
- Verify server is running on correct port
- Clear browser cache (Ctrl+Shift+Delete)
- Try different browser

## Next Steps

1. **Read Full Documentation**: Check [/docs](/) for comprehensive guides
2. **Deploy to Azure**: Follow [deployment guide](deployment.md) for cloud deployment
3. **Integrate with Teams**: See deployment guide for Teams bot setup
4. **Explore Frameworks**: Browse 9+ compliance frameworks
5. **Generate Artifacts**: Create policies, plans, and analysis documents

## Support

- **Issues**: Check [GitHub Issues](https://github.com/Q-CFoulon/GRC-agent)
- **Documentation**: See `/docs` folder
- **Examples**: Check [examples.md](examples.md) for workflows

## Architecture Overview

```
┌──────────────────────────────┐
│   User Interfaces            │
│ Web │ Teams │ API │ Custom   │
└──────────────────────────────┘
         ↓
┌──────────────────────────────┐
│   GRC Agent Core             │
│ Intent Routing & Processing  │
└──────────────────────────────┘
         ↓
┌──────────────────────────────┐
│   Services Layer             │
│ Policy │ Framework │ Planning│
└──────────────────────────────┘
         ↓
┌──────────────────────────────┐
│   Framework Database         │
│ NIST │ HIPAA │ GDPR │ etc    │
└──────────────────────────────┘
```

## What You Can Do

✅ Generate policies aligned with compliance frameworks  
✅ Analyze existing policies for gaps  
✅ Create comprehensive security plans  
✅ Browse 265+ compliance controls or requirements  
✅ Export documents as markdown or JSON  
✅ Track usage and activity  
✅ Use via chat, API, Teams, or web UI  

---

**Ready to go?** Start at http://localhost:3000 or [read the full documentation](architecture.md).

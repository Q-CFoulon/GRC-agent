# Deployment Guide - GRC Agent

Deploy the GRC Agent to Azure, Docker, or your own infrastructure.

## Azure Deployment Options

### Option 1: Azure App Service (Easiest)

**Time:** 10-15 minutes

**Steps:**

1. **Create Resource Group:**
```bash
az group create --name GRCAgent --location eastus
```

2. **Create App Service Plan:**
```bash
az appservice plan create \
  --name GRCAgentPlan \
  --resource-group GRCAgent \
  --sku B1 \
  --is-linux
```

3. **Create Web App:**
```bash
az webapp create \
  --resource-group GRCAgent \
  --plan GRCAgentPlan \
  --name grc-agent-app \
  --runtime "node|18.0"
```

4. **Deploy Code:**
```bash
az webapp deployment source config-zip \
  --resource-group GRCAgent \
  --name grc-agent-app \
  --src dist.zip
```

5. **Configure Environment:**
```bash
az webapp config appsettings set \
  --resource-group GRCAgent \
  --name grc-agent-app \
  --settings \
    AZURE_OPENAI_API_KEY=your-key \
    AZURE_OPENAI_ENDPOINT=https://your.openai.azure.com/ \
    AZURE_OPENAI_DEPLOYMENT_NAME=gpt-4 \
    NODE_ENV=production
```

**Access URL:** `https://grc-agent-app.azurewebsites.net`

---

### Option 2: Docker Deployment

**Create Dockerfile:**
```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY dist ./dist

EXPOSE 3000

CMD ["node", "dist/index.js"]
```

**Build and Run:**
```bash
docker build -t grc-agent:1.0 .

docker run \
  -p 3000:3000 \
  -e AZURE_OPENAI_API_KEY=your-key \
  -e AZURE_OPENAI_ENDPOINT=https://your.openai.azure.com/ \
  -e AZURE_OPENAI_DEPLOYMENT_NAME=gpt-4 \
  grc-agent:1.0
```

**Deploy to Azure Container Instances:**
```bash
az acr build --registry myregistry --image grc-agent:1.0 .

az container create \
  --resource-group GRCAgent \
  --name grc-agent \
  --image myregistry.azurecr.io/grc-agent:1.0 \
  --environment-variables \
    AZURE_OPENAI_API_KEY=your-key \
    AZURE_OPENAI_ENDPOINT=https://your.openai.azure.com/ \
  --ports 3000 \
  --cpu 1 \
  --memory 1
```

---

### Option 3: Kubernetes (AKS)

**Create AKS Cluster:**
```bash
az aks create \
  --resource-group GRCAgent \
  --name GRCAgentCluster \
  --node-count 2 \
  --vm-set-type VirtualMachineScaleSets \
  --generate-ssh-keys
```

**Deploy to AKS:**
```bash
# Connect to cluster
az aks get-credentials --resource-group GRCAgent --name GRCAgentCluster

# Create namespace
kubectl create namespace grc-agent

# Deploy application
kubectl apply -f deployment.yaml -n grc-agent
```

---

## Teams Bot Setup

### Prerequisites
- Microsoft 365 tenant
- Azure Bot Service resource
- Bot registered with Microsoft

### 1. Create Bot Service
```bash
az bot create \
  --appid <app-id> \
  --name GRCAgentBot \
  --resource-group GRCAgent \
  --endpoint https://your-domain.com/api/messages
```

### 2. Configure Bot
- Download certificate
- Set Microsoft App ID and Password
- Update `.env` file

### 3. Deploy Bot
```bash
npm run teams-dev
# In production: npm run teams-start
```

### 4. Upload to Teams
1. Go to Microsoft Teams
2. Apps → Upload a custom app
3. Select bot manifest
4. Install

---

## Local Development

### With Hot Reload (Development)
```bash
npm run dev         # API server
npm run teams-dev   # Teams bot
```

### ngrok (Local Testing)
```bash
# Install ngrok
npm install -g ngrok

# Run ngrok
ngrok http 3000

# Update bot endpoint
# https://your-ngrok-url.com/api/messages
```

---

## Monitoring & Logging

### Azure Application Insights

**Setup:**
```bash
az monitor app-insights component create \
  --app grc-agent-insights \
  --resource-group GRCAgent \
  --application-type web
```

**Configure in App:**
Add to `.env`:
```env
APPLICATION_INSIGHTS_KEY=your-key
```

**Monitor:**
- View logs in Azure Portal
- Set up alerts
- Track performance metrics
- Monitor error rates

---

## Offline Continuity Configuration

To preserve framework mappings, policies, plans, procedures, ingested artifacts, and exemptions when external MCP servers are unavailable, configure a persistent local store path:

```env
GRC_LOCAL_STORE_PATH=./data/grc-local-store.json
```

Deployment guidance:

- Mount `./data` to persistent storage in containerized deployments.
- Include the local store in backup policy for continuity and audit evidence retention.
- Use `GET /api/grc/offline/status` as an operational health check for offline package readiness.

---

## Health Checks

### Endpoint
```bash
curl http://localhost:3000/health
```

### Response
```json
{
  "status": "ok",
  "service": "grc-agent-api",
  "timestamp": "2024-02-26T10:30:00Z"
}
```

### Auto-Scaling (Azure)
```bash
az monitor autoscale create \
  --resource-group GRCAgent \
  --resource-type "Microsoft.Web/serverfarms" \
  --resource myappserviceplan \
  --agg-method Average \
  --metric "CpuPercentage" \
  --statistic "Average" \
  --threshold 70
```

---

## Database Integration

### PostgreSQL (Future)

1. Create PostgreSQL instance
2. Run migrations
3. Update connection string
4. Switch from in-memory storage

### Cosmos DB Alternative

1. Create Cosmos DB account
2. Create containers for:
   - Policies
   - Plans
   - Analysis Results
3. Update services to use SDK

---

## Troubleshooting

### Application Not Starting
- Check logs: `az webapp log tail`
- Verify environment variables
- Check resource group deployment

### Performance Issues
- Monitor CPU and memory
- Enable auto-scaling
- Check Azure OpenAI quota
- Review logs for errors

### Teams Bot Not Responding
- Verify endpoint URL
- Check bot credentials
- Review Teams audit logs
- Test with ngrok locally

### Connection Timeout
- Check firewall rules
- Verify network configuration
- Check service status
- Review Application Insights

---

## Production Checklist

- [ ] Environment variables configured
- [ ] Database set up and migrated
- [ ] SSL certificates installed
- [ ] Application Insights enabled
- [ ] Backup strategy defined
- [ ] Auto-scaling configured
- [ ] Health checks enabled
- [ ] Monitoring alerts set up
- [ ] Error logging enabled
- [ ] Rate limiting configured
- [ ] Security headers set up
- [ ] CORS configuration correct

---

## Cost Optimization

- Use B1 tier for low traffic
- Scale up only when needed
- Remove unused resources
- Monitor spending in Azure Cost Management
- Set up budget alerts

---

**Need help?** See [quickstart.md](quickstart.md) or [architecture.md](architecture.md).

# Multi-Channel Integration Guide - GRC Agent

Guide to using the GRC Agent across Web, Teams, and API channels.

## Channel Comparison

| Feature | Web UI | Teams Bot | REST API |
|---------|--------|-----------|----------|
| **Interface** | Visual UI | Conversational | Programmatic |
| **Access** | Browser | Microsoft Teams | HTTP Requests |
| **Setup** | Immediate | Requires setup | Immediate |
| **Real-time** | Yes | Yes | Yes |
| **Offline** | No | No | No |
| **Sharing** | Via export | Via Teams | Via custom app |
| **Best For** | Analysis work | Quick Q&A | Integration |
| **Scalability** | Single user | Team-wide | Unlimited |
| **Rich UI** | Full | Markdown | JSON |
| **File Ops** | Export/Import | Copy-paste | Download/Upload |
| **Customization** | Limited | Limited | High |

## When to Use Each

### Web Interface
**Best for:** Daily GRC work requiring visual interface

**Scenarios:**
- Creating comprehensive policies
- Analyzing gap results with charts
- Managing multiple artifacts
- Reviewing compliance data
- Exporting for documentation
- Training new analysts

**Advantages:**
- Professional UI with forms
- Easy export functionality
- Analytics dashboard
- Framework browser
- Settings management
- Dark mode option

### Teams Bot
**Best for:** Quick queries and team collaboration

**Scenarios:**
- Quick policy questions during meetings
- Team-wide compliance discussions
- Sharing findings in Teams channels
- Rapid incident response needs
- On-the-go compliance checks
- Collaboration and review

**Advantages:**
- Native Teams integration
- Team thread discussions
- Shared conversation history
- Quick access (already using Teams)
- No additional tools/logins
- Works on mobile

### REST API
**Best for:** Integration and automation

**Scenarios:**
- Custom application integration
- Automated policy generation
- Bulk compliance analysis
- Third-party tool connection
- CI/CD pipeline integration
- Programmatic access

**Advantages:**
- JSON request/response
- Programmatic flexibility
- Integration with systems
- Automation capabilities
- Scalable architecture
- Multiple language support

## Integration Scenarios

### Scenario 1: Central Analysis with Team Review

```
Analyst (Web UI)
  ↓
1. Generate policy in Web UI
2. Export as markdown
3. Share in Teams channel
  ↓
Team (Teams Bot)
  ↓
4. Review in Teams thread
5. Discuss using message replies
6. Ask questions to bot
  ↓
Analyst (Web UI)
  ↓
7. Refine based on feedback
8. Version and track in Web UI
```

**Tools Used:**
- Web UI for detailed work
- Manual export for sharing
- Teams for collaboration
- Bot for ad-hoc questions

---

### Scenario 2: Automated Compliance Reporting

```
CI/CD Pipeline
  ↓
1. API call: Generate policy
2. API call: Analyze gaps
3. API call: Create plan
  ↓
Report Generation
  ↓
4. Compile results
5. Format for email
6. Send compliance report
  ↓
Team (Various)
  ↓
7. Review in email
8. Ask questions in Teams bot
9. Drill down in Web UI
```

**Tools Used:**
- API for automation
- Custom reports
- Teams for questions
- Web UI for details

---

### Scenario 3: Rapid Incident Response

```
Alert Triggered
  ↓
Responder (Teams)
  ↓
1. Ask bot: Create incident response checklist
2. Quick analysis via Teams
3. Share findings in channel
  ↓
Coordinator (Web UI)
  ↓
4. Open Web UI for detailed view
5. Create formal incident plan
6. Track timeline and activities
  ↓
Reporter (API)
  ↓
7. Automated report generation
8. Push to incident management system
```

**Tools Used:**
- Teams for rapid response
- Web UI for detailed coordination
- API for system integration

---

### Scenario 4: Continuous Compliance Monitoring

```
Daily Automated Check (API)
  ↓
1. Scheduled API calls analyze policies
2. Generate compliance reports
3. Store results externally
  ↓
Analyst Review (Web UI)
  ↓
4. Open Web UI
5. Review latest analysis
6. Compare trends
7. Identify action items
  ↓
Team Discussion (Teams Bot)
  ↓
8. Share findings in channel
9. Collaborate on solutions
10. Track commitments
```

**Tools Used:**
- API for automation
- Web UI for trend analysis
- Teams for team collaboration

## Workflow Recommendations

### For Single Analyst
```
Web UI → Export → Archive
(All work in one place)
```

### For Team Collaboration
```
Analyst: Web UI → Export
Team: Teams Bot + Sharing
Archive: External storage
```

### For Enterprise Integration
```
Automated: API → Database
Review: Web UI → Dashboard
Share: Teams + Email
Integrate: Third-party systems
```

### For Complex Projects
```
Day 1: Web UI (Planning)
Day 2-N: API (Automation)
Reviews: Teams Bot (Collaboration)
Archive: External storage
Reports: Custom dashboard
```

## Cross-Channel Communication

### Sharing Between Channels

**Web UI → Teams:**
1. Export from Web UI (markdown format)
2. Copy content
3. Paste in Teams channel
4. Use @bot mention to reference

**Teams → Web UI:**
1. Copy findings from Teams
2. Paste into notes/context
3. Regenerate/refine in Web UI
4. Export updated version

**API → Web UI:**
1. Generate via API
2. Access through Web UI
3. Customize and export
4. Share to Teams

**Teams → API:**
1. Collect feedback in Teams
2. Extract requirements
3. Call API with parameters
4. Automate based on feedback

## Session Management

### Single User Session
```
Analyst logs in once
Works across all channels
Session persists for 24 hours
Context maintained in agent memory
```

### Team Sessions
```
Each team member has isolated session
Ability to share results
Use Teams threads for context
Agent maintains separate history per user
```

### API Sessions
```
Stateless HTTP requests
Optional conversationId for context
No session persistence by default
Custom session management possible
```

## Data Flow Across Channels

```
┌─────────────────────────────────────────────────┐
│           Single Agent Core                      │
│    (Intent Routing, Service Layer)              │
└─────────────────────────────────────────────────┘
       ↑              ↑              ↑
       │              │              │
   ┌───┴────┐    ┌────┴────┐    ┌───┴─────┐
   │ Web UI │    │Teams Bot│    │REST API │
   │(HTML)  │    │(Adapter)│    │(Express)│
   └────────┘    └─────────┘    └─────────┘
       ↓              ↓              ↓
    Browser    Microsoft Teams  Custom App
```

## Configuration

### Web UI Configuration
**File:** `.env`
```env
PORT=3000
AZURE_OPENAI_API_KEY=...
AZURE_OPENAI_ENDPOINT=...
```

### Teams Bot Configuration
**File:** `.env`
```env
BOT_ID=...
BOT_PASSWORD=...
TEAMS_BOT_PORT=3978
```

### API Configuration
**File:** `.env`
```env
PORT=3000
NODE_ENV=production
```

## Scaling Considerations

### Web UI Scaling
- Single-user focus
- Browser-based limits
- No server scaling needed
- Suitable for 1-10 users

### Teams Bot Scaling
- Multi-user support
- Azure Bot Service manages scale
- Suitable for 10-1000 users
- Message queuing automatically

### API Scaling
- Unlimited horizontal scaling
- Load balancer distribution
- Database scaling
- Suitable for enterprise

## Best Practices

### For Web UI Users
1. **Regular exports** - Don't rely on memory
2. **Use settings** - Configure API endpoint
3. **Track activity** - Monitor analytics
4. **Backup work** - Download critical artifacts

### For Teams Users
1. **Use threads** - Keep discussions organized
2. **Reference bot** - Mention @GRC Agent
3. **Archive findings** - Copy important info elsewhere
4. **Share widely** - Use Teams channels for visibility

### For API Developers
1. **Handle errors gracefully** - API may have timeouts
2. **Implement retries** - Network issues possible
3. **Cache results** - Don't refetch unnecessarily
4. **Version your code** - API may change

### For All Users
1. **Document frameworks** - Know which standards apply
2. **Follow best practices** - Use agent as guide, not replacement
3. **Validate output** - Expert review recommended
4. **Keep learning** - Compliance evolves

## Troubleshooting

### Web UI Connected, Teams Bot Disconnected
**Diagnosis:** Different ports
**Solution:** Ensure both servers running:
```bash
npm run dev          # API on 3000
npm run teams-dev    # Bot on 3978 (different terminal)
```

### API Returns 404 for Endpoint
**Diagnosis:** Wrong URL or port
**Solution:** Verify endpoint:
```bash
curl http://localhost:3000/api/grc/frameworks
```

### Teams Bot Missing Conversation Context
**Diagnosis:** Session isolation
**Solution:** Maintain conversationId in API calls

### Web UI Cache Stale Data
**Diagnosis:** Browser cache
**Solution:** Clear cache and reload:
```
Ctrl+Shift+Delete → Clear all → Reload
```

## Integration Examples

### Python Integration
```python
import requests

response = requests.post(
    'http://localhost:3000/api/grc/process',
    json={'message': 'Generate HIPAA policy'}
)
policy = response.json()
print(policy['response'])
```

### TypeScript/Node.js Integration
```typescript
const result = await fetch('http://localhost:3000/api/grc/process', {
  method: 'POST',
  body: JSON.stringify({ message: 'Analyze policy gaps' }),
  headers: { 'Content-Type': 'application/json' }
});
```

### Low-Code Integration (Zapier, etc.)
```
1. Trigger: Event occurs
2. Action: Call API endpoint
3. Data: Pass message parameter
4. Result: Formatted response
5. Notify: Send to Teams/Email
```

## Future Enhancements

- [ ] Cross-channel session sharing
- [ ] Real-time collaboration
- [ ] Unified analytics across channels
- [ ] Advanced workflow automation
- [ ] Custom channel connectors

---

**Ready to integrate?** See [quickstart.md](quickstart.md) or [api.md](api.md).

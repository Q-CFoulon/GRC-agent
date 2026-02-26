# Web Interface Guide - GRC Agent

Complete guide to using the GRC Agent web interface.

## Overview

The GRC Agent web interface is a modern, responsive application designed for security analysts. Access at: `http://localhost:3000`

## Navigation

The sidebar on the left provides access to 5 main sections:

- **💬 Chat** - Interactive messaging with the agent
- **📋 Policies** - Create and manage policies
- **📊 Plans** - Generate security plans
- **🔗 Frameworks** - Browse compliance requirements
- **📈 Analytics** - Track activity and metrics

## 1. Chat Interface

**Purpose:** Real-time conversation with the GRC Agent

### How to Use

1. Type your message in the input box
2. Press Enter or click "Send"
3. Wait for agent response
4. Continue conversation naturally

### Quick Actions

One-click buttons for common tasks:
- **Generate Policy** - "Generate an access control policy for NIST CSF"
- **Analyze Policy** - "Analyze our policies against HIPAA"
- **Create SSP** - "Create a System Security Plan"
- **Frameworks** - "Show available frameworks"

### Example Prompts

**Policy Generation:**
```
"Create an access control policy for HIPAA"
"Generate password policy aligned with SOC 2"
"Write incident response policy for NIST CSF"
```

**Gap Analysis:**
```
"Analyze our IT procedures against GDPR"
"Check policy coverage for NIST 800-53"
"Compare our controls with SOX requirements"
```

**Plan Creation:**
```
"Create incident response plan for our company"
"Generate business continuity plan aligned with NIST"
"Build system security plan for cloud app"
```

**Framework Information:**
```
"Tell me about HIPAA requirements"
"What frameworks does GRC Agent support?"
"Explain NIST CSF functions"
```

## 2. Policies Page

**Purpose:** Generate, manage, and track compliance policies

### Generate New Policy

1. **Policy Title:** Name your policy (e.g., "Access Control Policy")
2. **Organization Name:** Your organization
3. **Compliance Frameworks:** Select one or more:
   - NIST CSF 2.0
   - NIST 800-53
   - HIPAA
   - GDPR
   - SOC 2
   - Others...

4. Click **Generate Policy**

### Generated Policies List

View all policies with:
- Policy name and framework
- Organization name
- Quick actions (Export, Delete)

### Actions

**Export:**
- Downloads policy as markdown file
- Includes all sections and requirements
- Ready for customization

**Delete:**
- Requires confirmation
- Removes from system

## 3. Plans Page

**Purpose:** Create comprehensive security and compliance plans

### Create New Plan

1. **Plan Type** - Select from:
   - System Security Plan (SSP)
   - Incident Response Plan (IRP)
   - Breach Response Plan (BRP)
   - Business Continuity & Disaster Recovery
   - Test & Failover Plan

2. **Plan Title:** Name your plan
3. **Organization Name:** Your organization
4. **Compliance Frameworks:** Select framework alignment
5. Click **Generate Plan**

### Plan Templates

Each plan type includes pre-built sections:

**System Security Plan (SSP):**
- System Overview
- Security Controls
- SSP Update Process
- System Interconnections
- Compliance & Monitoring
- Plan Approval

**Incident Response Plan (IRP):**
- Introduction
- Incident Response Team
- Detection & Analysis
- Containment & Recovery
- Post-Incident Activities
- Appendices

**Breach Response Plan (BRP):**
- Response Team
- Detection & Assessment
- Notification Procedures
- Investigation & Remediation
- Follow-up & Improvement

**BC/DR Plan:**
- Executive Summary
- Recovery Objectives (RTO/RPO)
- Backup & Restoration
- Disaster Recovery Sites
- Communication & Coordination

**Test & Failover Plan:**
- Test Objectives
- Test Scope
- Test Procedures
- Success Criteria
- Results & Remediation

### Actions

**Export:** Download plan as markdown
**Delete:** Remove plan

## 4. Frameworks Page

**Purpose:** Browse and compare compliance standards

### Search Frameworks

1. Type in search box
2. Real-time filtering of frameworks
3. Click framework card to see details

### Available Frameworks

9 compliance frameworks:
- NIST CSF 2.0 (265 controls)
- NIST 800-53 (988 controls)
- NIST CMMC 2.0 (200+ controls)
- HIPAA (164 controls)
- HITRUST (49 controls)
- SOX (95 controls)
- SOC 2 (64 controls)
- GDPR (99 controls)
- CCPA (28 controls)

### Framework Detail

Click any framework to see:
- Framework name and version
- Organization/owner
- Total controls/requirements
- Categories/domains
- Description
- Link to official documentation

## 5. Analytics & Activity Page

**Purpose:** Track GRC activity and metrics

### Metrics Dashboard

View 4 key statistics:
- **Policies Generated** - Count of created policies
- **Plans Created** - Count of generated plans
- **Messages Processed** - Total agent interactions
- **Frameworks Available** - Compliance standards (9)

### Activity Log

Recent activities listed with:
- Timestamp
- Action description
- Most recent 10 items shown
- Auto-updates as you work

### Clear History

Remove all activity records with confirmation.

## Settings

Access via **⚙️ Settings** button

### Configuration Options

**API Endpoint:**
- Default: `http://localhost:3000`
- Change for remote servers
- Useful for cloud deployment

**Dark Mode:**
- Toggle for dark theme
- Settings saved to browser

**Save Settings:**
- Changes persist across sessions
- Stored in browser localStorage

## Help & Documentation

Access via **❓ Help** button

### Quick Reference

- Feature overview
- Supported frameworks list
- Tips and best practices
- Keyboard shortcuts (future)

## Keyboard Shortcuts

In Chat:
- **Enter** - Send message
- **Shift+Enter** - New line (future)
- **Ctrl+L** - Clear chat (future)

## Tips & Best Practices

### 1. Policy Generation
- Be specific with framework names
- Include organization name for better context
- Use multiple frameworks for comprehensive coverage
- Export and customize before publishing

### 2. Gap Analysis
- Analyze policies against most relevant framework first
- Review high-severity gaps first
- Use recommendations to prioritize remediation
- Track progress over time

### 3. Plan Creation
- Start with SSP if new to planning
- Use multi-section capability
- Customize section responsibilities
- Establish timelines realistically

### 4. Framework Browsing
- Search for specific keywords (encryption, authentication, etc.)
- Compare frameworks by viewing details
- Reference framework IDs in policies for alignment
- Link controls to policy sections

### 5. General Usage
- Export frequently to backup work
- Test with examples before production use
- Use Chat for quick questions
- Use Forms for structured generation
- Monitor analytics to track compliance efforts

## Troubleshooting

### Issue: API Connection Error
**Solution:**
1. Check API endpoint in Settings
2. Verify server is running (`npm run dev`)
3. Confirm port 3000 is accessible
4. Check firewall settings

### Issue: Page Not Responding
**Solution:**
1. Refresh page (Ctrl+R)
2. Clear browser cache (Ctrl+Shift+Delete)
3. Check browser console (F12) for errors
4. Try different browser

### Issue: Settings Not Saving
**Solution:**
1. Enable browser localStorage
2. Check browser privacy settings
3. Disable browser extensions
4. Try Incognito/Private mode

### Issue: Slow Performance
**Solution:**
1. Close unnecessary browser tabs
2. Clear browser cache
3. Check internet connection
4. Restart server (`npm run dev`)

## Browser Compatibility

**Supported:**
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

**Recommended:** Chrome or Firefox latest version

## Accessibility

- Keyboard navigation
- Screen reader support
- High contrast support via Dark Mode
- Semantic HTML structure
- ARIA labels on interactive elements

## Mobile Access

While optimized for desktop:
- **Tablet:** Full functionality (landscape recommended)
- **Phone:** Limited but usable
- Forms work in portrait/landscape
- Chat interface responsive
- Navigation via sidebar buttons

## Data Privacy

**Local Storage:**
- Settings saved to browser localStorage only
- No data sent to external servers
- Clearing browser data removes saved settings

**Session Data:**
- Conversation history in memory only
- Lost on page refresh (by design)
- Can export/download content before closing

## Performance Tips

1. **Keep frameworks cached** - Loaded once on app start
2. **Batch operations** - Generate multiple items
3. **Export offline** - Download for offline review
4. **Close unused tabs** - Reduces memory usage
5. **Use Search** - Faster than scrolling frameworks

---

**Questions?** See [quickstart.md](quickstart.md) or [examples.md](examples.md).

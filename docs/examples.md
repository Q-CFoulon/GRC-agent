# Usage Examples - GRC Agent

Real-world workflow examples showing how to use the GRC Agent.

## Example 1: Generate Access Control Policy

**Scenario:** Need an access control policy for HIPAA compliance.

**Input:**
```
"Generate an access control policy for HIPAA that covers user provisioning and access rights."
```

**Agent Processing:**
1. Detects intent: `generate-policy`
2. Extracts: framework = HIPAA, title = "Access Control Policy"
3. Calls: PolicyService.generatePolicy()
4. Generates markdown policy document
5. Returns policy ID and summary

**Output:**
```markdown
# Access Control Policy

## Policy Document
**Organization:** Organization
**Frameworks:** HIPAA
**Created:** 2024-02-26T10:30:00.000Z

## 1. Purpose and Scope
This policy establishes requirements for access control within Organization.

### Scope
This policy applies to all organizational units and personnel.

### Audience
All employees, contractors, and partners

## 2. Policy Objectives
Align cybersecurity practices with the following frameworks:
- Health Insurance Portability and Accountability Act

## 3. Policy Requirements
### HIPAA

The organization shall comply with all applicable requirements from this framework.

[... additional sections ...]
```

**Follow-up Actions:**
- Edit and customize policy in tool
- Export as markdown or JSON
- Review and approve
- Publish to team

---

## Example 2: Gap Analysis Against NIST 800-53

**Scenario:** Analyze existing incident response policy against NIST 800-53.

**Input:**
```
"Analyze our incident response policy against NIST 800-53 to identify gaps in coverage"
```

**Agent Processing:**
1. Detects intent: `analyze-policy`
2. Extracts: framework = NIST 800-53
3. Retrieves previously generated policies
4. Calls: FrameworkService.analyzePolicy()
5. Compares policy content with 988 NIST 800-53 controls
6. Identifies gaps, calculates severity, generates recommendations
7. Compiles GapAnalysisResult

**Output:**
```
Analysis of "Incident Response Policy":

Framework: NIST SP 800-53 Security Controls
Coverage: 65%
Compliance Score: 62%

Gaps Found: 12

Top Recommendations:
1. Implement IR-2 Incident Response Training (Priority: 1)
2. Establish IR-4 Incident Handling (Priority: 2)
3. Develop IR-6 Incident Reporting (Priority: 3)
```

**Detailed Gap Example:**
```
Control: IR-1 Incident Response Policy
Severity: CRITICAL
Effort: LOW
Implementation Steps:
1. Review IR-1 requirements
2. Assessment current state against requirements
3. Document gaps and required changes
4. Develop implementation plan
5. Execute implementation
6. Verify compliance through testing
7. Document and communicate completion
```

---

## Example 3: Create System Security Plan

**Scenario:** Generate comprehensive System Security Plan for cloud application.

**Input:**
```
"Create a System Security Plan for our cloud application aligned with NIST CSF"
```

**Agent Processing:**
1. Detects intent: `generate-plan`
2. Extracts: type = SSP, framework = NIST CSF
3. Calls: PlanningService.generatePlan()
4. Calls: generateSSPSections() for NIST CSF
5. Generates 6 sections with responsibilities and timelines
6. Assembles SecurityPlan object
7. Returns plan ID and confirmation

**Output:**
```markdown
# System Security Plan (SSP) - Cloud Application

**Organization:** ACME Corp
**Plan Type:** System Security Plan (SSP)
**Created:** 2024-02-26T10:30:00.000Z
**Status:** Draft
**Owner:** Not Assigned

## 1. System Overview

This System Security Plan (SSP) documents the security controls for Cloud Application within ACME Corp.

### System Description
Detailed description of system purpose, scope, and environment.

### System Environment
Description of the system boundary, interconnections, and data flows.

### Authorization Basis
Authorization boundary and alignment with NIST Cybersecurity Framework.

**Responsibilities:** System Owner, CISO, Security Architect

## 2. Security Controls

Implementation of required security controls mapped to applicable frameworks.

### NIST Cybersecurity Framework Controls
Controls implemented to address NIST Cybersecurity Framework requirements.

**Responsibilities:** Security Team, System Administrator

## 3. System Security Plan Update

Process for keeping the SSP current and accurate.

**Responsibilities:** System Owner
**Timeline:** Annual review or upon significant system changes

[... continues with sections 4-6 ...]
```

**Follow-up Actions:**
- Customize sections with actual system details
- Assign ownership and responsibilities
- Add implementation timelines
- Get approvals from CISO
- Share with stakeholders

---

## Example 4: Browse and Compare Frameworks

**Scenario:** Compare GDPR and CCPA requirements for data protection.

**Input:**
```
"Tell me about GDPR framework and compare with CCPA"
```

**Agent Processing:**
1. Detects intent: `framework-info`
2. Extracts: frameworks = [GDPR, CCPA]
3. Calls: FrameworkRegistry.getFramework()
4. Calls: FrameworkRegistry.compareFrameworks()
5. Retrieves framework summaries and control overlaps
6. Composes comparison response

**Output:**
```
GDPR (General Data Protection Regulation) v2018
Organization: European Union
Total Controls: 99
Categories: Data Protection, Individual Rights, Data Processing, Governance
Description: GDPR regulates data protection and privacy for personal data of people in the EU.
More info: https://gdpr-info.eu/

---

CCPA (California Consumer Privacy Act) v2020
Organization: State of California
Total Controls: 28
Categories: Consumer Rights, Business Obligations, Data Collection, Opt-Out
Description: CCPA provides California residents with rights regarding personal data collection and use.
More info: https://oag.ca.gov/privacy/ccpa
```

**Comparison Results:**
```
Overlapping Controls: 12
Unique to GDPR: 87 (more comprehensive data protection)
Unique to CCPA: 16 (stronger consumer opt-out rights)
```

---

## Example 5: Search Compliance Requirements

**Scenario:** Find all controls related to encryption across frameworks.

**Input:**
```
"Search for encryption requirements across all frameworks"
```

**Agent Processing:**
1. Uses API: `/api/grc/search?q=encryption`
2. FrameworkRegistry.globalSearch() searches all frameworks
3. Finds relevant controls mentioning encryption
4. Ranks by relevance
5. Returns top 20 results

**Output:**
```
Search Results for "encryption" (42 results found)

1. NIST CSF - PR.DS-01 (Relevance: 3.0)
   Data Encryption Protection
   "Data is protected by encryption..."

2. NIST 800-53 - SC-7 (Relevance: 2.8)
   Boundary Protection
   "The information system monitors and controls communications..."

3. HIPAA - Rule 164.308 (Relevance: 2.5)
   Encryption and Decryption
   "Encryption and decryption protections for PHI..."

[... additional results ...]
```

---

## Example 6: Multi-Framework Policy Alignment

**Scenario:** Create single policy meeting SOX, SOC 2, and GDPR requirements.

**Input:**
```
"Generate a comprehensive data protection policy that aligns with SOX, SOC 2, and GDPR"
```

**Agent Processing:**
1. Detects: `generate-policy`
2. Extracts: frameworks = [SOX, SOC 2, GDPR]
3. Gets controls from all three frameworks
4. Merges overlapping requirements
5. Generates policy covering all three standards
6. Highlights which sections address which standards
7. Returns comprehensive policy document

**Output:**
```markdown
# Data Protection Policy - Multi-Framework Compliance

**Frameworks:** SOX, SOC 2, GDPR
**Organization:** Financial Services Corp
**Version:** 1.0.0
**Status:** Draft

## 1. Scope and Applicability

This policy applies to all personal data protected under:
- Sarbanes-Oxley Act (SOX) - Financial reporting integrity
- Service Organization Control 2 (SOC 2) - Service organization security
- General Data Protection Regulation (GDPR) - EU data protection

## 2. Data Classification (SOX + SOC 2 + GDPR)

[SOX] - Financial data requiring high confidentiality
[SOC 2] - Customer data requiring availability guarantees
[GDPR] - Personal data of EU residents requiring special protection

## 3. Encryption Requirements (SOX + SOC 2 + GDPR)

[SOX] Implement encryption for financial records in transit and at rest...
[SOC 2] Encryption protects availability and confidentiality of data...
[GDPR] Encryption is a technical measure for data subject rights protection...

[... continues with framework-aligned sections ...]
```

---

## Example 7: Track Compliance Activities

**Scenario:** Monitor gaps and track remediation progress.

**Input - Initial Analysis:**
```
"Analyze our policies against HIPAA"
```

**Output (Initial):**
```
Coverage: 45%
Gaps: 24 critical, 31 high priority items
```

**Input - Check Progress (Week 1):**
```
"Check HIPAA compliance progress"
```

**Output (Updated):**
```
Coverage: 52% (+7%)
Gaps: 18 critical (-6), 28 high priority (-3)
Remediated: 
- Implemented encryption (HIPAA IT-1)
- Established access controls (HIPAA AC-2)
- Updated incident response (HIPAA IR-2)
```

---

## Common Patterns

### Pattern 1: Policy Lifecycle
```
Generate → Customize → Review → Approve → Publish → Monitor → Update
```

### Pattern 2: Gap Analysis Cycle
```
Analyze → Prioritize → Remediate → Validate → Document → Report
```

### Pattern 3: Planning Process
```
Create Plan → Define Sections → Assign Owners → Set Timeline → Execute → Track
```

### Pattern 4: Framework Alignment
```
Choose Framework → Review Requirements → Map Controls → Document → Implement
```

---

## Tips & Tricks

1. **Use specific organization names** for better policy generation
2. **Combine multiple frameworks** for comprehensive coverage
3. **Export early** to preserve generated content
4. **Reference framework IDs** for more control when searching
5. **Build on previous work** - don't regenerate unnecessarily
6. **Review before publishing** - always customize to your context
7. **Track metrics** - monitor coverage and compliance scores

---

**Need help?** See [quickstart.md](quickstart.md) or [api.md](api.md).

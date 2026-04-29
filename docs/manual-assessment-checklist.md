# Manual Assessment Checklist

This document is a team working version of the NIST SP 800-53 Rev. 5 manual assessment package for the six primary controls represented in this repository's NIST sample set.

## Reassessment Summary

Current repo evidence still supports the earlier overall conclusion: the application is useful as a GRC content generator, but it does not yet evidence mature operational control implementation for the six sampled NIST controls.

Current posture, revalidated against the repo:

- `AC-2` and `IA-5` remain the largest gaps because API requests still accept a caller-supplied `userId` and fall back to `anonymous` when none is provided.
- `AU-2` remains weak because the code still relies primarily on `console` logging and does not show a structured audit event catalog, retention model, or protected audit trail.
- `SC-7` remains weak because the API still permits wildcard CORS and does not show app-layer rate limiting or trusted boundary enforcement in code.
- `SI-4` remains weak because deployment guidance mentions monitoring, but the application code does not show telemetry, alerting, or analysis integrations.
- `IR-1` remains largely documentary because the repo can generate plans, but it does not itself evidence an adopted service-level incident response governance package.

## What Needed To Happen Next

Use this checklist to move from repo-only gap identification to an evidence-backed assessment.

### Immediate Engineering Actions

- [ ] Replace anonymous request handling with authenticated identity and server-side user validation.
- [ ] Define and enforce role-based access for administrative or sensitive operations.
- [ ] Replace wildcard CORS with an explicit allowlist by environment.
- [ ] Add request throttling or rate limiting at the application or gateway layer.
- [ ] Introduce structured audit logging for authentication events, policy changes, plan generation, administrative actions, and access to stored artifacts.
- [ ] Correlate each log event with user identity, request ID, timestamp, and action outcome.
- [ ] Add telemetry hooks for failures, suspicious activity, and service health events.

### Immediate Governance And Operations Actions

- [ ] Identify the accountable control owners for AC-2, AU-2, IR-1, IA-5, SC-7, and SI-4.
- [ ] Decide which controls are system-specific versus inherited from hosting infrastructure.
- [ ] Produce a service-level incident response policy and operating procedures for this application.
- [ ] Define the logging standard, event catalog, retention period, review cadence, and escalation path.
- [ ] Define monitoring objectives, alert thresholds, distribution lists, and on-call responsibilities.
- [ ] Define the authenticator lifecycle standard, including issuance, MFA, rotation, revocation, and compromised credential handling.
- [ ] Require formal gap exemption records for accepted risks including justification, mitigation, residual risk, risk owner, and next review date.

### Evidence Collection Checklist

- [ ] Collect architecture and trust-boundary diagrams that show ingress, egress, proxies, gateways, and segmented networks.
- [ ] Collect IAM procedures for provisioning, approval, review, disablement, and termination.
- [ ] Collect sample access reviews, deprovisioning records, and privileged account inventories.
- [ ] Collect the logging standard, sample audit records, and retention configuration.
- [ ] Collect monitoring dashboards, alert rules, escalation matrix, and review records.
- [ ] Collect approved incident response policy documents, owners, revision history, and dissemination evidence.
- [ ] Collect secret storage and credential rotation evidence if authentication is implemented outside the app.

### Assessment Execution Checklist

- [ ] Mark each checklist line in this document as `Pass`, `Partial`, `Fail`, or `Not Applicable` based on actual evidence rather than intended architecture.
- [ ] Update the remediation matrix only after each gap is confirmed with evidence or a documented lack of evidence.
- [ ] Separate code gaps from inherited-control gaps so compensating controls are not overstated.
- [ ] Record residual risks where infrastructure assumptions cannot yet be evidenced.
- [ ] Obtain assessor, control owner, security reviewer, and engineering lead sign-off after evidence review.

## Assessed Controls

- AC-2 Account Management
- AU-2 Event Logging
- IR-1 Policy and Procedures
- IA-5 Authenticator Management
- SC-7 Boundary Protection
- SI-4 System Monitoring

Repo source for these controls:

- [src/frameworks/nist-800-53.ts](src/frameworks/nist-800-53.ts#L27)

## Team Workbooks

Use these team-specific workbooks for manual assessment execution:

- IAM Team: [docs/iam-team-assessment.rtf](docs/iam-team-assessment.rtf)
- Security Operations Team: [docs/security-operations-assessment.rtf](docs/security-operations-assessment.rtf)
- Incident Response and GRC Team: [docs/incident-response-grc-assessment.rtf](docs/incident-response-grc-assessment.rtf)
- Platform and Network Team: [docs/platform-network-assessment.rtf](docs/platform-network-assessment.rtf)
- Leadership Summary: [docs/management-summary.rtf](docs/management-summary.rtf)

## Team Instructions

For each control:

1. Review the requirement checklist.
2. Request the listed evidence from the responsible team.
3. Mark each requirement as `Pass`, `Partial`, `Fail`, or `Not Applicable`.
4. Record system-specific notes, gaps, and follow-up actions.
5. Update the remediation matrix when a gap is confirmed.

## Assessment Scale

- Pass: Requirement is fully implemented and evidenced.
- Partial: Requirement is partly implemented or evidence is incomplete.
- Fail: Requirement is not implemented or cannot be evidenced.
- Not Applicable: Requirement does not apply to the assessed system and rationale is documented.

## AC-2 Account Management

### Objective

Ensure system accounts are defined, approved, provisioned, monitored, reviewed, and removed in a controlled lifecycle.

### Requirement Checklist

| Requirement | Status | Evidence Reference | Notes |
|---|---|---|---|
| Allowed and prohibited account types are defined and documented |  |  |  |
| Account managers are formally assigned |  |  |  |
| Group and role membership prerequisites are documented |  |  |  |
| Authorized users, memberships, privileges, and required account attributes are specified |  |  |  |
| Account creation requires approval by authorized personnel |  |  |  |
| Account lifecycle actions follow defined procedures |  |  |  |
| Account usage is monitored |  |  |  |
| Account managers are notified when need or status changes |  |  |  |
| Access authorization is based on valid authorization and intended usage |  |  |  |
| Accounts are periodically reviewed for compliance |  |  |  |
| Shared or group authenticators are changed when membership changes |  |  |  |
| Account lifecycle is aligned to transfer and termination processes |  |  |  |

### Evidence Requests

- Access control and account management policy
- Joiner/mover/leaver procedure
- Access request and approval records
- Account inventory, including privileged and service accounts
- Periodic access review results
- Deprovisioning records
- Shared account rotation evidence, if applicable
- Account usage monitoring reports

### Repo Gap Notes

- API requests default to `anonymous` when no user ID is supplied.
- No application authentication or account lifecycle enforcement is visible in code.

Relevant files:

- [src/server/index.ts](src/server/index.ts#L73)

## AU-2 Event Logging

### Objective

Define and maintain the event types the system can log and those the organization requires to log for investigations and monitoring.

### Requirement Checklist

| Requirement | Status | Evidence Reference | Notes |
|---|---|---|---|
| Log-capable event types are identified |  |  |  |
| Logging requirements are coordinated with stakeholders |  |  |  |
| Required event types and logging conditions are defined |  |  |  |
| Rationale exists for why selected events support investigations |  |  |  |
| Logged event types are reviewed and updated on schedule |  |  |  |

### Evidence Requests

- Logging standard or event catalog
- System logging configuration standards
- Log source inventory
- Event selection rationale or threat-use-case mapping
- Periodic review records for logged event types
- Sample logs for authentication, admin actions, changes, and access events

### Repo Gap Notes

- Logging is primarily console-based.
- No structured audit log catalog, retention model, or review workflow is visible.

Relevant files:

- [src/server/index.ts](src/server/index.ts#L84)
- [src/index.ts](src/index.ts#L227)
- [src/client/main.ts](src/client/main.ts#L138)

## IR-1 Policy and Procedures

### Objective

Establish, assign ownership for, disseminate, and maintain incident response policy and procedures.

### Requirement Checklist

| Requirement | Status | Evidence Reference | Notes |
|---|---|---|---|
| Incident response policy is developed, documented, and disseminated |  |  |  |
| Policy addresses purpose, scope, roles, responsibilities, management commitment, coordination, and compliance |  |  |  |
| Policy aligns to laws, regulations, standards, and guidance |  |  |  |
| Procedures exist to implement the policy and associated controls |  |  |  |
| A designated official manages development and dissemination |  |  |  |
| Policy is reviewed and updated on a defined cadence and after defined events |  |  |  |
| Procedures are reviewed and updated on a defined cadence and after defined events |  |  |  |

### Evidence Requests

- Approved incident response policy
- Incident response procedures or playbooks
- Policy owner designation
- Review cadence and revision history
- Trigger-based update criteria
- Dissemination or training acknowledgements

### Repo Gap Notes

- The repo can generate incident response plans, but no adopted service-level IR policy is visible.
- No ownership or review evidence is represented for IR governance artifacts.

Relevant files:

- [src/server/agent/index.ts](src/server/agent/index.ts#L218)
- [docs/deployment.md](docs/deployment.md)

## IA-5 Authenticator Management

### Objective

Manage the issuance, protection, refresh, revocation, and secure handling of authenticators.

### Requirement Checklist

| Requirement | Status | Evidence Reference | Notes |
|---|---|---|---|
| Identity is verified before initial authenticator issuance |  |  |  |
| Initial authenticator content is established and controlled |  |  |  |
| Authenticators are strong enough for intended use |  |  |  |
| Procedures exist for issuance, compromise, damage, and revocation |  |  |  |
| Default authenticators are changed prior to first use |  |  |  |
| Authenticators are changed or refreshed on schedule and on triggering events |  |  |  |
| Authenticator content is protected from unauthorized disclosure or modification |  |  |  |
| Users and devices are required to protect authenticators |  |  |  |
| Group and role authenticators are changed when membership changes |  |  |  |

### Evidence Requests

- Password and authenticator standard
- MFA, PKI, or credential lifecycle procedures
- Default credential removal checklist
- Credential rotation records
- Secret storage design
- Lost or compromised authenticator incident records
- Shared or group credential rotation evidence

### Repo Gap Notes

- No application authentication flow is visible.
- No MFA, password, or authenticator lifecycle enforcement is implemented in the app.

Relevant files:

- [src/server/index.ts](src/server/index.ts#L73)
- [README.md](README.md#L93)

## SC-7 Boundary Protection

### Objective

Monitor and control communications at managed interfaces and separate public-facing components from internal networks.

### Requirement Checklist

| Requirement | Status | Evidence Reference | Notes |
|---|---|---|---|
| Communications are monitored and controlled at external managed interfaces |  |  |  |
| Communications are monitored and controlled at key internal interfaces |  |  |  |
| Publicly accessible components are deployed on separated subnetworks |  |  |  |
| External networks are accessed only through managed interfaces and boundary devices |  |  |  |
| Boundary protection aligns to the security architecture |  |  |  |

### Evidence Requests

- Current network and trust boundary diagrams
- Firewall, gateway, proxy, WAF, and ingress-egress standards
- Firewall rule review records
- DMZ or segmented network design
- External connectivity inventory
- Remote access architecture and split-tunnel settings

### Repo Gap Notes

- CORS is configured as wildcard allow-all.
- No in-app rate limiting, proxy trust restrictions, or deny-by-default traffic controls are visible.
- Boundary protection may be inherited from hosting infrastructure but is not evidenced in repo artifacts.

Relevant files:

- [src/server/index.ts](src/server/index.ts#L23)
- [docs/architecture.md](docs/architecture.md#L6)

## SI-4 System Monitoring

### Objective

Monitor systems for attacks, indicators of attack, unauthorized connections, and anomalies, and provide actionable monitoring information.

### Requirement Checklist

| Requirement | Status | Evidence Reference | Notes |
|---|---|---|---|
| Monitoring objectives are defined |  |  |  |
| The system monitors for attacks and indicators of attacks |  |  |  |
| The system monitors for unauthorized local, network, and remote connections |  |  |  |
| Unauthorized use is identified using defined methods |  |  |  |
| Monitoring capabilities are strategically placed to collect essential information |  |  |  |
| Monitoring can be deployed ad hoc for transactions of interest |  |  |  |
| Detected events and anomalies are analyzed |  |  |  |
| Monitoring activity is adjusted when risk changes |  |  |  |
| Legal review of monitoring activities is obtained |  |  |  |
| Monitoring information is provided to defined roles on a defined basis |  |  |  |

### Evidence Requests

- Monitoring strategy or SOC standard
- SIEM, IDS/IPS, EDR, or cloud monitoring configuration
- Alert catalog and escalation matrix
- Evidence of event review and analysis
- Risk-based tuning records
- Privacy or legal review of monitoring
- Monitoring reports distributed to responsible roles

### Repo Gap Notes

- No telemetry instrumentation or monitoring integration is visible in application code.
- Deployment guidance references monitoring, but code evidence is not present.

Relevant files:

- [docs/deployment.md](docs/deployment.md#L128)
- [src/server/index.ts](src/server/index.ts#L84)

## Baseline Enhancements

### Low Impact

| Control | Baseline Enhancements |
|---|---|
| AC-2 | Base control only |
| AU-2 | Base control only |
| IR-1 | Base control only |
| IA-5 | IA-5(1) Password-based Authentication |
| SC-7 | Base control only |
| SI-4 | Base control only |

### Moderate Impact

| Control | Baseline Enhancements |
|---|---|
| AC-2 | AC-2(1), AC-2(2), AC-2(3), AC-2(4), AC-2(5), AC-2(13) |
| AU-2 | Base control only |
| IR-1 | Base control only |
| IA-5 | IA-5(1), IA-5(2), IA-5(6) |
| SC-7 | SC-7(3), SC-7(4), SC-7(5), SC-7(7), SC-7(8) |
| SI-4 | SI-4(2), SI-4(4), SI-4(5) |

## Remediation Matrix

| Control | Gap | Risk | Priority | Recommended Remediation | Evidence to Produce |
|---|---|---|---|---|---|
| AC-2 | No authenticated user model; anonymous fallback | Unauthorized or untraceable access | Critical | Implement centralized authentication, unique user identity, RBAC, and account lifecycle workflow | IAM design, access review records, deprovisioning evidence |
| AC-2 | No account review or disablement automation | Orphaned or over-privileged accounts | High | Add inventory, periodic review, dormant account handling, and disablement automation | Account inventory, review logs, disablement job output |
| AU-2 | No structured audit logging standard | Weak investigations and poor auditability | Critical | Implement structured audit logging with event catalog, identity correlation, and protected retention | Logging standard, event samples, retention config |
| AU-2 | No review cadence for logged event types | Logging may miss investigation needs | High | Establish periodic logging review tied to threat scenarios | Review minutes, event catalog revisions |
| IR-1 | No adopted service-level IR policy evidence | Weak governance and inconsistent response | High | Create and approve IR policy and procedures package for the service | Signed IR policy, owner assignment, revision history |
| IA-5 | No implemented authenticator lifecycle controls | Cannot evidence password, MFA, or secret handling controls | Critical | Introduce enterprise authentication, MFA, secret rotation, and revocation procedures | Auth standard, MFA evidence, secret rotation records |
| SC-7 | Wildcard CORS and no visible app-layer traffic restrictions | API overexposure and weak boundary assurance | High | Replace open CORS with allowlist, add rate limiting and trusted proxy settings, document interfaces | CORS config, ingress design, firewall or gateway rules |
| SI-4 | No telemetry or alerting integration in code | Limited attack detection and visibility | Critical | Integrate monitoring and alerting, define monitoring objectives, and route alerts to responsible teams | Monitoring dashboards, alert rules, escalation matrix |

## Sign-off

| Role | Name | Date | Comments |
|---|---|---|---|
| Assessor |  |  |  |
| Control Owner |  |  |  |
| Security Reviewer |  |  |  |
| Engineering Lead |  |  |  |
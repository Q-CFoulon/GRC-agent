# Security Policy

## Supported Versions

Security fixes are applied to the latest release on the `main` branch.

| Version / Branch | Supported |
| --- | --- |
| Latest on `main` | Yes |
| Older releases / forks | Best effort |

If you are running a pinned commit or a fork, please update to the latest `main`
before reporting an issue (if possible).

## Reporting a Vulnerability

Please **do not** open public GitHub issues or discussions for security reports.

### Preferred: GitHub Private Vulnerability Reporting
Use GitHub’s *Report a vulnerability* feature:
- Go to the repo page → **Security** tab → **Report a vulnerability**.

This keeps the report private while we investigate and coordinate a fix.

### If private reporting is not available
Email the maintainers with details and use the subject line:
`[SECURITY] Vulnerability report for Q-CFoulon/GRC-agent`

Include:
- A clear description of the issue and impact
- Steps to reproduce (proof-of-concept if available)
- Affected versions/commits (if known)
- Any suggested remediation
- Whether you plan to disclose publicly and on what timeline

### Response targets
We aim to:
- Acknowledge receipt within **3 business days**
- Provide a status update within **7 business days**
- Ship a fix as soon as practical based on severity and complexity

### Coordinated disclosure
We support coordinated vulnerability disclosure. Please allow us time to
validate the report, implement a fix, and publish an advisory before any public
disclosure.

## Security Best Practices (Project Notes)

- Keep dependencies updated (Dependabot PRs are welcome).
- Run CI/security checks before merging.
- Avoid committing secrets. If a secret is committed, rotate it immediately.

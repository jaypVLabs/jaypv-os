# Access Management

This document outlines access control and permissions for the JayPVentures LLC repository and associated systems.

## Repository Access

### GitHub Repository
- **Repository:** `JayPVentures-LLC/jaypventuresllc.com`
- **Organization:** JayPVentures-LLC
- **Visibility:** Public repository

### Authorized Accounts

#### Primary Technical Contact
- **Email:** jayhere@jaypventuresllc.com
- **Role:** Repository Owner, Code Owner, Technical Lead
- **GitHub:** @jayhere
- **Access Level:** Admin
- **Responsibilities:**
  - Code review and approval
  - Security and access management
  - CI/CD configuration
  - Deployment oversight
  - Wix site administration

#### Secondary Contact
- **Email:** jaypventures@icloud.com
- **Role:** Organization Owner
- **Access Level:** Admin

## Access Requirements

### For Contributors
To contribute to this repository, you need:

1. **GitHub Account**
   - Must be a member of the JayPVentures-LLC organization
   - GitHub username added to collaborators list

2. **Git Configuration**
   - Configure Git with an authorized email address
   - Set up SSH keys or personal access tokens for authentication

3. **Development Environment**
   - Node.js v20 or later
   - npm package manager
   - Git CLI tools
   - (Optional) Python 3.9+ for load testing

4. **Wix Access** (for deploying/testing)
   - Wix account with site access (for manual operations)
   - Wix CLI authentication token (optional, for local development)

## Permission Levels

### Repository Permissions
- **Admin:** Full access (jayhere@jaypventuresllc.com)
- **Maintain:** Manage repository settings without access to sensitive actions
- **Write:** Push to non-protected branches, create PRs
- **Read:** Clone and pull repository

### Code Ownership
Defined in `.github/CODEOWNERS`:
- All code: @jayhere
- Backend code: @jayhere
- CI/CD workflows: @jayhere
- Security files: @jayhere
- Documentation: @jayhere
- Configuration files: @jayhere

## Security & Authentication

### GitHub Authentication
Contributors should use one of the following:
- Personal Access Token (PAT) with repo scope
- SSH key authentication
- GitHub CLI (`gh`) authentication

### Wix CLI Authentication
For local development with Wix:
```bash
wix login
```

This authenticates your Wix CLI session. The authentication token is stored locally and should never be committed to the repository.

### CI/CD Secrets
The following secrets are configured in GitHub Actions:
- `WIX_AUTH_TOKEN` - For automated Wix preview builds (if configured)

**Note:** Only repository admins can view and manage secrets.

## Access Control Checklist

When configuring access for jayhere@jaypventuresllc.com:

- [x] GitHub organization membership (JayPVentures-LLC)
- [x] Repository access level (Admin)
- [x] CODEOWNERS file created
- [x] Git commit email configured (jayhere@jaypventuresllc.com)
- [ ] Wix site collaborator access
- [ ] GitHub Actions secrets access (if needed)
- [ ] Two-factor authentication enabled (recommended)
- [ ] SSH key or PAT configured for Git authentication
- [x] Email credentials rotated (after 2026-04-08 security incident)

## Git Configuration

### Setting Up Git Email
```bash
# Configure your Git identity
git config --global user.name "Your Name"
git config --global user.email "jayhere@jaypventuresllc.com"

# Verify configuration
git config --global --list
```

### SSH Key Setup
```bash
# Generate SSH key (if needed)
ssh-keygen -t ed25519 -C "jayhere@jaypventuresllc.com"

# Add SSH key to GitHub account
# Copy public key: cat ~/.ssh/id_ed25519.pub
# Add to GitHub: Settings → SSH and GPG keys → New SSH key
```

### Personal Access Token Setup
1. Go to GitHub Settings → Developer settings → Personal access tokens
2. Generate new token with `repo` scope
3. Use token as password when pushing/pulling via HTTPS

## Wix Site Access

### Site Details
- **Site ID:** 46ed4c46-b292-491d-af5a-f40358a80a29
- **Platform:** Wix Velo
- **Deployment:** Automated via Git Integration

### Required Access
- Wix account must be added as a site collaborator
- Minimum role: Editor (for code deployment)
- Admin role required for: site settings, domain management, Git Integration configuration

### Granting Wix Access
1. Log in to Wix dashboard
2. Navigate to site settings
3. Go to Permissions → Contributors
4. Add jayhere@jaypventuresllc.com as contributor
5. Assign appropriate role (Editor or Admin)

## CI/CD Access

### GitHub Actions
- Workflow files: `.github/workflows/`
- Current workflows:
  - `ci.yml` - Linting and validation
  
### Managing CI/CD
- View workflow runs: GitHub Actions tab
- Re-run failed workflows: Available to Write+ access level
- Edit workflow files: Requires Write access and code review approval

## Security Incident Response

### 2026-04-08 Incident
- **Issue:** Email credentials exposed in repository
- **Action Taken:** Credentials removed, repository cleaned, .gitignore updated
- **Required:** Email password rotation for jayhere@jaypventuresllc.com
- **Status:** Credentials should be considered compromised and must be rotated

### Reporting Security Issues
See [SECURITY.md](../SECURITY.md) for vulnerability reporting procedures.

## Best Practices

### For Account Holders
1. **Enable 2FA** on GitHub and Wix accounts
2. **Rotate credentials** regularly
3. **Use SSH keys** instead of passwords where possible
4. **Never commit secrets** to the repository
5. **Review access logs** periodically
6. **Revoke unused tokens** and keys

### For Repository Admins
1. **Audit access** quarterly
2. **Remove inactive users** promptly
3. **Monitor CI/CD secrets** for leaks
4. **Review CODEOWNERS** when team changes
5. **Document access changes** in this file

## Troubleshooting Access Issues

### Cannot Push to Repository
1. Verify GitHub account has Write or higher access
2. Check Git authentication (SSH key or PAT)
3. Ensure pushing to non-protected branch or have appropriate permissions
4. Verify Git email matches authorized account

### Cannot Access Wix CLI
1. Run `wix login` to authenticate
2. Verify Wix account has site access
3. Check network connectivity
4. Ensure @wix/cli is installed: `npm install -g @wix/cli`

### Cannot View CI/CD Secrets
- Only repository admins can view secrets
- Contact jayhere@jaypventuresllc.com for secret management

## Contact

For access or permission issues, contact:
- **Primary:** jayhere@jaypventuresllc.com
- **Organization:** JayPVentures-LLC on GitHub

---

**Last Updated:** 2026-04-13  
**Document Owner:** jayhere@jaypventuresllc.com

# Access Management

This document outlines access control and permissions for the JayPVentures LLC repository and associated systems.

## Repository Access

### GitHub Repository
- **Repository:** `JayPVentures-LLC/jaypventuresllc.com`
- **Organization:** JayPVentures-LLC
- **Visibility:** Public repository

### Authorized Accounts

#### Primary Technical Contact
- **Name:** Jasmyn Price
- **Email:** jayhere@jaypventuresllc.com (Primary UPN)
- **Alternate Emails:** 
  - jaypventuresllc@outlook.com
  - jaypventures@icloud.com
  - jasmynp11@gmail.com
  - jasmyn.price@email.phoenix.edu
- **Phone:** +1 (812) 896-4734, +1 (502) 523-8152
- **Role:** Founder, CEO, Repository Owner, Code Owner, Technical Lead
- **GitHub:** @jayhere
- **Access Level:** Admin
- **User Object ID:** 5bab4fb7-a52c-421b-cbcd-4cfb0a58edf9
- **Responsibilities:**
  - Code review and approval
  - Security and access management
  - CI/CD configuration
  - Deployment oversight
  - Wix site administration
  - Organization ownership

#### Secondary Contact
- **Email:** jaypventures@icloud.com
- **Role:** Organization Owner, Creative Operations
- **Access Level:** Admin
- **Group:** Creators

#### Business Operations
- **Email:** security@jaypventuresllc.com (Security operations)
- **Email:** venture@jaypventuresllc.com (Business operations)
- **Email:** support@jaypventuresllc.com (Technical support)
- **Access Level:** Admin
- **Group:** Administrators

#### Contractor Accounts
- **Email:** jasmynp11@gmail.com (Contract work, personal account)
- **Email:** jasmyn.price@email.phoenix.edu (Educational/training account)
- **Access Level:** Limited (Contractor access)
- **Group:** Contractors

For complete user directory with group memberships and access matrix, see [docs/user-roster.md](./user-roster.md).

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
- [ ] Two-factor authentication enabled (required for admin access)
- [ ] SSH key or PAT configured for Git authentication
- [x] Email credentials rotated (after 2026-04-08 security incident)

## Multi-Device Access Configuration

### Configuring jayhere@jaypventuresllc.com for Access on Any Device

The jayhere@jaypventuresllc.com account can be configured to work across multiple devices while keeping MFA enabled for interactive sign-in. For Git operations, use a per-device SSH key or fine-grained personal access token (PAT) so authentication remains secure without weakening MFA requirements.

#### Option 1: Personal Access Tokens (Recommended for HTTPS)

**GitHub PAT Setup:**
1. Navigate to GitHub Settings → Developer settings → Personal access tokens → Fine-grained tokens
2. Click "Generate new token"
3. Provide a descriptive name (e.g., "MacBook Pro 2026", "Windows Desktop", "Linux Laptop")
4. Limit repository access to only the repositories needed and grant only the minimum permissions required for the intended Git operations
5. Set a short expiration (for example, 30-90 days) and plan to rotate the token regularly
6. Generate the token and save it securely in the device credential manager or password manager
7. Use the PAT as your password when Git prompts for credentials, while keeping MFA enabled on the GitHub account

**Benefits:**
- Bypasses MFA requirements for Git operations
- Can be scoped to specific permissions
- Can be revoked individually without affecting other devices
- Works with HTTPS Git URLs

#### Option 2: SSH Keys (Recommended for Advanced Users)

**SSH Key Setup:**
```bash
# Generate device-specific SSH key
ssh-keygen -t ed25519 -C "jayhere@jaypventuresllc.com-device-name"

# Add to SSH agent
eval "$(ssh-agent -s)"
ssh-add ~/.ssh/id_ed25519

# Copy public key
cat ~/.ssh/id_ed25519.pub
```

**Add to GitHub:**
1. Go to GitHub Settings → SSH and GPG keys → New SSH key
2. Provide descriptive title (e.g., "MacBook Pro 2026")
3. Paste public key
4. Save

**Benefits:**
- No MFA required for Git operations
- More secure than password-based authentication
- Automatically authenticates without password prompts
- Industry standard for Git authentication

#### Option 3: GitHub CLI

```bash
# Install GitHub CLI (gh)
# macOS: brew install gh
# Windows: winget install GitHub.cli
# Linux: See https://github.com/cli/cli#installation

# Authenticate
gh auth login

# Follow prompts - select HTTPS or SSH, authenticate via browser
```

**Benefits:**
- Simplified authentication process
- Works for both Git and GitHub API operations
- Handles credential storage automatically

#### Wix CLI Multi-Device Setup

For each device, authenticate separately:

```bash
# Install Wix CLI globally
npm install -g @wix/cli

# Authenticate on device
wix login

# Verify authentication
wix whoami
```

The authentication token is stored locally and doesn't require MFA for subsequent operations.

#### Device Management Best Practices

1. **Use Descriptive Names:** Always name credentials/keys by device for easy identification
2. **Regular Audits:** Review GitHub Settings → SSH keys and PATs quarterly
3. **Revoke Unused:** Remove credentials for devices no longer in use
4. **Secure Storage:** Use OS credential managers (Keychain on macOS, Credential Manager on Windows)
5. **Separate Credentials:** Never share tokens or keys across devices
6. **Monitor Activity:** Check GitHub Settings → Security log for unusual access

#### Emergency Access Revocation

If a device is lost or compromised:

1. **GitHub:** Settings → SSH and GPG keys (or Personal access tokens) → Delete
2. **Wix:** Contact Wix support or logout from dashboard
3. **Review:** Check GitHub security log for unauthorized activity
4. **Rotate:** Generate new credentials for remaining devices if needed

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

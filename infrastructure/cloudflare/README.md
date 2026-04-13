# Cloudflare Infrastructure Configuration

## Overview

This directory contains example configuration files for JayPVentures LLC's Cloudflare Zero Trust infrastructure.

**⚠️ SECURITY WARNING:** These are example files only. Never commit actual production configurations, credentials, or sensitive settings to version control.

---

## Files in This Directory

### `enrollment-policy.example.json`
Example device enrollment policy configuration.

**Purpose:** Defines who can enroll devices in the Zero Trust organization.

**Key Settings:**
- Email-based authentication
- Service mode configuration
- Policy settings and user experience options

### `gateway-policies.example.json`
Example Cloudflare Gateway security policies.

**Purpose:** Network-level security rules for traffic filtering and threat prevention.

**Key Settings:**
- Malware and phishing blocking
- File type restrictions
- DNS security categories
- Application allow/block lists
- TLS inspection settings

### `split-tunnel.example.json`
Example split tunnel configuration.

**Purpose:** Defines which traffic should bypass the Cloudflare tunnel.

**Key Settings:**
- Private network ranges (RFC 1918)
- Local domain fallback
- Application-specific exclusions

### `scripts/Fix-CloudflareWARP.ps1`
PowerShell troubleshooting and repair script for Windows administrators.

**Purpose:** Diagnoses and fixes common Cloudflare WARP client issues.

**Features:**
- Network connectivity testing
- DNS resolution diagnostics
- WARP service status checks
- Automatic repair functionality
- Cache clearing
- Reinstallation support

**Usage:**
```powershell
# Run as Administrator for full functionality

# Basic diagnostics and repair
.\Fix-CloudflareWARP.ps1

# Diagnostics only (no changes)
.\Fix-CloudflareWARP.ps1 -DiagnosticsOnly

# Force reinstall
.\Fix-CloudflareWARP.ps1 -Reinstall

# Specify different email
.\Fix-CloudflareWARP.ps1 -Email "user@jaypventuresllc.com"
```

---

## Usage

### Infrastructure as Code

These configuration files are intended to:

1. **Document** the current Cloudflare Zero Trust setup
2. **Version control** infrastructure changes
3. **Enable** automated deployment (future enhancement)
4. **Provide** templates for policy creation

### Deployment Methods

**Manual Deployment:**
1. Log in to Cloudflare Zero Trust dashboard
2. Navigate to the appropriate section (Devices, Gateway, Network)
3. Use these files as templates to create or update policies
4. Verify settings before applying

**API Deployment (Advanced):**
```bash
# Example: Update enrollment policy via Cloudflare API
curl -X PUT "https://api.cloudflare.com/client/v4/accounts/{account_id}/devices/policy" \
  -H "Authorization: Bearer {api_token}" \
  -H "Content-Type: application/json" \
  -d @enrollment-policy.json
```

**Terraform (Future):**
Consider using Terraform for infrastructure as code:
- [Cloudflare Terraform Provider](https://registry.terraform.io/providers/cloudflare/cloudflare/latest/docs)
- Version-controlled infrastructure changes
- Automated deployments and rollbacks

---

## Configuration Best Practices

### Version Control
- ✅ Commit example/template files
- ✅ Document configuration changes
- ❌ Never commit actual credentials
- ❌ Never commit production API tokens

### Secrets Management
Store sensitive values separately:
- **Environment Variables:** For API tokens and credentials
- **.env files:** For local development (gitignored)
- **Secret Managers:** AWS Secrets Manager, HashiCorp Vault, etc.

### Change Management
1. **Test** changes in a non-production environment first
2. **Review** configurations with security team
3. **Document** the reason for each change
4. **Monitor** impact after deployment
5. **Rollback** quickly if issues arise

---

## Security Considerations

### Access Control
- Limit who can modify Cloudflare configurations
- Use role-based access control (RBAC)
- Enable audit logging for all changes
- Review access permissions quarterly

### Monitoring
- Set up alerts for policy violations
- Monitor for configuration drift
- Review logs for unauthorized changes
- Test policies regularly

### Backup & Recovery
- Export configurations regularly
- Store backups in secure location
- Test restoration procedures
- Document recovery process

---

## API Authentication

To use the Cloudflare API for automated deployments, you'll need:

### API Token
Create an API token with appropriate permissions:

1. Log in to Cloudflare Dashboard
2. Go to **My Profile** > **API Tokens**
3. Click **Create Token**
4. Select template: **Edit Cloudflare Zero Trust**
5. Set permissions:
   - Zero Trust: Edit
   - Account Settings: Read
6. Set IP filtering (optional but recommended)
7. Generate and save the token securely

**Required Environment Variable:**
```bash
export CLOUDFLARE_API_TOKEN="your-api-token-here"
```

### Account ID
Find your Account ID:
1. Log in to Cloudflare Dashboard
2. Select your account
3. Account ID is shown in the right sidebar

**Required Environment Variable:**
```bash
export CLOUDFLARE_ACCOUNT_ID="your-account-id-here"
```

---

## Example API Commands

### List Current Policies
```bash
# List device enrollment policies
curl -X GET "https://api.cloudflare.com/client/v4/accounts/${CLOUDFLARE_ACCOUNT_ID}/devices/policy" \
  -H "Authorization: Bearer ${CLOUDFLARE_API_TOKEN}" \
  | jq
```

### Get Gateway Policies
```bash
# List Gateway firewall rules
curl -X GET "https://api.cloudflare.com/client/v4/accounts/${CLOUDFLARE_ACCOUNT_ID}/gateway/rules" \
  -H "Authorization: Bearer ${CLOUDFLARE_API_TOKEN}" \
  | jq
```

### Update Split Tunnel Config
```bash
# Update split tunnel configuration
curl -X PUT "https://api.cloudflare.com/client/v4/accounts/${CLOUDFLARE_ACCOUNT_ID}/devices/policy/exclude" \
  -H "Authorization: Bearer ${CLOUDFLARE_API_TOKEN}" \
  -H "Content-Type: application/json" \
  -d @split-tunnel.json
```

---

## Terraform Example (Future Enhancement)

If you decide to use Terraform for infrastructure as code:

```hcl
# terraform/cloudflare.tf

terraform {
  required_providers {
    cloudflare = {
      source  = "cloudflare/cloudflare"
      version = "~> 4.0"
    }
  }
}

provider "cloudflare" {
  api_token = var.cloudflare_api_token
}

resource "cloudflare_teams_rule" "block_malware" {
  account_id  = var.cloudflare_account_id
  name        = "Block Malware and Phishing"
  description = "Block known malicious domains"
  precedence  = 1
  enabled     = true
  action      = "block"
  
  filters = ["malware", "phishing"]
}

# Additional resources...
```

---

## Troubleshooting

### Common Issues

**Issue: API returns 403 Forbidden**
- Solution: Verify API token has correct permissions
- Check: Token hasn't expired
- Check: IP restrictions (if configured)

**Issue: Configuration not applying**
- Solution: Check for syntax errors in JSON
- Verify: Account ID is correct
- Wait: Changes may take a few minutes to propagate

**Issue: Policy conflicts**
- Solution: Review precedence order
- Check: No overlapping rules with contradictory actions
- Test: One policy at a time

---

## Additional Resources

### Cloudflare Documentation
- [Zero Trust API Documentation](https://developers.cloudflare.com/api/operations/zero-trust-accounts-get-account)
- [Gateway Policies API](https://developers.cloudflare.com/api/operations/zero-trust-gateway-rules-list-rules)
- [Device Management API](https://developers.cloudflare.com/api/operations/zero-trust-devices-list-devices)

### Tools
- [jq](https://stedolan.github.io/jq/) - JSON processor for CLI
- [Terraform](https://www.terraform.io/) - Infrastructure as Code
- [Postman](https://www.postman.com/) - API testing and development

---

## Maintenance Schedule

- **Weekly:** Review and test configurations
- **Monthly:** Audit policy effectiveness
- **Quarterly:** Full security review and policy updates
- **Annually:** Comprehensive infrastructure assessment

---

## Contact

**Primary Administrator:** jayhere@jaypventuresllc.com (Jasmyn Price, Founder/CEO)  
**Infrastructure & Security:** security@jaypventuresllc.com  
**Emergency Support:** security@jaypventuresllc.com  
**Business Operations:** venture@jaypventuresllc.com

For complete user directory and group memberships, see: [docs/user-roster.md](../../docs/user-roster.md)

---

**Last Updated:** April 13, 2026  
**Maintained By:** JayPVentures LLC IT Team

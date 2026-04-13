# JayPVentures LLC User Directory

## Overview

This document maintains the official user directory for JayPVentures LLC, including approved email addresses, roles, and group memberships for system access.

**Organization:** JayPVentures LLC  
**Last Updated:** April 13, 2026  
**Document Owner:** IT Security Team  
**Classification:** Internal Use Only

---

## Primary User Identity

### Jasmyn Price - Founder & CEO

**Legal Name:** Jasmyn Price  
**Primary Role:** Founder, CEO  
**User Object ID:** 5bab4fb7-a52c-421b-cbcd-4cfb0a58edf9

**Contact Information:**
- **Primary Phone:** +1 (812) 896-4734
- **Alternate Phone:** +1 (502) 523-8152

---

## Email Addresses by Group Membership

### Administrators (CRITICAL)
Full administrative access to all systems, security controls, and business operations.

| Email Address | Purpose | Access Level |
|--------------|---------|--------------|
| jayhere@jaypventuresllc.com | Primary UPN, System Administrator | Admin - Full Access |
| security@jaypventuresllc.com | Security operations, incident response | Admin - Security Focus |
| venture@jaypventuresllc.com | Business operations, strategic planning | Admin - Business Focus |
| support@jaypventuresllc.com | Technical support, help desk | Admin - Support Focus |

**Privileges:**
- Full Cloudflare Zero Trust access
- GitHub organization owner/admin
- Wix site administrator
- Payment/billing access
- Security policy management
- User provisioning/deprovisioning

---

### Creators
Content creation, development, and creative operations.

| Email Address | Purpose | Access Level |
|--------------|---------|--------------|
| jaypventures@icloud.com | Creative operations, content development | Creator - Standard Access |

**Privileges:**
- Cloudflare device enrollment
- GitHub contributor access (write)
- Wix editor access
- Content management systems
- Development tools

---

### Contractors
External contractors and educational/training accounts with limited access.

| Email Address | Purpose | Access Level |
|--------------|---------|--------------|
| jasmynp11@gmail.com | Contract work, personal projects | Contractor - Limited Access |
| jasmyn.price@email.phoenix.edu | Educational account, training purposes | Contractor - Educational Only |

**Privileges:**
- Limited Cloudflare device enrollment (on approval)
- GitHub read access (public repos)
- Specific project access as assigned
- Time-limited access policies

---

### Alternate Contacts

| Email Address | Purpose | Usage |
|--------------|---------|-------|
| jaypventuresllc@outlook.com | Backup communications | Secondary contact, account recovery |

**Note:** Not used for system authentication, backup communications only.

---

## Access Control Matrix

### System Access by User Group

| System/Service | Administrators | Creators | Contractors |
|----------------|----------------|----------|-------------|
| Cloudflare Zero Trust | ✅ Full Access | ✅ Standard | ⚠️ Limited (on approval) |
| GitHub Organization | ✅ Admin | ✅ Write | 👁️ Read Only |
| Wix Site (jaypventuresllc.com) | ✅ Admin | ✅ Editor | ❌ No Access |
| Payment Systems (Stripe, etc.) | ✅ Admin | ❌ No Access | ❌ No Access |
| Security Logs & Monitoring | ✅ Full Access | 👁️ Read Only | ❌ No Access |
| User Management | ✅ Full Access | ❌ No Access | ❌ No Access |
| Infrastructure (Cloudflare, DNS) | ✅ Admin | ⚠️ Limited | ❌ No Access |

**Legend:**
- ✅ Full access as specified
- ⚠️ Limited/conditional access
- 👁️ Read-only access
- ❌ No access

---

## Authentication & Security

### Multi-Factor Authentication (MFA)

**Required for:**
- All administrator accounts
- Payment/billing access
- Security policy changes
- User provisioning operations

**Recommended for:**
- Creator accounts
- Contractor accounts with sensitive access

**Methods Supported:**
- Authenticator apps (Google Authenticator, Authy, etc.)
- Hardware security keys (YubiKey, etc.)
- SMS (backup only, not recommended as primary)

### Device Limits

**Per User Group:**
- **Administrators:** Maximum 5 enrolled devices per user
- **Creators:** Maximum 3 enrolled devices
- **Contractors:** Maximum 2 enrolled devices

### Session Management

**Administrator Accounts:**
- Session duration: 8 hours
- Idle timeout: 30 minutes
- Re-authentication required after timeout
- Maximum concurrent sessions: 3

**Creator/Contractor Accounts:**
- Session duration: 4 hours
- Idle timeout: 15 minutes
- Re-authentication required after timeout
- Maximum concurrent sessions: 2

---

## User Lifecycle Management

### Onboarding New Users

1. **Request Submission**
   - Submit access request with business justification
   - Specify required group membership (Admin/Creator/Contractor)
   - List systems/services requiring access

2. **Approval Process**
   - Manager approval required
   - IT Security Team review
   - CEO approval for administrator access

3. **Provisioning**
   - Add email to Cloudflare enrollment policy
   - Create GitHub organization membership
   - Grant Wix site access (if applicable)
   - Configure MFA requirements
   - Document access in this roster

4. **Verification**
   - User completes initial authentication
   - MFA setup verified
   - Access to required systems confirmed
   - Security awareness training completed

### Offboarding Users

When a user leaves or changes roles:

1. **Immediate Actions** (within 1 hour)
   - Revoke Cloudflare device enrollment
   - Disable GitHub access
   - Revoke Wix site access
   - Disable email forwarding

2. **Account Cleanup** (within 24 hours)
   - Remove from all group memberships
   - Archive user data if required
   - Transfer ownership of critical resources
   - Update documentation

3. **Audit** (within 7 days)
   - Review access logs for unusual activity
   - Confirm all access revoked
   - Update user roster
   - Document offboarding completion

### Role Changes

When a user changes roles (e.g., Creator → Administrator):

1. Review and approve new access requirements
2. Add to new group memberships
3. Grant additional system access
4. Enable/upgrade MFA if required
5. Remove previous group memberships (if applicable)
6. Update this roster document

---

## Group Membership Details

### Administrators Group

**Purpose:** Full administrative control of all JayPVentures LLC systems and services.

**Membership Requirements:**
- Employee or key contractor status
- Background check completed
- Security awareness training current
- MFA enabled on all accounts
- Signed confidentiality agreement

**Review Frequency:** Quarterly

**Current Members:**
1. jayhere@jaypventuresllc.com (Jasmyn Price, Founder/CEO)
2. security@jaypventuresllc.com (Security operations)
3. venture@jaypventuresllc.com (Business operations)
4. support@jaypventuresllc.com (Technical support)

### Creators Group

**Purpose:** Content creation, development, and creative operations.

**Membership Requirements:**
- Active project or content creation role
- Basic security awareness training
- NDA signed (if contractor)
- MFA recommended

**Review Frequency:** Quarterly

**Current Members:**
1. jaypventures@icloud.com (Creative operations)

### Contractors Group

**Purpose:** External contractors, temporary workers, and educational accounts.

**Membership Requirements:**
- Valid contract or educational enrollment
- Project-specific access approval
- Time-limited access policies
- NDA signed

**Review Frequency:** Monthly (or at contract end)

**Current Members:**
1. jasmynp11@gmail.com (Contract work)
2. jasmyn.price@email.phoenix.edu (Educational account)

---

## Emergency Access Procedures

### Lost Device Protocol

If a user loses a device with active authentication:

1. **Immediate:** Contact IT Security Team (security@jaypventuresllc.com)
2. **Within 1 hour:** Device revoked from Cloudflare enrollment
3. **Within 4 hours:** All sessions terminated, re-authentication required
4. **Within 24 hours:** Access audit completed

### Compromised Credentials

If user credentials are compromised:

1. **Immediate:** Change passwords on all accounts
2. **Within 30 minutes:** Revoke all active sessions
3. **Within 1 hour:** Review access logs for unauthorized activity
4. **Within 24 hours:** Rotate MFA secrets, security incident report filed

### Emergency Access Revocation

To immediately revoke a user's access:

1. **Cloudflare:** Teams & Resources → Devices → Revoke all devices
2. **GitHub:** Organization → People → Remove from organization
3. **Wix:** Site Settings → Permissions → Remove contributor
4. **Document:** Log reason and timestamp in security incident log

---

## Compliance & Auditing

### Regular Audits

**Monthly:**
- Review contractor access and expiration dates
- Remove inactive devices
- Check for unauthorized access attempts

**Quarterly:**
- Full user access audit
- Group membership review
- MFA compliance check
- Update this roster document

**Annually:**
- Comprehensive security review
- Access policy updates
- User training requirements verification

### Access Logs

Access logs are maintained for:
- Authentication attempts: 90 days
- System access: 60 days
- Administrative actions: 7 years (compliance)

### Reporting Violations

Report access violations or security concerns to:
- **Email:** security@jaypventuresllc.com
- **Escalation:** jayhere@jaypventuresllc.com (CEO)

---

## Document Change Log

| Date | Version | Changes | Updated By |
|------|---------|---------|------------|
| 2026-04-13 | 1.0 | Initial user roster created with all user groups | GitHub Copilot |

---

## Contact Information

**Document Owner:** IT Security Team  
**Primary Contact:** security@jaypventuresllc.com  
**Escalation:** jayhere@jaypventuresllc.com

**For Access Requests:** Submit request to security@jaypventuresllc.com  
**For Access Issues:** Contact support@jaypventuresllc.com

---

**Document Classification:** Internal Use Only  
**Next Review Date:** July 13, 2026  
**Approved By:** Jasmyn Price, Founder & CEO

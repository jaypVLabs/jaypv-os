# Cloudflare One Setup Guide

## Overview

This guide documents the setup and configuration of Cloudflare One (Zero Trust) for JayPVentures LLC, providing secure device enrollment, network access, and Zero Trust security policies.

**Organization:** JayPVentures LLC  
**Setup Date:** April 2026  
**Primary Contact:** jasmynp11@gmail.com

---

## Table of Contents

1. [Initial Setup](#initial-setup)
2. [Enrollment Policies](#enrollment-policies)
3. [Service Mode Configuration](#service-mode-configuration)
4. [Default Routing](#default-routing)
5. [Split Tunnels](#split-tunnels)
6. [Client Installation](#client-installation)
7. [Management](#management)

---

## Initial Setup

### Step 1: Download the Cloudflare One Client

The Cloudflare One client (WARP) needs to be installed on all devices that will connect to the Zero Trust organization.

**Supported Platforms:**
- Windows 10/11
- macOS 11+
- Linux (Ubuntu, Debian, CentOS, RHEL)
- iOS 13+
- Android 8+

**Download Links:**
- [Windows Installer](https://install.appcenter.ms/orgs/cloudflare/apps/1.1.1.1-windows-1/distribution_groups/release)
- [macOS Installer](https://install.appcenter.ms/orgs/cloudflare/apps/1.1.1.1-macos-1/distribution_groups/release)
- [Linux Packages](https://pkg.cloudflareclient.com/)
- [iOS App Store](https://apps.apple.com/us/app/1-1-1-1-faster-internet/id1423538627)
- [Google Play Store](https://play.google.com/store/apps/details?id=com.cloudflare.onedotonedotonedotone)

---

## Enrollment Policies

### Overview

Enrollment policies determine who can connect devices to the JayPVentures LLC Zero Trust organization. Policies can be created, modified, and managed under **Teams & Resources > Devices > Management**.

### Current Enrollment Policies

As of April 2026, the following policies are active:

1. **Allow emails: 12/27/2025**
   - Created: December 27, 2025
   - Type: Email-based enrollment

2. **Allow emails: 4/9/2026**
   - Created: April 9, 2026
   - Type: Email-based enrollment

### Creating a New Enrollment Policy (Recommended)

When setting up new devices or adding new team members:

1. Navigate to **Teams & Resources > Devices > Management**
2. Click **Add new policy to enrollment**
3. Configure the policy settings:
   - **Policy Name:** Descriptive name (e.g., "Allow Team Members April 2026")
   - **Policy Type:** Email-based authentication
   - **Allowed Emails:** Add approved user emails

### Approved Users

Current approved users for device enrollment:
- `jasmynp11@gmail.com` (Primary administrator)

### Adding New Users

To add additional approved users:

1. Go to enrollment policy configuration
2. In the **Add approved user emails** field, enter the email address
3. Press Tab or Enter to add the email
4. Click **Continue** to save

**Best Practices:**
- Use work emails when possible
- Verify email addresses before adding
- Remove users who no longer require access
- Audit enrollment policies quarterly

---

## Service Mode Configuration

### Step 3: Select Service Mode

Service mode determines how the Cloudflare One client routes traffic:

**Gateway with WARP (Recommended):**
- Full Zero Trust network protection
- DNS filtering and security scanning
- HTTP/HTTPS inspection capabilities
- Network firewall policies

**Gateway with DoH (DNS-only):**
- DNS-level filtering only
- No network-level inspection
- Lighter resource usage

**Recommended for JayPVentures LLC:** Gateway with WARP for comprehensive protection.

---

## Default Routing

### Step 4: Set Default Routing

Configure how traffic is routed through Cloudflare's network:

**Options:**
1. **All Traffic:** Route all device traffic through Cloudflare (recommended for maximum security)
2. **Split Tunnel:** Only route specific traffic through Cloudflare (better for performance)

**Recommended Configuration:**
- Use **All Traffic** for company-managed devices
- Use **Split Tunnel** for contractor/guest devices

### Routing Considerations

- **Performance:** Split tunnels reduce latency for non-sensitive traffic
- **Security:** All traffic provides maximum protection
- **Bandwidth:** Consider bandwidth costs for remote workers
- **Compliance:** All traffic may be required for regulated industries

---

## Split Tunnels

### Step 5: Manage Split Tunnels

Split tunneling allows you to exclude specific IP addresses, domains, or applications from Cloudflare routing.

**Common Exclusions:**
- Internal corporate networks (e.g., 192.168.x.x, 10.x.x.x)
- Video conferencing platforms (Zoom, Teams, Google Meet)
- Large file transfer services
- Gaming platforms (if applicable)

**Configuration:**
1. Navigate to **Settings > Network**
2. Select **Split Tunnels**
3. Choose **Exclude** or **Include** mode
4. Add IP ranges, domains, or application IDs

### Recommended Exclusions for JayPVentures LLC

```
# Local network ranges
10.0.0.0/8
172.16.0.0/12
192.168.0.0/16

# Performance-critical services (add as needed)
# *.zoom.us
# *.teams.microsoft.com
```

---

## Client Installation

### Step 6: Complete Client Installation

After downloading and installing the Cloudflare One client on each device:

1. **Launch the application**
2. **Sign in** using one of the approved email addresses
3. **Complete authentication** via email verification or SSO
4. **Verify connection** - The client should show "Connected" status
5. **Test access** - Verify internet connectivity and access to required resources

### Post-Installation Verification

Run these checks to ensure proper setup:

**Windows/macOS:**
```bash
# Check WARP connection status
warp-cli status

# Check assigned IP
warp-cli account

# Check connection settings
warp-cli settings
```

**Linux:**
```bash
# Check WARP connection status
warp-cli status

# View connection details
warp-cli account
```

### Troubleshooting

**Connection Issues:**
1. Verify the email address is in the approved list
2. Check firewall settings allow Cloudflare WARP
3. Ensure network allows UDP traffic on port 2408
4. Try switching between WARP modes (WARP, WARP+)

**Authentication Issues:**
1. Verify enrollment policy includes the user's email
2. Check email for authentication link (may be in spam)
3. Clear browser cache and retry
4. Contact administrator if issue persists

---

## Management

### Step 7: Review Details & Ongoing Management

After initial setup, ongoing management tasks include:

### Device Management

Access device inventory at **Teams & Resources > Devices**:
- View all enrolled devices
- Check connection status
- Revoke device access
- Monitor device health

### Policy Updates

Regular policy maintenance:
- **Monthly:** Review enrolled devices and remove inactive ones
- **Quarterly:** Audit enrollment policies and user access
- **Annually:** Review and update security policies

### Monitoring & Logs

Monitor activity through **Analytics** and **Logs**:
- **Gateway Logs:** DNS queries, HTTP requests, network activity
- **Access Logs:** Authentication attempts and user activity
- **Device Posture:** Device health and compliance status

### Security Recommendations

1. **Enable Device Posture Checks:**
   - Require OS updates
   - Check for antivirus/firewall
   - Verify disk encryption

2. **Implement Application Access Policies:**
   - Use Cloudflare Access for internal applications
   - Require Zero Trust authentication
   - Enforce MFA where possible

3. **Configure DNS Filtering:**
   - Block malicious domains
   - Filter adult content (if applicable)
   - Prevent DNS tunneling attacks

4. **Set Up Gateway Policies:**
   - Block risky file types
   - Scan for malware
   - Enforce TLS inspection for sensitive data

---

## Additional Resources

### Cloudflare Documentation
- [Cloudflare One Documentation](https://developers.cloudflare.com/cloudflare-one/)
- [WARP Client Documentation](https://developers.cloudflare.com/warp-client/)
- [Zero Trust Security Guide](https://developers.cloudflare.com/cloudflare-one/policies/)

### Support
- **Cloudflare Support:** [https://support.cloudflare.com](https://support.cloudflare.com)
- **Community Forum:** [https://community.cloudflare.com](https://community.cloudflare.com)
- **Status Page:** [https://www.cloudflarestatus.com](https://www.cloudflarestatus.com)

### Internal Contacts
- **Primary Administrator:** jasmynp11@gmail.com
- **Security Issues:** security@jaypventuresllc.com

---

## Revision History

| Date | Version | Changes | Author |
|------|---------|---------|--------|
| 2026-04-13 | 1.0 | Initial documentation | GitHub Copilot |

---

**Last Updated:** April 13, 2026  
**Document Owner:** JayPVentures LLC IT Security Team

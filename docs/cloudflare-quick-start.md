# Cloudflare One Quick Start

**Quick reference for setting up Cloudflare One device enrollment for JayPVentures LLC**

---

## 🚀 Quick Setup (5 Minutes)

### For End Users

1. **Download the Client**
   - Go to: [Cloudflare WARP Download Page](https://1.1.1.1/)
   - Choose your platform (Windows, Mac, Linux, iOS, Android)
   - Install the application

2. **Enroll Your Device**
   - Open the Cloudflare WARP application
   - Click "Settings" → "Preferences" → "Account"
   - Enter your approved email address (must be on the approved list)
   - Check your email for the verification code
   - Enter the code to complete enrollment

3. **Verify Connection**
   - The app should show "Connected" status
   - Your internet traffic is now protected by Cloudflare

---

## 📋 For Administrators

### Adding New Users

1. Log in to [Cloudflare Zero Trust Dashboard](https://one.dash.cloudflare.com/)
2. Navigate to: **Settings** → **WARP Client** → **Device enrollment**
3. Click on your enrollment policy or create a new one
4. Add the user's email address to the approved list
5. Save changes

### Checking Device Status

1. Go to: **My Team** → **Devices**
2. View all enrolled devices
3. Check connection status, last seen, user email
4. Revoke devices if needed

### Viewing Logs & Activity

1. Navigate to: **Logs** → **Gateway**
2. Filter by user, device, or time period
3. Review DNS queries, HTTP requests, blocked content
4. Export logs if needed for compliance

---

## 🔧 Common Tasks

### Revoking Device Access

**When:** Device lost, employee leaves, security incident

**How:**
1. Go to **My Team** → **Devices**
2. Find the device in the list
3. Click the three dots menu
4. Select "Revoke"
5. Confirm the action

### Updating Policies

**When:** Need to add/remove security rules

**How:**
1. Go to **Gateway** → **Firewall policies**
2. Edit existing policy or create new one
3. Test in "Log only" mode first
4. Change to "Block" when ready
5. Monitor for false positives

### Split Tunnel Configuration

**When:** Certain apps/sites need to bypass WARP

**How:**
1. Go to **Settings** → **WARP Client** → **Device settings**
2. Scroll to **Split Tunnels**
3. Choose "Exclude" or "Include" mode
4. Add IP addresses or domains
5. Save changes (takes effect on next client connection)

---

## 🛠️ Troubleshooting

### User Can't Connect

**Check:**
- ✅ Email is on approved list
- ✅ Enrollment policy is enabled
- ✅ User entered email correctly
- ✅ Verification email not in spam
- ✅ Client app is up to date

**Fix:**
1. Verify email in enrollment policy
2. Resend verification email
3. Check Cloudflare service status
4. Restart WARP client

### Slow Internet Connection

**Check:**
- ✅ Split tunnel configuration
- ✅ Gateway policies (too many scans)
- ✅ TLS inspection enabled
- ✅ User's actual internet speed

**Fix:**
1. Exclude performance-critical apps from tunnel
2. Disable TLS inspection for specific apps
3. Switch to "Gateway with DoH" mode
4. Check Cloudflare network status

### App Not Working

**Check:**
- ✅ App blocked by Gateway policy
- ✅ Domain blocked by DNS filter
- ✅ Split tunnel needed
- ✅ TLS inspection interfering

**Fix:**
1. Check Gateway logs for blocks
2. Add exception for the app/domain
3. Add to split tunnel exclusions
4. Disable TLS inspection for that app

---

## 📖 Full Documentation

For complete details, see:

- **[Cloudflare One Setup Guide](cloudflare-one-setup.md)** - Complete 7-step enrollment process
- **[Zero Trust Security Policies](cloudflare-zero-trust-policies.md)** - All security policies and governance
- **[Infrastructure Configuration](../infrastructure/cloudflare/README.md)** - Config files and API usage

---

## 🔐 Security Contacts

**Primary Administrator:** jayhere@jaypventuresllc.com (Jasmyn Price, Founder/CEO)  
**Security Issues:** security@jaypventuresllc.com  
**Business Operations:** venture@jaypventuresllc.com  
**Technical Support:** support@jaypventuresllc.com

For complete user directory, see: [User Roster](user-roster.md)

---

## 🔗 Important Links

- [Cloudflare Zero Trust Dashboard](https://one.dash.cloudflare.com/)
- [Download WARP Client](https://1.1.1.1/)
- [Cloudflare Status Page](https://www.cloudflarestatus.com/)
- [Cloudflare Community](https://community.cloudflare.com/)
- [Cloudflare Support](https://support.cloudflare.com/)

---

**Last Updated:** April 13, 2026  
**Quick Start Version:** 1.0

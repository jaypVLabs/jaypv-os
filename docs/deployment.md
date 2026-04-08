# Deployment Guide

This guide covers how code reaches production in this repository, including automatic Git Integration deployment and manual publishing with the Wix CLI.

---

## Deployment Methods

This repository supports two deployment workflows:

1. **Automatic deployment via Git Integration** (primary method for production)
2. **Manual deployment via Wix CLI** (for immediate ad-hoc updates)

---

## Method 1: Automatic Deployment (Git Integration)

### How it works
This repository is configured with **Wix Git Integration**, which automatically syncs code from the **main branch** to the live Wix site. Any commit pushed to main triggers an automatic deployment.

**Workflow:**
```
Make changes → Commit → Push to main branch → Wix automatically syncs → Live site updates
```

### Benefits
- **Zero-touch deployment**: No manual publish step required
- **Version control**: All production changes are tracked in Git
- **Rollback capability**: Revert to any previous commit and push to deploy

### To deploy using Git Integration:
1. Ensure your changes are committed to a feature branch
2. Create a pull request to merge into `main`
3. Review and merge the PR
4. Wix automatically deploys the changes to the live site

**Important:** All code merged to `main` goes live automatically. Always test thoroughly before merging.

---

## Method 2: Manual Deployment (Wix CLI)

Use this method when you need to deploy changes immediately without going through the Git workflow.

### Prerequisites
- Node.js (v14.8 or later)
- npm or yarn
- Wix CLI (`npm install -g @wix/cli`)
- Access to the connected Wix site
- Required environment variables in `.env` (see `.env.example`)

---

### 1. Authenticate with Wix CLI

```bash
wix login
```
- Follow the browser prompt to authenticate with your Wix account.
- Ensure you have access to the correct site.

---

### 2. Set Up Environment
- Copy `.env.example` to `.env` and fill in all required values.
- Never commit `.env` to the repository.

---

### 3. Local Build & Test

```bash
npm install
npm run lint
npm run dev
```
- Confirm the site runs locally and passes linting before publishing.

---

### 4. Publish to Wix

```bash
wix publish
```
- This will build and deploy your site to the connected Wix environment.
- Follow any prompts for environment or site selection.

---

## Rollback / Revert

### For Git Integration deployments
1. Identify the last known good commit: `git log --oneline`
2. Revert the problematic commit: `git revert <commit-hash>`
3. Push to main: `git push origin main`
4. Wix automatically deploys the reverted state

### For manual Wix CLI deployments
1. Checkout the previous working commit: `git checkout <commit-hash>`
2. Re-run `wix publish` to redeploy the previous state

---

## Troubleshooting
- Ensure all environment variables are set.
- If authentication fails, re-run `wix login`.
- For build errors, check lint output and dependency versions.

---

## Notes
- Only publish from a clean, tested state.
- For production, double-check all secrets and API keys are correct in `.env`.
- For more, see [Wix CLI documentation](https://support.wix.com/en/article/velo-working-with-the-wix-cli-beta).

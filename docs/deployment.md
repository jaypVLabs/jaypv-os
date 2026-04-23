# Deployment Guide

This guide covers deployment for the Wix Velo project. Deployment is automated via Wix Git Integration.

---

## Deployment Process

**Automated Deployment:**
- Changes pushed to the `main` branch automatically sync to the live Wix site via Git Integration
- No manual deployment steps are required
- The site updates automatically when changes are merged

**CI Pipeline:**
- GitHub Actions runs linting and validation on pull requests
- CI checks ensure code quality before merging
- After merge to main, Wix Git Integration handles deployment automatically

---

## Prerequisites
- Access to the Wix site (for manual operations if needed)
- Git access to the repository
- Node.js (v20 or later) for local development
- Wix CLI is included as a dev dependency (`@wix/cli`)

---

## Local Development & Testing

Before pushing changes, always test locally:

```bash
npm install
npm run lint
npm run dev
```

This ensures your code passes quality checks and runs correctly.

---

## Manual Publishing (If Needed)

In rare cases where manual deployment is required:

1. Authenticate with Wix CLI:
```bash
npx wix login
```

2. Publish manually:
```bash
npx wix publish
```

**Note:** This is rarely needed since Git Integration handles deployment automatically.

---

## Environment Configuration

- Copy `.env.example` to `.env` and configure as needed
- Environment variables are used for local testing and load testing
- Never commit `.env` to the repository (it's gitignored)

---

## Rollback / Revert

To rollback a deployment:
1. Revert the problematic commit in Git
2. Push to main branch
3. Git Integration will automatically deploy the reverted state

Alternatively:
- Use Git provider UI to revert commits
- Create a new PR with the revert
- Merge to trigger automatic deployment

---

## Troubleshooting

**Build Issues:**
- Run `npm run lint` to check for code quality issues
- Ensure all dependencies are installed with `npm install`
- Check GitHub Actions for CI failures

**CLI / TTY Issues in CI:**
- Some Wix CLI commands require an interactive terminal (TTY) and may fail in non-interactive CI environments.
- This repository's CI workflow runs `npm install` for dependency installation.
- If a step fails because it requires interactive Wix CLI input, run that command locally instead of in CI.
- Keep CI steps limited to non-interactive commands such as install, lint, and validation tasks.

**Deployment Issues:**
- Verify Git Integration is configured in Wix dashboard
- Check that commits are successfully pushed to main branch
- Review Wix site logs for deployment errors

---

## Load Testing

Before deploying major changes, run load tests:

```bash
pip install -r load-testing/requirements.txt
npm run test:load
```

---

## References

- [Wix CLI documentation](https://support.wix.com/en/article/velo-working-with-the-wix-cli-beta)
- [Wix Git Integration](https://support.wix.com/en/article/velo-about-git-integration-beta)

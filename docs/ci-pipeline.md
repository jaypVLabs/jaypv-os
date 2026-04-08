# Continuous Integration (CI) Pipeline

This document describes the automated GitHub Actions CI pipeline that validates code changes before they reach production.

---

## Overview

The CI pipeline runs automatically on every push and pull request to the `main` branch. It performs preview builds to validate that code changes can be successfully built by the Wix CLI.

**Important:** The CI pipeline only performs **Continuous Integration** (preview builds and validation). **Continuous Deployment** to the live site is handled separately by Wix Git Integration (see [deployment.md](deployment.md)).

---

## Workflow Details

This repository has two GitHub Actions workflows for continuous integration:

### 1. Wix Preview Build (`webpack.yml`)
Validates that code changes can be built successfully by the Wix CLI.

**Workflow file:** `.github/workflows/webpack.yml`

**Triggers:**
- Push to `main` branch
- Pull requests targeting `main` branch

**What it does:**
1. Checks out the repository code
2. Sets up Node.js 20.x runtime
3. Installs Wix CLI v1.1.174 (pinned version for stability)
4. Installs project dependencies with `npm ci --ignore-scripts`
5. Builds a preview using `wix preview --source local`

**Runtime:** ~2-3 minutes per run

### 2. Lint and Validation (`ci.yml`)
Validates code quality and ensures Python dependencies are installable.

**Workflow file:** `.github/workflows/ci.yml`

**What it does:**
1. Checks out the repository code
2. Sets up Node.js 18.x runtime
3. Installs dependencies with `npm install`
4. Runs ESLint (`npm run lint`)
5. Sets up Python 3.11
6. Installs Python dependencies for load testing
7. Validates Locust installation

**Runtime:** ~1-2 minutes per run

---

## Authentication Setup (Wix Preview Build Only)

The Wix preview build workflow requires a `WIX_AUTH_TOKEN` repository secret to authenticate with Wix services. The lint/validation workflow does not require this secret.

### How to configure the secret:

1. **Generate a Wix authentication token:**
   - Run `wix login` locally with the Wix CLI
   - The token is typically stored in your local Wix CLI configuration
   - Alternatively, obtain it from the Wix dashboard or CLI documentation

2. **Add the secret to GitHub:**
   - Go to your repository on GitHub
   - Navigate to **Settings** → **Secrets and variables** → **Actions**
   - Click **"New repository secret"**
   - Name: `WIX_AUTH_TOKEN`
   - Value: Your Wix authentication token
   - Click **"Add secret"**

3. **Verify:**
   - Push a commit or create a pull request
   - Check the Actions tab to confirm the workflow runs successfully

**Without this secret**, the CI workflow will fail at the preview build step with an authentication error.

---

## Why `--ignore-scripts`?

The CI workflow uses `npm ci --ignore-scripts` to install dependencies. This flag skips any npm lifecycle scripts (like `postinstall`, `prepare`, etc.) defined in `package.json`.

**Rationale:**
1. **Security**: Prevents arbitrary code execution from dependency scripts in CI
2. **Speed**: Skips unnecessary setup scripts that may require interactive authentication
3. **Reliability**: Ensures consistent builds without dependency on external services during install

Some Wix projects include a `postinstall` script (e.g., `wix sync-types`) that requires Wix authentication. By using `--ignore-scripts`, the workflow can install dependencies without needing authentication credentials during the npm install phase. Authentication is handled separately via the `WIX_AUTH_TOKEN` in the preview build step.

---

## TTY Requirement (Technical Detail)

The `wix preview` command uses Ink (a React-based CLI framework) which requires a TTY (interactive terminal) to render its output. GitHub Actions runners do not provide TTY by default.

**Solution:** The workflow wraps the command with the `script` utility:
```bash
script -q -e -c "wix preview --source local" /dev/null
```

This provides a pseudo-TTY for the Wix CLI, allowing it to run in the non-interactive GitHub Actions environment.

---

## Viewing CI Results

**From a Pull Request:**
- Scroll to the bottom of the PR page
- Look for the "All checks have passed" or "Some checks failed" status
- Click "Details" next to the "Build Preview" check to view logs

**From the Actions Tab:**
- Go to the **Actions** tab in the repository
- Click on any workflow run to see detailed logs
- Expand the "Build Preview" step to see the Wix CLI output

---

## Troubleshooting

### Build fails with authentication error
- Verify that the `WIX_AUTH_TOKEN` secret is configured correctly
- Ensure the token hasn't expired
- Re-generate the token if needed

### Build fails with "Raw mode is not supported"
- This means the `script` wrapper is missing or misconfigured
- Verify that `.github/workflows/webpack.yml` uses the correct command

### Build fails with dependency errors
- Check that `package.json` and `package-lock.json` are in sync
- Ensure all required dependencies are listed
- Try running `npm ci` locally to reproduce the issue

---

## CI vs CD Separation

**Continuous Integration (CI):** GitHub Actions workflow validates code changes with preview builds  
**Continuous Deployment (CD):** Wix Git Integration automatically deploys code from `main` to production

This separation means:
- ✅ All changes are validated by CI before merging
- ✅ Production deployment is automatic and managed by Wix
- ✅ No manual publish step required for production updates
- ✅ Clear separation of concerns

For more on deployment, see [deployment.md](deployment.md).

---

## Related Documentation

- [Deployment Guide](deployment.md) - How code reaches production
- [Wix CLI Documentation](https://support.wix.com/en/article/velo-working-with-the-wix-cli-beta)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)

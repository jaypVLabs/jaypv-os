# Continuous Integration (CI) Pipeline

This document describes the automated GitHub Actions CI pipeline that validates code changes before they reach production.

---

## Overview

The CI pipeline runs automatically on every push and pull request to the `main` branch. It validates code quality and ensures all dependencies (Node.js and Python) install correctly.

**Important:** The CI pipeline only performs **Continuous Integration** (linting and validation). **Continuous Deployment** to the live site is handled separately by Wix Git Integration (see [deployment.md](deployment.md)).

---

## Workflow Details

This repository has one GitHub Actions workflow for continuous integration:

### CI (`ci.yml`)
Validates code quality and ensures dependencies are installable.

**Workflow file:** `.github/workflows/ci.yml`

**Triggers:**
- Push to `main` branch
- Pull requests targeting `main` branch

**What it does:**
1. Checks out the repository code
2. Sets up Node.js 20 runtime (with npm cache)
3. Installs Node.js dependencies with `npm install`
4. Runs ESLint (`npm run lint`)
5. Sets up Python 3.11 (with pip cache)
6. Installs Python dependencies for load testing (`pip install -r load-testing/requirements.txt`)
7. Validates Locust installation (`python -m locust --version`)

**Runtime:** ~1-2 minutes per run

---

## Viewing CI Results

**From a Pull Request:**
- Scroll to the bottom of the PR page
- Look for the "All checks have passed" or "Some checks failed" status
- Click "Details" next to the CI check to view logs

**From the Actions Tab:**
- Go to the **Actions** tab in the repository
- Click on any workflow run to see detailed logs

---

## Troubleshooting

### Lint fails
- Run `npm run lint` locally to reproduce the issue
- Fix any ESLint errors before pushing

### Dependency install fails
- Ensure `package.json` and `package-lock.json` are in sync
- Run `npm install` locally to verify dependencies resolve correctly

### Python dependency install fails
- Ensure `load-testing/requirements.txt` is up to date
- Run `pip install -r load-testing/requirements.txt` locally to reproduce

---

## CI vs CD Separation

**Continuous Integration (CI):** GitHub Actions workflow validates code changes with linting and dependency checks
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
